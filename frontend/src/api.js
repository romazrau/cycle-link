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
  actsearchdetail: `${rootURL}/activity/searchdetail/`,
  maps: `${rootURL}/map/`,
  personalPages: `${rootURL}/personalPage/`,
  activeseen: `${rootURL}/active/activeseen`,
  articlepost: `${rootURL}/article/post`,
  articlereply: `${rootURL}/article/reply`,
  articlesearch: `${rootURL}/article/`,
  articlearticle: `${rootURL}/article/community/`,
  homePages: `${rootURL}/home/`,
  community: `${rootURL}/community/`,
  communityManager: `${rootURL}/community/communityManager/`,
  communityMember: `${rootURL}/community/communityById_communityMember/`,
  creatCommunity: `${rootURL}/`,
  activeinsertseensql: `${rootURL}/active/activeinsertseensql/`,
  activeforyou: `${rootURL}/active/activeforyou/`,
  likes: `${rootURL}/like/`,
  addlikes: `${rootURL}/like/add`,
  removelikes: `${rootURL}/like/remove`,
  addActLikeToSQL: `${rootURL}/active/addActLikeToSQL`,
  addReply: `${rootURL}/reply`,
  removeactlikesql:`${rootURL}/active/removeactlikesql`,
  getChatroom:`${rootURL}/chat/`,
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

const checkLogin = async () => {
  // 向後端驗證身分，攜帶 JWT ， 後端解析你的身分
  if (!localStorage.getItem("Cycle link token")) {
    //
    return { result: 0, msg: "沒有 Token" };
  }

  let respone = await fetch(serverURL.login, {
    method: "GET",
    cache: "no-cache", // 不准使用快取
    headers: {
      // *攜帶 http request headers
      Authorization: localStorage.getItem("Cycle link token"), // *這個屬性帶 JWT
    },
  });

  let result = await respone.json();
  return result; // 回傳身分解析結果
};
// checkLogin()

export { serverURL, checkLogin };
