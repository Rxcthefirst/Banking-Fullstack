# RCH Bank - Backend API

The backend API for the RCH bank application.

## Setup

### Download Spring Tools Suite 4 ([Link](https://spring.io/tools))
##### Import the project as a maven project
**Be sure to update the maven project to download dependencies**

### Application.properties

The `application.properties` file, which should be made in `src/main/resources`, has serveral values that need to be applied

#### For connecting to the database:
###### `spring.datasource.url=` Used for the URL of the database
###### `spring.datasource.username=` Used for the username to login to the database
###### `spring.datasource.password=` Used for the password to login to the database

#### For generating the database with Spring:

###### `spring.jpa.show-sql=true`
###### `spring.jpa.hibernate.ddl-auto=update` Automatically updates the ddl(database schema) file
###### `spring.jpa.hibernate.dialect=org.hibernate.dialect.<SQLtype>` The SQL type you are using (mySQL POSTGresSQL, etc.)

