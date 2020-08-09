function ClsMarket() {
  //拖曳tag
  var dropTarget = document.querySelector(".wrapper");

  var draggables = document.querySelectorAll(".tag");
  for (let i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener("dragstart", function (x) {
      x.dataTransfer.setData("srcId", x.target.id);
    });
  }

  dropTarget.addEventListener("dragover", function (x) {
    x.preventDefault();
  });

  dropTarget.addEventListener("drop", function (x) {
    x.preventDefault();
    let target = x.target;
    let droppable = target.classList.contains("box");
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
  };

  //pdt item hover
  $(".pdt_items").mouseover(function () {
    $(this).css("background-color", "#FFFFFF"),
      $(this).find("h4").css("background-color", "#D9AAB7");
  });

  $(".pdt_items").mouseout(function () {
    $(this).css("background-color", "#D9AAB7"),
      $(this).find("h4").css("background-color", "#FFFFFF");
  });

  //go to search market
  document
    .querySelector("#btn-go2marketSearch")
    .addEventListener("click", () => {
      location.hash = "#second-hand/search/";
    });
}
const Market = new ClsMarket();
