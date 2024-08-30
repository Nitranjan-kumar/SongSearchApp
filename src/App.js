import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search', // Changed endpoint to search or subscribed it or not
        params: {
          term: searchQuery || 'top', // Use searchQuery or default to 'top' result importan
          locale: 'en-IN',
          limit: '10'
        },
        headers: {
          'x-rapidapi-key': '4fd8237917mshe99033230cd1768p110494jsnb9177529d866',
          'x-rapidapi-host': 'shazam.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setTracks(response.data.tracks.hits.map(hit => hit.track)); // Adjust data fetching to match the new response structure
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    if (searchQuery.length > 4) {
      fetchData();
    } else {
      setTracks([]); // Clear tracks when search query is empty
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderTracks = () => {
    return tracks.map((track, index) => (
      <div key={index} className="track">
        <img src={track.images.coverart} alt={track.title} />
        <h3>{track.title}</h3>
        <p>{track.subtitle}</p>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Shazam Tracks</h1>
      <input 
        type="text" 
        placeholder="Search for music..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
        className="search-input"
      />
      {error && <div className="error">Error: {error.message}</div>}
      <div className="track-list">
        {renderTracks()}
      </div>
    </div>
  );
}

export default App;
