/*

This is a simplistic discord bot that updates it's activity every 60 seconds to display 
a specific collections floor price. 

No need for an API key.

To make this work;
- Create a file in the same directory as this file called; ".env"
- Insert the line; "DISCORD_BOT_TOKEN=YOURTOKENHERE"
- Save the file
- Do "npm i" in your terminal 
- Run the the bot either with; "npm start" or "node bot.js"

*/

require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 513 });

const collection = "boredapeyachtclub"; // set the collection slug here

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}...`);
    setInterval(() => { setStatus() }, 30000);
});
const setStatus = async () => {
    const data = await fetch(`https://api.opensea.io/api/v1/collection/${collection}`).catch(console.error);
    const json = await data.json().catch(console.error);
    client.user.setActivity(`OS - ${json.collection.stats.floor_price.toFixed(2)} ETH`, { type: "WATCHING" });
    console.log('[ACTIVITY] Updated floor activity status...');
  };

client.login(process.env.DISCORD_BOT_TOKEN);