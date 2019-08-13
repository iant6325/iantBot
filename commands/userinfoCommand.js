const Discord = require('discord.js');

module.exports.alias = "userinfo";

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports.process = function (message) {
    {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (args[1] == undefined) {
            usersModel.findOne({ serverId: message.guild.id, userId: message.author.id }).then(user => {
                if (user) {
                    return send_userinfo(message, message.member, user.warn, user.description)
                }
                else {
                    return send_userinfo(message, message.member, 0, 'Set your description using $setdescription')
                }
            });
        }
        else if (message.mentions.members.first()) {
            target = message.mentions.members.first();
            usersModel.findOne({ serverId: message.guild.id, userId: target.id }).then(user => {
                if (user) {
                    return send_userinfo(message, target, user.warn, user.description)
                }
                else {
                    return send_userinfo(message, target, 0, 'Set your description using $setdescription')
                }
            });
        }
        else return message.channel.send(`Please mention someone!.`);

    };
}

function send_userinfo(message, target, warn, description) {
    return message.channel.send({embed :
        new Discord.RichEmbed()
            .setColor(target.displayHexColor)
            .setTitle(target.displayName + ' Userinfo')
            .setDescription(description)
            .setThumbnail(target.user.displayAvatarURL)
            .addField('Roles', target.roles.map(m => m.toString()))
            .addField('Joined date', target.joinedAt, true)
            .addField('Created date', target.user.createdAt, true)
            .addField('Warns', warn, true)
            .setTimestamp()
            .setFooter('Requsted by ' + message.member.displayName, message.author.displayAvatarURL)
    });
}
