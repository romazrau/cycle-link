var { sendEmail } = require("./module");

// sendEmail('adoro0920@gmail.com', 'node js title', '<h2>測試</h2><p>這是一封測式信</p>');


const random10 = (lun) =>{
    let result = "";
    while(result.length < lun){
        let random = Math.floor(Math.random() *10)
        result += random ;
    }
    return result
}

let authKey = random10(6);
let msg = `<h2>歡迎加入 Cycle Link</h2>
            <p>
                你的註冊驗證碼為: ${authKey}
            </p>`

console.log(authKey);
sendEmail('adoro0920@gmail.com', 'Cycle Link 註冊通知', msg);