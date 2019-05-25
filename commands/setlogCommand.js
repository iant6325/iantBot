const Discord = require('discord.js');

module.exports.alias = "setlog";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission('MANAGE_GUILD')) {
        serversettingsModel.findOne({ serverId: message.guild.id }).then(server => {
            if (server) {
                server.logchannelId = message.channel.id;
                server.save(err => {
                    if (err) return message.channel.send(`unexpected error happened`);
                    return message.channel.send(`Alright, this server's log channel is ${message.channel.toString()}`)
                });
            }
            else {
                message.channel.send(`Please execute the ${config.prefix}register command!`)
            }
        });
    }
}
