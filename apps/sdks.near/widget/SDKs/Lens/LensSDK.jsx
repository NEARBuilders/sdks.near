const $ = VM.require(`sdks.near/widget/Loader`);
const {
  Constants,
  Interfaces,
  HealthAPI,
  AuthAPI,
  ProfileAPI,
  PublicationAPI,
  TransactionAPI,
  NotificationAPI,
  SearchAPI,
  AuthRequests,
  ProfileRequests,
  PublicationRequests,
  TransactionRequests,
  NotificationRequests,
  SearchRequests,
  ApiHelper,
} = $("@sdks/lens#alpha");
const { LightClient } = $("@sdks/light-client");

const LensSDK = {
  profile: Interfaces.PROFILE_INTERFACE,
  enableTestnet: () => (LightClient.url = Constants.TESTNET_URL),
  enableMainnet: () => (LightClient.url = Constants.MAINNET_URL),
  isTestnet: () => LightClient.url == Constants.TESTNET_URL,
  init: () => {
    LensSDK.enableMainnet();
    LightClient.auth = Interfaces.AUTH_INTERFACE;
    LightClient.challenge = Interfaces.AUTH_CHALLENGE_INTERFACE;
    LightClient.tokenLifespan = Constants.JWT_TOKEN_LIFESPAN_SECONDS;
    LightClient.refreshTokenLifespan =
      Constants.JWT_REFRESH_TOKEN_LIFESPAN_SECONDS;

    return LensSDK;
  },
  health: {
    ping: () =>
      LensSDK._call(HealthAPI.ping).then(
        (response) => response == Constants.RESPONSE_HEALTH_OK
      ),
  },
  authentication: {
    profiles: (profilesManagedRequest) =>
      LensSDK._call(
        AuthAPI.profiles,
        AuthRequests.PROFILES_MANAGED_REQUEST,
        profilesManagedRequest
      ),
    login: (challengeRequest) =>
      LensSDK._call(
        AuthAPI.challenge,
        AuthRequests.CHALLENGE_REQUEST,
        challengeRequest
      ).then((challenge) => {
        LightClient.challenge = challenge;

        return Ethers.provider()
          .getSigner()
          .signMessage(challenge.text)
          .then((signature) => {
            let signedAuthChallengeRequest =
              AuthRequests.SIGNED_AUTH_CHALLENGE_REQUEST;
            signedAuthChallengeRequest.id = LightClient.challenge.id;
            signedAuthChallengeRequest.signature = signature;

            return LensSDK._call(
              AuthAPI.authenticate,
              AuthRequests.SIGNED_AUTH_CHALLENGE_REQUEST,
              signedAuthChallengeRequest
            ).then((auth) => {
              LightClient.auth = auth;
              LensSDK.profile = {}; // Fetch logged user profile once profile API gets implemented
              return LensSDK.profile;
            });
          });
      }),
    refresh: (refreshTokenRequest) =>
      LensSDK._call(
        AuthAPI.refresh,
        AuthRequests.REFRESH_TOKEN_REQUEST,
        refreshTokenRequest
      ).then((auth) => {
        LightClient.auth = auth;
        LensSDK.profile = {}; // Fetch logged user profile once profile API gets implemented
        return LensSDK.profile;
      }),
    revoke: (revokeAuthenticationRequest) =>
      LensSDK._call(
        AuthAPI.revoke,
        AuthRequests.REVOKE_AUTHENTICATION_REQUEST,
        revokeAuthenticationRequest
      ),
    verify: (verifyRequest) =>
      LensSDK._call(AuthAPI.verify, AuthRequests.VERIFY_REQUEST, verifyRequest),
    list: (approvedAuthenticationRequest) =>
      LensSDK._call(
        AuthAPI.list,
        AuthRequests.APPROVED_AUTHENTICATION_REQUEST,
        approvedAuthenticationRequest
      ),
    isAuthenticated: () => LensSDK.profile.id != "",
    getAccessToken: () => LightClient.auth.accessToken || null,
    getProfileId: () => LensSDK.profile.id || null,
  },
  profile: {
    create: (createProfileRequest) =>
      LensSDK._call(
        ProfileAPI.create,
        ProfileRequests.CREATE_PROFILE_REQUEST,
        createProfileRequest
      ),
    fetch: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.fetch,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    fetchAll: (profilesRequest) =>
      LensSDK._call(
        ProfileAPI.fetchAll,
        ProfileRequests.PROFILES_REQUEST,
        profilesRequest
      ),
    stats: (profileStatsRequest) =>
      LensSDK._call(
        ProfileAPI.stats,
        ProfileRequests.PROFILE_STATS_REQUEST,
        profileStatsRequest
      ),
    recommendations: (profileRecommendationsRequest) =>
      LensSDK._call(
        ProfileAPI.recommendations,
        ProfileRequests.PROFILE_RECOMMENDATIONS_REQUEST,
        profileRecommendationsRequest
      ),
    interests: (profileInterestsRequest) =>
      LensSDK._call(
        ProfileAPI.interests,
        ProfileRequests.PROFILE_INTERESTS_REQUEST,
        profileInterestsRequest
      ),
    report: (reportProfileRequest) =>
      LensSDK._call(
        ProfileAPI.report,
        ProfileRequests.REPORT_PROFILE_REQUEST,
        reportProfileRequest
      ),
    block: (blockProfileRequest) =>
      LensSDK._call(
        ProfileAPI.block,
        ProfileRequests.BLOCK_PROFILE_REQUEST,
        blockProfileRequest
      ),
    history: (profileActionHistoryRequest) =>
      LensSDK._call(
        ProfileAPI.history,
        ProfileRequests.PROFILE_ACTION_HISTORY_REQUEST,
        profileActionHistoryRequest
      ),
    onChainIdentity: (profileOnChainIdentityRequest) =>
      LensSDK._call(
        ProfileAPI.onChainIdentity,
        ProfileRequests.PROFILE_ONCHAIN_IDENTITY_REQUEST,
        profileOnChainIdentityRequest
      ),
    isFollowedByMe: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.isFollowedByMe,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    isBlockedByMe: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.isBlockedByMe,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    isFollowingMe: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.isFollowingMe,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    canFollow: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.canFollow,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    canUnfollow: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.canUnfollow,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    canBlock: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.canBlock,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    hasBlockedMe: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.hasBlockedMe,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    canUnblock: (profileRequest) =>
      LensSDK._call(
        ProfileAPI.canUnblock,
        ProfileRequests.PROFILE_REQUEST,
        profileRequest
      ),
    fetchPublications: (profileId) => LensSDK.publications.fetchAll(profileId),
    isHandleAvailable: (handle) => LensSDK.profile.fetch({ forHandle: handle }),
    whoActedOnPublication: (whoActedOnPublicationRequest) => LensSDK.publication.whoActed(whoActedOnPublicationRequest)
  },
  publication: {
    fetch: (publicationRequest) =>
      LensSDK._call(
        PublicationAPI.fetch,
        PublicationRequests.PUBLICATION_REQUEST,
        publicationRequest
      ),
    fetchAll: (publicationsRequest) =>
      LensSDK._call(
        PublicationAPI.fetchAll,
        PublicationRequests.PUBLICATIONS_REQUEST,
        publicationsRequest
      ),
    stats: (publicationStatsRequest) => 
      LensSDK._call(
        PublicationAPI.stats,
        PublicationRequests.PUBLICATION_STATS_REQUEST,
        publicationStatsRequest
      ),
    whoActed: (whoActedOnPublicationRequest) =>
     LensSDK._call(
        PublicationAPI.whoActed,
        PublicationRequests.WHO_ACTED_ON_PUBLICATION_REQUEST,
        whoActedOnPublicationRequest
      ),
    comments: (publicationRequest) => 
      LensSDK._call(
        PublicationAPI.comments,
        PublicationRequests.PUBLICATION_REQUEST,
        publicationRequest
      ),
    mirrors: (publicationRequest) => 
      LensSDK._call(
        PublicationAPI.mirrors,
        PublicationRequests.PUBLICATION_REQUEST,
        publicationRequest
      ),
    quotes: (publicationRequest) => 
      LensSDK._call(
        PublicationAPI.quotes,
        PublicationRequests.PUBLICATION_REQUEST,
        publicationRequest
      ),
    reactions: {
      fetch: () => {},
      add: (publicationReactionRequest) => 
        LensSDK.publication._react(PublicationAPI.addReaction, publicationReactionRequest),
      remove: (publicationReactionRequest) => 
        LensSDK.publication._react(PublicationAPI.removeReaction, publicationReactionRequest),
      _react: (reactionEndpoint, publicationReactionRequest) =>
        LensSDK._call(
          reactionEndpoint,
          PublicationRequests.PUBLICATION_REACTION_REQUEST,
          publicationReactionRequest
        )
    },
    hide: (hidePublicationRequest) => 
      LensSDK._call(
        PublicationAPI.hide,
        PublicationRequests.HIDE_PUBLICATION_REQUEST,
        hidePublicationRequest
      ),
    report: (reportPublicationRequest) => 
      LensSDK._call(
        PublicationAPI.report,
        PublicationRequests.REPORT_PUBLICATION_REQUEST,
        reportPublicationRequest
      ),
  },
  search: {
    profiles: () => (profileSearchRequest) => 
      LensSDK._call(
        SearchAPI.profiles,
        SearchRequests.PROFILE_SEARCH_REQUEST,
        profileSearchRequest
      ),
    publications: (publicationSearchRequest) => 
      LensSDK._call(
        SearchAPI.publications,
        SearchRequests.PUBLICATION_SEARCH_REQUEST,
        publicationSearchRequest
      ),
  },
  notifications: {
    fetch: () => (notificationRequest) => 
      LensSDK._call(
        NotificationAPI.fetch,
        NotificationRequests.NOTIFICATION_REQUEST,
        notificationRequest
      ),
  },
  transaction: {
    status: (lensTransactionStatusRequest) => 
      LensSDK._call(
        TransactionAPI.status,
        TransactionRequests.LENS_TRANSACTION_STATUS_REQUEST,
        lensTransactionStatusRequest
      ),
    txIdToTxHash: (txIdToTxHashRequest) => 
      LensSDK._call(
        TransactionAPI.txIdToTxHash,
        TransactionRequests.TXID_TO_TXHASH_REQUEST,
        txIdToTxHashRequest
      ),
  },
  _call: (apiMethod, requestObject, dataObject) => {
    console.log(dataObject);
    return apiMethod(
      LightClient,
      dataObject ? ApiHelper.intersect(requestObject, dataObject) : null
    );
  }
};

return LensSDK.init();
