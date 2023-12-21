# Shortify

API to create short URL.

---

## API Doc

1. User can login

   POST /login

   ```js
   body{
       "username": STRING,
       "password": STRING
   }
   ```

   Response:

   - 200 : Returns token { "message": "Successful", "token": "token value"}
   - 400 : Bad Request ( "message": "Invalid Credentials")

2. User can register

   POST /register

   ```js
   body{
       "username": STRING,
       "email": STRING,
       "name": STRING,
       "password": STRING
   }

   ```

   Response:

   - 201 : Returns { "message": "Successful" }
   - 400 : Bad Request ( "message": "Failed", error: [] )

3. User can get all the list of his URLs

   GET /weburls

   HEADER : authorization: Bearer {TOKEN}

   Response:

   - 200 : Returns { "message": "Successful", "data": Array of all the URLs}
   - 403 : Unauthorized

4. User can send a big URL to shorten it.

   POST /shorten

   HEADER : authorization: Bearer {TOKEN}

   ```js
   body{
       "url": STRING
   }

   ```

   Response:

   - 200 : Returns { "message": "Successful", "data": Object containing Shorten URL }
   - 403 : Unauthorized

5. User can able to logoout

   POST /logout

   HEADER : authorization: Bearer {TOKEN}

   Response:

   - 200 : { "message": "Successful"}
   - 403 : Unauthorized

6. Public urls

   ALL /v/{url-id}

   Response:

   - 200 : Redirect to url
   - 404 : Not found
