import React, { useRef } from 'react';
import './style.css';
import store from '../../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function HomeScreen({setWidth,setHeight,setBlackHoleCount}) {
    return (
        <div id="container">
            <div id='matrix_size'>
                <label htmlFor="height">
                    <input type="number" id="height" required
                        onInput={(e) => setHeight(e.target.value)}
                        min={2} max={30}/>
                    <span>Height</span>
                </label>
            </div>
            <label htmlFor="blackholes">
                <input type="number" id="blackholes" required
                    onInput={(e) => setBlackHoleCount(e.target.value)}
                    min={1} />
                <span>Black Holes</span>
            </label>
            <button id='start'><Link to={'/game'}>Generate Game</Link></button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    width: state.width,
    height: state.height,
    blackHoleCount: state.blackHoleCount,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setWidth: (width) => dispatch({ type: 'SET_WIDTH', payload: width }),
    setHeight: (height) => dispatch({ type: 'SET_HEIGHT', payload: height }),
    setBlackHoleCount: (count) => dispatch({ type: 'SET_BLACK_HOLE_COUNT', payload: count }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);