function ClsNavbar() {

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




}
const Navbar = new ClsNavbar();