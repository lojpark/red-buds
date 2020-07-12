let name;

function setSize() {
    let board = document.getElementById('board');
    let boardWidth = Math.floor(document.documentElement.clientWidth * .80);
    const boardHeight = Math.floor(document.documentElement.clientHeight * .80);

    if (boardWidth > boardHeight) {
        boardWidth = boardHeight;
    }
    board.style.width = boardWidth + 'px';

    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.width = Math.floor(boardWidth * .18) + 'px';
        buttons[i].style.height = Math.floor(boardWidth * .18) + 'px';
    }
}

function initBoard() {
    let board = document.getElementById('board');

    for (let i = 1; i <= 25; i++) {
        let newButton = document.createElement('button');
        newButton.onclick = function () {
            dips(newButton);
        };
        board.appendChild(newButton);
    }

    setSize();

    name = window.location.href.split('?name=')[1];
}

function dips(e) {
    e.className = 'kyj';
}

window.onresize = function(event) {
    setSize();
};

initBoard();