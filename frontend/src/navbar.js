function ClsNavbar() {


    // 下拉新增選項
    const setCreateListBtns = (isCanShow = 1) =>{
        let createListContainer = document.querySelector("#navebar_down_list");
        let createListBtn = document.querySelectorAll("#navebar_down_list > button");
        let createPlusBtn = document.querySelector("#navebar_plus_icon");

        if ([...createListBtn[0].classList].includes("foldingCurtain")) {
            createListContainer.classList.add("foldingCurtainUp");
            createListContainer.classList.remove("foldingCurtain");
            createListBtn.forEach(item => item.classList.remove("foldingCurtain"));
            createListBtn.forEach(item => item.classList.add("foldingCurtainUp"));
            createPlusBtn.classList.remove("rotate45");
        } else if(isCanShow) {
            createListContainer.classList.remove("foldingCurtainUp");
            createListContainer.classList.add("foldingCurtain");
            createListBtn.forEach(item => item.classList.add("foldingCurtain"));
            createListBtn.forEach(item => item.classList.remove("foldingCurtainUp"));
            createPlusBtn.classList.add("rotate45");
        }
    }
    document.querySelector("#navebar_down_icon").addEventListener("click", setCreateListBtns);
    document.querySelectorAll("#navebar_down_list > button").forEach(item => item.addEventListener("click", ()=>{
        setCreateListBtns(0);
    }))


    //menu switch
    let menu = document.querySelector(".navbar_menu");
    let navLinksContainer = document.querySelector(".div_dropdownmenu");
    let account = document.querySelector(".div_container_login");
    menu.addEventListener("click", function (event) {
        menu.classList.toggle("navbar_menu_line_change");
        navLinksContainer.classList.toggle("navbar_menu_show");
        [...navLinksContainer.children].map(item => {
            item.classList.toggle("navbarLink_show");
        })
    });

    this.closeShowMenu = () => {
        menu.classList.remove("navbar_menu_line_change");
        navLinksContainer.classList.remove("navbar_menu_show");
        [...navLinksContainer.children].map(item => {
            item.classList.remove("navbarLink_show");
        })
    }

    navLinksContainer.addEventListener("click", this.closeShowMenu);


    let pageY = window.pageYOffset;
    const navbarMain = document.querySelector("#navbar_main");
    window.addEventListener(
        'scroll',
        () => {
            if (window.pageYOffset - pageY > 0) {
                navbarMain.classList.add("transYsWidthTo0");
                this.closeShowMenu();
                // 關閉新增系列按鈕
                setCreateListBtns(0);
            } else {
                navbarMain.classList.remove("transYsWidthTo0");
            }

            pageY = window.pageYOffset;
        }
    );


    //title img reflah by mouse enter
    let imGcount = 1;
    let isGIFrun = 0;
    document.querySelector(".header_title").addEventListener(
        "mouseenter",
        (e) => {
            if (!isGIFrun) {
                new Promise(
                    (res, rej) => {
                        isGIFrun = 1;
                        e.currentTarget.innerHTML = "";
                        const gif = document.createElement("img");
                        gif.src = "./img/海龜gogo_new.gif?" + imGcount;
                        gif.alt = "海龜";
                        e.currentTarget.appendChild(gif);
                        imGcount++;
                        setTimeout(
                            () => {
                                res("OK")
                            },
                            1500
                        )
                    }
                ).then(() => {
                    isGIFrun = 0;
                })
            }
        }
    )



    // log out
    document.querySelector('#navbar_logout').addEventListener("click", (e) => {

        let isLogout = confirm("確定要登出嗎?", "Cycle Link");

        if (isLogout) {
            window.localStorage.removeItem("Cycle link token");
            window.localStorage.removeItem("Cycle link user data");

            location.reload();
            // location.hash = "#log-in";
        }
    })




}
const Navbar = new ClsNavbar();