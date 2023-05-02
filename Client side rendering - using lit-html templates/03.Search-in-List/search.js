import { towns } from "./towns.js";
import {html, render} from './node_modules/lit-html/lit-html.js'


const townList = document.getElementById('towns');

const townsTemplate = (towns) => html `<ul>
   ${towns.map(town => 
         html `<li id=${town}>${town}</li>`
   )}
</ul>`

const rendering = (towns) => render(townsTemplate(towns), townList);
rendering(towns);

document.querySelector('button').addEventListener('click', search);

const searchText = (input, towns) => {
   console.log(towns);
      return towns.filter(town => {
         if (town.includes(input)) {
            let match = document.getElementById(`${town}`)
            match.setAttribute('class', 'active');
            return town;
         }
      })
}

function search() {
   const input = document.getElementById('searchText').value;
   const output = searchText(input, towns);
   const result = document.querySelector('#result');
   result.textContent = `${output.length} matches found`
   
}

