const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');
module.exports.alias = "translate";

/**
* 
* @param {Discord.Message} message 
*/

module.exports.process = function (message) {
  let args = message.content.split(' ');
  args.shift();
  var lang = args[0]
  args.shift();
  
  translate(args.join(' '), { to: lang }).then(res => {
   message.channel.send({embed :
    new Discord.RichEmbed()
    .setDescription(res.text)
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    });
  }).catch(res => {
    message.channel.send(`The language code ${lang} is not available. You can find language code in this website
 http://www.lingoes.net/en/translator/langcode.htm`);
  });
};
