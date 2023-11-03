let temp = document.querySelector("#currentLocationTemperature");
let locationName = document.querySelector("#locationName");
let weatherIcon = document.querySelector("#weatherIcon");
let dateInfo = document.querySelector("#dateInfo");
let humindtyNums = document.querySelector("#humindtyNums");
let cludyNum = document.querySelector("#cludyNum");
let windNum = document.querySelector("#windNum");
let maxTemp = document.querySelector("#maxTemp");
let minTemp = document.querySelector("#minTemp");

function getData(address) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${address}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a486227ea2mshe421b0e17360a4fp10cc5djsn73d41f8a3c59",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((el) => el.json())
    .then((data) => {
      getBgImage(data.current.condition.text, data.location.name);
      changeUi(data);
    });
}

function getBgImage(condition, city) {
  fetch(`https://api.pexels.com/v1/search?query=${city}`, {
    headers: {
      Authorization: "C5CLHLgmdgdGOIbloebIIJMg4VpJUN0zQOc8g3tML6B8O98dfTiP7IGO",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(
        data.photos[Math.floor(Math.random() * data.photos.length)].src
          .landscape
      );
      document.body.style.background = `url(${
        data.photos[Math.floor(Math.random() * data.photos.length)].src
          .landscape
      })`;
      document.body.style.backgroundSize = "cover";
      document.body.style.width = "100%";
      document.body.style.height = "100vh";

      document.body.style.backgroundRepeat = "no-repeat";
      // console.log(data);
    });
}

function changeUi(data) {
  // console.log(data);

  locationName.textContent = data.location.name;
  temp.textContent = data.current.temp_c + "°";
  weatherIcon.setAttribute("src", data.current.condition.icon);
  dateInfo.textContent = data.location.localtime;
  maxTemp.textContent = data.current.temp_c + 5 + "°";
  minTemp.textContent = data.current.temp_c - 5 + "°";
  humindtyNums.textContent = data.current.humidity + "%";
  cludyNum.textContent = data.current.cloud + "%";
  windNum.textContent = data.current.wind_kph + "km/h";
}
/////////////////////////////

const input = document.querySelector("#searchInput");

input.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    getData(input.value);
  }
  console.log(event.key);
});
