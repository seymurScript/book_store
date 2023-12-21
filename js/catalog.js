const readMoreBtns=document.querySelectorAll('.readBtn');
const catalogStage=document.querySelector('.catalogMain');
const readPageStage= document.querySelector('.readPage')
const backBtn=document.querySelector('.backBtn')
const commitInput=document.querySelector('.commit-input')
const sendBtn=document.querySelector('.sendBtn')
var commitAPI=`https://blog-api-t6u0.onrender.com/posts`
var currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
// readMoreBtns.addEventListener('click',closeFirstSection)
backBtn.addEventListener('click',closeSecondSection)
sendBtn.addEventListener('click',sendCommit)
var commitData={
    title:'salam',
    body:'sakamnfdsf'
}
function closeFirstSection(){
    catalogStage.style.display='none'
    readPageStage.style.display='block'
}
function closeSecondSection(){
    readPageStage.style.display='none'
    catalogStage.style.display='block'
}
readMoreBtns.forEach(function(button) {
    button.addEventListener('click', closeFirstSection);
  });
// function sendCommit(){
//     if(commitInput.value.trim()!==''){
//         fetch(commitAPI, {
//             // method: 'DELETE',
//             // body: commitData
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//     }
// }