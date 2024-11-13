import { useState, useEffect } from "react"
import { getDogs, getWalkerCities } from "../apiManager"
import { useParams, Link } from "react-router-dom"


export const AddDogToWalkerView = () => {
    const [dogs, setDogs] = useState([])
    const [walker, setWalker] = useState({})
    const [cities, setCities] = useState([])

    const { id } = useParams()

    useEffect(() => {
        getDogs().then(dogArray => {
            setDogs(dogArray)
        })
    }, [])
    useEffect(() => {
        getWalkerCities(id).then(walker => {
            setWalker(walker)
            setCities(walker.city)
            console.log(walker)
            console.log(walker.city)
        })
    }, [])

    const handleAssignDog = (dogId) => {
        const dogToModify = dogs.find(dog => dog.id === dogId)
        dogToModify.walkerId = parseInt(id)
        console.log(dogToModify, ' DOG TO ADD')
        fetch(`http://localhost:5173/api/dogs/${dogToModify.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dogToModify)
        })
    }

    return (
        <section>
            {cities.map(city => {
                const dogsInCity = dogs.filter(dog => dog.cityId === city.id && dog.walkerId != walker.id)
                return (
                    <div className="city-and-dog-container" key={city.id}>
                        <h2>{city.name}</h2>
                        <ul>
                            {dogsInCity.map(dog => {
                                return <Link key={dog.id}><li onClick={() => handleAssignDog(dog.id)}>{dog.name}</li></Link>
                            })}
                        </ul>
                    </div>
                )
            })}
        </section>
    )
}
