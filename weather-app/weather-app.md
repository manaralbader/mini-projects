# Weather App

## Project Overview

This is a simple weather application from GreatStack YouTube channel. It allows users to search for current weather conditions in any city around the world. The app uses the OpenWeatherMap API to fetch real-time weather data and displays it in a clean, modern interface with weather icons, temperature, humidity, and wind speed information.

**Features:**
- City-based weather search
- Real-time weather data from OpenWeatherMap API
- Dynamic weather icons based on conditions
- Error handling for invalid city names
- Responsive design with gradient styling

## JavaScript Breakdown


###  DOM Element Selection
```javascript
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
```

**What is `querySelector`?**
- `document.querySelector()` is a method that finds and returns the **first element** in the HTML that matches the given CSS selector
- `.search input` means "find an `input` element inside an element with class `search`"
- It creates a JavaScript reference to these HTML elements so you can manipulate them

### The Main Weather Function
```javascript
async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    
    // Error handling for invalid cities
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Process successful response
        var data = await response.json();
        
        // Update HTML content with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        // Set weather icon based on conditions
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        // ... more weather conditions
        
        // Show weather data, hide error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
```

**Key concepts explained:**

- **`async/await`**: This makes the function wait for the API response before continuing. Weather data takes time to fetch from the internet.

- **`fetch()`**: Sends a request to the weather API and returns the response.

- **`response.json()`**: Converts the API response into a JavaScript object you can work with.

- **Why the repeated display code?**: 
  - When there's an error (404), show error message and hide weather display
  - When successful, show weather data and hide error message
  - This ensures only one section is visible at a time

- **`data.name`, `data.main.temp`, etc.**: The API returns a JSON object with nested properties. You're accessing specific pieces of weather information.

### 4. Event Listener
```javascript
searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
})
```

**What does this do?**
- `addEventListener()` tells the browser to "listen" for a specific event (in this case, a "click")
- When someone clicks the search button, it runs the code inside the arrow function `()=> {}`
- `searchBox.value` gets whatever text the user typed in the input field
- It then calls `checkWeather()` with that city name

## Recommendations for Improvement

### 1. **Add Enter Key Support**
Allow users to search by pressing Enter in the input field:
```javascript
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
```

### 2. **Input Validation**
Check if the user entered anything before making the API call:
```javascript
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
```

### 3. **Loading State**
Show a loading message while fetching data:
```javascript
// Add this at the start of checkWeather function
document.querySelector(".weather").innerHTML = "<p>Loading...</p>";
```

### 4. **Better Error Handling**
Handle different types of errors (network issues, API limits):
```javascript
try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // ... rest of code
} catch (error) {
    console.error('Error fetching weather:', error);
    // Show user-friendly error message
}
```

### 5. **More Weather Conditions**
Add support for more weather types like Snow, Thunderstorm, etc.

### 6. **Recent Searches**
Store recent city searches in localStorage for quick access.

### 7. **Geolocation**
Add a button to get weather for the user's current location using the browser's geolocation API.

### 8. **5-Day Forecast**
Extend the app to show a multi-day weather forecast.

## Next Steps for Learning

1. **Practice DOM manipulation** - Try changing different HTML elements with JavaScript
2. **Learn about Promises and async/await** - Understanding how JavaScript handles asynchronous operations
3. **Explore more APIs** - Try integrating other APIs to build different projects
4. **Learn about error handling** - Understanding try/catch blocks and proper error management