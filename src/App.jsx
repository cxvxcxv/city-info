import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [cityName, setCityName] = useState(null);
  const [cityInfo, setCityInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCityNotFound, setIsCityNotFound] = useState(false);
  const [isNotAccurate, setIsNotAccurate] = useState(false);

  const getCityInfo = () => {
    setIsLoading(true);
    setIsCityNotFound(false);
    setIsNotAccurate(false);
    setCityInfo({});
    axios
      .get(`https://api.api-ninjas.com/v1/city?name=${cityName.trim()}`, {
        headers: {
          "X-Api-Key": "jEsVXC4mozmrNqP7PxvWxg==M2ky2RqxGDFHZ3iv",
        },
      })
      .then((response) => {
        if (response.data.length) setCityInfo(response.data[0]);
        else setIsCityNotFound(true);
        if (
          cityName.trim().toLowerCase() !==
          response.data[0].name.toLowerCase()
        )
          setIsNotAccurate(true); //not setting isNotAccurate as true if first letter is not capital and/or a word has spaces
        setIsLoading(false);
      })
      .catch(() => {
        setIsNotAccurate(false);
        setIsLoading(false);
        setIsCityNotFound(true);
      });
  };

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="city name"
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={getCityInfo}>Get Info</button>

      {isLoading && <h4>Loading...</h4>}
      {isCityNotFound && <h4>City Not Found</h4>}

      <div className="info">
        {isNotAccurate ? (
          <h2>Probably, you meant <span>{cityInfo.name}</span></h2>
        ) : (
          <h2>{cityInfo.name}</h2>
        )}

        {cityInfo.name && (
          <div>
            <h4>Country Code: {cityInfo.country}</h4>
            <h4>Population: {cityInfo.population} people</h4>
            <h4>Latitude: {cityInfo.latitude}&#176;</h4>
            <h4>Longitude: {cityInfo.longitude}&#176;</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
