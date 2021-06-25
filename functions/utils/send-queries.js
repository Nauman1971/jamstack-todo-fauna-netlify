require('dotenv').config();
const axios = require('axios');

module.exports = async (query, variables) => {
    console.log(query, variables)
    const result = await axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'POST',
        headers: {
            Authorization:
                `Bearer ${process.env.FAUNA_SERVER_SECRET}`
        },
        data: {
            query,
            variables,
        }
    });

    return result.data;
}
// first collection key
// FAUNA_SERVER_SECRET=fnAELnmdDeACDWWvHeyAbOFcxkoMm0N1_jQuMVX8
