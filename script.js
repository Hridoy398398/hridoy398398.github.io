const csvURL = "https://script.google.com/macros/s/AKfycbz_t4yybWsq3uBT9vD8RznM-fExI8HTpDo-bXBLbHdtfvkFIF2VTLD_ADn7YjKpPcga/exec";

document.getElementById("searchBtn").addEventListener("click", function() {
    const siteCode = document.getElementById("searchBox").value.trim();
    if(!siteCode) return alert("Enter Site Code");

    fetch(csvURL)
      .then(res => res.text())
      .then(csvText => {
          const rows = csvText.split("\n").filter(r => r.trim() !== "");
          const headers = rows[0].split(",").map(h => h.replace(/"/g,"").trim());
          let found = false;
          for(let i=1;i<rows.length;i++){
              const values = rows[i].split(",").map(v=>v.replace(/"/g,"").trim());
              if(values[0] === siteCode){
                  found = true;
                  let html = '';
                  for(let j=0;j<headers.length;j++){
                      html += `<p><strong>${headers[j]}:</strong> ${values[j]}</p>`;
                  }
                  document.getElementById("result").innerHTML = `<div class="card">${html}</div>`;
                  break;
              }
          }
          if(!found){
              document.getElementById("result").innerHTML = `<div class="card error">Site Code not found</div>`;
          }
      })
      .catch(err => {
          console.error(err);
          document.getElementById("result").innerHTML = `<div class="card error">Failed to fetch CSV</div>`;
      });
});
