import { useState,useEffect } from "react";

import axios from "axios"

function Search() {
  const [query, setQuery] = useState("");
  const [results,setResults]=useState([])
  
  const handleName = (e) => setQuery(e.target.value);
  
  useEffect(() => {
    if(!query){setResults([]);return;}
      
    const controller = new AbortController();

  const searchBeer = async ()=>{
    try {
      const { data }=await axios.get("https://ih-beers-api2.herokuapp.com/beers/search",
        {params:{ q: query}, signal: controller.signal});
      setResults(data)
    } catch (error) {
      console.log(error)      
    }
  }
  Search()
  return () => controller.abort();   }, [query]);
  
  
  return (
    <div className="d-inline-flex justify-content-center align-items-center w-100 p-4">
      <div className="input-group mb-2 w-50">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Search
          </span>
        </div>
        <input
          type="text"
          className="form-control search-bar"
          value={query}
          onChange={handleName}
        />
        <button onClick={searchBeer} className="btn btn-primary">Search</button>
      </div>
    </div>
  );
}

export default Search;
