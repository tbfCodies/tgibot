const fetchRoles = (userId, guildId, client) => {
    const guild = client.guilds.cache.get(guildId);
    const member = guild.members.cache.get(userId);

    const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.name);
    return roles;
};

const sortRoles = (roles) => {
    const roleIds = roles.map(role => role.id);

    return roleIds;
};

module.exports = {
    fetchRoles,
    sortRoles
};