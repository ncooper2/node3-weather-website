const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8d8624973f9260719470206d15888148&query=' + lat + ',' + long + '&units=f'

    request({
        url,
        json: true
    }, (error, {body}) => {
        const {err, current} = body
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (err) {
            callback('Unable to find location', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike, wind_speed, humidity} = current
            callback(undefined, 
                weather_descriptions[0] 
                + ': It is currently ' 
                + temperature 
                + ' degrees out. With a windspeed of '
                +  wind_speed
                + ' mph and humidity of ' 
                + humidity
                + ' percent, it feels like ' 
                + feelslike 
                + " degrees.")
        }
    })
}


module.exports = forecast