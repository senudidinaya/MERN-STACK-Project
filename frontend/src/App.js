import ProjectList from './components/View1/ProjectList'
import ProjectAndTasks from './components/View2/ProjectAndTasks'; 
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />  {/*View 1*/}
        <Route path="/task/:projectId" element={<ProjectAndTasks />} />{/*View 2*/}
      </Routes>
    </Router>
  );
}

export default App;
