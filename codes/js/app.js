function createCard(name, description, pictureUrl, starts1, ends1, location) {
    return `
            <div class="shadow p-3 mb-5 bg-body rounded">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer text-muted">
                    ${starts1} - ${ends1}
                </div>
            </div>
    `;
  }

// function createAlert(errortype) {
//     return `
//         <div id="liveAlertPlaceholder"></div>
//         <button type="button" class="btn btn-primary" id="liveAlertBtn">
//             ${errortype}
//         </button>
//     `;
// }

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // createAlert("Response is not ok");
        } else {
            const data = await response.json();
            let counter = 1;

            // const conference = data.conferences[0];
            // const nameTag = document.querySelector(".card-title");
            // nameTag.innerHTML = conference.name;

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = details.conference.starts;
                    const starts1 = new Date(starts).toLocaleDateString();
                    const ends = details.conference.ends;
                    const ends1 = new Date(ends).toLocaleDateString();
                    const location = details.conference.location.name;
                    const html = createCard(name, description, pictureUrl, starts1, ends1, location)
                    if (counter === 3) {
                        const selector = `#card-col-${counter}`;
                        const column = document.querySelector(selector);
                        column.innerHTML += html;
                        counter = 1;
                    } else {
                        const selector = `#card-col-${counter}`;
                        const column = document.querySelector(selector);
                        column.innerHTML += html;
                        counter += 1;
                    }
                }
            }

        }
    } catch (e) {
        // createAlert(console.error(e));
    }
})

// var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
// var alertTrigger = document.getElementById('liveAlertBtn')

// function alert(message, type) {
//   var wrapper = document.createElement('div')
//   wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

//   alertPlaceholder.append(wrapper)
// }

// if (alertTrigger) {
//   alertTrigger.addEventListener('click', function () {
//     alert('Nice, you triggered this alert message!', 'success')
//   })
// }
