
/*----toggle style switcher--------------*/

const styleswitchertoggle = document.querySelector(".style-switcher-toggle");

styleswitchertoggle.addEventListener("click",() =>{
    document.querySelector(".style-switcher").classList.toggle("open");
})

// hide style switcher on scroll
window.addEventListener("scroll",() =>{
    
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/*-----------------------------theme colors -----------------------*/
const alternatestyle = document.querySelectorAll(".alternate-style");
console.log(alternatestyle);
function setActiveStyle(color) {
    alternatestyle.forEach((style) =>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled","true");
        }
    })
}

//-----------theme light  and dark mode----------------
const daynight = document.querySelector(".day-night");

daynight.addEventListener("click", () =>{
    daynight.querySelector("i").classList.toggle("fa-sun");
    daynight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
})
window.addEventListener("load", () =>{
    if(document.body.classList.contains("dark")){
        daynight.querySelector("i").classList.add("fa-sun");
    }else{
        daynight.querySelector("i").classList.add("fa-moon");
    }
})