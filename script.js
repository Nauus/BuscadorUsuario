document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("results");

    searchButton.addEventListener("click", async () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === "") {
            alert("Por favor, ingrese un término de búsqueda.");
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
            if (!response.ok) {
                throw new Error("No se pudieron cargar los datos de los usuarios.");
            }
            const users = await response.json();

            const filtrosUsuarios = users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm)
            );

            if (filtrosUsuarios.length === 0) {
                resultsContainer.innerHTML = "<p>No se encontraron usuarios.</p>";
            } else {
                resultsContainer.innerHTML = "";
                filtrosUsuarios.forEach((user) => {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user");
                    userDiv.innerHTML = `
                        <h3>${user.name}</h3>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Empresa:</strong> ${user.company.name}</p>
                        <!-- Agregar más información aquí si es necesario -->
                    `;
                    resultsContainer.appendChild(userDiv);
                });
            }
        } catch (error) {
            console.error("Error:", error);
            resultsContainer.innerHTML = "<p>Ocurrió un error al cargar los usuarios.</p>";
        }
    });
});

