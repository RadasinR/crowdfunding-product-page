const goal = 100000;
let funds = 89914;
window.onload = ()=> {
  calcFunds();
}

function calcFunds() {
  let fundsString = formatNumber(funds, ','); 
  document.getElementById("funds").innerText = '$' + fundsString;
  let percent = (funds / goal) * 100;
  document.getElementById("srPercent").innerText = percent + '%';
  let bar = document.querySelector(".bar");
  bar.style.width = percent + '%';
}

function formatNumber(number, sep) {
  let parts = [];
  let part = number;
  const div = 1000;
 
  while (part >= 1) {
    console.log(part);
    part = part / div - (part % div) / div;
    console.log(part);
    if( part >= 1) {
      parts.push(part);
    }
  }
  part = number % div;
  if (part > 0) {
    parts.push(part);
  }
  console.log(parts);
  if(parts.lenght === 0) {
    return number.toString();
  }
  
  let str = parts[0]; 
  for(let p of parts.slice(1, parts.length)) {
    str += ',' + p; 
  }

  return str;
}

let closed = true;
function showMenu() {
  let menu = document.getElementById("menu");
  menu.classList.toggle("closed");
  console.log(menu);
  document.querySelector(".darken").classList.toggle("hidden");
  let img = document.getElementById("menuImg");
  if (closed) {
    img.src = "./images/icon-close-menu.svg";
    closed = false;
  } else {
    img.src = "./images/icon-hamburger.svg";
    closed = true;
  }
}

function bookmarkPage(btn) {
  btn.classList.add("btn--bookmarked");
  document.querySelector(".img__bookmark").src = "/images/icon-bookmarked.svg";
}

function showInput(btn) {
  let cont = document.getElementById("pledge" + btn.value);
  let pledge__input = document.getElementById(btn.value);

  let checkmarks = document.querySelectorAll("input[type='checkbox']");
  for (let mark of checkmarks) {
    if (mark.id === btn.id) {
      continue;
    }
    if (mark.checked === false) {
      continue;
    }
    mark.checked = false;
    document.getElementById("pledge" + mark.value).classList.remove("border--cyan");
    document.getElementById(mark.value).classList.add("hidden");
  }

  if (btn.checked) {
    pledge__input.classList.remove("hidden");
    cont.classList.add("border--cyan");
  } else {
    pledge__input.classList.add("hidden");
    cont.classList.remove("border--cyan");
  }
}

function openModal() {
  let modal = document.getElementById("modal");
  modal.showModal();
}
function closeModal() {
  let modal = document.getElementById("modal");
  modal.close();
}


function done(id) {
  closeModal();
  funds += Number(document.getElementById(id).value);
  console.log(funds)
  let modal = document.getElementById("completed");
  modal.showModal();
}

function notified() {
  let modal = document.getElementById("completed");
  calcFunds();
  modal.close();
}

function pledge(id) {
  openModal();
  let checkbox = document.getElementById(id);
  checkbox.checked = true;
  showInput(checkbox);
  
}