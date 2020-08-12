const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

app.use(
    '/users',
    graphqlHTTP({
        schema: buildSchema(`
        type User {
          _id: ID!
          firstName: String!
          lastName: String!
          email: String!
        }

        input UserInput {
            firstName: String!
            lastName: String!
            email: String!
        }

        type RootQuery {
            users: [User!]!
        }

        type RootMutation {
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            users: () => {
                return User.find()
                    .then(users => {
                        return users.map(user => {
                            return { ...user._doc, _id: user.id };
                        });
                    })
                    .catch(err => {
                        throw err;
                    });
            },
            createUser: args => {
                const user = new User({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    email: args.userInput.email,
                });
                return user
                    .save()
                    .then(result => {
                        console.log(result);
                        return { ...result._doc, _id: result._doc._id.toString() };
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            }
        },
        graphiql: true
    })
);

mongoose
    .connect(
        `
        mongodb+srv://sam:fRaHujV9OCwITEOr@cluster0.vlicg.mongodb.net/users-data?retryWrites=true&w=majority

        `

    )
    .then(() => {
        app.listen(3002);
    })
    .catch(err => {
        console.log(err);
    });

