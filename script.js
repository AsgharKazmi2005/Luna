//Define DOM Elements
const searchButton = document.querySelector(".button");
const city = document.querySelector(".city");
const dataCont = document.querySelector(".dataCont");
const date = document.querySelector(".date");
const explanation = document.querySelectorAll(".explanation");
console.log(explanation);

//Define Functions
function armyToNormal(input) {
  return moment(input, "HH:mm").format("h:mm A");
}

// Defining async function
async function getApi(url) {
  const response = await fetch(url);
  const data = await response.json();
  // Since many parameters of the data do not exist, we need to filter through them
  const infoArray = [
    data.location.city,
    data.location.state,
    data.location.country,
  ]
    .filter((value) => value)
    .join(", ");

  console.log(data);
  dataCont.innerHTML = "";

  dataCont.insertAdjacentHTML(
    `afterbegin`,
    `
   <div class='master'>
    <div class='titleDiv'>
    <div class='dataTitle'>Lunar data for ${infoArray} on ${data.date} </div>
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

//When button is clicked, load in API Data
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const cityFormatted = city.value.split(" ").join("%20");
  getApi(
    `https://api.ipgeolocation.io/astronomy?apiKey=8b804068b8f64da18a18e4751642af33&location=${cityFormatted},&date=${date.value}`
  );

  explanation.forEach(function (node, value) {
    node.parentNode.removeChild(node);
  });
});
