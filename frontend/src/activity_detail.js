//用class包起來

function ClsActivityDetail() {
    function boxMove2(y) {
        // console.log(y);
        box = document.querySelector('.activity_detail_right')
        box.style.marginTop = `${y}px`;
    }
    var last_known_scroll_position = 0;
    var ticking = false;

    window.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY + 25;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                boxMove2(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });



    // 留言//
    //ONMOUSEOVER
    //get the btn element by id 
    let btnMessage = document.querySelector("#btnMessage");

    //binding it with onmouseover event
    // btnMessage.addEventListener("mouseover", getClsChange);
    //there are two css class massageTopButton and massageTopButton2
    btnMessage.addEventListener("mouseout", getClsChangeback);

    // function getClsChange() {
    //     btnMessage.className = "massageTopButton2";
    // }

    function getClsChangeback() {
        btnMessage.className = "massageTopButton";
    }

    //留言按鈕ONCLICK

    //btn element binding with click 
    btnMessage.addEventListener("click", showMessagebox);




    function showMessagebox() {
        //change the btn background
        getClsChangeback();

        //get the div "id="messageInputBox" and keep putting in innerHtml
        //怎麼重複利用訪者留言與插入>>createlement


        //這是要放進去的div
        let invisibleDiv = document.querySelector("#messageInputBoxCon");

        //createElement 訪者留言

        //創一個div
        let divOfMassage = document.createElement("div");
        divOfMassage.innerHTML =
            " <div class='lineInContainer'></div>\
<div class='massageBottomTop activity_detail_flex'>\
<div class='massageBottomImgDefault'>\
<img src='' alt=''>\
</div>\
<div class='massageBottomTopUser'>訪客</div>\
<div class='verticalBar'></div>\
<div class='massageBottomTopDate'>July 12</div>\
</div>\
<div class='divForInput'><input class='messageInputBox' id='messageInputBox' type='text'><br><button  id='btnMessageSent' class='btnMessageSent' type='button'>確定</button></div>";

        invisibleDiv.appendChild(divOfMassage);
        //這是留言方格
        document.querySelector("#messageInputBox").focus();
        getBtnSentChange();

        //call確認按鈕做事件綁定（包含把留言顯示）
        sentMassage();

    }




    //留言確定按鈕ONCLICK MOUSEOVER MOUSEOUT
    function getBtnSentChange() {


        let btnSent = document.querySelector("#btnMessageSent");

        //     btnSent.addEventListener("mouseover", btnSentClsChange);
        //     btnSent.addEventListener("mouseout", btnSentClsChangeBack);

        //     function btnSentClsChange() {
        //         btnSent.className = "btnMessageSent2";
        //     }

        //     function btnSentClsChangeBack() {
        //         btnSent.className = "btnMessageSent";
        //     }
    }
    //確認按鈕做事件綁定
    function sentMassage() {


        //這是留言方格
        let invisibleDiv = document.querySelector("#messageInputBoxCon");
        //新增一個div
        let massageInputDiv = document.createElement("div");
        //這是確認按鈕
        let btnSent = document.querySelector("#btnMessageSent");
        btnSent.addEventListener("click", putMassageOn);

        //把訊息顯示在留言框
        function putMassageOn() {
            //把留言放入div
            massageInputDiv.innerHTML = document.querySelector(".messageInputBox").value;
            invisibleDiv.appendChild(massageInputDiv);
            //加入class
            massageInputDiv.classList.add("inputAft");
            //刪除input tag(會再新增留言加進去以免被複寫)
            document.querySelector('.divForInput').remove();

            //!!把divForInput innderHtml置換成 留言<div>
            //!!!!!!!!!divForInput會抓到上一個留言的divForInput
            // document.querySelector(".divForInput").innerHTML=`<div class="inputAft">${inputMassage}</div>`;


            window.alert("留言成功！");
        }
    }

}
const ActivityDetail = new ClsActivityDetail();

// function ActivityChangeStatus() {
//     //  if 以登入 執行下列
//     let btn = document.getElementById("rightPartTop_button");
//     btn.disabled = true;
//     btn.style.backgroundColor = "#979494";
//     btn.style.color = "#D9AAB7";
//     btn.innerHTML = "審核中";

//     //else{加入會員}
// }