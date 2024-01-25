const $ = VM.require(`sdks.near/widget/Loader`);
const { Profile } = $("@sdks/lens/queries");
const { ApiHelper } = $("@sdks/lens/helpers");

return {
  create: (Client, createProfileRequest) => {
    return Client.graphql(Profile.CREATE_PROFILE_QUERY, {
      createProfileRequest,
    }).then((payload) => payload.body || {});
  },
  fetch: (Client, profileRequest) => {
    return Client.graphql(Profile.PROFILE_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile || {});
  },
  fetchAll: (Client, profilesRequest) =>
    Client.graphql(Profile.PROFILES_QUERY, {
      profilesRequest: ApiHelper.clean({
        ...profilesRequest,
        where: {
          ...ApiHelper.clean(profilesRequest.where),
        },
      }),
    }).then((payload) => {
      return {
        profiles: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  stats: (Client, profileStatsRequest) =>
    Client.graphql(Profile.PROFILE_STATS_QUERY, profileStatsRequest).then(
      (payload) => payload.body.data.stats || {}
    ),
  recommendations: (Client, profileRecommendationsRequest) =>
    Client.graphql(Profile.PROFILE_RECOMMENDATIONS_QUERY, {
      profileRecommendationsRequest,
    }).then((payload) => {
      return {
        profiles: payload.body.data.items || {},
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  interests: (Client, profileInterestsRequest) =>
    Client.graphql(Profile.PROFILE_INTERESTS_QUERY, {
      profileInterestsRequest,
    }).then((payload) => payload.body.data.profileInterests || []),
  report: (Client, reportProfileRequest) =>
    Client.graphql(Profile.PROFILE_REPORT_QUERY, {
      reportProfileRequest,
    }).then((payload) => ""),
  block: (Client, blockProfileRequest) =>
    Client.graphql(Profile.PROFILE_BLOCK_QUERY, {
      blockProfileRequest,
    }).then((payload) => payload.body || {}),
  history: (Client, profileActionHistoryRequest) =>
    Client.graphql(Profile.PROFILE_ACTION_HISTORY_QUERY, {
      profileActionHistoryRequest,
    }).then((payload) => {
      return {
        history: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  onChainIdentity: (profileOnChainIdentityRequest) =>
    Client.graphql(
      Profile.PROFILE_ONCHAIN_IDENTITY_QUERY,
      profileOnChainIdentityRequest
    ).then((payload) => payload.body.data.profile.onChainIdentity || {}),
  isFollowedByMe: (profileRequest) =>
    Client.graphql(Profile.PROFILE_IS_FOLLOWED_BY_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.isFollowedByMe || false),
  isFollowingMe: (profileRequest) =>
    Client.graphql(Profile.PROFILE_IS_FOLLOWING_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.isFollowingMe || false),
  canFollow: (profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_FOLLOW_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canFollow || false),
  canUnfollow: (profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_UNFOLLOW_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canUnfollow || false),
  isBlockedByMe: (profileRequest) =>
    Client.graphql(Profile.PROFILE_IS_BLOCKED_BY_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.isBlockedByMe || false),
  canBlock: (profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_BLOCK_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canBlock || false),
  hasBlockedMe: (profileRequest) =>
    Client.graphql(Profile.PROFILE_HAS_BLOCKED_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.hasBlockedMe || false),
  canUnblock: (profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_UNBLOCK_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canUnblock || false),
};
