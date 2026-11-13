const calculateBtn = document.getElementById("calculateBtn");
const origin = document.getElementById("Origin");
const destination = document.getElementById("destination");
const distance = document.getElementById("distance");
const vehicleType = document.getElementById("vehicleType");
const result = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
  const from = origin.value;
  const to = destination.value;
  const km = distance.value;
  const vehicle = vehicleType.value;

  result.textContent =
    "Origin: " + from + 
    " Destination: " + to + 
    " Distance " + km + " km"
    " Vehicle: " + vehicle;

});
