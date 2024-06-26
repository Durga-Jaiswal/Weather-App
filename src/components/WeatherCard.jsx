import { FaSearch } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";

import { useEffect, useState } from "react";

function WeatherCard() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Pune");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleInputChange = (e) => {
    setCity(e.target.value)
  }
  const fetchWeatherData = () => {
    setIsLoading(true);
    setError(null); // Reset error state on each fetch

    fetch(
     `https://api.weatherapi.com/v1/current.json?key=a46aebdcff964bc398584914241505&q=${city}&aqi=no`

    )
      .then((res) => {
        if (!res.ok) { // Handle HTTP errors
          throw new Error("City not found. Please enter a valid city name.");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(error.message); 
        setIsLoading(false);
      });
      
  };
  useEffect(() => {
    fetchWeatherData()
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };
  

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="flex justify-center items-center text-slate-700 text-4xl">
          <TiWeatherCloudy className="text-6xl"/> WeatherApp</h1>
        <div className="card bg-slate-200 xl:h-4/5 xl:w-1/3 sm:w-1/2 sm:h-3/4 mx-auto flex flex-col justify-evenly border rounded-xl box-shadow p-4">
          <div className="flex justify-center border-2 border-slate-700 rounded-lg m-2 box-shadow-input">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="City Name"
              className=" w-4/5 p-2 bg-opacity-0 text-slate-700 text-lg outline-inherit focus:outline-none focus:ring-0"
            />
            <button
              onClick={fetchWeatherData}
              className="border-none color-[#e1e2e4]"
            >
              <FaSearch className="text-slate-700 size-6 ml-2" />
            </button>
          </div>
          
          {isLoading ? (
            <p className="m-auto my-1 text-lg text-slate-700 text-center">
              Loading...
            </p>
          ) : error ? ( 
            <p className="m-auto my-1 text-lg text-red-500 text-center">
              {error}
            </p>
          ) : (
              data && (
                <>
                  <div>
                  <img
                    src={data.current.condition.icon}
                    alt="Weather Icon"
                    className="m-auto size-28"
                  />
                  <p className="m-auto my-1 text-lg text-slate-700 text-center">
                    {data.current.condition.text}
                  </p>
                  <p className="m-auto text-4xl text-slate-700 text-center">
                    {data.current.temp_c}°C
                  </p>
                  <div className="w-3/4 h-1 bg-slate-700 m-auto my-3 border border-slate-700 rounded-lg"></div>
                  <p className="m-auto my-1 text-lg text-slate-700 text-center ">
                    {data.location.name}, {data.location.region}
                  </p>
                  </div>
               
          
          <div className="w-auto mx-auto border rounded-xl border-slate-700">
            
                <div className="text-lg text-slate-700 p-2 flex justify-center items-center my-1 border-b-2 border-slate-700">
                <MdOutlineWaterDrop className="size-8 mr-1" />
                  Humidity: {data.current.humidity}%
                </div>
                <div className="text-lg text-slate-700 p-2 flex justify-around items-center my-1 ">
                  <FaWind className="size-8 mr-1" />
                  Wind-Speed: {data.current.wind_kph}km/h
                </div>
          </div>
          </>
        )
      )}
        </div>
      </div>
    </>
  );
  }
  

  export default WeatherCard
  