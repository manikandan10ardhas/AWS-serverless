'use strict';

const Responses = require('../common/API_Responses')

exports.handler = async(event) =>{
    console.log("event:::",event)

    if(!event.pathParameters || !event.pathParameters.ID) {
        //failed without id...
        return Responses._400({ message: 'ID not found!'})
    }
    let ID = event.pathParameters.ID
    if(data[ID]) {
        return Responses._200(data[ID])
    }
    //id not found cases
    return Responses._400({ message: 'ID not found!'})
}

const data = {
    1: { name: 'Manikandan', age: 25, job: 'Software Engineer'},
    2: { name: 'Velavan', age: 23, job: 'Medical coder'},
    3: { name: 'Bharathi chelvan', age: 30, job: 'Mechanical Engineer'}
}