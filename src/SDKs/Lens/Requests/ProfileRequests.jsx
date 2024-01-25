const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants } = $("@sdks/lens/definitions");

const CREATE_PROFILE_REQUEST = {
  handle: "",
  to: "",
};

const PROFILE_REQUEST = {
  forProfileId: "",
  forHandle: "",
};

const PROFILES_WHERE_REQUEST = {
  profileIds: [],
  ownedBy: [],
  handles: [],
  whoMirroredPublication: [],
  whoQuotedPublication: [],
  whoCommentedOn: [],
};

const PROFILES_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  where: PROFILES_WHERE_REQUEST,
};

const PROFILE_STATS_REQUEST = {
  profileId: "",
  forApps: [],
  anyOf: [],
};

const PROFILE_RECOMMENDATIONS_REQUEST = {
  for: "",
};

const PROFILE_INTERESTS_REQUEST = {
  profileId: "",
};

const REPORT_PROFILE_REQUEST = {
  for: "",
  reason: {},
  additionalComments: "",
};

const BLOCK_PROFILE_REQUEST = {
  profiles: [],
};

const PROFILE_ACTION_HISTORY_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
};

const PROFILE_ONCHAIN_IDENTITY_REQUEST = {
  profileId: "",
};

return {
  CREATE_PROFILE_REQUEST,
  PROFILE_REQUEST,
  PROFILES_WHERE_REQUEST,
  PROFILES_REQUEST,
  PROFILE_STATS_REQUEST,
  PROFILE_RECOMMENDATIONS_REQUEST,
  PROFILE_INTERESTS_REQUEST,
  REPORT_PROFILE_REQUEST,
  BLOCK_PROFILE_REQUEST,
  PROFILE_ACTION_HISTORY_REQUEST,
  PROFILE_ONCHAIN_IDENTITY_REQUEST,
};
