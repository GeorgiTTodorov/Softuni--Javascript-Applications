async function lockedProfile() {
    const main = document.getElementById('main');

    try {
        const url = `http://localhost:3030/jsonstore/advanced/profiles`;
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const data = await response.json();
        main.innerHTML = '';

        let user = 0;
        Object.values(data).forEach(el => {
            user++;
            const profile = document.createElement('div');
            profile.className = 'profile';
            profile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${user}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${user}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${user}Username" value="${el.username}" disabled readonly />
            <div id="user${user}HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${user}Email" value="${el.email}" disabled readonly />
                <label>Age:</label>
                <input type="text" name="user${user}Age" value="${el.age}" disabled readonly />
                </div>
                <button>Show more</button>
                </div>`;
                main.appendChild(profile);

                document.getElementById(`user${user}HiddenFields`).style.display = 'none';
        })

        const buttons = Array.from(document.getElementsByTagName('button'));
        buttons.forEach(el => el.addEventListener('click', showHide));

        function showHide(event) {
            const btn = event.target;
            const userProfile = btn.parentNode;
            const info = userProfile.getElementsByTagName('div')[0];
            const lockStatus = userProfile.querySelector('input[type="radio"]:checked').value;
            
            if (lockStatus === 'unlock') {
                if (btn.textContent === 'Show more') {
                    info.style.display = 'block';
                    btn.textContent = 'Hide it';
                } else if (btn.textContent === 'Hide it'){
                    info.style.display = 'none';
                    btn.textContent = 'Show more';
                }
            }
            
        }

    } catch (error) {
       console.log(error);
    }
}