import { useState} from "react";
import useWeatherAPI from "./hooks/useWeatherAPI"
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
const StationName ='臺北';
const locationName = '臺北市'

function App() {

  //lazy init for useState
  const [t, setT] = useState(()=>getMoment(locationName));

  const [weatherData,fetchMain] = useWeatherAPI(auth,StationName,locationName);


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
