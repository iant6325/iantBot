const Discord = require('discord.js');

module.exports.alias = "help";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (args[1] == 'ban') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('Ban')
                    .setDescription('Usage : i!ban <ping or name>\nBan user. Requires Ban Members permission.')
            )
        }

        else if (args[1] == 'clear') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('Clear')
                    .setDescription('Usage : i!clear <number>\nRemove the messages. Requires Manage Messages permission.')
            )
        }

        else if (args[1] == 'kick') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('Kick')
                    .setDescription('Usage : i!kick <ping or name>\nKick user. Requires Kick Members permission.')
            )
        }

        else if (args[1] == 'warn') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('Warn')
                    .setDescription('Usage : i!warn <ping or name> <reason>\nWarn user. Requires Kick Members and Ban Members permission.')
            )
        }

        else if (args[1] == 'pardon') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('Pardon')
                    .setDescription('Usage : i!pardon <ping or name> <reason>\nPardon user. Requires Kick Members and Ban Members permission.')
            )
        }

        else if (args[1] == 'setlog') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('SetLog')
                    .setDescription('Usage : i!setlog\nThe bot will start logging stuffs in that channel.')
            )
        }

        else if (args[1] == 'setgreeting') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('SetGreeting')
                    .setDescription('Usage : i!setgreeting\nThe bot will start greeting new members in that channel.')
            )
        }

        else if (args[1] == 'settranslate') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('SetTranslate')
                    .setDescription('Usage : i!settranslate\nThe bot will start translate the messages in that channel.')
            )
        }

        //user

        else if (args[1] == 'userinfo') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('UserInfo')
                    .setDescription('Usage : i!userinfo <ping>\nIt will show your information')
            )
        }

        else if (args[1] == 'setdescription') {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('SetDescription')
                    .setDescription('Usage : i!setdescription <string>\nSet description in i!userinfo')
            )
        }

        else if (args[1] == undefined) {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setTitle('__Commands__')
                    .setDescription('You can see more informations about the commands by typing i!help <command>.')
                    .addField('Server Commands : ', '``Ban`` ``Clear`` ``Kick`` ``Pardon`` ``SetGreeting`` ``SetLog`` ``SetTranslate`` ``Warn``')
                    .addField('User Commands : ', '``Userinfo`` ``SetDescription``')
            )
        }

        else {
            message.channel.send(`The command **${args[1]}** is not available. Use i!help for more information`)
        }
    };
}
