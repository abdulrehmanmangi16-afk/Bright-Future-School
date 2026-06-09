// ============================
// SPLASH SCREEN
// ============================

window.onload = function () {
  setTimeout(() => {
    document.getElementById("splash-screen").style.opacity = "0";
    document.getElementById("splash-screen").style.transition = "0.5s ease";

    setTimeout(() => {
      document.getElementById("splash-screen").style.display = "none";
    }, 500);
  }, 2500);
};

// ============================
// SCHOOL MANAGEMENT SYSTEM
// ============================

// Fake Student Database
const students = [
  {
    roll: "1001",
    name: "Ahmed Ali",
    class: "Grade 10",
    attendance: "95%",
    result: "A+",
    fee: "Paid",
    timetable: "Mon-Fri 8AM-2PM",
  },
  {
    roll: "1002",
    name: "Sara Khan",
    class: "Grade 9",
    attendance: "92%",
    result: "A",
    fee: "Paid",
    timetable: "Mon-Fri 8AM-2PM",
  },
  {
    roll: "1003",
    name: "Hassan Raza",
    class: "Grade 8",
    attendance: "89%",
    result: "B+",
    fee: "Pending",
    timetable: "Mon-Fri 8AM-2PM",
  },
  {
    roll: "1004",
    name: "Ayesha Malik",
    class: "Grade 10",
    attendance: "97%",
    result: "A+",
    fee: "Paid",
    timetable: "Mon-Fri 8AM-2PM",
  },
  {
    roll: "1005",
    name: "Bilal Ahmed",
    class: "Grade 7",
    attendance: "90%",
    result: "A",
    fee: "Pending",
    timetable: "Mon-Fri 8AM-2PM",
  },
];

// Save Local Storage
if (!localStorage.getItem("students")) {
  localStorage.setItem("students", JSON.stringify(students));
}

// Load Students
const studentData = JSON.parse(localStorage.getItem("students"));

// ============================
// CREATE STUDENT PORTAL
// ============================

function createPortal() {
  const portal = document.createElement("section");
  portal.className = "student-portal";
  portal.innerHTML = `
    <h2>Student Portal</h2>
    <div class="portal-box">
      <input type="text" id="rollInput" placeholder="Enter Roll Number">
      <button onclick="searchStudent()">Search Student</button>
    </div>
    <div id="studentResult"></div>
  `;
  document.body.appendChild(portal);
}

// ============================
// SEARCH STUDENT
// ============================

function searchStudent() {
  const roll = document.getElementById("rollInput").value;
  const student = studentData.find((s) => s.roll === roll);
  const result = document.getElementById("studentResult");

  if (student) {
    result.innerHTML = `
      <div class="student-card">
        <h3>${student.name}</h3>
        <p><b>Roll No:</b> ${student.roll}</p>
        <p><b>Class:</b> ${student.class}</p>
        <p><b>Attendance:</b> ${student.attendance}</p>
        <p><b>Result:</b> ${student.result}</p>
        <p><b>Fee Status:</b> ${student.fee}</p>
        <p><b>Timetable:</b> ${student.timetable}</p>
      </div>
    `;
  } else {
    result.innerHTML = `
      <div class="student-card">
        <h3>Student Not Found</h3>
      </div>
    `;
  }
}

// ============================
// SCHOOL NOTICE BOARD
// ============================

const notices = [
  "Admissions Open For 2026",
  "Sports Day On 15 July",
  "Science Exhibition On 10 August",
  "Parent Teacher Meeting On 5 September",
];

function createNoticeBoard() {
  const section = document.createElement("section");
  section.className = "notice-board";
  let html = "<h2>School Notices</h2>";
  notices.forEach((notice) => {
    html += `<p>📢 ${notice}</p>`;
  });
  section.innerHTML = html;
  document.body.appendChild(section);
}

// ============================
// LIVE CLOCK
// ============================

function createLiveClock() {
  const clock = document.createElement("div");
  clock.id = "liveClock";
  document.body.appendChild(clock);

  setInterval(() => {
    const now = new Date();
    clock.innerHTML = "🕒 " + now.toLocaleTimeString();
  }, 1000);
}

// ============================
// STUDENT COUNTER
// ============================

function createStudentCounter() {
  const counter = document.createElement("div");
  counter.style.textAlign = "center";
  counter.style.margin = "20px";
  counter.style.fontSize = "20px";
  counter.style.color = "#0f3d91";
  counter.style.fontWeight = "600";
  counter.innerHTML = `👨‍🎓 Total Students: ${studentData.length}`;
  document.body.appendChild(counter);
}

// ============================
// ATTENDANCE REPORT
// ============================

function attendanceReport() {
  let total = 0;
  studentData.forEach((student) => {
    total += parseInt(student.attendance);
  });
  const avg = Math.round(total / studentData.length);
  console.log("Average Attendance: " + avg + "%");
}

// ============================
// RESULT REPORT
// ============================

function resultReport() {
  let aPlus = 0;
  studentData.forEach((student) => {
    if (student.result === "A+") {
      aPlus++;
    }
  });
  console.log("A+ Students: " + aPlus);
}

// ============================
// FEE REPORT
// ============================

function feeReport() {
  let pending = 0;
  studentData.forEach((student) => {
    if (student.fee === "Pending") {
      pending++;
    }
  });
  console.log("Pending Fees: " + pending);
}

// ============================
// INITIALIZE FEATURES
// ============================

document.addEventListener("DOMContentLoaded", function () {
  createPortal();
  createNoticeBoard();
  createLiveClock();
  createStudentCounter();

  // Generate Reports
  attendanceReport();
  resultReport();
  feeReport();

  // Welcome Message
  setTimeout(() => {
    alert("Welcome To Bright Future School Portal");
  }, 1000);
});
