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

const APPROVED_AUTHENTICATION_QUERY = `
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
  PROFILES_MANAGED_QUERY,
  CHALLENGE_QUERY,
  APPROVED_AUTHENTICATION_QUERY,
  VERIFY_TOKEN_QUERY,
};
