function ClsSignUp() {

//生日時間 ----------------------------------------------------------------
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


  document.querySelectorAll("#signUp_dateYear, #signUp_dateMM").forEach((e) => {
    e.addEventListener("change", () => {
      let yy = document.getElementById("signUp_dateYear").value;
      let mm = document.getElementById("signUp_dateMM").value;
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
const Signup = new ClsSignUp();



