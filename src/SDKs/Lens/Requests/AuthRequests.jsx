const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants } = $("@sdks/lens/definitions");

const PROFILES_MANAGED_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  for: "",
  includeOwned: true,
};

const CHALLENGE_REQUEST = {
  signedBy: "",
  for: "",
};

const SIGNED_AUTH_CHALLENGE_REQUEST = {
  id: "",
  signature: "",
};

const REFRESH_REQUEST = {
  refreshToken: "",
};

const REVOKE_AUTHENTICATION_REQUEST = {
  authorizationId: "",
};

const APPROVED_AUTHENTICATION_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: {},
};

const VERIFY_REQUEST = {
  accessToken: "",
};

return {
  PROFILES_MANAGED_REQUEST,
  CHALLENGE_REQUEST,
  SIGNED_AUTH_CHALLENGE_REQUEST,
  REFRESH_REQUEST,
  REVOKE_AUTHENTICATION_REQUEST,
  APPROVED_AUTHENTICATION_REQUEST,
  VERIFY_REQUEST,
};
