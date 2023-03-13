const fs = require("fs")

class Config {
    constructor(path) {
        this.path = path;

        this.configTemplate = {
            "discord_webhook_url": "",
            "discord_webhook_name": "",
            "discord_webhook_avatar": "",
        }
    }

    async checkConfig() {
        // check if the a config.json file exists at the specifie relative path
        // if it does not exist, create a new config.json file with the template and return false, else return true
        
        if (fs.existsSync(this.path)) {
            const file = await fs.readFileSync(this.path, "utf8");
            const config = JSON.parse(file);
            this.config = config;
            if (config.discord_webhook_url && config.discord_webhook_name && config.discord_webhook_avatar) {
                return true;
            }else {
                return false;
            }
        }else {
            // create a new config.json file with the template
            fs.writeFileSync(this.path, JSON.stringify(this.configTemplate));
            return false;
        }
    }

    async getConfig() {
        // return the config object
        return this.config;
    }

}

module.exports = { Config };