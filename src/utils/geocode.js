const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG1kYXJ0aHZhZGVyNjYiLCJhIjoiY2twY3RuYm9tMTlpdjJzbXNqN21ha2FyZCJ9.BTNCKK7Lypf3PzgmsoSfMA&limit = 1'

    request({
        url, 
        json: true
    }, (error, {body}) => {
        const {features} = body
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (features.length === 0) {
            callback('Location not found. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode