import {
    world,
    Player
} from "mojang-minecraft";
import { runCmd } from "./command";
/**
 * 
 * @param {function} func 延迟执行函数
 * @param {number} ticktime game-tick
 * @returns {Promise}
 * @example 异步模块，使用promise封装，基于tick事件
 */
const setTimeout = function (func, ticktime = 0) {
    return new Promise((resolve) => {
        ticktime = ticktime | 0;
        const tickEvent = () => {
            if (ticktime <= 0) {
                func();
                world.events.tick.unsubscribe(tickEvent);
                resolve();
            };
            ticktime--;
        };
        world.events.tick.subscribe(tickEvent);
    })
}
/**
 * 
 * @param {string} msg 消息
 * @param {number} ticktime 延迟执行的gametick
 * @returns {setTimeout}
 * @example 执行主体为主世界的异步打印函数，输出到屏幕 
 * ```js
 * consoleTimeout("hello world!", 0)
 * ```
 */
const consoleTimeout = function (msg, ticktime = 0) {
    return setTimeout(() => {
        runCmd.overworld(`say ${msg}`)
    }, ticktime)
}
/**
 * 
 * @param {string} cmd 
 * @param {number} ticktime 延迟执行的gametick
 * @returns {setTimeout}
 * @example 执行主体为主世界的异步执行命令函数
 * ```js
 * commandTimeout(`say ${ticktime}`, 0)
 * ```
 */
const commandTimeout = function (cmd, ticktime = 0) {
    return setTimeout(() => {
        runCmd.overworld(cmd);
    }, ticktime)
}
/**
 * 
 * @param {string} cmd 
 * @param {number} ticktime 延迟执行的gametick
 * @param {Player} player 
 * @returns {setTimeout}
 * @example 执行主体为玩家的异步执行命令函数
 */
const playerCmdTimeout = function (cmd, ticktime = 0, player) {
    return setTimeout(() => {
        player.runCommand(`${cmd}`)
    }, ticktime);
}

export {
    consoleTimeout,
    setTimeout,
    commandTimeout,
    playerCmdTimeout
}