const Discord = require('discord.js');
const config = require('./config');
const Grammarbot = require('grammarbot');
const fs = require('fs');

const bot = new Grammarbot({
    'api_key' : 'AF5B9M2X',      // (Optional) defaults to node_default
    'language': 'en-US',         // (Optional) defaults to en-US
    'base_uri': 'api.grammarbot.io', // (Optional) defaults to api.grammarbot.io
  });

const commands = [];

/**
 * 
 * @param {Discord.Client} Client 
 */
module.exports = function (Client) {
    Client.on('message', message => {
        if (message.channel.type == "dm") {
            if (message.author.bot) return;
            console.log(message.content);
            bot.check('this is a example', function(error, result) {
                if (!error) message.channel.send(result.message);
              });
            }
    });
}
