import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import "./style.css"
import createField, { Mask, Mine, mapMaskToView } from "../Game/create"

function Game({ height, blackHoleCount }) {
    const size = height;
    const dimension = new Array(size).fill(null);

    const [death, setDeath] = useState(false);
    const [field, setField] = useState(() => createField(size, blackHoleCount));
    const [mask, setMask] = useState(() => new Array(size * size).fill(Mask.Fill));

    const win = useMemo(() => !field.some(
        (f, i) =>
            f === Mine && mask[i] !== Mask.Flag
            && mask[i] !== Mask.Transparent
    ),
        [field, mask]
    );

    // Function to calculate the number of mines around a cell
    const countMinesAround = (x, y) => {
        let count = 0;
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            for (let offsetY = -1; offsetY <= 1; offsetY++) {
                const newX = x + offsetX;
                const newY = y + offsetY;
                if (
                    newX >= 0 &&
                    newX < size &&
                    newY >= 0 &&
                    newY < size &&
                    field[newY * size + newX] === Mine
                ) {
                    count++;
                }
            }
        }
        return count;
    };

    return (
        <div>
            {dimension.map((_, y) => {
                return (<div key={y} style={{ display: "flex" }}>
                    {dimension.map((_, x) => {
                        const index = y * size + x;
                        return (
                            <div
                                key={x}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 25,
                                    height: 25,
                                    margin:2,
                                    outline:"1px solid white",
                                    backgroundColor: death ? "#9b2226" : win ? "#b9fbc0" : "000",
                                }}
                                onClick={() => {
                                    if (win || death) return;

                                    if (mask[index] === Mask.Transparent) return;

                                    const clearing = [];

                                    function clear(x, y) {
                                        if (x >= 0 && x < size && y >= 0 && y < size) {
                                            if (mask[y * size + x] === Mask.Transparent) return;

                                            clearing.push([x, y]);
                                        }
                                    }

                                    clear(x, y);

                                    while (clearing.length) {
                                        const [x, y] = clearing.pop();

                                        mask[y * size + x] = Mask.Transparent;

                                        if (field[y * size + x] !== 0) continue;

                                        clear(x + 1, y);
                                        clear(x - 1, y);
                                        clear(x, y + 1);
                                        clear(x, y - 1);
                                    }

                                    if (field[y * size + x] === Mine) {
                                        mask.forEach((_, i) => (mask[i] = Mask.Transparent));

                                        setDeath(true);
                                    }

                                    setMask((prev) => [...prev]);
                                }}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (win || death) return;

                                    if (mask[index] === Mask.Transparent) return;

                                    if (mask[index] === Mask.Fill) {
                                        mask[index] = Mask.Flag;
                                    } else if (mask[index] === Mask.Flag) {
                                        mask[index] = Mask.Question;
                                    }

                                    setMask((prev) => [...prev]);
                                }}
                            >
                                {mask[index] !== Mask.Transparent
                                    ? mapMaskToView[mask[index]]
                                    : field[index] === Mine
                                        ? <img src={process.env.PUBLIC_URL+ "/bomb-icon.svg"}></img>
                                        : countMinesAround(x, y)} 
                            </div>
                        );
                    })}
                </div>);
            })}
        </div>
    );
}

const mapStateToProps = (state) => ({
    width: state.width,
    height: state.height,
    blackHoleCount: state.blackHoleCount,
});

export default connect(mapStateToProps)(Game);
