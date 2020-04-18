const request = require('request')
const forecast = (lat,long,callback) => {

    const url = `http://api.weatherstack.com/current?access_key=39f806d5974c26d4cabbc9db0119171a&query=${lat},${long}`
    request({url,json:true}, (error, {body:data}) => {
        if(error){
            callback('Unable to connect to weather servise',undefined)
        }
        else if(data.error){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,
            ` Its ${data.current.weather_descriptions[0]}, the current temperature is ${data.current.temperature}c and its feels like ${data.current.feelslike}c and the humidity is ${data.current.humidity}%.`
            ) 
        }
    })

}


module.exports = forecast;