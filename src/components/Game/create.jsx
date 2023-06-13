export const Mine = -1;

function createField(size,black) {
  const field = new Array(size).fill(0);

  function inc(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === Mine) return;

      field[y * size + x] += 1;
    }
  }

  for (let i = 0; i < /* количество мин */black;) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[y * size + x] === Mine) continue;

    field[y * size + x] = Mine;

    i += 1;

    inc(x + 1, y);
    inc(x - 1, y);
    inc(x, y + 1);
    inc(x, y - 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
  }

  return field;
}

export const Mask = {
  Transparent: 0,
  Fill: 1,
  Flag: 2,
  Question: 3,
};

export const mapMaskToView = {
  [Mask.Transparent]: null,
  [Mask.Fill]: "x",
  [Mask.Flag]: "🏴",
};
export default createField;