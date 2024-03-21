const { connectDB, closeDB, pool } = require("../databaseHandler");
const { fetchRoles, sortRoles } = require("../../user/roleWorker");
const { fetchToken } = require("../../api/fetchToken");
const axios = require("axios");

/*
* @param {string} userId
* @returns {boolean} result

* Checks if the user exists in the database
*/
const checkForUser = async (userId) => {
  try {
    let token = await fetchToken();

    await axios
      .post(`http://localhost:3000/api/v3/user/discord/checkuser`, {})
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          return true;
        }

        return false;
      });
  } catch (e) {
    console.error(e);
    return;
  }
};

const updateNickname = async (userID, nickname, client) => {
  try {
    let token = await fetchToken();

    await axios
      .post(`http://localhost:3000/api/v3/user/discord/updatenickname`, {
        discordId: userID,
        nickname: nickname,
        token: token,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          return;
        }

        return res
          .status(500)
          .json({ status: 500, message: "Internal server error" });
      });
  } catch (e) {
    console.error(e);
    return;
  }
};

/*
* @param {string} userId
* @param {string} guildId
* @param {Client} client

* Fetches the roles of the user and adds them to the database
*/
const updatedAddedRoles = async (userId, guildId, client) => {
  try {
    await fetchRoles(userId, guildId, client).then((roles) => {
      const roleIds = sortRoles(roles);

      let token = fetchToken();

      axios
        .post(`http://localhost:3000/api/discord/roles/updateroles`, {
          discordId: userId,
          roles: roleIds,
          type: "add",
          token: token,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            return;
          }

          return res
            .status(500)
            .json({ status: 500, message: "Internal server error" });
        });
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

/*
* @param {string} userId
* @param {string} guildId
* @param {Client} client

* Fetches the roles of the user and removes them from the database
*/
const updatedRemovedRoles = async (userId, guildId, client) => {
  try {
    await fetchRoles(userId, guildId, client).then((roles) => {
      const roleIds = sortRoles(roles);

      let token = fetchToken();

      axios
        .post(`http://localhost:3000/api/discord/roles/updateroles`, {
          discordId: userId,
          roles: roleIds,
          type: "remove",
          token: token,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            return;
          }

          return res
            .status(500)
            .json({ status: 500, message: "Internal server error" });
        });
    });
  } catch (e) {
    console.error(e);
    return;
  }
};

/*
* @param {string} userId
* @returns {Object} userData

* Fetches the user data from the database
*/
const fetchUserData = async (userId) => {
  try {
    // Get necessary user account Info
    const firstQuery = `SELECT u.userName, u.userID FROM userAccount u JOIN linkedAccount l ON l.userID = u.userID WHERE l.accountID = @userID AND l.typeID='1';`;
    const result = await pool.query(firstQuery, { userID: userId });

    // Get User Roles
    const secondQuery = `SELECT R.dsID FROM userRole l JOIN role r ON l.roleID=r.roleID WHERE userID=@userID;`;
    const roles = await pool.query(secondQuery, { userID: result.userID });

    // Creates role array
    const roleIds = roles.map((role) => role.roleID);

    return {
      username: result.userName, // ZebZ
      dsID: result.dsID, // dsID = manager (1)
      roleIds, // Array of role IDs ["1", "2", "3"]
    };
  } catch (e) {
    console.log(e);
    return;
  }
};

module.exports = {
  addUser,
  checkForUser,
  updatedAddedRoles,
  updatedRemovedRoles,
  fetchUserData,
  updateNickname,
};
