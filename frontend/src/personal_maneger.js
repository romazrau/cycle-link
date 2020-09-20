function ClsPersonalManeger() {


    document.querySelectorAll(".personalManager_right_title_btn").forEach(item => {
        item.addEventListener("click", function(e){
            document.querySelectorAll(".personalManager_right_content").forEach( page => {
                page.classList.add("hide");
            } );

            document.querySelector(`#${e.currentTarget.dataset.pageId}`).classList.remove("hide");
        })
    })



    // rander 畫面
    const renderPersonalDetail = async () => {
        try {

            let response = await fetch(serverURL.userDetail, {
                method: "GET",
                cache: "no-cache", // 不准使用快取
                headers: {
                    // *攜帶 http request headers
                    Authorization: localStorage.getItem("Cycle link token"), // *這個屬性帶 JWT
                },
            });
            let result = await response.json();

            // console.log("+++++++++++++++++++");
            // console.log(result);
            document.querySelector("#personal-manege-img").src = serverURL.root + "/" + result.data.fPhotoPath;
            document.querySelector("#personal-manege-name").innerHTML = result.data.fName;
            document.querySelector("#personal-manege-account").innerHTML = result.data.fAccount;
            document.querySelector("#personal-manege-coin").innerHTML = result.data.fCoins;
            document.querySelector("#personal-manege-act-count").innerHTML = result.data.fActiviteCount;
            document.querySelector("#personal-manege-account-type").innerHTML = result.data.fAccountType;
            document.querySelector("#personal-manege-act-int-count").innerHTML = result.data.fActiviteInterestCount;
            document.querySelector("#personal-manege-com-count").innerHTML = result.data.fCommunityCount;



            document.querySelector("#personal-maneger-input-name").value = result.data.fName;
            document.querySelector("#personal-maneger-input-birth").value = result.data.fBirthdate;
            document.querySelector("#personal-maneger-input-email").value = result.data.fMail;
            document.querySelector("#personal-maneger-input-address").value = result.data.fCity;
            document.querySelector("#personal-maneger-input-phone").value = result.data.fCeilphoneNumber;
            document.querySelector("#personal-maneger-input-introduction").value = result.data.fIntroduction;

        } catch (ex) {
            console.log(ex);
        }
    }



    // 社團文字樣板
    let data2CommunitiesCard = (o) => {
        return `
        <a class="personalManager_right_content_info" href="#community/detail/${o.fCommunityId}">
        <img class="personalManager_right_content_info_img" src="${serverURL.root}/${o.fImgPath}">
        <div class="personalManager_right_content_infoText">
            <h3>${o.fName}</h3>
            <p><i class="fas fa-clock fa-2x"></i>成立時間：${o.fDate}</p>
        </div>
        </a>
        `;
    }

    // 活動文字樣板
    const ActivityCardPersonal = (o) => {

        return  `<a href="#activity/detail/${o.fActivityId}" class=" personalManager_right_content_info">
                    <img class="personalManager_right_content_info_img" src="${serverURL.root}/${o.fImgPath}">
                    <div class="personalManager_right_content_infoText">
                        <h3>${o.fActName}</h3>
                        <p><i class="fas fa-map-marker-alt fa-2x"></i>地點：台北河濱</p>
                        <p><i class="fas fa-clock fa-2x"></i>開始時間：${o.fActivityDate}</p>
                        <p><img src="img/海龜幣.png" alt="" class="personalManager_SeaTurtleCoin">活動等級：${o.fAttestName || "--"}</p>
                    </div>
                </a>
                 `;
    }

    const renderCommunities = async () => {
        try {
            let response = await fetch(serverURL.communityList, {
                method: "GET", // http request method
                //token
                headers: {
                    Authorization: localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();
            if (!result.result) {
                alert(result.msg);
                return;
            }

            let CommunityManager = document.querySelector("#ItemContainerCommunityManager");
            let Community = document.querySelector("#ItemContainerCommunity")
            CommunityManager.innerHTML = "";
            Community.innerHTML = "";

            result.data.forEach((o) => {
                // console.log(o);
                if (o.fAccessRightId == 3) {
                    // document.querySelector("#ItemContainerCommunityManager").innerHTML += "NO";
                    CommunityManager.innerHTML += data2CommunitiesCard(o);
                    // console.log("++++++++++++++++++++++++++++++");  
                } else {
                    //  document.querySelector("#ItemContainerCommunity").innerHTML += "OK";
                    Community.innerHTML += data2CommunitiesCard(o);
                    // console.log("-----------------------");

                }
            });

            if (CommunityManager.innerHTML === "") {
                CommunityManager.innerHTML = `<div class="personal-maneger-com-card">沒有管理的社團喔</div>`
            }

            if (Community.innerHTML === "") {
                Community.innerHTML = `<div class="personal-maneger-com-card">快去加入社團吧</div>`
            }
        } catch (ex) {
            alert("連線錯誤");
            console.log(ex);
            return;
        }

    }

    const renderActivity = async () => {
        try {
            let response = await fetch(serverURL.personalPages, {
                method: "GET", // http request method
                //token
                headers: {
                    Authorization: localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();

            console.log("個人參加活動列表-----------");
            console.log(result);

            //喜愛的活動
            let likeContainer = document.querySelector("#likeContainer");
            likeContainer.innerHTML = "";
            for (let i = 0; i < result.data.likes.length; i++) {
                likeContainer.innerHTML += ActivityCardPersonal(result.data.likes[i]);
            }
            if(!likeContainer.innerHTML){
                likeContainer.innerHTML = "<div class='personal-manager-txt'>沒有追蹤的活動喔</div>"
            }
            


             // 舉辦and 參加 
             let attendContainer = document.querySelector("#attendContainer");
            attendContainer.innerHTML = "";
            for (let i = 0; i < result.data.creates.length; i++) {
                // console.log("創建囉", result.data.creates[i]);
                attendContainer.innerHTML += ActivityCardPersonal(result.data.creates[i]);
            }
            for (let i = 0; i < result.data.attendedlist.length; i++) {
                // console.log("參加囉", result.data.attendedlist[i]);
                attendContainer.innerHTML += ActivityCardPersonal(result.data.attendedlist[i]);
            }
            if(!attendContainer.innerHTML){
                attendContainer.innerHTML = "<div class='personal-manager-txt'>趕快去參加活動吧</div>";
            }


            // 過期的活動
            let expiredattendedContainer = document.querySelector("#ExpiredattendedContainer");
            expiredattendedContainer.innerHTML = "";
            for (let i = 0; i < result.data.Expiredattended.length; i++) {
                expiredattendedContainer.innerHTML += ActivityCardPersonal(result.data.Expiredattended[i]);
            }
            if(!expiredattendedContainer.innerHTML){
                expiredattendedContainer.innerHTML = "<div class='personal-manager-txt'>沒有過去的活動</div>"
            }





        } catch (ex) {
            alert("連線錯誤");
            console.log(ex);
            return;
        }
    }
   





    // TODO  render 社團
    // 畫面更新放這裡
    this.render = () => {
        renderPersonalDetail();
        renderCommunities();
        renderActivity();
    }
}
const PersonalManeger = new ClsPersonalManeger();

const personalManegerHash = () => {
    if (location.hash === "#personal-maneger") {
        PersonalManeger.render();
    }
}


window.addEventListener("hashchange", personalManegerHash);
window.addEventListener("load", personalManegerHash);

