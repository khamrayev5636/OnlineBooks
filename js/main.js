const elBtn = document.querySelector(".header__btn");
const elBody = document.querySelector("body");
const elClose = document.querySelector(".header__btn-close")
const elNav = document.querySelector(".header__nav");

elBtn.addEventListener("click" , ()=> {
    elNav.classList.add("header__nav-js");
    elBody.classList.add("body-js");
    
});

elClose.addEventListener("click" , ()=> {
    elNav.classList.remove("header__nav-js");
    elBody.classList.remove("body-js");
});


// ================= Form start ======================

const elForm = document.querySelector(".form");
const elSearch = elForm.querySelector(".form__search");
const elSort = elForm.querySelector(".form__sort");
const elYear = elForm.querySelector(".form__year");
const elAuthor = elForm.querySelector(".form__author");
const elLanguage = elForm.querySelector(".form__language");

// ================ DOM ga chizish ===================

const elList = document.querySelector(".book__list");
const elTemp = document.querySelector(".book__tempate").content;
const elFragment = document.createDocumentFragment();



// ============ DOM ga render qilish chizish ================

function renderBook(item , regex = ""){
    
    elList.innerHTML = "";
    
    item.forEach(book => {
        
        const elClone = elTemp.cloneNode(true);
        elClone.querySelector(".book__img-js").src = book.imageLink;
        
        if(regex.source != "(?:)" && regex){
            elClone.querySelector(".book__title").innerHTML = book.title.replace(regex , `<mark class="bg-danger">${regex.source.toLowerCase()}</mark>`);
        } else {
            elClone.querySelector(".book__title").textContent = book.title;
        }
        
        
        elClone.querySelector(".book__author").textContent = book.author;
        elClone.querySelector(".book__year").textContent = book.year;
        elClone.querySelector(".book__pages").textContent = book.pages;
        elClone.querySelector(".book__language").textContent = book.language;        
        elClone.querySelector(".book__link").href = book.link;        
        
        elFragment.appendChild(elClone);
    });
    
    elList.appendChild(elFragment);
};

// =========== Author sort ========================

function renderAuthor(name){
    
    const elAuthorArr = [];
    
    name.forEach(nameAuthor => {
        nameAuthor.author.split(",").forEach(nameList => {
            if(!elAuthorArr.includes(nameList)){
                elAuthorArr.push(nameList);
            };
        });
        
    });
    
    const elAuthorFrag = new DocumentFragment();
    
    elAuthorArr.forEach(option => {
        const elOption = document.createElement("option");
        elOption.value = option;
        elOption.textContent = option;
        
        elAuthorFrag.appendChild(elOption);
    });
    
    elAuthor.appendChild(elAuthorFrag);
};

// ============ Language Sort =====================

function renderLanguage(lang){
    
    const elLang = [];
    
    lang.forEach(langItem => {
        langItem.language.split(",").forEach(langList => {
            if(!elLang.includes(langList)){
                elLang.push(langList);
            };
        });
    });
    
    const elLangFrag = new DocumentFragment();
    
    elLang.forEach(option => {
        
        const elOption = document.createElement("option");
        
        elOption.value = option;
        elOption.textContent = option;
        elLangFrag.appendChild(elOption);
    });
    
    elLanguage.appendChild(elLangFrag);
};


// =============== SORT ===========================

function renderSort(booksort , value){
    
    if(value == "a-z"){
        booksort.sort((a , b) => {
            if(a.title > b.title){
                return 1
            }else if(a.title < b.title){
                return -1
            }else {
                return 0
            };
        });
    }; 


    if(value == "z-a"){
        booksort.sort((a , b) => {
            if(a.title > b.title){
                return -1
            }else if(a.title < b.title){
                return 1
            }else {
                return 0
            };
        });
    }; 

    if(value == "new-old"){
        booksort.sort((a , b) => b.year - a.year)
    }

    if(value == "old-new"){
        booksort.sort((a , b) => a.year - b.year)
    }

    if(value == "many-pages"){
        booksort.sort((a , b) => b.pages - a.pages)
    }

    if(value == "less-pages"){
        booksort.sort((a , b) => a.pages - b.pages)
    }
    
    

};



// ================= ELForm ========================

elForm.addEventListener("submit" , (evt) => {
    evt.preventDefault();
    
    const elSearchValue = elSearch.value.trim();
    const elAuthorValue = elAuthor.value.trim();
    const elLanguageValue = elLanguage.value.trim();
    const elSortValue = elSort.value.trim();
    const elYearValue = Number(elYear.value.trim());
    const elRegTitle = new RegExp(elSearchValue , "gi");
    
    const searchBook = books.filter(element => (element.title.match(elRegTitle)) && (element.author.includes(elAuthorValue) || elAuthorValue === "all") && (element.language.includes(elLanguageValue) || elLanguageValue === "all") && (elYearValue <= element.year ));
    
    if(searchBook.length > 0){
        renderSort(searchBook , elSortValue)
        renderBook(searchBook , elRegTitle);
    }else {
        elList.textContent = "Not Books"
    }
    
})

renderBook(books);
renderAuthor(books);
renderLanguage(books);
