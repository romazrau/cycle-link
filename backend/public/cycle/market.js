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

  //Tag假資料，之後需要用AJAX帶入真的假資料
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

  //把Tag假資料匯入div中
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



  //go to search market
  document
    .querySelector("#btn-go2marketSearch")
    .addEventListener("click", () => {
      location.hash = "#second-hand/search/";
    });

  //匯入商品的版型
  const pdtItemImport = (t, index) => {
    return `
    <div class="market_main_pdt_items">
    <img src="${t.fPath}" class="market_main_pdt_items_img">
    <h4>${t.fName}</h4>
    <p>${t.fDetail}</p>
    <img src="img/dollar.png" class="dollar_icon"><span>${t.fPrice}</span>
    </div>`;
  }
  const marketNewRow = document.querySelector(".market_new_row");
  const marketHotRow = document.querySelector(".market_hot_row");
  const marketRecRow = document.querySelector(".market_rec_row");

  //PDT假資料，之後需要用AJAX帶入真的假資料
  let pdtFakeDate1 = [
    {
      fName: "電腦鍵盤",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/new_arrival/nv01.PNG",
    },
    {
      fName: "吸塵器",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/new_arrival/nv02.PNG",
    },
    {
      fName: "造型墨鏡",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/new_arrival/nv03.PNG",
    },
    {
      fName: "女性襯衫",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/new_arrival/nv04.PNG",
    },
    {
      fName: "相機鏡頭",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/new_arrival/nv05.PNG",
    },
  ];
  let pdtFakeDate2 = [
    {
      fName: "拳擊手套",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/sport_pdt/sport01.PNG",
    },
    {
      fName: "用過的棒球們",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/sport_pdt/sport02.PNG",
    },
    {
      fName: "假魚魚餌",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/sport_pdt/sport03.PNG",
    },
    {
      fName: "棒球手套",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/sport_pdt/sport04.PNG",
    },
    {
      fName: "網球拍組合",
      fDetail: "使用一年多。棄坑賣出。線材外皮有點破損，但完全不影響使用。無盒，附矽膠防水鍵膜。",
      fPrice: 1000,
      fPath: "img/sport_pdt/sport05.PNG",
    },
  ];

  //把PDT假資料匯入div中
  pdtFakeDate1.map(
    (e, index) => {
      marketNewRow.innerHTML += pdtItemImport(e);
    }
  )
  pdtFakeDate2.map(
    (e, index) => {
      marketHotRow.innerHTML += pdtItemImport(e);
    }
  )
  pdtFakeDate1.map(
    (e, index) => {
      marketRecRow.innerHTML += pdtItemImport(e);
    }
  )

  //market_main_pdt_items hover好像怪怪ㄉ 用CSS HOVER好ㄌ
  // $(".market_main_pdt_items").mouseover(function () {
  //   $(this).css("background-color", "#FFFFFF"),
  //     $(this).css("border", "5px solid #D9AAB7"),
  //     $(this).find("h4").css("background-color", "#D9AAB7");
  // });

  // $(".market_main_pdt_items").mouseout(function () {
  //   $(this).css("background-color", "#D9AAB7"),
  //     $(this).find("h4").css("background-color", "#FFFFFF");
  // });
}
const Market = new ClsMarket();
