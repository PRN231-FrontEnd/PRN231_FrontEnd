import logo from './logo.svg';
import './App.css';
import CustomNavbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/sidebar';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <CustomNavbar />
      <div className='d-flex'>
      <SideBar />
      <div className='w-100 conatainer'>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
      <Footer />
      </div>
      </div>
    </div>
    
  );
}

export default App;
