const Discord = require('discord.js');
const config = require('./config');
const translate = require('@vitalets/google-translate-api');
const fs = require('fs')

const commands = [];

/**
 * 
 * @param {Discord.Client} Client 
 */
module.exports = function (Client) {
    Client.on('message', message => {
        if (message.channel.type == 'dm') return;
        serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
            const webhook = new Discord.WebhookClient(server.webhookid, server.webhooktoken);
            if (server.translateId == "0") return 0;

            if (message.author.bot) return;

            if (message.content.indexOf(config.prefix) == 0) return;

            if (message.channel.id == server.translateId) {
                translate(message.content, { to: server.translatelang }).then(res => {
                    if (res.from.language.iso == server.translatelang) return;

                    webhook.send(res.text, {
                        username: message.member.displayName,
                        avatarURL: message.author.displayAvatarURL
                        });
                    });
            } 
        });
    });
}
