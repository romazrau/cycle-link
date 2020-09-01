function ClsMarketSearch() {

  //price slide
  var lower = document.getElementById("price_lower");
  var upper = document.getElementById("price_upper");
  var lower_output = document.getElementById("price_lower_value");
  var upper_output = document.getElementById("price_upper_value");
  lower_output.innerHTML = lower.value;
  upper_output.innerHTML = upper.value;


  // upperSlider.oninput = function () {
  //   lowerVal = parseInt(lowerSlider.value);
  //   upperVal = parseInt(upperSlider.value);

  //   if (upperVal < lowerVal + 4) {
  //     lowerSlider.value = upperVal - 4;
  //     if (lowerVal == lowerSlider.min) {
  //       upperSlider.value = 4;
  //     }
  //   }
  //   document.querySelector('#two').value = this.value
  // };

  // lowerSlider.oninput = function () {
  //   lowerVal = parseInt(lowerSlider.value);
  //   upperVal = parseInt(upperSlider.value);
  //   if (lowerVal > upperVal - 4) {
  //     upperSlider.value = lowerVal + 4;
  //     if (upperVal == upperSlider.max) {
  //       lowerSlider.value = parseInt(upperSlider.max) - 4;
  //     }
  //   }
  //   document.querySelector('#one').value = this.value
  // };

  lower.oninput = function () {
    lower_output.innerHTML = this.value;
  };
  upper.oninput = function () {
    upper_output.innerHTML = this.value;
  };

  //匯入tag的版型
  const mktSearch2TagImport = (t) => {
    return `
    <div class="mktSearch_tag_row">
    <span>#${t.tagName1}</span>
    <span>#${t.tagName2}</span></div>`;
  }
  const mktSearch3TagImport = (t) => {
    return `
    <div class="mktSearch_tag_row">
    <span>#${t.tagName1}</span>
    <span>#${t.tagName2}</span>
    <span>#${t.tagName3}</span></div>`;
  }

  const mktSearchTags = document.querySelector("#aside_mktSearch_tags_container");

  //Tag假資料，之後需要用AJAX帶入真的假資料
  let mktSearchTagFakeDate2 = [
    {
      tagName1: "美妝用品",
      tagName2: "運動用品",
    },
  ];
  let mktSearchTagFakeDate3 = [
    {
      tagName1: "你先拿我OK",
      tagName2: "毛小孩最愛",
      tagName3: "小朋友長大了",
    },
  ];
  //把Tag假資料匯入div中
  mktSearchTagFakeDate2.map(
    (e, index) => {
      mktSearchTags.innerHTML += mktSearch2TagImport(e);
    }
  )
  mktSearchTagFakeDate3.map(
    (e, index) => {
      mktSearchTags.innerHTML += mktSearch3TagImport(e);
    }
  )
  mktSearchTagFakeDate2.map(
    (e, index) => {
      mktSearchTags.innerHTML += mktSearch2TagImport(e);
    }
  )
  mktSearchTagFakeDate2.map(
    (e, index) => {
      mktSearchTags.innerHTML += mktSearch2TagImport(e);
    }
  )
  mktSearchTagFakeDate3.map(
    (e, index) => {
      mktSearchTags.innerHTML += mktSearch3TagImport(e);
    }
  )

  const mktSearch_Location = document.querySelector("#mktSearch_location");
  const mktSearchLocationImport = (t) => {
    return `
    ${t.fLocation}, ${t.fCity}`;
  }

  let mktSearchLocationFakeData = [
    {
      fLocation: "大安區",
      fCity: "台北市",
    },
  ];

  mktSearchLocationFakeData.map(
    (e, index) => {
      mktSearch_Location.value = mktSearchLocationImport(e);
    }
  )

  const mktSearch_delivery = document.querySelector(".mktSearch_delivery_container");
  const mktSearchDeliveryImport = (t) => {
    return `
  <div><input type="checkbox">${t.fDelivery}</div>`;
  }
  let mktSearchDeliveryFakeData = [
    {
      fDelivery: "面交",
    },
    {
      fDelivery: "宅配",
    },
    {
      fDelivery: "便利商店",
    },
  ];
  mktSearchDeliveryFakeData.map(
    (e, index) => {
      mktSearch_delivery.innerHTML += mktSearchDeliveryImport(e);
    }
  )

}
const MarketSearch = new ClsMarketSearch();