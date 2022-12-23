<a name="animals-main"></a>
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

#### <a name="animals.get.params"></a>Params.

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