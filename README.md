# Bank account kata
> Think of your personal bank account experience. 
When in doubt, go for the simplest solution

## Requirements

- Deposit and Withdrawal
- Account statement (date, amount, balance)
- Statement printing


## User Stories

### US 1

In order to save money

As a bank client

I want to make a deposit in my account

### US 2

In order to retrieve some or all of my savings

As a bank client

I want to make a withdrawal from my account

### US 3

In order to check my operations

As a bank client

I want to see the history (operation, date, amount, balance) of my operations

## Tech stack
- ReactJs
- Spring Boot REST API
- MongoDB

## Installation
### Requirements
- Node.js
- npm or Yarn
- MongoDB
- Java 11 and above

### Steps
Clone the repository on your local machine

Use your package manager to install the dependancies:
```
yarn install
```

Go the bank-account-kata folder to launch the java app:
```
mvn spring-boot:run
```

Then go to the frontend (src/main/frontend) folder and launch React:
```
yarn start
```

