// *此檔案是babel 、 webpack 進入點
//引入
import { checkLogin } from "./api.js";

checkLogin()
    .then((res) => {
        console.log(res);
        if (res.result == "1") {
            let show = `<i class="fas fa-bullhorn login_bullhorn"></i> <div><p>${res.data.fName}</p><p>歡迎</p></div>`;
            document.querySelector("#header_link_login").innerHTML = show;
        }
    })
    .catch(err => console.log(err));



