const rootURL = "http://localhost:3050";

const serverURL = {
    root: rootURL,
    login: `${rootURL}/users/login`,
    test: `${rootURL}/test/`,
    postslist: `${rootURL}/posts/`,
    article: `${rootURL}/article/`,
    active: `${rootURL}/active/`,
    activemainlevel: `${rootURL}/active/searchmainlevel/`,
    actDetail: `${rootURL}/activityDetail/`,
    actsearchdetail:`${rootURL}/activity/searchdetail/`,
    maps: `${rootURL}/map/`,
    personalPages: `${rootURL}/personalPage/`,
};





const postlist = async () => {
    try {
        // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
        // *用變數接 fetch 結果 ，要用await等。
        let response = await fetch(serverURL.postslist);
        // 用變數接 fetch結果的資料內容， 要用await等。
        let result = await response.json();
        console.log("post await");
        console.log(result);
        // *用 result  do something ...
    } catch (err) {
        console.log(err);
        // 錯誤處理
    }
};
// postlist()

const postByid = async (id) => {
    try {
        // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
        // *用變數接 fetch 結果 ，要用await等。
        let response = await fetch(serverURL.postslist + id);
        // 用變數接 fetch結果的資料內容， 要用await等。
        let result = await response.json();
        console.log("post by id await");
        console.log(result);
        // *用 result  do something ...
    } catch (err) {
        console.log(err);
        // 錯誤處理
    }
};
// postByid(1)

const checkLogin = () =>
    fetch(serverURL.login, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("Cycle link token")
        },
    })
    .then((res) => res.text())
    .then((resStr) => JSON.parse(resStr));

export {
    serverURL,
    checkLogin
};