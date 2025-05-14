import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentList from './pages/StudentList';
//import StudentForm from './pages/StudentForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;