import { useState, useEffect, useCallback, useMemo } from "react";
import "normalize.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import RefreshIcon from "./images/refresh.svg?react";
import AirFlowIcon from "./images/airFlow.svg?react";
import RainIcon from "./images/rain.svg?react";
import WeatherIcon from "./components/weatherIcon";
import { getMoment } from "./utils/helpers";

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme: { boxShadow } }) => boxShadow};
  background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: ${(prop) => (prop.theme === 11 ? "128px" : "28px")};
  color: ${({ theme: { titleColor } }) => titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme: { textColor } }) => textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme: { textColor } }) => textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme: { textColor } }) => textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

//Q: SVG直接等於一類DOM嗎? 為何可以直接這樣寫?
const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme: { textColor } }) => textColor};

  svg {
    width: 15px;
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
    ${({ Loading }) =>
      Loading ? "animation: rotate 1.5s infinite linear" : ""}
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
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
  ////test useCallback
  //  //forTesting useCallback
  //  if(ggg===20)
  //  {
  //    ggg = fetchMain
  //    console.log('ggg初始化: ',ggg)
  //  }
  //  else
  //  {
  //   console.log('已給過ggg')
  //   bbb = fetchMain
  //   console.log('兩次渲染fetchMain參照相同嗎?', ggg === bbb )
  //  }

  const [t, setT] = useState("dark");

  const [
    {
      locationName,
      weatherCode,
      windSpeed,
      airTemperature,
      description,
      PoP,
      ObTime,
      isLoading,
      comfortability,
    },
    setW,
  ] = useState({
    locationName: "",
    weatherCode: "",
    windSpeed: "",
    airTemperature: "",
    description: "",
    PoP: 0,
    ObTime: "上午 00：00",
    isLoading: true,
    comfortability: "",
  });

  const dayOrNight = useMemo(() => getMoment("臺北市"), [ObTime]);

  const fetchMain = useCallback(async () => {
    setW((x) => ({ ...x, isLoading: true }));

    const [curW, wForecast] = await Promise.all([
      fetchCurrentWeather(),
      fetchWeatherForecast(),
    ]);

    setW((prev) => ({ ...prev, ...curW, ...wForecast, isLoading: false }));
  }, []);

  useEffect(() => {
    fetchMain();
    setT(dayOrNight === "day" ? "light" : "dark");
  }, [fetchMain,dayOrNight]);

  return (
    <ThemeProvider theme={theme[t]}>
      <ContainerX>
        <WeatherCard>
          <Location>{locationName}</Location>
          <Description>
            {description} {comfortability}
          </Description>
          <CurrentWeather>
            <Temperature>
              {airTemperature}
              <Celsius>°C</Celsius>
            </Temperature>
            <WeatherIcon weatherCode={weatherCode} moment={dayOrNight} />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon />
            {windSpeed} m/h{" "}
          </AirFlow>
          <Rain>
            <RainIcon />
            {PoP}%{" "}
          </Rain>
          <Refresh
            onClick={() => {
              fetchMain();
              setT(() => getMoment("臺北市") === "day" ? "light" : "dark");
            }}
            Loading={isLoading}
          >
            {" "}
            最後觀測時間：{ObTime}
            <RefreshIcon />{" "}
          </Refresh>
        </WeatherCard>
      </ContainerX>
    </ThemeProvider>
  );
}

export default App;
