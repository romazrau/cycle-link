// ----------- 頁面轉換 -----------
$(".create_community_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");

$(".create_community_title_div").click(function () {
    hcTitle = $(this).index();
    $(".create_community_basicInfo").eq(hcTitle).css("display", "block").siblings().css("display", "none");
    console.log($(".create_community_basicInfo"));
});
$("#create_community_btn_next").click(function () {
    $(".create_community_basicInfo").eq(1).css("display", "block").siblings().css("display", "none");
    console.log($(".create_community_basicInfo"));
});
$("#create_community_btn_pre").click(function () {
    $(".create_community_basicInfo").eq(0).css("display", "block").siblings().css("display", "none");
    console.log($(".create_community_basicInfo"));
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