import { getDogs } from "../apiManager"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./DogListView.css"

// const dogListDB = await getDogs()

export const DogListView = () => {
    const [dogList, setDogList] = useState([])

    useEffect(() => {
        getDogs().then((dogs) => {
            setDogList(dogs)
            console.log(dogList)
        })

    }, [])

    return (
        <>
            <div className="dog-view-container">
                <h2>DOGS</h2>
                <article className="dog-item-container">
                    {dogList.map(dog => {
                        return (
                            <section className="dog-item" key={dog.id}>
                                <Link className="dog-link" to={`/dogdetails/${dog.id}`}>{dog.name}</Link>
                            </section>
                        )
                    })}
                </article>
            </div>
        </>
    )
}