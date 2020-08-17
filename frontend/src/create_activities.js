// ----------- 頁面轉換 -----------
$(".page_hc_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");

$(".page_hc_title_div").click(function () {
    hcTitle = $(this).index();
    $(".page_hc_basicInfo").eq(hcTitle).css("display", "block").siblings().css("display", "none");
    console.log($(".page_hc_basicInfo"));
});
$("#page_hc_btn_next").click(function () {
    $(".page_hc_basicInfo").eq(1).css("display", "block").siblings().css("display", "none");
    console.log($(".page_hc_basicInfo"));
});
$("#page_hc_btn_pre").click(function () {
    $(".page_hc_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");
    console.log($(".page_hc_basicInfo"));
});

// ----------- 字數限制 -----------
$(function () {
    $(document).keyup(function () {
        var text = $("#page_hc_name").val();
        var counter = text.length;
        $("#page_hc_name_count").text(counter);
    })
})
$(function () {
    $(document).keyup(function () {
        var text = $("#page_hc_text").val();
        var counter = text.length;
        $("#page_hc_text_count").text(counter);
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
    $("#page_hc_local_tags").autocomplete({
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
var page_hc_tag_count = 0;

function inputTag() {
    if (page_hc_tag_count >= 5) {
        document.getElementById("page_hc_please").innerHTML = "標籤最多五個";
        return;
    }
    const tagInput = $("#test_tag_input").val();

    if (tagInput != "") {
        const htmlTagInput = `<div id="test_tag">${tagInput}<button>x</button>`;
        document.getElementById("test_a").innerHTML += htmlTagInput;
        page_hc_tag_count++;
    } else {
        document.getElementById("page_hc_please").innerHTML = "請輸入文字";
        // alert("請輸入文字");
        return;
    }
    $("#test_tag_input").val("");
};