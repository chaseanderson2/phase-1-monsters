document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const monsterForm = document.getElementById("monster-form");
    const loadMoreBtn = document.getElementById("load-more-btn");
  
    let currentPage = 1;
  
    monsterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
      createMonster(name, age, description);
    });
  
    loadMoreBtn.addEventListener("click", () => {
      currentPage++;
      loadMonsters(currentPage);
    });
  
    loadMonsters(currentPage);
  
    function loadMonsters(page) {
      const limit = 50;
      const url = `http://localhost:3000/monsters?_limit=${limit}&_page=${page}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          displayMonsters(data);
        })
        .catch(error => console.log(error));
    }
  
    function displayMonsters(monsters) {
      monsters.forEach(monster => {
        const monsterDiv = document.createElement("div");
        monsterDiv.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterDiv);
      });
    }
  
    function createMonster(name, age, description) {
      const url = "http://localhost:3000/monsters";
      const monster = {
        name: name,
        age: parseFloat(age),
        description: description
      };
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monster)
      })
        .then(response => response.json())
        .then(data => {
          const monsterDiv = document.createElement("div");
          monsterDiv.innerHTML = `
            <h3>${data.name}</h3>
            <p>Age: ${data.age}</p>
            <p>${data.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
          monsterForm.reset();
        })
        .catch(error => console.log(error));
    }
  });