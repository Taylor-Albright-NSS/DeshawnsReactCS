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

    const handleRemoveDog = (dog) => {
        const dogId = dog.id
        fetch(`http://localhost:5173/api/dogs/${dogId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (response.ok) {
                setDogList(prevDogList => prevDogList.filter(d => d.id !== dogId))
            } else {
                console.error("Failed to delete dog")
            }
        })
        .catch(error => {
            console.error("Error deleting dog:", error)
        })
    }

    return (
            <main className="dog-view-container">
                <h2>DOGS</h2>
                <button onClick={() => Navigate("/dogform")}>Add Dog</button>
                <article className="dog-item-container">
                    {dogList.map(dog => {
                        return (
                            <section className="dog-item" key={dog.id}>
                                <Link className="dog-link" to={`/${dog.id}`}>{dog.name}</Link>
                                <button onClick={() => handleRemoveDog(dog)}>Remove</button>
                            </section>
                        )
                    })}
                </article>
            </main>
    )
}