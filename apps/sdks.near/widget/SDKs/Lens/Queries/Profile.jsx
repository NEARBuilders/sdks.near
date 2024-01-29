const PROFILE_QUERY = `query Profile($profileRequest: ProfileRequest!) {\n  profile(request: $profileRequest) {\n    ...ProfileFields\n    __typename\n  }\n}\n\nfragment ProfileFields on Profile {\n  id\n  handle {\n    ...HandleInfoFields\n    __typename\n  }\n  ownedBy {\n    ...NetworkAddressFields\n    __typename\n  }\n  signless\n  sponsor\n  createdAt\n  stats {\n    ...ProfileStatsFields\n    __typename\n  }\n  operations {\n    ...ProfileOperationsFields\n    __typename\n  }\n  interests\n  invitedBy {\n    id\n    handle {\n      ...HandleInfoFields\n      __typename\n    }\n    ownedBy {\n      ...NetworkAddressFields\n      __typename\n    }\n    metadata {\n      ...ProfileMetadataFields\n      __typename\n    }\n    __typename\n  }\n  invitesLeft\n  onchainIdentity {\n    proofOfHumanity\n    ens {\n      name\n      __typename\n    }\n    sybilDotOrg {\n      verified\n      source {\n        twitter {\n          handle\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    worldcoin {\n      isHuman\n      __typename\n    }\n    __typename\n  }\n  followNftAddress {\n    ...NetworkAddressFields\n    __typename\n  }\n  metadata {\n    ...ProfileMetadataFields\n    __typename\n  }\n  followModule {\n    ...FollowModuleFields\n    __typename\n  }\n  __typename\n}\n\nfragment HandleInfoFields on HandleInfo {\n  fullHandle\n  localName\n  suggestedFormatted {\n    localName\n    __typename\n  }\n  linkedTo {\n    nftTokenId\n    __typename\n  }\n  __typename\n}\n\nfragment NetworkAddressFields on NetworkAddress {\n  address\n  chainId\n  __typename\n}\n\nfragment ProfileStatsFields on ProfileStats {\n  id\n  followers\n  following\n  comments\n  posts\n  mirrors\n  quotes\n  __typename\n}\n\nfragment ProfileOperationsFields on ProfileOperations {\n  id\n  isBlockedByMe {\n    value\n    __typename\n  }\n  isFollowedByMe {\n    value\n    __typename\n  }\n  isFollowingMe {\n    value\n    __typename\n  }\n  __typename\n}\n\nfragment ProfileMetadataFields on ProfileMetadata {\n  displayName\n  bio\n  rawURI\n  picture {\n    ... on ImageSet {\n      ...ImageSetFields\n      __typename\n    }\n    ... on NftImage {\n      image {\n        ...ImageSetFields\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  coverPicture {\n    ...ImageSetFields\n    __typename\n  }\n  attributes {\n    ...MetadataAttributeFields\n    __typename\n  }\n  __typename\n}\n\nfragment ImageSetFields on ImageSet {\n  optimized {\n    uri\n    __typename\n  }\n  raw {\n    uri\n    __typename\n  }\n  __typename\n}\n\nfragment MetadataAttributeFields on MetadataAttribute {\n  type\n  key\n  value\n  __typename\n}\n\nfragment FollowModuleFields on FollowModule {\n  ... on FeeFollowModuleSettings {\n    type\n    amount {\n      ...AmountFields\n      __typename\n    }\n    recipient\n    __typename\n  }\n  ... on RevertFollowModuleSettings {\n    type\n    __typename\n  }\n  ... on UnknownFollowModuleSettings {\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment AmountFields on Amount {\n  asset {\n    ...Erc20Fields\n    __typename\n  }\n  value\n  __typename\n}\n\nfragment Erc20Fields on Asset {\n  ... on Erc20 {\n    name\n    symbol\n    decimals\n    contract {\n      ...NetworkAddressFields\n      __typename\n    }\n    __typename\n  }\n  __typename\n}`;

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
