var { sendEmail } = require("./module");

const random10 = (lun) => {
    let result = "";
    while (result.length < lun) {
        let random = Math.floor(Math.random() * 10)
        result += random;
    }
    return result
}


const sendSafyCode = async (email) => {

    let authKey = random10(6);
    console.log("驗證碼為: " + authKey);

    let msg = `<h2>歡迎加入 Cycle Link</h2>
            <p>
                你的註冊驗證碼為: ${authKey}
            </p>`

    try {
        let sendReault = await sendEmail(email, 'Cycle Link 註冊通知', msg);
        if (sendReault.result) {
            return { result: 1, msg: "發信成功", code: authKey };
        } else{
            return { result: 0, msg: "發信失敗", err: result.msg };
        }
    } catch (ex) {
        console.log(ex);
        return { result: 0, msg: "發信失敗，例外錯誤", err: ex };
    }

}

module.exports = sendSafyCode;




