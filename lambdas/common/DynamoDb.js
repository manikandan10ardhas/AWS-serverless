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
    },

    async write(data, TableName) {
        if(!TableName || !data) {
            throw Error(`Invalid payload`)
        }

        const params = {
            TableName,
            Item: data
        }

        const res = await documentClient.put(params).promise()
        if(!res) {
            throw Error(`There was an error while inserting data:::${res}`)
        }
        return res
    }
}

module.exports = dynamoDB