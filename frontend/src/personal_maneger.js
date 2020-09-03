function ClsPersonalManeger() {

    //可惡這只是變色
    this.openClass = (evt, className) => {
        var i, x, tablinks;
        x = document.getElementsByClassName("class");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
            tablinks[i].classList.remove("grey");
        }
        document.getElementById(className).style.display = "block";
        // evt.currentTarget.classList.add("grey");
        evt.currentTarget.classList.add("activestyle");

    }

    var btnactions = document.querySelectorAll(".activefocus");
    // console.log('btnactions', btnactions);
    for (let i = 0; i < btnactions.length; i++) {

        btnactions[i].addEventListener('click', function () {
            // btnactions[i].classList.add("")

            btnactions.forEach(function (v) {
                v.classList.remove("activestyle");
            })

            this.classList.add("activestyle");
            // console.log(this);
            // console.log( btnactions[i]);
        })

    }


    /*上傳頭像*/
    $('.input_pictureUpload').change(function () {
        var file = $('.input_pictureUpload')[0].files[0];
        var reader = new FileReader;

        reader.onload = function (e) {
            $('.avatar').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);

    });
    /*end*/




    /*上傳商品圖片*/
    $('.input_POMUpload').change(function () {
        var file = $('.input_POMUpload')[0].files[0];
        var reader = new FileReader;

        reader.onload = function (e) {
            $('.img_PicturePOM').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    });

    /*上傳活動圖片*/
    $('.input_IAUpload').change(function () {
        var file = $('.input_IAUpload')[0].files[0];
        var reader = new FileReader;

        reader.onload = function (e) {
            $('.img_PictureIA').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    });


    /*右方活動延展*/
    $(".div_FavorActivity").hover(function () {


        $(".div_FavorActivity").toggleClass("Show");
        $(".div_FavorActivityList").toggleClass("Show");
    })
    /*商品Tags-----*/
    var ProductTagsList = [
        "台北", "新北", "桃園", "新竹", "苗栗", "筆記型電腦", "筆記型周邊配件", "平板電腦", "網路設備", "耗材", "線材與雜項", "電腦軟體", "電子字典", "翻譯機", "螢幕", "CPU", "主機板", "記憶體", "電腦", "網路", "電腦桌/椅", "相機、攝影與視訊", "消費級數位相機", "數位單眼相機", "數位相機配件", "行動硬碟/相簿", "PMP多媒體播放器", "一般相機", "攝影機", "讀卡機", "記憶卡", "鏡頭", "周邊配件", "望遠鏡", "視訊設備", "電池", "充電器", "相片印表機", "燒錄機", "影像處理軟體", "投影機", "手機與通訊", "手機", "手機配件", "手機吊飾", "手機門號", "電話卡", "家用電話", "商用電話", "網路電話", "傳真機", "答錄機", "無線電設備", "PDA", "電子字典/翻譯機", "女裝與服飾配件 ", "台中", "彰化", "雲林", "嘉義", "台南", "高雄", "屏東", "台東", "南投", "花蓮", "宜蘭", "生活", "電子", "女裝",
        "桌上型電腦", "蘋果桌上型電腦", "電腦零組件", "電腦周邊設備"
    ]
    /*-------------------------------------*/

    // $("#newProductTag").autocomplete({
    //     source: ProductTagsList,

    // })
    /*活動Tags-----*/
    var ActivityTagsList = ["台北", "新北", "桃園", "新竹", "苗栗", "台中", "彰化", "雲林", "嘉義", "台南", "高雄", "屏東", "台東", "南投", "花蓮", "宜蘭", "路跑", "淨灘", "海洋", "綠能"]

    // $("#newActivityTag").autocomplete({
    //     source: ActivityTagsList,
    //     minLength: 0
    // })

    // $("#newActivityDate").datepicker({
    // });
    // $("#Birth").datepicker({
    // });


    // function tagadd(List,N){

    // }





    /*新增商品標籤*/
    var NewTagNameList = [""];
    var ck = 0;
    var maxTagsNumbers = 5;
    $(".button_NewProductTag").click(function () {

        if (NewTagNameList.length >= maxTagsNumbers) {
            window.alert("最多新增5個標籤");
        } else {

            NewTagName = $(".newProductTag").val();

            NewTagNameCheck(NewTagNameList, newProductTagText, removeProductDropdownlist);

            if (ck == 1) {
                console.log("正確");
                NewTagNameList.push(NewTagName);
                document.getElementById("newProductTagText").innerHTML += NewTagName + ", ";
                AddDropdownlist(NewTagName, removeProductDropdownlist);
            }
            // /*檢查*/
        }
    })
    /*檢查有無重複*/
    function NewTagNameCheck(TagArr, obj, dropdownlist) {
        console.log(dropdownlist);
        for (let i = 0; i < TagArr.length; i++) {
            if (TagArr[i] == "") {
                TagArr.splice(0, 1, NewTagName);
                document.getElementById(obj.id).innerHTML += NewTagName + ", ";
                AddDropdownlist(NewTagName, dropdownlist)
                ck = 0;
            } else if (TagArr[i] == NewTagName) {
                /*重複 true*/
                window.alert("請勿輸入重複標籤");
                ck = 0;
                break;

            } else {
                ck = 1;
            }

        }
    }

    $(".button_removeProductTag").click(function () {
        let RemoveName = document.querySelector(".removeProductDropdownlist").value;

        $(".removeProductDropdownlist option:selected").remove();
        NewTagNameList.forEach(function (item, index, array) {
            if (item === RemoveName) {
                console.log(item);
                array.splice(index, 1);
            }

            document.getElementById("newProductTagText").innerHTML = "標籤:";
            NewTagNameList.forEach(function (item, index, array) {
                document.getElementById("newProductTagText").innerHTML += item + ", ";
            })

        })
    });


    /*新增活動標籤*/
    var NewTagNameList_Activity = [""];
    $(".button_NewActivityTag").click(function () {

        if (NewTagNameList_Activity.length >= maxTagsNumbers) {
            window.alert("最多新增5個標籤");
        } else {
            NewTagName = $(".newActivityTag").val();
            NewTagNameCheck(NewTagNameList_Activity, newActivityTagText, removeActivityDropdownlist);
            if (ck == 1) {
                NewTagNameList_Activity.push(NewTagName);
                document.getElementById("newActivityTagText").innerHTML += NewTagName + ", ";
                AddDropdownlist(NewTagName, removeActivityDropdownlist);
            }
            // /*檢查*/
        }
    })


    /*新增活動標籤至下拉式選單*/
    $(".button_removeActivityTag").click(function () {
        let RemoveName = document.querySelector(".removeActivityDropdownlist").value;
        $(".removeActivityDropdownlist option:selected").remove();
        NewTagNameList_Activity.forEach(function (item, index, array) {
            if (item === RemoveName) {
                console.log(item);
                array.splice(index, 1);
            }

            document.getElementById("newActivityTagText").innerHTML = "標籤:";
            NewTagNameList_Activity.forEach(function (item, index, array) {
                document.getElementById("newActivityTagText").innerHTML += item + ", ";
            })

        })
    })

    function AddDropdownlist(NewTagName, obj) {
        let NewTagOpt = document.createElement("option");
        NewTagOpt.innerHTML = NewTagName;
        NewTagOpt.value = NewTagName;

        document.getElementById(obj.id).appendChild(NewTagOpt);
    }
    $(".div_FavorActivity").hover(function () {

        $(this).siblings().css("opacity", "0.5");

    }, function () {
        $(this).siblings().css("opacity", "1");
    })

}
const PersonalManeger = new ClsPersonalManeger();
document.getElementsByClassName("testbtn")[0].click();