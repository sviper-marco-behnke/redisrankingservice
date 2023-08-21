# Fetch Rankings

URL: http://localhost:3000/ranking/list/:from/:to

Retrieve rankings

```json
[
    {
        "value": "User A",
        "score": 65,
        "position": 1
    },
    {
        "value": "User B",
        "score": 80,
        "position": 2
    },
    {
        "value": "User C",
        "score": 110,
        "position": 3
    },
    {
        "value": "User D",
        "score": 120,
        "position": 4
    }
]
```

# Post Result

URL: http://localhost:3000/ranking/score/:user/:score

Post a score to rankings and return position and surrounding players

```json
{
  "position": 1,
  "list": [
    {
      "value": "User A",
      "score": 65,
      "position": 1
    },
    {
      "value": "User B",
      "score": 80,
      "position": 2
    },
    {
      "value": "User C",
      "score": 110,
      "position": 3
    }
  ]
}
```
