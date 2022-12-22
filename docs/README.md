# Basic concept

The app name is an anagram of Nest. The basic concept is to create a free API for learning purposes. In my school, we learn Python, and this was created especially for my school. But I think, it’s very useful for other schools for teaching how RESTAPI-s works, or everyone else :) It uses <a href="https://nestjs.com">NestJS</a> under the hood. Supports basic HTTP methods (GET, POST, PATCH, DELETE). I will add the Put method in the future. The database uses one-to-one relationships, except for animals. Animals are separated.

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
- [/city](#city)
  - [GET](#city.get)
  - [POST](#city.post)
  - [PATCH](#city.patch)
  - [DELETE](#city.delete)

## <a name="animals"></a>Animals

### <a name="animals.get"></a>GET

```http
GET /animal
```

It returns all animals in the db. <br>

|    Option    | Value |
| :----------: | :---: |
|    Params    | None  |
| Request body | Empty |

Example responses

- Response (Code 200):
  ```json
  [
    {
      "id": 0,
      "name": "Radír",
      "specie": "Mopsz",
      "age": 10
    },
    {
      "id": 1,
      "name": "Bella",
      "specie": "Németjuhász",
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
| Request body | Optional |

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
- Response (Code 400): <br>This response happens, when the body/param is failed the validation test.

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

## <a name="cars"></a>Cars

### <a name="cars.get"></a>GET

```http
GET /car
```

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Optional |
| Request body |   None   |

It will returns all cars.

Example responses

- Response (Code 200)
  ```json
  [
    {
      "id": 1,
      "manufacturer": "BMW",
      "model": "3-series",
      "year": 2010,
      "age": 12,
      "licensePlate": "OO:OM-300",
      "fuel": "PETROL"
    },
    {
      "id": 2,
      "manufacturer": "Mercedes",
      "model": "E-Classe",
      "year": 2010,
      "age": 12,
      "licensePlate": "AA:MG-630",
      "fuel": "PETROL"
    }
  ]
  ```
- Response (Code 404) <br>
  No cars found in database

#### <a name="cars.getbylicenseplate"></a>Get By Licenseplate

```http
GET /car/:licenseplate
```

It will return one car from database.

Examples:

```http
GET /car/OO:OM-300
```

Example responses

- Response (Code 200)
  ```json
  {
    "id": 1,
    "manufacturer": "BMW",
    "model": "3-series",
    "year": 2010,
    "age": 12,
    "licensePlate": "OO:OM-300",
    "fuel": "PETROL"
  }
  ```
- Response (Code 404) <br>
  This car is not exists in database with the given licenseplate.

### <a name="cars.post"></a>POST

```http
POST /car
```

|    Option    |  Value   |
| :----------: | :------: |
|    Params    |   None   |
| Request body | Required |

Request body options:

|     Key      |             Type             | Required? |
| :----------: | :--------------------------: | :-------: |
| manufacturer |            string            |    ✅     |
|    model     |            string            |    ✅     |
|     year     |             int              |    ✅     |
| licensePlate |            string            |    ✅     |
|     fuel     | string (see options below\*) |    ✅     |

| Fuel Options \* |
| :-------------- |
| DIESEL          |
| PETROL          |
| ELECTRIC        |
| HYBRID          |

Example:

```http
POST /car
Content-Type: application/json

{
  "manufacturer": "AUDI",
  "model": "RS6",
  "year": 2010,
  "licensePlate": "AU:RS-600",
  "fuel": "PETROL"
}
```

Example responses:

- Response (Code 201)
  ```json
  {
    "id": 3,
    "manufacturer": "AUDI",
    "model": "RS6",
    "year": 2010,
    "age": 12,
    "licensePlate": "AU:RS-600",
    "fuel": "PETROL"
  }
  ```
  You will see, "age" property on response. This value is calculated on the server. Doesn't updates automatically.
- Response (Code 409) <br>
  No car found with the given licenseplate in the database.
- Response (Code 400) <br>
  Body validation error. See the response

### <a name="cars.patch"></a>PATCH

```http
PATCH /car/:licensePlate
```

This action updates a car by licenseplate.

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Required |
| Request body | Required |

|     Key      |             Type             | Required? |
| :----------: | :--------------------------: | :-------: |
| manufacturer |            string            |    ❌     |
|    model     |            string            |    ❌     |
|     year     |             int              |    ❌     |
|     fuel     | string (see options below\*) |    ❌     |

| Fuel Options \* |
| :-------------- |
| DIESEL          |
| PETROL          |
| ELECTRIC        |
| HYBRID          |

Example:

```http
PATCH /car/OO:OM-300
Content-Type: application/json

{
  "year": 2015,
}
```

Example responses:

- Response (Code 202)
  ```json
  {
    "id": 1,
    "manufacturer": "BMW",
    "model": "3-series",
    "year": 2015,
    "age": 7,
    "licensePlate": "OO:OM-300",
    "fuel": "PETROL"
  }
  ```
- Response (Code 404) <br>
  No car found with the given licenseplate in the database.
- Response (Code 400)<br>
  Body failed the validation test

### <a name="cars.delete"></a>DELETE

```http
DELETE /car/:licensePlate
```

It will delete a car from the database.

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Required |
| Request body |   None   |

Example:

```http
DELETE /car/AU:RS-600
```

Example responses:

- Response (Code 202) <br>
  The delete was succesfull, it will return the deleted car's data.
- Response (Code 404) <br>
  No car found with the given licenseplate in the database.

## <a name="city"></a>City

### <a name="city.get"></a>GET

```http
GET /city
```

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Optional |
|    Query     | Optional |
| Request body |   None   |

It returns all cities in database.

Example responses

- Response (Code 200)
  ```json
  [
    {
      "id": 1,
      "name": "Budapest",
      "county": "Pest megye"
    },
    {
      "id": 2,
      "name": "Debrecen",
      "county": "Hajdú-Bihar megye"
    }
  ]
  ```
- Response (Code 404) <br>
  No cities found in database

#### <a name="city.getbyname"></a>Get by name

```http
GET /car/:licenseplate
```

It will return one city from database.

Examples:

```http
GET /city/Budapest
```

Example responses

- Response (Code 200)
  ```json
  {
    "id": 1,
    "name": "Budapest",
    "county": "Pest megye"
  }
  ```
- Response (Code 404) <br>
  This city is not exists in database.

#### <a name="city.queries"></a>Queries

```http
GET /city/name?=includeWeather=BOOLEAN
```

It will return one city from the database, and includes weather. If the query is not given, it will not include "weather" key by default. Query is non case-sensitive. But, if you need the weather, you need to create one, with a simple GET in /weather endpoint. If city's weather table is null, it will give an empty array. You can change value to "false", and it will not include the weather.

Examples:

```http
GET /city/Budapest?=includeWeather=true
```

Example responses

- Response (Code 200)
  ```json
  {
    "id": 1,
    "name": "Budapest",
    "county": "Pest megye",
    "weather": [
      {
        "temp": 32.8,
        "humidity": 42.8
      }
    ]
  }
  ```
- Response (Code 404) <br>
  This city is not exists in database.

### <a name="city.post"></a>POST

```http
POST /city
```

|    Option    |  Value   |
| :----------: | :------: |
|    Params    |   None   |
| Request body | Required |

Request body options:

|  Key   |  Type  | Required? |
| :----: | :----: | :-------: |
|  name  | string |    ✅     |
| county | string |    ✅     |

Example:

```http
POST /city
Content-Type: application/json

{
  "name": "Baja",
  "county": "Bács-Kiskun",
}
```

Example responses:

- Response (Code 201)
  ```json
  {
    "id": 1,
    "name": "Baja",
    "county": "Bács-Kiskun"
  }
  ```
- Response (Code 400) <br>
  Body validation error. See the response

### <a name="city.patch"></a>PATCH

```http
PATCH /city/:id
```

This action updates a city by id.

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Required |
| Request body | Required |

|  Key   |  Type  | Required? |
| :----: | :----: | :-------: |
|  name  | string |    ❌     |
| county | string |    ❌     |

Example:

```http
PATCH /city/Budapest
Content-Type: application/json

{
  "name": "Pécel",
}
```

Example responses:

- Response (Code 202)
  ```json
  {
    "id": 1,
    "name": "Pécel",
    "county": "Pest megye"
  }
  ```
- Response (Code 404) <br>
  No city found in database with the given id.
- Response (Code 400)<br>
  Body failed the validation test

### <a name="city.delete"></a>DELETE

```http
DELETE /city/:name
```

It will delete a city from the database. Includes city weather.

|    Option    |  Value   |
| :----------: | :------: |
|    Params    | Required |
| Request body |   None   |

Example:

```http
DELETE /city/Felcsút
```

Example responses:

- Response (Code 202) <br>
  The delete was succesfull, it will return the deleted city's data.
- Response (Code 404) <br>
  No city found with the given name.
