const Discord = require('discord.js')
const config = require('./config')

/**
 *
 * @param {Discord.Client} Client
 */

module.exports = function (Client) {
    //join
    Client.on('guildMemberAdd', member => {
        serversettingsModel.findOne({ serverId: member.guild.id }).then(server => {
            if (server.greetchannelId != "0") Client.channels.get(server.greetchannelId).send(`Welcome to ${member.guild.name}! ${member.toString()}`);

            if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                new Discord.RichEmbed()
                    .setTitle('Member Joined')
                    .setColor('RED')
                    .addField('Username', member.user.tag)
                    .addField('Joined Time', member.joinedAt)
                    .addField('Create time', member.user.createdAt)
                    .setAuthor(member.displayName, member.user.displayAvatarURL)
                                                                                          });
        });
    });

    Client.on('guildMemberRemove', member => {
        serversettingsModel.findOne({ serverId: member.guild.id }).then(server => {
            if (server.greetchannelId != "0") Client.channels.get(server.greetchannelId).send(`${member.user.tag} left ${member.guild.name} :sob:`);

            if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                new Discord.RichEmbed()
                    .setTitle('Member Left')
                    .setColor('RED')
                    .addField('Username', member.user.tag)
                    .addField('Roles', member.roles.map(m => m.toString()))
                    .addField('Joined Time', member.joinedAt)
                    .setAuthor(member.user.username, member.user.displayAvatarURL)
                                                                                          });
        });
    });

    Client.on('guildBanAdd', (server, member) => {
        serversettingsModel.findOne({ serverId: server.id }).then(server => {

            if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                new Discord.RichEmbed()
                    .setTitle('Member Banned')
                    .setColor('RED')
                    .addField('Username', member.tag)
                    .setAuthor(member.username, member.displayAvatarURL)
                                                                                          });
        });
    });

    Client.on('guildMemberUpdate', (old, newm) => {
        serversettingsModel.findOne({ serverId: newm.guild.id }).then(server => {
            if (old.displayName != newm.displayName) {
                if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                    new Discord.RichEmbed()
                        .setColor('RED')
                        .setTitle('Member Nickname Updated')
                        .addField('Username', newm.user.tag)
                        .addField('Nickname', old.displayName + ' => ' + newm.displayName)
                        .setAuthor(newm.displayName, newm.user.displayAvatarURL)
                                                                                              });
            }
            if (old.roles != newm.roles) {
                if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                    new Discord.RichEmbed()
                        .setTitle('Member Roles Updated')
                        .setColor('RED')
                        .addField('Username', newm.user.tag)
                        .addField('Roles', old.roles.map(m => m.toString()) + ' => ' + newm.roles.map(m => m.toString()))
                        .setAuthor(newm.displayName, newm.user.displayAvatarURL)
                                                                                              });
            }
        });
    });

    Client.on('channelCreate', channel => {
        if (channel.type == 'dm') return;
        serversettingsModel.findOne({ serverId: channel.guild.id }).then(server => {

            if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                new Discord.RichEmbed()
                    .setColor('GREEN')
                    .setTitle('Channel Created')
                    .addField('Channel', channel.toString())
                                                                                          });
        });
    });

    Client.on('channelDelete', channel => {
        serversettingsModel.findOne({ serverId: channel.guild.id }).then(server => {

            if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                new Discord.RichEmbed()
                    .setTitle('Channel Deleted')
                    .setColor('GREEN')
                    .addField('Channel', channel.name)
                                                                                          });
        });
    });

    Client.on('channelUpdate', (old, newc) => {
        serversettingsModel.findOne({ serverId: newc.guild.id }).then(server => {

            if (old.name != newc.name) {
                if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                    new Discord.RichEmbed()
                        .setTitle('Channel Name Updated')
                        .setColor('GREEN')
                        .addField('Channel', newc.toString())
                        .addField('Nickname', old.name + ' => ' + newc.name)
                                                                                              });
            }
            if (old.permissionOverwrites != newc.permissionOverwrites) {
                if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                    new Discord.RichEmbed()
                        .setTitle('Channel Permissions Updated')
                        .setColor('GREEN')
                        .addField('Channel', newc.toString())
                                                                                              });
            }
        });
    });

    Client.on('messageDelete', message => {
        serversettingsModel.findOne({ serverId: message.channel.guild.id }).then(server => {

            if (server.logchannelId != "0" && !message.author.bot) Client.channels.get(server.logchannelId).send({embed :
                new Discord.RichEmbed()
                    .setTitle('Message Deleted')
                    .setColor('BLUE')
                    .addField('Author', message.author.toString())
                    .addField('Content', message.content)
                    .addField('Channel', message.channel.toString())
                                                                                                                 });
        });
    });

    Client.on('messageUpdate', (old, newm) => {
        serversettingsModel.findOne({ serverId: newm.channel.guild.id }).then(server => {

            if (old.content != newm.content) {
                if (server.logchannelId != "0") Client.channels.get(server.logchannelId).send({embed :
                    new Discord.RichEmbed()
                        .setTitle('Message Updated')
                        .setColor('BLUE')
                        .addField('Author', newm.author.toString())
                        .addField('Content', old.content + ' => ' + newm.content)
                        .addField('Channel', newm.channel.toString())
                                                                                              });
            }
        });
    });

};
