let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = (isNaN(parseInt(document.getElementById("inicio").value)))?0:parseInt(document.getElementById("inicio").value)
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "short":
        minCount = parseInt(document.getElementById("descanso").value);
        break;
      default:
        minCount = parseInt(document.getElementById("inicio").value);
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = parseInt(document.getElementById("inicio").value);
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = parseInt(document.getElementById("descanso").value);
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});


pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      
      count--;
      if(count<15){
        cambiaFondo("contenedorxd")
      }
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});

function cambiaFondo(id) {
  let elemento = document.getElementById(id);
    elemento.style.backgroundColor = elemento.style.backgroundColor == "grey" ? "white" : "grey";
}

document.getElementById("inicio").addEventListener("keyup",()=>{
  let numeroInicio=(isNaN(parseInt(document.getElementById("inicio").value)))?0:appendZero(parseInt(document.getElementById("inicio").value))
  time.textContent=`${numeroInicio}:00`
})

