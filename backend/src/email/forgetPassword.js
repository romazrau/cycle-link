var { sendEmail } = require("./module");

const random10 = (lun) => {
    let result = "";
    let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    while (result.length < lun) {
        let random = Math.floor(Math.random() * 21);
        result +=  abc[random];
    }

    return result
}


const sendSafyCode = async (email) => {

    let authKey = random10(10);
    console.log("新密碼為: " + authKey);

    let msg = `<h2>Cycle Link 忘記密碼通知</h2>
            <p>
                你的新密碼為: ${authKey}
            </p>
            <p>
                請盡速至會員頁面更改密碼，並妥善保管密碼。
            </p>
            <p>
                <a src="http://127.0.0.1:5500">Cycle Link 官網</a>
            </p>
            `

    try {
        await sendEmail(email, 'Cycle Link 忘記密碼通知', msg);
        return { result: 1, msg: "發信成功", code: authKey };
    } catch (ex) {
        return { result: 0, msg: "發信失敗", err: ex };
    }

}

module.exports = sendSafyCode;




