/* dashboard.js – vehicle card selection & result sync */
(function () {
    const cards = document.querySelectorAll(".vehicle-card");
    const vehicleTypeSelect = document.getElementById("vehicleType");
    const resultEl = document.getElementById("result");

    // Keep track of original result content (set by app.js)
    const summaryResult = document.querySelector(".panel--summary #result");

    // Sync vehicle cards with the hidden <select id="vehicleType">
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            cards.forEach(function (c) { c.classList.remove("vehicle-card--active"); });
            card.classList.add("vehicle-card--active");

            const type = card.dataset.type;
            vehicleTypeSelect.value = type;
            // Fire change event so app.js populates vehicleModel
            vehicleTypeSelect.dispatchEvent(new Event("change"));
        });
    });

    // Mirror the left-panel result into the right summary panel
    // by moving #result into the right panel after calculate
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
        calculateBtn.addEventListener("click", function () {
            // Give app.js a tick to update #result, then copy text
            setTimeout(function () {
                const resultText = resultEl ? resultEl.textContent : "";
                const summaryBox = document.querySelector(".panel--summary .result-box");
                if (summaryBox && resultText.trim()) {
                    summaryBox.innerHTML = "<p style='margin:0'>" + resultText + "</p>";
                }
            }, 50);
        });
    }
})();
