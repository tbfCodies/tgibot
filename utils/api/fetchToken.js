const axios = require('axios');

const fetchToken = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/v3/token');
        return res.data.token;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { fetchToken };