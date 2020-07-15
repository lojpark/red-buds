let express = require('express');
let app = express();

let prize = [];
let board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
let coins = {};
coins['kyj'] = coins['kmg'] = coins['ksj'] = coins['kjy'] = coins['pjk'] = coins['sms'] = coins['ajy'] = coins['pbj'] = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/board', function (req, res) {
    res.sendFile(__dirname + '/client/board.html');
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/client/admin.html');
});

app.get('/result', function (req, res) {
    for (let i = 0; i < 25; i++) {
        if (board[i] == '') {
            res.status(404);
            return res.json({error: 'no result'});
        }
    }
    res.sendFile(__dirname + '/client/result.html');
});

app.get('/coin/:name', function (req, res) {
    res.status(200);
    return res.json({name: req.params.name, coin: coins[req.params.name]});
});

app.get('/coins', function (req, res) {
    res.status(200);
    return res.json({coins: coins});
});

app.get('/board_data', function (req, res) {
    res.status(200);
    return res.json({board: board});
});

app.get('/result_data', function (req, res) {
    if (prize.length == 0) {
        prize = ['lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot', 'lot'];
        while (true) {
            let ok = true;
            let rn = [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25), Math.floor(Math.random() * 25), Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];
    
            for (let i = 0; i < 5; i++) {
                if (board[rn[i]] == 'pbj') {
                    ok = false;
                    break;
                }
                for (let j = 0; j < i; j++) {
                    if (rn[i] == rn[j] || (i != 4 && board[rn[i]] == board[rn[j]])) {
                        ok = false;
                        i = 999;
                        break;
                    }
                }
            }
            if (!ok) {
                continue;
            }
    
            prize[rn[0]] = 'buds';
            prize[rn[1]] = 'case';
            prize[rn[2]] = 'usb';
            prize[rn[3]] = 'usb';
            prize[rn[4]] = 'meet';
            break;
        }
    }

    res.status(200);
    return res.json({prize: prize});
});

app.post('/coin/:name/:pm', function (req, res) {
    res.status(200);
    if (req.params.pm == 'plus') {
        coins[req.params.name]++;
    }
    else {
        coins[req.params.name]--;
    }
    return res.json({coins: coins});
});

app.post('/dips/:name/:index', function (req, res) {
    if (coins[req.params.name] > 0 || board[parseInt(req.params.index)] == req.params.name) {
        if (board[parseInt(req.params.index)] == '') {
            res.status(201);
            coins[req.params.name]--;
            board[parseInt(req.params.index)] = req.params.name;
        }
        else if (board[parseInt(req.params.index)] == req.params.name) {
            res.status(201);
            coins[req.params.name]++;
            board[parseInt(req.params.index)] = '';
        }
        else {
            res.status(403);
            return res.json({error: 'Already selected!', coin: coins[req.params.name], board: board});
        }

        return res.json({name: req.params.name, coin: coins[req.params.name], board: board});
    }
    else {
        res.status(403);
        return res.json({error: 'Not enough coins!', coin: coins[req.params.name], board: board});
    }
});

app.use('/client', express.static(__dirname + '/client'));

app.listen(2000, function(){
    console.log("port: 2000 open");
});