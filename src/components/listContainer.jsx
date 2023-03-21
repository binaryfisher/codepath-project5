import React from "react";
import { SearchResult } from "semantic-ui-react";

const ListContainer = ({list, filteredResult, searchInput}) =>{
    return(
        
        <div className="list-container">
                <div className="list-header">
                    <div>Name</div>
                    <div>Type</div>
                    <div>State</div>
                    <div>City</div>
                </div>
              
             
               { filteredResult.length <= 0 && list && list.length > 0 ? (
                    list.map((item,index) =>(
                        <div key={index} className="attribute-row">
                            <div>{item.id}</div>
                            <div>{item.brewery_type}</div>
                            <div>{item.state}</div>
                            <div>{item.city}</div>
                        </div>
                   
                      ))
                     ):(
                        filteredResult.map((item,index) =>(
                            <div key={index} className="attribute-row">
                                <div>{item.id}</div>
                                <div>{item.brewery_type}</div>
                                <div>{item.state}</div>
                                <div>{item.city}</div>
                           </div>
                           
                        ))


                     
                     )}                 
                  
           
         

        </div>
    )
};

export default ListContainer;