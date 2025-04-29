"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const show = document.querySelector("#show");
    const form = document.getElementById("form");
    const firstName = form.querySelector("#name");
    const userName = form.querySelector("#username");
    const addButton = form.querySelector("#addButton");
    const password = form.querySelector("#password");
    const displayButton = document.querySelector("#display");
    var userDetails = [];
    addButton.addEventListener('click', getUser);
    displayButton.addEventListener('click', display);
    function getUser(event) {
        event.preventDefault();
        let user = {
            name: firstName.value,
            userName: userName.value,
            password: password.value
        };
        userDetails.push(user);
        console.log(userDetails);
        form.reset();
    }
    function display() {
        userDetails.forEach((data, index) => {
            let newtag = document.createElement("p");
            let newButton = document.createElement("button");
            newtag.innerHTML = data.name + " " + data.userName;
            newButton.textContent = "Show Index";
            newButton.onclick = () => console.log(index);
            show.appendChild(newtag);
            show.appendChild(newButton);
        });
    }
});
