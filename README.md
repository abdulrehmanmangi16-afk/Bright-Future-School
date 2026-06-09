# 🎓 Bright Future School - School Management System

A modern, responsive school management website built with HTML, CSS, and JavaScript. Features include student portal, admin dashboard, notice board, and real-time clock.

## 📋 Features

### Main Website (`index.html`)
- **Splash Screen** - Animated loading screen with AR logo
- **Hero Section** - Welcome banner with call-to-action
- **Statistics** - Display of school stats (students, teachers, classrooms, awards)
- **About Section** - School information
- **Academic Programs** - Course offerings (Primary, Middle, Secondary)
- **Teachers Directory** - List of faculty members with experience
- **Student Records** - Interactive student table with attendance
- **Upcoming Events** - Event calendar
- **Parent Reviews** - Testimonials section
- **Contact Information** - School contact details
- **Student Portal** - Search student records by roll number
- **Notice Board** - Display school announcements
- **Live Clock** - Real-time clock display
- **Student Counter** - Total students count

### Admin Panel (`admin.html`)
- **Password Protected** - Admin authentication (Password: `admin123`)
- **Dashboard Stats** - View student and teacher counts
- **Add Student** - Create new student records
- **Add Teacher** - Add new teachers to the system
- **Delete Student** - Remove student records
- **Search Student** - Find students by roll number
- **Local Storage** - Persistent data storage

## 📁 Project Structure

```
Bright-Future-School/
├── index.html              # Main website
├── admin.html              # Admin dashboard
├── css/
│   └── style.css          # All styling (organized by sections)
├── js/
│   ├── script.js          # Main website functionality
│   └── admin.js           # Admin dashboard functionality
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Installation
1. Clone the repository:
```bash
git clone https://github.com/abdulrehmanmangi16-afk/Bright-Future-School.git
```

2. Navigate to the project directory:
```bash
cd Bright-Future-School
```

3. Open `index.html` in your web browser

### Accessing Admin Panel
1. Open `admin.html` in your browser
2. Enter password when prompted: **`admin123`**
3. Access dashboard features

## 📊 Features Breakdown

### Student Portal
- Search students by roll number
- View student details including:
  - Name
  - Roll number
  - Class
  - Attendance percentage
  - Academic result
  - Fee status
  - Timetable

### Admin Dashboard
- **Add Student** - Enter student name, roll number, and class
- **Add Teacher** - Enter teacher name and subject
- **Delete Student** - Remove student by roll number
- **Search Student** - Find and view student details
- Real-time dashboard stats update

### Data Persistence
- All student and teacher data is stored in browser's localStorage
- Data persists across browser sessions
- Default student database includes 5 sample records

## 🎨 Design Features

- **Modern UI** - Clean and professional design
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Color Scheme** - Professional blue (#0f3d91) and gold (#ffc107)
- **Animations** - Smooth transitions and hover effects
- **Accessibility** - Semantic HTML structure

## 📱 Responsive Breakpoints

- **Desktop** - Full layout
- **Tablet** (max-width: 768px) - Adjusted grid and navigation
- **Mobile** (max-width: 480px) - Optimized for small screens

## 🔐 Security Notes

- Default admin password: `admin123` (Change for production use)
- Data stored in localStorage (client-side only)
- Not suitable for production without backend implementation

## 📚 Sample Data

### Default Students:
| Roll No | Name | Class | Attendance |
|---------|------|-------|-----------|
| 1001 | Ahmed Ali | Grade 10 | 95% |
| 1002 | Sara Khan | Grade 9 | 92% |
| 1003 | Hassan Raza | Grade 8 | 89% |
| 1004 | Ayesha Malik | Grade 10 | 97% |
| 1005 | Bilal Ahmed | Grade 7 | 90% |

### Default Teachers:
- Sarah Ahmed (Mathematics) - 8 Years
- Ali Raza (Physics) - 10 Years
- Fatima Khan (English) - 6 Years
- Ahmed Hussain (Chemistry) - 7 Years
- Sana Malik (Biology) - 9 Years
- Bilal Shaikh (Computer Science) - 5 Years

## 🛠️ Technology Stack

- **Frontend** - HTML5, CSS3, Vanilla JavaScript
- **Storage** - Browser localStorage API
- **Fonts** - Google Fonts (Poppins)
- **Images** - Unsplash

## 📝 Usage Examples

### Adding a Student via Admin Panel
1. Open admin.html and authenticate
2. Fill in "Add Student" form:
   - Student Name: Ahmed Khan
   - Roll Number: 1011
   - Class: Grade 6
3. Click "Add Student"

### Searching Student Records
1. On main website, scroll to "Student Portal"
2. Enter student roll number (e.g., 1001)
3. Click "Search Student" to view details

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication system
- [ ] Marks management system
- [ ] Fee payment integration
- [ ] Parent notification system
- [ ] Student attendance tracking
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Database integration (MongoDB/MySQL)
- [ ] Real-time data sync

## 📞 Contact Information

**School Details:**
- 📞 Phone: +92 300 1234567
- 📧 Email: info@brightfuture.edu.pk
- 📍 Address: University Road, Karachi

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Abdul Rehman Mangi**
- GitHub: [@abdulrehmanmangi16-afk](https://github.com/abdulrehmanmangi16-afk)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please create an issue in the GitHub repository.

---

**Made with ❤️ for Education**
