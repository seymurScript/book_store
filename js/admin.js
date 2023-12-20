
const searchInput= document.querySelector('#searchInput')
const suggBox=document.querySelector('.suggBox')
const searchBtn=document.querySelector('.searchBtn')
const bookName= document.getElementById('book_name')
const authorName= document.getElementById('author_name')
const bookImgUrl=document.getElementById('img_url')
const bookDesc=document.getElementById('description')
const bookType=document.getElementById('book_type')
const publicationYear=document.getElementById('pub_year')
const isNew=document.getElementById('isNew')
searchBtn.addEventListener('click',searchBooks)
console.log(searchInput);
function searchBooks() {
    let inputValue = searchInput.value;
    var apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`;
    if(inputValue.trim()!==''){
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            suggBox.innerHTML=''
            data.items.forEach((item) => {
                const bookTitle = item.volumeInfo.title;
                const bookAuthorName = item.volumeInfo.authors;
                const bookDescription = item.volumeInfo.description;
                const bookYearSTR= item.volumeInfo.publishedDate;
                const bookYear=bookYearSTR.slice(0, 4);
                const bookImgLink= item.volumeInfo.imageLinks.smallThumbnail;
                const bookCategory = item.volumeInfo.categories;
                const suggItem=document.createElement('div');
                
                suggItem.classList.add('suggItem')
                suggItem.style.cursor = "pointer";
                suggItem.innerHTML=
                `
                <img src="../assets/icons/clock.svg" alt="">
                <p class="suggTitle">${bookAuthorName?bookAuthorName:'unknown author'} , ${bookTitle}</p>
                `
                suggBox.appendChild(suggItem)
                suggItem.addEventListener('click',()=>{
                    bookName.value=bookTitle?bookTitle:'';
                    authorName.value=bookAuthorName?bookAuthorName:'';
                    bookDesc.value=bookDescription?bookDescription:'';
                    bookImgUrl.value=bookImgLink?bookImgLink:'';
                    publicationYear.value=bookYear?bookYear:'';
                    bookType.value=bookCategory?bookCategory:'';
                    if (parseInt(publicationYear.value) >= 2020) {
                        console.log(parseInt(publicationYear.value));
                        isNew.disabled = true;
                        isNew.checked = true;
                    } else {
                        console.log(parseInt(publicationYear.value));

                        isNew.disabled = true;
                        isNew.checked = false;
                    }
                })

        })
                    
        })
        .catch(error => console.error('Error:', error));
    }
}