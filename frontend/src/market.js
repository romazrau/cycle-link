function ClsMarket() {
  //匯入tag的版型
  const pdtTagImport = (t, index) => {
    return `
    <div id="tag${index}" class="tag" draggable="true">
    #${t.tagName}
    </div>`;
  }

  const tagbox_opt1 = document.querySelector(".tagbox_opt1");
  const tagbox_opt2 = document.querySelector(".tagbox_opt2");
  const tagbox_opt3 = document.querySelector(".tagbox_opt3");

  //AJAX
  let pdtTagFakeDate1 = [
    {
      tagName: "露營工具",
    },
    {
      tagName: "育嬰用品",
    },
    {
      tagName: "玩具",
    },
    {
      tagName: "女生衣物",
    },
    {
      tagName: "男性衣物",
    },
    {
      tagName: "包包",
    },
  ];
  let pdtTagFakeDate2 = [
    {
      tagName: "鞋子",
    },
    {
      tagName: "電器用品",
    },
    {
      tagName: "回不去了",
    },
    {
      tagName: "運動用品",
    },
    {
      tagName: "書籍",
    },
  ];
  let pdtTagFakeDate3 = [
    {
      tagName: "食物們",
    },
    {
      tagName: "日常用品",
    },
    {
      tagName: "繪畫工具",
    },
    {
      tagName: "美妝用品",
    },
    {
      tagName: "特殊才藝",
    },
    {
      tagName: "鐘錶",
    },
  ];

  //把假資料匯入div中
  pdtTagFakeDate1.map(
    (e, index) => {
      // e.index = index;
      tagbox_opt1.innerHTML += pdtTagImport(e, index);
    }
  )
  pdtTagFakeDate2.map(
    (e, index) => {
      // e.index = index;
      tagbox_opt2.innerHTML += pdtTagImport(e, index);
    }
  )
  pdtTagFakeDate3.map(
    (e, index) => {
      // e.index = index;
      tagbox_opt3.innerHTML += pdtTagImport(e, index);
    }
  )

  const pdtItemImport = (p) => {
    return `
    <div class="pdt_items">
    <img src="img/${p.fPath}.PNG" class="pdt_items_img">
    <h4>${p.fName}</h4>
    <p>${p.fDetail}</p>
    <img src="img/dollar.png" class="dollar_icon"><span>${p.fPrice}</span>
    </div>`;
  }

  //拖曳tag
  var dropTarget = document.querySelector(".tag_wrapper");

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
      $(this).css("border", "5px solid #D9AAB7"),
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
