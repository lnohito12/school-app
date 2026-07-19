"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Task } from "@/lib/task";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [weekly, setWeekly] = useState(false);

  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );

    setTasks(savedTasks);

    const currentTask = savedTasks.find(
      (t) => t.id === Number(id)
    );

    if (currentTask) {
      setSubject(currentTask.subject);
      setTitle(currentTask.title);
      setDeadline(currentTask.deadline);
      setWeekly(currentTask.weekly);
    }

    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <p>読み込み中...</p>;
  }

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return <p>課題が見つかりません。</p>;
  }

  const saveTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === Number(id)
        ? {
            ...t,
            subject,
            title,
            deadline,
            weekly,
          }
        : t
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    router.push("/tasks");
  };

  return (
    <main
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>✏️ 課題編集</h1>

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="科目"
        style={inputStyle}
      />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="課題名"
        style={inputStyle}
      />

      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={inputStyle}
      />

      <label style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="checkbox"
          checked={weekly}
          onChange={(e) => setWeekly(e.target.checked)}
        />
        毎週の課題
      </label>

      <button
        onClick={saveTask}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        💾 保存
      </button>

      <Link href="/tasks">
        <button
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          ← 課題一覧へ戻る
        </button>
      </Link>
    </main>
  );
}