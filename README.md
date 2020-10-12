# Cycle - Link

## 專案說明


😍 😍 😍 

---
## 執行環境:
+ OS: wiondow 10
+ SQL server 2019
+ node.js 10.15.3
+ npm 6.4.1

---
## 使用說明：
### 建立SQL server資料庫，
1. 前往 <a href="https://github.com/romazrau/SeaTurtleOnTheWay">此專案</a> ，從SQL資料夾裡依序執行 .sql 檔以建立資料庫。
2. `start.sql`
3. `typeDataCreate.sql`
4. `demoDataCreate.sql`

### 設定SQL server連線:
1. 開啟TCP/IP 協定: 電腦管理 > 服務與應用程式 > SQL server 網路組態 > 開啟TCP/IP 相關服務

2. 設定伺服器驗證: > 伺服器屬性 > 安全性 > SQL server及window驗證。
3. 準備一個指定SQL server用的

### 啟動後端伺服器
1. CMD / bash 到此資料夾(backend)。
2. `npm install`
3. 在此目錄新增 .env 檔案，設定環境變數: 
```
EMAIL_ACCOUNT=給予系統用的寄信信箱帳號
EMAIL_POSSWORD=給予系統用的信箱密碼
SQLSERVER_SERVER=localhost|指定SQL server URL
SQLSERVER_USER=sa|指定SQL server使用者
SQLSERVER_PASSWORD=指定SQL server使用者密碼
SQLSERVER_DATABASE=SeaTurtleOnTheWay|指定的資料庫
SQLSERVER_POST=1433|指定埠
JWT_SECRET=yourSECRET|指定加密字串
JWT_ALGORITHMS=HS256|指定加密方式
```
4. `npm start`
5. Have nice day!

### 開啟前端網頁
1. 以 VS code 開啟 資料夾 frontend
2. npm install
3. 即可從index.html瀏覽網頁
***

## 附註
為了讓使用者有更好體驗可以先登入

帳號 : JL1992

密碼 : web123456




