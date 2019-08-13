const Discord = require('discord.js');

module.exports.alias = "setdescription";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    {
        let args = message.content.split(' ');
        if (args[1] == undefined) {
            const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
            message.channel.send(`Please write your Description in 30 seconds`);
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    usersModel.findOne({ serverId: message.guild.id, userId: message.member.id }).then(user => {
                        if (user) {
                            user.description = collected.first().content;
                            user.save(err => {
                                if (err) return message.channel.send(`unexpected error happened`);
                                return message.channel.send(`You set the description to ${collected.first().content}`);
                            });
                        }
                        else {
                            let newMemberSettings = {
                                serverId: message.member.guild.id,
                                userId: message.member.id,
                                warn: 0,
                                description: collected.first().content,
                            };
                            new usersModel(newMemberSettings).save(err => {
                                if (err) throw err;
                                return message.channel.send(`You set the description to ${collected.first().content}`);
                            });
                        }
                    });
                })
                .catch(collected => {
                    usersModel.findOne({ serverId: message.guild.id, userId: message.member.id }).then(user => {
                        if (user) {
                            user.description = 'Set your description using i!setdescription';
                            user.save(err => {
                                if (err) return message.channel.send(`unexpected error happened`);
                                return message.channel.send(`You set the description to Set your description using i!setdescription`);
                            });
                        }
                        else {
                            let newMemberSettings = {
                                serverId: message.member.guild.id,
                                userId: message.member.id,
                                warn: 0,
                                description: 'Set your description using i!setdescription',
                            };
                            new usersModel(newMemberSettings).save(err => {
                                if (err) throw err;
                                return message.channel.send(`You set the description to Set your description using i!setdescription`);
                            });
                        }
                    });
                });
        }
        else {
            args.shift();
            usersModel.findOne({ serverId: message.guild.id, userId: message.member.id }).then(user => {
                if (user) {
                    user.description = args.join(' ');
                    user.save(err => {
                        if (err) return message.channel.send(`unexpected error happened`);
                        return message.channel.send(`You set the description to ${args.join(' ')}`);
                    });
                }
                else {
                    let newMemberSettings = {
                        serverId: message.member.guild.id,
                        userId: message.member.id,
                        warn: 0,
                        description: args.join(' '),
                    };
                    new usersModel(newMemberSettings).save(err => {
                        if (err) throw err;
                        return message.channel.send(`You set the description to ${args.join(' ')}`);
                    });
                }
            });
        }
    };
}
