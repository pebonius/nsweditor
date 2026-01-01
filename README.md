# nsweditor

editor for nswengine games

## what

a while ago i made [nswengine](https://pebonius.itch.io/nswengine) - a good enough engine for text-based games

creating games in nswengine requires only editing the `data.json` file that comes with the engine source files, which is simple enough for someone who is at least a bit familiar with json

but i thought that for people who don't know json it might be a bit hard, or that it could be too cumbersome for bigger games

so i made nsweditor - a good enough editor for nswengine `data.json` files

## how to

you can use this editor to create a list of rooms, select each room and edit its properties

you can see a preview of the room to check if it looks ok and has exits in the right places

on the right hand side you will see the `data.json` output. when your game is ready, you can just copy this output (all of it) into the `data.json` file in the nswengine folder, replacing all the previous content of the file

## TODO

- room id gets parsed to number if safe integer (but not if `0`!)
- go between rooms using exit buttons in preview
- load a data.json file

later:
- change starting room?
- highlight current room in data.json?
