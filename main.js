
/*-------------------------navigator menu-----------------*/

(() => {
    const hamburgerbtn = document.querySelector(".hamburger-btn"),
    navmenu = document.querySelector(".nav-menu"),
    closenavbtn = navmenu.querySelector(".close-nav-menu");

    hamburgerbtn.addEventListener("click", shownavmenu);
    closenavbtn.addEventListener("click", hidenavmenu);

    function shownavmenu() {
        navmenu.classList.add("open");
        bodyscrollingtoggle();
    }
    function hidenavmenu() {
        navmenu.classList.remove("open");
        fadeouteffect();
        bodyscrollingtoggle();
    }
    function fadeouteffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    document.addEventListener("click", (event) =>{
        if (event.target.classList.contains('link-item')){

            if (event.target.hash !=="") {
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active section.............
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new section..........
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing  active navigator menu....................
                navmenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navmenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if (navmenu.classList.contains("open")) {
                    // activate new navigator menu............
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    //hide navigator menu....
                    hidenavmenu();
                }
                else{
                    let navitem=navmenu.querySelectorAll(".link-item");
                    navitem.forEach((item) =>{
                        if(hash === item.hash){
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");   
                        }
                    })
                    fadeouteffect();
                }
            }//  add hash (#) to url
            //window.location.hash = hash;

        }
    })

})();

/* about section tabs 
(() => {
    const aboutsection = document.querySelector(".about-section"),
        tabscontainer = document.querySelector(".about-tabs");

    tabscontainer.addEventListener("click", (event) => {

        /*    if event.target contains tab-items  class and not active class....... 
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            tabscontainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");
            aboutsection.querySelector(".tab-content.active").classList.remove("active");
            aboutsection.querySelector(target).classList.add("active");
        }
    })
})();*/



function bodyscrollingtoggle() {
    document.body.classList.toggle("hidden-scrolling");
}
/*            portfolio filter and popup              */

(() => {

    const filtercontainer = document.querySelector(".portfolio-filter"),
        portfolioitemscontainer = document.querySelector(".portfolio-items"),
        portfolioitems = document.querySelector(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevbtn = popup.querySelector(".pp-prev"),
        nextbtn = popup.querySelector(".pp-next"),
        closebtn = popup.querySelector(".pp-close"),
        projectdetailscontainer = popup.querySelector(".pp-details"),
        projectdetailsbtn = popup.querySelector(".pp-project-details-btn");

    let itemindex, slideindex, screenshots;

    filtercontainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            filtercontainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioitems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }

    })
    portfolioitemscontainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioitem = event.target.closest(".portfolio-item-inner").parentElement;
            itemindex = Array.from(portfolioitem.parentElement.children).indexOf(portfolioitem);
            screenshots = portfolioitems[itemindex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length == 1) {
                prevbtn.style.display = "none";
                nextbtn.style.display = "none";
            }
            else {
                prevbtn.style.display = "block";
                nextbtn.style.display = "block";
            }
            slideindex = 0;
            popuptoggle();
            popupslideshow();
            popupdetails();
        }
    })
    closebtn.addEventListener("click", () => {
        popuptoggle();

        if (projectdetailscontainer.classList.contains("active")) {
            popupdetailstoggle();
        }
    })
    function popuptoggle() {
        popup.classList.toggle("open");
        bodyscrollingtoggle();

    }
    function popupslideshow() {
        const imgsrc = screenshots[slideindex];
        const popupimg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupimg.src = imgsrc;
        popupimg.onload = () => {
            //  deactivate loder after the popupimg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideindex + 1) + "of" + screenshots.length;

    }

    // next slide...
    nextbtn.addEventListener("click", () => {
        if (slideindex === screenshots.length - 1) {
            slideindex = 0;
        } else {
            slideindex++;
        }
        popupslideshow();
    })

    //prev slide
    prevbtn.addEventListener("click", () => {
        if (slideindex == 0) {
            slideindex = screenshots.length - 1;
        }
        else {
            slideindex--;
        }
        popupslideshow();
    })

    function popupdetails() {
        if (!portfolioitems[itemindex].querySelector(".portfolio-item-details")) {
            projectdetailsbtn.style.display = "none";
            return;
        }
        projectdetailsbtn.style.display = "block";
        const details = portfolioitems[itemindex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioitems[itemindex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioitems[itemindex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");

    }

    projectdetailsbtn.addEventListener("click", () => {
        popupdetailstoggle();
    })

    function popupdetailstoggle() {
        if (projectdetailscontainer.classList.contains("active")) {
            projectdetailsbtn.querySelector("i").classList.remove("fa-minus");
            projectdetailsbtn.querySelector("i").classList.add("fa-plus");
            projectdetailscontainer.classList.remove("active");
            projectdetailscontainer.style.maxHeight = 0 + "px";
        }
        else {
            projectdetailsbtn.querySelector("i").classList.remove("fa-plus");
            projectdetailsbtn.querySelector("i").classList.add("fa-minus");
            projectdetailscontainer.classList.add("active");
            projectdetailscontainer.style.maxHeight = projectdetailscontainer.scrollHeight + "px";
            popup.scrollTo(0, projectdetailscontainer.offsetTop);
        }
    }
})();


/*--------------------------------testimonial section----------------------

(() => {

    const slidercontainer = document.querySelector(".testi-slider-container");
    const slides = slidercontainer.querySelector(".testi-item");
    const slidewidth = slidercontainer.offsetWidth;
    prevbtn = document.querySelector(".testi-slider-nav .prev"),
        nextbtn = document.querySelector(".testi-slider-nav .next"),
        activeslide = slidercontainer.querySelector(".testi-item.active");
    let slideindex = Array.from(activeslide.parentElement.children).indexOf(activeslide);

    slides.forEach((slide) => {
        slide.style.width = slidewidth + "px";
    })
    slidercontainer.style.width = slidewidth + slides.length + "px";

    nextbtn.addEventListener("click", () => {
        if (slideindex === slides.length - 1) {
            slideindex = 0;
        }
        else {
            slideindex++;
        }
        slider();
    })


    prevbtn.addEventListener("click", () => {
        if (slideindex === 0) {
            slideindex = slides.length - 1;
        }
        else {
            slideindex--;
        }
        slider();
    })

    function slider() {
        slidercontainer.querySelector(".testi-item.active").classList.remove("active");
        slides[slideindex].classList.add("active");
        slidercontainer.style.marginLeft = - (slidewidth + slideindex) + "px";
    }
    slider();
})();

hide all section except active-----------------------

(() => {

    const section = document.querySelectorAll(".section");
    console.log(section);
    section.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })

})(); */

//preloader---------
/*window.addEventListener("load",() =>{
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display="none";
    },600)
})*/