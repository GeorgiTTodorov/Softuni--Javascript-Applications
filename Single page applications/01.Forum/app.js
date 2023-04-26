import { postData, cancelBtn} from "./createPosts.js"
import { loadPosts } from "./home.js";


document.querySelector('.public').addEventListener('click', postData);
document.querySelector('.cancel').addEventListener('click', cancelBtn);
document.querySelector('a').addEventListener('click', loadPosts);

