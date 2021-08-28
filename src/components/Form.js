import { useState } from "react";

export const Form = ({ updateCity }) => {

    const [city, setCity] = useState('');



    const onSubmit = (e) => {
        e.preventDefault();

        //console.log('City: ' + city);
        if (!updateCity) {
            return alert('Please, enter a city!');
        }

        updateCity(city);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Enter a city:</label>
            <br />
            <input type='text' name='city' onChange={e => setCity(e.target.value)} />
            <br />
            <input type='submit' value='Send' onClick={() => { updateCity(city) }} />
        </form>
    )
}
