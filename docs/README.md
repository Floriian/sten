<a name="basic-concept"></a>
# Basic concept

The app name is an anagram of Nest. The basic concept is to create a free API for learning purposes. In my school, we learn Python, and this was created especially for my school. But I think, it’s very useful for other schools for teaching how RESTAPI-s works, or everyone else :) It uses <a href="https://nestjs.com">NestJS</a> under the hood. Supports basic HTTP methods (GET, POST, PATCH, DELETE). I will add the Put method in the future. The database uses one-to-one relationships, except for animals. Animals are separated.

# How can I install locally? 
<a name="install-locally"></a>
1. [With Docker-Compose](#with-docker-compose)
2. [Without Docker-Compose](#without-docker-compose)

## <a name="with-docker-compose"></a>With Docker-Compose

You will need:

- <a href="https://www.docker.com">Docker</a>
- Terminal (zsh, bash, powershell)
- <a href="https://git-scm.com">Git</a>
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

## <a name="without-docker-compose"></a>Without Docker-Compose

You will need:

- <a href="https://www.visualcrossing.com/">A Weather API key</a>
- Shell
- <a href="https://git-scm.com">Git</a>
- <a href="https://www.postgresql.org">PostgreSQL</a>
- <a href="https://nodejs.org/en/">NodeJS</a>

0. Get the Weather API key, and save somewhere.
1. Install NodeJS & PostgreSQL on your computer.
2. Create a database in the Postgres server.
3. Clone the git repo.
4. In terminal, navigate to Gitrepos folder, and type:

```bash
npm install
```

5. Open .env file, and change WeatherAPI key to your API key.
6. Modify your connection string, with your PostgreSQL authentication info.

```env
DATABASE_URL="postgresql://<POSTGRES_USERNAME>:<POSTGRES_PASSWORD>@localhost:<POSTGRES_PORT>/<POSTGRES_DATABASE>?schema=public"
```

7. After you changed the .env file, enter the following command:

```bash
npm run build
```

8. After the application is builded, start the server.

```bash
npm run start:prod
```

9. The port is in the console, where is the app listening.

# Endpoints

- [/animal](animals.md#animals.main)

  - [GET](animals.md#animals.get)
	  - [Params](animals.md#animals.get.params)
  - [POST](animals.md#animals.post)
  - [PATCH](animals.md#animals.patch)
  - [DELETE](animals.md#animals.delete)

- [/car](car.md)
  - [GET](#cars.get)
	  - [Params](#city.get.params)
  - [POST](#cars.post)
  - [PATCH](#cars.patch)
  - [DELETE](#cars.delete)
- [/city](city.md)
  - [GET](#city.get)
	  - [Params](#city.get.params)
	  - [Queries](#city.get.queries)
  - [POST](#city.post)
  - [PATCH](#city.patch)
  - [DELETE](#city.delete)
- [/person](Person.md)
  - [GET](#person.get)
	  - [Params](#person.get.params)
	  - [Queries](#person.get.queries)
  - [POST](#person.post)
  - [PATCH](#person.patch)
  - [DELETE](#person.delete)