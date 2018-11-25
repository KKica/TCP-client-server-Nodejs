'use strict';

const net = require('net');
const readline = require('readline');
const PORT = 12345;
const HOST = 'localhost';
const INIT="init"
var password;



class Client {
    constructor(port, address) {
        this.socket = new net.Socket();
        this.address = address || HOST;
        this.port = port || PORT;
        this.init();
    }
    init() {
        var client = this;
        let rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt('Expression?> Press enter to stop> ');
        rl.on('line', function(line) {
            if (line.trim() == "") 
                rl.close();
            else{ 
                let message={
                    password:password,
                    expression:line.trim()
                };
                client.socket.write(JSON.stringify(message));
            }
                
        }).on('close',function(){
            client.socket.destroy();
            process.exit(0);
            
        }); 
        client.socket.connect(client.port, client.address, () => {
            console.log(`Client connected to: ${client.address} :  ${client.port}`);
            rl.prompt();
            });

        client.socket.on('data', (data) => {
            data=data.toString();
            if(data.startsWith(INIT))
                password=data.slice(INIT.length);
            else if (data.endsWith('exit')) 
                client.socket.destroy();
            else{
                console.log(`Result: ${data}`);
                rl.setPrompt('Expression?>');
                rl.prompt();
            }
                
        });

        client.socket.on('close', () => {
            console.log('Client closed');
            });

        client.socket.on('error', (err) => {
            console.error(err);
            });

    }//end init
}
module.exports = Client;