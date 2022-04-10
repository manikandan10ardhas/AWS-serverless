const DynamoDB = require('./../common/DynamoDb')
const Responses = require('./../common/API_Responses')
const TableName = process.env.tableName

exports.handler = async (event) => {
    if(!event.body) {
        return Responses._400({ message: 'Body params not found!'})
    }

    let ID = event.pathParameters.ID
    let bodyParams = JSON.parse(event.body)
    bodyParams.ID = ID
    
    const user = await DynamoDB.write(bodyParams, TableName).catch(err=>{
        console.log(`Error in dynamoDb get`, err)
        return null
    })

    if(!user) {
        return Responses._400({ message: `Failed to create data`})
    }
    return Responses._200({ user })
}