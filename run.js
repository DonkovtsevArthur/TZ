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

//компанент спиннер
const spinner = `<div class="spiner"></div>`;

//компонент формы авторизации
function form(x) {
  app.innerHTML = `<form id="form" class="form" name="athu">
            <span>Авторизация</span>
            <p><input id="login" type="text" value="${x ? x : "Логин"}"></p>
            <p><input id="pass" type="password" placeholder="Пароль"></p>
            <input id="submit" type="button" class="bth" value="Вход">
        </form>`;
}

//компонент header
function header(x) {
  app.innerHTML = `<div>
  <h1>Привет ${x}
    </h1>
  <input id="exit" type="button" class="bth" value="Выйти">
  </div>
  <div class="logout"> <input id="logs" type="button" class="bth athu" value="Авторизация"></div>`;

  const ex = document.getElementById("exit");
  const logs = document.getElementById("logs");
  ex.addEventListener("click", exT);

  function exT() {
    sessionStorage.removeItem("key");
    router();
  }
  logs.addEventListener("click", getLog);
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
//получаем данные  с формы
function getForm() {
  const sub = document.getElementById("submit");
  sub.addEventListener("click", ser);
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
      alert("не верный логин или пароль");
    }
  }
}
