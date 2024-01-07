const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Cluster } = require("lavaclient");
const prettyMs = require("pretty-ms");
const { load, SpotifyItemType } = require("@lavaclient/spotify");
require("@lavaclient/queue/register");

/**
 * @param {import("@structures/BotClient")} client
 */
module.exports = (client) => {
  load({
    client: {
      id: process.env.SPOTIFY_CLIENT_ID,
      secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    autoResolveYoutubeTracks: false,
    loaders: [SpotifyItemType.Album, SpotifyItemType.Artist, SpotifyItemType.Playlist, SpotifyItemType.Track],
  });

  const lavaclient = new Cluster({
    nodes: client.config.MUSIC.LAVALINK_NODES,
    sendGatewayPayload: (id, payload) => client.guilds.cache.get(id)?.shard?.send(payload),
  });

  client.ws.on("VOICE_SERVER_UPDATE", (data) => lavaclient.handleVoiceUpdate(data));
  client.ws.on("VOICE_STATE_UPDATE", (data) => lavaclient.handleVoiceUpdate(data));

  lavaclient.on("nodeConnect", (node, event) => {
    client.logger.log(`Node "${node.id}" connected`);
  });

  lavaclient.on("nodeDisconnect", (node, event) => {
    client.logger.log(`Node "${node.id}" disconnected`);
  });

  lavaclient.on("nodeError", (node, error) => {
    client.logger.error(`Node "${node.id}" encountered an error: ${error.message}.`, error);
  });

  lavaclient.on("nodeDebug", (node, message) => {
    client.logger.debug(`Node "${node.id}" debug: ${message}`);
  });

  lavaclient.on("nodeTrackStart", (_node, queue, song) => {
    const fields = [];

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Now Playing" })
      .setColor(client.config.EMBED_COLORS.BOT_EMBED)
      .setDescription(`[${song.title}](${song.uri})`)
      // .setFooter({ text: `Requested By: ${song.requester}` });

    if (song.sourceName === "youtube") {
      const identifier = song.identifier;
      const thumbnail = `https://img.youtube.com/vi/${identifier}/hqdefault.jpg`;
      // embed.setThumbnail(thumbnail);
    }

    fields.push({
      name: "Requested By:",
      value: `${song.requester}`,
      inline: true,
    });

    fields.push({
      name: "Song Duration",
      value: "`" + prettyMs(song.length, { colonNotation: true }) + "`",
      inline: true,
    });

    if (queue.tracks.length > 0) {
      fields.push({
        name: "Position in Queue",
        value: (queue.tracks.length + 1).toString(),
        inline: true,
      });
    }

    embed.setFields(fields);
    queue.data.channel.safeSend({ embeds: [embed] });
  });


  
  const row2 = new ActionRowBuilder()
    .addComponents(new ButtonBuilder().setEmoji("<:instagram:1181499669596098581>").setURL("https://instagram.com/nimenation_").setStyle(ButtonStyle.Link))
    .addComponents(new ButtonBuilder().setEmoji("<:icons8discord48:1175352665757208618>").setURL("https://discord.gg/nimenation").setStyle(ButtonStyle.Link))

  lavaclient.on("nodeQueueFinish", async (_node, queue) => {
    const embed = new EmbedBuilder()
    .setDescription("Thank you for using our service!\n\n**Loving the bot**?\nConsider becoming a [Paypal](https://instagram.com/nimenation_) & [Saweria](https://discord.gg/nimenation) to support our hard work and the future development of the bot, even just a dollar if you can")
    .setColor("Red")
    queue.data.channel.safeSend({ embeds: [embed], components: [row2] });
    await client.musicManager.destroyPlayer(queue.player.guildId).then(queue.player.disconnect());
  });

  return lavaclient;
};
