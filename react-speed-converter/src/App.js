import './App.css';
import { useState } from 'react';
import A from './components/unitControl' 
import {Footer as B}  from './components/footer'  
import Converter from './components/Converter'

function App() {   

let [val,setVal] = useState(0)

const setMbps = function(e){

  //  為什麼單純用val是吃到閉包?
  // setVal(x=> x+1)

  // console.log(e.target.value)

  setVal(x=> e.target.value)

}


  return (
<div className="container">
  <div className="card-header">Network Speed Converter</div>
  <div className="card-body">
  <A />
  <Converter val={val} setMbps={setMbps}/>
  </div>
  <B value={val} />
</div>
  );
}

export default App;
