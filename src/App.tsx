import './App.css';
import ProjectPages from './projects/ProjectPage';
import HomePage from './home/HomePage';
import ExampleForm from './sample/ExampleForm';
import HookSample from './sample/HookSample';
import Clock from './sample/sample';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import ProjectDetail from './projects/ProjectDetail';


function App() {

  return (
    <Router>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects/" className="button rounded">
          Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPages />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          {/* <Route path='/launchdarkly' element={} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
