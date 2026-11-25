const calculateBtn = document.getElementById("calculateBtn");
const origin = document.getElementById("Origin");
const destination = document.getElementById("destination");
const distance = document.getElementById("distance");
const fuelprice = document.getElementById("fuelprice")
const vehicleType = document.getElementById("vehicleType");
const vehicleModel = document.getElementById("vehicleModel");
const result = document.getElementById("result");

const vehicles = {
    bike: [
        { name: "TVS Raider 125", mileage: 55 },
        { name: "TVS Apache RTR 310", mileage: 30 }
    ],

    car: [
        { name: "Maruti Swift", mileage: 20 },
        { name: "Hyundai i20", mileage: 18 }
    ]
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

  const fuel = Number(fuelprice.value);
  if(!Number.isFinite(fuel) || fuel<=98){
    alert("Enter Valid price")
    return;
  }

  result.textContent =
    "Origin: " +
    from +
    " Destination: " +
    to +
    " Distance " +
    km +
    " km" +
    " Vehicle: " +
    vehicle + 
    "Fuel Price" + fuel;
});
