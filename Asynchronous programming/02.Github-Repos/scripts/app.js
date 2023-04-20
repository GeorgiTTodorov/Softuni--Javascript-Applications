function loadRepos() {
  const displayRepos = document.getElementById("repos");
  const input = document.getElementById("username");
  let username = input.value;
  const url = `https://api.github.com/users/${username}/repos`;
  debugger

  fetch(url)
    .then((response) => {
      if (response.ok == false) {
        throw `${response.status}: ${response.statusText}`;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      displayRepos.replaceChildren();
      data.forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${element.html_url}">${element.full_name}</a>`;
        displayRepos.appendChild(li);
      })
    }).catch(error => {
      displayRepos.innerHTML = `<p>${error}</p>`
})
}
