const rootURL = "http://localhost:3050";

const serverURL = {
  root: rootURL,
  login: `${rootURL}/users/`,
  test: `${rootURL}/test/`,
  postslist: `${rootURL}/posts/`,
  article: `${rootURL}/article/`,
};

// 不使用 async await寫法
const test = () => {
  // fetch 回傳 promise 物件，要用then 接
  // *fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
  fetch(serverURL.test)
    .then((response) => {
      // 用then 等 fetch 連線結果
      return response.json(); // 用 .json 方法等 response 的資料內容
    })
    .then((result) => {
      // 用then 等 response 的資料內容
      console.log("test without await");
      console.log(result);
      // *用 result  do something ...
    })
    .catch((err) => {
      console.log(err);
      // 錯誤處理
    });
};
//test()

// *使用 async await寫法 ， 這裡有 async
const testAwait = async () => {
  try {
    // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
    // *用變數接 fetch 結果 ，要用await等。
    let response = await fetch(serverURL.test, {
      method: "GET", // http request method
      headers: {
        // http headers
        "Content-Type": "application/json", // 請求的資料類型
      },
      // 以下跟身分認證有關，後端要使用session 要帶這幾項
      cache: "no-cache",
      credentials: "include",
    });
    // 用變數接 fetch結果的資料內容， 要用await等。
    let result = await response.json();
    console.log("test await");
    console.log(result);
    // *用 result  do something ...
  } catch (err) {
    console.log(err);
    // 錯誤處理
  }
};
//testAwait()

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
// postlist();

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
// postByid(1);

const checkLogin = () =>
  fetch(serverURL.login, {
    // 攜帶身分認證
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    mode: "cors",
    referrer: "client",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((resStr) => JSON.parse(resStr));

export { serverURL, checkLogin };
