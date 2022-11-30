window.addEventListener("DOMContentLoaded", async () => {
    const StateUrl = "http://localhost:8000/api/states/";
    const response = await fetch(StateUrl);
    if (response.ok) {
        const data = await response.json();
        const selectTag = document.getElementById("state");
        for (let state of data.states) {
            const option = document.createElement("option");

            option.value = state.abbreviation;
            option.innerHTML = state.name;
            selectTag.appendChild(option);
        }
    }

        const formTag = document.getElementById("create-location-form")
        formTag.addEventListener("submit", async (event) => {
            event.preventDefault();
            let formData = new FormData(formTag);
            let dataObject = Object.fromEntries(formData);
            let json = JSON.stringify(dataObject);
            console.log(json)

            const locationUrl = "http://localhost:8000/api/locations/";
            const fetchConfig = {
                method: "post",
                body: json,
                Headers: {
                    "Content-Type": "application/json",
                }
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
                console.log(newLocation);
            }
        });
}
)
