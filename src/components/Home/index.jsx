import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function HomeScreen() {
    const [matrixWidth, setMatrixWidth] = useState(null)
    const [matrixHeight, setMatrixHeight] = useState(null)
    const [blackHoles, setBlackHoles] = useState(null)
    return (
        <div id="container">
            <div id='matrix_size'>
                <label htmlFor="width">
                    <input type="number" id="width" required
                        onInput={(e) => setMatrixWidth(e.target.value)}
                        value={matrixWidth} min={2} />
                    <span>Width</span>
                </label>
                <label htmlFor="height">
                    <input type="number" id="height" required
                        onInput={(e) => setMatrixHeight(e.target.value)}
                        value={matrixHeight} min={2} />
                    <span>Height</span>
                </label>
            </div>
            <label htmlFor="blackholes">
                <input type="number" id="blackholes" required
                    onInput={(e) => setBlackHoles(e.target.value)}
                    value={blackHoles} min={1} />
                <span>Black Holes</span>
            </label>
            <button id='start' onClick={()=>{}}><Link to={'/game'}>Generate Game</Link></button>
        </div>
    );
}

export default HomeScreen;
