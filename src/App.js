// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Modal from "./Modal";

// build 時に .env.production/.env.development から埋め込まれます。
const API_BASE = process.env.REACT_APP_API_URL || "";

// Axios 全体設定
axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = false; // クッキー不要に

// 保存済みトークンがあればヘッダーにセット
const savedToken = localStorage.getItem("jwtToken");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

const ProtectedRoute = ({ element }) => {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(() => setOk(true))
      .catch(() => setOk(false));
  }, []);

  if (ok === null) return null; // ローディング中は何も描画しない
  return ok ? element : <Navigate to="/login" replace />;
};

function App() {
  const [facility, setFacility]     = useState('galleria');
  const [checklist, setChecklist]   = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fieldLabelsMap = {
    galleria: {
      stayed:      "滞在済み",
      checked_out: "チェックアウト済み",
      bussing:     "バッシング",
      amenities:   "アメニティ・リネン",
      washing:     "洗い物",
      bed_making:  "ベッドメイク",
      bath_toilet: "風呂トイレ",
      vacuum:      "掃除機",
      finishing:   "仕上げ",
      final_check: "最終チェック",
      today_used:  "今日使用"
    },
    terrace: {
      checked_out: "チェックアウト済み",
      stayed:      "滞在済み",
      bussing:     "バッシング",
      bath_toilet: "風呂・トイレ",
      sheets:      "シーツ",
      finishing:   "仕上げ",
      onsen_start: "温泉開始",
      onsen_stop:  "温泉止め",
      final_check: "最終チェック",
      today_used:  "当日使用"
    }
  };

  const fieldLabels = fieldLabelsMap[facility];

  // 初期データ取得
  useEffect(() => {
        axios
          .get(`/api/checklist?facility=${facility}`)
          .then(res => setChecklist(Array.isArray(res.data) ? res.data : []))
          .catch(() => setChecklist([]));
      }, [facility]);

  // モーダルを開く
  const handleItemClick = item => {
    setModalData({ id: item.id, name: item.name, fields: fieldLabels, values: item });
    setIsModalOpen(true);
  };

  // フィールド更新
  const handleFieldChange = (field, value) => {
    if (!modalData) return;
    const exclusive = ["stayed", "checked_out", "final_check"];
    const updated = { ...modalData.values };
    if (exclusive.includes(field) && value) {
      exclusive.forEach(k => (updated[k] = k === field));
    } else {
      updated[field] = value;
    }

    Promise.all(
      Object.entries(updated).map(([k, v]) =>
        modalData.values[k] !== v
          ? axios.put(`/api/checklist/update-field/${modalData.id}`, { field: k, value: v })
          : Promise.resolve()
      )
    )
      .then(() => {
        setChecklist(prev => prev.map(it => (it.id === modalData.id ? { ...it, ...updated } : it)));
        setModalData(prev => (prev ? { ...prev, values: updated } : prev));
      })
      .catch(err => console.error("❌ Error updating fields:", err));
  };

  // 「滞在済み」ボタンのトグル
  const toggleStayed = id => {
    const item = checklist.find(c => c.id === id);
    if (!item) return;
    const newVal = !item.stayed;
    const exclusive = ["stayed", "checked_out", "final_check"];
    const updated = {};
    exclusive.forEach(k => { updated[k] = k === "stayed" ? newVal : false; });

    Promise.all(
      Object.entries(updated).map(([k, v]) =>
        axios.put(`/api/checklist/update-field/${id}`, { field: k, value: v })
      )
    )
      .then(() => setChecklist(prev => prev.map(it => (it.id === id ? { ...it, ...updated } : it))))
      .catch(err => console.error("❌ Error toggling stayed:", err));
  };

  // 「今日使用」アイコンのトグル
  const toggleTodayUsed = (id, newVal) => {
    axios
      .put(`/api/checklist/update-field/${id}`, { field: "today_used", value: newVal })
      .then(() => setChecklist(prev => prev.map(it => (it.id === id ? { ...it, today_used: newVal } : it))))
      .catch(err => console.error("❌ Error toggling today_used:", err));
  };

  // 各アイテムの背景色
  const getBackgroundColor = item => {
    if (item.checked_out) return "pink";
    if (item.final_check) return "darkgreen";
    if (item.stayed) return "orange";
    return "lightgray";
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <div className="app-container">
                   <div className="facility-switch">
              <button
                className={facility === 'galleria' ? 'active' : ''}
                onClick={() => setFacility('galleria')}
              >
                ガレリア
              </button>
              <button
                className={facility === 'terrace' ? 'active' : ''}
                onClick={() => setFacility('terrace')}
              >
                テラス
              </button>
            </div>
                  <h1 className="app-title">G-Room</h1>
                  <ul className="checklist">
                    {checklist.length > 0 ? (
                      checklist.map(item => (
                        <li
                          key={item.id}
                          className="checklist-item"
                          style={{ backgroundColor: getBackgroundColor(item) }}
                        >
                          <div
                            className="room-info"
                            onClick={() => handleItemClick(item)}
                          >
                            <span>{item.name}</span>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                toggleStayed(item.id);
                              }}
                              style={{
                                backgroundColor: item.stayed ? "orange" : "#ccc",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer"
                              }}
                            >
                              滞在済み
                            </button>
                            <div className="status-lamps">
                              {Object.keys(fieldLabels)
                                .filter(f => !["checked_out","final_check","stayed","today_used"].includes(f))
                                .map(f => (
                                  <div
                                    key={f}
                                    className="lamp"
                                    style={{
                                      backgroundColor: item[f] ? "lightgreen" : "gray"
                                    }}
                                  />
                                ))}
                            </div>
                            <div
                              onClick={e => {
                                e.stopPropagation();
                                toggleTodayUsed(item.id, !item.today_used);
                              }}
                              style={{
                                cursor: "pointer",
                                fontSize: "20px",
                                paddingLeft: "10px"
                              }}
                              title="当日使用"
                            >
                              {item.today_used ? "🛏️" : "🛌"}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>チェックリストのデータが取得できませんでした。</p>
                    )}
                  </ul>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    data={modalData}
                    onFieldChange={handleFieldChange}
                  />
                </div>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


