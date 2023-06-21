import React from 'react'

function Search(props) {
  const {handleLocationChange,handleWeatherSearch,location} = props

  return (
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
  )
}

export default Search