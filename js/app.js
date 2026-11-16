const calculateBtn = document.getElementById("calculateBtn");
const origin = document.getElementById("Origin");
const destination = document.getElementById("destination");
const distance = document.getElementById("distance");
const vehicleType = document.getElementById("vehicleType");
const vehicleModel = document.getElementById("vehicleModel");
const result = document.getElementById("result");

const vehicles = {
  bike: ["Tvs raider 125", "Tvs Apache Rtr #10"],
  car: ["Maruti Swift", "Hyundai i20"],
};

vehicleType.addEventListener("change", function () {
  const selectedType = vehicleType.value;

  vehicleModel.innerHTML = "";

  const models = vehicles[selectedType];

  models.forEach(function (model) {
    const option = document.createElement("option");

    option.value = model;
    option.textContent = model;

    vehicleModel.appendChild(option);
  });
});

calculateBtn.addEventListener("click", function () {
  const from = origin.value.trim();
  const to = destination.value.trim();
  if (from === "" || to === "") {
    alert("Enter origin and destination");
    return;
  }

  const km = Number(distance.value);
  if (km <= 0) {
    alert("Enter Valid Km");
    return;
  }
  const vehicle = vehicleType.value;

  result.textContent =
    "Origin: " +
    from +
    " Destination: " +
    to +
    " Distance " +
    km +
    " km" +
    " Vehicle: " +
    vehicle;
});
