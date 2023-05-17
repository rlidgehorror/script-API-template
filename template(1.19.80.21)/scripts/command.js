import {
    world,
    Player,
    MinecraftDimensionTypes,
    CommandResult,
    Vector3
} from "@minecraft/server"
const overworld = world.getDimension(MinecraftDimensionTypes.overworld);
const the_end = world.getDimension(MinecraftDimensionTypes.theEnd);
const the_nether = world.getDimension(MinecraftDimensionTypes.nether);
class RunCmd {
    /**
     * 
     * @param {String} cmd 
     * @returns {CommandResult}
     * @throws Object has name and message properties
     */
    static OverWorld(cmd) {
        try {
            return overworld.runCommand(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                overworld.runCommand(`say ${key}: ${value}`);
            };
        };
    };
    /**
     * 
     * @param {String} cmd 
     * @returns {Promise<CommandResult>}
     * @throws Object has name and message properties
     */
    static async AsyncOverWorld(cmd) {
        try {
            return overworld.runCommandAsync(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                overworld.runCommand(`say ${key}: ${value}`);
            };
            return error;
        };
    };
    /**
     * 
     * @param {String} cmd 
     * @returns {CommandResult}
     * @throws Object has name and message properties
     */
    static Nether(cmd) {
        try {
            return the_nether.runCommand(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                the_nether.runCommand(`say ${key}: ${value}`);
            };
            return error;
        };
    };
    /**
     * 
     * @param {String} cmd 
     */
    static async AsyncNether(cmd) {
        try {
            return the_end.runCommandAsync(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                the_end.runCommand(`say ${key}: ${value}`);
            };
            return error;
        };
    };
    /**
     * 
     * @param {String} cmd 
     * @returns {CommandResult}
     * @throws Object has name and message properties
     */
    static TheEnd(cmd) {
        try {
            return the_nether.runCommand(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                the_nether.runCommand(`say ${key}: ${value}`);
            };
        };
    };
    /**
     * 
     * @param {String} cmd 
     * @returns {Promise<CommandResult>}
     * @throws Object has name and message properties
     */
    static async AsyncTheEnd(cmd) {
        try {
            return the_end.runCommandAsync(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                the_end.runCommand(`say ${key}: ${value}`);
            };
            return error;
        };
    };
    /**
     * 
     * @param {String} cmd 
     * @param {Player} player
     * @returns {CommandResult}
     * @throws Object has name and message properties
     */
    static PlayerCmd(cmd, player) {
        try {
            return player.runCommand(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                player.runCommand(`say ${key}: ${value}`);
            };
        };
    };
    /**
     * 
     * @param {String} cmd 
     * @param {Player} player
     * @throws Object has name and message properties
     */
    static async AsyncPlayerCmd(cmd, player) {
        try {
            return player.runCommandAsync(cmd);
        } catch (error) {
            for (const [key, value] of error) {
                player.runCommand(`say ${key}: ${value}`);
            };
            return error;
        };
    }
}

export {
    RunCmd
}