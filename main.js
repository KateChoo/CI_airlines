//1: createElement
//2: reference to the div.main
//3: insert to the DOM
//4: addEvent handler
const form = document.getElementById('registrar');  
const input = form.querySelector('input');
//2: reference to the div.main
const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');  

//1: createElement
const div = document.createElement('div');  //A
//to insert this new div above the UL, we'll need to call insert before
//on the parent of the UL which is the div with the class main 
const filterLabel_a = document.createElement('label'); //B
const filterLabel_b = document.createElement('label');
const filterLabel_c = document.createElement('label');
const filterCheckBox_a = document.createElement('input');  //C
const filterCheckBox_b = document.createElement('input');
const filterCheckBox_c = document.createElement('input');
filterLabel_a.textContent = "顯示認為應該改名的人";  //D
filterLabel_b.textContent = "顯示認為不應該改名的人";
filterLabel_c.textContent = "顯示沒有意見的人";
filterCheckBox_a.type = 'checkbox'; //E
filterCheckBox_b.type = 'checkbox';
filterCheckBox_c.type = 'checkbox';
div.appendChild(filterLabel_a); //F
div.appendChild(filterLabel_b);
div.appendChild(filterLabel_c);
filterLabel_a.appendChild(filterCheckBox_a);  //G
filterLabel_b.appendChild(filterCheckBox_b);
filterLabel_c.appendChild(filterCheckBox_c);

// 3 insert to the DOM
mainDiv.insertBefore(div, ul);
//4
filterLabel_a.addEventListener ('change', (e) => {  //改成ul會全部刪掉
   
    //input is the target of the change event?
    const isChecked = e.target.checked;  //?
    const lis = ul.children; //? was wrong spelling
    if(isChecked){
      for(let i=0; i < lis.length; i+=1){
        let li = lis[i];
        if (li.className === 'responded'){
          li.style.display= ' '; //allow to pick up previous style
        }else {
          li.style.display= 'none';
        }
      }
    }else {
      for(let i=0; i < lis.length; i+=1){
        let li = lis[i];
        li.style.display= ' ';
      }
    }
});


function createLI(text){
  const li = document.createElement('li'); 
  const span = document.createElement('span');   // copy 7
  span.textContent = text;     //8
  li.appendChild(span);       //9
  const label_a = document.createElement('label'); 
  label_a.textContent = '應該'; 
  const label_b = document.createElement('label'); 
  label_b.textContent = '不應該'; 
  const label_c = document.createElement('label'); 
  label_c.textContent = '無意見';
  const checkbox_a = document.createElement('input');   //7
  const checkbox_b = document.createElement('input');
  const checkbox_c = document.createElement('input');
  checkbox_a.type = 'checkbox';  
  checkbox_b.type = 'checkbox';
  checkbox_c.type = 'checkbox';
  label_a.appendChild(checkbox_a); 
  label_b.appendChild(checkbox_b); 
  label_c.appendChild(checkbox_c);
  li.appendChild(label_a);
  li.appendChild(label_b);
  li.appendChild(label_c);
  
  const editButton = document.createElement('button');     //1
  editButton.textContent = '編輯';                         //2
  li.appendChild(editButton);                              //3
  
  const removeButton = document.createElement('button'); 
  removeButton.textContent = '移除';  
  li.appendChild(removeButton);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const text = input.value;  
  input.value = ' ';  
  
  const li = createLI(text);  
  ul.appendChild(li);  
});

ul.addEventListener('change', (e) => {   //how to know which event handler to use, how to know what event object is? console.log(e.target.checked); <= this you can know what it is, such as true/false 
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  
  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = ' ';
  }
});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON'){
    const button = e.target;                        //6
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === '移除'){           //4
      ul.removeChild(li);
    } else if (button.textContent === '編輯'){      //5
      const span = li.firstElementChild;            //10 ??
      const input = document.createElement('input');//11
      input.type = 'text';     // 12replacing text with input element
      input.value = span.textContent;  //15
      li.insertBefore(input, span);    //  13?
      li.removeChild(span);            //  14
      button.textContent = '儲存';     //16
    } else if (button.textContent === '儲存'){       //edit -> save  V
      const input = li.firstElementChild;            //span -> input  X
      const span = document.createElement('span');   //input -> span  X
                                                     // 12  delete
      span.textContent = input.value;                //15* reverse
      li.insertBefore(span, input);                 // 13*?
      li.removeChild(input);                       //  14*
      button.textContent = 'edit';                 //16*
    }
  }
});


