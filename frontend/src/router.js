//router
function ClsRouter() {

    // navbar link focus switch
    const changeNavbarFocusByHash = (hashTitle) => { //focus對應的navbar link用
        // console.log("page id:", hash);
        let navlinkList = document.querySelectorAll('.header_nav');
        navlinkList.forEach((e) => { //先全部移除focus
            e.classList.remove("focus");
        })

        if( hashTitle === "personal-maneger"){
            hashTitle = "log-in";
        }


        let targetNav = document.querySelector(`#navbar_${hashTitle}`)
        if (targetNav) { //確定這個nav存在，才套色
            targetNav.classList.add('focus');
        }
    }

    //page switch
    this.changePageByHash = (hash) => { //切換頁面用  #.../../..
        try {
            //處理hash字串  #../../..
            let hashSplitArray = hash.split('/'); //[#.. , .. , ..]  
            // console.log("hash: ", hashSplitArray);
            let hashTitle = hashSplitArray[0]; // #..
            hashTitle = hashTitle.substr(1); //去掉#

            //特殊路徑處理
            hashTitle = hashTitle ? hashTitle : "home"; //沒有等於開啟home

            //關閉所有頁面
            const pages = document.querySelectorAll('.page');
            // console.log(pages);
            pages.forEach((e) => { //去掉focus class
                e.classList.add('hide');
            })

            switch (hashTitle) { //路由判斷
                case "home":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;


                case "activity":
                    if (hashSplitArray[1] == "detail") { //開啟活動頁面
                        document.querySelector('#page_activity-detail').classList.remove("hide");
                        break;
                    }


                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "community":
                    if (hashSplitArray[1] == "detail") { //開啟活動頁面
                        document.querySelector('#page_community-detail').classList.remove("hide");
                        break;
                    }


                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "map":
                    // if (hashSplitArray[1] == "detail") {  //開啟新聞文章頁面
                    //     document.querySelector('#page_news-detail').classList.remove("hide");
                    //     break;
                    // }

                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;


                case "about-us":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "log-in":
                    if(localStorage.getItem("Cycle link user data") && localStorage.getItem("Cycle link token")){
                        location.hash = `#personal-maneger`
                    }


                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                    // 沒有navbar 區
                case "sign-Up":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "personal-maneger":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;


                case "personal-page":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "create-activity":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;


                case "create-community":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;


                default:
                    document.querySelector('#page_PAGE-NOT-FOUND').classList.remove('hide');
            }

            changeNavbarFocusByHash(hashTitle); //改變navbar focus狀態 
            window.scrollTo(0, 0);

        } catch (e) {
            console.error("changePageByHash錯誤:", e.name, e.message);
        }

    }


    // 每當 hash 變動的時候
    window.addEventListener("hashchange", () => {
        this.changePageByHash(location.hash);
    });

    // 當網頁 reload
    window.addEventListener("load", () => {
        this.changePageByHash(location.hash);
    });

}
const Router = new ClsRouter();