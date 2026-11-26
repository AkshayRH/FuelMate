/* ============================================================
   app.js – Core calculation logic (IDs unchanged)
   ============================================================ */

const calculateBtn = document.getElementById("calculateBtn");
const origin = document.getElementById("Origin");
const destination = document.getElementById("destination");
const distance = document.getElementById("distance");
const fuelprice = document.getElementById("fuelprice");
const vehicleType = document.getElementById("vehicleType");
const vehicleModel = document.getElementById("vehicleModel");
const result = document.getElementById("result");

/* Vehicle data – easily extendable */
const vehicles = {
    bike: [
        { name: "TVS Raider 125", mileage: 55 },
        { name: "TVS Apache RTR 310", mileage: 30 },
        { name: "Royal Enfield 350", mileage: 35 },
        { name: "Honda CB Shine", mileage: 60 }
    ],
    car: [
        { name: "Maruti Swift", mileage: 20 },
        { name: "Hyundai i20", mileage: 18 },
        { name: "Honda City", mileage: 17 },
        { name: "Tata Nexon", mileage: 16 }
    ],
    suv: [
        { name: "Mahindra Scorpio N", mileage: 14 },
        { name: "Toyota Fortuner", mileage: 12 },
        { name: "Hyundai Creta", mileage: 15 },
        { name: "Kia Seltos", mileage: 16 }
    ]
};

/* Populate vehicle model dropdown when type changes */
function populateModels(type) {
    if (!vehicleModel) return;
    vehicleModel.innerHTML = "<option value=''>Choose your vehicle</option>";
    const models = vehicles[(type || "").toLowerCase()] || [];
    models.forEach(function (model) {
        const option = document.createElement("option");
        option.value = model.name;
        option.textContent = model.name;
        option.dataset.mileage = model.mileage;
        vehicleModel.appendChild(option);
    });
}

if (vehicleType) {
    populateModels(vehicleType.value);
    vehicleType.addEventListener("change", function () {
        populateModels(vehicleType.value);
    });
}

/* Calculate on button click */
calculateBtn.addEventListener("click", function () {
    const from = origin.value.trim();
    const to = destination.value.trim();
    const km = Number(distance.value);
    const fuel = Number(fuelprice.value);
    const type = vehicleType.value;
    const modelName = vehicleModel.value;

    /* Validation */
    if (!from || !to) {
        alert("Please enter both origin and destination.");
        return;
    }
    if (!km || km <= 0) {
        alert("Please enter a valid distance.");
        return;
    }
    if (!fuel || fuel <= 0) {
        alert("Please enter a valid fuel price.");
        return;
    }
    if (!type) {
        alert("Please select a vehicle type.");
        return;
    }
    if (!modelName) {
        alert("Please select a vehicle model.");
        return;
    }

    /* Mileage lookup */
    const models = vehicles[type] || [];
    const selectedModel = models.find(m => m.name === modelName);
    const mileage = selectedModel ? selectedModel.mileage : null;

    /* Calculations */
    const fuelNeeded = mileage ? (km / mileage).toFixed(2) : "N/A";
    const totalCost = mileage ? ((km / mileage) * fuel).toFixed(2) : "N/A";

    /* Populate result text (kept for compat) */
    result.textContent =
        "From " + from + " → " + to +
        " | " + km + " km | " + modelName +
        (mileage ? " (" + mileage + " km/l)" : "") +
        " | Fuel: " + (fuelNeeded !== "N/A" ? fuelNeeded + " L" : "N/A") +
        " | Cost: " + (totalCost !== "N/A" ? "₹" + totalCost : "N/A");

    /* Fire custom event so dashboard.js can update summary cards */
    document.dispatchEvent(new CustomEvent("fuelCalculated", {
        detail: { from, to, km, fuel, type, modelName, mileage, fuelNeeded, totalCost }
    }));
});
