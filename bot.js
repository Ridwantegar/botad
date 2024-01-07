require("dotenv").config();
require("module-alias/register");

// register extenders
require("@helpers/extenders/Message");
require("@helpers/extenders/Guild");
require("@helpers/extenders/GuildChannel");

const { checkForUpdates } = require("@helpers/BotUtils");
const { initializeMongoose } = require("@src/database/mongoose");
const { BotClient } = require("@src/structures");
const { validateConfiguration } = require("@helpers/Validator");
const { EmbedBuilder } = require("discord.js");
const leaveserver = require("./src/commands/owner/leaveserver");
validateConfiguration();

// initialize client
const client = new BotClient();
client.loadCommands("src/commands");
client.loadContexts("src/contexts");
client.loadEvents("src/events");
//Welcome Gateway
client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  if (!member && !member.guild && !member.guild.id) return;
  const guild = client.guilds.cache.get("1089504019027861564");
  const channel = guild.channels.cache.get("1089511463409942619")
  if (member.user.username.length > 25)
    member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15)
    member.guild.name = member.guild.name.slice(0, 15) + "...";
    const welcome = new EmbedBuilder()
  .setThumbnail(member.user.displayAvatarURL())
  .setColor("#000000")
  .setDescription(`**Hello! Welcome to Adn@n^Room™**
  ────────── ◈ ───────────
  📥 ${member}, Hello! Welcome to Adn@n^Room™
  ────────── ◈ ───────────
  Read the rules in the rules channel 
  <#1089527346895278170>
  And don't forget to take your role at 
  <#1089557797018026014>`)
  .setImage("https://media.discordapp.net/attachments/1090143024736112640/1111749912124723220/giphy_3.gif?ex=65aad8ca&is=659863ca&hm=ec0975830f4b8aed3ed73dcb8a2291c15421db6dd7d1a6c5f61149f61ecaa35a&=")

  channel.send({ embeds: [welcome]}).catch(() => { })
  });

  //godbay Gateway
client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  if (!member && !member.guild && !member.guild.id) return;
  const guild = client.guilds.cache.get("1089504019027861564");
  const channel = guild.channels.cache.get("1089504175911620669")
  if (member.user.username.length > 25)
    member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15)
    member.guild.name = member.guild.name.slice(0, 15) + "...";
    const godbay = new EmbedBuilder()
  .setThumbnail(member.user.displayAvatarURL())
  .setColor("#000000")
  .setDescription(`**Goodbye!™**
  ────────── ◈ ───────────
   ${member}, **has left the server.** We'll miss you!`)
  .setImage("https://media.discordapp.net/attachments/1090143024736112640/1111750460924235776/giphy_4.gif?ex=65aad94d&is=6598644d&hm=d3cd3db73a4d0f2dec7ad2e14722c33df67a0e0c2d33ef2221498ee07e6678d4&=")

  channel.send({ embeds: [godbay]}).catch(() => { })
  });


// find unhandled promise rejections
process.on("unhandledRejection", (err) => client.logger.error(`Unhandled exception`, err));

(async () => {
  // check for updates
  await checkForUpdates();

  // start the dashboard
  if (client.config.DASHBOARD.enabled) {
    client.logger.log("Launching dashboard");
    try {
      const { launch } = require("@root/dashboard/app");

      // let the dashboard initialize the database
      await launch(client);
    } catch (ex) {
      client.logger.error("Failed to launch dashboard", ex);
    }
  } else {
    // initialize the database
    await initializeMongoose();
  }

  // start the client
  await client.login(process.env.BOT_TOKEN);
})();
