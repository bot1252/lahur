//=============================== - [ Consts ] - ===================================//
const inlinereply = require('discord-reply');
const Discord = require("discord.js");
const { MessageButton } = require("discord-buttons");
const bot = new Discord.Client(); 
require('discord-buttons')(bot);
const { Token, Color, Image, Footer, Author } = require("./config.js");
const fs = require("fs");
const request = require("request");
const prefix = "s!";
const { Collection, MessageEmbed } = require("discord.js");
const { inspect } = require("util");
let dev = ["738478465870987425","386188491953799178"];
const cmd = require("node-cmd");
const { I18n } = require("locale-parser");
bot.reva = new I18n({ defaultLocale: "en" });

bot.login("ODEzMTMxNDM2MjY1MDQ2MDY4.YDK1qQ.Yj-mAudgLO0c04ita59t1LeHMxY")
global.mongoose = require('mongoose')
mongoose.connect("mongodb+srv://antivandalism:reman1234@cluster0.prbzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to the Mongodb database.");
}).catch((err) => {
  console.log("Unable to connect to the Mongodb database. Error:" + err);
});
global.Guild = require("./data/guild.js");
global.User = require("./data/user.js");
global.Lang = require("./data/lang.js");
global.Prime = require("./data/prime.js");
global.Owner = require("./data/owner.js");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.catagories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handler/${handler}`)(bot);
});
/**/
let util = require("util"),
  readdir = util.promisify(fs.readdir);

const init = async () => {
  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = new(require(`./events/${file}`))(bot);
    bot.on(eventName, (...args) => event.run(...args, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
};
init();

bot.on("ready", () => {
  console.log(`[!]-------------------------------------[!]`);
  console.log(`Display Name : ${bot.user.username}`);
  console.log(`Public Prefix : ${prefix}`);
  console.log(`Version : 4.0.0`);
  console.log(`[!]-------------------------------------[!]`);
});

bot.on("ready", async () => {
  console.log(`bot now is ready!`);
  await bot.user.setStatus("idle");
  await bot.user.setActivity(`${prefix}help`, { type: "COMPETING" });
 
 });

////
bot.on("clickButton", async (button) => {
 console.log(button.id);
});
//=============================== - [ ghostping ] - ===================================//

/*bot.on("messageDelete", (message) => {

if (!message.channel.guild) return;
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if (!guild) { Guild.create({ guildID: message.guild.id }); }
  if (guild) {
    if (guild.ghostping.onoff === "off") return;
    let Ww = await Owner.findOne({ ownerCode: "738478465870987425" });
    if (Ww.worldWhitelist.find((c) => c.type === message.author.id)) return;
    if (message.author.bot) return;
if (message.mentions.users.first()) {
    message.channel.send(new Discord.MessageEmbed().setColor(Color) .setTitle("Ghost Ping Detected!")
            .setDescription(`**${message.author}** just pinged **${
         message.mentions.users.first().username
       }** and then someone deleted the message!`)
            .addField("Deleted message content", `||**${
         message.mentions.users.first().username
       }**||`));
   }
  }
});*/

//=============================== - [ antimention ] - ===================================//

/*bot.on('message', message => {
  let non = ['@here','@everyone']
  if(non.some(w => message.content.includes(w))) {
    if(message.member.hasPermission("MENTION_EVERYONE")) return;
        var roled = message.guild.roles.cache.filter(r => r.name.toLowerCase() === 'muted').first();
        if(roled){
      message.member.roles.add(roled)
    }
    if(message.deletable){
      message.channel.send('').then(m => m.delete({timeout:5000}))
      message.delete()
    }
  }
})*/

//=============================== - [ antispam ] - ===================================//

/*const usersMap = new Map();
const LIMIT = 5;
const TIME = 6000;
const DIFF = 7000;

bot.on("message", async message => {
  if (!message.channel.guild) return;
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if (!guild) { Guild.create({ guildID: message.guild.id }); }
  if (guild) {
    if (guild.spam.onoff === "off") return;
   let Ww = await Owner.findOne({ ownerCode: "738478465870987425" });
    if (Ww.worldWhitelist.find((c) => c.type === message.author.id)) return;
  if (message.author.id === message.guild.ownerID) return console.log("owner");
    if (guild.whitelist.find((c) => c.type === message.author.id))
      return console.log("whitelist");
    let pun = guild.punishment;
    if (message.author.bot) return;
    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      if (difference > DIFF) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
        if (parseInt(msgCount) >= LIMIT) {
          if (pun === "ban") {
            if (!message.member.bannable) return console.log(`${message.member.username} I can't ban this man`);
            message.channel.guild.members.cache
              .get(message.author.id)
              .ban()
            message.channel.bulkDelete(msgCount, true);
          } else if (pun === "kick") {
            if (!message.member.kickable) return console.log(`${message.member.username} I can't kick this man`);
            message.channel.guild.members.cache
              .get(message.author.id)
              .kick()
              .then(k => {
               guild.owner.send(
                  `**⇏<@${message.author.id}> is kicked because spaming in channel**`
                );
              });
            message.channel.bulkDelete(msgCount, true);
          } else {
            message.channel.guild.members.cache
              .get(message.author.id)
              .kick()
              .then(k => {
               guild.owner.send(
                  `**⇏<@${message.author.id}> is kicked because spaming in channel**`
                );
              });
            message.channel.bulkDelete(msgCount, true);
          }
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
  }
});*/

const usersMap = new Map();
const LIMIT = 5;
const TIME = 6000;
const DIFF = 7000;

bot.on("message", async message => {
  if (!message.channel.guild) return;
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if (!guild) { Guild.create({ guildID: message.guild.id }); }
  if (guild) {
    if (guild.spam.onoff === "off") return;
    let Ww = await Owner.findOne({ ownerCode: "738478465870987425" });
    if (Ww.worldWhitelist.find((c) => c.type === message.author.id)) return;
    if (message.author.id === message.guild.ownerID) return console.log("owner");
    if (guild.whitelist.find((c) => c.type === message.author.id))
      return console.log("whitelist");
    let pun = guild.punishment;
    if (message.author.bot) return;
    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      if (difference > DIFF) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
        if (parseInt(msgCount) >= LIMIT) {
          if (pun === "") {
            if (!message.member.bannable) return console.log(`${message.member.username} I can't ban this man`);
            message.channel.guild.members.cache
              .get(message.author.id)
              .ban()
            message.channel.bulkDelete(msgCount, true);
          } else {
            message.channel.guild.members.cache
              .get(message.author.id)
              .kick()
              .then(k => {
                guild.owner.send(new Discord.MessageEmbed().setColor(Color).setDescription(
                  `This user is kicked because spaming in channel\nTag: ${message.author.tag}\nID: ${message.author.id}`
                ));
              });
            message.channel.bulkDelete(msgCount, true);
          }
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
           } 
        }
       } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
}
});
//==================================================================//
