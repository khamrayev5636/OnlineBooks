const elBtn = document.querySelector(".header__btn");
const elClose = document.querySelector(".header__btn-close")
const elNav = document.querySelector(".header__nav");

elBtn.addEventListener("click" , ()=> {
    elNav.classList.add("header__nav-js");
});

elClose.addEventListener("click" , ()=> {
    elNav.classList.remove("header__nav-js")
})