# nsweditor

janky editor for nswengine games :\*

## what

a while ago i made [nswengine](https://pebonius.itch.io/nswengine) - a good enough engine for text-based games

creating games in nswengine requires editing the `data.json` file that comes with the engine source files, which is simple enough for someone who is at least a bit familiar with json

but i thought that for people who don't know json it might be a bit hard, or that it could be too cumbersome for bigger games

so i made nsweditor - a janky editor for nswengine `data.json` files

## how to

### rooms list

on the left side you have a list of rooms.

you can click an item on the list to select a room that you want to edit.

the list is pre-populated with two simple rooms, but you can add more rooms using the plus button above the list.

### live preview

in the middle you can see a live preview of the room.

this will update as you change the room's properties.

you can also click on the exits to navigate between rooms, just like the player will in the finished game.

### room properties

below the live preview there is a room properties window.

you can edit the description and colors of the current room, enable/ disable exits etc.

you can delete the current room using the `x` button above the properties.

you will not be able to delete the starting room tho.

### json output

on the right side you will see the `data.json` output.

when your game is ready, copy this output (all of it) into the `data.json` file in the nswengine folder.

this output must replace all the previous content of the file, otherwise you'll get errors.

that's it i think?
