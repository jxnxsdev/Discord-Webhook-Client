const { Config } = require("./configManager.js");
const { WebHandler } = require("./webHandler.js");
const readLine = require("readline");


async function handler(config, wh) {

    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a message, type 'exit' to exit: ", async (message) => {
        if (message === "exit") process.exit();
        await wh.sendWebhook(message);
        rl.close();
    });

    rl.on("close", () => {
        // start the handler again
        handler(config, wh);
    });
}


async function start() {
    const config = new Config("./config.json");
    const configExists = await config.checkConfig();
    if (configExists) {
        console.log("Config loaded");
        const wh = new WebHandler(config);
        handler(config, wh);
    }else {
        console.log("Config file has been created");
        console.log("Please fill out the config file and restart the script!");
        process.exit(); // exit the script
    }
}

start();