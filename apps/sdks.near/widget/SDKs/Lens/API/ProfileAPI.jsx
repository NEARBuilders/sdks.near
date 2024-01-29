const $ = VM.require(`sdks.near/widget/Loader`);
const { Profile } = $("@sdks/lens/queries#alpha");
const { ProfileMutations } = $("@sdks/lens/mutations#alpha");
const { ApiHelper } = $("@sdks/lens/utils#alpha");

const ProfileAPI = {
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
        profiles: payload.body.data.profiles.items || [],
        pagination: payload.body.data.profiles.pageInfo || {},
      };
    }),
  followers: (Client, followersRequest) =>
    Client.graphql(Profile.FOLLOWERS_QUERY, {
      followersRequest,
    }).then((payload) => {
      return {
        profiles: payload.body.data.followers.items || [],
        pagination: payload.body.data.followers.pageInfo || {},
      };
    }),
  stats: (Client, profileStatsRequest) =>
    Client.graphql(Profile.PROFILE_STATS_QUERY, {profileStatsRequest: ApiHelper.clean(profileStatsRequest)}).then(
      (payload) => payload.body.data.profile.stats || {}
    ),
  recommendations: (Client, profileRecommendationsRequest) =>
    Client.graphql(Profile.PROFILE_RECOMMENDATIONS_QUERY, {
      profileRecommendationsRequest,
    }).then((payload) => {
      return {
        profiles: payload.body.data.profileRecommendations.items || {},
        pagination: payload.body.data.pageInfo || {},
      };
    }),
  interests: (Client, profileInterestsRequest) => ProfileAPI.fetch(Client, profileInterestsRequest).then((profile) => profile.interests || []),
  report: (Client, reportProfileRequest) =>
    Client.graphql(ProfileMutations.PROFILE_REPORT_MUTATION, {
      reportProfileRequest,
    }).then((payload) => payload.ok).catch((_) => false),
  block: (Client, blockProfileRequest) =>
    Client.graphql(ProfileMutations.PROFILE_BLOCK_MUTATION, {
      blockProfileRequest,
    }).then((payload) => payload.body.data.createBlockProfilesTypedData || {}),
  history: (Client, profileActionHistoryRequest) =>
    Client.graphql(Profile.PROFILE_ACTION_HISTORY_QUERY, {
      profileActionHistoryRequest,
    }).then((payload) => {
      return {
        history: payload.body.data.profileActionHistory.items || [],
        pagination: payload.body.data.profileActionHistory.pageInfo || {},
      };
    }),
  onChainIdentity: (Client, profileOnChainIdentityRequest) => ProfileAPI.fetch(Client, profileOnChainIdentityRequest).then((profile) => profile.onchainIdentity || {}),
  isFollowedByMe: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.isFollowedByMe.value || true),
  isFollowingMe: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.isFollowingMe.value || true),
  isBlockedByMe: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.isBlockedByMe.value || false),
  canFollow: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.canFollow !== "NO"),
  canUnfollow: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.canUnfollow || true),
  canBlock: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.canBlock || true),
  canUnblock: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.canUnblock || false),
  hasBlockedMe: (Client, profileRequest) => ProfileAPI.fetch(Client, profileRequest).then((profile) => profile.operations.hasBlockedMe.value || false),
};

return ProfileAPI;