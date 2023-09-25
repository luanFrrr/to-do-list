const INPUT = document.getElementById("input");
const SUBMIT = document.getElementById("submit");
const LIST = document.getElementById("list");
const BADGE = document.getElementsByClassName("badge");
const SORT = document.getElementById("sort");
const LEVEL = document.getElementById("sort-level");
const SELECT = document.getElementById("inputGroupSelect01");
const PCLASSES = [
  "item",
  "flex-fill",
  "text-break",
  "mb-0",
  "fs-5",
  "text-center",
  "border-start",
  "border-2",
];
const LICLASSES = [
  "w-100",
  "list-item",
  "text-center",
  "p-2",
  "bg-light",
  "border-bottom",
  "border-2",
  "d-flex",
  "align-items-center",
  "justify-content-center",
  "position-relative",
];
const CKCLASSES = ["check", "m-2"];
const BTNCLASSES = ["delete", "ms-3", "rounded-3"];
const ICLASSES = ["cross", "fa-solid", "fa-xmark", "link-secondary"];
const LVCLASSES = ["clr-level", "rounded-circle", "m-1", "me-3"];
let num = 0;

console.log(document.body.clientWidth, "largura");
console.log(document.body.clientHeight, "Altura");

let adicionar;
SUBMIT.addEventListener(
  "click",
  (adicionar = function () {
    let level = document.createElement("div");
    let check = document.createElement("input");
    let list = document.createElement("li");
    let itemList = document.createElement("p");
    let btn = document.createElement("button");
    let cross = document.createElement("i");
    let liCount = LIST.querySelectorAll("li");
    let oldValue;

    if (!INPUT.value) {
      INPUT.value = "";
      INPUT.classList.add("new-color");
      INPUT.placeholder = "Tarefa inválida!";
      setTimeout(() => {
        INPUT.classList.remove("new-color");
        INPUT.placeholder = "Digite aqui sua tarefa!";
      }, 2000);
    } else if (SELECT.value === "Nível") {
      oldValue = INPUT.value;
      INPUT.value = "";
      INPUT.classList.add("new-color");
      INPUT.placeholder = "Selecione o nível da tarefa!";
      setTimeout(() => {
        INPUT.classList.remove("new-color");
        INPUT.value = oldValue;
      }, 2000);
    } else {
      num++;
      BADGE[0].innerText = num;

      check.setAttribute("id", `check_${liCount.length + 1}`);
      list.setAttribute("id", `list_${liCount.length + 1}`);
      itemList.setAttribute("id", `item_${liCount.length + 1}`);
      btn.setAttribute("id", `btn_${liCount.length + 1}`);
      check.setAttribute("type", "checkbox");

      switch (SELECT.value) {
        case "1":
          level.style.backgroundColor = "indianred";
          list.setAttribute("value", "1");
          break;
        case "2":
          level.style.backgroundColor = "coral";
          list.setAttribute("value", "2");
          break;
        case "3":
          level.style.backgroundColor = "khaki";
          list.setAttribute("value", "3");
          break;
        case "4":
          level.style.backgroundColor = "palegreen";
          list.setAttribute("value", "4");
          break;
        case "5":
          level.style.backgroundColor = "LightBlue";
          list.setAttribute("value", "5");
          break;
      }

      itemList.innerText = INPUT.value;

      INPUT.value = "";

      list.classList.add(...LICLASSES);
      check.classList.add(...CKCLASSES);
      level.classList.add(...LVCLASSES);
      itemList.classList.add(...PCLASSES);
      btn.classList.add(...BTNCLASSES);
      cross.classList.add(...ICLASSES);

      check.addEventListener("click", (e) => {
        document.getElementById(e.target.id).disabled = true;
      });

      list.appendChild(check);
      list.appendChild(level);
      list.appendChild(itemList);
      btn.appendChild(cross);
      list.appendChild(btn);
      LIST.appendChild(list);

      btn.addEventListener("click", (e) => {
        let elementId = e.target.id.replace("btn_", "list_");
        grupo = document.getElementById(elementId);
        grupo.remove();
        num--;
        BADGE[0].innerText = num;
      });
    }
  })
);

let sortList = (ul) => {
  var ul = document.getElementById(ul);
  Array.from(ul.getElementsByTagName("li"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach((li) => ul.appendChild(li));
};

let sortLevel = (ul) => {
  var ul = document.getElementById(ul);
  Array.from(ul.getElementsByTagName("li"))
    .sort((a, b) => (a.value > b.value ? 1 : -1))
    .forEach((li) => ul.appendChild(li));
};

SORT.addEventListener("click", function () {
  sortList("list");
});

LEVEL.addEventListener("click", function () {
  sortLevel("list");
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    adicionar();
  }
});
