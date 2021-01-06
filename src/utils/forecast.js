const request= require('request')
const forecast= (latitude, longitude, callback)=>{
    const forecastUrl=`http://api.weatherstack.com/current?access_key=cadaef0e8a14cb2f1cfcc87db3dad019&query=${latitude},${longitude}&units=m`
request({url:forecastUrl, json:true}, (error, response)=>{
    if (error) {
        callback('Unable to coonect to the web services!', undefined)
    } 

    else if(response.body.error){
        callback('No results Found!', undefined)
    }else{
        callback (undefined, response.body.current.weather_descriptions[0]+ ' .It is currently '+response.body.current.temperature+' degrees, out. it feels like '+response.body.current.feelslike+' ,out' )
    }
})
}
module.exports= forecast