export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  ingredients?: Maybe<Array<Maybe<Ingredient>>>;
  meals?: Maybe<Array<Maybe<Meal>>>;
  recipes?: Maybe<Array<Maybe<Recipe>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMeal?: Maybe<Meal>;
};


export type MutationAddMealArgs = {
  input: AddMealMutationInput;
};

export type AddMealMutationInput = {
  date: Scalars['String'];
  recipe: RecipeInput;
};

export type RecipeInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: IngredientType;
};

export type IngredientType = {
  __typename?: 'IngredientType';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['ID'];
  date: Scalars['String'];
  recipe: Recipe;
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

