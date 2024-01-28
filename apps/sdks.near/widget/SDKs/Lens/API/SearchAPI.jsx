const $ = VM.require(`sdks.near/widget/Loader`);
const { Search } = $("@sdks/lens/queries#alpha");
const { SearchRequests } = $("@sdks/lens/requests#alpha");

return {
  profiles: (Client, profileSearchRequest) => {
    return Client.graphql(Search.PROFILE_SEARCH_QUERY, {
      profileSearchRequest
    }).then((payload) => {
      return {
        result: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    });
  },
  publications: (Client, publicationSearchRequest) => {
    return Client.graphql(Search.PUBLICATION_SEARCH_QUERY, {
      publicationSearchRequest
    }).then((payload) => {
      return {
        result: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    });
  },
};
