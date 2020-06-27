import { Resolvers } from "../graphQLTypes";
import { ResolverContext } from "../types";
import { Meal } from "./Meal";
import { Query } from "./Query";
import { Recipe } from "./Recipe";

export const resolvers: Resolvers<ResolverContext> = {
  Query,

  Mutation: {
    addMeal: (_obj, args, ctx) => {
      return ctx.dataSources.meals.addNewMeal(args.input);
    },
  },

  Meal,
  Recipe,
};
