import {
    world,
    Player
} from "mojang-minecraft";
const overworld = world.getDimension("overworld");
const the_end = world.getDimension("the end");
const the_nether = world.getDimension("nether");
//如果命令执行出现失败的情况，就会停止执行然后报错，所以要封装try-catch，使得命令可以继续执行
export class runCmd {
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 属性有data statusCode statusMessage
     * 
     */
    static overworld(cmd) {
        try {
            return overworld.runCommand(cmd);
        } catch (error) {
            overworld.runCommand(`say ${error}`);
            return error;
        };
    };
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 属性有data statusCode statusMessage
     */
    static the_end(cmd) {
        try {
            return the_end.runCommand(cmd);
        } catch (error) {
            the_end.runCommand(`say ${error}`);
            return error;
        };
    };
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 属性有data statusCode statusMessage
     */
    static the_nether(cmd) {
        try {
            return the_nether.runCommand(cmd);
        } catch (error) {
            the_nether.runCommand(`say ${error}`);
            return error;
        };
    };
    /**
     * 
     * @param {string} cmd 
     * @param {Player} player 
     */
    static playerCmd(cmd, player) {
        try {
            return player.dimension.runCommand(`${cmd}`)
        } catch (error) {
            return player.dimension.runCommand(`say ${error}`)
        }
    }
    /**
     * 
     * @param {string} cmd 
     * @returns {Object} 有data statusCode statusMessage属性的对象
     */
    static entries(cmd) {
        const { data, statusCode, statusMessage } = this.overworld(cmd);
        return { data, statusCode, statusMessage };
    };
    /**
     * 
     * @param {string} msg 
     */
    static log(msg) {
        runCmd.overworld(`say ${msg}`)
    }
}
