const jsonURL = "https://script.google.com/macros/s/AKfycbyqbg6VIsqTqiyM57hWg_sGgkUkk9YNMiI0aEbFzaiwAs4FI1PtQIoZzbxv6QgTaUB7/exec";

document.getElementById("searchBtn").addEventListener("click", function() {
    const siteId = document.getElementById("searchBox").value.trim();
    if (!siteId) return alert("Please enter a Site ID");

    fetch(`${jsonURL}?site_id=${encodeURIComponent(siteId)}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            if (data.ok) {
                resultDiv.innerHTML = `
                    <div class="card">
                        <p><strong>Site ID:</strong> ${data.site_id}</p>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Status:</strong> ${data.status}</p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `<div class="card error">${data.error}</div>`;
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("result").innerHTML = "<div class='card error'>Failed to fetch data. Check your JSON link.</div>";
        });
});
