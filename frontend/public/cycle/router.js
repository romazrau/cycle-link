switch (hashTitle) {   //路由判斷
    case "second-hand":
        if (hashSplitArray[1] == "search") {   //開啟搜尋頁面
            document.querySelector(`#page_market-search`).classList.remove("hide");
            break;
        }

        document.querySelector(`#page_${hashTitle}`).classList.remove("hide");
        break;

}
