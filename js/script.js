function getTime() {
    const time = document.querySelector('.current-time');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    time.innerHTML = minutes < 10 ? `${hours} : ` + 0 + `${minutes}` :`${hours} : ${minutes}`;
}

function init () {
    getTime();
    setInterval(getTime, 1000);
}
init();

const pillsUL = document.querySelector('.pill-list');
const pills = ['비타민D', '비타민C', '오메가3', '마그네슘', '유산균'];
pills.map(a=>{
    const pill = document.createElement('li');
    pill.classList.add('pill-name')
    pill.innerText = a;
    pillsUL.appendChild(pill);
});

let currentView = 4;
const clone = pillsUL;
const firstTxt = pillsUL.firstElementChild;
const firstClone = firstTxt.cloneNode(true);

const rollingTime = setInterval(()=>{
    if (currentView < currentView + 4) {
        pillsUL.style.transform = 'translateY(-' + currentView  + 'rem)';
        pillsUL.style.transition = '1s';
        currentView = currentView + 4;
    } if (currentView === 24) {
        pillsUL.style.height = currentView + 4 + 'rem';
        pillsUL.appendChild(firstClone);
        setTimeout(function(){
            pillsUL.style.transform = 'translateY(0)';
            pillsUL.style.transition = '0s';
            currentView = 0;
        }, 900);
    }
}, 2000)

const pillInput = document.querySelector('#text-input');
const lists = document.querySelector('.lists');

document.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        e.preventDefault();
    }
}, true); 

const btns = document.querySelectorAll('.btn');
btns.forEach(a=>{
    a.addEventListener('click',function(e){
        
            e.preventDefault();
            const listLi = document.createElement('li');
            listLi.classList.add('list'); 
        
            const checkedBtn = document.createElement('div');
            checkedBtn.innerHTML = `<input type="checkbox">`;
            checkedBtn.classList.add('checked-btn');
            listLi.appendChild(checkedBtn);
        
            const newList = document.createElement('p');
            newList.innerText = pillInput.value;
            newList.classList.add('list-name');
            listLi.appendChild(newList);
        
            const eatingTime = document.createElement('p');
            eatingTime.innerText = a.innerText;
            eatingTime.classList.add('list-time');
            listLi.appendChild(eatingTime);
        
            const deleteBtn = document.createElement('p');
            deleteBtn.innerText = '삭제';
            deleteBtn.classList.add('list-delete');
            listLi.appendChild(deleteBtn);
        
            lists.prepend(listLi);
            pillInput.value = '';
        
            const checkBox = checkedBtn.childNodes[0];
            deleteBtn.addEventListener('click', removeList);
            checkBox.addEventListener('click', checkList);
        
            function removeList (e) {
                const item = e.target;
                if (item.classList[0] === 'list-delete') {
                    const list = item.parentElement;
                    list.remove();
                } 
            }

            function checkList (e) {
                const item = e.target;
                const inputCheck = item.parentElement;
                if (inputCheck.classList[0] === 'checked-btn') {
                    const list = inputCheck.parentElement;
                    list.classList.toggle("completed")
                };
            }
    })
})