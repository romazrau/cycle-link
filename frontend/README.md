## 環境布置
+ 請先`npm install`。

### 直接啟動
+ vs code套件的live server啟動根目錄的index.html

### 使用babel與webpack功能
1. 複製一份html檔放入build/。
1. 將html的js引用檔案改成build.js。
1. `npm run dev`啟動webpack-dev-server(WDS)。
1. WDS參考src/*.js自動生成bundle.js到build/底下，並持續自動更新直到關閉WDS。
