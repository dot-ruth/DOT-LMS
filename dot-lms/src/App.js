import './App.css';
import Login from './Components/login';
import { Routes,Route } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Components/Dashboard';
import Quiz from './Components/Quiz';
import TutorialVideo from './Components/TutorialVideo'
import GradeBook from './Components/GradeBook';
import PracticeHere from './Components/PracticeHere';
import Message from './Components/Message';
import Profile from './Components/Profile';
import ClassCalendar from './Components/classCalendar';
import 'react-calendar/dist/Calendar.css';
import StudentDashboard from './Components/StudentComponents/StudentDashboard';
import TeacherDashboard from './Components/TeacherComponents/TeacherDashboard';
import StudentMockExam from './Components/StudentComponents/StudentMockExam';


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
        <Route path="/Student_Mockexam" element={<StudentMockExam/>}/>
        <Route path="/Quiz" element={<Quiz/>}/>
        <Route path="/Tutorial_videos" element={<TutorialVideo/>}/>
        <Route path="/Class_calendar" element={<ClassCalendar/>}/>
        <Route path="/Grade_book" element={<GradeBook/>}/>
        <Route path="/Practice_here" element={<PracticeHere/>}/>
        <Route path="/Message" element={<Message/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
