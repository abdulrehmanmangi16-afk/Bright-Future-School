// ============================
// ADMIN DASHBOARD
// ============================

let schoolStudents = JSON.parse(localStorage.getItem("students")) || [];

let schoolTeachers = [
  { id: "T001", name: "Sarah Ahmed", subject: "Mathematics" },
  { id: "T002", name: "Ali Raza", subject: "Physics" },
];

// ============================
// SIMPLE LOGIN
// ============================

const adminPassword = "admin123";

setTimeout(() => {
  const pass = prompt("Admin Panel Password:");
  if (pass !== adminPassword) {
    alert("Wrong Password");
    document.body.innerHTML =
      "<h1 style='text-align:center;margin-top:100px;'>Access Denied</h1>";
  } else {
    createAdminDashboard();
  }
}, 500);

// ============================
// CREATE DASHBOARD
// ============================

function createAdminDashboard() {
  const section = document.createElement("section");
  section.className = "admin-dashboard";
  section.innerHTML = `
    <h2>Admin Dashboard</h2>
    <div class="dashboard-stats">
      <div class="dashboard-card">
        <h3 id="studentCount">0</h3>
        <p>Students</p>
      </div>
      <div class="dashboard-card">
        <h3 id="teacherCount">0</h3>
        <p>Teachers</p>
      </div>
    </div>

    <div class="admin-form">
      <h3>Add Student</h3>
      <input type="text" id="studentName" placeholder="Student Name">
      <input type="text" id="studentRoll" placeholder="Roll Number">
      <input type="text" id="studentClass" placeholder="Class">
      <button onclick="addStudent()">Add Student</button>
    </div>

    <div class="admin-form">
      <h3>Add Teacher</h3>
      <input type="text" id="teacherName" placeholder="Teacher Name">
      <input type="text" id="teacherSubject" placeholder="Subject">
      <button onclick="addTeacher()">Add Teacher</button>
    </div>

    <div class="admin-form">
      <h3>Delete Student</h3>
      <input type="text" id="deleteRoll" placeholder="Roll Number">
      <button onclick="deleteStudent()">Delete Student</button>
    </div>

    <div class="admin-form">
      <h3>Search Student</h3>
      <input type="text" id="searchRoll" placeholder="Roll Number">
      <button onclick="adminSearchStudent()">Search</button>
    </div>

    <div id="adminResult"></div>
  `;
  document.body.appendChild(section);
  updateDashboard();
}

// ============================
// UPDATE COUNTS
// ============================

function updateDashboard() {
  document.getElementById("studentCount").innerText = schoolStudents.length;
  document.getElementById("teacherCount").innerText = schoolTeachers.length;
  localStorage.setItem("students", JSON.stringify(schoolStudents));
}

// ============================
// ADD STUDENT
// ============================

function addStudent() {
  const name = document.getElementById("studentName").value;
  const roll = document.getElementById("studentRoll").value;
  const studentClass = document.getElementById("studentClass").value;

  if (name === "" || roll === "" || studentClass === "") {
    alert("Fill all fields");
    return;
  }

  // Check if roll number already exists
  if (schoolStudents.some((s) => s.roll === roll)) {
    alert("Roll number already exists");
    return;
  }

  schoolStudents.push({
    roll: roll,
    name: name,
    class: studentClass,
    attendance: "100%",
    result: "Pending",
    fee: "Pending",
    timetable: "Mon-Fri",
  });

  updateDashboard();
  alert("Student Added Successfully");

  // Clear inputs
  document.getElementById("studentName").value = "";
  document.getElementById("studentRoll").value = "";
  document.getElementById("studentClass").value = "";
}

// ============================
// DELETE STUDENT
// ============================

function deleteStudent() {
  const roll = document.getElementById("deleteRoll").value;

  if (roll === "") {
    alert("Enter roll number to delete");
    return;
  }

  const initialLength = schoolStudents.length;
  schoolStudents = schoolStudents.filter((student) => student.roll !== roll);

  if (schoolStudents.length < initialLength) {
    updateDashboard();
    alert("Student Deleted Successfully");
    document.getElementById("deleteRoll").value = "";
  } else {
    alert("Student not found");
  }
}

// ============================
// ADD TEACHER
// ============================

function addTeacher() {
  const name = document.getElementById("teacherName").value;
  const subject = document.getElementById("teacherSubject").value;

  if (name === "" || subject === "") {
    alert("Fill all fields");
    return;
  }

  schoolTeachers.push({
    id: "T" + Math.floor(Math.random() * 10000),
    name: name,
    subject: subject,
  });

  updateDashboard();
  alert("Teacher Added Successfully");

  // Clear inputs
  document.getElementById("teacherName").value = "";
  document.getElementById("teacherSubject").value = "";
}

// ============================
// SEARCH STUDENT
// ============================

function adminSearchStudent() {
  const roll = document.getElementById("searchRoll").value;
  const student = schoolStudents.find((s) => s.roll === roll);
  const result = document.getElementById("adminResult");

  if (student) {
    result.innerHTML = `
      <div class="student-card">
        <h3>${student.name}</h3>
        <p><b>Roll:</b> ${student.roll}</p>
        <p><b>Class:</b> ${student.class}</p>
        <p><b>Attendance:</b> ${student.attendance}</p>
        <p><b>Result:</b> ${student.result}</p>
        <p><b>Fee:</b> ${student.fee}</p>
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
// END
// ============================
