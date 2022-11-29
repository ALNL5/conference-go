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

  });
        const formTag = document.getElementById("create-presentation-form");
        formTag.addEventListener("submit", async event => {
            event.preventDefault();
            let formData = new FormData(formTag);
            let dataObject = Object.fromEntries(formData);
            let json = JSON.stringify(dataObject);
            console.log(json)

            const conf = Object.fromEntries(formData);
            const presentationUrl = `http://localhost:8000${conf.conference}presentations/`;
            const fetchConfig = {
                method: "post",
                body: json,
                Headers: {
                    "Content-Type": "application/json",
                }
            };
            const response = await fetch(presentationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newPresentation = await response.json();
                console.log(newPresentation);
            }
        });
