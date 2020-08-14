const rootURL = "https://localhost:44398/";


const serverURL = {
    root: rootURL,
    login: `${rootURL}Account/Login`
};

document.cookie = "test1=requestHadThis";

const checkLogin = () =>
    fetch(serverURL.login , {
        // 攜帶身分認證
        cache: 'no-cache',
        credentials: 'include',
        mode: 'cors', 
        referrer: "client",
        headers: {
            'Content-Type': 'application/json'
          }
    }
    )
        .then(
            (res) => res.text()
        ).then(
            resStr => JSON.parse(resStr)
        );



export { serverURL, checkLogin };
