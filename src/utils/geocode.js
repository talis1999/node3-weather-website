const request = require('request')

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFsaXMxOTk5IiwiYSI6ImNrNWF5d2JzYTBkZXEzbG1tN3Y5c21lYXgifQ.-mKhQtDZCUuEavN1mlBj4g&limit=1`

    request({url, json:true }, (error, {body:data}) => {
        if(error){
            callback('Unable to connect to location servises', undefined)
        }
        else if(data.features.length === 0){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                latitude: data.features[0].center[1],
                longtitude: data.features[0].center[0],
                location: data.features[0].place_name
            }) 
        }
    })
}

module.exports = geocode;