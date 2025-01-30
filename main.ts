import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { MongoClient } from "mongodb";    
//import { cocktailModel } from "./tps.ts";

//const MONGO_URL = Deno.env.get("MONGO_URL");
const MONGO_URL = "mongodb+srv://examen:nebrija@cluster0.h7shi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();
/*
console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("ExamenFinal");
const cocktailsCollection = mongoDB.collection<cocktailModel>("cocteles");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({cocktails: cocktailsCollection}),
});
*/

//Version prueba deploy
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.info(`Server ready at ${url}`);