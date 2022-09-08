import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router} from 'react-router-dom'
  import Footer from './components/footer/Footer'
import './App.css';

import Header from './components/Header';


function App() {
  return (
    <>
    <Router>
    <Header/>
    <Footer/>
    </Router>
   
   
    </>
  )
}

export default App;