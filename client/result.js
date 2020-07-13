let board = [];

function setSize() {
    let boardElement = document.getElementById('board');
    let boardWidth = Math.floor(document.documentElement.clientWidth * .80);
    const boardHeight = Math.floor(document.documentElement.clientHeight * .80);

    if (boardWidth > boardHeight) {
        boardWidth = boardHeight;
    }
    boardElement.style.width = boardWidth + 'px';

    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.width = Math.floor(boardWidth * .18) + 'px';
        buttons[i].style.height = Math.floor(boardWidth * .18) + 'px';
    }
}

function setBoard() {
    for (let i = 0; i < 25; i++) {
        let button = document.getElementById(i.toString());
        button.className = board[i];
    }
}

function initBoard() {
    let boardElement = document.getElementById('board');

    for (let i = 0; i < 25; i++) {
        let newButton = document.createElement('button');
        newButton.id = i.toString();
        newButton.onclick = function () {
            postDips(newButton);
        };
        boardElement.appendChild(newButton);
    }

    getBoard();

    setSize();
    setBoard();
}

function getBoard() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            board = xhr.response['board'];
            setBoard();
        }
    };
    xhr.responseType = 'json';
    xhr.open('GET', '/board_data');
    xhr.send();
}

window.onresize = function(event) {
    setSize();
};

initBoard();