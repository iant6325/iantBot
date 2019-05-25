const Discord = require('discord.js');

module.exports.alias = "kick";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (message.guild.members.find(user => user.displayName == args[1])) {
            kick_member = message.guild.members.find(user => user.displayName == args[1]);
        }
        else if (message.mentions.members.first()) kick_member = message.mentions.members.first();
        else return message.channel.send(`Please mention or write nickname of the member you want to kick.`);
        console.log(message.member.highestRole.position, kick_member.highestRole.position);
        if (message.member.highestRole.position <= kick_member.highestRole.position) return message.channel.send(`${kick_member.displayName} has higher role than you!`);
        if (!message.guild.member(kick_member).bannable) return message.channel.send(`${kick_member.displayName} has higher role than me!`);

        message.channel.send(`${kick_member.displayName} is kicked`);
        kick_member.kick();

    }
    else message.channel.send(`You need Kick Members permission to use this command.`);
}
