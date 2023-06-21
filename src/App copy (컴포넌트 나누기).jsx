import { useState } from 'react'
import './App.css'

function App() {
  const [location , setLocation] = useState('');  // 검색어
  const [weather , setWeather] = useState(null);  // 날씨 데이터 값이 비었음을 명시적 선언

  const [errorMessage , setErrorMessage] = useState('');

  // 날씨 요청 함수
  const fetchWeather = () => {
    const apiKey = "e11462160015cffa69954c9f67741b7b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=kr`;
  
    fetch(url)
      .then(res => res.json())  // json 포맷으로 변환
      .then(data => {
        // 검색 결과가 없을때
        if(data.cod === '404') {
          setWeather(null);
          setErrorMessage("올바른 지역명이 아입니다.")
          return ;
        }
        setWeather(data);
        // console.log(data);
      })
        // 에러처리
      .catch(() => {
        console.log("에러")
        
      })
  }

  // 입력함수
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  // 날씨 요청 함수
  const handleWeatherSearch = (e) => {
    // 전송 이벤트 취소 (기본 이벤트)
    e.preventDefault();
    fetchWeather();
  }

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <form onSubmit={handleWeatherSearch}>
        <div className="input-group">
          <input
            type="search"
            value={location}
            placeholder='위치를 입력'
            required // 입력을 안하면 안넘어간다는 의미
            onChange={handleLocationChange}
          />
          <button className='btn' type='submit'>검색</button>
        </div>
      </form>
      
      {
        weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>현재온도 : {weather.main.temp - 273.15}°C</p>
            <p>설명 : {weather.weather[0].description}</p>
          </div>
        )
      }
      
      {
        !weather && errorMessage
      }
    </div>
  )
}

export default App
