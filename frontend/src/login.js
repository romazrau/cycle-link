function ClsLogin() {
    // import { serverURL } from "./api.js";


    document.querySelector("#loginSubmit").onclick =
        async (e) => {
            e.preventDefault();
            // console.log(e);
            let form = document.querySelector("#form_signIn"); // 抓登入 form element
            let formData = new FormData(form); // 打包成 FormData

            try {
                let resopne = await fetch(serverURL.login, {
                    method: "POST", // POST
                    body: formData, // *攜帶的 FormData
                    cache: 'no-cache',
                    credentials: 'include',
                    mode: 'cors',
                    referrer: "client",
                })

                let result = await resopne.json() // 解析回傳的物件

                console.log(result);
                if (result.result == "1") {
                    // let show = `<div>${result.data.fName}<br/>歡迎</div>`;
                    // document.querySelector("#header_link_login").innerHTML = show;
                    // document.querySelector('.navebar_msg_icons').classList.remove("hide");
                    // location.hash = "#personal-maneger";

                    window.localStorage.setItem("Cycle link token", result.token); // *存前端來的 JWT 進 localStorage 裡
                    window.localStorage.setItem("Cycle link user data", result.data.fName);
                    window.localStorage.setItem("Cycle link user id", result.data.fId);


                    location.reload();
                } else {
                    alert(result.msg);
                }
            } catch (ex) {
                console.log(ex);
            }
        }








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
        })
    }
    document.querySelector(".Login_answerBtn").addEventListener("click", () => {


        if (JSON.stringify(count) !== JSON.stringify(answer)) {
            window.alert("錯誤");

        } else {

            document.querySelector(".Login_checkviewcontainer").style.display = "none";
            document.querySelector(".Login_backgroundview").style.display = "none";
            document.querySelector(".Login_CheckBox").innerHTML = `<i class="fas fa-check"></i>`;
        }

    })



    document.querySelector(".Login_CheckContainer a").addEventListener("click", (e) => {
        e.preventDefault();
    })


    document.getElementById("Login_CheckBox").addEventListener("click", (e) => {
        document.querySelector(".Login_checkviewcontainer").style.display = "block";
        document.querySelector(".Login_backgroundview").style.display = "block";
    })
    // document.querySelector(".Login_CloseLink").addEventListener("click", (e) => {
    //     e.preventDefault();
    //     document.querySelector(".Login_checkviewcontainer").style.display = "none";
    //     document.querySelector(".Login_backgroundview").style.display = "none";
    // })


    /*忘記密碼彈框 */
    var Forgotpasswordwindow = document.getElementById('forgot-password-modal');

    var spanforclose = document.querySelector('.forgot-password-close');
    spanforclose.onclick = function () {
        Forgotpasswordwindow.classList.add("hide");
    }

    /*其他地方點擊 */
    window.addEventListener("click", function (event) {
        if (event.target == Forgotpasswordwindow) {
            Forgotpasswordwindow.classList.add("hide");
        }
    })

    document.querySelector("#forgot-password").addEventListener("click", function (e) {
        e.preventDefault();
        Forgotpasswordwindow.classList.remove("hide");
    })

    // 忘記密碼 驗證
    document.querySelector("#forgot-password-submit").onclick = async (e) => {
        e.preventDefault();

        let account = document.querySelector("#login_input_account").value;
        let mail = document.querySelector("#login_input_mail").value;

        if (!account || !mail) {
            alert("請輸入資料");
            return;
        }

        let form = document.querySelector("#forgot-password-form");
        let formData = new FormData(form);

        let res = await fetch(serverURL.forgetPassword, {
            method: "POST",
            body: formData
        })

        if (!res.ok) {
            alert("連線錯誤");
            return;
        }

        try {
            let result = await res.json();
            alert(result.msg);
            if (result.result) {
                Forgotpasswordwindow.classList.add("hide");
                document.querySelector("#login_input_account").value = "";
                document.querySelector("#login_input_mail").value = "";
            }
            return;

        } catch (ex) {
            alert("回傳錯誤");
            return;
        }
    }


}
const Login = new ClsLogin();