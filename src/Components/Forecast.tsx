import './Forecast.css'
import { forecastType } from "../Types"
import { getSunTime, getVisibilityValue, getWindDirection } from '../Helpers'
import Feels from '../Icons/Feels'
import Humidity from '../Icons/Humidity'
import Pop from '../Icons/Pop'
import Pressure from '../Icons/Pressure'
import Wind from '../Icons/Wind'
import Sunrise from '../Icons/Sunrise'
import Sunset from '../Icons/Sunset'
import Visibility from '../Icons/Visibility'

type Props = {
    data: forecastType
}

const Degree = ({ temp } : {temp: number }): JSX.Element  => (
  <span>
    {temp - 273}<sup>°c</sup>
  </span>
)

const Forecast = ({ data }: Props): JSX.Element => {

  const today = data.list[0]

  return (
    <div>
      <div className='forecast-wrap'>
      <section className='forecast-city'>
        <h2>
          {data.name}, 
          <span>
            {' '+ data.country}
          </span>
        </h2>
        <h1>
          <Degree temp={Math.round(today.main.temp)}/>
        </h1>
        <p>{today.weather[0].main} {today.weather[0].description}</p>
        <p>
          Highest: <Degree temp={Math.ceil(today.main.temp_max)}/>
          {' '}
          Lowest: <Degree temp={Math.ceil(today.main.temp_min)}/>
        </p>
        </section>
        <section className="forecast_container">
          {data.list.map((item , i) => (
            <div key={i}>
              <p>{i === 0 ? 'Now' : 
                  new Date(item.dt * 1000).getHours() + ':00' + 
                  (new Date(item.dt * 1000).getHours() >= 12 ? ' PM' : ' AM')}</p>
              <img 
              alt={`weather-icon-${item.weather[0].description}`}
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
              <p className='temp-p'>
                <Degree temp={Math.round(item.main.temp)}/>
              </p>
            </div>
          )) }
        </section>
        <section className='bento-grids-wraper'>
          <div className='bento-grids sunrise'>
            <div className='sunrise-box'>
              <Sunrise/>
              <p>Sunrise</p>
              <span>{getSunTime(data.sunrise)}</span>
            </div>
            <div className='sunrise-box'>
              <Sunset/>
              <p>Sunset</p>
              <span>{getSunTime(data.sunset)}</span>
            </div>
          </div>
          <div className='bento-grids metrics'>
            <div className='humidity'>
              <h3><Humidity/> Humidity:</h3>
              <span className='temp-p'>{today.main.humidity + '%'}</span>
            </div>
            <div className="pop">
              <h3><Pop/> Precipitation:</h3>
              <span className='temp-p'>{Math.round(today.pop * 100) + '%'}</span>
            </div>
            <div className="feel">
              <h3><Feels/> Feels like:</h3>
              <span className='temp-p'><Degree temp={Math.round(today.main.feels_like)}/></span>
            </div>
            <div className="pressure">
              <h3><Pressure/> Pressure:</h3>
              <span className='temp-p'>{`${today.main.pressure} hPa`}</span>
            </div>
          </div>
          <div className='bento-grids visibility'>
            <p><Visibility/> Visibility: <span className='temp-p'>{`${(today.visibility / 1000).toFixed()} km`} </span></p>
            <p>{getVisibilityValue(today.visibility)}</p>
          </div>
          <div className='bento-grids wind'>
            <p>
              <Wind/> Wind: <span className='temp-p'>{`${Math.round(today.wind.speed)} km/h`}</span>
            </p>
            <p>
              {`${getWindDirection(Math.round(today.wind.deg))}, gusts 
              ${today.wind.gust.toFixed(1)} km/h`}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Forecast
