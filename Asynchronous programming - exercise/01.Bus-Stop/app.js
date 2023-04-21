function getInfo() {
    const input = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${input}`
    const stopName = document.getElementById('stopName');
    const stopList = document.getElementById('buses');
    
    async function getResponse () {
        
        stopList.replaceChildren();
        
        try {
            const response = await fetch(url);
            if (response.ok == false || input == '') {
                throw new Error();
            }
        const result = await response.json();
        stopName.textContent = `${result.name}`
        const entries = Object.entries(result.buses);

        for (const el of entries) {
            const li = document.createElement('li');
            li.textContent = `Bus ${el[0]} arrives in ${el[1]} minutes`;
            stopList.appendChild(li);
        }

        } catch (error) {
            stopName.textContent = 'Error'
        }
    }

    getResponse();
}