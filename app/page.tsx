"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        padding: "25px",
        background: "#f5f7fb",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginBottom: "8px",
        }}
      >
        📚 School App
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "35px",
        }}
      >
        課題・時間割をまとめて管理
      </p>

      <div
        style={{
          display: "grid",
          gap: "18px",
        }}
      >
        <Link href="/timetable">
          <button style={buttonStyle}>
            📅 時間割
          </button>
        </Link>

        <Link href="/tasks">
          <button style={buttonStyle}>
            📋 課題一覧
          </button>
        </Link>

        <Link href="/add-task">
          <button style={buttonStyle}>
            ➕ 課題追加
          </button>
        </Link>
        <Link href="/settings">
  <button style={buttonStyle}>
    ⚙️ 設定
  </button>
</Link>
      </div>

      <div
        style={{
          marginTop: "45px",
          padding: "18px",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
          }}
        >
          💡 今日やること
        </h3>

        <p
          style={{
            marginBottom: 0,
            color: "#666",
          }}
        >
          課題一覧から締切を確認しましょう。
        </p>
      </div>
    </main>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "20px",
  borderRadius: "16px",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  border: "none",
  background: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
};