const fetch = require("node-fetch");
const weather = (location, unit, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0f6f6c4d9e9f440de614f05697ee8873&query=${encodeURIComponent(location)}&units=${unit}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.success === false) {
        callback(`Impossible de renvoyer vos informations. Error ${data.error.code}: ${data.error.info}`, undefined)
      } else {
        const { current, location } = data;
        callback(undefined,{
            location: location.name,
            country: location.country,
            temperature: current.temperature,
            feelslike: current.feelslike,
            weather_description: current.weather_descriptions[0],

        });
      }
    });
}

module.exports = { weather };