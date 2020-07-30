// 切換購買/徵求頁面
var tabButtons = document.querySelectorAll(".buttonContainer button");
var tabPanels = document.querySelectorAll(".tabPanel");

function showPanel(panelIndex, colorCode) {
    tabButtons.forEach(function (a) {
        a.style.backgroudColor = "";
        a.style.color = "";
    })
    tabButtons[panelIndex].style.backgroudColor = colorCode;
    tabButtons[panelIndex].style.color = "white";

    tabPanels.forEach(function (x) {
        x.style.display = "none";
    })
    tabPanels[panelIndex].style.display = "block";
}
showPanel(0, "#31708E");

//購買版拖曳tag
var dropTarget = document.querySelector(".wrapper");

var draggables = document.querySelectorAll(".tag");
for (let i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener("dragstart", function (x) {
        x.dataTransfer.setData("srcId", x.target.id);
    });
}

dropTarget.addEventListener('dragover', function (x) {
    x.preventDefault();
});

dropTarget.addEventListener('drop', function (x) {
    x.preventDefault();
    let target = x.target;
    let droppable = target.classList.contains('box');
    let srcId = x.dataTransfer.getData("srcId");

    if (droppable) {
        x.target.appendChild(document.getElementById(srcId));
    }
});

//徵求版拖曳tag
var dropTarget_w = document.querySelector(".wrapper_w");
var draggables_w = document.querySelectorAll(".tag_w");

for (let i = 0; i < draggables_w.length; i++) {
    draggables_w[i].addEventListener("dragstart", function (x) {
        x.dataTransfer.setData("srcId", x.target.id);
    });
}

dropTarget_w.addEventListener('dragover', function (x) {
    x.preventDefault();
});

dropTarget_w.addEventListener('drop', function (x) {
    x.preventDefault();
    let target = x.target;
    let droppable = target.classList.contains('box');
    let srcId = x.dataTransfer.getData("srcId");

    if (droppable) {
        x.target.appendChild(document.getElementById(srcId));
    }
});

//location slide
var slider = document.getElementById("distance_range");
var output = document.getElementById("distance_value");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

//購買版pdt item hover
$(".pdt_items").mouseover(function () {
    $(this).css("background-color", "#FFFFFF"),
        $(this).find("h4").css("background-color", "#D9AAB7")
});

$(".pdt_items").mouseout(function () {
    $(this).css("background-color", "#D9AAB7"),
        $(this).find("h4").css("background-color", "#FFFFFF")
});

//徵求版pdt item hover
$(".pdt_items_w").mouseover(function () {
    $(this).css("background-color", "#FFFFFF"),
        $(this).find("h4").css("background-color", "#31708E")
});

$(".pdt_items_w").mouseout(function () {
    $(this).css("background-color", "#31708E"),
        $(this).find("h4").css("background-color", "#FFFFFF")
});



//go to search market
document.querySelector("#btn-go2marketSearch").addEventListener(
    "click",
    () => {
        location.hash = "#second-hand/search/"
    }
)