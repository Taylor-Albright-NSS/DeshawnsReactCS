import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDogs } from "../apiManager"
import { getCities } from "../apiManager"

export const DogForm = () => {
    const [cities, setCities] = useState()
    const [newDog, setNewDog] = useState({
        name: '',
        walkerId: null,
        cityId: null,
        walkerDTO: {
            id: 1000,
            name: "tom"
        }
    })
    const [newDogId, setNewDogId] = useState(0)
    const Navigate = useNavigate()

    useEffect(() => {
        getDogs().then(dogsArray => {
            setNewDogId(dogsArray.length + 1)
        })
    }, [])

    useEffect(() => {
        getCities().then(citiesArray => {
            setCities(citiesArray)
        })
    }, [])

    const handleCityChange = (event) => {
        const newCityId = event.target.options.selectedIndex + 1
        setNewDog({...newDog, cityId: newCityId})
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
            await fetch(`http://localhost:5173/api/dogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDog),
            });
            Navigate(`/${newDogId}`)
    }
    const handleInputChange = (e) => {
        let dogCopy = {...newDog}
        dogCopy.name = e.target.value
        setNewDog(dogCopy)
    }
    return (
        <form>
            <h2>Name of dog to add</h2>
            <fieldset>
            <input 
            type='text' 
            placeholder="Dog's name"
            onChange={handleInputChange}
            ></input>
            <select onChange={handleCityChange}>
                {cities && cities.map(city => {
                    return (
                        <option data-id={city.id} key={city.id}>{city.name}</option>
                    )
                })}
            </select>
            <button onClick={handleSubmit}>Add dog</button>
            </fieldset>
        </form>
    )
}