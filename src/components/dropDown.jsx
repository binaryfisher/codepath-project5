import React from "react";





const DropdownSelection = ({placeHolder, options, handleTypeSelect}) =>{

    return(

        <div className="dropdown">
            <button className="dropbtn">{placeHolder}</button>
            <div className="dropdown-content">
                {options && options.length > 0  ? (
                    options.map((option, index) =>(
                        <div onClick={handleTypeSelect} key={index}>{option}</div>
                       
                    ))
                ):(<div>"hello"</div>) }
            
            </div>
    </div>

    );

}





export default DropdownSelection;