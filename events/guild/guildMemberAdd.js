const Discord = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    once: false,

    async execute(member, client) {
        // Checks if the user exists in the database - if so update their roles/nickname otherwise return out of the function
        if (checkForUser(member.id) === true) {
            const userData = fetchUserData(member.id);

            await userData.then(data => {
                const user = client.users.cache.get(member.id);
                const guild = client.guilds.cache.get(member.guild.id);

                // Set the nickname of the user
                user.setNickname(data.username);

                // Set the roles of the user
                const roles = data.roleIds;

                roles.forEach(role => {
                    guild.roles.cache.get(role).members.add(user);
                });
            })
        } else {
            return;
        }
    }
}