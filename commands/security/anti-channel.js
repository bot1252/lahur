const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "anti",
  aliases: ["antichannel"],
  description: "Prevent others from crating or deleting channels",
  usage: ["s!anti channel [number/on/off]"],
  category: ["Security"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {
  if (args[1] === "channel") {
   let guild = await Guild.findOne({ guildID: message.guild.id });
     let num = args[2];
    if (args[2] === "on") {
      guild.channel.onoff = "on";
      guild.channel.user = message.author.id
      guild.save();
      const embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`<a:true:854842599444709386> You have **Enable** antichannel`);
      return message.channel.send(embed);
     } else if (args[2] === "off") {
         guild.channel.onoff = "off";
         guild.save();
      const embed1 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`<a:false:854842600351334440> You have **Disable** antichannel`);
      return message.channel.send(embed1);
    }
    if (isNaN(num) || parseInt(num) < 1) {
      const embed2 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`error syntax <a:false:854842600351334440>\n ${guild.prefix}antichannel [on,off,<number>]`
        );
      return message.channel.send(embed2);
    }
    guild.channel.user = message.author.id
    guild.channel.lmite = num;
    guild.save();
    const embed3 = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(`Successfully antichannel changed to **${guild.channel.lmite}** <:punish:836022893691011092>
`);
    return message.channel.send(embed3);
  }
}
}
