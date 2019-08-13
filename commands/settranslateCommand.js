const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports.alias = "settranslate";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission('MANAGE_GUILD')) {
        serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
            if (server) {
                if (server.webhookid == 0) {
                    message.channel.createWebhook("iantbot Translation Webhook", "https://i.imgur.com/p2qNFag.png").
                    then(webhook => {
                        server.webhookid = webhook.id;
                        server.webhooktoken = webhook.token;
                    });
                }
                server.translateId = message.channel.id;
                const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
                translate(`Please write the language code in 30 seconds. Learn more about language code in here : http://www.lingoes.net/en/translator/langcode.htm `, { to: server.translatelang }).then(res => {
                    message.channel.send(res.text);
                });
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        server.translatelang = collected.first().content.toLowerCase();
                        translate(`You set the language to **${collected.first().content.toLowerCase()}**`, { to: server.translatelang }).then(res => {
                            collected.first().channel.send(res.text);
                        })
                            .catch(err => {
                                message.channel.send(`${collected.first().content} is not available. Setting to **en**`)
                                server.translatelang = 'en';
                            });
                        server.save(err => {
                            if (err) return message.channel.send(`unexpected error happened`);
                            return translate(`Alright, this server's translation channel is ${message.channel.toString()}`, { to: server.translatelang }).then(res => {
                                collected.first().channel.send(res.text);
                            });
                        });
                        return 0;
                    })
                    .catch(collected => {
                        console.log(collected)
                        message.channel.send(`You set the language to **en**`);
                        server.translatelang = 'en';
                        server.save(err => {
                            if (err) return message.channel.send(`unexpected error happened`);
                            return translate(`Alright, this server's translation channel is ${message.channel.toString()}`, { to: server.translatelang }).then(res => {
                                message.channel.send(res.text);

                            });
                        });                
                    });
            }
            else {
                message.channel.send(`Please execute the ${config.prefix}register command!`)
            }
        });
    }
}
