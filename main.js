
const main = {

    /*----------GETTING GEOLOCATION FROM BROWSER----*/

    msg : document.getElementById('msg'),

    getGeoLoc : function() { //handler
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather, this.showError); //1st parameter: function that will deal with object; 2nd: function for error handling
        } else { 
            this.msg.innerHTML = "Geolocation is not available.";
        }
    },

    showError : function(error) { //view
        switch(error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "I can't tell you the wheather if you don't allow geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "I don't know where you are."
                break;
            case error.TIMEOUT:
                x.innerHTML = "That took very long. Connection problems?"
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "Sorry, an error occurred."
                break;
        }
    },

    showPosition : function(position) { //view
        
        this.msg.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;
        main.getWeather(lat,long); 
        /*using this.getWeather was not working "TypeError: this.getWeather is not a function", 
        maybe because 'THIS' was within the object sent by the getCurrentPosition.
        But in that case, why line 37 is not giving any errors? */
    },

    /*----------XMLHTTPREQUEST---------------*/

    getWeather : function(position) {
        let lat = position.coords.latitude
        ,   long = position.coords.longitude
        ,   req = new XMLHttpRequest;
        
        req.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long);
        req.responseType ='json';
        req.onload = () => {
            main.weather = req.response;
            main.showWeather();
        }
        req.send();
    },

    weather: {}, // variable that will be filled with the weather data response

    showWeather : function() {

        console.log(this.weather);
        console.log('The weather in ' + this.weather.name + ' is: ');

        let imageBox = document.getElementById('msg')
        ,   img = document.createElement("img")
        ,   txt = 'The weather in ' + this.weather.name + ': ' + this.weather.weather[0]['main'] + '. ';

        img.setAttribute("src", "this.weather.weather[0].icon" );
        img.setAttribute("alt", "weather icon" );
        imageBox.innerHTML = txt;
        imageBox.appendChild(img);

        
        console.log('descripción:' + this.weather.weather[0]['main']);
        console.log(this.weather.weather[0].icon);
    }

}



/* response structure:
Response: { 
    "coord":{ "lon":159, "lat":35 }, 
    "weather":
    [ { 
        "id":500, 
        "main":"Rain", 
        "description":"light rain", 
        "icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" 
    } ], 
    "base":"stations", 
    "main":
    { 
        "temp":22.59, 
        "pressure":1027.45, 
        "humidity":100, 
        "temp_min":22.59, 
        "temp_max":22.59, 
        "sea_level":1027.47, 
        "grnd_level":1027.45 
    }, 
    "wind":{ "speed":8.12, "deg":246.503 }, 
    "rain":{ "3h":0.45 }, 
    "clouds":{ "all":92 }, 
    "dt":1499521932, 
    "sys":{ "message":0.0034, "sunrise":1499451436, "sunset":1499503246 }, 
    "id":0, 
    "name":"", 
    "cod":200 }

    */

 
