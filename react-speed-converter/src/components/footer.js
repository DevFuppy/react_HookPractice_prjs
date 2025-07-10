const Footer = function({value}){
    
    let [speed,color] = !value? ['---','#d3d8e2']:value<15?['SLOW','#ee362d']:value < 40? ['GOOD','#1b82f1']:['FAST','#13d569']
     
    
   return (<div className="card-footer" style={{backgroundColor:color}} >{speed}</div>)

}

export {Footer}