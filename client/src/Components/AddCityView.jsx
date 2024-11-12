import { useState, useEffect } from "react"
import { getCities } from "../apiManager"

export const AddCityView = () => {
    const [cities, setCities] = useState([])
    const [newCityName, setNewCityName] = useState({
        name: ''
    })

    useEffect(() => {
        getCities().then(cities => {
            console.clear()
            console.log(cities, ' CITIES')
            setCities(cities)
        })
    }, []) 

    const handleAddCity = async () => {
        const newCity = newCityName
        await fetch(`http://localhost:5173/api/cities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCity)
        })
        setCities([...cities, newCity])
        setNewCityName({...newCityName, name: ''})
    }

    const handleInputChange = (event) => {
        let cityCopy = {...newCityName}
        cityCopy.name = event.target.value
        setNewCityName(cityCopy)
        console.log(cityCopy)
    }

    return (
        <main className="cities-view-container">
            <input type='text'value={newCityName.name} onChange={handleInputChange}/><button onClick={handleAddCity}>Add</button>
            <article className="cities-list">
                {cities.map(city => {
                    return (
                        <section>{city.name}</section>
                    )
                })}
            </article>
        </main>
    )
}