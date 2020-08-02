function ClsMarketSearch() {
  //price slide
  var slider = document.getElementById("price_range");
  var output = document.getElementById("price_value");
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}
const MarketSearch = new ClsMarketSearch();
