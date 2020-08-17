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