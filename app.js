let express = require('express');
let app = express();

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