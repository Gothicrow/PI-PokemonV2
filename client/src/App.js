import './App.css';
import {Route} from 'react-router-dom'
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Portfolio}/>
    </div>
  );
}

export default App;
