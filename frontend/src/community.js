   function ClsCommunity(){

   // *second nav bar
   let pageY = window.pageYOffset;
   const communityNavbar = document.querySelector("#community_navbar");
   window.addEventListener(
       'scroll',
       () => {
           if (window.pageYOffset - pageY > 0) {
               communityNavbar.classList.remove("transYsWidthTo0Bottom");
           } else {
               communityNavbar.classList.add("transYsWidthTo0Bottom");
           }
           pageY = window.pageYOffset;
       }
   );



   }
   
   
   

const Community = new ClsCommunity();



    