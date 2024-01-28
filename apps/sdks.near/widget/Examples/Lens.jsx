const $ = VM.require("sdks.near/widget/Loader");
const { LensSDK } = $("@sdks/lens-sdk");
const { AuthRequests } = $("@sdks/lens/requests");

State.init({
  evmAddress: "",
  profilesManaged: [],
  lastResult: ""
})

if (!state.evmAddress && Ethers.provider()) {
  const [address] = Ethers.send("eth_requestAccounts", []);

  if (address) {
    State.update({evmAddress: address});
  }
}

return (
  <>
    <p>Log in</p>
    <Web3Connect />
    <button onClick={() => {
      LensSDK.authentication.profiles({
        for: state.evmAddress
      }).then((profilesManaged) => {
        State.update({lastResult: profilesManaged, profilesManaged: profilesManaged})
      })
    }}>Get profiles managed</button>
    <button onClick={() => {
      LensSDK.authentication.login({
        signedBy: state.evmAddress,
        for: state.profilesManaged[0].id
      }).then((result) => {
        State.update({lastResult: result});
      })
    }}>Authenticate</button>
    
    <br/><br/>
    {state.lastResult ? JSON.stringify(state.lastResult) : "No response yet"}
  </>
);
