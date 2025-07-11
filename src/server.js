const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ミドルウェア設定
app.use(cors());
app.use(bodyParser.json());

// MySQL接続設定
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shimasql1031!', // MySQLのrootパスワードに置き換えてください
  database: 'checklist_app',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL接続エラー: ', err);
    return;
  }
  console.log('MySQLに接続しました');
});

// APIエンドポイント: 全てのチェックリスト項目を取得
app.get('/checklist', (req, res) => {
  const sql = 'SELECT * FROM checklist';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// APIエンドポイント: 新しい項目を追加
app.post('/checklist', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO checklist (name, checked) VALUES (?, false)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.json({ id: result.insertId, name, checked: false });
  });
});

// APIエンドポイント: 項目のチェック状態を切り替え
app.put('/checklist/:id', (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;
  const sql = 'UPDATE checklist SET checked = ? WHERE id = ?';
  db.query(sql, [checked, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.sendStatus(200);
  });
});

// APIエンドポイント: 項目を削除
app.delete('/checklist/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM checklist WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.sendStatus(200);
  });
});

// サーバー起動
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});
