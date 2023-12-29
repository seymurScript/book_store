import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// const books = ref(db, "books")

// const searchBook = document.getElementById("searchBook");
// const searcBtn = document.getElementById("searchBtn");

// // document.addEventListener("DOMContentLoaded", function(){
// //     const carouselInner = document.querySelector(".carousel-inner");
// //     const bookCarouselItem = `
// //     <div class="carousel-item" data-bs-interval="8000000">
// //       <div
// //         class="carouselBox d-flex justify-content-around align-items-center gap-4"
// //       >
// //         <img src="../assets/images/book_1.svg" alt="" />
// //         <div class="book-about">
// //           <h2 class="book-name">The name of the book</h2>
// //           <h4 class="book-writer">Book Writer</h4>
// //           <p class="about-the-book">
// //             Lorem ipsum dolor sit amet consectetur adipisicing elit.
// //             Vel officiis aspernatur iste inventore. Dolore tempora
// //             enim nobis distinctio ratione dignissimos ducimus
// //             aspernatur inventore sit architecto vero suscipit cumque
// //             delectus ea reiciendis voluptates velit, eligendi nisi!
// //             Libero quae perspiciatis ab eius.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //     <div class="carousel-item" data-bs-interval="8000">
// //     <div
// //       class="carouselBox d-flex justify-content-around align-items-center gap-4"
// //     >
// //       <img src="../assets/images/book_2.svg" alt="" />
// //       <div class="book-about">
// //         <h2 class="book-name">The name of the book</h2>
// //         <h4 class="book-writer">Book Writer</h4>
// //         <p class="about-the-book">
// //           Lorem ipsum dolor sit amet consectetur adipisicing elit.
// //           Vel officiis aspernatur iste inventore. Dolore tempora
// //           enim nobis distinctio ratione dignissimos ducimus
// //           aspernatur inventore sit architecto vero suscipit cumque
// //           delectus ea reiciendis voluptates velit, eligendi nisi!
// //           Libero quae perspiciatis ab eius.
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// //   <div class="carousel-item active" data-bs-interval="8000">
// //                   <div
// //                     class="carouselBox d-flex justify-content-around align-items-center gap-4"
// //                   >
// //                     <img src="../assets/images/book_3.svg" alt="" />
// //                     <div class="book-about">
// //                       <h2 class="book-name">The name of the book</h2>
// //                       <h4 class="book-writer">Book Writer</h4>
// //                       <p class="about-the-book">
// //                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
// //                         Vel officiis aspernatur iste inventore. Dolore tempora
// //                         enim nobis distinctio ratione dignissimos ducimus
// //                         aspernatur inventore sit architecto vero suscipit cumque
// //                         delectus ea reiciendis voluptates velit, eligendi nisi!
// //                         Libero quae perspiciatis ab eius.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// // `;
// //     carouselInner.innerHTML += bookCarouselItem;
// //     // console.log(carouselInner);
// // })

// const searchInput = document.getElementById("searchBook");
// const searchBtn = document.getElementById("searchBtn");
// let bookArr;
// searchBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     filterBook(searchInput.value);
// });

// const filterBook = (name) => {
//     console.log(name);
//     onValue(books, (snapshot) => {
//         const bookData = snapshot?.val();
//          bookArr = Object.entries(bookData);
//         console.log(bookArr);
//     })
//     // let resultArr = bookArr.filter((item)=>{
//     //     return item[1].title.toLowerCase().includes(name.toLowerCase());
//     // });
// }

// Assuming you have already initialized Firebase and have the 'books' reference
const booksRef = ref(db, "books");

// Assuming you have your carousel and other elements correctly defined in the HTML
const carouselInner = document.querySelector(".carousel-inner");
const searchInput = document.getElementById("searchBook");
const searchBtn = document.getElementById("searchBtn");

const carouselBtn = document.querySelector(".carouselBtn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  filterBook(searchInput.value);
});


const filterBook = (name) => {
    onValue(booksRef, (snapshot) => {
      const bookData = snapshot.val();
      const bookArr = Object.entries(bookData);
  
      const resultArr = bookArr.filter((item) => {
        return item[1].title.toLowerCase().includes(name.toLowerCase());
      });
  
      // Mevcut uyarı mesajını kontrol et
      const existingMessage = carouselInner.querySelector(".alert-warning");
  
      // Eğer kitap adı boş değilse ve sonuç bulunamadıysa
      if (name.trim() !== "" && resultArr.length === 0) {
        if (!existingMessage) {
          // Eğer mevcut uyarı mesajı yoksa, yeni bir tane oluştur ve ekleyin
          const messageContainer = document.createElement("marquee");
          messageContainer.classList.add("alert");
          messageContainer.classList.add("alert-warning");
          messageContainer.classList.add("mb-3");
          messageContainer.innerHTML = "No book title found";
          carouselInner.appendChild(messageContainer);
        } else {
          // Eğer mevcut uyarı mesajı varsa, içeriğini değiştirin
          existingMessage.innerHTML = "No book title found";
        }
      } else if (name.trim() === "") {
        if (!existingMessage) {
          // Eğer mevcut uyarı mesajı yoksa, yeni bir tane oluştur ve ekleyin
          const messageContainer = document.createElement("marquee");
          messageContainer.classList.add("alert");
          messageContainer.classList.add("alert-warning");
          messageContainer.classList.add("mb-3");
          messageContainer.innerHTML = "Please enter a book title";
          carouselInner.appendChild(messageContainer);
        } else {
          // Eğer mevcut uyarı mesajı varsa, içeriğini değiştirin
          existingMessage.innerHTML = "Please enter a book title";
        }
      }
  
      // Eğer kitap adı boş değilse ve sonuç bulunduysa
      if (name.trim() !== "" && resultArr.length > 0) {
        displayResults(resultArr);
      }
    });
  };
  

// const filterBook = (name) => {
//     onValue(booksRef, (snapshot) => {
//       const bookData = snapshot.val();
//       const bookArr = Object.entries(bookData);
  
//       const resultArr = bookArr.filter((item) => {
//         return item[1].title.toLowerCase().includes(name.toLowerCase());
//       });
  
//       // Mevcut uyarı mesajını kontrol et
//       const existingMessage = carouselInner.querySelector(".alert-warning");
  
//       // Eğer kitap adı boş değilse ve sonuç bulunamadıysa
//       if (name.trim() !== "" && resultArr.length === 0) {
//         if (!existingMessage) {
//           // Eğer mevcut uyarı mesajı yoksa, yeni bir tane oluştur ve ekleyin
//           const messageContainer = document.createElement("marquee");
//           messageContainer.classList.add("alert");
//           messageContainer.classList.add("alert-warning");
//           messageContainer.classList.add("mb-3");
//           messageContainer.innerHTML = "No book title found";
//           carouselInner.appendChild(messageContainer);
//         }
//       } else if(name.trim() === "") {
//         // Eğer mevcut uyarı mesajı varsa, kaldır
//         if (!existingMessage) {
//             // Eğer mevcut uyarı mesajı yoksa, yeni bir tane oluştur ve ekleyin
//             const messageContainer = document.createElement("marquee");
//             messageContainer.classList.add("alert");
//             messageContainer.classList.add("alert-warning");
//             messageContainer.classList.add("mb-3");
//             messageContainer.innerHTML = "Please enter a book title";
//             carouselInner.appendChild(messageContainer);
//           }else {
//             // Eğer mevcut uyarı mesajı varsa, içeriğini değiştirin
//             existingMessage.innerHTML = "No book title found";
//             carouselInner.appendChild(messageContainer);

//           }
//       }
  
//       // Eğer kitap adı boş değilse ve sonuç bulunduysa
//       if (name.trim() !== "" && resultArr.length > 0) {
//         displayResults(resultArr);
//       }
//     });
//   };
  

// const filterBook = (name) => {
//   onValue(booksRef, (snapshot) => {
//     const bookData = snapshot.val();
//     const bookArr = Object.entries(bookData);

//     const resultArr = bookArr.filter((item) => {
//       return item[1].title.toLowerCase().includes(name.toLowerCase());
//     });
//     if (name.trim() !== "") {
//       displayResults(resultArr);
//     }else if(name.trim() !== "" && resultArr.length === 0){
//         const existingMessage = carouselInner.querySelector(".alert-warning");

//         if (!existingMessage) {
//           // Eğer mevcut uyarı mesajı yoksa, yeni bir tane oluştur ve ekleyin
//           const messageContainer = document.createElement("div");
//           messageContainer.classList.add("alert");
//           messageContainer.classList.add("alert-warning");
//           messageContainer.classList.add("mb-3");
//           messageContainer.innerHTML = "no book title";
//           carouselInner.appendChild(messageContainer);
//         }
//     }
//      else {
//     //   const falseBookName = document.createElement("div");
//     //   falseBookName.classList.add("bg-light");
//     //   falseBookName.classList.add("p-2");
//     //   falseBookName.classList.add("fw-bold");
//     //   falseBookName.classList.add("text-danger");
//     //   falseBookName.innerHTML = `<marquee>Add a book title</marquee>`;
//     //   carouselInner.appendChild(falseBookName);
//     const existingMessage = carouselInner.querySelector(".alert-warning");

//     if (!existingMessage) {
//       // Eğer mevcut uyarı mesajı yoksa, yeni bir tane oluştur ve ekleyin
//       const messageContainer = document.createElement("div");
//       messageContainer.classList.add("alert");
//       messageContainer.classList.add("alert-warning");
//       messageContainer.classList.add("mb-3");
//       messageContainer.innerHTML = "Please enter a book title";
//       carouselInner.appendChild(messageContainer);
//     }
//     }
//   });
// };

const displayResults = (results) => {
  carouselInner.innerHTML = "";
  results.forEach((item) => {
    const book = item[1];
    const bookElement = document.createElement("div");
    bookElement.classList.add("carousel-item");
    bookElement.classList.add("d-bloc");

    bookElement.innerHTML = `
      <div class="carouselBox d-flex justify-content-around align-items-center gap-4">
        <img src="${book.bookImage}" alt="${book.title}" />
        <div class="book-about">
          <h2 class="book-name">${book.title}</h2>
          <h4 class="book-writer">${book.author}</h4>
          <p class="about-the-book">${book.description}</p>
        </div>
      </div>
    `;
    carouselInner.appendChild(bookElement);
    console.log(carouselInner.children.length);
  });

  if (results.length > 0) {
    carouselInner.firstElementChild.classList.add("active");
    // console.log(results);
  }
  if (carouselInner.children.length === 1) {
    carouselBtn.classList.add("d-none");
  } else {
    carouselBtn.classList.remove("d-none");
  }
};
