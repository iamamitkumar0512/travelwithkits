// VARIABLES
const leavingFrom = document.querySelector('input[name="from"]');
const goingTo = document.querySelector('input[name="to"]');
const depDate = document.querySelector('input[name="date"]');
const timestampNow = (Date.now()) / 1000;

// EVENT LISTENERS

// add trip button

const addTripBtn = document.querySelector(".map-link");
const planner = document.getElementById("planner");

const addTripEventListner = addTripBtn.addEventListener('click', function (elem) {
  elem.preventDefault();
  planner.scrollIntoView({ behavior: 'smooth' });
})
// form submit
const form = document.getElementById("form");
form.addEventListener('submit', addTrip);
// print button
const printBtn = document.getElementById("save");
printBtn.addEventListener('click', function (elem) {
  window.print();
  location.reload();
});
// delete button
const deleteBtn = document.getElementById("delete");


deleteBtn.addEventListener('click', function (elem) {
  form.reset();
  result.classList.add("invisible");
  location.reload();
})

// FUNCTIONS 


// Function called when form is submitted
export function addTrip(elem) {
  elem.preventDefault();
  //Acquiring and storing user trip data
  const leavingFromTxt = leavingFrom.value;
  const goingToTxt = goingTo.value;
  const depDateTxt = depDate.value;
  const timestamp = (new Date(depDateTxt).getTime()) / 1000;

  // function checkInput to validate input 
  Client.checkInput(leavingFromTxt, goingToTxt);

  get_City_Info(geoNamesUrl, goingToTxt, username)
    .then((city_data) => {
      const cityLatitude = city_data.geonames[0].lat;
      const cityLongitude = city_data.geonames[0].lng;
      const country = city_data.geonames[0].countryName;
      const weather_data = get_Weather(cityLatitude, cityLongitude, country, timestamp)
      return weather_data;
    })
    .then((weather_data) => {
      const daysLeft = Math.round((timestamp - timestampNow) / 86400);
      const userdata = postData('http://localhost:8000/add', { leavingFromTxt, goingToTxt, depDateTxt, weather: weather_data.currently.temperature, summary: weather_data.currently.summary, daysLeft });
      return userdata;
    }).then((userdata) => {
      update_UI(userdata);
    })
}






//function getCityInfo
const geoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const username = "amit.frontend";

export const get_City_Info = async (geoNamesUrl, goingToTxt, username) => {
  // res equals to the result of fetch function
  const res = await fetch(geoNamesUrl + goingToTxt + "&maxRows=10&" + "username=" + username);
  try {
    const city_data = await res.json();
    return city_data;
  } catch (error) {
    console.log("error", error);
  }
};


// Function update UI 

const result = document.getElementById("result");

export const update_UI = async (user_data) => {
  const res = await fetch("https://pixabay.com/api/?key=" + "17400278-abcb0fb5b1718045027b56a54" + "&q=" + user_data.arrCity + "+city&image_type=photo");
  result.classList.remove("invisible");
  result.scrollIntoView({ behavior: "smooth" });
  try {
    const imagelink = await res.json();
    const dateSplit = user_data.depDate.split("-").reverse().join(" / ");
    document.getElementById("result_city").innerHTML = user_data.arrCity;
    document.getElementById("result_date").innerHTML = dateSplit;
    document.getElementById("result_days").innerHTML = user_data.daysLeft;
    document.getElementById("result_summary").innerHTML = user_data.summary;
    document.getElementById("result_temp").innerHTML = user_data.weather;
    document.getElementById("result_image").setAttribute('src', imagelink.hits[0].webformatURL);
  }
  catch (error) {
    console.log("error", error);
  }
}


// function getWeather

const darkAPIUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
const darkAPIkey = "841a9888f38f0d5458c1f32b892d2d1b";


export const get_Weather = async (cityLatitude, cityLongitude, country, timestamp) => {
  const req = await fetch(darkAPIUrl + "/" + darkAPIkey + "/" + cityLatitude + "," + cityLongitude + "," + timestamp + "?exclude=minutely,hourly,daily,flags");
  try {
    const weather_data = await req.json();
    return weather_data;
  } catch (error) {
    console.log("error", error);
  }
}




// Function postData to POST data to our local server
export const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      depCity: data.leavingFromTxt,
      arrCity: data.goingToTxt,
      depDate: data.depDateTxt,
      weather: data.weather,
      summary: data.summary,
      daysLeft: data.daysLeft
    })
  })
  try {
    const user_data = await req.json();
    return user_data;
  } catch (error) {
    console.log("error", error);
  }
}


export { addTripEventListner }