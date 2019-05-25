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
        serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
            if (server.translateId == "0") return 0;

            if (message.author.bot) return;

            if (message.content.indexOf(config.prefix) == 0) return;

            if (message.channel.id == server.translateId) {
                translate(message.content, { to: server.translatelang }).then(res => {
                    if (res.from.language.iso == server.translatelang) return;

                    Client.channels.get(server.translateId).send(
                        new Discord.RichEmbed()
                            .setDescription(res.text)
                            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
                    );
                })
            } 
        });
    });
}