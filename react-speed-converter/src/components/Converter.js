import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default Converter

function Converter({val,setMbps}){


return (  <div className="converter">
      <div className="flex-1">
        <div className="converter-title">Set</div>
        <input type="number" className="input-number" min="0" onChange={setMbps} value={val}/>
      </div>
      <span className="angle-icon fa-2x" style={{marginTop: '30px'}}>
        <FontAwesomeIcon icon={['fas', 'angle-right']} />
      </span>
      <div className="text-right flex-1">
        <div className="converter-title">Show</div>
        <input type="text" className="input-number text-right" disabled value={val/8} />
      </div>
    </div>

)}