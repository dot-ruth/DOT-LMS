import './App.css';
import Login from './Components/login';
import { Routes,Route } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Message from './Components/Message';
import Profile from './Components/Profile';
import 'react-calendar/dist/Calendar.css';
import StudentDashboard from './Components/StudentComponents/StudentDashboard';
import TeacherDashboard from './Components/TeacherComponents/TeacherDashboard';
<<<<<<< HEAD
=======
import AdminDashboard from './Components/AdminComponents/AdminDashboard';
>>>>>>> 1b760b3cfbed96f1638195b35e5a3866d6bed2a6
import StudentMockExam from './Components/StudentComponents/StudentMockExam';
import TeacherMockExam from './Components/TeacherComponents/TeacherMockExam';
import StudentTutorialVideo from './Components/StudentComponents/StudentTutorialVideo';
import StudentClassCalander from './Components/StudentComponents/StudentClassCalander';
import TeacherClassCalander from './Components/TeacherComponents/TeacherClassCalander';
import StudentGradeBook from './Components/StudentComponents/StudentGradeBook';
import StudentIDE from './Components/StudentComponents/StudentIDE';
<<<<<<< HEAD



=======
import AddStudent from './Components/AdminComponents/AddStudent';
>>>>>>> 1b760b3cfbed96f1638195b35e5a3866d6bed2a6

function App() {
  return (
    <div>
      {/* router.post('/', function(req, res) {
    // do something w/ req.body or req.files 
}); */}
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Student_Dashboard" element={<StudentDashboard/>}/>
        <Route path="/Teacher_Dashboard" element={<TeacherDashboard/>}/>
<<<<<<< HEAD
=======
        <Route path="/Admin_Dashboard" element={<AdminDashboard/>}/>
>>>>>>> 1b760b3cfbed96f1638195b35e5a3866d6bed2a6
        <Route path="/Student_Mockexam" element={<StudentMockExam/>}/>
        <Route path='/Teacher_Mockexam' element={<TeacherMockExam/>}/>
        <Route path='/TutorialVideo' element={<StudentTutorialVideo/>}/>
        <Route path='/Student_Classcalander'element={<StudentClassCalander/>}/>
        <Route path="/Teacher_Classcalander" element={<TeacherClassCalander/>}/>
        <Route path='/Student_Gradebook' element={<StudentGradeBook/>}/>
        <Route path="/IDE" element={<StudentIDE/>}/>
        <Route path="/Message" element={<Message/>}/>
        <Route path="/Profile" element={<Profile/>}/>
<<<<<<< HEAD
=======
        <Route path="/Add Student" element={<AddStudent/>}/>
>>>>>>> 1b760b3cfbed96f1638195b35e5a3866d6bed2a6
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
