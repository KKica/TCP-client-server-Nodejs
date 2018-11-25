# TCP-client-server-Nodejs
 "Calculator as a service" protocol. The idea is to create a TCP server that receives a string containing a math expression and the server preforms the calculation and returns the result.
For example:
Client sends server "1 + 1 * 30" and the server should return 31.

Each client receives a sha-512 hash password upon connection that will be used for verifying the client per request.
The server should send the password to the client when the client creates an initiation request.
From here forwards the client will send the password with every request and the server should verify the password with the client.

So the final architecture looks like this:

    Server 
    ^   ^
   (client math problem)
   /     \
  /       \   
 client   client

 
 Instructions to run:

1.Run the ServerApp using the node command
node ServerApp.js

2.Run ClientApp
node ClientApp.js

3.Type expressions you wish to evaluate. You do not need to always use "*" eg. 3(sin(43)+4|sin(5^4)|)^3. 
Be careful, angles are in degrees, not radians.
