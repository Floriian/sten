# <p align="center">STEN</p>

# Basic concept

The app name is anagram of Nest.
The basic concept is create a free API for learning purposes. In my school we learn Python, and this created specially for my school. But I think, it's very useful for other schools for teaching how RESTAPI-s works, or everyone else :) It uses <a href="https://nestjs.com">NestJS</a> under the hood. Supports basic HTTP methods (GET, POST, PATCH, DELETE). I will add Put method in the future.

# How can I install locally?

1. [With Docker-Compose](#docker)
2. [Without Docker-Compose](#without-docker)

## <a name="docker"></a>With Docker-Compose

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

## <a name="without-docker"></a>Without Docker-Compose

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

- [/animal](#animals)

  - [GET](#animals.get)
  - [POST](#animals.post)
  - [PATCH](#animals.patch)
  - [DELETE](#animals.delete)

- [/car](#cars)
  - [GET](#cars.get)
  - [POST](#cars.post)
  - [PATCH](#cars.patch)
  - [DELETE](#cars.delete)

## <a name="animals"></a>Animals

### <a name="animals.get"></a>GET

```http
GET /animal
```

It returns all animals in the db. <br>

|    Option    |  Value   |
| :----------: | :------: |
|    Params    |   None   |
| Request body | Required |

Example responses

- Response (Code 200):
  ```json
  [
    {
      "id": 0,
      "name": "The animal's name",
      "specie": "The animal's specie",
      "age": 10
    },
    {
      "id": 1,
      "name": "The animal's name",
      "specie": "The animal's specie",
      "age": 11
    }
  ]
  ```
- Response (Code 404): No animals in the database.

#### Get by ID.

```http
GET /animal/:id
```

It returns one animal, with a given ID. <br/>

Examples:

```http
GET /animal/1
```

Example responses

- Response (Code 200):

  ```json
  {
    "id": 1,
    "name": "Lessie",
    "specie": "Fox",
    "age": 18
  }
  ```

- Response (Code 404):<br>
  No animal found in database.
- Response (Code 400):<br>
  This response happens, when the param not int, It will return a body
  <!-- TODO -->
  <br/>

### <a name="animals.post"></a>POST

```http
POST /animal
```

|    Option    |  Value   |
| :----------: | :------: |
|    Params    |   None   |
| Request body | Required |

Request body options: <br>

|  Key   |  Type  | Required? |
| :----: | :----: | :-------: |
|  name  | string |    ✅     |
| specie | string |    ✅     |
|  age   |  int   |    ✅     |

Example request:

```http
POST /animal
Content-Type: application/json

{
   "name": "Radír",
   "specie": "Mopsz",
   "age": 12
}
```

Example responses

- Response (Code 201):<br>
  The animal has been created, and returns the created animal data.
  ```json
  {
    "id": 1,
    "name": "Radír",
    "specie": "Mopsz",
    "age": 12
  }
  ```
- Response (Code 400) <br>
  This response happens, when the body is failed the validation test.

### <a name="animals.patch"></a>PATCH

```http
PATCH /animal/:id
```

It will update animal by id, and returns the animal with updated data.

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Required |
| Request body | Required |

Request body options:

|  Key   |  Type  | Required? |
| :----: | :----: | :-------: |
|  name  | string |    ❌     |
| specie | string |    ❌     |
|  age   |  int   |    ❌     |

Example request:

```http
PATCH /animal/1
Content-Type: application/json

{
   "name": "Lessie"
}
```

Example responses

- Response (Code 202)

  ```json
  {
    "name": "Lessie",
    "specie": "Fox",
    "age": 10
  }
  ```

- Response (Code 404): <br>No animal found with this ID.
- Response (Code 400): <br>This response happens, when the body is failed the validation test.

### <a name="animals.delete"></a>DELETE

```http
DELETE /animal/:id
```

It deletes animal by id, and return the deleted animal's data.

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Required |
| Request body |   None   |

Example request

```http
DELETE /animal/1
```

Example responses

- Response (Code 200)
  ```json
  {
    "id": 1,
    "name": "Radír",
    "specie": "Mopsz",
    "age": 10
  }
  ```
- Response (Code 404) <br>
  No animal fond with the given ID.
- Response (Code 400) <br>
  This response happens, when the param not int, It will return a body
