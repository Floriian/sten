<a name="car-main"></a>
### GET

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