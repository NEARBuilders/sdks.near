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
          ... on Comment {
            ...Comment
          }
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

const PUBLICATION_STATS_QUERY = `
  fragment PublicationStats on PublicationStats {
    additionalArgs {
      forApps
      customFilters
    }
    id
    comments
    mirrors
    quotes
    bookmarks
    upvoteReactions: reactions(request: { type: UPVOTE })
    downvoteReactions: reactions(request: { type: DOWNVOTE })
    countOpenActions(request: $publicationStatsCountOpenActionArgsRequest)
  }

  query PublicationStats(
    $publicationRequest: PublicationRequest!
    $publicationStatsInputRequest: PublicationStatsInput!
    $publicationStatsCountOpenActionArgsRequest: PublicationStatsCountOpenActionArgs!
  ) {
    result: publication(request: $publicationRequest) {
      ... on Post {
        stats(request: $publicationStatsInputRequest) {
          ...PublicationStats
        }
      }
      ... on Comment {
        stats(request: $publicationStatsInputRequest) {
          ...PublicationStats
        }
      }
      ... on Quote {
        stats(request: $publicationStatsInputRequest) {
          ...PublicationStats
        }
      }
    }
  }
`;

const WHO_ACTED_ON_PUBLICATION_QUERY = `
  query WhoActedOnPublication($whoActedOnPublicationRequest: WhoActedOnPublicationRequest!) {
    result: whoActedOnPublication(request: $whoActedOnPublicationRequest) {
      items {
        ...Profile
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
`;

const PUBLICATION_COMMENTS_QUERY = `
  query Publication($request: PublicationRequest!) {
    result: publication(request: $request) {
      ... on Comment {
        ...Comment
      }
    }
  }
`;

const PUBLICATION_MIRRORS_QUERY = `
  query Publication($request: PublicationRequest!) {
    result: publication(request: $request) {
      ... on Mirror {
        ...Mirror
      }
    }
  }
`;

const PUBLICATION_QUOTES_QUERY = `
  query Publication($request: PublicationRequest!) {
    result: publication(request: $request) {
      ... on Quote {
        ...Quote
      }
    }
  }
`;

const WHO_REACTED_PUBLICATION_QUERY = `
  fragment ProfileReactionResult on ProfileReactionResult {
    reaction
    reactionAt
  }

  fragment ProfileWhoReactedResult on ProfileWhoReactedResult {
    profile {
      ...Profile
    }
    reactions {
      ...ProfileReactionResult
    }
  }

  query WhoReactedPublication($whoReactedPublicationRequest: WhoReactedPublicationRequest!) {
    result: whoReactedPublication(request: $whoReactedPublicationRequest) {
      items {
        ...ProfileWhoReactedResult
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
  PUBLICATION_STATS_QUERY,
  PUBLICATION_COMMENTS_QUERY,
  PUBLICATION_MIRRORS_QUERY,
  PUBLICATION_QUOTES_QUERY,
  WHO_ACTED_ON_PUBLICATION_QUERY,
  WHO_REACTED_PUBLICATION_QUERY
};
