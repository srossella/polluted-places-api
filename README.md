# Polluted places API 
Node/Express/PostgreSQL REST API to report polluted places. Each place contains the address and a photo of the pollution. Users can create/view/update/delete locations. 
The endpoint is accessible at `http://localhost:<your-port>/places`. 
A front-end user interface is in development.

## Running the app
To run locally, `npm install`, then `npm run start`

This project requires a [PostgreSQL](https://www.postgresql.org/) database to be running locally.   You can use [pgAdmin](https://www.pgadmin.org/) to interact with the database manually. 

This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.
Create also an `uploads` folder in the root folder that will serve as folder destination for uploaded photos.

To easily populate your database with the requisite tables, `npm run create-db`.  This will create tables in your database if they do not already exist.  The configuration for this script can be found in the  `setupDatabase.js` file located in the root of this project.

Once the app is running locally, you can access the API at `http://localhost:<your-port>`

## Testing
You can use various HTTP clients such as [Postman](https://www.postman.com/) to make requests to the API endpoints.

## Resources
- [Setting up Postman](https://learning.postman.com/docs/getting-started/settings/)
- [Using pgAdmin](https://www.pgadmin.org/docs/pgadmin4/development/getting_started.html)
- [Postgres Cheat Sheet](https://www.postgresqltutorial.com/postgresql-cheat-sheet/)
- [Multer](https://www.npmjs.com/package/multer)

## Options for Extension
- Add additional API endpoints 
- Add front-end
- Add separate related tables and constraints
- Add geolocation as an alternative to the address