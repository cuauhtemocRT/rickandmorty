import { useState, useEffect } from 'react'
import './App.css'
import getRandomNumber from './utils/getRandomNumber.js'
import axios from 'axios'
import LocationInfo from './components/LocationInfo'
import CardResident from './components/CardResident'
import FilterList from './components/FilterList'
import Error from './components/Error'
import image3 from './assets/images/image3.png'

function App() {

  //Se guarda una location
  const [location, setLocation] = useState()
  //Se guarda la información del input y hacer la petición
  const [searchInput, setSearchInput] = useState('')
  //Se guarda las sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()
  //Se indica si hay error o no
  const [hasError, setHasError] = useState(false)

  console.log(searchInput)

  useEffect(() => {

      let id = getRandomNumber()
      if (searchInput) {
        id = searchInput
      }

      const URL =`https://rickandmortyapi.com/api/location/${id}`

      axios.get(URL)
        .then(res => {
          setHasError(false)
          setLocation(res.data)
        })
        .catch(err => setHasError(true))
  }, [searchInput])
  
  const handleSubmit = event => {
    event.preventDefault();
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event => {

    if(event.target.value === '') {
      return setSuggestedList()
    } else {
          const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

    axios.get(URL)
      .then(res => setSuggestedList(res.data.results))
      .cath(err => console.log(err))
    }

    }

  return (
    <div className="App">
      <img className="app__img" src={image3} alt="" />
      <h1 className="app__title">Rick and Morty</h1>
      <form onSubmit={handleSubmit}>
        <div className="app__forms">
        <input className="app__input"
        id='idLocation'
        placeholder='Enter another number from 1 to 126'
        type="text"
        onChange={handleChange}
        />
        <button className="app__btn-primary">Search</button>
        </div>
        <FilterList 
          suggestedList={suggestedList}
          setSearchInput={setSearchInput}
        />
      </form>
      {
        hasError ?
        <Error />
        :
        <>
          <LocationInfo location={location}/>
          <div className="card-container">
            {
              location?.residents.map(url => (
                <CardResident
                key={url}
                url={url}
                />
              ))
            }
          </div>
        </>
      }
    </div>
  )
}


export default App
