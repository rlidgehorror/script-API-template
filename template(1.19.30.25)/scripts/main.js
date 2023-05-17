import {
    world,
    Player,
    ItemStack,
    system
} from 'mojang-minecraft'
import "./gametest"
import { runCmd } from './command';
import { consoleTimeout } from './delay';
world.events.entityCreate.subscribe(args => {
    // world.say(`${args.entity.id}创建`)
})
//订阅tick事件
world.events.tick.subscribe(args => {
    const players = [...world.getPlayers()];
    for (const player of players) {
        const entity = player.getEntitiesFromViewVector()?.[0];
        try {
            player.runCommand(`title "${player.name}" actionbar 面前生物的血量是:${entity.getComponent("minecraft:health").current}`)
        } catch (error) { };
    };
});
//订阅聊天事件
world.events.chat.subscribe(args => {
    const player = args.sender;
    const msg = args.message;
    if (msg.startsWith("lore")) {
        const displayOnLore = msg.split(/\s/).slice(1);
        const container = player.getComponent("minecraft:inventory").container;
        let selectedItem = container.getItem(player.selectedSlot);
        consoleTimeout(`${selectedItem.nameTag}`)
        if (selectedItem !== undefined) {
            selectedItem.setLore(displayOnLore);
            container.setItem(player.selectedSlot, selectedItem);
            consoleTimeout("设置成功");
        } else {
            consoleTimeout("你手上没有物品");
        }
    } else if (msg.startsWith('health')) {
        const health = Number(msg.split(/\s/)[1]);
        const entity = player.getEntitiesFromViewVector()[0];
        const healthComp = entity?.getComponent("minecraft:health");
        if (healthComp?.current) {
            healthComp.setCurrent(health);
            consoleTimeout(`设置血量为${healthComp.current}`)
        } else if (!healthComp) {
            system.run(tickEvent)
            consoleTimeout("你面前没有生物")
        } else {
            consoleTimeout("该生物没有血量")
        };
    } else if (msg.startsWith("test")) {
        const a = runCmd.playerCmd(`titleraw @a actionbar {"rawtext":[{"translate":"item.skull.dragon.name"}]}`, player);
        for (let i in a) {
            runCmd.log(`${i}:${a[i]}`)
        }
    }
});
function tickEvent() {
    world.say('hi')
}
// function runLoop() {
//     tickEvent();
//     system.run(runLoop)
// };
// system.run(runLoop)
