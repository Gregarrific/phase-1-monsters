let limit = 10, pageNum = 1;
let forwardBtn, backBtn;
//Event Listeners
document.addEventListener('DOMContentLoaded', element => {
    loadMonstr();
    forwardBtn = document.querySelector('#forward');
    forwardBtn.addEventListener('click', clickBtn);
    backBtn = document.querySelector('#back');
    backBtn.addEventListener('click', clickBtn);
    createForm();
    document.addEventListener('submit', newMonstr);
});
//Functions
function loadMonstr(pageNum) {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pageNum}`)
    .then (response => response.json())
    .then (json => displayMonstr(json));
}
function displayMonstr(data) {
    let container = document.getElementById('monster-container');
    while (container.firstChild) {
        container.firstChild.remove();
    }
    data.forEach(element => {
        let monstrName = document.createElement('h2');
        monstrName.innerText = element.name;
        let monstrAge = document.createElement('h4');
        monstrAge.innerText = `${element.age} years old.`;
        let monstrDesc = document.createElement('p');
        monstrDesc.innerText = element.description;
        container.appendChild(monstrName);
        container.appendChild(monstrAge);
        container.appendChild(monstrDesc);
    });
}
function clickBtn(event) {
    if (event.target.id === 'forward') {
        pageNum ++;
        console.log(pageNum);
    } else {
        pageNum --;
        if (pageNum < 1) {
            pageNum = 1;
        }
        console.log(pageNum);
    }
    loadMonstr(pageNum);
}
function createForm() {
    let form = document.createElement('form');
    form.id = 'monster-form';
    let inputName = document.createElement('input');
    inputName.id = 'name';
    inputName.setAttribute('placeholder', 'name...');
    form.append(inputName);
    let inputAge = document.createElement('input');
    inputAge.id = 'age';
    inputAge.setAttribute('placeholder', 'age...');
    form.append(inputAge);
    let inputDesc = document.createElement('input');
    inputDesc.id = 'description';
    inputDesc.setAttribute('placeholder', 'description...');
    form.append(inputDesc);
    let inputBtn = document.createElement('input');
    inputBtn.id = 'submit';
    inputBtn.type = 'submit';
    form.append(inputBtn);
    let formContainer = document.getElementById('create-monster');
    formContainer.prepend(form);
}
function newMonstr(event) {
    event.preventDefault();
    fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        description: document.getElementById('description').value
    })
    })
    .then (response => response.json())
    .then (json => console.log(json));
    event.target.reset();
}