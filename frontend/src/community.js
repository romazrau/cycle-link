   function ClsCommunity() {

       // *second nav bar
       //    let pageY = window.pageYOffset;
       //    const communityNavbar = document.querySelector("#community_navbar");
       //    window.addEventListener(
       //        'scroll',
       //        () => {
       //            if (window.pageYOffset - pageY > 0) {
       //                communityNavbar.classList.remove("transYsWidthTo0Bottom");
       //            } else {
       //                communityNavbar.classList.add("transYsWidthTo0Bottom");
       //            }
       //            pageY = window.pageYOffset;
       //        }
       //    );


       //跳轉
       document.querySelectorAll(".communmity_container_middle_content ").forEach(
           (item) => {
               item.addEventListener(
                   "click",
                   (e) => {
                       location.hash = "#community/detail/id=?";
                   }
               )
           }
       )







   }




   const Community = new ClsCommunity();