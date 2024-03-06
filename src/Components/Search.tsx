import useForecast from '../hooks/useForecast';
import Forecast from './Forecast';
import WeatherApp from './WeatherApp';

const Search = () => {
  const {
    options, 
    term, 
    forecast, 
    onSubmit, 
    onOptionSelect, 
    onInputChange
  } = useForecast()

  return (
    <div>
      {forecast ? <Forecast data={forecast}/> : ( 
      <WeatherApp 
      term={term} 
      options={options} 
      onInputChange={onInputChange}
      onOptionSelect={onOptionSelect} 
      onSubmit={onSubmit}/>
      )
      }
    </div>
  )
}

export default Search
