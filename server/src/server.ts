import startApolloServer  from "./app";
import { connectDB } from "./mongo/config";

connectDB();

startApolloServer();
