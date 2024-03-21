const Discord = require("discord.js");
const { checkForUser, updatedAddedRoles, updatedRemovedRoles, updateNickname } = require("../../utils/database/queries/userHandler");

module.exports = {
    name: "guildMemberUpdate",
    once: false,

    async execute(oldMember, newMember, client) {
        if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            if (checkForUser(newMember.id) === true) {
                if (oldMember.nickname !== newMember.nickname) {
                    updateNickname(newMember.id, newMember.nickname, client);
                    return;
                }

                if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                    updatedRemovedRoles(newMember.id, newMember.guild.id, client);
                    return;
                } else {
                    updatedAddedRoles(newMember.id, newMember.guild.id, client);
                    return;
                }
            }
            return;
        }
    }
}