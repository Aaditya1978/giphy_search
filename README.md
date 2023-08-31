
# Giphy Search APP

A Next.js application to display gifs from Giphy Api based on search of user.

## Tech Stack

Next.js, React, HTML, SCSS, Bootstrap

## Run Locally

Go to the project directory

```bash
  cd giphy_search
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

#### Server will be running on http://localhost:3000/



## Environment Variables

you will need to add the following environment variables to your .env.local file

`API_URL = "http://localhost:3000"`

`GIPHY_API_KEY = ""`

`FIREBASE_API_KEY = ""`

`FIREBASE_AUTH_DOMAIN = ""`

`FIREBASE_PROJECT_ID = ""`

`FIREBASE_STORAGE_BUCKET = ""`

`FIREBASE_MESSAGING_SENDER_ID = ""`

`FIREBASE_APP_ID = ""`

`JWT_SECRET = "your_secret"`

## Features

- Firebase Authentication to access Search Page
- Click on GIF to copy URL
- Mark GIF as favourite
- Favourite section to see marked GIF's
- Loading animations and alerts
- Seure API
- clean Code


# API Reference

## Signup API

```http
  POST /api/signup
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. Name         |
| `email`   | `string` | **Required**. Email        |
| `password`| `string` | **Required**. Password     |

## Login API

```http
  POST /api/login
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Email        |
| `password`| `string` | **Required**. Password     |


## Giphy Search API

```http
  GET /api/giphySearch
```

Returns the gif data for searched query

| Parameter    | Type     | Description                   |
| :--------    | :------- | :-------------------------    |
| `searchTerm` | `string` | **Required**. Search string   |


## Verify User API

```http
  GET /api/verify
```

| Headers         | Type     | Description                       |
| :--------       | :------- | :-------------------------        |
| `authorization` | `string` | **Required**. jwt token           |

