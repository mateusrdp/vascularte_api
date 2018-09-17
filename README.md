# Vascularte Backend

This is an API to fetch data for Vascularte.

Initially, this is only to provide easy support for Angular to get data as we need it.
The problem is that we use a legacy database that I don't wanna touch right now to facilitate migration and deployment.
So I'm using **GraphQL** to create an interface to make whatever change transparent, and Sequelize to feed this legacy DB into an ORM.
Later on I might just change the resolvers, if we migrate DBs to a fresh (sanitised) one or simply add more features and use both sources (since we're using GraphQL anyway).

## Model

### Doctor
This is supposed to be the main users.
Their data is stored in the database, along with a login. 
#### A note on "*GodMode*"
GodMode allows the user to perform operations that are normally meant to be allowed:
* Delete Patients
    * Not normally allowed because all users share the same patient information. Deleting an user means that all users' (Doctors) consultation information for that patient will be gone for that patient as well.
* Delete Consultations
    * Not normally allowed because it should not happen anyway.

Obviously this should be exercised with extreme caution and it is recommended that the client confirms the action.

To perform any of that, the HTTP request should carry a custom header 'X-GodMode' with the master password hashed.
Yes. This is supposed to be annoying, hard and non-standard because these are delicate operations so you have to be extra sure you wanna do it.

### Patient
### Consultation
### Payment
### DocType
### Insurance Provider






