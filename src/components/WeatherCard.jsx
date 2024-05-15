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
      `http://api.weatherapi.com/v1/current.json?key=a46aebdcff964bc398584914241505&q=${city}&aqi=no`
    )
      .then((res) => {
        if (!res.ok) { // Handle HTTP errors
          throw new Error("City not found. Please enter a valid city name.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
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
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="flex justify-center items-center text-slate-200 text-4xl mt-6">
          <TiWeatherCloudy className="text-6xl"/> WeatherApp</h1>
        <div className="bg-slate-200 h-4/5 w-1/4 m-auto flex flex-col justify-evenly border rounded-xl box-shadow">
          <div className="flex justify-center border-2 border-slate-900 rounded-lg m-4 box-shadow-input">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="City Name"
              className=" w-4/5 p-2 bg-slate-200 text-slate-900 text-lg outline-inherit focus:outline-none focus:ring-0"
            />
            <button
              onClick={fetchWeatherData}
              className="border-none color-[#e1e2e4]"
            >
              <FaSearch className="text-slate-900 size-6 ml-2" />
            </button>
          </div>
          
          {isLoading ? (
            <p className="m-auto my-1 text-lg text-slate-900 text-center">
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
                  <p className="m-auto my-1 text-lg text-slate-900 text-center">
                    {data.current.condition.text}
                  </p>
                  <p className="m-auto text-4xl text-slate-900 text-center">
                    {data.current.temp_c}°C
                  </p>
                  <div className="w-3/4 h-1 bg-slate-900 m-auto my-3 border rounded-lg"></div>
                  <p className="m-auto my-1 text-lg text-slate-900 text-center ">
                    {data.location.name}, {data.location.region}
                  </p>
                  </div>
               
          
          <div className="w-auto mx-auto border rounded-xl border-slate-900">
            
                <div className="text-lg text-slate-900 p-2 flex justify-around items-center my-1 border-b-2 border-slate-900">
                  <FaWind className="size-8 mr-2" />
                  Humidity: {data.current.humidity}
                </div>
                <div className="text-lg text-slate-900 p-2 flex justify-around items-center my-1 border rounded-lg">
                  <MdOutlineWaterDrop className="size-8 mr-2" />
                  Wind-Speed: {data.current.wind_kph}
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
  