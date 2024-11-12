import { getWalkers, getCities, getCityWalkers } from "../apiManager"
import { useState, useEffect } from "react"
import "./WalkersView.css"

export const WalkersView = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [displayWalkersBasedOnCity, setDisplayWalkersBasedOnCity] = useState([])

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
        //1 == nashville
        //2 == knoxille
        //3 == memphis
        let cityId = event.target.options.selectedIndex
        console.log(cityId)
        if (cityId > 0) {
            getCityWalkers(cityId).then(array => {
                console.log(array)
                setWalkers(array)
            })
        }
        else {
            getWalkers().then(wArray => {
                console.log(wArray)
                setWalkers(wArray)
            })
        }
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
                        <section className="walker-item" key={walker.id}>
                            {walker.name}
                        </section>
                    )
                })

                :
                
                walkers.map(walker => {
                    return (
                        <section className="walker-item" key={walker.id}>
                            {walker.name}
                        </section>
                    )
                })}
            </article>
        </main>
    )
}