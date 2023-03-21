import { useEffect, useState } from 'react'
import AttributeCard from './components/attributeCard'
import ListContainer from './components/listContainer'
import {Input} from "semantic-ui-react";
import DropdownSelection from './components/dropDown';
import './App.css'



function App() {
  const [list, setList] = useState(null)
  const [total, setTotal] = useState(0);
  const [type, setType] = useState([]);
  const [city, setCity] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResult] = useState([])


  useEffect(() =>{
    const fetchData = async() =>{
        let query = "https://api.openbrewerydb.org/breweries?page=1"
        const response = await fetch(query);
        const data = await response.json();
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

    };

    fetchData();
  
  },[]);

  

  const searchItems = (inputString) =>{
     setSearchInput(inputString);
     if(inputString !== ""){
      const filterData = list.filter(item => item.id.toLowerCase().startsWith(inputString.trim().toLowerCase()))

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

        <DropdownSelection options={{test:"test"}}/>

      </div>
       
      <ListContainer list={list} filteredResult={filteredResults} searchInput={searchInput}/>
       
    </div>
  )
}

export default App
