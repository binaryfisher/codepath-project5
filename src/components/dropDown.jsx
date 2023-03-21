import React from "react";





const DropdownSelection = (options) =>{

    return(

        <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
            {options && options.length > 0 ? (
                options.map((option, index) =>{
                    <div key={index}>"hello"</div>
                })
            ):(null) }
         
        </div>
    </div>

    );

}





export default DropdownSelection;