function ClsNewDetial() {
  function boxMove2(y) {
    // console.log(y);
    box = document.querySelector(".newsDe_writer_info_left");
    box.style.marginTop = `${y}px`;
  }
  var last_known_scroll_position = 0;
  var ticking = false;

  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        boxMove2(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });
}
const NewDetial = new ClsNewDetial();
