const sendQuery = require('./utils/send-queries');

const UPDATE = `
    mutation($id: ID!, $text: String!) {
        updateTodo(id: $id, data: {text: $text}) {
                _id
                text
        }
    }
`

exports.handler = async event => {
    const { id, text } = JSON.parse(event.body);
    const { data, errors } = await sendQuery(UPDATE, {
        id,
        text,
    });

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ updatedTodo: data.updateTodo })
    };
}