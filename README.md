# Insurance

[![Build Status](https://travis-ci.com/rexhepberlajolli/Insurance.svg?token=SCeWpri5MyA2EEmP7ypQ&branch=master)](https://travis-ci.com/rexhepberlajolli/Insurance)

Insurance is a webapp that allows insurers to create custom risk models and their clients to submit those data.

## Live Demo

API (Endpoints are documented below)
```sh
https://api.insurance.rexhepberlajolli.me/
```

UI
```sh
http://insurance.rexhepberlajolli.me/
```

To create risk types you will need to authenticate with the following credentials
```sh
Username: rexhepberlajolli
Password: 1Wt1n5UR4nC3
```

To see the risk dynamic submitted data checkout the following endpoint
```sh
https://api.insurance.rexhepberlajolli.me/api/v1/custom/riskTypes/:id/
Example: https://api.insurance.rexhepberlajolli.me/api/v1/custom/riskTypes/6/
```

## Technologies used

Insurance uses a number of open and closed source projects to work properly:

* [Python 3.6](https://www.python.org) - Base language used on backend
* [Django](https://www.djangoproject.com/) - Used to build engine of this project
* [Django Rest Framework](http://www.django-rest-framework.org/) - Used to build RESTFUL API
* [PostgreSQL](https://www.postgresql.org/) - Used to save relational data
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) - Used to save dynamic data
* [ReactJS](https://reactjs.org/) - Used to build UI
* [Twitter Bootstrap](http://getbootstrap.com) - Used to build a great responsive ui
* [Amazon Lambda](https://aws.amazon.com/lambda/) - Used to run engine on production
* [Amazon S3](https://aws.amazon.com/s3/) - Used to host frontend
* [Travis CI](https://travis-ci.org/) - Used to run a pipeline that run linters, tests and deploys automatically on success
* [Zappa](https://github.com/Miserlou/Zappa) - Used to deploy this project as serverless on Amazon Lambda
* [Pip](https://pypi.org/project/pip/) - Used to manage backend dependencies
* [Yarn](https://yarnpkg.com) - Used to manage frontend dependencies

## Database

### Postgres
Used to store risk type models

#### Tables
* Risk Type
* Risk Field

#### Columns 
`*` == Required
* Risk Type
    * id: Int Autoincrement Primary Key
    * name: Char *
    * table_name: Char UUID *
* Risk Field
    * id: Int Autoincrement Primary Key
    * risk_type: ForeignKey to Risk Type *
    * name: Char *
    * type: Enum (text, select, date, number, currency, option, color, bool) *
    * options: Array of Char

### Dynamodb
#### What is it used for
Each dynamodb table is created automatically from a django signal after a RiskType first creation using the generated uuid in field table_name as name and it is used to store the data that is submitted using the form with the fields of the associated risk type.

## Risk field renderes
* Text - Input field with type text
* Select - Select field with specified options
* Date - [DatePicker](https://www.npmjs.com/package/react-datepicker)
* Number - Input field with type number
* Currency - Input field with type text and a $ left icon 
* Option - Radio buttons
* Color - [ColorPicker](https://www.npmjs.com/package/react-color)
* Bool - Checkbox


## Running it locally

Clone project
```sh
$ git clone https://github.com/rexhepberlajolli/Insurance.git
```
Change directory to its path
```sh
$ cd Insurance
```
Create a virtualenv using python3
```sh
$ mkvirtualenv -p $(which python3) InsuranceEnv
```
Install backend requirements
```sh
$ pip3 install -r requirements.txt
```
Install frontend requirements
```sh
$ yarn install
```
Create database and user on postgres
```sh
$ sudo -u postgres psql
postgres=# CREATE DATABASE insurance;
postgres=# CREATE USER iwt WITH ENCRYPTED PASSWORD '42d31ae0c55d494b8861be0e6';
postgres=# GRANT ALL PRIVILEGES ON DATABASE insurance TO iwt;
```
Run dynamodb locally
```sh
$ java -Djava.library.path={{ PATH TO DynamoDBLocal_lib }} -jar {{ PATH TO DynamoDBLocal.jar }} -port 8888 -inMemory
```
Start the backend
```sh
$ ./manage.py runserver
```
Start the frontend
```sh
$ yarn start
```
Navigate on browser to the following paths for backend and frontend
```sh
Backend: http://localhost:8000
Frontend http://localhost:3000
```

## Running linters
```sh
Backend: pycodestyle **/*.py  
Frontend: yarn run lint
```

## Running backend tests with coverage
```sh
$ coverage run --source='.' manage.py test
$ coverage report
```

## API Endpoints

| Method | Endpoint | Request Data | Response Data | Response Status | Description | Needs Auth & Admin Permissions
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| POST | /api/v1/auth/ | {"username": "your_user", "password": "your_password"} | {"token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b" } | 200 | Authenticate user | No
| GET | /api/v1/custom/riskTypes/ | | [{"id": 1, "name": "Car", "table_name": "66470550-4211-4bd0" "risk_fields": [{"name": "Owner": "type": "text"}, ...]}, ...] | 200 | List risk types | No
| POST | /api/v1/custom/riskTypes/ | {"name": "Car", "risk_fields": [{"name": "Owner", "type": "text", ...}]} | {"id": 1, "name": "Car", "table_name": "66470550-4211-4bd0" "risk_fields": [{"name": "Owner": "type": "text"}, ...]} | 201 | Create risk type | Yes
| GET | /api/v1/custom/riskTypes/:id/ | | {"id": 1, "name": "Car", "table_name": "66470550-4211-4bd0" "risk_fields": [{"name": "Owner": "type": "text"}, ...]} | 200 | Retrieve risk type | No
| PATCH | /api/v1/custom/riskTypes/:id/ | {"name": "Home", "risk_fields": [{"name": "Price", "type": "number", ...}]} | {"id": 1, "name": "Home", "table_name": "66470550-4211-4bd0" "risk_fields": [{"name": "Price": "type": "number"}, ...]} | 200 | Update risk type | Yes
| Delete | /api/v1/custom/riskTypes/:id/ | | | 204 | Delete risk type | Yes
| GET | /api/v1/custom/riskTypes/:id/results/ | | {"results": [{...dynamic_data}], "pagination_key": "ef01a192-d68e-427b"} | 200 | List risk type results | No
| POST | /api/v1/custom/riskTypes/:id/results/ | {...dynamic_data} | {...dynamic_data} | 201 | Create risk type result | No


## Deployment
Deployment is fully automated using travis-ci with is triggered on each push and runs tests, linters, checks if coverage is 100% and if everything succeeds it automatically deploys backend to Amazon Lambda and builds frontend static files and pushes them to Amazon S3.
`P.S` Builds of backend and frontend run in parallel

### Can i deploy it on my own ?
Yes just follow the steps below

Setup amazon access keys
```sh
$ vim ~/.aws/credentials
  1 [default]                                                      
  2 aws_access_key_id = ENTER_YOUR_AWS_ACCESS_KEY_ID
  3 aws_secret_access_key = ENTER_YOUR_AWS_SECRET_ACCESS_KEY
```
Your stuck and dont know how to quit vim and save this file? 
[Don't worry your not the [0] or the [-1] one :D](https://stackoverflow.com/questions/11828270/how-to-exit-the-vim-editor)
```sh
Press ESC (or touch it if you have a new macbook)
Type :wq
Press Enter
```

Run the magic command that deploys the API
```sh
$ zappa deploy prod
$ zappa manage prod migrate
```

Set the following environment variables on your lambda management console
```sh
ALLOWED_HOSTS=api_gateway_host, front_end_host, ...otherHosts
CORS_ORIGIN_WHITELIST=front_end_host, ...othersHosts
POSTGRES_DB=Database name
POSTGRES_HOST=database_host
POSTGRES_USER=database_user
POSTGRES_PASSWORD=database_password
POSTGRES_PORT=database_port
SECRET_KEY=secret_key_used_in_django_app
```

Copy the api gateway url returned from the `zappa deploy prod` log and visit it on your favourite browser. (Thats your api)

Run the magic script that deploys the frontend
```sh
 TODO
```

Yeah thats it!

### Todos
 - Visualise risk type
 - Add frontend tests

License
----
MIT
