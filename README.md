# 🛏️ Checklist App - Frontend (React)

ホテル清掃スタッフ向けに開発した、客室の状態や清掃進捗を一目で管理できるチェックリストアプリのフロントエンドです。  
Reactを使って構築し、JWTによるログイン機能や、施設切り替え、状態アイコン表示などの機能を実装しています。

---

## 📸 スクリーンショット

![checklist-app-screenshot](./screenshot.png) <!-- 必要なら画像を追加 -->

---

## 🚀 デモ

🔗 [デモページを見る](https://your-demo-url.com)（※デプロイしている場合）

---

## 🔧 主な機能

- ✅ サインアップ／ログイン機能（JWT）
- 🏨 施設切り替え（例：ガレリア / テラス）
- 🛏️ 部屋ごとのチェックリスト表示と更新
- 🟢 清掃状態に応じた色分け・ステータスアイコン表示
- 🧾 モーダルで各タスクの個別チェックが可能
- 🍪 CookieではなくローカルストレージでJWT管理
- 🔒 認証が必要なページへのアクセス制限

---

## 🛠 使用技術

| 技術         | 内容                                         |
|--------------|----------------------------------------------|
| React        | UI構築                                       |
| React Router | ページルーティング                           |
| Axios        | API通信（JWTトークン付き）                   |
| CSS Modules  | スタイル（App.css, Modal.css など）          |
| LocalStorage | JWTトークン保存と自動認証ヘッダー設定       |

---

## 🏁 セットアップ手順（ローカル環境）

```bash
git clone https://github.com/Taichi412/checklist-frontend.git
cd checklist-frontend
npm install

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
