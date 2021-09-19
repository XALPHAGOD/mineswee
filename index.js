const root = document.getElementById("root");
const row = 16,
  col = 16;
let safe = 0,
  valarr,
  hidden = true;
const colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 123, 0)",
  "rgb(255, 255, 0)",
  "cyan",
  "rgb(0, 255, 8)",
];

const addOthers = () => {
  const h1 = document.createElement("h1");
  h1.classList.add("heading");
  h1.innerHTML = "MINESWEE";
  root.appendChild(h1);

  const dialog = document.createElement("div");
  dialog.id = "dialog";
  dialog.classList.add("hide");

  const close = document.createElement("div");
  close.id = "close";
  close.onclick = () => handleClose();
  close.innerHTML = "x";

  const result = document.createElement("div");
  result.id = "result";

  dialog.appendChild(close);
  dialog.appendChild(result);
  root.appendChild(dialog);
};

const initialize = () => {
  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }
  addOthers();
  let newarr = new Array(row);
  let unsafe = 0;
  for (let i = 0; i < row; i++) {
    newarr[i] = new Array(col);
    for (let j = 0; j < col; j++) {
      newarr[i][j] = Math.floor(Math.random() * 10) % 10;
      if (newarr[i][j] == 0) unsafe++;
    }
  }
  safe = row * col - unsafe;
  const container = document.createElement("div");
  container.classList.add("container");

  for (let i = 0; i < row; i++) {
    const cr = document.createElement("div");
    cr.classList.add("row");
    for (let j = 0; j < col; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("row", JSON.stringify(i));
      cell.setAttribute("col", JSON.stringify(j));
      cell.setAttribute("val", JSON.stringify(newarr[i][j]));
      cr.appendChild(cell);
    }
    container.appendChild(cr);
  }
  root.appendChild(container);
  valarr = newarr;
};

const modifyCell = (target, cr, cc) => {
  safe--;
  let pr = row * 2,
    nr = row * 2,
    pc = row * 2,
    nc = row * 2;
  for (let i = cr - 1; i >= 0; i--)
    if (valarr[i][cc] == 0) {
      pr = cr - i;
      break;
    }
  for (let i = cr + 1; i < row; i++)
    if (valarr[i][cc] == 0) {
      nr = i - cr;
      break;
    }
  for (let i = cc - 1; i >= 0; i--)
    if (valarr[cr][i] == 0) {
      pc = cc - i;
      break;
    }
  for (let i = cc + 1; i < col; i++)
    if (valarr[cr][i] == 0) {
      nc = i - cc;
      break;
    }
  const nb = Math.min(Math.min(pr, nr), Math.min(pc, nc)) - 1;
  if (nb > 3) target.style.backgroundColor = colors[4];
  else target.style.backgroundColor = colors[nb];
  if (safe === 0) showRes("YOU WIN", "win");
};

initialize();

root.addEventListener("click", (evt) => {
  const target = evt.target;
  const selectedCell = target.attributes;
  const isCell = selectedCell[0].value === "cell";
  if (isCell) {
    const cr = parseInt(selectedCell[1].value);
    const cc = parseInt(selectedCell[2].value);
    const cv = parseInt(selectedCell[3].value);
    if (cv === 0) {
      target.innerHTML = "💣";
      target.style.backgroundColor = "white";
      showRes("YOU LOSE", "lose");
    } else {
      modifyCell(target, cr, cc);
    }
  }
  evt.stopPropagation();
});

const showRes = (msg, resStyle) => {
  hidden = !hidden;
  result.innerHTML = msg;
  dialog.classList.remove("win");
  dialog.classList.remove("lose");
  dialog.classList.remove("hide");
  dialog.classList.add(resStyle);
};

const handleClose = () => {
  if (!hidden) dialog.classList.add("hide");
  hidden = !hidden;
  initialize();
};
