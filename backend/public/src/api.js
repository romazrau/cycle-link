const rootURL = "http://localhost:3050";


const serverURL = {
    root: rootURL,
    login: `${rootURL}/users/`
};



const checkLogin = () =>
    fetch(serverURL.login , {
        // 攜帶身分認證
        method: 'GET',
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
