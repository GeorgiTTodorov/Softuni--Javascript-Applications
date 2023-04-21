function solve() {
  const info = document.querySelector("span.info");
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  let nextId;
  let url = `http://localhost:3030/jsonstore/bus/schedule/depot`;

  function depart() {
    async function getInfo() {
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (response.ok == false) {
          throw new Error();
        }

        nextId = result.next;
        info.textContent = `Next stop ${result.name}`;
        arriveBtn.disabled = false;
        departBtn.disabled = true;

      } catch (error) {

        info.textContent = `Error`;
        arriveBtn.disabled = true;
        departBtn.disabled = true;

      }
    }

    getInfo();
  }

  function arrive() {
    async function arriveInfo() {
      try {

        const response = await fetch(url);
        const result = await response.json();

        if (response.ok == false) {
          throw new Error();
        }

        nextId = result.next;
        info.textContent = `Arriving at ${result.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
        url = `http://localhost:3030/jsonstore/bus/schedule/${nextId}`;

      } catch (error) {
        info.textContent = `Error`;
        arriveBtn.disabled = true;
        departBtn.disabled = true;
      }
      
    }
    arriveInfo();
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
