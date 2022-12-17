# <p align="center">STEN</p>

## Basic concept

The app name is anagram of Nest.
The basic concept is create a free API for learning purposes. In my school we learn Python, and this created specially for my school. But I think, it's very useful for other schools for teaching how RESTAPI-s works, or everyone else :) It uses <a href="https://nestjs.com">NestJS</a> under the hood. Supports basic HTTP methods (GET, POST, PATCH, DELETE). I will add Put method in the future.

## How can I install locally?

1. [With Docker-Compose](#docker)
2. [Without Docker-Compose](#without-docker)

### <a name="docker"></a>With Docker-Compose

- <a href="https://www.docker.com">Docker</a>
- Terminal (zsh, bash, powershell)
- Git
- <a href="https://www.visualcrossing.com/">A Weather API key</a>

0. Register to <a href="https://www.visualcrossing.com/weather-api">visualcrossing</a>, and you will get an api key. Copy the given API key.
1. After you installed Docker, you need to clone this repo. <br/>
   With HTTPS: <br/> `git clone https://github.com/Floriian/sten.git` <br/>
   With SSH: <br/> `git clone https://github.com/Floriian/sten.git`
2. Navigate to git repo's folder, and edit the docker-compose file: <br/>
   The app is listening on default port 3000. If the port is busy, it runs on port 5400. If theese ports, is not good for you, change (or add a new port) the first value of ports, and write an another expose children with the choosed port. <br/>
3. Start the app: <br/>
   `docker compose up -d`, or `docker-compose up -d`
4. Verify the app is running.
   `docker ps` it shows something similar to this:
   <img src="https://i.imgur.com/w9rCUun.png"/>
5. Swagger: open browser, and type (with default port):
   <a>http://localhost:3000</a>

### <a name="without-docker"></a>Without Docker-Compose
