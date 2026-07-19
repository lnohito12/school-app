"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "@/lib/task";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    
    const saved: Task[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const now = new Date();

    const updatedTasks: Task[] = [];
     saved.forEach((task) => {
      if (
        task.weekly &&
        task.completed &&
        task.lastCompletedAt
      ) {
        const last = new Date(task.lastCompletedAt);
        const diff =
          now.getTime() - last.getTime();

        if (diff >= 7 * 24 * 60 * 60 * 1000) {
          updatedTasks.push({
            ...task,
            id: Date.now() + Math.random(),
            completed: false,
            deadline: new Date(
              new Date(task.deadline).getTime() +
                7 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .slice(0, 16),
            createdAt: new Date().toISOString(),
            lastCompletedAt: undefined,
          });
        } else {
          updatedTasks.push(task);
        }
      } else {
        updatedTasks.push(task);
      }
    });
        updatedTasks.sort(
      (a, b) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime()
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  }, []);
useEffect(() => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}, []);
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(newTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(newTasks)
    );
  };

  const completeTask = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      return {
        ...task,
        completed: !task.completed,
        lastCompletedAt: !task.completed
          ? new Date().toISOString()
          : undefined,
      };
    });

    setTasks(newTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(newTasks)
    );
  };

  const getDeadlineText = (deadline: string) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const due = new Date(deadline);

    due.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (due.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) return "❌ 締切超過";
    if (diff === 0) return "🔴 今日締切";
    if (diff === 1) return "🟠 あと1日";

    return `🟢 あと${diff}日`;
  };
  const todayTasks = tasks.filter(
  (task) =>
    getDeadlineText(task.deadline) === "🔴 今日締切"
);
const notificationEnabled =
  typeof window !== "undefined" &&
  localStorage.getItem("notification") !== "false";

useEffect(() => {
  if (!notificationEnabled) return;

  if (Notification.permission !== "granted") return;

  if (todayTasks.length > 0) {
    new Notification("📚 今日締切の課題があります！", {
      body: `${todayTasks.length}件の課題があります。`,
    });
  }
}, [todayTasks, notificationEnabled]);

  

  return (
    <main
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>📋 課題一覧</h1>
      {todayTasks.length > 0 && (
  <div
    style={{
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "12px",
      borderRadius: "12px",
      marginBottom: "20px",
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    🔔 今日締切の課題が {todayTasks.length} 件あります！
  </div>
)}
            <Link href="/add-task">
        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          ➕ 課題を追加
        </button>
      </Link>

      {tasks.length === 0 ? (
        <p>課題はありません。</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "none",
              borderRadius: "18px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              padding: "12px",
              marginBottom: "12px",
              opacity: task.completed ? 0.6 : 1,
transition: "0.3s",
            }}
          >
            <h3
  style={{
    fontSize: "22px",
    marginBottom: "12px",
    color: "#1f2937",
  }}
>
              {task.completed ? "✅ " : ""}
              {task.title}
            </h3>

            <p
  style={{
    color: "#555",
    margin: "8px 0",
  }}
>
  📚 {task.subject}
</p>

            <p
  style={{
    color: "#555",
    margin: "8px 0",
  }}
>
  📅 {task.deadline}
</p>

            <p
  style={{
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "bold",
    background:
      getDeadlineText(task.deadline).includes("今日")
        ? "#fee2e2"
        : getDeadlineText(task.deadline).includes("超過")
        ? "#fecaca"
        : getDeadlineText(task.deadline).includes("あと1日")
        ? "#ffedd5"
        : "#dcfce7",
    color:
      getDeadlineText(task.deadline).includes("今日")
        ? "#dc2626"
        : getDeadlineText(task.deadline).includes("超過")
        ? "#991b1b"
        : getDeadlineText(task.deadline).includes("あと1日")
        ? "#ea580c"
        : "#15803d",
  }}
>
  {getDeadlineText(task.deadline)}
</p>

            <p
              style={{
                color: task.weekly ? "#0a7" : "#666",
                fontWeight: "bold",
              }}
            >
              {task.weekly
                ? "🔁 毎週課題（自動更新）"
                : "📄 単発課題"}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
justifyContent: "space-between",
              }}
            >
              <button
                onClick={() =>
                  router.push(`/edit-task/${task.id}`)
                }
                style={{
  minWidth: "100px",
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
}}
              >
                ✏️ 編集
              </button>

              <button
                onClick={() => completeTask(task.id)}
               style={{
  minWidth: "100px",
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
}}
              >
                {task.completed
                  ? "↩ 元に戻す"
                  : "✅ 完了"}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
  minWidth: "100px",
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
}}
              >
                🗑 削除
              </button>
            </div>
          </div>
        ))
      )}
      <Link href="/">
        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          ← ホームへ戻る
        </button>
      </Link>
    </main>
  );
}