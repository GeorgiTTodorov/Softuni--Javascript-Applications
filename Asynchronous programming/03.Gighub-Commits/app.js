function loadCommits() {
  const repo = document.getElementById("repo").value;
  const username = document.getElementById("username").value;

  async function get() {
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    const result = await fetch(url);
    const response = await result.json();
    const commits = document.getElementById("commits");
    commits.replaceChildren();
    try {
      if (!result.ok) {
        throw `${result.status}: ${result.statusText}`;
      }

      const obj = Object.values(response);

      for (const el of obj) {
        const li = document.createElement("li");
        li.innerHTML = `${el.commit.author.name}: ${el.commit.message}`;
        commits.appendChild(li);
      }
    } catch (error) {
      const li = document.createElement("li");
      li.innerHTML = error;
      commits.appendChild(li);
    }
  }
  get();
}
