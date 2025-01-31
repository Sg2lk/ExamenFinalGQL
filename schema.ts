export const schema = `#graphql

  type Restaurant{
    id: ID!
    nombre: String!
    direccion: String!
    telefono: String!
    temperatura: String!
    hora: String!
  }

  type Query {
    getRestaurants(ciudad: String!): [Restaurant!]!
    getRestaurant(id: ID!): Restaurant!
  }

  type Mutation {
    addRestaurant(nombre: String!, direccion: String!, ciudad: String!, pais: String! telefono: String!): Restaurant!
    deleteRestaurant(id: ID!): Boolean!
  }
`