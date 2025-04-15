import { useState } from 'react';

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent';
}

interface Student {
  id: number;
  name: string;
  courseId: number;
  attendanceRecords: AttendanceRecord[];
}

interface Course {
  id: number;
  name: string;
}

export default function AttendanceTracker() {
  const courses: Course[] = [
    { id: 1, name: "Intro to CS" },
    { id: 2, name: "Data Structures" },
    { id: 3, name: "Web Dev" },
  ];

  const initialStudents: Student[] = [
    {
      id: 1,
      name: "Alice Johnson",
      courseId: 1,
      attendanceRecords: [
        { date: "2025-04-10", status: "Present" },
        { date: "2025-04-12", status: "Present" },
        { date: "2025-04-14", status: "Absent" },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      courseId: 1,
      attendanceRecords: [
        { date: "2025-04-10", status: "Present" },
        { date: "2025-04-12", status: "Absent" },
        { date: "2025-04-14", status: "Present" },
      ],
    },
    {
      id: 3,
      name: "Charlie Brown",
      courseId: 1,
      attendanceRecords: [
        { date: "2025-04-10", status: "Absent" },
        { date: "2025-04-12", status: "Absent" },
        { date: "2025-04-14", status: "Present" },
      ],
    },
    {
      id: 4,
      name: "Diana Prince",
      courseId: 2,
      attendanceRecords: [
        { date: "2025-04-10", status: "Present" },
        { date: "2025-04-13", status: "Present" },
      ],
    },
    {
      id: 5,
      name: "Ethan Hunt",
      courseId: 2,
      attendanceRecords: [
        { date: "2025-04-10", status: "Absent" },
        { date: "2025-04-13", status: "Present" },
      ],
    },
    {
      id: 6,
      name: "Fiona Apple",
      courseId: 3,
      attendanceRecords: [
        { date: "2025-04-11", status: "Present" },
      ],
    },
  ];

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedCourse, setSelectedCourse] = useState<number>(1);
  const [todayDate, setTodayDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredStudents = students.filter(student => {
    const courseMatch = student.courseId === selectedCourse;
    const searchMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return courseMatch && searchMatch;
  });

  const calculateAttendance = (student: Student): number => {
    const totalRecords = student.attendanceRecords.length;
    const presentCount = student.attendanceRecords.filter(record => record.status === "Present").length;
    return totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;
  };

  const markAttendance = (studentId: number, status: "Present" | "Absent") => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        const todayRecord = student.attendanceRecords.find(record => record.date === todayDate);
        if (todayRecord) {
          return {
            ...student,
            attendanceRecords: student.attendanceRecords.map(record =>
              record.date === todayDate ? { ...record, status } : record
            )
          };
        } else {
          return {
            ...student,
            attendanceRecords: [...student.attendanceRecords, { date: todayDate, status }]
          };
        }
      }
      return student;
    }));
  };

  const getTodayStatus = (student: Student): string => {
    const todayRecord = student.attendanceRecords.find(record => record.date === todayDate);
    return todayRecord ? todayRecord.status : "Not Marked";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">Student Attendance</h1>
      
      <div className="flex flex-col mb-4 space-y-2">
        <div className="flex gap-2">
          <select 
            className="p-1 border"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(Number(e.target.value))}
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
          
          <input 
            type="date" 
            className="p-1 border"
            value={todayDate}
            onChange={(e) => setTodayDate(e.target.value)}
          />
        </div>
        
        <input 
          type="text" 
          className="p-1 border"
          placeholder="Search student..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-1 text-left">Name</th>
            <th className="border p-1 text-left">Status</th>
            <th className="border p-1 text-left">Attendance</th>
            <th className="border p-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={4} className="border p-2 text-center text-gray-500">
                No students found.
              </td>
            </tr>
          ) : (
            filteredStudents.map(student => {
              const attendancePercentage = calculateAttendance(student);
              const todayStatus = getTodayStatus(student);
              
              return (
                <tr key={student.id}>
                  <td className="border p-1">{student.name}</td>
                  <td className="border p-1">
                    <span className={`px-1 py-0.5 text-xs ${
                      todayStatus === "Present" ? "bg-green-100" :
                      todayStatus === "Absent" ? "bg-red-100" :
                      "bg-gray-100"
                    }`}>
                      {todayStatus}
                    </span>
                  </td>
                  <td className="border p-1">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 h-2 mr-1">
                        <div 
                          className={`h-2 ${
                            attendancePercentage >= 75 ? "bg-green-500" :
                            attendancePercentage >= 50 ? "bg-yellow-500" :
                            "bg-red-500"
                          }`}
                          style={{ width: `${attendancePercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{attendancePercentage}%</span>
                    </div>
                  </td>
                  <td className="border p-1">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => markAttendance(student.id, "Present")}
                        className="px-1 bg-green-100 text-green-800 text-xs"
                      >
                        Present
                      </button>
                      <button 
                        onClick={() => markAttendance(student.id, "Absent")}
                        className="px-1 bg-red-100 text-red-800 text-xs"
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="border p-2">
          <p className="text-xs">Total</p>
          <p className="font-bold">{students.filter(s => s.courseId === selectedCourse).length}</p>
        </div>
        
        <div className="border p-2">
          <p className="text-xs">Present</p>
          <p className="font-bold text-green-600">
            {students.filter(s => 
              s.courseId === selectedCourse && 
              s.attendanceRecords.some(r => r.date === todayDate && r.status === "Present")
            ).length}
          </p>
        </div>
        
        <div className="border p-2">
          <p className="text-xs">Absent</p>
          <p className="font-bold text-red-600">
            {students.filter(s => 
              s.courseId === selectedCourse && 
              s.attendanceRecords.some(r => r.date === todayDate && r.status === "Absent")
            ).length}
          </p>
        </div>
      </div>
    </div>
  );
}