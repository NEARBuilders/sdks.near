const PUBLICATION_QUERY = `
    query Publication($publicationRequest: PublicationRequest!) {
      result: publication(request: $publicationRequest) {
        ... on Post {
          ...Post
        }
        ... on Mirror {
          ...Mirror
        }
        ... on Comment {
          ...Comment
        }
        ... on Quote {
          ...Quote
        }
      }
    }
`;

const PUBLICATIONS_QUERY = `
    query Publications($publicationsRequest: PublicationsRequest!) {
      result: publications(request: $publicationsRequest) {
        items {
          ... on Post {
            ...Post
          }
          ... on Mirror {
            ...Mirror
          }
          ... on Comment {
            ...Comment
          }
          ... on Quote {
            ...Quote
          }
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

return {
  PUBLICATION_QUERY,
  PUBLICATIONS_QUERY,
};
