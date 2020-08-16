function ClsNavbar() {
    let pageY = window.pageYOffset;
    const navbarMain = document.querySelector("#navbar_main");
    window.addEventListener(
        'scroll',
        () => {
            if (window.pageYOffset - pageY > 0) {
                navbarMain.classList.add("transYsWidthTo0");
            } else {
                navbarMain.classList.remove("transYsWidthTo0");

            }

            pageY = window.pageYOffset;
        }
    );


    //title img
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
                        gif.src = "./img/ 海龜gogoGIF.gif?" + imGcount;
                        gif.alt = "海龜";
                        e.currentTarget.appendChild(gif);
                        imGcount++;
                        setTimeout(
                            ()=>{res("OK")},
                            1500
                        )
                    }
                ).then(()=>{
                    isGIFrun = 0;
                })
            }
        }
    )



}
const Navbar = new ClsNavbar();
