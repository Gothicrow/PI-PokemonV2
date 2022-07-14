import './App.css';
import {Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Route path='*' component={NavBar} />
      <Route path='/' component={Landing} exact />
      <Route path='/home' component={Home}/>
    </div>
  );
}

export default App;
