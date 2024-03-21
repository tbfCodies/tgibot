const { CommandInteraction } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "test",
    description: "Test command",
    category: "owner",
    ownerID: ["303956449011171329", "223832182261547008"],
    permissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "test",
            description: "test",
            type: 3,
            required: true
        },
    ],

    execute: async (interaction = new CommandInteraction()) => {
        try {

            // axios get locahost on port 3000
            await axios.get("http://localhost:3000/api/v3/status").then((res) => {
                console.log(res.data);
            });

            await interaction.reply(`Command ran ok!`);
        } catch (e) {
            console.log(e);
        }
    },
}