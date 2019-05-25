const Discord = require('discord.js');

module.exports.alias = "pardon";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) {
        let args = message.content.split(' ');
        if (message.guild.members.find(user => user.displayName == args[1])) {
            pardon_member = message.guild.members.find(user => user.displayName == args[1]);
        }
        else if (message.mentions.members.first()) pardon_member = message.mentions.members.first();
        else return message.channel.send(`Please mention or write nickname of the member you want to pardon.`);

        if (message.member.highestRole.position < pardon_member.highestRole.position) return message.channel.send(`${pardon_member.displayName} has higher role than you!`);
        if (!message.guild.member(pardon_member).bannable) return message.channel.send(`${pardon_member.displayName} has higher role than me!`);

        args.shift();
        args.shift();
        usersModel.findOne({ serverId: message.guild.id, userId: pardon_member.id }).then(user => {
            if (user) {
                if (user.warn == 0) return message.channel.send(`${pardon_member.displayName} don't need pardon`);

                else if (args.join(' ') == '') {
                    const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
                    message.channel.send(`Please write the reason in 30 seconds`);
                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            collected.first().channel.send(`You set the reason to ${collected.first().content}`);
                            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                                logging(message, server, pardon_member, collected.first().content);
                            });
                            user.warn -= 1;
                            user.save(err => {
                                if (err) return message.channel.send(`unexpected error happened`);
                                return message.channel.send(`${pardon_member.toString()} is pardoned. Total warnings : ${user.warn}`);
                            });
                        })
                        .catch(collected => {
                            message.channel.send(`You didn't set the reason`);
                            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                                logging(message, server, pardon_member, 'No reason');
                            })
                            user.warn -= 1;
                            user.save(err => {
                                if (err) return message.channel.send(`unexpected error happened`);
                                return message.channel.send(`${pardon_member.toString()} is pardoned. Total warnings : ${user.warn}`);
                            });
                        });
                }
                else {
                    serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                        logging(message, server, pardon_member, args.join(' '));
                    });
                    user.warn -= 1;
                    user.save(err => {
                        if (err) return message.channel.send(`unexpected error happened`);
                        return message.channel.send(`${pardon_member.toString()} is pardoned. Total warnings : ${user.warn}`);
                    });
                }
            }
            else {
                return message.channel.send(`${pardon_member.displayName} don't need pardon`);
            }
        });

    }
    else message.channel.send(`You need Kick Members and Ban Members permissions to use this command.`);
}

function logging(message, server, pardon_member, text) {
    if (server.logchannelId != "0") message.guild.channels.get(server.logchannelId).send(
        new Discord.RichEmbed()
            .setTitle('Member Pardoned')
            .setColor('RED')
            .addField('Username', pardon_member.user.tag)
            .addField('Joined Time', pardon_member.joinedAt)
            .addField('Reason', text)
            .setAuthor(pardon_member.displayName, pardon_member.user.displayAvatarURL)
    );
}