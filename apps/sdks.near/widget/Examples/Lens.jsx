const $ = VM.require("sdks.near/widget/Loader");
const { LensSDK } = $("@sdks/lens-sdk");
const { AuthRequests } = $("@sdks/lens/requests");

State.init({
  evmAddress: "",
  profiles: [],
  login: null,
  verify: null,
  refresh: null,
  list: null,
  revoke: null,
  lastResult: ""
})

LensSDK = new LensSDK(State, state);

if (!state.evmAddress && Ethers.provider()) {
  const [address] = Ethers.send("eth_requestAccounts", []);

  if (address) {
    State.update({evmAddress: address});
  }
}

const Panel = styled.div`
  padding:20px;
  border:1px solid rgba(0,0,0,.1);
  border-radius:10px;

  p {
    font-size:1.2rem;
    font-weight:bold;
  }
`;

return (
  <>
    <Panel>
      <p>Authentication</p>
      <Web3Connect />
      <button onClick={() => {
        LensSDK.authentication.profiles({
          for: state.evmAddress
        }).then((profilesManaged) => {
          State.update({lastResult: profilesManaged, profiles: profilesManaged})
        })
      }}>Get profiles managed</button>
      <button onClick={() => {
        LensSDK.authentication.login({
          signedBy: state.evmAddress,
          for: state.profiles[0].id
        }).then((result) => {
          State.update({lastResult: result, login: result});
        })
      }}>Authenticate</button>
      <button onClick={() => {
        LensSDK.authentication.verify().then((result) => {
          State.update({lastResult: result, verify: result});
        })
      }}>Verify authentication</button>
      <button onClick={() => {
        LensSDK.authentication.refresh().then((result) => {
          State.update({lastResult: result, refresh: result});
        })
      }}>Refresh authentication</button>
       <button onClick={() => {
        LensSDK.authentication.list({}).then((result) => {
          State.update({lastResult: result, list: result});
        })
      }}>List authentications</button>

      <button onClick={() => {
        LensSDK.authentication.revoke({
          authorizationId: state.list[0].authorizationId
        }).then((result) => {
          State.update({lastResult: result, revoke: result});
        })
      }}>Revoke authentication</button>
      
      <br/><br/>
      {state.lastResult ? JSON.stringify(state.lastResult) : "Nothing to show yet"}
    </Panel>
  </>
);
