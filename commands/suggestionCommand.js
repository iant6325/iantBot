const Discord = require('discord.js');

module.exports.alias = "suggestion";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    var suggestion = '';
    let args = message.content.split(' ');
    if (args[1] == '-a' || args[1] == '-add' || args[1] == 'add') {
        if (args[2] == undefined) {
            const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
            message.channel.send(`Please write what do you want to suggest in 1 minute`);
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    suggestion = collected.first().content;
                    serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                        if (server) {
                            var num = server.suggestion.length;
                            server.suggmember.push(message.author.id);
                            message.guild.channels.get(server.suggchannel).send({embed :
                                new Discord.RichEmbed()
                                    .setTitle('Suggestion ' + num)
                                    .setColor('GREEN')
                                    .addField('Content', suggestion)
                                    .addField('Status', 'Reviewing')
                                    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
                                    }).then((msg) => {
                                        msg.react("✅");
                                        msg.react("❌");
                                        server.suggestion.push(msg.id);
                                        server.suggstatus.push('0');
                                        console.log(server.suggestion);
                                        server.save(err => {
                                            if (err) return message.channel.send(`unexpected error happened`);
                                            return message.channel.send('Your suggestion has been sent.');
                                        });
                                    });
                        }
                        else {
                            message.channel.send(`Please execute the ${config.prefix}register command!`)
                        }
                    });
                })
                .catch(collected => {
                    return message.channel.send(`Please try it again.`);
                });
        }
        else {
            args.shift();
            args.shift();
            suggestion = args.join(' ');
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (server) {
                    var num = server.suggestion.length;
                    server.suggmember.push(message.author.id);
                    message.guild.channels.get(server.suggchannel).send({embed :
                        new Discord.RichEmbed()
                            .setTitle('Suggestion ' + num)
                            .setColor('GREEN')
                            .addField('Content', suggestion)
                            .addField('Status', 'Reviewing')
                            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
                            }).then((msg) => {
                                msg.react("✅");
                                msg.react("❌");
                                server.suggestion.push(msg.id);
                                server.suggstatus.push('0');
                                server.save(err => {
                                    if (err) return message.channel.send(`unexpected error happened`);
                                    return message.channel.send('Your suggestion has been sent.');
                                });
                            });
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`)
                }
            });
        }
    }
    else if (args[1] == '-e' || args[1] == '-edit' || args[1] == 'edit') {
        if (isNaN(args[2])) return message.channel.send(`Please write what suggestion do you want to edit and try again.`)
        var num = args[2];
        if (args[3] == undefined) {
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (server) {
                    if (server.suggstatus[num] == 0) {
                        if (server.suggmember[num] == message.author.id) {
                            const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
                            message.channel.send(`Please rewrite what do you want suggest in 1 minute`);
                            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(collected => {
                                    suggestion = collected.first().content;
                                    message.guild.channels.get(server.suggchannel).fetchMessage(server.suggestion[num]).then(msg => {
                                    msg.edit({embed :
                                        new Discord.RichEmbed()
                                            .setTitle('Suggestion ' + num)
                                            .setColor('GREEN')
                                            .addField('Content', suggestion)
                                            .addField('Status', 'Reviewing')
                                            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
                                            });
                                        });
                                        console.log(msg.embeds.fields);
                                        message.channel.send(`Suggestion edit is successfully operated!`)
                                })
                            .catch(collected => {
                                return message.channel.send(`Please try it again.`);
                            });
                        }
                        else {
                            message.channel.send('The suggestion is not yours!')
                        }
                    }
                    else {
                        message.channel.send('Your suggestion is ended now.')
                    }
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`)
                }
            });
        }
        else {
            args.shift();
            args.shift();
            args.shift();
            suggestion = args.join(' ');
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (server) {
                    if (server.suggstatus[num] == 0) {
                        if (server.suggmember[num] == message.author.id) {
                            message.guild.channels.get(server.suggchannel).fetchMessage(server.suggestion[num]).then(msg => {
                                console.log(msg.embeds.content);
                            msg.edit({embed :
                                new Discord.RichEmbed()
                                    .setTitle('Suggestion ' + num)
                                    .setColor('GREEN')
                                    .addField('Content', suggestion)
                                    .addField('Status', 'Reviewing')
                                    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
                                    });
                                });
                            message.channel.send(`Suggestion edit is successfully operated!`)
                        }
                        else {
                            message.channel.send('The suggestion is not yours!')
                        }
                    }
                    else {
                        message.channel.send('Your suggestion is ended now.')
                    }
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`)
                }
            });
        }
    }
    else if (args[1] == '-c' || args[1] == '-accept' || args[1] == 'accept') {
        if (message.member.hasPermission('MANAGE_GUILD') || message.author.id == '540084012845367297') {
            if (isNaN(args[2])) return message.channel.send(`Please write what suggestion do you want to accept and try again.`)
            var num = args[2];
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (server) {
                    if (server.suggstatus[num] == 0) {
                            message.guild.channels.get(server.suggchannel).fetchMessage(server.suggestion[num]).then(msg => {
                                msg.edit({embed :
                                    new Discord.RichEmbed()
                                        .setTitle(msg.embeds[0].title)
                                        .setColor('BLUE')
                                        .addField('Content', msg.embeds[0].fields[0].value)
                                        .addField('Status', 'Accepted')
                                        .addField('Reason', 'Not Set.')
                                        .setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
                                        });
                                    });
                                    server.suggstatus.push('0');
                                    server.suggstatus[num] = '1';
                                    server.suggstatus.pop('0');
                                    server.save(err => {
                                        if (err) return message.channel.send(`unexpected error happened`);
                                        return message.channel.send('Suggestion is accepted');
                                    });
                                }
                    else {
                        message.channel.send('Suggestion is ended now.')
                    }
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`)
                }
            });
        }
    }

    else if (args[1] == '-d' || args[1] == '-deny' || args[1] == 'deny') {
        if (message.member.hasPermission('MANAGE_GUILD') || message.author.id == '540084012845367297') {
            if (isNaN(args[2])) return message.channel.send(`Please write what suggestion do you want to deny and try again.`)
            var num = args[2];
            serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                if (server) {
                    if (server.suggstatus[num] == 0) {
                            message.guild.channels.get(server.suggchannel).fetchMessage(server.suggestion[num]).then(msg => {
                                msg.edit({embed :
                                    new Discord.RichEmbed()
                                        .setTitle(msg.embeds[0].title)
                                        .setColor('RED')
                                        .addField('Content', msg.embeds[0].fields[0].value)
                                        .addField('Status', 'Denied')
                                        .addField('Reason', 'Not Set.')
                                        .setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
                                        });
                                    });
                                    server.suggstatus.push('0');
                                    server.suggstatus[num] = '1';
                                    server.suggstatus.pop('0');
                                    server.save(err => {
                                        if (err) return message.channel.send(`unexpected error happened`);
                                        return message.channel.send('Suggestion is denied');
                                    });
                                }
                    else {
                        message.channel.send('Suggestion is ended now.')
                    }
                }
                else {
                    message.channel.send(`Please execute the ${config.prefix}register command!`)
                }
            });
        }
    }

    else if (args[1] == '-r' || args[1] == '-reason' || args[1] == 'reason') {
        if (message.member.hasPermission('MANAGE_GUILD') || message.author.id == '540084012845367297') {
            if (isNaN(args[2])) return message.channel.send(`Please write what suggestion do you want to add reasons and try again.`)
            var num = args[2];
            if (args[3] == undefined) {
                serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                    if (server) {
                        if (server.suggstatus[num] == 1) {
                                const filter = m => m.author.id == message.author.id && m.channel.id == message.channel.id
                                message.channel.send(`Please write the reasons in 1 minute`);
                                message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                    .then(collected => {
                                        suggestion = collected.first().content;
                                        message.guild.channels.get(server.suggchannel).fetchMessage(server.suggestion[num]).then(msg => {
                                        msg.edit({embed :
                                            new Discord.RichEmbed()
                                                .setTitle(msg.embeds[0].title)
                                                .setColor(msg.embeds[0].color)
                                                .addField('Content', msg.embeds[0].fields[0].value)
                                                .addField('Status', msg.embeds[0].fields[1].value)
                                                .addField('Reason', suggestion)
                                                .setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
                                                });
                                            });
                                            message.channel.send(`Adding reason is successfully operated!`)
                                    })
                                .catch(collected => {
                                    return message.channel.send(`Please try it again.`);
                                });
                        }
                        else {
                            message.channel.send('Your suggestion is not ended.')
                        }
                    }
                    else {
                        message.channel.send(`Please execute the ${config.prefix}register command!`)
                    }
                });
            }
            else {
                args.shift();
                args.shift();
                args.shift();
                suggestion = args.join(' ');
                serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
                    if (server) {
                        if (server.suggstatus[num] == 1) {
                                message.guild.channels.get(server.suggchannel).fetchMessage(server.suggestion[num]).then(msg => {
                                    console.log(msg.embeds.content);
                                    msg.edit({embed :
                                        new Discord.RichEmbed()
                                            .setTitle(msg.embeds[0].title)
                                            .setColor(msg.embeds[0].color)
                                            .addField('Content', msg.embeds[0].fields[0].value)
                                            .addField('Status', msg.embeds[0].fields[1].value)
                                            .addField('Reason', suggestion)
                                            .setAuthor(msg.embeds[0].author.name, msg.embeds[0].author.iconURL)
                                            });
                                        });
                                message.channel.send(`Adding reason is successfully operated!`)
                            }
                        else {
                            message.channel.send('Your suggestion is not ended.')
                        }
                    }
                    else {
                        message.channel.send(`Please execute the ${config.prefix}register command!`)
                    }
                });
            }
        }
    }
}


