"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    const saved =
      localStorage.getItem("notification") ?? "true";

    setNotification(saved === "true");
  }, []);

  const changeNotification = (
    value: boolean
  ) => {
    setNotification(value);
    localStorage.setItem(
      "notification",
      String(value)
    );
  };

  return (
    <main
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>⚙️ 設定</h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "20px",
        }}
      >
        <h3>通知設定</h3>

        <label>
          <input
            type="checkbox"
            checked={notification}
            onChange={(e) =>
              changeNotification(
                e.target.checked
              )
            }
          />

          通知を有効にする
        </label>
      </div>

      <Link href="/">
        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          ← ホームへ戻る
        </button>
      </Link>
    </main>
  );
}