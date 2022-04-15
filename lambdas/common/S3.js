const AWS = require('aws-sdk')
const S3Client = new AWS.S3()

const S3 = {
    async get(bucketName, fileName) {
        const params = {
            Bucket: bucketName,
            Key: fileName
        }

        let data = await S3Client.getObject(params).promise()
        
        if(!data) {
            throw Error(`Failed to get the file ${fileName} from ${bucketName}`)
        }

        if(fileName.slice(fileName.length - 4, fileName.length) == 'json') {
            data = data.Body.toString()
        }   
        return data
    },

    async write(data, fileName, bucket) {
        const params = {
            Bucket: bucket,
            Body: JSON.stringify(data),
            Key: fileName
        }

        const newData = await S3Client.putObject(params).promise()

        if(!newData) {
            throw Error(`There was an error while adding the file...`)
        }

        return newData
    }
}

module.exports = S3