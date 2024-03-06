import { useState, useEffect, ChangeEvent } from 'react'
import { optionType } from '../Types';
import { forecastType } from '../Types';

const useForecast = () => {

    const API_KEY = '31748fc9e593d32153e23c7a0c24559d'
    const [term, setTerm] = useState<string>('');
    const [city, setCity] = useState<optionType | null>(null)
    const [options, setOptions] = useState<[]>([])
    const [forecast, setForecast] = useState<forecastType | null>(null)
  
    const getSearchOptions = (value: string) => {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${API_KEY}`)
      .then(res => res.json())
      .then((data) => setOptions(data))
    }
  
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setTerm(value)
      if (value=='') return
      getSearchOptions(value)
    }
  
    const getForecast = ( city: optionType ) => {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`)
      .then(res => res.json())
      .then((data) => {

        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16)
        }
        setForecast(forecastData)
      })
    }
  
    const onSubmit = () => {
      if (!city) return
      getForecast(city)
    }
  
    const onOptionSelect = (option: optionType) => {
      setCity(option)
    }
  
    useEffect( () => {
      if (city) {
        setTerm(city.name)
        setOptions([])
      }
    } , [city])

    return {
        options, 
        term, 
        forecast, 
        onSubmit, 
        onOptionSelect, 
        onInputChange
    }
}

export default useForecast
