var { sendEmail } = require("./module");

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


const sendSafyCode = async (email)=>{

    try{
        await sendEmail(email, 'Cycle Link 註冊通知', msg);
        return {result:1 , msg:"發信成功", code:authKey};
    }catch(ex){
        return {result:0 , msg:"發信失敗", err:ex};
    }

}

module.exports = sendSafyCode;




