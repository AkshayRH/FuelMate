/* ============================================================
   dashboard.js - Updates right-side dashboard on calculation
   ============================================================ */

(function () {
    const routeEl = document.getElementById("dashRoute");
    const costEl = document.getElementById("dashCost");
    const costPerKmEl = document.getElementById("dashCostPerKm");
    const fuelEl = document.getElementById("dashFuel");
    const fuelRateEl = document.getElementById("dashFuelRate");
    const distanceEl = document.getElementById("dashDistance");
    const vehicleEl = document.getElementById("dashVehicle");
    const mileageEl = document.getElementById("dashMileage");

    document.addEventListener("fuelCalculated", function (event) {
        const data = event.detail;
        if (!data) return;

        if (routeEl) {
            routeEl.textContent = data.from + " -> " + data.to;
        }
        if (costEl) {
            costEl.textContent = data.totalCost !== "N/A" ? "Rs. " + data.totalCost : "N/A";
        }
        if (costPerKmEl) {
            const perKm = data.totalCost !== "N/A" && data.km > 0
                ? (Number(data.totalCost) / data.km).toFixed(2)
                : null;
            costPerKmEl.textContent = perKm ? "Rs. " + perKm + " / km" : "-";
        }
        if (fuelEl) {
            fuelEl.textContent = data.fuelNeeded !== "N/A" ? data.fuelNeeded + " L" : "N/A";
        }
        if (fuelRateEl) {
            fuelRateEl.textContent = "Fuel @ Rs. " + data.fuel + " / L";
        }
        if (distanceEl) {
            distanceEl.textContent = data.km + " km";
        }
        if (vehicleEl) {
            vehicleEl.textContent = data.modelName;
        }
        if (mileageEl) {
            mileageEl.textContent = data.mileage ? data.mileage + " km/l (" + data.type + ")" : data.type;
        }
    });
})();