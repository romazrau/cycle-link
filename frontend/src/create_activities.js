// ----------- 頁面轉換 -----------
$(".create_active_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");
// console.log($(".create_active_basicInfo"));
$(".create_active_title_div").click(function () {
    hcTitle = $(this).index();
    // console.log(hcTitle)
    $(".create_active_basicInfo").eq(hcTitle).css("display", "block").siblings().css("display", "none");
    // console.log($(".create_active_basicInfo"));
    window.scroll(0, 0)
});

$("#create_active_btn_next").click(function (e) {
    e.preventDefault();
    $(".create_active_basicInfo").eq(1).css("display", "block").siblings().css("display", "none");
    // console.log($(".create_active_basicInfo").eq(1));
    window.scroll(0, 0)
});
$("#create_active_btn_pre").click(function (e) {
    e.preventDefault();
    $(".create_active_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");
    // console.log($(".create_active_basicInfo"));
    window.scroll(0, 0)
});

// ----------- 字數限制 -----------
$(function () {
    $(document).keyup(function () {
        var text = $("#create_active_name").val();
        var counter = text.length;
        $("#create_active_name_count").text(counter);
    })
})
$(function () {
    $(document).keyup(function () {
        var text = $("#create_active_text").val();
        var counter = text.length;
        $("#create_active_text_count").text(counter);
    })
})

// ----------- 地標選擇 -----------
$(function () {
    var availableTags = [
        "Keelung, 基隆市",
        "Taipei, 台北市",
        "Taipei, 台北市大安區",
        "New Taipei City, 新北市",
        "Taoyuan, 桃園市",
        "Hsinchu, 新竹市",
        "Miaoli, 苗栗縣",
    ];
    $("#create_active_local_tags").autocomplete({
        source: availableTags,
        autoFocus: true,
        classes: {
            "ui-autocomplete": "highlight",
            "ui-autocomplete-input": "focus"
        }
    });
});




// ----------- datepicker -----------
$(function () {
    var dateFormat = "yy/mm/dd",
        from = $("#ac_date_from").datepicker({
            minDate: +7,
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: "yy/mm/dd"
        }).on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $("#ac_date_to").datepicker({
            dateFormat: "yy/mm/dd",
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            maxDate: "+1M +10D"
        }).on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
            // console.log(document.querySelector("#ac_date_from") == "");
            // console.log(document.querySelector("#ac_date_to").value);
            let actDateFrom = document.querySelector("#ac_date_from");
            let actDateTo = document.querySelector("#ac_date_to");
            if (actDateFrom.value !== "") {
                $("#ac_date_from_div").css("display", "block")
            }
            if (actDateTo.value !== "") {
                $("#ac_date_to_div").css("display", "block")
            }

        } catch (error) {
            date = null;
        }
        return date;
    }
});


// ----------- 標籤寫入 -----------
var create_active_tag_count = 0;
let createActTagInput = document.querySelector("#create_active_tag_input")

function inputTag() {
    if (create_active_tag_count >= 5) {
        document.getElementById("create_active_please").innerHTML = "標籤最多五個";
        return;
    }
    // const tagInput = $("#create_active_tag_input").val();
    // console.log(createActTagInput.value);
    if (createActTagInput.value != "") {
        let ca = document.createElement("input");
        let tag5All = document.getElementById("act5Tag");
        tag5All.appendChild(ca);
        ca.setAttribute("name", "fLabelName");
        ca.setAttribute("class", "create_active_tag");
        ca.setAttribute("value", "#" + createActTagInput.value);
        ca.setAttribute("style", "display:none");
        ca.innerText = createActTagInput.value;
        let caTag = document.querySelector(".create_active_tag")


        const htmlTagInput = `<div class="create_active_tag">#${createActTagInput.value}<button class="actRemoveTag"><i class="fas fa-times"></i></button>`;
        tag5All.innerHTML += htmlTagInput;
        create_active_tag_count++;
        // console.log(tag5All.indexOf(caTag));
    } else {
        document.getElementById("create_active_please").innerHTML = "請輸入文字";
        // alert("請輸入文字");
        return;
    }
    $("#create_active_tag_input").val("");

    // ----------- 標籤移除 -----------
    let actRemoveBTN = document.querySelectorAll(".actRemoveTag")
    for (let i = 0; i < actRemoveBTN.length; i++) {
        actRemoveBTN[i].addEventListener('click', (e) => {
            e.preventDefault();
            let rt = document.querySelectorAll(".create_active_tag")
            // console.log(rt)
            let div = e.target.parentNode.parentNode
            let input = e.target.parentNode.parentNode.previousSibling
            // console.log("1==" + grandfather)
            // console.log("2==" + grandfather2)
            div.remove();
            input.remove();
            create_active_tag_count--;
            // console.log($(this));
        })
    }

};


// ----------- 圖片載入 -----------
$('.ca_imgUpload').change(function () {
    var file = $('.ca_imgUpload')[0].files[0];
    var reader = new FileReader;
    reader.onload = function (e) {
        $('.ca_img_avatar').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
});


// -- 塞時間 --
var timeArr = new Array();
for (let i = 0; i < 24; i++) {
    if (i < 10) {
        timeArr.push("0" + i + ":" + "00")
        timeArr.push("0" + i + ":" + "30")
    } else {
        timeArr.push(i + ":" + "00")
        timeArr.push(i + ":" + "30")
    }
}
let acfd = document.querySelector("#ac_date_from_time");
let aced = document.querySelector("#ac_date_to_time");

for (let i = 0; i < 48; i++) {
    var op = document.createElement("option");
    op.appendChild(document.createTextNode(timeArr[i]));
    acfd.appendChild(op)
}
for (let i = 0; i < 48; i++) {
    var op = document.createElement("option");
    op.appendChild(document.createTextNode(timeArr[i]));
    aced.appendChild(op)
}


// -- 勾選後加入最低人數
let ttt = document.querySelector("#actMinPeopleCk");
let ttt22 = document.querySelector("#actMinPeople");

$("#actMinPeopleCk").click(function () {
    if (ttt.checked) {
        ttt22.setAttribute("value", "5")
    } else {
        ttt22.removeAttribute("value")
    }
})