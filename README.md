# Shortify

API to create short URLs.

Deployed On: https://kus-shortyfy-api.onrender.com

## API Reference

#### 1. Login user

```http
  POST /login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### 2. Register User

```http
  POST /register
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `name`     | `string` | **Required**. Your Name     |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

Note: Please provide strong password.
(Min. character 8, atleast 1 uppercase, 1 lowercase, 1 numeric value and 1 symbol should be present.)

#### 3. Get all the URLs

```http
  GET /shorten
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `authorization` | `string` | **Required**. Provide your Bearer Token |

#### 4. Create Short URL

```http
  POST /shorten
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `authorization` | `string` | **Required**. Provide your Bearer Token |

| Body          | Type     | Description                              |
| :------------ | :------- | :--------------------------------------- |
| `originalURL` | `string` | **Required**. Provide original valid URL |

#### 5. Visit short URL

```http
  ALL /:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | Any unique Id |

## Run Locally

Clone the project

```bash
  git clone https://github.com/kus0023/url-shortener-api
```

Go to the project directory

```bash
  cd url-shortener-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Feedback

If you have any feedback, please reach out to me at kus.maurya0000@gmail.com
