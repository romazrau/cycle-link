## 使用
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
3. `npm start`
4. Have nice day!
