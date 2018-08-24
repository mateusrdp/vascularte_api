Vascularte Backend
------------------

This is an API to fetch data for Vascularte.

Initially, this is only to provide easy support for Angular to get data as we need it.
The problem is that we use a legacy database that I don't wanna touch right now.
So I'm using GraphQL to create an interface to make whatever change transparent, and Sequelize to feed this legacy DB into an ORM.
Later on I might just change the resolvers, if we migrate DBs to a fresh (sanitised) one or simply add more features and use both sources (since we're using GraphQL anyway).

Requirements (so far):
-NodeJS
-Babel
-GraphQl
-Sequelize
-Express
