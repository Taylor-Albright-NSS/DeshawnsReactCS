import { getDogs } from "../apiManager"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./DogListView.css"

// const dogListDB = await getDogs()

export const DogListView = () => {
    const [dogList, setDogList] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        getDogs().then((dogs) => {
            setDogList(dogs)
            console.log(dogs)
        })
    }, [])

    return (
            <main className="dog-view-container">
                <h2>DOGS</h2>
                <button onClick={() => {Navigate("/dogform")}}>Add Dog</button>
                <article className="dog-item-container">
                    {dogList.map(dog => {
                        return (
                            <section className="dog-item" key={dog.id}>
                                <Link className="dog-link" to={`/${dog.id}`}>{dog.name}</Link>
                            </section>
                        )
                    })}
                </article>
            </main>
    )
}