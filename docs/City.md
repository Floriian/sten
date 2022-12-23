<a name="city-main"></a>
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
