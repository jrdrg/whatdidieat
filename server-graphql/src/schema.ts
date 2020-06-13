import { gql } from "apollo-server-lambda";

export const schema = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    ingredients: [Ingredient]
    meals: [Meal]
    recipes: [Recipe]
  }

  type Mutation {
    addMeal(input: AddMealMutationInput!): Meal
  }

  input AddMealMutationInput {
    date: String!
    recipe: RecipeInput!
  }

  input RecipeInput {
    id: ID
    name: String
    url: String
    notes: String
  }

  type Ingredient {
    id: ID!
    name: String!
    type: IngredientType!
  }

  type IngredientType {
    id: ID!
    name: String!
  }

  type Meal {
    id: ID!
    date: String!
    recipe: Recipe!
  }

  type Recipe {
    id: ID!
    name: String!
    url: String
    notes: String
  }

  type User {
    id: ID!
    name: String!
  }
`;
