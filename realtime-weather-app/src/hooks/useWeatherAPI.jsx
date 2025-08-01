import { useState, useEffect, useCallback } from "react";



const fetchCurrentWeather = async (auth,station) => {
  const response = await fetch(
    // `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${auth}&StationName=%E8%87%BA%E5%8C%97`

        `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${auth}&StationName=${station}`
  );

  const result = await response.json();

  // console.log(result)

  const {
    records: {
      Station: {
        0: {
          ObsTime: { DateTime },
          GeoInfo: { CountyName },
          WeatherElement: { AirTemperature, Weather, WindSpeed },
        },
      },
    },
  } = result;

  return {
    ObTime: new Date(DateTime).toLocaleTimeString().slice(0, -3),
    locationName: CountyName,
    airTemperature: Math.round(AirTemperature),
    weather: Weather,
    windSpeed: WindSpeed,
  };
};

const fetchWeatherForecast = async (auth,location) => {
  const response2 = await fetch(
    // `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${auth}&locationName=%E8%87%BA%E5%8C%97%E5%B8%82`

        `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${auth}&locationName=${location}`

  );

  const data = await response2.json();

  //  console.log(data);

  const {
    records: {
      location: {
        0: { weatherElement },
      },
    },
  } = data;

  const {
    CI: { parameterName: comfortability },
    PoP: { parameterName: PoP },
    Wx: { parameterName: description, parameterValue: weatherCode },
  } = weatherElement.reduce((pre, cur) => {
    if (["PoP", "Wx", "CI"].includes(cur.elementName))
      pre[cur.elementName] = cur.time[0].parameter;

    return pre;
  }, {});

  return {
    comfortability,
    PoP,
    description,
    weatherCode,
  };
};

const useWeatherAPI = (auth,station,location) => {

  const [weatherData, setW] = useState({locationName: "",
                                          weatherCode: "",
                                          windSpeed: "",
                                          airTemperature: "",
                                          description: "",
                                          PoP: 0,
                                          ObTime: "上午 00：00",
                                          isLoading: true,
                                          comfortability: "", });

 
  const fetchMain = useCallback(async () => {
    setW((x) => ({ ...x, isLoading: true }));

    const [curW, wForecast] = await Promise.all([
      fetchCurrentWeather(auth,station),
      fetchWeatherForecast(auth,location),
    ]);

    setW((prev) => ({ ...prev, ...curW, ...wForecast, isLoading: false }));
  }, [auth,station,location]);

  useEffect(() => {

    fetchMain();
    
  }, [fetchMain]);

  return [weatherData, fetchMain];
};

export default useWeatherAPI;
