import './App.css';
import Login from './Components/login';
import { Routes,Route } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import StudentMessage from './Components/StudentComponents/StudentMessage';
import TeacherMessage from './Components/TeacherComponents/TeacherMessage';
import 'react-calendar/dist/Calendar.css';
import StudentDashboard from './Components/StudentComponents/StudentDashboard';
import TeacherDashboard from './Components/TeacherComponents/TeacherDashboard';
import AdminDashboard from './Components/AdminComponents/AdminDashboard';
import StudentMockExam from './Components/StudentComponents/StudentMockExam';
import TeacherMockExam from './Components/TeacherComponents/TeacherMockExam';
import StudentTutorialVideo from './Components/StudentComponents/StudentTutorialVideo';
import StudentClassCalander from './Components/StudentComponents/StudentClassCalander';
import TeacherClassCalander from './Components/TeacherComponents/TeacherClassCalander';
import StudentGradeBook from './Components/StudentComponents/StudentGradeBook';
import StudentIDE from './Components/StudentComponents/StudentIDE';
import AddStudent from './Components/AdminComponents/AddStudent';
import ConfigurePassword from './Components/ConfigurePassword';
import ForgotPassword from './Components/ForgotPassword';
import AddTeacher from './Components/AdminComponents/AddTeacher';
import EditStudent from './Components/AdminComponents/EditStudent';
import EditTeacher from './Components/AdminComponents/EditTeacher';
import ManageCourses from './Components/AdminComponents/ManageCourses';
import ShowCourse from './Components/AdminComponents/ShowCourse';
import AssignCourse from './Components/AdminComponents/AssignCourse';
import TeacherShowCourse from './Components/TeacherComponents/TeacherShowCourse';
import StudentShowCourse from './Components/StudentComponents/StudentShowCourse';
import TeacherGradeBook from './Components/TeacherComponents/TeacherGradeBook';

function App() {

  const token = sessionStorage.getItem("token");

  
  
  return (

    <div>

      {/* router.post('/', function(req, res) {
    // do something w/ req.body or req.files 
}); */}
      
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path='/ConfigurePassword'  element={<ConfigurePassword/>}/>
      <Route path='/ForgotPassword'  element={<ForgotPassword/>}/>
      </Routes>
      
       
        { token !== null ? 

<Routes>
        <Route path="/Student_Dashboard"  element={<StudentDashboard/>} />
        <Route path="/Teacher_Dashboard"  element={<TeacherDashboard/>} />
        <Route path="/Admin_Dashboard"  element={<AdminDashboard/>} />
        <Route path="/Student_Mockexam"  element={<StudentMockExam/>}/>
        <Route path='/Teacher_Mockexam'  element={<TeacherMockExam/>}/>
        <Route path='/TutorialVideo'  element={<StudentTutorialVideo/>}/>
        <Route path='/Student_Classcalander' element={<StudentClassCalander/>}/>
        <Route path="/Teacher_Classcalander"  element={<TeacherClassCalander/>}/>
        <Route path='/Student_Gradebook'  element={<StudentGradeBook/>}/>
        <Route path="/IDE"  element={<StudentIDE/>}/>
        <Route path="/StudentMessage"  element={<StudentMessage/>}/>
        <Route path="/TeacherMessage"  element={<TeacherMessage/>}/>
        <Route path="/Add Student"  element={<AddStudent/>}/>
        <Route path='/Add_Teacher'  element={<AddTeacher/>}/>
        <Route path='/Edit_teacher'  element={<EditTeacher/>}/>
        <Route path='/Edit_student'  element={<EditStudent/>}/>
        <Route path='/Manage_courses'  element={<ManageCourses/>}/>
        <Route path='/Show_Course'  element={<ShowCourse/>}/>
        <Route path='/Assign_Course'  element={<AssignCourse/>}/>
        <Route path='/Teacher/ShowCourse'  element={<TeacherShowCourse/>}/>
        <Route path='/Student/ShowCourse'  element={<StudentShowCourse/>}/>
        <Route path='Teacher_Gradebook' element={<TeacherGradeBook/>}/>
        </Routes>:
        <Routes>
      </Routes>
}
      

      </BrowserRouter>

    </div>
  );
}

export default App;
