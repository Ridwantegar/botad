const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS  } = require("@root/config");
const { timeformat } = require("@helpers/Utils");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const { stripIndent } = require("common-tags");
const { OWNER_IDS } = require("@root/config");

/**
 * @param {import('@structures/BotClient')} client
 */
module.exports = (client, message) => {
// STATS
let guilds = client.guilds.cache.size;
let channels = client.channels.cache.size;
let users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

// CPU
let platform = process.platform.replace(/win32/g, "Windows");
let architecture = os.arch();
let cores = os.cpus().length;
let cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;
let model = os.cpus()[0].model;
let speed = `${os.cpus()[0].speed} MHz`;

// RAM
let botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
let botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
let botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

let overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
let overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
let overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

let developer = `<@1125031170422345738>`;



let desc = "";
desc += `❒ Owner: ${developer}\n`;
desc += `❒ Total guilds: ${guilds}\n`;
desc += `❒ Total users: ${users}\n`;
desc += `❒ Total channels: ${channels}\n`;
desc += `❒ Command Count : ${client.commands.map(c => c.name).length}\n`;
desc += `❒ Ping: ${client.ws.ping} ms\n`;
desc += `❒ Speed: ${speed}\n`;
desc += "\n";

  const embed = new EmbedBuilder()
    .setTitle("Bot Information")
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(desc)
    .addFields(
      {
        name: "CPU",
        value: stripIndent`
        ❯ **OS:** ${platform} [${architecture}]
        ❯ **Cores:** ${cores}
        ❯ **Usage:** ${cpuUsage}
        `,
        inline: true,
      },
      {
        name: "Bot's RAM",
        value: stripIndent`
        ❯ **Used:** ${botUsed}
        ❯ **Available:** ${botAvailable}
        ❯ **Usage:** ${botUsage}
        `,
        inline: true,
      },
      {
        name: "Overall RAM",
        value: stripIndent`
        ❯ **Used:** ${overallUsed}
        ❯ **Available:** ${overallAvailable}
        ❯ **Usage:** ${overallUsage}
        `,
        inline: true,
      },
      {
        name: "Node.js Version",
        value: `\`${process.versions.node}\``,
        inline: true,
      },
      {
        name: "Discord.js Version",
        value: `\`${require("discord.js/package.json").version}\``,
        inline: true,
      },
            {
        name: "Bot Version",
        value: `\`v5.6.5\``,
        inline: true,
      },
      {
        name: "System",
        value: "```" + model + "```",
        inline: false,
      }
    );

  // Buttons
  const row2 = new ActionRowBuilder()
  .addComponents(new ButtonBuilder().setEmoji("<:icons8discord48:1175352665757208618> ").setURL("https://discord.gg/nimenation").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:4362958_tiktok_logo_socialmedia_:1181500627046637628>").setURL("https://www.tiktok.com/@nimenation").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:instagram:1181499669596098581>").setURL("https://instagram.com/nimenation_").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:line_167309:1181500241552347198>").setURL("https://liff.line.me/1645278921-kWRPP32q/?accountId=323mrmzf").setStyle(ButtonStyle.Link))
  .addComponents(new ButtonBuilder().setEmoji("<:youtube:1166671036700426270>").setURL("https://www.youtube.com/channel/UC5qqF4RvsMRYsrHyhRUMYXg").setStyle(ButtonStyle.Link))

  return { embeds: [embed], components: [row2] };
};
