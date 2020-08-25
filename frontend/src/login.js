import {
    serverURL
} from "./api.js"


document.querySelector("#loginSubmit").addEventListener(
    "click",
    (e) => {
        e.preventDefault();
        // let form = document.querySelector( ".form_signIn" ); 
        // let formData = new FormData(form);

        // fetch( serverURL.login ,{
        //     method: "POST",
        //     body: formData,
        //     credentials: 'include'
        // }).then(
        //     (res) => res.text()
        // ).then(
        //     resStr => {
        //     const resData = JSON.parse(resStr);
        //     console.log(resData);
        //     if(resData.result === "1"){
        //         let show = `${resData.name}<br/>歡迎`;
        //         document.querySelector("#header_link_login").innerHTML = show;
        //     }
        // }

        // ).catch(
        //     err => console.log(err)
        // )


        let show = `<i class="fas fa-bullhorn login_bullhorn"></i> <div><p>哈哈松鼠</p><p>歡迎</p></div>`;
        document.querySelector("#header_link_login").innerHTML = show;
        location.hash = "#personal-maneger";


    }
)