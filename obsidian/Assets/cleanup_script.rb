require "digest"
require "json"
require "fileutils"
require "find"
require "pathname"

IGNORED_DIRS = [ ".", "..", ".git", ".vscode", ".idea", ".github", ".luminol" ]
IGNORED_FILES = [ ".gitignore" ]
CATALOGUE_PATH = "#{__dir__}/_hash_catalogue.json"
OUTPUT_DIR = "#{__dir__}/_dist_output"

def main()
	puts "Select operation:"
	puts "1 - Build catalogue"
	puts "2 - Copy & clean"
	op = STDIN.gets().chomp()
	
	if op == '1'
		build_catalogue()
	elsif op == '2'
		copy_and_clean()
	else
		raise "Invalid operation."
	end
	
	puts "Job's done!"
end


def build_catalogue()
	puts "Build a catalogue for comparison."
	puts "Requires an absolute path to a CLEAN, VANILLA OneShot."
	
	puts "Vanilla OneShot path:"
	oneshot_dir = STDIN.gets().chomp()
	raise "Invalid or non-existent directory." unless Dir.exist?(oneshot_dir)
	
	catalogue = {}
	
	Find.find(oneshot_dir) do |path|
		basename = File.basename(path)
		if FileTest.directory?(path)
			Find.prune if IGNORED_DIRS.include?(basename)
			next
		end
		
		next if IGNORED_FILES.include?(basename)
		
		relative = Pathname(path).relative_path_from(Pathname(oneshot_dir)).to_s
		puts "> Cataloguing: #{relative}"
		catalogue[relative] = hash_file(path)
	end
	
	File.write(CATALOGUE_PATH, catalogue.to_json)
end



def copy_and_clean()
	puts "Create a copy of your mod, then remove files identical to vanilla."
	puts "Requires building the catalogue first, and the absolute path to your mod's source folder."
	
	raise "Catalogue file not found. Build it first." unless File.exist?(CATALOGUE_PATH)
	
	puts "Mod's source directory:"
	mod_dir = STDIN.gets().chomp()
	raise "Invalid or non-existent directory." unless Dir.exist?(mod_dir)
	
	if Dir.exist?(OUTPUT_DIR) && !Dir.empty?(OUTPUT_DIR)
		puts "Output directory '#{OUTPUT_DIR}' is not empty."
		puts "Delete and proceed? [y/N]"
		proceed = STDIN.gets&.chomp&.downcase == "y"
		raise "Output directory not empty, process terminated." unless proceed
	end
	
	FileUtils.rm_rf(OUTPUT_DIR)
	
	Find.find(mod_dir) do |path|
		basename = File.basename(path)
		if FileTest.directory?(path)
			Find.prune if IGNORED_DIRS.include?(basename)
			next
		end
		
		next if IGNORED_FILES.include?(basename)
		
		relative = Pathname(path).relative_path_from(Pathname(mod_dir)).to_s
		puts "> Copying: #{relative}"
		
		dest = File.join(OUTPUT_DIR, relative)
		FileUtils.mkdir_p(File.dirname(dest))
		FileUtils.cp(path, dest)
	end
	
	catalogue = {}
	begin
		catalogue = JSON.parse(File.read(CATALOGUE_PATH))
	rescue JSON::ParserError => err
		raise "Failed parsing catalogue: #{err.message}"
	end

	nonexistent = []
	identical = []
	modified = []
	
	catalogue.each do |relative, hash|
		full = "#{OUTPUT_DIR}/#{relative}"
		puts "> Checking: #{relative}"
		if File.exist?(full)
			hash == hash_file(full) ? identical.push(full) : modified.push(full)
		else
			nonexistent.push(full)
		end
	end
	
	identical.each do |file|
		puts "> Deleting identical file: #{file}"
		File.delete(file)
	end
	
	Dir.glob( "**/", base: OUTPUT_DIR ).reverse_each { |d|
		full = "#{OUTPUT_DIR}/#{d}"
		if Dir.empty?(full)
			puts "> Deleting empty directory: #{full}"
			Dir.rmdir(full)
		end
	}
	
	puts
	puts "=========================================================="
	puts "# Identical files deleted : #{identical.length}"
	puts "# Modified files kept     : #{modified.length}"
	puts "# New files               : #{nonexistent.length}"
	puts
end



def hash_file(file)
	return Digest::SHA2.file(file).hexdigest
end


begin
	main()
rescue StandardError => err
	puts "===== ERROR ====="
	puts err.message
ensure
	puts "Press 'Enter' to exit."
	STDIN.gets()
end