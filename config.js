const emo = {
  giveaways: "<:money:1166681144947920957>"
}

module.exports = {
  OWNER_IDS: ["1125031170422345738","865590446297186314"], // Bot owner ID's
  SUPPORT_SERVER: "https://discord.gg/PnghSSj42r", // Your bot support server
  PREFIX_COMMANDS: {
    ENABLED: true, // Enable/Disable prefix commands
    DEFAULT_PREFIX: "ad!", // Default prefix for the bot
  },
  INTERACTIONS: {
    SLASH: true, // Should the interactions be enabled
    CONTEXT: false, // Should contexts be enabled
    GLOBAL: true, // Should the interactions be registered globally
    TEST_GUILD_ID: "1089504019027861564", // Guild ID where the interactions should be registered. [** Test you commands here first **]
  },
  EMBED_COLORS: {
    BOT_EMBED: "#000000",
    TRANSPARENT: "#000000",
    SUCCESS: "#000000",
    ERROR: "#000000",
    WARNING: "#000000",
  },
  CACHE_SIZE: {
    GUILDS: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },
  MESSAGES: {
    API_ERROR: "Unexpected Backend Error! Try again later or contact support server",
  },

  // PLUGINS

  AUTOMOD: {
    ENABLED: true,
    LOG_EMBED: "#000000",
    DM_EMBED: "#000000",
  },

  DASHBOARD: {
    enabled: false, // enable or disable dashboard
    baseURL: "http://localhost:8080", // base url
    failureURL: "http://localhost:8080", // failure redirect url
    port: "8080", // port to run the bot on
  },

  ECONOMY: {
    ENABLED: true,
    CURRENCY: "₪",
    DAILY_COINS: 100, // coins to be received by daily command
    MIN_BEG_AMOUNT: 100, // minimum coins to be received when beg command is used
    MAX_BEG_AMOUNT: 2500, // maximum coins to be received when beg command is used
  },

  MUSIC: {
    ENABLED: true,
    IDLE_TIME: 900000000000000000n, // Time in seconds before the bot disconnects from an idle voice channel
    MAX_SEARCH_RESULTS: 500,
    DEFAULT_SOURCE: "YT", // YT = Youtube, YTM = Youtube Music, SC = SoundCloud
    // Add any number of lavalink nodes here
    // Refer to https://github.com/freyacodes/Lavalink to host your own lavalink server
    LAVALINK_NODES: [
      {
        host: "lavalink.neonnetworks.cc",
        port: 3648,
        password: "youshallnotpass",
        id: "hibki",
        secure: false,
      },
    ],
  },

  GIVEAWAYS: {
    ENABLED: true,
    REACTION: `${emo.giveaways}`,
    START_EMBED: "#000000",
    END_EMBED: "#000000",
  },

  IMAGE: {
    ENABLED: true,
    BASE_API: "https://strangeapi.fun/api",
  },

  INVITE: {
    ENABLED: false,
  },

  MODERATION: {
    ENABLED: true,
    EMBED_COLORS: {
      TIMEOUT: "#000000",
      UNTIMEOUT: "#000000",
      KICK: "#000000",
      SOFTBAN: "#000000",
      BAN: "#000000",
      UNBAN: "#000000",
      VMUTE: "#000000",
      VUNMUTE: "#000000",
      DEAFEN: "#000000",
      UNDEAFEN: "#000000",
      DISCONNECT: "#000000",
      MOVE: "#000000",
    },
  },

  PRESENCE: {
    ENABLED: true, // Whether or not the bot should update its status
    STATUS: "online", // The bot's status [online, idle, dnd, invisible]
    TYPE: "WATCHING", // Status type for the bot [PLAYING | LISTENING | WATCHING | COMPETING]
    MESSAGE: "${member} members in {servers} servers", // Your bot status message
  },

  STATS: {
    ENABLED: true,
    XP_COOLDOWN: 5, // Cooldown in seconds between messages
    DEFAULT_LVL_UP_MSG: "${member}, You just advanced to **Level {level}**",
  },

  SUGGESTIONS: {
    ENABLED: false, // Should the suggestion system be enabled
    EMOJI: {
      UP_VOTE: "⬆️",
      DOWN_VOTE: "⬇️",
    },
    DEFAULT_EMBED: "#000000",
    APPROVED_EMBED: "#000000",
    DENIED_EMBED: "#000000",
  },

  TICKET: {
    ENABLED: false,
    CREATE_EMBED: "#000000",
    CLOSE_EMBED: "#000000",
  },
};
