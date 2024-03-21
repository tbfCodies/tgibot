const Discord = require("discord.js");
const axios = require("axios");

const { fetchToken } = require("../../utils/api/fetchToken");

module.exports = {
    name: "interactionCreate",
    once: false,

    async execute(interaction, client) {

        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'verification') {
            const username = interaction.fields.getTextInputValue('username');
            const email = interaction.fields.getTextInputValue('email');

            let token = await fetchToken();

            // Data validation from the API
            await axios.post(`http://localhost:3000/api/v3/user/discord/verification`, {
                username: username,
                email: email,
                discordId: interaction.user.id,
                token: token
            }).then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                    interaction.reply({ content: `You have been verified!`, ephemeral: true });
                    return;
                }

                interaction.reply({ content: `Something went wrong! Please try again later.`, ephemeral: true });
                return;
            })
        }
    }
}