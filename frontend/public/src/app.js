// *此檔案是babel 、 webpack 進入點
//引入
// import {
//     checkLogin
// } from "./api.js";



// 啟動前端時 看看攜帶的 JWT 是不是合法的
checkLogin()
    .then((res) => {
        // console.log(res);
        if (res.result == "1" && res.data.fName) {
            // let show = `<div>${res.data.fName}<br/>歡迎</div>`;
            let show = `
            <div class="navbar_my_photo_border">
                <img id="navbar_my_photo" class="navbar_my_photo" src="${serverURL.root}/${res.data.fPhotoPath}" >
            </div>
            `;
            document.querySelector("#header_link_login").innerHTML = show;
            document.querySelector('.navebar_msg_icons').classList.remove("hide");

            window.localStorage.setItem("Cycle link token", res.token);
            window.localStorage.setItem("Cycle link user data", res.data.fName);
            window.localStorage.setItem("Cycle link user id", res.data.fId);
        } else {
            window.localStorage.removeItem("Cycle link token")
            window.localStorage.removeItem("Cycle link user data");
            window.localStorage.removeItem("Cycle link user id");

        }
    })
    .catch((err) => {
        window.localStorage.removeItem("Cycle link token")
        window.localStorage.removeItem("Cycle link user data");
        window.localStorage.removeItem("Cycle link user id");

        console.error(err)
    });



const logg = async () => {
    let response = await fetch('http://localhost:3050/login', {
        method: "POST"
    });
    let result = await response.json();
    // console.group("JWT")
    // console.log(result);
    // console.log(result.data.token);

    let response2 = await fetch('http://localhost:3050/protected', {
        headers: {
            "Authorization": result.data.token
        }
    })
    let result2 = await response2.text();
    // console.error(result2);
    // console.groupEnd("JWT")

}
// logg();