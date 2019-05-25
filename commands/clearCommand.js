const Discord = require('discord.js');

module.exports.alias = "clear";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (!isNaN(args[1])) message.channel.bulkDelete(Number(args[1]));
        else message.channel.send(`Please type like this ``i!clear <number>```)

    }
    else message.channel.send(`You need Manage Message permission to use this command.`);
}
