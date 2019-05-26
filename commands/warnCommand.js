const Discord = require('discord.js');

module.exports.alias = "warn";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) {
        let args = message.content.split(' ');
        if (message.guild.members.find(user => user.displayName == args[1])) {
            warn_member = message.guild.members.find(user => user.displayName == args[1]);
        }
        else if (message.mentions.members.first()) warn_member = message.mentions.members.first();
        else return message.channel.send(`Please mention or write nickname of the member you want to warn.`);

        if (message.member.highestRole.position < warn_member.highestRole.position) return message.channel.send(`${warn_member.displayName} has higher role than you!`);
        if (!message.guild.member(warn_member).bannable) return message.channel.send(`${warn_member.displayName} has higher role than me!`);

        args.shift();
        args.shift();
        if (args.join(' ') == '') {
            const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
            message.channel.send(`Please write the reason in 30 seconds`);
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    collected.first().channel.send(`You set the reason to ${collected.first().content}`);
                    serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                        logging(message, server, warn_member, collected.first().content);
                    });

                    usersModel.findOne({ serverId: message.guild.id, userId: warn_member.id }).then(user => {
                        if (user) {
                            user.warn += 1;
                            user.save(err => {
                                if (err) return message.channel.send(`unexpected error happened`);
                                return message.channel.send(`${warn_member.toString()} is warned. Total warnings : ${user.warn}`);
                            });
                        }
                        else {
                            let newMemberSettings = {
                                serverId: warn_member.guild.id,
                                userId: warn_member.id,
                                warn: 0,
                                description: 'Set your description using i!setdescription',
                            };
                            new usersModel(newMemberSettings).save(err => {
                                if (err) throw err;
                                return message.channel.send(`${warn_member.toString()} is warned. Total warning : 1`);
                            });
                        }
                    });
                })
                .catch(collected => {
                    message.channel.send(`You didn't set the reason`);
                    serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                        logging(message, server, warn_member, 'No reason');
                    });

                    usersModel.findOne({ serverId: message.guild.id, userId: warn_member.id }).then(user => {
                        if (user) {
                            user.warn += 1;
                            user.save(err => {
                                if (err) return message.channel.send(`unexpected error happened`);
                                return message.channel.send(`${warn_member.toString()} is warned. Total warnings : ${user.warn}`);
                            });
                        }
                        else {
                            let newMemberSettings = {
                                serverId: warn_member.guild.id,
                                userId: warn_member.id,
                                warn: 0,
                                description: 'Set your description using i!setdescription',
                            };
                            new usersModel(newMemberSettings).save(err => {
                                if (err) throw err;
                                return message.channel.send(`${warn_member.toString()} is warned. Total warning : 1`);
                            });
                        }
                    });
                });
        }
        else {
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                logging(message, server, warn_member, args.join(' '));
            });

            usersModel.findOne({ serverId: message.guild.id, userId: warn_member.id }).then(user => {
                if (user) {
                    user.warn += 1;
                    user.save(err => {
                        if (err) return message.channel.send(`unexpected error happened`);
                        return message.channel.send(`${warn_member.toString()} is warned. Total warnings : ${user.warn}`);
                    });
                }
                else {
                    let newMemberSettings = {
                        serverId: warn_member.guild.id,
                        userId: warn_member.id,
                        warn: 1,
                        description: 'Set your description using i!setdescription',
                    };
                    new usersModel(newMemberSettings).save(err => {
                        if (err) throw err;
                        return message.channel.send(`${warn_member.toString()} is warned. Total warning : 1`);
                    });
                }
            });
        }

    }
    else message.channel.send(`You need Kick Members and Ban Members permissions to use this command.`);
}

function logging(message, server, warn_member, text) {
    if (server.logchannelId != "0") message.guild.channels.get(server.logchannelId).send(
        new Discord.RichEmbed()
            .setTitle('Member Warned')
            .setColor('RED')
            .addField('Username', warn_member.user.tag)
            .addField('Joined Time', warn_member.joinedAt)
            .addField('Reason', text)
            .setAuthor(warn_member.displayName, warn_member.displayAvatarURL)
    );
}
