const $ = VM.require(`sdks.near/widget/Loader`);
const { Auth } = $("@sdks/lens/queries");
const { Interfaces } = $("@sdks/lens/definitions");

return {
  profiles: (Client, profilesManagedRequest) => {
    return Client.graphql(Auth.PROFILES_MANAGED_QUERY, {
      profilesManagedRequest,
    }).then((payload) => payload.body.data.profilesManaged.items || []);
  },
  challenge: (Client, challengeRequest) => {
    return Client.graphql(Auth.CHALLENGE_QUERY, { challengeRequest }).then(
      (data) => {
        return data.body.data.challenge || Interfaces.AUTH_CHALLENGE_INTERFACE;
      }
    );
  },
  authenticate: (Client, signedAuthChallengeRequest) => {
    return Client.graphql(Auth.SIGNED_AUTH_CHALLENGE_QUERY, {
      signedAuthChallengeRequest,
    }).then((payload) => {
      return payload.body.data.authenticate || Interfaces.AUTH_INTERFACE;
    });
  },
  refresh: (Client, refreshRequest) => {
    return Client.graphql(Auth.PROFILES_MANAGED_QUERY, { refreshRequest }).then(
      (payload) => payload.body.data.refresh || Interfaces.AUTH_INTERFACE
    );
  },
  revoke: (Client, revokeAuthenticationRequest) => {
    return Client.graphql(Auth.REVOKE_AUTHENTICATION_QUERY, {
      revokeAuthenticationRequest,
    }).then((payload) => true);
  },
  list: (Client, approvedAuthenticationRequest) => {
    return Client.graphql(Auth.APPROVED_AUTHENTICATION_QUERY, {
      approvedAuthenticationRequest,
    }).then((payload) => payload.body.data.approvedAuthentication.items || []);
  },
  verify: (Client, verifyRequest) => {
    return Client.graphql(Auth.VERIFY_REQUEST, { verifyRequest }).then(
      (payload) => (payload.body.data.verify || false) == true
    );
  },
};
