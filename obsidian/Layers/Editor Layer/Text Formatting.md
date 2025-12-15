
There are some special characters you can use in dialogue for certain effects.

Any dialogue starting with a `@` will attempt parsing a face sprite to display.
So if the text begins with `@alula_speak`, that part will be omitted from the dialogue, and Alula's speak face sprite will be displayed.

Dialogue starting with a `[` will play a robot speaking sound effect instead of the default type writer one.


## Special Characters
`\n` - New line
`\.` - Short pause
`\|` - Long pause
`\>` - Wait for input before continuing text
`\p` - Player name
`\\` - Regular backslash
`\c[N]` - Change text color - Replace `N` with a number.
`\v[NNN]` - Print number stored in variable - Replace NNN with variable ID.
`\@FACE_SPRITE` - Change face sprite during dialogue - Replace `FACE_SPRITE` with the desired one.


## Text Color Numbers
`0` = <span style="background:#1E1E1E;color:#FFFFFF;">White (default)</span>
`1` = <span style="background:#1E1E1E;color:#FF4040;">Red</span>
`2` = <span style="background:#1E1E1E;color:#00E000;">Green</span>
`3` = <span style="background:#1E1E1E;color:#FFFF00;">Yellow</span>
`4` = <span style="background:#1E1E1E;color:#4040FF;">Blue</span>
`5` = <span style="background:#1E1E1E;color:#FF40FF;">Purple</span>
`6` = <span style="background:#1E1E1E;color:#40FFFF;">Cyan</span>
`7` = <span style="background:#1E1E1E;color:#808080;">Gray</span>
Anything else defaults to white

