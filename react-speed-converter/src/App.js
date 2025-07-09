import './App.css';
import { useState } from 'react';
import A from './components/unitControl' 
import {Footer as B}  from './components/footer'  
//重新弄懂一下default等等export, import規則
//有from? as?

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
    <div className="converter">
      <div className="flex-1">
        <div className="converter-title">Set</div>
        <input type="number" className="input-number" min="0" onChange={setMbps} value={val}/>
      </div>
      <span className="angle-icon fa-2x" style={{marginTop: '30px'}}>
        <i className="fas fa-angle-right" ></i>
      </span>
      <div className="text-right flex-1">
        <div className="converter-title">Show</div>
        <input type="text" className="input-number text-right" disabled value={val/8} />
      </div>
    </div>
  </div>
  <B />
</div>
  );
}

export default App;
