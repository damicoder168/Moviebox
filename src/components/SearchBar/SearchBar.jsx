import React, {useState} from 'react'
import "./SearchBar.css";
import SearchIcon from "../../assets/search.svg";
import axios from 'axios'
const SearchBar = ({  handleSubmit, query, setResult }) => {
   const [input,setinput] = useState('')

   const fetchData = (value) =>{
     axios.get('https://api.themoviedb.org/3/movie/76341?api_key=0c0801f06f3d2616930450cecea5fdd4').then(res => {
       console.log(res)
        const result=  res.filter((movie) => {
          return value && movie.data.data.title && movie.data.data.title  && movie.data.data.title.toLowerCase().includes(value)
        
        })
        setResult(result)
        console.log(result)
     }).catch(err => {
      console.log(err)
     })
   }

   const handleChanged =(value) => {
    setinput(value)
    fetchData()
   }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input__container">
        <input
          type="text"
          placeholder="What do you want to watch?"
          required
          onChange={(e) => handleChanged(e.target.value)}
          value={query}
        />
        <img src={SearchIcon} alt="search-icon" />
      </div>
    </form>
  );
};

export default SearchBar;
