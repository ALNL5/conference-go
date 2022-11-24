window.addEventListener("DOMContentLoaded", async () => {
    const LocationUrl = "http://localhost:8000/api/locations/";
    const response = await fetch(LocationUrl);
    if (response.ok) {
        const data = await response.json();
        const selectTag = document.getElementById("location");
        for (let location of data.locations) {
            const option = document.createElement("option");

            option.value = location.id;
            option.innerHTML = location.name;
            selectTag.appendChild(option);
        }
    }

        const formTag = document.getElementById("create-conference-form")
        formTag.addEventListener("submit", async (event) => {
            event.preventDefault();
            let formData = new FormData(formTag);
            let dataObject = Object.fromEntries(formData);
            let json = JSON.stringify(dataObject);
            console.log(json)

            const conferenceUrl = "http://localhost:8000/api/conferences/";
            const fetchConfig = {
                method: "post",
                body: json,
                Headers: {
                    "Content-Type": "application/json",
                }
            };
            const response = await fetch(conferenceUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newConference = await response.json();
                console.log(newConference);
            }
        });
})
