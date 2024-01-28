const $ = VM.require(`sdks.near/widget/Loader`);
const { Profile } = $("@sdks/lens/queries#alpha");
const { ProfileMutations } = $("@sdks/lens/mutations#alpha");
const { ApiHelper } = $("@sdks/lens/helpers#alpha");

return {
  create: (Client, createProfileRequest) => {
    return Client.graphql(ProfileMutations.CREATE_PROFILE_MUTATION, {
      createProfileRequest,
    }).then((payload) => payload.body || {});
  },
  fetch: (Client, profileRequest) => {
    return Client.graphql(Profile.PROFILE_QUERY, {
      profileRequest: ApiHelper.clean(profileRequest),
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
    Client.graphql(ProfileMutations.PROFILE_REPORT_MUTATION, {
      reportProfileRequest,
    }).then((payload) => ""),
  block: (Client, blockProfileRequest) =>
    Client.graphql(ProfileMutations.PROFILE_BLOCK_MUTATION, {
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
  onChainIdentity: (Client, profileOnChainIdentityRequest) =>
    Client.graphql(
      Profile.PROFILE_ONCHAIN_IDENTITY_QUERY,
      profileOnChainIdentityRequest
    ).then((payload) => payload.body.data.profile.onChainIdentity || {}),
  isFollowedByMe: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_IS_FOLLOWED_BY_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.isFollowedByMe || false),
  isFollowingMe: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_IS_FOLLOWING_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.isFollowingMe || false),
  canFollow: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_FOLLOW_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canFollow || false),
  canUnfollow: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_UNFOLLOW_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canUnfollow || false),
  isBlockedByMe: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_IS_BLOCKED_BY_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.isBlockedByMe || false),
  canBlock: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_BLOCK_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canBlock || false),
  hasBlockedMe: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_HAS_BLOCKED_ME_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.hasBlockedMe || false),
  canUnblock: (Client, profileRequest) =>
    Client.graphql(Profile.PROFILE_CAN_UNBLOCK_QUERY, {
      profileRequest,
    }).then((payload) => payload.body.data.profile.canUnblock || false),
};
