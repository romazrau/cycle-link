//router
function ClsRouter() {

    // navbar contrl
    const setNavbarFocusByHash = (hash) => {  //focus對應的navbar link用
        // console.log("page id:", hash);
        let navlinkList = document.querySelectorAll('.header_nav');
        navlinkList.forEach((e) => {
            e.classList.remove("focus");
        })

        let targetNav = document.querySelector(`#navbar_${hash}`)
        if(targetNav) {  //確定這個nav存在，才套色
            targetNav.classList.add('focus');
        }
    }

    this.changePage = (hash) => {   //切換頁面用  #.../../..
        try {
            let hashSplit = hash.split('/');   //處理hash字串  #../..
            console.log("hash: ", hashSplit);
            let targetHash = hashSplit[0];
            targetHash = targetHash.substr(1);    //去掉#

            //特殊路徑
            targetHash = targetHash ? targetHash : "home";

            const pages = document.querySelectorAll('.page');
            console.log(pages);
            let isPageShow = false     //判斷是否有頁面開啟
            pages.forEach((e) => {    //切換頁面
                if(e.id === `page_${targetHash}`){     //id名字重要 page_...
                    e.classList.remove('hide');
                    isPageShow = true;  //確定有頁面開啟
                }else{
                    e.classList.add('hide');
                }
            })

            if(!isPageShow){  //沒有指定頁面時，指定not fround page
                document.querySelector('#page_PAGE-NOT-FOUND').classList.remove('hide');
            }

            setNavbarFocusByHash(targetHash);  //改變navbar focus狀態 

        } catch (e) {
            console.error("changePage錯誤:",e.name ,e.message);
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
