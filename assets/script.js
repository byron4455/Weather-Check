function saveLocationData() {
    var location = document.getElementById('city').value;
    
    console.log("users value is: " + location);
    var getLocation = function() {
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=5&appid=259914bd1c07f196426a9eaa63a52672').then(function(response) {
            response.json().then(function(data) {
              console.log(data);
            });
        });
    };
    getLocation();
 }




// var getWeather = function() {
//     fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=259914bd1c07f196426a9eaa63a52672'
// )
//  .then(function(response) {
//      return response.json();
//  })
//  .then(function(data) {
//      console.log(data);
//  });
// };


// getWeather();









 