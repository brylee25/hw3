let updateWidget = function(data) {

  // console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE
  // window.data = data
  let show_temp = jQuery("#weather p");
  temp = Math.round(data.main.temp);
  show_temp.html("It is "+ temp + " degrees outside.");

  let city = jQuery("#weather h4");
  city_name = data.name;
  city.html(city_name);

  let show_image = jQuery("#weather img");
  image = data.weather[0].icon;
  jQuery(show_image).attr("src", "http://openweathermap.org/img/w/" + image + ".png");
  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.

}

let getWeather = function(info) {

  // console.log(info)
  // window.myInfo = info
  let latitude = info.coords.latitude.toFixed(4);
  let longitude = info.coords.longitude.toFixed(4);

  // let latitude = '48.8566';
  // let longitude = '2.3522';
  let apiKey = '4ce6f502d38ddae567bf1702b05e168c'; // REPLACE THIS VALUE with your own key. //my apikey does not work, had to use the professors
  // let apiKey = '03d1cdcbbef3ba75af352989852aaf11'; //my apikey does not work, had to use the professors


  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let handlePosition = function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
}

let link = jQuery("#get_forecast")
link.on("click", handlePosition);

////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
