const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "purge",
  aliases: ["clear"],
  description: "To clear the text channel",
  usage: ["s!purge [0/100]"],  
  category: ["Moderation"],
  enabled: true,			
  memberPermissions: [ "MANAGE_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (bot, message, dev) => {
   message.delete();
   let clear = new Discord.MessageEmbed()
         
let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args);
    if (args > 1000) {
      args = 1000
    }
    if (!messagecount) args = "1000";
    message.channel.bulkDelete(messagecount)
    message.channel.send(new Discord.MessageEmbed().setColor(Color).setDescription(`I have cleared **${args}** messages.`))
      .then(messages => setTimeout(() => message.delete(), 1000));
   
}
}
