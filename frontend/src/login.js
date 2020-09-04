import { serverURL } from "./api.js";



document.querySelector("#loginSubmit").addEventListener(
    "click",
    (e) => {
        e.preventDefault();
        console.log(e);
        let form = document.querySelector("#form_signIn");
        let formData = new FormData(form);

        fetch(serverURL.login, {
            method: "POST",
            body: formData,
            credentials: 'include',
            cache: 'no-cache',
            credentials: 'include',
            mode: 'cors',
            referrer: "client",
        }).then(
            (res) => res.text()
        ).then(
            resStr => {
                const resData = JSON.parse(resStr);
                console.log(resData);
                if (resData.result == "1") {
                    let show = `<i class="fas fa-bullhorn login_bullhorn"></i> <div><p>${resData.data.fName}</p><p>歡迎</p></div>`;
                    document.querySelector("#header_link_login").innerHTML = show;
                    location.hash = "#personal-maneger";

                    window.localStorage.setItem("Cycle link token", resData.token);
                }
            }

        ).catch(
            err => console.log(err)
        )


    }
)







const signUpButton = document.getElementById('Login_signUp');
const signInButton = document.getElementById('Login_signIn');
const container = document.getElementById('Login_container');

signUpButton.addEventListener('click', () =>
    container.classList.add('Login_right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('Login_right-panel-active'));






/***********-------------------------- */
const checkBox = document.getElementById('Login_CheckBox');

const answer = [0, 1, 1, 1, 1, 1, 0, 0, 0];
var checkimgs = document.querySelectorAll(".Login_checkimgbox img");
var checkimgsbox = document.querySelectorAll(".Login_checkimgbox");
var count = [0, 0, 0, 0, 0, 0, 0, 0, 0];


for (let i = 0; i < checkimgs.length; i++) {
    checkimgs[i].src = `./img/signin/${i + 1}.jpg`
    //src="./img/1.jpg"
    checkimgs[i].addEventListener("click", () => {

        if (count[i] % 2 == 0) {
            console.log(count[i]);
            checkimgs[i].style.opacity = 0.5;
            checkimgsbox[i].style.opacity = 0.5;
            count[i]++;

        } else {
            console.log(count[i]);
            checkimgs[i].style.opacity = 1;
            checkimgsbox[i].style.opacity = 1;
            count[i]--;
        }
        console.log(count);
    }
    )
}
document.querySelector(".Login_answerBtn").addEventListener("click", () => {


    if (JSON.stringify(count) !== JSON.stringify(answer)) {
        window.alert("錯誤");

    } else {

        document.querySelector(".Login_checkviewcontainer").style.display = "none";
        document.querySelector(".Login_backgroundview").style.display = "none";
        document.querySelector(".Login_CheckBox").innerHTML = 1;
    }

})



document.querySelector(".Login_CheckContainer a").addEventListener("click", (e) => {
    e.preventDefault();
})


document.getElementById("Login_CheckBox").addEventListener("click", (e) => {
    document.querySelector(".Login_checkviewcontainer").style.display = "block";
    document.querySelector(".Login_backgroundview").style.display = "block";
}
)
document.querySelector(".Login_CloseLink").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".Login_checkviewcontainer").style.display = "none";
    document.querySelector(".Login_backgroundview").style.display = "none";
})


