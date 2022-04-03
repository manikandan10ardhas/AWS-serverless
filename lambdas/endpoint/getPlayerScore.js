const Responses = require('./../common/API_Responses')
const DynamoDB = require('./../common/DynamoDb')
const TableName = process.env.tableName

exports.handler = async (event) => {
    console.log('event',event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        //failed without id...
        return Responses._400({ message: 'ID not found!'})
    }
    let ID = event.pathParameters.ID
    const user = await DynamoDB.get(ID, TableName).catch(err=>{
        console.log(`Error in dynamoDb get`, err)
        return null
    })

    if(!user) {
        return Responses._400({ message: `Failed to get data for ID ${ID}`})
    }

    return Responses._200({ user })
}