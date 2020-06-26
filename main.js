const siteInput = document.getElementById("siteName");
const urlIput = document.getElementById("siteUrl");
const submitBtn = document.getElementById("submit-btn");
const list = document.getElementById("bookmarksResults");


let dataBomba =
  localStorage.getItem("dataBomba") !== null
    ? JSON.parse(localStorage.getItem("dataBomba"))
    : [];

function setStorage() {
  localStorage.setItem("dataBomba", JSON.stringify(dataBomba));
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (siteInput.value === "" || urlIput.value === "") {
    alert("please fill boxes");
  } else if (!validate(urlIput.value)) {
    alert("url not valid");
  } else {
    const data = {
      name: siteInput.value,
      url: urlIput.value,
      id: genrateId(),
    };

    dataBomba.push(data);

    addDomEl(data);

    setStorage();

    siteInput.value = "";
    urlIput.value = "";
  }
});


function genrateId() {
  return Math.floor(Math.random() * 100000000);
}


function removeData(id) {
  dataBomba = dataBomba.filter((data) => data.id !== id);

  setStorage();

  init();
}



function init() {
  list.innerHTML = "";

  dataBomba.forEach((data) => addDomEl(data));
}
init();



function addDomEl(data) {
  

  let div = document.createElement("div");

  div.innerHTML =
    '<div class="well">' +
    "<h3>" +
    data.name +
    ' <a class="btn btn-default" target="_blank" href="' +
    addhttp(data.url) +
    '">Visit</a> ' +
    `<a onclick="removeData(${data.id})" class="btn btn-danger" href="#">Delete</a>` +
    "</h3>" +
    "</div>";
  list.appendChild(div);
}

function validate(url) {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const regex = new RegExp(expression);

  if (!url.match(regex)) {
    alert("url is not valid");
    return false;
  }
  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
