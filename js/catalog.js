const readMoreBtns=document.querySelectorAll('.readBtn');
const catalogStage=document.querySelector('.catalogMain');
const readPageStage= document.querySelector('.readPage')
const backBtn=document.querySelector('.backBtn')



// readMoreBtns.addEventListener('click',closeFirstSection)
backBtn.addEventListener('click',closeSecondSection)


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