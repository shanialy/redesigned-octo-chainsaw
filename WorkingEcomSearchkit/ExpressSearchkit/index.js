const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const {
  MultiMatchQuery,
  SearchkitResolvers,
  SearchkitSchema,
  RefinementSelectFacet,
  DateRangeFacet,
} = require("@searchkit/schema");

// const searchkitConfig = {
//   host: "http://localhost:9200",
//   index: 'imdb_movies',
//   hits: {
//     fields: ['title']
//   },
//   query: new MultiMatchQuery({ fields: ['title'] }),
//   facets: [
//     new RefinementSelectFacet({ field: 'type.raw', identifier: 'type', label: 'Type' })
//   ]
// }

// const searchkitConfig = {
//   host: 'http://43.251.253.107:1200/',
//   index: 'pricechoice_v2',
//   hits: {
//     fields: ['gender']
//   },
//   sortOptions: [
//     { id: 'relevance', label: "Relevance", field: [{"_score": "desc"}], defaultOption: true}
//   ],
//   query: new MultiMatchQuery({ fields: [] }),
//   facets: [

//     new RefinementSelectFacet({
//       field: 'gender',
//       identifier: 'gender',
//       label: 'gender'
//     }),

//   ]
// }
const searchkitConfig = {
  host: "http://43.251.253.107:2500/",
  index: "pricechoice_v2",
  hits: {
    fields: [
      "gender",
      "title",
      "image",
      "vendor",
      "price",
      "sale_price",
      "domain",
      "product_type",
      "updatedAt",
    ],
  },
  sortOptions: [
    {
      id: "relevance",
      label: "Relevance",
      field: [{ _score: "desc" }],
      defaultOption: true,
    },
    {
      id: "updatedAt",
      label: "Date",
      field: { updatedAt: "desc" },
    },
  ],
  query: new MultiMatchQuery({
    fields: ["title", "vendor"],
  }),
  facets: [
    new RefinementSelectFacet({
      field: "gender",
      identifier: "gender",
      label: "gender",
    }),

    new RefinementSelectFacet({
      field: "vendor",
      identifier: "vendor",
      label: "vendor",
    }),

    new RefinementSelectFacet({
      field: "domain",
      identifier: "domain",
      label: "domain",
    }),

    new RefinementSelectFacet({
      field: "product_type",
      identifier: "product_type",
      label: "product_type",
    }),
    new DateRangeFacet({
      field: "updatedAt",
      identifier: "updatedAt",
      label: "Date",
    }),
  ],
};

const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig, // searchkit configuration
  typeName: "ResultSet", // base typename
  hitTypeName: "ResultHit",
  addToQueryType: true, // When true, adds a field called results to Query type
});

const combinedTypeDefs = [
  gql`
    type Query {
      root: String
    }

    type Mutation {
      root: String
    }

    type ResultHit implements SKHit {
      id: ID!
      fields: HitFields
    }

    type HitFields {
      gender: String
      title: String
      image: String
      vendor: String
      price: String
      price_before_sale: String
      domain: String
      product_type: String
      updatedAt: String
    }
  `,
  ...typeDefs,
];

const server = new ApolloServer({
  typeDefs: combinedTypeDefs,
  resolvers: withSearchkitResolvers({}),
  context: {
    ...context,
  },
  playground: true,
  introspection: true,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
