const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmV5aXZhbm92ODYiLCJhIjoiY2o4YzNubXBzMDV1cDJxbXM2amY5em4zayJ9.PkKldOnAMZF_3ino18SFZA";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

fetch('/api/attractions')
.then(result => result.json())
.then(data => {
  //console.log(data)
  let hotels = data[0];
  let hotelSelect = document.getElementById("hotels-choices");
  hotels.forEach( hotel => {
    let option = document.createElement('option');
    option.text = hotel.name;
    option.value = hotel.name;
    hotelSelect.add(option);
  });
  let activities = data[1];
  let activitySelect = document.getElementById("activities-choices");
  activities.forEach( activity => {
    let option = document.createElement('option');
    option.text = activity.name;
    option.value = activity.name;
    activitySelect.add(option);
  });
  let restaurants = data[2];
  let restaurantSelect = document.getElementById("restaurants-choices");
  restaurants.forEach( restaurant => {
    let option = document.createElement('option');
    option.text = restaurant.name;
    option.value = restaurant.name;
    restaurantSelect.add(option);
  });
})
.catch(console.error);

document.getElementById('hotels-add').addEventListener('click', (event) => {
  let select = document.getElementById('hotels-choices');
  let selectedId = select.value;
  let newHotel = document.createElement('li');
  newHotel.innerHTML = selectedId;
  let hotelList = document.getElementById('hotels-list')
  hotelList.append(newHotel);
  console.log(selectedId)
})

document.getElementById('activities-add').addEventListener('click', (event) => {
  let select = document.getElementById('activities-choices');
  let selectedId = select.value;
  let newActivity = document.createElement('li');
  newActivity.innerHTML = selectedId;
  let activitiesList = document.getElementById('activities-list')
  activitiesList.append(newActivity);
  console.log(selectedId)
})


document.getElementById('restaurants-add').addEventListener('click', (event) => {
  let select = document.getElementById('restaurants-choices');
  let selectedId = select.value;
  let newRestaurant = document.createElement('li');
  newRestaurant.innerHTML = selectedId;
  let activityList = document.getElementById('restaurants-list')
  activityList.append(newRestaurant);
  console.log(selectedId)
})
