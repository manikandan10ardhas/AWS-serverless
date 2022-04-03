const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const dynamoDB = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        }

        const data = await documentClient.get(params).promise()
        if(!data || !data.Item) {
            throw Error(`There was an error while fetch the data for ID of ${ID} from table ${TableName}`)
        }

        return data.Item
    }
}

module.exports = dynamoDB