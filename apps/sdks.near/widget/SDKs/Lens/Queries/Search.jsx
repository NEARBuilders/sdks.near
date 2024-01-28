const PROFILE_SEARCH_QUERY = `
  query SearchProfiles($profileSearchRequest: ProfileSearchRequest!) {
    result: searchProfiles(request: $profileSearchRequest) {
      items {
        ...Profile
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
`;

const PUBLICATION_SEARCH_QUERY = `
  query SearchPublications($publicationSearchRequest: PublicationSearchRequest!) {
    result: searchPublications(request: $publicationSearchRequest) {
      items {
        ... on Post {
          ...Post
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
    PROFILE_SEARCH_QUERY,
    PUBLICATION_SEARCH_QUERY
};