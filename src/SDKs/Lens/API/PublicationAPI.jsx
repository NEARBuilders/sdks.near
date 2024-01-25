const $ = VM.require(`sdks.near/widget/Loader`);
const { Publication } = $("@sdks/lens/queries");
const { Constants } = $("@sdks/lens/definitions");
const { ApiHelper } = $("@sdks/lens/utils");

return {
  fetch: (publicationRequest) => {
    return Client.graphql(Publication.PUBLICATION_QUERY, {
      publicationRequest: ApiHelper.clean(publicationRequest),
    }).then((payload) => payload.body.data.publication || {});
  },
  fetchAll: (publicationsRequest) => {
    return Client.graphql(Publication.PUBLICATIONS_QUERY, {
      publicationsRequest: ApiHelper.clean(publicationsRequest),
    }).then((payload) => {
      return {
        publications: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    });
  },
  stats: (publicationId) => {},
  whoActed: (publicationId) => {},
  comments: (publicationId) => {},
  upvote: (publicationId) => {},
  downvote: (publicationId) => {},
  hide: (publicationId) => {},
  report: (publicationId) => {},
};
