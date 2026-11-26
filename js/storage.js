/* ============================================================
   storage.js - Persists inputs & dashboard state in localStorage
   ============================================================ */

(function () {
    const STORAGE_INPUTS_KEY = "fuelmate_inputs";
    const STORAGE_DASHBOARD_KEY = "fuelmate_dashboard";

    const distance = document.getElementById("distance");
    const origin = document.getElementById("Origin");
    const destination = document.getElementById("destination");
    const fuelprice = document.getElementById("fuelprice");
    const vehicleType = document.getElementById("vehicleType");
    const vehicleModel = document.getElementById("vehicleModel");
    const resetBtn = document.getElementById("resetBtn");
    const result = document.getElementById("result");

    function saveInputs() {
        try {
            const data = {
                distance: distance ? distance.value : "",
                origin: origin ? origin.value : "",
                destination: destination ? destination.value : "",
                fuelprice: fuelprice ? fuelprice.value : "",
                vehicleType: vehicleType ? vehicleType.value : "bike",
                vehicleModel: vehicleModel ? vehicleModel.value : ""
            };
            localStorage.setItem(STORAGE_INPUTS_KEY, JSON.stringify(data));
        } catch (e) {
            /* Ignore storage errors */
        }
    }

    function restoreAll() {
        try {
            const rawInputs = localStorage.getItem(STORAGE_INPUTS_KEY);
            if (rawInputs) {
                const saved = JSON.parse(rawInputs);
                if (distance && saved.distance !== undefined) distance.value = saved.distance;
                if (origin && saved.origin !== undefined) origin.value = saved.origin;
                if (destination && saved.destination !== undefined) destination.value = saved.destination;
                if (fuelprice && saved.fuelprice !== undefined) fuelprice.value = saved.fuelprice;
                if (vehicleType && saved.vehicleType) {
                    vehicleType.value = saved.vehicleType;
                    vehicleType.dispatchEvent(new Event("change"));
                }
                if (vehicleModel && saved.vehicleModel) {
                    vehicleModel.value = saved.vehicleModel;
                }
            }

            const rawDashboard = localStorage.getItem(STORAGE_DASHBOARD_KEY);
            if (rawDashboard) {
                const savedDashboard = JSON.parse(rawDashboard);
                document.dispatchEvent(new CustomEvent("fuelCalculated", {
                    detail: savedDashboard
                }));
            }
        } catch (e) {
            /* Ignore storage errors */
        }
    }

    restoreAll();

    [distance, origin, destination, fuelprice, vehicleType, vehicleModel].forEach(function (el) {
        if (!el) return;
        el.addEventListener("input", saveInputs);
        el.addEventListener("change", saveInputs);
    });

    document.addEventListener("fuelCalculated", function (event) {
        if (!event.detail) return;
        saveInputs();
        try {
            localStorage.setItem(STORAGE_DASHBOARD_KEY, JSON.stringify(event.detail));
        } catch (e) {
            /* Ignore storage errors */
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            try {
                localStorage.removeItem(STORAGE_INPUTS_KEY);
                localStorage.removeItem(STORAGE_DASHBOARD_KEY);
            } catch (e) {
                /* Ignore storage errors */
            }

            if (distance) distance.value = "";
            if (origin) origin.value = "";
            if (destination) destination.value = "";
            if (fuelprice) fuelprice.value = "";
            if (vehicleType) {
                vehicleType.value = "bike";
                vehicleType.dispatchEvent(new Event("change"));
            }
            if (result) result.textContent = "";

            document.dispatchEvent(new CustomEvent("fuelReset"));
        });
    }
})();
