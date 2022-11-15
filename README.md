Problem statement : 
Q.1) create 2 APIs :
NOTE: UI not required will be tested on postman
1. api for create student
2. list all the students with global search parameter on all the column
Common things for both APIs-
1) Use basic auth for authorization.
2) Post method for input data with JSON payload.
3) Log statements at appropriate places.
4) Db transaction to be maintained.
5) Input validations.
Database should have the following table :
students with columns: id, name, phone_number, email, country, coutry_code
--------------------------------------------------------------------------
For country in student table please follow below step -
Fetch country using the external api
input to this api will have only country code.
https://restcountries.eu/rest/v2/callingcode/91
========================================================================
===
Q.2) Create a user CRUD operation with image upload.
Things to be implemented
1) Input validation on both side frontend and backend
2) On update or delete image should be maintained accordingly
3) Search and pagination need to be added on user list page
4) Use only eloquent query structure
Note:
1. The application should be created in Laravel/Nodejs.
2. Coding standards will be considered.
3. Use git to create the project as we would like to see how well you use git. Submit the git
repo once you have completed and steps to run and test the project.