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
            return message.channel.send({embed : 
                new Discord.RichEmbed()
                    .setTitle('Ban')
                    .setDescription('Usage : $ban <ping or name>\nBan user. Requires Ban Members permission.')
                                        });
        }

        else if (args[1] == 'clear') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('Clear')
                    .setDescription('Usage : $clear <number>\nRemove the messages. Requires Manage Messages permission.')
                                        });
        }

        else if (args[1] == 'kick') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('Kick')
                    .setDescription('Usage : $kick <ping or name>\nKick user. Requires Kick Members permission.')
                                        });
        }

        else if (args[1] == 'warn') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('Warn')
                    .setDescription('Usage : $warn <ping or name> <reason>\nWarn user. Requires Kick Members and Ban Members permission.')
                                        });
        }

        else if (args[1] == 'pardon') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('Pardon')
                    .setDescription('Usage : $pardon <ping or name> <reason>\nPardon user. Requires Kick Members and Ban Members permission.')
                                        });
        }

        else if (args[1] == 'setlog') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('SetLog')
                    .setDescription('Usage : $setlog\nThe bot will start logging stuffs in that channel.')
                                        });
        }

        else if (args[1] == 'setgreeting') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('SetGreeting')
                    .setDescription('Usage : $setgreeting\nThe bot will start greeting new members in that channel.')
                                        });
        }

        else if (args[1] == 'settranslate') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('SetTranslate')
                    .setDescription('Usage : $settranslate\nThe bot will start translate the messages in that channel.')
                                        });
        }

        else if (args[1] == 'setsuggestion') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('SetSuggestion')
                    .setDescription('Usage : $settranslate\nThe bot will start showing suggestion made by $suggestion')
                                        });
        }

        //user

        else if (args[1] == 'userinfo') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('UserInfo')
                    .setDescription('Usage : $userinfo <ping>\nIt will show your information')
                                        });
        }

        else if (args[1] == 'setdescription') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('SetDescription')
                    .setDescription('Usage : $setdescription <string>\nSet description in $userinfo')
                                        });
        }
        
        else if (args[1] == 'translate') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('Translate')
                    .setDescription('Usage : $translate <language code> <string>\nTranslate your text to any language!')
                                        });
        }

        else if (args[1] == 'suggestion') {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('Suggestion')
                    .setDescription('Usage : $suggestion <code>\n$suggestion -a/-add/add <text> : Add your suggestion!\n$suggestion -e/-edit/edit <number> <text> : Edit your existing Suggestions.\n$suggestion -c/-accept/accept <number> : Accept the suggestion\n$suggestion -d/-deny/deny <number> : Deny the suggestion\n$suggestion -r/-reason/reason <number> <text> : Add or Edit the reason')
                                        });
        }
        
        else if (args[1] == undefined) {
            if (message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('__Commands__')
                    .setDescription('You can see more informations about the commands by typing $help <command>. Also if you need the guide of the bot, type $guide for more help.')
                    .addField('Server Commands : ', '``Ban`` ``Clear`` ``Kick`` ``Pardon`` ``SetGreeting`` ``SetLog`` ``SetTranslate`` ``SetSuggestion ``Warn``')
                    .addField('User Commands : ', '``Userinfo`` ``SetDescription``')
                    .addField('Fun Commands : ', '``Translate``')
                                        });
            }
            else {
                return message.channel.send({embed :
                new Discord.RichEmbed()
                    .setTitle('__Commands__')
                    .setDescription('You can see more informations about the commands by typing $help <command>.')
                    .addField('User Commands : ', '``Userinfo`` ``SetDescription`` ``Suggestion``')
                    .addField('Fun Commands : ', '``Translate``')
                                        });
            }
        }

        else {
            message.channel.send(`The command **${args[1]}** is not available. Use $help for more information`)
        }
    };
}
