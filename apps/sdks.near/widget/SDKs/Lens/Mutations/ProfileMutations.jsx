// Only works on Lens Testnet for now
const CREATE_PROFILE_MUTATION = `
    mutation CreateProfile($createProfileRequest: CreateProfileRequest!) {
      createProfileWithHandle(
        request: $createProfileRequest
      ) {
        ... on RelaySuccess {
          txHash
        }
        ... on CreateProfileWithHandleErrorResult {
          reason
        }
      }
    }
`;

const PROFILE_REPORT_MUTATION = `
    mutation reportProfile($reportProfileRequest: ReportProfileRequest!) {
      reportProfile(request: $reportProfileRequest)
    }
`;

const PROFILE_BLOCK_MUTATION = `
    mutation Block($blockRequest: BlockRequest!) {
      block(request: $blockRequest) {
        ... on RelaySuccess {
          ...RelaySuccess
        }
        ... on LensProfileManagerRelayError {
          ...LensProfileManagerRelayError
        }
      }
    }
`;

return {
    CREATE_PROFILE_MUTATION,
    PROFILE_REPORT_MUTATION,
    PROFILE_BLOCK_MUTATION
};