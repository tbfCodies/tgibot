const { CommandInteraction, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    name: "verify",
    description: "Verify command",
    options: [],

    execute: async (interaction = new CommandInteraction()) => {
        try {
            const memberId = interaction.member.id;

            // Create the model
            const modal = new ModalBuilder()
                .setCustomId('verification')
                .setTitle('Verification');

            const usernameInput = new TextInputBuilder()
                .setCustomId('username')
                .setLabel('Enter your username')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const emailInput = new TextInputBuilder()
                .setCustomId('email')
                .setLabel('Enter your email')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const firstRow = new ActionRowBuilder().addComponents(usernameInput);
            const secondRow = new ActionRowBuilder().addComponents(emailInput);

            modal.addComponents(firstRow, secondRow);

            await interaction.showModal(modal);
        } catch (e) {
            console.log(e);
        }
    },
}