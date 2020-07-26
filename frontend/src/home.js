function ClsHome() {
  var k = 0;
  var img = new Array();
  img[0] = "img/A2.jpg";
  img[1] = "img/A1.jpg";

  function scrollPic() {
    if (k > img.length - 1) {
      k = 0;
    }
    for (var i = 0; i < img.length; i++) {
      if (i == k) {
        document.getElementById("A1").src = img[i];
      }
    }
    k++;
  }
  setInterval(scrollPic, 5000);
}
const Home = new ClsHome();
