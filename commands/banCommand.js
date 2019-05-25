const Discord = require('discord.js');

module.exports.alias = "ban";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission('BAN_MEMBERS')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (message.guild.members.find(user => user.displayName == args[1])) {
            ban_member = message.guild.members.find(user => user.displayName == args[1]);
        }
        else if (message.mentions.members.first()) ban_member = message.mentions.members.first();
        else return message.channel.send(`Please mention or write nickname of the member you want to ban.`);

        if (message.member.highestRole.position < ban_member.highestRole.position) return message.channel.send(`${ban_member.displayName} has higher role than you!`);
        if (!message.guild.member(ban_member).bannable) return message.channel.send(`${ban_member.displayName} has higher role than me!`);

        message.channel.send(`${ban_member.displayName} is banned`);
        ban_member.ban();

    }
    else message.channel.send(`You need Kick Members permission to use this command.`);
}
