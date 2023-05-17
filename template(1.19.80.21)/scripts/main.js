import {
    world,
    system,
    GameMode,
    MinecraftDimensionTypes
} from "@minecraft/server"
import {
    register,
    SimulatedPlayer
} from "@minecraft/server-gametest"
world.events.chat.subscribe(args => {
    const msg = args.message;
    const player = args.sender;
    if (msg.startsWith("hi")) {
        try {
            player.runCommand("execute")
        } catch (error) {
            for (const [key, value] of Object.entries(error)) {
                player.runCommand("say " + key + ": " + value);
            }
        };
    };

});

const players = world.getPlayers()
register("rl", "simulatedPlayer", (test) => {
    for (const player of players) {
        test.spawnSimulatedPlayer(player.location, `${player.nameTag}的机器人`, GameMode.survival);
    };
})
    .structureName("rl:void")
    .maxTicks(400)

