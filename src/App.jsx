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
  const [state, setState] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResult] = useState([]);
  const [typeSelectOptions, setTypeSelectOptions] = useState([]);
  const [stateSelectOptions, setStateSelectOptions] = useState([]);

  useEffect(() =>{
    const fetchData = async() =>{
        let query = "https://api.openbrewerydb.org/breweries?page=2&per_page=20"
        const response = await fetch(query);
        const data = await response.json();
        let numOfTotal = data.length;
        let type = [];
        let state = [];
       
        setList(data);
        setTotal(numOfTotal);
        data.forEach(element => {
          if(!type.includes(element.brewery_type)){
            type.push(element.brewery_type);
          }

          if(!state.includes(element.state)){
          
           state.push(element.state)
          }

        
       
        });


        setState(state);
        setType(type);
       let  typeSelections = [...type];
       let  stateSelections = [...state];
       typeSelections.unshift("All");
       stateSelections.unshift("All");
       setTypeSelectOptions(typeSelections);
       setStateSelectOptions(stateSelections)


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


  const handleTypeSelect = (event) =>{
        let selected = event.target.innerHTML
        if(filteredResults.length > 0){

          const filterData = filteredResults.filter(item => item.brewery_type.toLowerCase() == selected.toLowerCase());
          setFilteredResult(filterData);

        }else{

          const filterData = list.filter(item => item.brewery_type.toLowerCase() == selected.toLowerCase());
          setFilteredResult(filterData);

        }
        
    
      
  }

  const handleStateSelect = (event) =>{

    let selected = event.target.innerHTML
    if(filteredResults.length > 0){

      const filterData = filteredResults.filter(item => item.state.toLowerCase() == selected.toLowerCase());
      setFilteredResult(filterData);

    }else{

      const filterData = list.filter(item => item.state.toLowerCase() == selected.toLowerCase());
      setFilteredResult(filterData);
     

    }

  }
  


  return (
    <div className="App">
      <h1>Brewery Dashboard</h1>
      <div className='attributes-panel'>
        <AttributeCard name="Total" value={total} />
        <AttributeCard name="Type" value={type.length} />
        <AttributeCard name="State" value={state.length} />
      </div>

      <div className='filter-panel'>
        <input
          type="text"
          placeholder="Enter a name..."
          onChange={(input) => searchItems(input.target.value)}
        />

        <DropdownSelection placeHolder="Select a type" options={typeSelectOptions} handleSelect={handleTypeSelect}/>

        <DropdownSelection placeHolder="Select a State" options={stateSelectOptions} handleSelect={handleStateSelect}/>



      </div>
       
      <ListContainer list={list} filteredResult={filteredResults} searchInput={searchInput}/>
       
    </div>
  )
}

export default App
