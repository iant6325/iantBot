const discord = require('discord.js');
const mongoose = require('mongoose');

config = require('./config');  //config file is not included in GIthub
const CommandSystem = require('./commandSystem')
const PersonalCommand = require('./personalCommandSystem')
const Log = require('./log.js')
const Translate = require('./translate.js');
const Grammar = require('./grammar.js');

const serversettingsSchema = new mongoose.Schema({
    serverId: String,
    serverName: String,
    logchannelId: String,
    greetchannelId: String,
    translateId: String,
    translatelang: String,
    webhookid: String,
    webhooktoken: String,
    suggestion: [String],
    suggmember: [String],
    suggchannel: String,
    suggstatus: [String],
});

const usersSchema = new mongoose.Schema({
    serverId: String,
    userId: String,
    warn: Number,
    description: String,
    credits: Number,
});

serversettingsModel = connection.model('serversettings', serversettingsSchema);
usersModel = connection.model('rsdusers', usersSchema);

const Client = new discord.Client();

Client.on('ready', () => {
    console.log(`Bot is ready, logged in as '${Client.user.username}#${Client.user.discriminator}'`);
    CommandSystem(Client);
    //PersonalCommand(Client);
    Log(Client);
    Grammar(Client);
    Translate(Client);

    // Oh no! It'S oVeR :(((
});

// Client.on('guildMemberAdd', member => {
//     let newUserCredits = {
//         userId: member.user.id,
//         lastDailyBonusCollectTime: 0,
//         credits: 0
//     };
//     console.log(newUserCredits);
//     creditsModel.insertMany([newUserCredits]);
//     const defaultChannel = member.guild.channels.find(c => c.name == "discussion");
//     console.log(defaultChannel);
//     console.log(defaultChannel.send);
//     defaultChannel.send(`${member.user.username}#${member.user.discriminator} has joined, given 0 credits to him.`);
// });

Client.on("guildCreate", guild => {
    let newServerSettings = {
        serverId: guild.id,
        serverName: guild.name,
        logchannelId: '0',
        greetchannelId: '0',
        translateId: '0',
        translatelang: "en",
        webhookid: '0',
        webhooktoken: '0',
        suggchannel: "0",
        suggestion: [0],
        suggmember: [0],
        suggstatus: [0]
    };
    new serversettingsModel(newServerSettings).save(err => {
        if (err) throw err;
        return 0;
    });
});

Client.login(config.token);
