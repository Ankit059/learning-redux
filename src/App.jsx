import {Nav} from './compo/Nav'
import Main from './compo/Main';

function App() {
  return (
    <div className="App">
      <h1 className=' text-3xl font-semibold text-center mt-5 text-purple-600 h-10 bg-slate-200 hover:text-yellow-200'>Learning redux in react.js by increase and decrease Account balance</h1>
      <Nav/>
      <Main />
    </div>
  ); 
}

export default App;
