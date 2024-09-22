import {buildSchema} from 'graphql';

const source = `
  schema {
    query: Query
  }
  type Query {
    __typename: String!
  }`;

export const emptySchema = buildSchema(source, {assumeValid: true});
