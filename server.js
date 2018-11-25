'use strict';

const net = require('net');
const calculator= require('./calculator');
const sha=require("./sha");
const crypto = require("crypto");
const PORT = 12345;
const HOST = 'localhost';
const INIT="init"
var arrayOfUsers=[];

class Server {
    constructor(port, address) {
        this.port = port || PORT;
        this.address = address || HOST;
        this.init();
    }

    init(){
        let server = this;
        let response=undefined;
        let onClientConnected = (sock) => {
            let clientName = `${sock.remoteAddress}:${sock.remotePort}`;
            console.log(`new client connected: ${clientName}`);
            let id=sha(crypto.randomBytes(1000).toString('hex'));
            arrayOfUsers[clientName]=id;
            sock.write(INIT+id);
            sock.on('data', (data) => {
                let request=JSON.parse(data.toString());
                console.log(`${clientName} Says: ${request.expression}`);
                if(arrayOfUsers[clientName]==request.password)
                    response=calculator(request.expression)||"Expression was not correct:";
                else
                    response="Wrong Password!! exit";
                sock.write(""+response);
            });
            sock.on('close', () => {
                console.log(`connection from ${clientName} closed`);
            });
            sock.on('error', (err) => {
                console.log(`Connection ${clientName} error: ${err.message}`);
            });
        }//end onClientConnected
        server.connection = net.createServer(onClientConnected);
        server.connection.listen(PORT, HOST, function() {
            console.log(`Server started at: ${HOST}:${PORT}`);
        });
    }//end init
}
module.exports = Server;