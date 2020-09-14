import {
    serverURL,
    checkLogin
} from "./api.js";

// ----------- 頁面轉換 -----------
$(".create_community_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");

$(".create_community_title_div").click(function (e) {
    e.preventDefault();
    let hcTitle = $(this).index();
    console.log(hcTitle);
    $(".create_community_basicInfo").eq(hcTitle).css("display", "block").siblings().css("display", "none");
    // console.log($(".create_community_basicInfo"));
});
$("#create_community_btn_next").click(function (e) {
    e.preventDefault();
    // console.log("gogo");
    $(".create_community_basicInfo").eq(1).css("display", "block").siblings().css("display", "none");
    // console.log($(".create_community_basicInfo"));
    window.scroll(0, 0)
});
$("#create_community_btn_pre").click(function (e) {
    e.preventDefault();
    $(".create_community_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");
    // console.log($(".create_community_basicInfo"));
    window.scroll(0, 0)

});

// ----------- 字數限制 -----------
$(function () {
    $(document).keyup(function () {
        var text = $("#create_community_name").val();
        var counter = text.length;
        $("#create_community_name_count").text(counter);
    })
})
$(function () {
    $(document).keyup(function () {
        var text = $("#create_community_text").val();
        var counter = text.length;
        $("#create_community_text_count").text(counter);
    })
})

// ----------- 圖片載入 -----------
$('.cc_imgUpload').change(function () {
    var file = $('.cc_imgUpload')[0].files[0];
    var reader = new FileReader;
    reader.onload = function (e) {
        $('.cc_img_avatar').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
});
















function ClsCommunityCreate() {

    //----after onlick done btn
    //----是會員Get inputs' data (formdata)
    //----fetch (URL,Post)
    //!----判斷是否為會員 (在後端router做驗證)
    // TODO ----如果不是會員導向會員頁面



    const getCommunityData = async () => {
        try {



            // 放棄這個方法 用Formdata物件
            // let fCommunityName = document.forms.formBasic.fcommunityName.value;//抓到element
            // let fStatus = document.forms.formBasic.selectStatus.value;
            // .....

            let form = document.querySelector("#formOfCreate"); // form element

            let formData = new FormData(form); // FormData



            //FOR TEXT ONLY
            // let fName = "我快瘋掉ㄌ";
            // let fStatus = 1;
            // let fImgPath = "gladkj;sflaisdj";
            // let fInfo = "你好";


            // formData.append("fName", fName);
            // formData.append("fStatusId", fStatus);
            // formData.append("fImgPath", fImgPath);
            // formData.append("fInfo", fInfo);




            let response = await fetch("http://localhost:3050/community/", {

                method: "POST",
                // Adding body or contents to send 
                body: formData,
                // Adding headers to the request 
                headers: {
                    // formdata 不是用這種解析方式
                    // "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("Cycle link token"),

                },
                cache: "no-cache",
                credentials: "include",
            })

            let result = await response.json();

            if(result.result){
            alert("創建成功")
            
                window.location.hash = "#community";


            }
            console.log(result);

        } catch (err) {
            console.log(err);
        }


    }


    document.getElementById("create_community_btn_done").addEventListener("click", (e) => {
        e.preventDefault();

        getCommunityData();

    })





}

const CommunityCreate = new ClsCommunityCreate();