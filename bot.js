const Commando = require('discord.js-commando');
const client = new Commando.Client();
const config = require('./config.json');
const ytdl = require('ytdl-core-discord');
const fs = require('fs');

//const queue = new Map();

//client.registry.registerGroup('music', 'Music');
//client.registry.registerDefaults();
//client.registry.registerCommandsIn(__dirname + "/commands");

client.on("ready", async () => {
        console.log(`Logged in as ${client.user.tag} on ${client.guilds.size} servers!`);
        console.log(``);
        console.log(`TG: you arent ready for these mad beats yo`);
        console.log(`────█▀█▄▄▄▄─────██▄`);
        console.log(`────█▀▄▄▄▄█─────█▀▀█`);
        console.log(`─▄▄▄█─────█──▄▄▄█`);
        console.log(`██▀▄█─▄██▀█─███▀█`);
        console.log(`─▀▀▀──▀█▄█▀─▀█▄█▀`);
//        return client.shard.fetchClientValues('guilds.size')
//  		.then(results => {
//			return client.user.setActivity(`over ${results.reduce((prev, guildCount) => prev + guildCount, 0)}`, {type: 'WATCHING'});
//		})
//			.catch(console.error);
        client.user.setActivity(`${client.guilds.size} servers`, {type: 'LISTENING'})
//        client.user.setActivity("currently under construction!", {type: 'WATCHING'})
    }
);

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const prefixes = ['dave ', 'ds '];
    let prefix = false;
    for (const thisPrefix of prefixes) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
    };
        if(!prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (command === 'stats') {
        const promises = [
		client.shard.fetchClientValues('guilds.size'),
        client.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)')
    ];
		return Promise.all(promises)
       	.then(results => {
	        const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
            const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
  				return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
  			}).catch(console.error);
    } else
    if (command === 'play') {
        var channel = message.member.voice.channel;
        if (!channel) return message.channel.send("cant find your voice channel bro");
        if (!args[0]) return message.channel.send("you gotta tell me what song you want");
        else { 
            channel.join()
            .then((connection) => {
                let dispatcher = connection.play((fs.createReadStream((__dirname + `/sounds/${args[0]}.mp3`), {
                    type: 'ogg/opus', filter: 'audioonly', volume: true
                })))
                dispatcher.on('finish', async => {
                    dispatcher.end();
                    channel.leave();
                })
                dispatcher.on('error', error => {
                    message.channel.send("that's not a valid song. see `ds help sb` for a list of all my songs")
                });
            })
        }
    } else
    if (command === 'leave') {
        var channel = message.member.voice.channel;
        channel.leave()
    } else
    if (command === 'pause') {
        var channel = message.member.voice.channel;
        if (!channel) return;
        else {
            dispatcher.pause();
        }
    } else
    if (command === 'resume') {
        var channel = message.member.voice.channel;
        if (!channel) return;
        else {
            dispatcher.resume();
        }
    } else
    if (command === 'support') {
        message.channel.send("if you have found a bug or have a question please contact me on my personal server!\nhttps://discord.gg/8cEWeTB");
    } else
    if (command === 'suggest') {
        message.channel.send("if you have any suggestions please send them to me on my personal server!\nhttps://discord.gg/8cEWeTB")
    } else
    if (command === 'add') {
        message.channel.send("click here so i can play sick jams on your other servers\nhttps://discordapp.com/oauth2/authorize?client_id=578788338891489290&scope=bot")
    } else
    if (command === 'about') {
        message.channel.send(`dave runs on ${client.server.size} servers and is a small scale music bot/soundboard run by me, jj. i tried my best to write responses in dave's typing style, if it sounds fucky or you have a better idea please type ds suggest and hit me up in my server. if you have a request for a song to be added to the striderlibrary please also type ds suggest and hit me up in my server again.`);
    } else
    if (command === 'request') {
        message.channel.send('if you want a song added to the striderlibrary please message me on my personal server!\nhttps://discord.gg/8cEWeTB')
    } else
    if (command === 'help') {
        if (!args[0]) {
            message.channel.send({embed: {
                "color": 16711680,
                "description": "all of the following commands start with either `dave` or `ds`.",
                "fields": [{
                    "name": "`play`",
                    "value": "for more details please type ds help sb"},
                {   "name": "`leave`",
                    "value": "tells me to leave the voice channel"},
                {   "name": "`support`",
                    "value": "links bot author's support server"},
                {   "name": "`suggest",
                    "value": "tells you where to go to give feedback"},
                {   "name": "`add`",
                    "value": "adds me to your other servers"},
                {   "name": "`about`",
                    "value": "tells you about the bot"},
                {   "name": "`request`",
                    "value": "request songs be added to my library"}]
                }
            }
        )}
        else if (args[0] === 'sb') {
            message.channel.send({embed: {
                "color": 16711680,
                "fields": [{
                    "name": "heres all the available songs slash sound effects just type `ds play (song)` and itll work",
                    "value": "`aggreivance` `ascend`\n`beatdown` `beatup` `black` `blackrosegreensun` `bruh`\n`creata` `creataedit`\n`davekat` `davesprite` `deadshuffle` `descend` `doyouremem8erme`\n`elevatorstuck` `eternityservedcoldedit` `explore`\n`gamebro`\n`heirofgrief` `howdoilive`\n`jasperschorale`\n`karkalicious`\n`megalovania` `midnightcrewacapella` `midnightcrewpunk` `moonsetter` `moonsweater`\n`oppatobystyle`\n`sburbanjungle` `sunslammer`\n`upwardmovement`"}]
                }
            })
        }
    }
})
client.on("error", (e) => console.error(e));
client.login(config.token);