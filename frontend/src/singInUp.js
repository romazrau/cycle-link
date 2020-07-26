// switch sign up & sign in page
// function ClsSwithchSignInUpPage() {
//   let isPageInDisplay = true;
//   let pageIn = document.querySelector("#subPage_signIn");
//   let pageUp = document.querySelector("#subPage_signUp");

//   this.switch = (e) => {
//     e.preventDefault()
//     if (isPageInDisplay) {
//       pageIn.classList.add("hide");
//       pageUp.classList.remove("hide");
//     } else {
//       pageIn.classList.remove("hide");
//       pageUp.classList.add("hide");
//     }
//     isPageInDisplay = !isPageInDisplay;
//     console.group("Swithch SignInUp Page");

//     console.log("is PageIn Display:" + isPageInDisplay);
//     console.groupEnd();
//   };

//   document
//     .querySelector("#switch2signUp")
//     .addEventListener("click", this.switch);
//   document
//     .querySelector("#switch2signIn")
//     .addEventListener("click", this.switch);
// }
// const SwithchSignInUpPage = new ClsSwithchSignInUpPage();




//生日時間 ----------------------------------------------------------------
function ClsSelectBirthday() {
  let output = "";
  for (let i = 1; i <= 100; i++) {
    output += `<option value='${2020 - i}'>${2020 - i}</option>`;
  }
  document.querySelector("#signUp_dateYear").innerHTML = output;


  const updataDateDay = (day) => {
    // console.log(day);
    let output = "";
    for (let i = 1; i <= day; i++) {
      output += `<option value='${i}'>${i}</option>`;
    }
    document.querySelector("#signUp_dateDD").innerHTML = output;
  };
  updataDateDay(31);


  document.querySelectorAll("#dateYear, #dateMM").forEach((e) => {
    e.addEventListener("change", () => {
      let yy = document.getElementById("dateYear").value;
      let mm = document.getElementById("dateMM").value;
      console.log(yy, mm);
      if (mm == 2) {
        let date = new Date(`${yy}, ${mm}, 29`);
        if (date.getMonth() + 1 == mm) updataDateDay(29);
        else updataDateDay(28);
      } else {
        let date = new Date(`${yy}, ${mm}, 31`);
        if (date.getMonth() + 1 == mm) updataDateDay(31);
        else updataDateDay(30);
      }
    });
  });
}
const SelectBirthday = new ClsSelectBirthday();



