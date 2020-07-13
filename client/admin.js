let coins = {};

function postCoin(name, pm) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            coins = xhr.response['coins'];
            setCoins();
        }
    };
    xhr.responseType = 'json';
    xhr.open('POST', '/coin/' + name + '/' + pm);
    xhr.send();
}

function getCoins() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            coins = xhr.response['coins'];
            setCoins();
        }
    };
    xhr.responseType = 'json';
    xhr.open('GET', '/coins');
    xhr.send();
}

function setCoins() {
    let coinsElement = document.getElementById('coins');
    coinsElement.innerHTML = '';
    coinsElement.innerHTML += 'kyj: ' + coins['kyj'] + ' kmg: ' + coins['kmg'] + ' ksj: ' + coins['ksj'] + ' kjy: ' + coins['kjy'] + '<br/>';
    coinsElement.innerHTML += 'pjk: ' + coins['pjk'] + ' sms: ' + coins['sms'] + ' ajy: ' + coins['ajy'] + ' pbj: ' + coins['pbj'] + '<br/>';
}

getCoins();