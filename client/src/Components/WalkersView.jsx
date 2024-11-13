import { getWalkers, getCities, getCityWalkers } from "../apiManager"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./WalkersView.css"

export const WalkersView = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [displayWalkersBasedOnCity, setDisplayWalkersBasedOnCity] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        getWalkers().then(wArray => {
            console.log(wArray)
            setWalkers(wArray)
        })
    }, [])

    useEffect(() => {
        getCities().then(citiesArray => {
            console.log(citiesArray)
            setCities(citiesArray)
        })
    }, [])

    const handleCityChange = (event) => {
        let cityId = event.target.options.selectedIndex
        if (cityId > 0) {
            getCityWalkers(cityId).then(array => {
                console.log(array)
                setWalkers(array)
            })
        }
        else {
            getWalkers().then(wArray => {
                setWalkers(wArray)
            })
        }
    }

    const handleAddDog = (walker) => {
        console.log(walker)
        Navigate(`/adddogtowalker/${walker.id}`)
    }

    const handleRemoveWalker = (walker) => {
        const walkerId = walker.id
        fetch(`http://localhost:5173/api/walkers/${walkerId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (response.ok) {
                setWalkers(previousWalkers => previousWalkers.filter(walkers => walkers.id != walkerId))
            } else {
                console.log('failed to delete walker')
            }
        })
    }

    return (
        <main className="walker-details-view-container">
            <select className="select" onChange={handleCityChange}>
                <option>All Walkers</option>
                {cities.map(city => {
                    return <option key={city.id}>{city.name}</option>
                })}
            </select>
            <article className="walker-item-container">
            <h2>Walkers View</h2>
                { walkers?.walker ? walkers.walker.map(walker => {
                    return (
                        <div className="walker-button-container" key={walker.id}>
                            <section className="walker-item">
                                <Link to={`/editwalker/${walker.id}`}>{walker.name}</Link>
                            </section>
                            <button onClick={() => handleAddDog(walker)}>Add Dog</button>
                            <button onClick={() => handleRemoveWalker(walker)}>Remove Walker</button>
                        </div>
                    )
                })

                :
                
                walkers.map(walker => {
                    return (
                        <div className="walker-button-container" key={walker.id}>
                            <section className="walker-item">
                            <Link to={`/editwalker/${walker.id}`}>{walker.name}</Link>
                            </section>
                            <button onClick={() => handleAddDog(walker)}>Add Dog</button>
                            <button onClick={() => handleRemoveWalker(walker)}>Remove Walker</button>
                        </div>
                    )
                })}
            </article>
        </main>
    )
}