import React, { useEffect } from "react";
import store from "../../store";
import { connect } from "react-redux";

function Game({ width, height, blackHoleCount }) {

    const createMatrix = (h, w) => {
        const matrix = [];
        for (let r = 0; r < h; r++) { // heigth
            const row = [];
            for (let c = 0; c < w; c++) { // width 
                row.push(Math.ceil(Math.random()));
            }
            matrix.push(row);
        }
        return matrix;
    }
    useEffect(() => {
        console.log(createMatrix(height, width, blackHoleCount));
    }, [])

    return (
        <>

        </>
    );
}
const mapStateToProps = (state) => ({
    width: state.width,
    height: state.height,
    blackHoleCount: state.blackHoleCount,
});

export default connect(mapStateToProps)(Game);