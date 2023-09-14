import "./SearchBar.css";
import SearchIcon from "../../assets/search.svg";
import  React, { useState, useEffect } from 'react';
import axios from 'axios'


const SearchBar = ({  handleSubmit, }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
      return;
    }
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              api_key: '8b7b40a740e510c4f2ff2d66bdb6fc18',
              query: searchQuery,
            },
          }
        );

        setSearchResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);


  return (
    <form onSubmit={handleSubmit}>
      <div className="input__container">
        <input
          type="text"
          placeholder="What do you want to watch?"
          required
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />

        <img src={SearchIcon} alt="search-icon" />
      </div>
      <div>
        {searchResults.map((movie) => (
           <li className="mx-auto px-2">
           <div key={movie.id} className="bg-gray-50 my-10 py-2 cursor-pointer">
             <img 
               data-testid="movie-poster"
               src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
               alt={movie.title}
               className="rounded" />
             <p data-testid="movie-release-date" className="pl-3 pt-3 font-bold text-gray-500">{new Date(movie.release_date).toLocaleString('default', { year: 'numeric' })}</p>
             <h2 data-testid="movie-title" className="pt-2 pl-3 font-bold text-gray-900">{movie.title}</h2>
             <div className='flex justify-between items-center mx-3'>                        
               <div className="flex justify-start items-center pt-2  space-x-2">
                 <p data-testid="movie-apiName" className="px-2 py-1 bg-yellow-500 w-[62px] rounded font-bold">IMDb</p>
                 <p data-testid="movie-vote-average" className="font-medium"> {movie.vote_average * 10 } / 100 </p>
               </div>
               <p className="font-medium"> {movie.vote_average * 10 }%</p>
             </div>
           </div>
         </li>
        ))}
      </div>
    
    </form>
  );
};

export default SearchBar;
