document.addEventListener('DOMContentLoaded', () => {
const show=document.querySelector("#show") as HTMLDivElement
const form=document.getElementById("form") as HTMLFormElement;
const firstName=form.querySelector("#name") as HTMLInputElement;
const userName=form.querySelector("#username") as HTMLInputElement;
const addButton=form.querySelector("#addButton") as HTMLButtonElement
const password=form.querySelector("#password") as HTMLInputElement;
const displayButton=document.querySelector("#display") as HTMLButtonElement;


interface userData{
    name:string;
    userName:string;
    password:string;
}

var userDetails:userData[]=[];
addButton.addEventListener('click',getUser);
displayButton.addEventListener('click',display);


function getUser(event:MouseEvent){
    event.preventDefault(); 
    let user:userData={
            name:firstName.value,
            userName:userName.value,
            password:password.value
    }

    userDetails.push(user)
    console.log(userDetails);
    form.reset()
    

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

