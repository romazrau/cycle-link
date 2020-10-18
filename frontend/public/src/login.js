function ClsLogin() {
    // import { serverURL } from "./api.js";


    document.querySelector("#loginSubmit").onclick =
        async (e) => {
            e.preventDefault();
            if(!document.querySelector(".Login_CheckBox").innerHTML)
            {
                alert("未進行認證!!!!")
                return;
            }else{
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

    }


    document.querySelector('#signup-submit').addEventListener("click", async (e) => {
        e.preventDefault();

        let emailValue = document.querySelector("#form_signup > input[type='email']").value;
        let accountValue = document.querySelector("#form_signup > input[type='text']").value;
        let passwordValue = document.querySelector("#form_signup > input[type='password']").value;

        if(!(emailValue && accountValue && passwordValue)){
            alert("尚有欄位空白");
            return;
        }

        let emailCheck = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/.test(emailValue);
        let accountCheck = /^(?=.*[A-Za-z]).{4,16}$/.test(accountValue);
        let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d).{8,24}$/.test(passwordValue);

        if(!emailCheck){
            alert("信箱格式錯誤");
            return;
        }

        if(!accountCheck){
            alert("帳號須為4~16個字，且包含英文字母");
            return;
        }

        if(!passwordCheck){
            alert("密碼須為8~24個字，且包含英文字母與數字");
            return;
        }
        
        let isCkeck = await JSAlert.confirm("確定要送出嗎?", "Cycle Link");
        if(!isCkeck) return;

        let form = document.querySelector("#form_signup");
        let formData = new FormData(form);

        formData.append("fName", '環境小鬥士');
        formData.append('fBirthdate', '1996/01/01');
        formData.append('fAddress', '地球村');
        formData.append('fCity', '台北市');
        formData.append('fCeilphoneNumber', '0900000000');
        formData.append('fIntroduction', '你好！');

        let response = await fetch(serverURL.signup, {
            method: "POST",
            body: formData,
            credentials: 'include'  
        });

        if(!response.ok){
            alert("請求失敗");
            return;
        }

        let result = await response.json();
        console.log(result);
        await alert(result.msg);
        if(!result.result) return;


        let signupModel =  document.querySelector('#sign-up-auth-modal');
        signupModel.classList.remove('hide');

        document.querySelector('#sign-up-auth-submit').addEventListener("click", async (e) => {
            e.preventDefault();

            let codeValue = document.querySelector('#input-sign-up-auth-code').value;
            if(!codeValue) return;
            if(codeValue.length != 6){
                alert("驗證碼為六個數字");
                return;
            }

            let res = await fetch(serverURL.signup + codeValue, {
                credentials: 'include'  
            });
            if(!res.ok){
                alert("請求失敗");
                return;
            }

            let req = await res.json();
            await alert(req.msg);
            if(!req.result) return;

            console.log(req);

            window.localStorage.setItem("Cycle link token", req.token);
            window.localStorage.setItem("Cycle link user data", req.data.fName);
            window.localStorage.setItem("Cycle link user id", req.data.fId);
            
            location.reload();
        })


        
    });





    const signUpButton = document.getElementById('Login_signUp');
    const signInButton = document.getElementById('Login_signIn');
    const container = document.getElementById('Login_container');

    signUpButton.addEventListener('click', () =>
        container.classList.add('Login_right-panel-active'));

    signInButton.addEventListener('click', () =>
        container.classList.remove('Login_right-panel-active'));






    /***********---------機器人----------------- ****/
    const SetcheckData=[
        {
            answer:[0, 1, 1, 1, 1, 1, 0, 0, 0]
        },
        {
            answer:[0, 0, 1, 0, 0, 1, 0, 0, 0]
        },
        {
            answer:[1, 0, 0, 1, 0, 0, 0, 0, 0]
        }
    ]
    let index=Math.floor(Math.random()*3)
    
    // document.querySelector(".Login_CheckBox_Link").addEventListener("click",function(e){
    //     e.preventDefault();
    // })


    const checkBox = document.getElementById('Login_CheckBox');
    const answer = SetcheckData[index];
    
    var checkimgs = document.querySelectorAll(".Login_checkimgbox img");
    var checkimgsbox = document.querySelectorAll(".Login_checkimgbox");
    var check_useranswer = [0, 0, 0, 0, 0, 0, 0, 0, 0];



    for (let i = 0; i < checkimgs.length; i++) {
        checkimgs[i].src = `./img/signin/${index+1}-${i + 1}.jpg`
        //src="./img/1.jpg"
        checkimgs[i].addEventListener("click", () => {

            if (check_useranswer[i] % 2 == 0) {
                console.log(check_useranswer[i]);
                checkimgs[i].style.opacity = 0.5;
                checkimgsbox[i].style.opacity = 0.5;
                check_useranswer[i]++;

            } else {
                console.log(check_useranswer[i]);
                checkimgs[i].style.opacity = 1;
                checkimgsbox[i].style.opacity = 1;
                check_useranswer[i]--;
            }
        })
    }

    document.querySelector(".Login_answerBtn").addEventListener("click", () => {
        if (JSON.stringify(check_useranswer) !== JSON.stringify(answer.answer)) {
            window.alert("錯誤!!!!!");

        } else 
        {
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