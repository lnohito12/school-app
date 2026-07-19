"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/task";

export default function AddTaskPage() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [weekly, setWeekly] = useState(false);
  const [weekday, setWeekday] = useState(0);
useEffect(() => {
  const saved = JSON.parse(
    localStorage.getItem("timetable") || "[]"
  );

  const list  = [...new Set(saved.flat().filter(Boolean))] as string[];

  setSubjects(list);
}, []);
  return (
    <main
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>➕ 課題追加</h1>

      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>

      <select
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  style={inputStyle}
  required
>
  <option value="">科目を選択</option>

  {subjects.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>  

        <input
          placeholder="課題名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={inputStyle}
          required
        />

        <label
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={weekly}
            onChange={(e) => setWeekly(e.target.checked)}
          />

          毎週の課題
        </label>
{weekly && (
  <select
    value={weekday}
    onChange={(e) => setWeekday(Number(e.target.value))}
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "15px",
    }}
  >
    <option value={0}>月曜日</option>
    <option value={1}>火曜日</option>
    <option value={2}>水曜日</option>
    <option value={3}>木曜日</option>
    <option value={4}>金曜日</option>
    <option value={5}>土曜日</option>
    <option value={6}>日曜日</option>
  </select>
)}
        
          <button
  onClick={() => {
    const tasks: Task[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );

    tasks.push({
      id: Date.now(),
      subject,
      title,
      deadline,
      weekly,
      weekday,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    router.push("/tasks");
  }}
  style={{
    padding: "15px",
    borderRadius: "10px",
  }}
>
  保存
</button>

        <Link href="/tasks">
          <button
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            ← 課題一覧へ戻る
          </button>
        </Link>

      </div>
    </main>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  width: "100%",
};