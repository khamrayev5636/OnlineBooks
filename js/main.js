AOS.init();


// ================= Form start ======================
const elForm = document.querySelector(".form");
const elSearch = elForm.querySelector(".form__search");
const elSort = elForm.querySelector(".form__sort");
const elYear = elForm.querySelector(".form__year");
const elAuthor = elForm.querySelector(".form__author");
const elLanguage = elForm.querySelector(".form__language");

// ================ DOM ga chizish ===================
const elList = document.querySelector(".book__list");
const elBtn = document.querySelector(".book__btn");

// Bookmark start
const booksArr = [];
const elCloseBtns = document.querySelector(".close__book")
const elBookmarkList = document.querySelector(".bookmark__list");
const elBookmarkBtn = document.querySelector(".bookmark__btn");
const elBookmarkClose = document.querySelector(".close__btn");



// ============ DOM ga render qilish chizish ================

function renderBook(item , regex = ""){
    
    elList.innerHTML = "";
    
    const elTemp = document.querySelector(".book__tempate").content;
    const elFragment = document.createDocumentFragment();
    
    item.forEach(book => {
        
        const elClone = elTemp.cloneNode(true);
        elClone.querySelector(".book__img-js").src = book.imageLink;
        
        if(regex.source != "(?:)" && regex){
            elClone.querySelector(".book__title").innerHTML = book.title.replace(regex , `<mark class="bg-info">${regex.source.toLowerCase()}</mark>`);
        } else {
            elClone.querySelector(".book__title").textContent = book.title;
        }
        
        
        elClone.querySelector(".book__author").textContent = book.author;
        elClone.querySelector(".book__year").textContent = book.year;
        elClone.querySelector(".book__pages").textContent = book.pages;
        elClone.querySelector(".book__language").textContent = book.language;        
        elClone.querySelector(".book__link").href = book.link;    
        elClone.querySelector(".book__btn").dataset.bookmarkId = book.pages;   
        
        elFragment.appendChild(elClone);
    });
    
    elList.appendChild(elFragment);
};

// =========== Author sort ========================

const elAuthorArr = [];
function renderAuthor(name){
    
    
    name.forEach(nameAuthor => {
        nameAuthor.author.split(",").forEach(nameList => {
            if(!elAuthorArr.includes(nameList)){
                elAuthorArr.push(nameList);
            };
        });
        
    });
    
    elAuthorArr.sort()
    
    const elAuthorFrag = new DocumentFragment();
    
    elAuthorArr.forEach(option => {
        const elOption = document.createElement("option");
        elOption.value = option;
        elOption.textContent = option;
        
        elAuthorFrag.appendChild(elOption);
    });
    
    elAuthor.appendChild(elAuthorFrag);
};

renderAuthor(books);

// ============ Language Sort =====================

const elLang = [];
function renderLanguage(lang){
    
    
    lang.forEach(langItem => {
        langItem.language.split(",").forEach(langList => {
            if(!elLang.includes(langList)){
                elLang.push(langList);
            };
        });
    });
    
    elLang.sort()
    
    const elLangFrag = new DocumentFragment();
    
    elLang.forEach(option => {
        
        const elOption = document.createElement("option");
        
        elOption.value = option;
        elOption.textContent = option;
        elLangFrag.appendChild(elOption);
    });
    
    elLanguage.appendChild(elLangFrag);
};

renderLanguage(books);


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


// Bookmarm function 

function addBookmark(arr , node) {
    
    elBookmarkList.innerHTML = ""
    
    const elTemp = document.querySelector(".book__tempate").content;
    const elFragment = document.createDocumentFragment();
    
    arr.forEach(book => {
        
        const elClone = elTemp.cloneNode(true);
        
        elClone.querySelector(".book__img-js").src = book.imageLink;
        elClone.querySelector(".book__title").textContent = book.title;    
        elClone.querySelector(".book__author").textContent = book.author;
        elClone.querySelector(".book__year").textContent = book.year;
        elClone.querySelector(".book__pages").textContent = book.pages;
        elClone.querySelector(".book__language").textContent = book.language;        
        elClone.querySelector(".book__link").href = book.link;
        elClone.querySelector(".close__book").classList.add("bg-danger")    
        elClone.querySelector(".book__btn").classList.add("d-none");
        elClone.querySelector(".close__btn").dataset.bookmarkDelete = book.pages;
        elClone.querySelector(".close__btn").classList.remove("d-none");
        
        elFragment.appendChild(elClone);
    });
    
    node.appendChild(elFragment);
    
}


// Bookmark start Event Delegation

elList.addEventListener("click" , evt => {
    
    if(evt.target.matches(".book__btn")){
        
        const addBookmarkId = Number(evt.target.dataset.bookmarkId);
        const addBookmarkFind = books.find(item => item.pages == addBookmarkId);

        const addColor = evt.target;
        addColor.classList.add("favorited");

        if(!booksArr.includes(addBookmarkFind)) {
            
            booksArr.push(addBookmarkFind);
            
            console.log(booksArr);
            addBookmark(booksArr , elBookmarkList)
        }
        
    }
    
});

elBookmarkList.addEventListener("click" , evt => {
    
    if(evt.target.matches(".close__btn")) {
        
        const deletId = evt.target.dataset.bookmarkDelete;
        const deletBookmark = booksArr.findIndex(item => item.pages == deletId);
        
        booksArr.splice(deletBookmark , 1);

        
        addBookmark(booksArr , elBookmarkList)
        
        const addColor = document.querySelector(".favorited");
        addColor.classList.remove("favorited")
    }
    
})



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
