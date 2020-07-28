//router
function ClsRouter() {

    // navbar link focus switch
    const setNavbarFocusByHash = (hashTitle) => {  //focus對應的navbar link用
        // console.log("page id:", hash);
        let navlinkList = document.querySelectorAll('.header_nav');
        navlinkList.forEach((e) => {    //先全部移除focus
            e.classList.remove("focus");
        })

        let targetNav = document.querySelector(`#navbar_${hashTitle}`)
        if (targetNav) {  //確定這個nav存在，才套色
            targetNav.classList.add('focus');
        }
    }

    //page switch
    this.changePage = (hash) => {   //切換頁面用  #.../../..
        try {
            let hashSplitArray = hash.split('/');   //處理hash字串  #../..
            console.log("hash: ", hashSplitArray);
            let hashTitle = hashSplitArray[0];
            hashTitle = hashTitle.substr(1);    //去掉#

            //特殊路徑
            hashTitle = hashTitle ? hashTitle : "home";  //沒有等於開啟home

            const pages = document.querySelectorAll('.page');
            // console.log(pages);
            pages.forEach((e) => {    //關閉所有頁面
                e.classList.add('hide');
            })

            switch (hashTitle) {   //路由判斷
                case "home":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "second-hand":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "activity":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "news":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                // case "st-coin":
                //     document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                //     break;

                case "about-us":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "log-in":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                case "sign-Up":
                    document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
                    break;

                default:
                    document.querySelector('#page_PAGE-NOT-FOUND').classList.remove('hide');
            }

            setNavbarFocusByHash(hashTitle);  //改變navbar focus狀態 

        } catch (e) {
            console.error("changePage錯誤:", e.name, e.message);
        }

    }


    // 每當 hash 變動的時候
    window.addEventListener("hashchange", () => {
        this.changePage(location.hash);
    });

    // 當網頁 reload
    window.addEventListener("load", () => {
        this.changePage(location.hash);
    });

}
const Router = new ClsRouter();
