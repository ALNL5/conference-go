const clueDiv = document.querySelector('#clue');


console.log(clueDiv);
console.log("still firing!!!");

const url = 'https://jservice.xyz/api/random-clue';

const response = await fetch(url);

function createClueHtml(category, question, answer) {
  return `
    <div>
      <h2>${category}</h2>
      <p><b>Question</b>: ${question}</p>
      <p><b>Answer</b>: ${answer}</p>
    </div>
  `;
}

if (response.ok) {
  console.log("response",response);

  const data = await response.json();
  console.log("data",data);

  const category = data.category.title;
  const question = data.question;
  const answer = data.answer;
  const html = createClueHtml(category, question, answer);
  console.log(html);

  clueDiv.innerHTML = html;
} else {
  console.error('Got an error in the response.')
}
// form

const form = document.getElementById("create-clue-form");

console.log("FORM!!!", form );

form.addEventListener("submit",createClue);

async function createClue(event){

  event.preventDefault();

  console.log("Sumbit was fired");

  let formData = new FormData(form);

  let dataObject = Object.fromEntries(formData);

  console.log("Object from form",dataObject);

  let fetchOptions = {
    method: "post",
    body: JSON.stringify(dataObject),
    headers: {
      "Content-Type":"application/json"
    },

  }

  let newClueUrl = "https://jservice.xyz/api/clues";

  let newClueResponse = await fetch(newClueUrl,fetchOptions);

  console.log("POST HERE",newClueResponse);

  if (newClueResponse.ok){

    console.log("Post");

    let newClue = await newClueResponse.json();

    let category = newClue.category.title;

    console.log("Category!!!", category);

    let question = newClue.question;

    console.log("question!!!", question);

    let answer = newClue.answer;

    console.log("answer!!!", answer);

    let html = createClueHtml(category, question, answer);

    console.log("html!!!", html);

    clueDiv.innerHTML = html;

    console.log("Hello world");


  }



}

//

// categories

let categoriesUrl = "https://jservice.xyz/api/categories";

let categoriesResponse = await fetch(categoriesUrl);

console.log("Categories Response",categoriesResponse);

if (categoriesResponse.ok){

  const data = await categoriesResponse.json();

  console.log("JSON of categories",data);

  const selectTag = document.getElementById("categoryId");

  console.log("Select Tag",selectTag);

  for (let category of data.categories.slice(0,100)){

    const option = document.createElement("option");

    option.value = category.id;
    option.innerHTML = category.title;
    selectTag.appendChild(option)

  }

}

// If you want to put your POST request in an anonymous function, you can put in here:

// const form = document.getElementById('create-clue-form');
// form.addEventListener('submit', event => {
//   event.preventDefault();

//   // POST request stuff here
//   const formData = new FormData(form);
//   const dataObject = Object.fromEntries(formData);
//   console.log(dataObject);
// });
