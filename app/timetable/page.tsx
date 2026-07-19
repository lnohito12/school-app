"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DAYS = ["月", "火", "水", "木", "金"];
const PERIODS = [1, 2, 3, 4, 5];

export default function TimetablePage() {
  const [table, setTable] = useState<string[][]>(
    Array.from({ length: 5 }, () => Array(5).fill(""))
  );

  useEffect(() => {
    const saved = localStorage.getItem("timetable");

    if (saved) {
      setTable(JSON.parse(saved));
    }
  }, []);

  const saveTable = () => {
    localStorage.setItem(
      "timetable",
      JSON.stringify(table)
    );

    alert("時間割を保存しました！");
  };

  const updateCell = (
    row: number,
    col: number,
    value: string
  ) => {
    const newTable = [...table];

    newTable[row][col] = value;

    setTable(newTable);
  };

  return (
    <main
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        📅 時間割
      </h1>
            <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th></th>

            {DAYS.map((day) => (
              <th
                key={day}
                style={cellStyle}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {PERIODS.map((period, row) => (
            <tr key={period}>
              <td style={cellStyle}>
                {period}限
              </td>

              {DAYS.map((_, col) => (
                <td
                  key={col}
                  style={cellStyle}
                >
                  <input
                    value={table[row][col]}
                    onChange={(e) =>
                      updateCell(
                        row,
                        col,
                        e.target.value
                      )
                    }
                    placeholder="科目"
                    style={inputStyle}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveTable}
        style={buttonStyle}
      >
        💾 保存
      </button>
       <Link href="/">
        <button style={buttonStyle}>
          ← ホームへ戻る
        </button>
      </Link>
    </main>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "none",
  outline: "none",
  textAlign: "center" as const,
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "10px",
  marginTop: "20px",
  cursor: "pointer",
};