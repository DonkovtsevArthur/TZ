// include sass
import "./sass/style.sass";
//База
const user = [
  {
    name: "Arthur",
    password: "1234"
  },
  {
    name: "Max",
    password: "1111"
  },
  {
    name: "Gosh",
    password: "2222"
  }
];

//начало приложения
const app = document.getElementById("app");

//компoнент спиннер
const spinner = `<div class="spiner"></div>`;

//компонент формы авторизации
function form(names) {
  app.innerHTML = `<form id="form" class="form" name="athu">
            <span>Авторизация</span>
            <p><input id="login" type="text" value="${names ? names : "Логин"}"></p>
            <p><input id="pass" type="password" placeholder="Пароль"></p>
            <input id="submit" type="button" class="bth" value="Вход">
        </form>`;
}

//компонент header
function header(names) {
  app.innerHTML = `<div>
  <h1>Привет ${names}
    </h1>
  <input id="exit" type="button" class="bth" value="Выйти">
  </div>
  <div class="logout"> <input id="logs" type="button" class="bth athu" value="Авторизация"></div>`;

  const exitElem = document.getElementById("exit");
  const logsElem = document.getElementById("logs");
  exitElem.addEventListener("click", exT);
  logsElem.addEventListener("click", getLog);

  function exT() {
    sessionStorage.removeItem("key");
    router();
  }
  function getLog() {
    router(0);
  }
}

//вызываем роутер
router();

function router(ses) {
  let http = new XMLHttpRequest();
  if (http) {
    http.open("get", location.href, true);
    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        const sessionLogan = sessionStorage.getItem("key");

        if (sessionLogan === null || ses == false) {
          form(sessionLogan);
          getForm();
        } else {
          header(sessionLogan);
        }
      }
    };
    http.send(null);
  }
  return false;
}
//получаем данные с формы
function getForm() {
  const subElem = document.getElementById("submit");
  subElem.addEventListener("click", ser);
  function ser() {
    let login = document.getElementById("login");
    let pass = document.getElementById("pass");

    if (login.value && pass.value) {
      user.forEach((item, index) => {
        if (
          login.value === user[index].name &&
          pass.value === user[index].password
        ) {
          sessionStorage.setItem("key", login.value);
          fetch()
            .then((app.innerHTML = spinner))
            .then(
              setTimeout(() => {
                header(login.value);
              }, 5000)
            );
        }
      });
    } else {
      alert("Неверный логин или пароль");
    }
  }
}
