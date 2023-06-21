import React from 'react'

function Weather(props) {
  const { weather , errorMessage} = props

  return (
    <>    
      {
        weather && (
          <div>
          <h2>{weather.name}</h2>
          <p>현재온도 : {(weather.main.temp - 273.15).toFixed(1)}°C</p>
          <p>설명 : {weather.weather[0].description}</p>
          </div>
      )
      }

      {
       !weather && (
          <p className='error'> {errorMessage} </p>
       )
      }
    </>
  )
  
}


export default Weather