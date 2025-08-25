import React, { useState, useEffect } from "react";

export default function WeeklyTracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyTasks, setWeeklyTasks] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  useEffect(() => {
    // Sample tasks
    setWeeklyTasks({
      monday: [{ title: "Team meeting", completed: false }],
      tuesday: [{ title: "Work on feature", completed: false }],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    });
  }, []);

  const getWeekRange = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(start.setDate(diff));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return { weekStart, weekEnd };
  };

  const { weekStart, weekEnd } = getWeekRange(currentDate);

  const navigateWeek = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + dir * 7);
    setCurrentDate(newDate);
  };

  const addTask = (day) => {
    setWeeklyTasks((prev) => ({
      ...prev,
      [day]: [...prev[day], { title: "", completed: false }],
    }));
  };

  const updateTask = (day, index, value) => {
    setWeeklyTasks((prev) => ({
      ...prev,
      [day]: prev[day].map((task, i) =>
        i === index ? { ...task, title: value } : task
      ),
    }));
  };

  const toggleTask = (day, index) => {
    setWeeklyTasks((prev) => ({
      ...prev,
      [day]: prev[day].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const removeTask = (day, index) => {
    setWeeklyTasks((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const totalTasks = Object.values(weeklyTasks).flat().length;
  const completedTasks = Object.values(weeklyTasks)
    .flat()
    .filter((t) => t.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const isToday = (date) => date.toDateString() === new Date().toDateString();

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#333" }}>
          Weekly Tracker
        </h1>
        <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
          {formatDate(weekStart)} - {formatDate(weekEnd)}
        </div>
        <div style={{ marginTop: "15px" }}>
          <button onClick={() => navigateWeek(-1)} style={navBtnStyle}>
            ← Previous Week
          </button>
          <button onClick={() => navigateWeek(1)} style={navBtnStyle}>
            Next Week →
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "80%",
          margin: "0 auto 40px auto",
          background: "#e0e0e0",
          borderRadius: "10px",
          height: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "12px",
            background: "#ff69b4",
            transition: "width 0.3s",
          }}
        ></div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "40px", color: "#555" }}>
        {completedTasks}/{totalTasks} Tasks Completed
      </p>

      {/* Weekly Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {weekDays.map((day, idx) => {
          const tasks = weeklyTasks[day];
          const date = weekDates[idx];
          const completedCount = tasks.filter((t) => t.completed).length;
          const dayProgress =
            tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

          return (
            <div
              key={day}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <h4 style={{ textTransform: "capitalize", margin: 0 }}>
                  {day}
                </h4>
                <small style={{ color: "#999" }}>
                  {formatDate(date)} {isToday(date) && "(Today)"}
                </small>
                {tasks.length > 0 && (
                  <div
                    style={{
                      marginTop: "6px",
                      height: "6px",
                      background: "#e0e0e0",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${dayProgress}%`,
                        background: "#ff69b4",
                        height: "6px",
                        transition: "width 0.3s",
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Tasks */}
              {tasks.map((task, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(day, i)}
                    style={{ marginRight: "8px" }}
                  />
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTask(day, i, e.target.value)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontSize: "0.9rem",
                    }}
                  />
                  <button
                    onClick={() => removeTask(day, i)}
                    style={{
                      marginLeft: "5px",
                      background: "#ff6b6b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "2px 6px",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}

              <button
                onClick={() => addTask(day)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px dashed #ff69b4",
                  color: "#ff69b4",
                  background: "transparent",
                  cursor: "pointer",
                  marginTop: "5px",
                  fontWeight: "500",
                }}
              >
                + Add Task
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Button styling
const navBtnStyle = {
  margin: "0 5px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 500,
  transition: "0.2s",
};
