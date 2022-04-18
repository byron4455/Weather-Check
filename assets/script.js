
var citiesSearched = [];
var dayOfWeek = function() {
        var time = moment().format('dddd </br> MM/DD');
        $("#current").html(time);
    for (let i = 0; i < 5; i++) {
        var dateStart = moment().add(1, 'days').isoWeekday();
        var time = moment().day(dateStart + i).format('dddd </br> MM/DD');
        $("#day" + (i + 1)).html(time);
}
};
function addEntry() {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];
    var entryTitle = document.getElementById("city").value;
    var entryText = document.getElementById("city").value;
    var entry = {
        "city": entryTitle,
        "city": entryText
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    
    
};
function cityAddition() {
    for (let i = 0; i < 5; i++) {
        var storedCity = JSON.parse(localStorage.getItem("allEntries"));
        storedCity = storedCity.slice(-5);
        var cities = document.getElementById('cityStorage');
        var citiesName = document.createElement('p');
        citiesName.setAttribute("class", "dynamic-p")
        citiesName.textContent = storedCity[i].city;
        cities.appendChild(citiesName);
    }
};
function refreshLocal() {
        const myNode = document.getElementById("citystorage");
        while (myNode.lastElementChild) {
            myNode.removeChild(myNode.lastElementChild);
}
    for (let i = 0; i < 5; i++) {
        var storedCity = JSON.parse(localStorage.getItem("allEntries"));
        storedCity = storedCity.slice(-5);
        var cities = document.getElementById('cityStorage');
        var citiesName = document.createElement('p');
        citiesName.textContent = storedCity[i].city;
        cities.appendChild(citiesName);
    }
};
    
    function getLocation (location) {
        var location = document.getElementById('city').value;
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=259914bd1c07f196426a9eaa63a52672')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            console.log(data);
            addEntry();
            
            dayOfWeek();
            getCurrentWeather();
        });
    };
    
    
    
    var getCurrentWeather = function() {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,minutely&units=imperial&appid=259914bd1c07f196426a9eaa63a52672'
        )
        .then(function(response) {
            return response.json();
        })
    .then(function(data) {
        
        var currentDay = document.getElementById('current');
        var currentTemp = document.createElement('p');
        var currentUV = document.createElement('p');
        currentTemp.textContent = "The current temperature is: " + data.current.temp;
        currentUV.textContent = "UV Index is: " + data.current.uvi;
        var currentWind = document.createElement('p');
        currentWind.textContent = "Wind " + data.current.wind_speed + " MPH";
        var currentHumidity = document.createElement('p');
        currentHumidity.textContent = "Humidity: " + data.current.humidity + "%";
        var currentIcon = document.createElement('img');
        currentIcon.src = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
        var CurrentIconDesc = document.createElement('p');
        CurrentIconDesc.textContent = data.current.weather[0].description;
        
        
        currentDay.appendChild(currentTemp);
        currentDay.appendChild(currentUV);
        currentDay.appendChild(currentWind);
        currentDay.appendChild(currentHumidity);
        currentDay.appendChild(currentIcon);
        currentDay.appendChild(CurrentIconDesc);
        console.log(data);
        
        for (let i = 0; i < 5; i++) {
            var tempplace = document.getElementById('day' + (i + 1)); 
            var tempTemp = document.createElement('p');
            tempTemp.textContent = "Temperature is: " + data.daily[i].temp.day;
            var dailyUV = document.createElement('p');
            dailyUV.textContent = "UV Index is: " + data.daily[i].uvi;
            var dailyWind = document.createElement('p');
            dailyWind.textContent = "Wind " + data.daily[i].wind_speed + " MPH";
            var dailyHumidity = document.createElement('p');
            dailyHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
            var dailyIcon = document.createElement('img');
            dailyIcon.src = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
            var dailyIconDesc = document.createElement('p');
          dailyIconDesc.textContent = data.daily[i].weather[0].description;
          tempplace.appendChild(tempTemp);
          tempplace.appendChild(dailyUV);
          tempplace.appendChild(dailyWind);
          tempplace.appendChild(dailyHumidity);
          tempplace.appendChild(dailyIcon);
          tempplace.appendChild(dailyIconDesc);
          
        }
        
    });
}
submit.onclick = function() {
    cityName = document.getElementById("city").value;
    citiesSearched.push(cityName);
    cityName = document.getElementById("city").value;
    var cityHeader = document.getElementById("citysearch");
    var currentCity = document.createElement('p');
    currentCity.textContent = cityName;
    cityHeader.replaceChildren(currentCity);
    getLocation(cityName);
    refreshLocal();
    
    
};
$(document).ready(function() {
    // for (let i = 0; i < 5; i++) {
    //     var storedCity = JSON.parse(localStorage.getItem("allEntries"));
    //     storedCity = storedCity.slice(-5);
    //     var cities = document.getElementById('cityStorage');
    //     var citiesName = document.createElement('h2');
    //     citiesName.textContent = storedCity[i].city;
    //     cities.appendChild(citiesName);
    // }
    var storedCity = JSON.parse(localStorage.getItem("entry"));
    storedCity = JSON.stringify(storedCity);
    console.log(storedCity)
    console.log(typeof storedCity)
    cityAddition();
    // getLocation(storedCity);
    dayOfWeek();
    
});
// setblank = function() {
//     var blank = document.getElementById('citysearch');
//     var blanker = document.createElement('p');
//     blank.appendChild(blanker);
// };