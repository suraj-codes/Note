import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Navbar from "./Navbar.js"
import Create from './Create';
import Notes from './Notes';
import Note from './Note';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
              <Create/>
          </Route>
          <Route exact path="/notes">
              <Notes/>
          </Route>
          <Route exact path="/notes/:addr">
            <Note/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
