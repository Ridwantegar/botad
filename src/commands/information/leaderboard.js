const { EmbedBuilder, escapeInlineCode, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");
const { getInvitesLb } = require("@schemas/Member");
const { getXpLb } = require("@schemas/MemberStats");

const leaderboardTypes = ["xp", "invite"];

/**
 * @type {import("@structures/Command")}
 */

module.exports = {
  name: "leaderboard",
  description: "display the XP, invite and rep leaderboard",
  category: "INFORMATION",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: false,
    aliases: ["lb"],
    minArgsCount: 1,
    usage: "<xp|invite>",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "type",
        description: "type of leaderboard to display",
        required: true,
        type: ApplicationCommandOptionType.String,
        choices: leaderboardTypes.map((type) => ({
          name: type,
          value: type,
        })),
      },
    ],
  },
  async messageRun(message, args, data) {
    const type = args[0].toLowerCase();
    let response;

    switch (type) {
      case "xp":
        response = await getXpLeaderboard(message, message.author, data.settings);
        break;
      case "invite":
        response = await getInviteLeaderboard(message, message.author, data.settings);
        break;
      default:
        response = "Invalid Leaderboard type. Choose either `xp`, `invite`or `rep`";
    }

    await message.safeReply(response);
  },

  async interactionRun(interaction, data) {
    const type = interaction.options.getString("type");
    let response;

    switch (type) {
      case "xp":
        response = await getXpLeaderboard(interaction, interaction.user, data.settings);
        break;
      case "invite":
        response = await getInviteLeaderboard(interaction, interaction.user, data.settings);
        break;
      default:
        response = "Invalid Leaderboard type. Choose either `xp`, `invite`or `rep`";
    }
    await interaction.followUp(response);
  },
};

// Create a Map object to store cache entries
const cache = new Map();

async function getXpLeaderboard({ guild }, author, settings) {
  // Create a cache key using the guild ID and the type of leaderboard
  const cacheKey = `${guild.id}:xp`;

  // Check if there is a cached result for this request
  if (cache.has(cacheKey)) {
    // Return the cached result if it exists
    return cache.get(cacheKey);
  }

  if (!settings.stats.enabled) return "The leaderboard is disabled on this server";

  const lb = await getXpLb(guild.id, 10);
  if (lb.length === 0) return "There are no users in the leaderboard";

  let collector = "";
  for (let i = 0; i < lb.length; i++) {
    try {
      const user = await author.client.users.fetch(lb[i].member_id);
      collector += `**#${(i + 1).toString()}** - ${escapeInlineCode(user.tag)}\n`;
    } catch (ex) {
      // Ignore
    }
  }

  const embed = new EmbedBuilder()
    .setAuthor({ name: "XP Leaderboard" })
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(collector)
    .setFooter({ text: `Requested by ${author.tag}` });

  // Store the result in the cache for future requests
  cache.set(cacheKey, { embeds: [embed] });
  return { embeds: [embed] };
}

async function getInviteLeaderboard({ guild }, author, settings) {
  // Create a cache key using the guild ID and the type of leaderboard
  const cacheKey = `${guild.id}:invite`;

  // Check if there is a cached result for this request
  if (cache.has(cacheKey)) {
    // Return the cached result if it exists
    return cache.get(cacheKey);
  }

  if (!settings.invite.tracking) return "Invite tracking is disabled on this server";

  const lb = await getInvitesLb(guild.id, 10);
  if (lb.length === 0) return "There are no users in the leaderboard";

  let collector = "";
  for (let i = 0; i < lb.length; i++) {
    try {
      const memberId = lb[i].member_id;
      if (memberId === "VANITY") collector += `**#${(i + 1).toString()}** - Vanity URL [${lb[i].invites}]\n`;
      else {
        const user = await author.client.users.fetch(lb[i].member_id);
        collector += `**#${(i + 1).toString()}** - ${escapeInlineCode(user.tag)} [${lb[i].invites}]\n`;
      }
    } catch (ex) {
      collector += `**#${(i + 1).toString()}** - DeletedUser#0000 [${lb[i].invites}]\n`;
    }
  }

  const embed = new EmbedBuilder()
    .setAuthor({ name: "Invite Leaderboard" })
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setDescription(collector)
    .setFooter({ text: `Requested by ${author.tag}` });

  // Store the result in the cache for future requests
  cache.set(cacheKey, { embeds: [embed] });
  return { embeds: [embed] };
}
