import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDogs } from "../apiManager"

export const DogForm = () => {
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
    useEffect(() => {
        getDogs().then(dogsArray => {
            console.log(dogsArray.length)
            setNewDogId(dogsArray.length + 1)
        })
    }, [])

    const Navigate = useNavigate()


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
            <button onClick={handleSubmit}>Add dog</button>
            </fieldset>
        </form>
    )
}