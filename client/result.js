let board = [];
let prize = [];
let delayTime = 2;
let prizeCount = 0;

function reSize() {
    let boardElement = document.getElementById('board');
    let boardWidth = Math.floor(document.documentElement.clientWidth * .80);
    const boardHeight = Math.floor(document.documentElement.clientHeight * .80);

    if (boardWidth > boardHeight) {
        boardWidth = boardHeight;
    }
    boardElement.style.width = boardWidth + 'px';

    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = Math.floor(boardWidth * .18) + 'px';
        cards[i].style.height = Math.floor(boardWidth * .18) + 'px';
    }
}

function setSize() {
    let boardElement = document.getElementById('board');
    let boardWidth = Math.floor(document.documentElement.clientWidth * .80);
    const boardHeight = Math.floor(document.documentElement.clientHeight * .80);

    if (boardWidth > boardHeight) {
        boardWidth = boardHeight;
    }
    boardElement.style.width = boardWidth + 'px';

    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = Math.floor(boardWidth * .18) + 'px';
        cards[i].style.height = Math.floor(boardWidth * .18) + 'px';
        cards[i].className = 'card ' + board[i] + 't';

        let newFront = document.createElement('div');
        newFront.style.backgroundSize = 'contain';
        newFront.className = 'card__face card__face--front ' + board[i];
        let newBack = document.createElement('div');
        newBack.style.backgroundSize = 'contain';
        newBack.className = 'card__face card__face--back ' + prize[i];
        cards[i].appendChild(newFront);
        cards[i].appendChild(newBack);
    }
}

function initBoard() {
    let boardElement = document.getElementById('board');

    for (let i = 0; i < 25; i++) {
        let newCard = document.createElement('div');
        newCard.id = i.toString();
        newCard.className = 'card';
        boardElement.appendChild(newCard);
    }

    getBoard();
}

function getBoard() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            board = xhr.response['board'];
            getPrize();
        }
    };
    xhr.responseType = 'json';
    xhr.open('GET', '/board_data');
    xhr.send();
}

function getPrize() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            prize = xhr.response['prize'];
            setSize();
        }
    };
    xhr.responseType = 'json';
    xhr.open('GET', '/result_data');
    xhr.send();
}

function flip() {
    if (prizeCount == 0) {
        let cards = document.getElementsByClassName('pbjt');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.toggle('itsme');
            setTimeout(function () {
                cards[i].style.transition = 'transform ' + delayTime.toString() + 's';
                cards[i].classList.toggle('itsme');
                cards[i].classList.toggle('is-flipped');
            }, 3100);
        }

        delayTime = 3;
        prizeCount += cards.length;
        return;
    }
    for (let i = 0; i < 10000; i++) {
        let rn = Math.floor(Math.random() * 25);
        let card = document.getElementById(rn.toString());
        if (!card.classList.contains('is-flipped') && !card.classList.contains('itsme')) {
            if (prize[rn] == 'buds' && prizeCount != 24) {
                continue;
            }

            card.classList.toggle('itsme');
            setTimeout(function () {
                if (prizeCount > 10) delayTime = 4;
                if (prizeCount > 12) delayTime = 5;
                if (prizeCount > 17) delayTime = 6;
                if (prizeCount > 22) delayTime = 7;
                prizeCount++;
                card.style.transition = 'transform ' + delayTime.toString() + 's';
                card.classList.toggle('itsme');
                card.classList.toggle('is-flipped');
                if (prize[rn] != 'lot') {
                    setTimeout(function () {
                        var modal = document.getElementById("modal");
                        var modalImg = document.getElementById("modal-image");
                        modal.style.display = "block";
                        modalImg.src = 'client/asset/' + prize[rn] + '.png';
                        var span = document.getElementsByClassName("close")[0];
                        span.onclick = function() { 
                            modal.style.display = "none";
                        }
                    }, delayTime * 1000 + 300);
                }
            }, 3100);
            break;
        }
    }
}

window.onresize = function(event) {
    reSize();
};

initBoard();