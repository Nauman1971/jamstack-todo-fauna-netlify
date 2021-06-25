const sendQuery = require('./utils/send-queries');

const GET_ALL_TODOS = `
     {
        allTodos {
            data {
                _id
                text
                completed
            }
        }
    }
`;

exports.handler = async () => {
    const { data, errors } = await sendQuery(GET_ALL_TODOS);
    console.log(data, errors);
    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ todos: data.allTodos.data })
    };
};