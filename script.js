const jsonURL = "https://script.google.com/macros/s/AKfycbyqbg6VIsqTqiyM57hWg_sGgkUkk9YNMiI0aEbFzaiwAs4FI1PtQIoZzbxv6QgTaUB7/exec";

document.getElementById("searchBtn").addEventListener("click", function() {
    const siteCode = document.getElementById("searchBox").value.trim();
    if(!siteCode) return alert("Enter a Site Code");

    fetch(`${jsonURL}?site_code=${encodeURIComponent(siteCode)}`)
      .then(res => res.json())
      .then(data => {
          const resultDiv = document.getElementById("result");
          if(data.ok){
              let html = '';
              for(const key in data){
                  if(key !== 'ok'){
                      html += `<p><strong>${key}:</strong> ${data[key]}</p>`;
                  }
              }
              resultDiv.innerHTML = `<div class="card">${html}</div>`;
          } else {
              resultDiv.innerHTML = `<div class="card error">${data.error}</div>`;
          }
      })
      .catch(err => {
          console.error(err);
          document.getElementById("result").innerHTML = `<div class="card error">Failed to fetch data</div>`;
      });
});
