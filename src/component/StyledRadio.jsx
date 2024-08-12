import React from "react";
import './css/StyledRadio.css'
export default function StyledRadio({children}){
    return (
        <div className="radio_con" style={{width:children.length*150+'px',gridTemplateColumns:'repeat('+children.length+',1fr)'}}>
            {children}
        </div>
    )
}
export function Radio({value,name,label,style,...props}){
    return(
        <label className="cus_radio" style={style}>
            <input type="radio" name={name} value={value} {...props}/> {label}
        </label>
    )
}