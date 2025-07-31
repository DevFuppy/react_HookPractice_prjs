import { useState, useEffect, useCallback } from "react";
import "normalize.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { getMoment } from "./utils/helpers";
import WeatherCard from "./views/WeatherCard";


const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

const ContainerX = styled(Container)`
  background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
`;

const auth = "CWA-6223B667-3D20-4930-B865-47C2562798D1";

const fetchCurrentWeather = async () => {
  const response = await fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${auth}&StationName=%E8%87%BA%E5%8C%97`
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

const fetchWeatherForecast = async () => {
  const response2 = await fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${auth}&locationName=%E8%87%BA%E5%8C%97%E5%B8%82`
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

function App() {

  //lazy init for useState
  const [t, setT] = useState(()=>getMoment("臺北市"));

  const [weatherData,setW,]= useState({locationName: "",
                                        weatherCode: "",
                                        windSpeed: "",
                                        airTemperature: "",
                                        description: "",
                                        PoP: 0,
                                        ObTime: "上午 00：00",
                                        isLoading: true,
                                        comfortability: "", });
                                        
                                        
                            


  const fetchMain = useCallback( async () => {
    setW((x) => ({ ...x, isLoading: true }));

    const [curW, wForecast] = await Promise.all([
      fetchCurrentWeather(),
      fetchWeatherForecast(),
    ]);

    setW((prev) => ({ ...prev, ...curW, ...wForecast, isLoading: false }));
  }, []);

  useEffect(() => {

    fetchMain();
   
  }, [fetchMain]);
 

  return (
    <ThemeProvider theme={theme[t === "day" ? "light" : "dark"]}>
      <ContainerX>
        <WeatherCard 
          weatherData={weatherData} 
          fetchMain={fetchMain}
          setT={setT}
          t={t}
          getMoment={getMoment}
          />
      </ContainerX>
    </ThemeProvider>
  );
}

export default App;
