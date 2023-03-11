window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
    }

        // Here, add the 'd-none' class to the loading icon
        const divLoading = document.getElementById("loading-conference-spinner");
        divLoading.classList.add("d-none");
        // Here, remove the 'd-none' class from the select tag
        const divSelect = document.getElementById("conference");
        divSelect.classList.remove("d-none");


        const formTag = document.getElementById("create-attendee-form")
        formTag.addEventListener("submit", async (event) => {
            event.preventDefault();
            let formData = new FormData(formTag);
            let dataObject = Object.fromEntries(formData);
            let json = JSON.stringify(dataObject);
            console.log(json)

            const attendeeUrl = "http://localhost:8001/api/attendees/";
            const fetchConfig = {
                method: "post",
                body: json,
                Headers: {
                    "Content-Type": "application/json",
                }
            };
            const response = await fetch(attendeeUrl, fetchConfig);
            if (response.ok) {
                const newAttendee = await response.json();
                formTag.classList.add("d-none");
                const divAlert = document.getElementById("success-message");
                divAlert.classList.remove("d-none");
                console.log(newAttendee);
            }
        });
})
