const { commandHandler, automodHandler, statsHandler, } = require("@src/handlers");
const { PREFIX_COMMANDS } = require("@root/config");
const { getSettings } = require("@schemas/Guild");
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js")

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Message} message
 */

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const settings = await getSettings(message.guild);

  // command handler
  let isCommand = false;
  if (PREFIX_COMMANDS.ENABLED) {
    // check for bot mentions
    // if (message.content.includes(`${client.user.id}`)) {
    //    const row2 = new ActionRowBuilder()
    //   .addComponents(new ButtonBuilder().setEmoji("<:instagram:1181499669596098581>").setURL("https://instagram.com/nimenation_").setStyle(ButtonStyle.Link))
    //   .addComponents(new ButtonBuilder().setEmoji("<:icons8discord48:1175352665757208618>").setURL("https://discord.gg/nimenation").setStyle(ButtonStyle.Link))
    //   const embed = new EmbedBuilder()
    //   .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
    //   .setColor("Red")
    //   .setDescription(`${client.user.username}'s prefix on the **${message.guild.name}** server is \`\`${settings.prefix}\`\`. Use the \`\`${settings.prefix}help\`\` command to see the entire list of available commands.`)
    //   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    //   .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })});

    //   message.channel.safeSend({ embeds: [embed], components: [row2] });
    // }

    if (message.content && message.content.startsWith(settings.prefix)) {
      const invoke = message.content.replace(`${settings.prefix}`, "").split(/\s+/)[0];
      const cmd = client.getCommand(invoke);
      if (cmd) {
        isCommand = true;
        commandHandler.handlePrefixCommand(message, cmd, settings);
      }
      // if (member.user.bot) return;
      // if (!member && !member.guild && !member.guild.id) return;
      const guild = client.guilds.cache.get("1142674365817823294");
      const channel = guild.channels.cache.get("1161119985255596033")
      const embed = new EmbedBuilder()
      .setAuthor({ name: `Logs Commands Server ${message.guild.name}`, iconURL: `${message.guild.iconURL()}` })
      .setColor("Red")
      .addFields([
          { name: "**User:**", value: `<@${message.author.id}>`, inline: true },
          { name: "**ID:**", value: `\`\`\`${message.author.id}\`\`\``, inline: true },
          { name: "**Date:**", value: `\`\`\`[${new Date().toString().split(" ", 5).join(" ")}]\`\`\``, inline: true },
          {
              name: "**Guild:**",
              value: `\`\`\`${message.guild.id}\`\`\``,
              inline: true
          },
          {
            name: "**Guild Name:**",
            value: `\`\`\`${message.guild.name}\`\`\``,
            inline: true
          },
          { name: "**Run Commands:**", value: `**\`\`\`${settings.prefix}${invoke}\`\`\`**`, inline: true },
          { name: "**Channel:**", value: `<#${message.channel.id}>`, inline: false },
      ])
      .setTimestamp();
      channel.send({ embeds: [embed]}).catch(() => { });
    }
  }

  // stats handler
  if (settings.stats.enabled) await statsHandler.trackMessageStats(message, isCommand, settings);

  // if not a command
  if (!isCommand) await automodHandler.performAutomod(message, settings);
};
