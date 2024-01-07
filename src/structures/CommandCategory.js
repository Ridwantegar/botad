const config = require("@root/config");

module.exports = {
  ADMIN: {
    name: "Admin",
    emoji: "⚙️",
  },
  AUTOMOD: {
    name: "Automod",
    enabled: config.STATS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🤖",
  },
  GIVEAWAY: {
    name: "Giveaway",
    enabled: config.STATS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🎉",
  },
  INVITE: {
    name: "Invite",
    enabled: config.INVITE.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "📨",
  },
  IMAGE: {
    name: "Image",
    enabled: config.IMAGE.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🖼️",
  },
  INFORMATION: {
    name: "Information",
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🪧",
  },
  MODERATION: {
    name: "Moderation",
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🔨",
  },
  MUSIC: {
    name: "Music",
    enabled: config.MUSIC.ENABLED,
    emoji: "🎵",
  },
  OWNER: {
    name: "Owner",
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🤴",
  },
  SUGGESTION: {
    name: "Suggestion",
    enabled: config.SUGGESTIONS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "📝",
  },
  TICKET: {
    name: "Ticket",
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "🎫",
  },
  STATS: {
    name: "Statistics",
    enabled: config.STATS.ENABLED,
    image: "https://cdn.discordapp.com/attachments/1153235645557379143/1180878965330681916/image_2023-11-29_223555964-removebg-preview-min.png?ex=659ab5bd&is=658840bd&hm=380f14a3ef21fdf0f2079d2243d072ec43619cfaa1dd513aeb9fae36da0cd219&",
    emoji: "📈",
  },
  UTILITY: {
    name: "Utility",
    emoji: "🛠",
  },
};
