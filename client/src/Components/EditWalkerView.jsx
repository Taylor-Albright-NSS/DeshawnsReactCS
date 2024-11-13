import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCities, getWalkerCities, getWalkerCityBridgeTable } from "../apiManager"

export const EditWalkerView = () => {
    const [walker, setWalker] = useState({})
    const [cities, setCities] = useState([])
    const [initiallyChecked, setInitiallyChecked] = useState({})
    const [walkerCitiesTables, setWalkerCitiesTables] = useState([])
    const [walkerCityTablesToAdd, setWalkerCityTablesToAdd] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getWalkerCityBridgeTable().then(array => {
            let walkerTables = array.filter(arr => arr.walkerId == id)
            setWalkerCitiesTables(walkerTables)
        })
    }, [])

    useEffect(() => {
        getWalkerCities(id).then(walker => {
            console.log(walker)
            setWalker(walker)
        })
    }, [id])

    useEffect(() => {
        getCities().then(cities => {
            setCities(cities)

            if (walker.city) {
                const checkedState = {}
                walker.city.forEach(city => {
                    checkedState[city.name] = true
                })
                setInitiallyChecked(checkedState)
                console.log(checkedState)
            }
        })
    }, [walker.city])

    const handleToggle = (event, city) => {
        const cityId = city.id
        setInitiallyChecked(prevState => ({
            ...prevState,
            [city.name]: !prevState[city.name]
        }))
        let findCity = walker.city.find(c => {
            return c.id == cityId
        })
        if (!findCity && event.target.checked) {
            let wcObject = {
                id: cityId,
            }
            walker.city.push(wcObject)
        }
        if (findCity && !event.target.checked) {
            let cityToRemoveIndex = walker.city.indexOf(findCity)
            walker.city.splice(cityToRemoveIndex, 1)
        }
    }

    const handleSubmit = async (event) => {
        console.log(walker)
        event.preventDefault()
        await fetch("http://localhost:5173/api/walkercities", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(walker)
        })
        const updatedWalker = {
            id: walker.id,
            name: walker.name,
        }
        console.log(updatedWalker)
        await fetch(`http://localhost:5173/api/walkers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedWalker)
        })
    }

    const handleInputChange = (event) => {
        let walkerCopy = {...walker}
        walkerCopy.name = event.target.value
        setWalker(walkerCopy)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <section>
                    <h2>Edit Walker</h2>
                    Edit Name <input type="text" onChange={handleInputChange} placeholder={walker.name}/>
                </section>
                <section>
                    {cities && cities.map(city => (
                        <div key={city.id}>
                            <h6>{city.name}</h6>
                            <input
                                type="checkbox"
                                onChange={(event) => handleToggle(event, city)}
                                checked={!!initiallyChecked[city.name]}
                            />
                        </div>
                    ))}
                </section>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}
