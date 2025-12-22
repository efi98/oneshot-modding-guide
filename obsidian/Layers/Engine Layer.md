
The engine layer is where you can do anything a player's system allows.
OneShot had to make some changes to its engine to make certain features work, and you might too if you'd like to go that far.

There is no drag-and-drop solution for changing the engine at the time of writing.
Because of that, you must already have experience with compiling C/C++.
The compilation process varies between the possible engines.

There's not much information I can provide you with on this layer besides some history for context.
Huge thanks to [hat_kid](https://github.com/thehatkid) and [melody-rs](https://github.com/melody-rs) for providing this information, and the work they've put into some of these projects.

Also note that **this article is not an absolute source of truth.**
There may be more engine replacements out there, and the information here may sooner or later become outdated.
So try asking around if you're reading this a few years since it was written.


## [mkxp](https://github.com/Ancurio/mkxp)
mkxp is an open source rewrite of the RPG Maker engine for XP, VX, and VX Ace, with the primary goal of making it available on Linux.
It also runs better.

It is not compatible with OneShot, as it does not include its features.


## [mkxp-oneshot](https://github.com/elizagamedev/mkxp-oneshot)
a fork of mkxp specialized for OneShot, which is what the game is running on.
It includes some features unique to OneShot compares to other RPG Maker games, like fetching the user's name, changing desktop wallpapers, and the [[Journal App]].

It does not have releases, and therefore must be compiled.
Unfortunately it can be really tough to compile if you'd like to add any features to it.
This extends to any fork based on it.


## [Astrabit's ModShot](https://github.com/Astrabit-ST/ModShot-Core)
A fork of mkxp-oneshot which aimed to improve the engine, add features to it, and expand on the modability of the game.

It does not have releases, and therefore must be compiled, which can be tough as it's based on mkxp-oneshot.

I suggest against using it, as it's archived, unmaintained, and a bit of a mess.
You can read more on that on the repository's page.


## [mkxp-z](https://github.com/mkxp-z/mkxp-z)
A fork expanding on the capabilities of mkxp.
You can read more on that [here](https://github.com/mkxp-z/mkxp-z/wiki).

What matters to us, is that it's a lot easier to compile in comparison.
Much like mkxp, it is not compatible with OneShot, as it does not include its features.

## [OSFM MKXP-Z](https://github.com/Astrabit-ST/osfm-mkxp-z)
A fork of mkxp-z specialized for OneShot: Fading Memory, which is what the mod is running on.
It's not intended to be a Modshot replacement or have generic modability improvements as it's meant to serve Fading Memory specifically.

You can get it to work for your mod, but you're on your own with that.

## [hat_kid's ModShot mkxp-z](https://github.com/thehatkid/ModShot-mkxp-z)
A fork of mkxp-z, intending to replace the old ModShot as a generic engine improvement with  modability in mind.

It does not offer any new features at the time of writing, and still requires compilation.