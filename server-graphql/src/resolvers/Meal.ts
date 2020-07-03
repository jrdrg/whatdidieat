import { MealResolvers } from "../graphQLTypes";

export const Meal: MealResolvers = {
  id: (obj) => {
    console.log("ID", obj);
    return obj.id;
  },
  date: (obj) => {
    console.log("DATE", obj);
    return obj.date;
  },
  recipes: (obj) => {
    console.log("RECIPE", obj);
    // return { id: obj.data, name: "Meal recipe" + obj.name };
    return obj.recipes || null;
  },
};
