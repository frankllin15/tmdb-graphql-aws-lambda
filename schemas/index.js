// const { gql } = require('apollo-server-lambda')

const schema = `
  
  type Genre {
      id: ID
      name: String
  }

  type Cast {
    id: String
    name: String
    profile_path: String
  }
  type Media {
    id: ID
    name: String
    poster_path: String
    backdrop_path: String
    vote_average: Float
    release_date: String
    runtime: String
    imdb_id: ID
    genres: [Genre]
    overview: String
    cast: [Cast]
    
  }
  type MediaList {
    id: ID
    name: String
    poster_path: String
    media_type: String
    vote_average: String
  }
  
  type MediaListTotalPages {
    results: [MediaList]
    total_pages: Int
    }
    
    type Peaple {
      id: ID
      name: String
      profile_path: String
      known_for_department: String
      place_of_birth: String
      birthday: String
      biography: String
    } 
    
    type Video {
      key: String
      name: String
      site: String
    }
    type Query {
      
      trendingMedia(media_type: String!): [MediaList]
      mediaRecommendations(media_type: String!, id: ID!): [MediaList]
      mediaByGenre(media_type: String!, genre_id: ID!, period: Int): MediaListTotalPages
      media(id: ID!, media_type: String!): Media
      topRatedTmdb(media_type: String!, page: Int!): MediaListTotalPages
      releaseMovies(page: Int): MediaListTotalPages
      peaple(id: ID!): Peaple
      artWorks(id: ID!, media_type: String!, page: Int!): MediaListTotalPages
      mediaVideos(id: ID!, media_type: String!): [Video]
      similarMedia(id : ID!, media_type: String!): [MediaList]
    }
    `;

  export { schema }