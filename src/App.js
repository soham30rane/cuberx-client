import './App.css';
import Home from './components/Home/home';
import Navbar from './components/Navbar/navbar';
import StatsBrief from './components/StatsBrief/statsBrief';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div class="content-container">
        <div class="main-content">
          <Home />
        </div>
        <div class="divider"></div>
        <div class="statistics">
          <StatsBrief />
        </div>
    </div>
    </div>
  );
}

export default App;
