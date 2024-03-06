import search_icon from '../assets/Logos/search.png'
import cloud_icon from '../assets/Logos/cloud.png'
import './WeatherApp.css'
import { optionType } from '../Types'
import { ChangeEvent } from 'react'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const WeatherApp = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit
}: Props): JSX.Element => {
  
  return (
    <div className='page-wrap'>
      <section className='weather-container'>
        <div className="top-bar">
          <input type='text' className='city-input' placeholder='Search' onChange={onInputChange} value={term}/>
          <ul className='options-list'>
          {options.map((option: optionType, index : number) => (
            <li key={option.name + '_' + index}>
              <button onClick={() => onOptionSelect(option)}>
              {option.name}
              </button>
            </li>
          ))}
          </ul>
          <div className="search-icon" onClick={onSubmit}>
            <img src={search_icon} alt='search-icon'/>
          </div>
        </div>
        <div className="weather-image">
          <img src={cloud_icon} alt='cloud-icon'/>
        </div>
        <div className="weather-temp">Weather</div>
        <div className="weather-location">forecast</div>
          <div className="element">
              <h3>Enter above a place you want to know the weather of and select an option from the dropdown</h3>
          </div>
      </section>
      
    </div>
  )
}

export default WeatherApp
