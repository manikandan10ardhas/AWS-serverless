const S3 = require('../common/S3')
const Responses = require('../common/API_Responses')
const bucket = process.env.bucketName

exports.handler = async (event) => {
    if(!event.body) {
        return Responses._400({ message: 'Body params not found!'})
    }

    let fileName = event.pathParameters.fileName
    let data = JSON.parse(event.body)
    
    const newData = await S3.write(data, fileName, bucket).catch(err=>{
        console.log(`Error in S3 get`, err)
        return null
    })

    if(!newData) {
        return Responses._400({ message: `Failed to create data`})
    }
    return Responses._200({ newData })
}
