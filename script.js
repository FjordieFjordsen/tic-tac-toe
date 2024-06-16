let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';
let AUDIO_WIN = new Audio('sound/win.mp3');
let AUDIO_CHANGE = new Audio('sound/change.mp3');

function init() {
    render();
    updateCurrentPlayer();
}


function handleClick(index, cell) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateSvgCircle() : generateSvgX();
        cell.onclick = null;
        if (checkWin()) {
            drawWinningLine();
            AUDIO_WIN.play();
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
            updateCurrentPlayer();
        }
    }
}

function updateCurrentPlayer() {
    if (currentPlayer === 'circle') {
        document.getElementById('currentObject').innerHTML = generateSvgCircle();
    } else {
        document.getElementById('currentObject').innerHTML = generateSvgX();
    }
}



function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }
    return null;
}


function drawWinningLine() {
    const pattern = checkWin();
    if (pattern) {
        const [start, middle, end] = pattern;

        // Berechne die Koordinaten der Zellenmitte
        const cellSize = 70;
        const startX = (start % 3) * cellSize + cellSize / 2;
        const startY = Math.floor(start / 3) * cellSize + cellSize / 2;
        const middleX = (middle % 3) * cellSize + cellSize / 2;
        const middleY = Math.floor(middle / 3) * cellSize + cellSize / 2;
        const endX = (end % 3) * cellSize + cellSize / 2;
        const endY = Math.floor(end / 3) * cellSize + cellSize / 2;

        // Erzeuge das SVG-Element für die Linie
        const svgLine = `
            <svg width="100%" height="100%" viewBox="0 0 ${cellSize * 3} ${cellSize * 3}" xmlns="http://www.w3.org/2000/svg" style="position:absolute; top:0; left:0; pointer-events:none;">
                <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="orange" stroke-width="0.4" />
            </svg>
        `;

        // Füge das SVG-Element dem contentDiv hinzu
        const contentDiv = document.getElementById('content');
        contentDiv.insertAdjacentHTML('beforeend', svgLine);
    }
}



function render() {
    const contentDiv = document.getElementById('content');

    // Tabelle generieren
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateSvgCircle();
            } else if (fields[index] === 'cross') {
                symbol = generateSvgX();
            }
            tableHtml += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;
}



function generateSvgCircle() {
    const WIDTH = 50;
    const HEIGHT = 50;
    const COLOR = "green";
    
    const radius = (WIDTH / 2) - 5;
    const circumference = 2 * Math.PI * radius;

    const svgCode = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="${radius}" stroke="${COLOR}" stroke-width="5" fill="none">
            <animate attributeName="stroke-dasharray" from="0, ${circumference}" to="${circumference}, ${circumference}" dur="250ms" repeatCount="1" />
        </circle>
    </svg>
    `;

    return svgCode;
}

// Ausgabe des generierten SVG-Codes in der Konsole
console.log(generateSvgCircle());


function generateSvgX() {
    const WIDTH = 50;
    const HEIGHT = 50;
    const COLOR = "yellow";
    const LINE_LENGTH = 50;
    const OFFSET = (WIDTH - LINE_LENGTH) / 2; // Calculate the offset to center the lines

    const svgCode = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${OFFSET}" y1="${OFFSET}" x2="${OFFSET + LINE_LENGTH}" y2="${OFFSET + LINE_LENGTH}" stroke="${COLOR}" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x2" from="${OFFSET}" to="${OFFSET + LINE_LENGTH}" dur="250ms" repeatCount="1" />
            <animate attributeName="y2" from="${OFFSET}" to="${OFFSET + LINE_LENGTH}" dur="250ms" repeatCount="1" />
        </line>
        <line x1="${OFFSET + LINE_LENGTH}" y1="${OFFSET}" x2="${OFFSET}" y2="${OFFSET + LINE_LENGTH}" stroke="${COLOR}" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x2" from="${OFFSET + LINE_LENGTH}" to="${OFFSET}" dur="250ms" repeatCount="1" />
            <animate attributeName="y2" from="${OFFSET}" to="${OFFSET + LINE_LENGTH}" dur="250ms" repeatCount="1" />
        </line>
    </svg>
    `;

    return svgCode;
}


function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render();
    updateCurrentPlayer();
    AUDIO_CHANGE.play();
}











