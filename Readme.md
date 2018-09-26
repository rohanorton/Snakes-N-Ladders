# Snakes-n-Ladders

![Snakes and Ladders](/screenshot.png)

## What is it?

A multiplayer snake and ladders game. It uses a centralised game server that
players can connect to to play with others. Both server and client are written
in Typescript.

## Installation and Running

This project can be run using docker.

If you do not have docker installed on your system, you can find detailed
instructions [here](https://docs.docker.com/install/)

Once you have docker and docker-compose on your system you can then simply run
the command:

```
docker-compose up
```

This will build and start the services required for this project.

Once the servers are running you can then access the site on localhost:8080

## Technologies Used

The project is built almost entirely in Typescript, which is a compile to
Javascript language that essentially adds a static type system to Javascript.
I wanted to use Typescript as it provides a number of nice features that make
designing and refactoring easier.

The server uses socket.io to provide websocket connectivity. Although the
library is quite heavy compared to some other websocket libraries I considered,
in the end I chose to use socket.io because it handles many of the issues that
other libraries expect you to clean up yourself (i.e. pruning dead connections).

For the frontend I used React combined with MobX State Tree. I chose React
because I have used it many times before and find that its declarative model
simplifies interacting with the browser a great deal. MobX State Tree is a
library I have only recently tried out and am still finding my way with, but
having worked with both MobX and Redux in the past, I find that it marries many
of the aspects that I like about these libraries: it allows you to centralise
state into a single model like Redux (a.k.a the single source of truth), and it
has all the speed of MobX.

One notable library that I discovered in writing this project was
[io-ts](https://github.com/gcanti/io-ts), which is a library adding runtime type
checks that is compatible with Typescript's compile time types. This is
fantastic as it saves a great deal of effort in writing decoders by hand.

## Code

All of the game logic was written first using test-driven development, which was
really useful in finding a nice design. In the end my game makes use of the
"state" design pattern to manage the behaviour in the different phases of the
game.

It also made it possible to switch out my implementation of the board at a later
point when I realised that my original design (a simple flat array) had many
[shortcomings](https://github.com/rohanorton/Snakes-N-Ladders/commit/f53e2a36065b964314e1d82d33380606180ef9dd)
that I could easily rectify.

## A Quick Note on Assets

I should note that I made used some SVG assets from the following pen:

https://codepen.io/alvaromontoro/pen/gjWPNW

All other work is my own.
