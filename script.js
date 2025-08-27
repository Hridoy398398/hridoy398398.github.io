const jsonURL = "https://script.google.com/macros/s/AKfycby7ZiIkC6HtszPSh2H8z_JDJ6OYJkFBl6bMBRrNC6CpYVuZ1rkKCfdRIcfYjfZFaP6b/exec";

document.getElementById("searchBtn").addEventListener("click", function() {
    const siteId = document.getElementById("searchBox").value.trim();
    if (!siteId) return alert("Please enter a Site ID");

    fetch(`${jsonURL}?site_id=${encodeURIComponent(siteId)}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            if (data.ok) {
                resultDiv.innerHTML = `
                    <p><strong>Site ID:</strong> ${data.site_id}</p>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Location:</strong> ${data.location}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                `;
            } else {
                resultDiv.innerHTML = `<p>${data.error}</p>`;
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("result").innerHTML = "<p>Failed to fetch data. Check your JSON link.</p>";
        });
});
