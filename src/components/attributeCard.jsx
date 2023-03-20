import React from "react";

const AttributeCard = ({name, value}) => {
    
    return(
        <div className="attribute-card">
            <div className="attribute-value">{value}</div>
            <div className="attribute-name">{name}</div>
        </div>
       
    );
};

export default AttributeCard;