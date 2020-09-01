// ----------- 頁面轉換 -----------
$(".create_active_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");

$(".create_active_title_div").click(function () {
    hcTitle = $(this).index();
    $(".create_active_basicInfo").eq(hcTitle).css("display", "block").siblings().css("display", "none");
    console.log($(".create_active_basicInfo"));
});
$("#create_active_btn_next").click(function () {
    $(".create_active_basicInfo").eq(1).css("display", "block").siblings().css("display", "none");
    console.log($(".create_active_basicInfo"));
});
$("#create_active_btn_pre").click(function () {
    $(".create_active_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");
    console.log($(".create_active_basicInfo"));
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
        } catch (error) {
            date = null;
        }
        return date;
    }
});

// ----------- 標籤寫入 -----------
var create_active_tag_count = 0;

function inputTag() {
    if (create_active_tag_count >= 5) {
        document.getElementById("create_active_please").innerHTML = "標籤最多五個";
        return;
    }
    const tagInput = $("#create_active_tag_input").val();

    if (tagInput != "") {
        const htmlTagInput = `<div id="create_active_tag">${tagInput}<button>x</button>`;
        document.getElementById("test_a").innerHTML += htmlTagInput;
        create_active_tag_count++;
    } else {
        document.getElementById("create_active_please").innerHTML = "請輸入文字";
        // alert("請輸入文字");
        return;
    }
    $("#create_active_tag_input").val("");
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