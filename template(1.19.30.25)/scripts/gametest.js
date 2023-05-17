import * as Gametest from 'mojang-gametest'
import {
    world,
    GameMode,
    BlockLocation,
    Vector,
    MinecraftItemTypes,
    ItemStack
} from 'mojang-minecraft'
let playersSet = new Set();
world.events.playerJoin.subscribe(args => playersSet.add(args.player));
world.events.playerLeave.unsubscribe(args => playersSet.delete(args.player));
let tick = 20;
Gametest.register("rl", "test1", args => {
    let players = [...playersSet];
    const fakeplayer = args.spawnSimulatedPlayer(new BlockLocation(0, 2, 0), "az", GameMode.survival);
    fakeplayer.setItem(new ItemStack(MinecraftItemTypes.diamondSword, 1, 0), fakeplayer.selectedSlot, true);
    const eventOnTick = () => {
        tick--;
        fakeplayer.lookAtEntity(players[0]);
        fakeplayer.attack();
        fakeplayer.jump();
        if (tick <= 0) {
            fakeplayer.setVelocity(new Vector(fakeplayer.viewVector.x * 0.5, fakeplayer.viewVector.y * 0.15, fakeplayer.viewVector.z * 0.5));
            tick = 12
        }
        if (players[0].isSneaking) {
            world.events.tick.unsubscribe(eventOnTick);
            args.succeed();
        };
    }
    world.events.tick.subscribe(eventOnTick);


})
    .structureName("rl:test")
    .maxTicks(4000)