function ClsPersonalPage(){
    this.openClass= function(evt, className) {
        var i, x, tablinks;
        x = document.getElementsByClassName("personal_class");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("personal_tablink");
        for (i = 0; i < x.length; i++) {
            tablinks[i].classList.remove("personal_barcolor");
        }
        document.getElementById(className).style.display = "block";
        evt.currentTarget.classList.add("personal_barcolor");
    }   
}
const PersonalPage = new ClsPersonalPage();
var mybtn = document.getElementsByClassName("personal_testbtn")[0];
    mybtn.click();