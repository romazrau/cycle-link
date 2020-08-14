const serverURL = {
    root: "http://localhost:51346/",
    login: "http://localhost:51346/Account/Login"
};


const checkLogin = () => fetch(
    serverURL.login,
    {
        // 攜帶身分認證
        credentials: 'include'
    }
    )
    .then(
        (res) => res.text()
    ).then(
        resStr => JSON.parse(resStr)
    );



export { serverURL, checkLogin };
