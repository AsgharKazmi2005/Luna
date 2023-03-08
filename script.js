//Define DOM Elements
const searchButton = document.querySelector(".button");
const pageDesc = document.querySelector(".pageDesc");
const city = document.querySelector(".city");
const dataCont = document.querySelector(".dataCont");
const date = document.querySelector(".date");
const explanation = document.querySelectorAll(".explanation");

//Define Functions

//This function uses moment.js to convert military time to AM/PM equivilants
function armyToNormal(input) {
  return moment(input, "HH:mm").format("h:mm A");
}

//This function accepts a node or lack thereof and then removes it if it exists
function nodeRemover(nodeList) {
  if (!nodeList.length) {
    nodeList.parentNode.removeChild(nodeList);
  } else {
    nodeList.forEach(function (node) {
      node.parentNode.removeChild(node);
      console.log(`Node ${node} Removed`);
    });
  }
}

// Defining async function
async function getApi(url) {
  const response = await fetch(url);
  const data = await response.json();

  // Since many parameters of the data do not exist, we need to filter through them. We iterate using filter() and remove null values.
  //Then we Join the truthy values into one nicely formatted object literal to use later

  const infoArray = [
    data.location.city,
    data.location.state,
    data.location.country,
  ];

  //Filter out nullish values, then join filtered array into a string seperated by commas
  const info = infoArray.filter((value) => value).join(", ");

  //Clear any data from previous queries
  dataCont.innerHTML = "";

  //Insert new data from API
  dataCont.insertAdjacentHTML(
    `afterbegin`,
    `

   <div class='master'>
    <div class='titleDiv'>
    <div class='dataTitle'>Lunar data for ${info} on ${data.date} </div>
    </div>
    <div class="inserts">Moon Altitude: ${data.moon_altitude.toFixed(
      5
    )} km</div>
    <div class="inserts">Moon Azimuth: ${data.moon_azimuth.toFixed(5)}°</div>
    <div class="inserts">Moon Distance: ${data.moon_distance.toFixed(
      5
    )} km</div>
    <div class="inserts">Moon Angle: ${data.moon_parallactic_angle.toFixed(
      5
    )}°</div>
    <div class="inserts">Moonrise: ${armyToNormal(data.moonrise)}</div>
    <div class="inserts">Moonset: ${armyToNormal(data.moonset)}</div>
   </div>`
  );
}

//Button Click Event
searchButton.addEventListener("click", function (event) {
  //Prevent page refresh
  event.preventDefault();
  //Format City Names
  const cityFormatted = city.value.split(" ").join("%20");
  //Fetch API Data for user query
  getApi(
    `https://api.ipgeolocation.io/astronomy?apiKey=8b804068b8f64da18a18e4751642af33&location=${cityFormatted},&date=${date.value}`
  );

  //Remove the Explanations Nodelist once user searches
  nodeRemover(explanation);

  //Remove the pageDesc once the user searches
  nodeRemover(pageDesc);
});
