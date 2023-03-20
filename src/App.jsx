import { useEffect, useState } from 'react'
import AttributeCard from './components/attributeCard'
import ListContainer from './components/listContainer'
import {Input} from "semantic-ui-react";
import './App.css'

function App() {
  const [list, setList] = useState(null)
  const [total, setTotal] = useState(0);
  const [type, setType] = useState([]);
  const [city, setCity] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResult] = useState([])

  useEffect( () =>{
    let query = "https://api.openbrewerydb.org/breweries?page=1"

    fetch(query).then((response) => response.json()).then((data) => {
      let numOfTotal = data.length;
      let type = [];
      let city = [];
      setList(data);
      setTotal(numOfTotal);
      data.forEach(element => {
        if(!type.includes(element.brewery_type)){
           type.push(element.brewery_type);
        }

        if(!city.includes(element.city)){
         
          city.push(element.city)
        }

        setCity(city);
        setType(type);

      });


    } );
   
  },[]);

  const searchItems = (inputString) =>{
     setSearchInput(inputString);
     if(inputString !== ""){
       const filterData = list.filter(item => item.city.toLowerCase() == inputString.trim().toLowerCase() || item.id.toLowerCase() == inputString.trim().toLowerCase() || item.brewery_type.toLowerCase() == inputString.trim().toLowerCase() ||item.postal_code.toLowerCase() == inputString.trim().toLowerCase())
       setFilteredResult(filterData);
     }

     
  }
  


  return (
    <div className="App">
      <h1>Brewery Dashboard</h1>
      <div className='attributes-panel'>
        <AttributeCard name="Total" value={total} />
        <AttributeCard name="Type" value={type.length} />
        <AttributeCard name="City" value={city.length} />
      </div>

      <div className='filter-panel'>
        <input
          type="text"
          placeholder="Search..."
          onChange={(input) => searchItems(input.target.value)}
        />

      </div>
       
      <ListContainer list={list} filteredResult={filteredResults} searchInput={searchInput}/>
       
    </div>
  )
}

export default App
