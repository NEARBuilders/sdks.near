const $ = VM.require("sdks.near/widget/Loader");
const { LensSDK } = $("@sdks/lens-sdk");
const { Constants } = $("@sdks/lens/definitions");

State.init({
  evmAddress: "",
  lastAuthenticationResult: "",
  lastProfileResult: "",
  lastProfileWriteResult: "",
  lastPublicationReadResult: "",
  lastPublicationWriteResult: "",
  lastPublicationSearchResult: "",
  lastProfileSearchResult: "",
  alive: null,
  profiles: [],
  login: null,
  verify: null,
  refresh: null,
  list: null,
  revoke: null,
  customProfileHandle: "lens/mattb",
  searchProfileTerm: "stani",
  searchPublicationTerm: "NEAR Protocol"
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
  margin-bottom:20px;

  button {
    margin: 10px 3px;
  }

  p {
    font-size:1.2rem;
    font-weight:bold;
    padding:0;
    margin:0;
    margin-bottom:15px;
  }

  .note {
    display:inline-block;
    font-size:.8rem;
    margin:10px 0;
    background-color:#F8F3D6;
    border:1px solid #F2EAC4;
    padding:10px;
    border-radius:10px;
  }
`;

return (
  <>
    <Panel>
      <p>Health</p>
      <button onClick={() => {
        LensSDK.health.ping().then((alive) => {
          State.update({alive});
        })
      }}>Check API status</button>
      <br/><br/>
      {null === state.alive && "Nothing to show yet"}
      {state.alive && "Alive"}
      {false === state.alive && "Not alive"}
    </Panel>
    <Panel id="authenticate">
      <p>Authentication</p>
      <Web3Connect />
      <button onClick={() => {
        LensSDK.authentication.profiles({
          for: state.evmAddress
        }).then((profilesManaged) => {
          State.update({lastAuthenticationResult: profilesManaged, profiles: profilesManaged})
        })
      }}>Get profiles managed</button>
      <button onClick={() => {
        LensSDK.authentication.login({
          signedBy: state.evmAddress,
          for: state.profiles[0].id
        }).then((result) => {
          State.update({lastAuthenticationResult: result, login: result});
        })
      }}>Authenticate</button>
      <button onClick={() => {
        LensSDK.authentication.verify().then((result) => {
          State.update({lastAuthenticationResult: result, verify: result});
        })
      }}>Verify authentication</button>
      <button onClick={() => {
        LensSDK.authentication.refresh().then((result) => {
          State.update({lastAuthenticationResult: result, refresh: result});
        })
      }}>Refresh authentication</button>
       <button onClick={() => {
        LensSDK.authentication.list({}).then((result) => {
          State.update({lastAuthenticationResult: result, list: result});
        })
      }}>List authentications</button>

      <button onClick={() => {
        LensSDK.authentication.revoke({
          authorizationId: state.list[0].authorizationId
        }).then((result) => {
          State.update({lastAuthenticationResult: result, revoke: result});
        })
      }}>Revoke authentication</button>
      
      <br/><br/>
      {state.lastAuthenticationResult ? JSON.stringify(state.lastAuthenticationResult) : "Nothing to show yet"}
    </Panel>
    <Panel>
      <p>Profile</p>
      <Panel>
        <p>Read</p>
        <p class="note">Warning: Some endpoints require to be authenticated to work properly (Action History, isFollowedByMe...)</p>
        <input placeholder="Profile full handle" value={state.customProfileHandle} onChange={(e) => State.update({customProfileHandle: e.target.value})} />
        <br/>
        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            State.update({lastProfileResult: profile});
          })
        }}>Profile</button>

        <button onClick={() => {
          LensSDK.profile.fetchAll({
            where: {
              handles: [state.customProfileHandle]
            }
          }).then((profiles) => {
            State.update({lastProfileResult: profiles});
          })
        }}>Profiles</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.following({
              for: profile.id
            }).then((paginatedResult) => {
              State.update({lastProfileResult: paginatedResult});
            });
          });
        }}>Following</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.followers({
              of: profile.id
            }).then((paginatedResult) => {
              State.update({lastProfileResult: paginatedResult});
            });
          });
        }}>Followers</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.stats({
              forProfileId: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((stats) => {
              State.update({lastProfileResult: stats});
            });
          });
        }}>Stats</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.recommendations({
              for: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((recommendations) => {
              // Too many recommendations, picking just one for testing purposes
              let randomProfile = Math.floor(Math.random() * recommendations.profiles.length);

              State.update({lastProfileResult: recommendations.profiles[randomProfile]});
            });
          });
        }}>Profile Recommendations</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.interests({
              forProfileId: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((interests) => {

              State.update({lastProfileResult: interests});
            });
          });
        }}>Interests</button>

        <button onClick={() => {
          LensSDK.profile.fetch({
            forHandle: state.customProfileHandle
          }).then((profile) => {
            LensSDK.profile.onChainIdentity({
              forProfileId: profile.id || LensSDK.getProfileId() || "0x01ccf2"
            }).then((interests) => {
              State.update({lastProfileResult: interests});
            });
          });
        }}>On-Chain Identity</button>

        <button onClick={() => {
          LensSDK.profile.isHandleAvailable(state.customProfileHandle).then((status) => {
            State.update({lastProfileResult: status.toString()});
          })
        }}>Is handle available</button>

        <button onClick={() => {
          LensSDK.profile.history({
            forProfileId: LensSDK.getProfileId()
          }).then((interests) => {
            State.update({lastProfileResult: interests});
          });
        }}>Action History</button>

        <button onClick={() => {
          LensSDK.profile.isFollowedByMe({
            forHandle: state.customProfileHandle
          }).then((isFollowedByMe) => {
            State.update({lastProfileResult: isFollowedByMe.toString()});
          });
        }}>Profile is followed by me</button>

        <button onClick={() => {
          LensSDK.profile.isFollowingMe({
            forHandle: state.customProfileHandle
          }).then((isFollowingMe) => {
            State.update({lastProfileResult: isFollowingMe.toString()});
          });
        }}>Profile is following me</button>

        <button onClick={() => {
          LensSDK.profile.isBlockedByMe({
            forHandle: state.customProfileHandle
          }).then((isBlockedByMe) => {
            State.update({lastProfileResult: isBlockedByMe.toString()});
          });
        }}>Profile is blocked by me</button>

        <button onClick={() => {
          LensSDK.profile.canFollow({
            forHandle: state.customProfileHandle
          }).then((canFollow) => {
            State.update({lastProfileResult: canFollow.toString()});
          });
        }}>Can follow profile</button>

        <button onClick={() => {
          LensSDK.profile.canUnfollow({
            forHandle: state.customProfileHandle
          }).then((canUnfollow) => {
            State.update({lastProfileResult: canUnfollow.toString()});
          });
        }}>Can unfollow profile</button>

        <button onClick={() => {
          LensSDK.profile.canUnblock({
            forHandle: state.customProfileHandle
          }).then((canUnblock) => {
            State.update({lastProfileResult: canUnblock.toString()});
          });
        }}>Can unblock profile</button>

        <button onClick={() => {
          LensSDK.profile.hasBlockedMe({
            forHandle: state.customProfileHandle
          }).then((hasBlockedMe) => {
            State.update({lastProfileResult: hasBlockedMe.toString()});
          });
        }}>Profile has blocked me</button>

        <br/><br/>
        {state.lastProfileResult ? JSON.stringify(state.lastProfileResult) : "Nothing to show yet"}
      </Panel>
      <br/><br/>
      <Panel>
        <p>Write</p>
        <p class="note">Warning: <a href="#authenticate">Authentication</a> required. They perform real actions</p>
        <br/>

        <button onClick={() => {
          LensSDK.profile.block({
            profiles: ["0x73b1"]
          }).then((result) => {
            State.update({lastProfileWriteResult: result.toString()});
          });
        }}>Block profile</button>

        <button onClick={() => {
          LensSDK.profile.report({
            for: "0x73b1",
            reason: {
              spamReason: {
                reason: "SPAM",
                subreason: "REPETITIVE"
              }
            },
            additionalComments: "Test API Integration"
          }).then((result) => {
            State.update({lastProfileWriteResult: result.toString()});
          });
        }}>Report profile</button>

        <br/><br/>
        {state.lastProfileWriteResult ? JSON.stringify(state.lastProfileWriteResult) : "Nothing to show yet"}
      </Panel>
    </Panel>
    <Panel>
      <p>Publication</p>
      <Panel>
        <p>Read</p>
        <p className="note">Warning: Some endpoints require to be authenticated to work properly</p>
        <br/><br/>
        <button onClick={() => {
          LensSDK.publication.fetch({
            forId: '0x01-0x02c5'
          }).then((publication) => {
            State.update({lastPublicationReadResult: publication});
          });
        }}>Publication</button>
        <button onClick={() => {
          LensSDK.publication.fetchAll({
            where: {
              from: "0x01"
            }
          }).then((publication) => {
            State.update({lastPublicationReadResult: publication});
          });
        }}>Publications</button>
        <br/><br/>
        {state.lastPublicationReadResult ? JSON.stringify(state.lastPublicationReadResult) : "Nothing to show yet"}
      </Panel>
    </Panel>

    <Panel>
      <p>Search</p>

      <Panel>
        <p>Search profiles</p>
        <input type="text" value={state.searchProfileTerm} onChange={(e) => State.update({ searchProfileTerm: e.target.value })}/>
        <button onClick={() => {
          LensSDK.search.profiles({
            query: state.searchProfileTerm
          }).then((searchResult) => {
            State.update({lastProfileSearchResult: searchResult});
          });
        }}>Search profiles</button>
        <br/><br/>
        {state.lastProfileSearchResult ? JSON.stringify(state.lastProfileSearchResult) : "Nothing to show yet"}
      </Panel>

      <Panel>
        <p>Search publications</p>
        <input type="text" value={state.searchPublicationTerm} onChange={(e) => State.update({ searchPublicationTerm: e.target.value })}/>
        <button onClick={() => {
          LensSDK.search.publications({
            limit: Constants.API_REQUEST_LIMITS.TEN,
            query: state.searchPublicationTerm,
            where: {
              metadata: {
                locale: "en"
              }
            }
          }).then((searchResult) => {
            State.update({lastPublicationSearchResult: searchResult});
          });
        }}>Search publications</button>
        <br/><br/>
        {state.lastPublicationSearchResult ? JSON.stringify(state.lastPublicationSearchResult) : "Nothing to show yet"}
      </Panel>
    </Panel>
  </>
);
