// Import ApolloServer from apollo-server package to set up the GraphQL server
const { ApolloServer } = require("apollo-server"); 

// Import schema from the GraphQL schema file using graphql-import
const { importSchema } = require("graphql-import");

// Import the data source class 
const EtherDataSource = require("./datasource/ethDatasource"); 

// Import the schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

// Define resolvers that map schema fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Call etherBalanceByAddress() method on the data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Call totalSupplyOfEther() method on the data source
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Call getLatestEthereumPrice() method on the data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Call getBlockConfirmationTime() method on the data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
  }), 
});

// Set timeout and start server
server.timeout = 0; 
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
