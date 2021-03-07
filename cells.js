const prompt = require('prompt-sync')();
const M = prompt('Enter dimension M: ');
const N = prompt('Enter dimension N: ');
const choice = prompt('Press 1 to randomly generate a matrix or 2 to get a matrix from a file: ');

const fs = require('fs');
let textByLine = [];
let isAlive = [];
let neighbors = [];

if (choice == 2) {
    textByLine = fs.readFileSync('cells.txt').toString().split("\r\n");
}

for (let i = 0; i < M; i++) {
    isAlive[i] = [];
    neighbors[i] = [];
    if (choice == 2) {
        isAlive[i] = textByLine[i].split(" ").map(x => parseInt(x));
    } else {
        for (let j = 0; j < N; j++) isAlive[i][j] = Math.round(Math.random());
    }
}

console.log(isAlive);

const id = setInterval(cellInteraction, 1000);
setTimeout(() => {
    clearInterval(id);
}, 10000);

function findNeighbors(n, m) {
    let neigh = 0;
    for (let i = n - 1; i < n + 2; i++) {
        for (let j = m - 1; j < m + 2; j++) {
            if ((i >= 0) && (j >= 0) && (i < M) && (j < N) && !(i == n && j == m)) {
                if (isAlive[i][j]) neigh++;
            }
        }
    }
    return neigh;
}

function cellInteraction() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            neighbors[i][j] = findNeighbors(i, j);
        }
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (isAlive[i][j]) {
                if (neighbors[i][j] < 2 || neighbors[i][j] > 3)
                    isAlive[i][j] = 0;
            } else {
                if (neighbors[i][j] == 3) isAlive[i][j] = 1;
            }
        }
    }
    console.log(isAlive);
}
