const Responses = require('../common/API_Responses')
const S3 = require('./../common/S3')
const bucket = process.env.bucketName

exports.handler = async(event) =>{
    console.log(`Event:::`,event)
    if(!event.pathParameters || !event.pathParameters.fileName) {
        //failed without filename...
        return Responses._400({ message: 'Filename not found!'})
    }
    let fileName = event.pathParameters.fileName
    const newData = await S3.get(bucket, fileName).catch(error=>{
        console.log(`Error in S3 get`, error)
        return null
    })

    if(!newData) {
        //fileName not found cases
        return Responses._400({ message: 'fileName not found!'})
    }

    return Responses._200({ newData })
}