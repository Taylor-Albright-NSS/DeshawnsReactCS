import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { getDog } from "../apiManager";

export const DogDetailsView = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({})

    useEffect(() => {
        getDog(id)
        .then(dog => {setDog(dog)})
    }, [])

    return (
        <main className="dog-details-view-container">
            <article>
                <h2>Dog Details View</h2>
                <h3>{dog && dog.name}</h3>
                <h3>{dog.walkerDTO ? "Walker: " + dog?.walkerDTO?.name : "(no walker)"}</h3>
            </article>
        </main>
    )
}