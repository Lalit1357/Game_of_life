//console.log("Game Of Life");

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const resolution = 3;
canvas.width = 600;
canvas.height = 600;

const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

function createGrid() {
    return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = createGrid();

requestAnimationFrame(update);

// console.log(grid);
function update() {
    grid = newGeneration(grid);
    render(grid);
    requestAnimationFrame(update);

}


function newGeneration(grid) {
    const newGeneration = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
                        const currentNeighbour = grid[col + i][row + j];
                        numNeighbours += currentNeighbour;
                    }



                }
            }

            // Rules of the game 

            if (cell === 1 && numNeighbours < 2) {
                newGeneration[col][row] = 0;
            } else if (cell === 1 && numNeighbours > 3) {
                newGeneration[col][row] = 0;
            } else if (cell === 0 && numNeighbours === 3) {
                newGeneration[col][row] = 1;
            }
        }
    }
    return newGeneration;
}


function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            context.beginPath();
            context.rect(col * resolution, row * resolution, resolution, resolution);
            context.fillStyle = cell ? '#FF0000' : '#F0E68C';
            context.fill();
            // context.stroke();
        }
    }

}

