// const request = require('request')

const request = require("request")

// const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/las vegas.json?access_token=pk.eyJ1IjoiZ3VkZHliYWJhIiwiYSI6ImNrZnU3cjNwZzByYXMycnM4b3RnbjgyZDQifQ.8crkmbQ9OL_V2WQjGHfv8A&limit=1'

// request({url:geocodeurl, json:true}, (error, response)=>{
//         if (error) {
//             console.log('Unable to connect to web services!')
            
//         }else if(response.body.features.length==0){
//             console.log('Could not find a match!')
//         }

//         else{
//             const latitude=response.body.features[0].center[0]
//             const longitude= response.body.features.center[1]
//             console.log(latitude, longitude)
//         }
// })

const geocode= (address, callback)=>{
const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ3VkZHliYWJhIiwiYSI6ImNrZnU3cjNwZzByYXMycnM4b3RnbjgyZDQifQ.8crkmbQ9OL_V2WQjGHfv8A&limit=1'

request({url:geocodeurl, json:true}, (error, response)=>{
    if (error) {
        callback('unable to connect to the weather services! ', undefined)
    }else if(response.body.features.length==0){
        callback('No results found!', undefined)
    }else{
        
        callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
        })
                 
    }
})

}
module.exports= geocode