import { RecipeResolvers } from "../graphQLTypes";
import { ResolverContext } from "../types";

export const Recipe: RecipeResolvers<ResolverContext> = {
  id: (obj: any) => {
    console.log("RECIPE ID", obj);
    return obj.id ?? obj.pk ?? obj.data ?? "-----";
  },
  name: (obj: any) => {
    console.log("NAME", obj, obj.data);
    return obj.name ?? obj.data ?? "Unnamed";
  },
};
