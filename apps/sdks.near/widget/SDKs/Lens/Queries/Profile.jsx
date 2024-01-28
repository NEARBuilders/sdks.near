const PROFILE_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        ...Profile
      }
    }
`;

const PROFILES_QUERY = `
    query Profile($profilesRequest: ProfilesRequestWhere!) {
      profile(request: $profilesRequest) {
        items {
          ...Profile
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

const PROFILE_STATS_QUERY = `
    query Profile($profileId: ProfileId!, $forApps: [AppId] = [], $anyOf: [OpenActionFilter] = []) {
      profile(request: { profileId: $profileId }) {
        stats(request: $forApps) {
          followers(request: $forApps)
          following(request: $forApps)
          comments(request: $forApps)
          posts(request: $forApps)
          mirrors(request: $forApps)
          quotes(request: $forApps)
          mirrors(request: $forApps)
          quotes(request: $forApps)
          publications(request: $forApps)
          upvoteReactions: reactions(request: { type: UPVOTE })
          downvoteReactions: reactions(request: { type: DOWNVOTE })
          countOpenActions(request: { anyOf: $anyOf })
        }
      }
    }
`;

const PROFILE_RECOMMENDATIONS_QUERY = `
    query ProfileRecommendations($profileRecommendationsRequest: ProfileRecommendationsRequest!) {
      profileRecommendations(request: $profileRecommendationsRequest) {
        items {
          ...Profile
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

const PROFILE_INTERESTS_QUERY = `
    query Profile($profileId: ProfileId!) {
      profile(request: { profileId: $profileId }) {
        profileInterests
      }
    }
`;

const PROFILE_ACTION_HISTORY_QUERY = `
    query($profileActionHistoryRequest: ProfileActionHistoryRequest!) {
      profileActionHistory(request: $profileActionHistoryRequest) {
        items {
          ...ProfileActionHistory
        }
        pageInfo {
          ...PaginatedResultInfo
        }
      }
    }
`;

const PROFILE_ONCHAIN_IDENTITY_QUERY = `
    query Profile($profileId: ProfileId!) {
      profile(request: { profileId: $profileId }) {
        onChainIdentity {
          ens {
            name
          }
          proofOfHumanity
          sybilDotOrg {
            verified
            source {
              twitter {
                handle
              }
            }
          }
          worldcoin {
            isHuman
          }
        }
      }
    }
`;

const PROFILE_IS_FOLLOWED_BY_ME_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        isFollowedByMe
      }
    }
`;

const PROFILE_IS_FOLLOWING_ME_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        isFollowingMe
      }
    }
`;

const PROFILE_CAN_FOLLOW_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        canFollow
      }
    }
`;
const PROFILE_CAN_UNFOLLOW_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        canUnfollow
      }
    }
`;

const PROFILE_IS_BLOCKED_BY_ME_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        isBlockedByMe
      }
    }
`;

const PROFILE_HAS_BLOCKED_ME_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        hasBlockedMe
      }
    }
`;

const PROFILE_CAN_BLOCK_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        canBlock
      }
    }
`;
const PROFILE_CAN_UNBLOCK_QUERY = `
    query Profile($profileRequest: ProfileRequest!) {
      profile(request: $profileRequest) {
        canUnblock
      }
    }
`;

return {
  PROFILE_QUERY,
  PROFILES_QUERY,
  PROFILE_STATS_QUERY,
  PROFILE_RECOMMENDATIONS_QUERY,
  PROFILE_INTERESTS_QUERY,
  PROFILE_ACTION_HISTORY_QUERY,
  PROFILE_ONCHAIN_IDENTITY_QUERY,
  PROFILE_IS_FOLLOWED_BY_ME_QUERY,
  PROFILE_IS_FOLLOWING_ME_QUERY,
  PROFILE_CAN_FOLLOW_QUERY,
  PROFILE_CAN_UNFOLLOW_QUERY,
  PROFILE_IS_BLOCKED_BY_ME_QUERY,
  PROFILE_CAN_BLOCK_QUERY,
  PROFILE_CAN_UNBLOCK_QUERY,
  PROFILE_HAS_BLOCKED_ME,
};
