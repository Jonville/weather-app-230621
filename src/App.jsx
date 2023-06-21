import { useState } from 'react'
import './App.css'
import Search from './components/Search';
import Weather from './components/Weather';

function App() {
  const [location , setLocation] = useState('');  // 검색어
  const [weather , setWeather] = useState(null);  // 날씨 데이터 값이 비었음을 명시적 선언

  const [errorMessage , setErrorMessage] = useState('');

  const [isLoading , setIsLoading] = useState(false);

  // 날씨 요청 함수
  const fetchWeather = () => {
    const apiKey = "e11462160015cffa69954c9f67741b7b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=kr`;
    
    setIsLoading(true); // 요청 시작 시 로딩 상태 on

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
        setErrorMessage("날씨 정보를 가져오는 중입니다")
        
      })
      .finally(() => {
        setIsLoading(false) // 요청 완료 시 로딩 상태 해제
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
      <Search
        handleLocationChange={handleLocationChange}
        handleWeatherSearch={handleWeatherSearch}
        location={location}
      />
      {
        isLoading ? (
          <p className='loading'>Loading.....</p>
        ) : (
      <Weather
        weather={weather}
        errorMessage={errorMessage}
      />
      )}
    </div>
  )
}

export default App
