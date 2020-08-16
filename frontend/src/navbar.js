

let pageY =  window.pageYOffset;
const navbarMain = document.querySelector("#navbar_main");
window.addEventListener(
    'scroll', 
    () =>{
        if( window.pageYOffset - pageY > 0){
            navbarMain.classList.add("transYsWidthTo0");
        }else{
            navbarMain.classList.remove("transYsWidthTo0");

        }


        pageY =  window.pageYOffset;
    }
);