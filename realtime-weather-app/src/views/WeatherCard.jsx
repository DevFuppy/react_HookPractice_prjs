import styled from "@emotion/styled";
import RefreshIcon from "../images/refresh.svg?react";
import AirFlowIcon from "../images/airFlow.svg?react";
import RainIcon from "../images/rain.svg?react";
import CogIcon from '../images/cog.svg?react'

import WeatherIcon from "../components/weatherIcon";



const WeatherCardWrapper = styled.div`
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

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

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

function WeatherCard({
  weatherData: {
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
  fetchMain,
  setT,
  t,
  getMoment,
  pageSwitcher
}) {
  return (
    <WeatherCardWrapper><Cog onClick={()=>{pageSwitcher('weatherSetting')}} />  
      <Location>{locationName}</Location>    
      <Description>
        {/* {description} */}
         {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {airTemperature}
          <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weatherCode} moment={t} />
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
          setT((x) => (x === getMoment(locationName) ? x : getMoment(locationName)));
        }}
        Loading={isLoading}
      >
        {" "}
        最後觀測時間：{ObTime}
        <RefreshIcon />{" "}
      </Refresh>
    </WeatherCardWrapper>
  );
}

export default WeatherCard;
