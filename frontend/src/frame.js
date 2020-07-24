// navbar contrl
function ClsNavbarContrl() {
    let navlinkList = document.querySelectorAll('.header_nav');

    this.navbarFocusThis = (e) => {             //被點擊的套顏色方法     
        console.log("按了哪個", e);
        navlinkList.forEach((ele) => {
            ele.classList.remove("focus");
        })
        e.classList.add("focus");
    }

    this.setNavbarFocusByPageId = (e) =>{  //TODO 
        console.log("page id:", e);
    }


    navlinkList.forEach((e) => {
        e.addEventListener(
            "click",
            () => this.navbarFocusThis(e)
        )
    })

}
const NavbarContr = new ClsNavbarContrl();



//router
function ClsRouter() {

    this.changePage = (hash) => {   //切換頁面用  #.../../..
        try {
            const pages = document.querySelectorAll('.page')

            let hashSplit = hash.split('/');   //處理hash字串  #../..
            console.log("hash: ", hashSplit);
            let target = hashSplit[0];
            target = target.substr(1);    //去掉#

            let isPageShow = false     //確定有頁面開啟
            pages.forEach((e) => {    //切換頁面
                if(e.id == `page_${target}`){     //id名字重要 page_...
                    e.classList.remove('hide');
                    isPageShow = true;  //確定有頁面開啟
                }else{
                    e.classList.add('hide');
                }
            })

            if(!isPageShow){
                document.querySelector('#page_PAGE-NOT-FOUND').classList.remove('hide');
            }


        } catch (e) {
            console.error("changePage錯誤:",e.name ,e.message);
        }

    }

    // 初始化
    this.changePage("#log-in");

    // 每當 hash 變動的時候
    window.addEventListener("hashchange", () => {
        this.changePage(location.hash);
    });
}
const Router = new ClsRouter();
