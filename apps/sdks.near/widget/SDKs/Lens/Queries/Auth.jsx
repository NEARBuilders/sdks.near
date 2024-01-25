const PROFILES_MANAGED_QUERY = `
    query profilesManaged($profilesManagedRequest: ProfilesManagedRequest!) {
      profilesManaged(request: $profilesManagedRequest) {
        items {
          id
          ownedBy {
            address
            chainId
          }
          handle {
            id
            fullHandle
          }
        }
      }
    }
`;

const CHALLENGE_QUERY = `
    query Challenge($challengeRequest: ChallengeRequest!) {
      challenge(request: $challengeRequest) {
        id
        text
      }
    }
`;

const SIGNED_AUTH_CHALLENGE_QUERY = `
    mutation Authenticate($signedAuthChallengeRequest: SignedAuthChallenge!) {
      authenticate(request: $signedAuthChallengeRequest) {
        accessToken
        refreshToken
      }
    }
`;

const REFRESH_TOKEN_QUERY = `
    mutation Refresh($refreshRequest: RefreshRequest!) {
      refresh(request: $refreshRequest) {
        accessToken
        refreshToken
      }
    }
`;

const REVOKE_AUTHENTICATION_QUERY = `
    mutation RevokeAuthentication($revokeAuthenticationRequest: RevokeAuthenticationRequest!) {
      revokeAuthentication(request: $revokeAuthenticationRequest)
    }
`;

const APPROVED_AUTHENTICATIONS_QUERY = `
    query ApprovedAuthentication($approvedAuthenticationRequest: ApprovedAuthenticationRequest!) {
      approvedAuthentication(request: $approvedAuthenticationRequest) {
        pageInfo {
          prev
          next
        }
        items {
          authorizationId
          browser
          device
          os
          origin
          expiresAt
          createdAt
          updatedAt
        }
      }
    }
`;

const VERIFY_TOKEN_QUERY = `
    query Query($verifyRequest: VerifyRequest!) {
      verify(request: $verifyRequest)
    }
`;

return {
  SIGNED_AUTH_CHALLENGE_QUERY,
  CHALLENGE_QUERY,
  PROFILES_MANAGED_QUERY,
  REFRESH_TOKEN_QUERY,
  REVOKE_AUTHENTICATION_QUERY,
  APPROVED_AUTHENTICATION_QUERY,
  VERIFY_QUERY,
};
