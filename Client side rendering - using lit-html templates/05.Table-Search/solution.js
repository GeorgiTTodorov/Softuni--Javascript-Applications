import { requester } from "./requester.js";


function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   

   requester()

   function onClick() {
     
      const input = document.getElementById('searchField');
      const value = input.value;
      
      Array.from(document.querySelectorAll('tr')).map(tr => tr.removeAttribute('class'));


      Array.from(document.querySelectorAll('td')).filter(td => {
         if (td.textContent.toLowerCase().includes(value)) {
               td.parentElement.setAttribute('class', 'select');
               input.value = '';
            } else if (td.textContent.toUpperCase().includes(value)) {
               td.parentElement.setAttribute('class', 'select');
               input.value = '';
            } else if (td.textContent.includes(value)) {
               td.parentElement.setAttribute('class', 'select');
               input.value = '';
            }
        });

   }
}



solve();