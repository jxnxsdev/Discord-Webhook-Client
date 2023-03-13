const https = require('https');

class WebHandler {
    constructor(config) {
        this.config = config;
    }

    async sendWebhook(message) {
        const webhook = await this.config.getConfig();
        const data = JSON.stringify({
            "content": message,
            "username": webhook.discord_webhook_name,
            "avatar_url": webhook.discord_webhook_avatar
        });

        const options = {
            hostname: 'discord.com',
            port: 443,
            path: webhook.discord_webhook_url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
            console.log(`\nMessage Sent! Status Code: ${res.statusCode}`)
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()
    }
}

module.exports = { WebHandler };