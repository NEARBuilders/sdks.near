return (daoId, proposalId, factoryId) => {
  const DaoSDK = {
    getDaoVersion: () => {
      return Near.view(daoId, "version");
    },
    getPolicy: () => {
      return Near.view(daoId, "get_policy");
    },
    getConfig: () => {
      return Near.view(daoId, "get_config");
    },

    // PROPOSALS
    getProposalById: ({ proposalId }) => {
      return Near.view(daoId, "get_proposal", {
        id: parseInt(proposalId)
      });
    },
    getLastProposalId: () => {
      return Near.view(daoId, "get_last_proposal_id");
    },
    getProposals: ({ offset, limit }) => {
      return Near.view(daoId, "get_proposals", {
        from_index: offset,
        limit: limit
      });
    },

    // ROLES + PERMISSIONS
    // returns array of members for a particular groupId
    getMembersByGroupId: ({ groupId }) => {
      const policy = DaoSDK.getPolicy(daoId);
      return Array.isArray(policy.roles)
        ? policy?.roles
            .filter((role) => role.name === groupId)
            .map((role) => {
              const group = role.kind.Group;
              return group;
            })
        : [];
    },
    // return [{ members:{},permissions:{},name:"" }]
    getGroupsAndMembers: ({ groupId }) => {
      const policy = DaoSDK.getPolicy(daoId);
      const data = [];
      if (Array.isArray(policy.roles)) {
        policy.roles.map((role) => {
          data.push({
            name: role.name,
            permissions: role.permissions,
            members: role.kind.Group
          });
        });
      }
      return data;
    },
    // returns a boolean indicating whether the user has the specified permission or not
    hasPermission: ({ accountId, permissionType }) => {
      const isAllowed = false;
      const policy = DaoSDK.getPolicy(daoId);
      if (Array.isArray(policy.roles)) {
        const permissions = policy.roles.map((role) => {
          if (
            Array.isArray(role.kind.Group) &&
            role.kind.Group.includes(accountId)
          ) {
            return (
              role.permissions.includes(`*:${permissionType}`) ||
              role.permissions.includes("*:*")
            );
          }
        });
        isAllowed = permissions.some((element) => element === true);
      }
      return isAllowed;
    },

    // returns user/accountId status about membership of specified roles within a DAO or has an active proposal for membership within a defined search range
    checkIsMemberOrPending: ({ accountId, rolesToCheck, searchRange }) => {
      if (!accountId) {
        return false;
      }
      if (!Array.isArray(rolesToCheck)) {
        rolesToCheck = ["council"];
      }
      const range = searchRange ?? 100;

      const lastProposalId = DaoSDK.getLastProposalId();

      const policy = DaoSDK.getPolicy();
      const isDaoMember = false;
      const lastProposals =
        DaoSDK.getProposals({
          offset: lastProposalId - range,
          limit: range
        }) || [];

      const alreadyMadeAProposal =
        lastProposals.filter((proposal) => {
          return (
            proposal.proposer === accountId &&
            proposal.status === "InProgress" &&
            Object.keys(proposal.kind ?? {})?.[0] === "AddMemberToRole"
          );
        }).length > 0;

      if (Array.isArray(policy.roles)) {
        policy.roles
          .filter((role) => rolesToCheck.includes(role.name))
          .map((role) => {
            if (Array.isArray(role.kind.Group) && !isDaoMember) {
              isDaoMember = role.kind.Group.includes(accountId);
            }
          });
      }
      return { isDaoMember, alreadyMadeAProposal };
    },

    // BOUNTIES
    getBountyById: ({ bountyId }) => {
      return Near.view(daoId, "get_bounty", {
        id: bountyId
      });
    },
    getBountyNoOfClaims: ({ bountyId }) => {
      return Near.view(daoId, "get_bounty_number_of_claims", {
        id: bountyId
      });
    },
    getBountyClaimsByAccountId: ({ accountId }) => {
      return Near.view(daoId, "get_bounty_claims", {
        account_id: accountId
      });
    },

    // UTILS
    call: ({ methodName, args, deposit, gas }) => {
      const policy = DaoSDK.getPolicy();
      const minDeposit = Big(policy?.proposal_bond);
      // make sure that the deposit is more/equal than bond amount
      const finalDeposit = Big(deposit).gt(minDeposit) ? deposit : minDeposit;
      return Near.call([
        {
          contractName: daoId,
          methodName,
          args,
          deposit: finalDeposit,
          gas: gas
        }
      ]);
    },
    voteActions: {
      VoteApprove: "VoteApprove",
      VoteReject: "VoteReject",
      VoteRemove: "VoteRemove"
    },
    proposalKinds: {
      ChangeConfig: "config",
      ChangePolicy: "policy",
      AddMemberToRole: "add_member_to_role",
      RemoveMemberFromRole: "remove_member_from_role",
      FunctionCall: "call",
      UpgradeSelf: "upgrade_self",
      UpgradeRemote: "upgrade_remote",
      Transfer: "transfer",
      SetStakingContract: "set_vote_token",
      AddBounty: "add_bounty",
      BountyDone: "bounty_done",
      Vote: "vote",
      FactoryInfoUpdate: "factory_info_update",
      ChangePolicyAddOrUpdateRole: "policy_add_or_update_role",
      ChangePolicyRemoveRole: "policy_remove_role",
      ChangePolicyUpdateDefaultVotePolicy: "policy_update_default_vote_policy",
      ChangePolicyUpdateParameters: "policy_update_parameters",
      Text: "Text"
    },
    decodeArgs: ({ args }) => {
      try {
        const args64 = args;
        const jsonArgs = JSON.parse(
          Buffer.from(args64, "base64").toString("utf-8")
        );
        return JSON.stringify(jsonArgs, undefined, 2);
      } catch {
        return "failed to deserialize";
      }
    },

    // PROPOSALS
    addProposal: ({ proposal, deposit, gas }) => {
      return DaoSDK.call({
        methodName: "add_proposal",
        args: {
          proposal: proposal
        },
        deposit,
        gas
      });
    },
    createDao: ({ daoName, args, deposit, gas }) => {
      const daoArgs = Buffer.from(JSON.stringify(args), "utf-8").toString(
        "base64"
      );
      return Near.call([
        {
          contractName: "sputnik-dao.near",
          methodName: "create",
          args: {
            name: daoName,
            args: daoArgs
          },
          deposit,
          gas
        }
      ]);
    },

    // SPECIFIC PROPOSALS
    createAddMemberProposal: ({
      description,
      memberId,
      roleId,
      gas,
      deposit
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            AddMemberToRole: {
              member_id: memberId,
              role: roleId
            }
          }
        },
        deposit,
        gas
      });
    },
    createRemoveMemberProposal: ({
      description,
      memberId,
      roleId,
      gas,
      deposit
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            RemoveMemberFromRole: {
              member_id: memberId,
              role: roleId
            }
          }
        },
        deposit,
        gas
      });
    },
    createPollProposal: ({ description, gas, deposit }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: "Vote"
        },
        deposit,
        gas
      });
    },
    createTransferProposal: ({
      description,
      tokenId,
      receiverId,
      amount,
      gas,
      deposit
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            Transfer: {
              token_id: tokenId,
              receiver_id: receiverId,
              amount
            }
          }
        },
        deposit,
        gas
      });
    },
    createBountyProposal: ({ description, bounty, gas, deposit }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            AddBounty: {
              bounty
            }
          }
        },
        deposit,
        gas
      });
    },
    createSubmitBountyProposal: ({
      description,
      bounty,
      receiverId,
      gas,
      deposit
    }) => {
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            BountyDone: {
              receiver_id: receiverId,
              bounty_id: JSON.parse(bounty.id)
            }
          }
        },
        deposit,
        gas
      });
    },
    createFunctionCallProposal: ({
      description,
      methodName,
      receiverId,
      args,
      proposalGas,
      proposalDeposit,
      gas,
      deposit
    }) => {
      const proposal_args = Buffer.from(JSON.stringify(args), "utf-8").toString(
        "base64"
      );
      return DaoSDK.addProposal({
        proposal: {
          description: description,
          kind: {
            FunctionCall: {
              receiver_id: receiverId,
              actions: [
                {
                  method_name: methodName,
                  args: proposal_args,
                  deposit: proposalDeposit,
                  gas: proposalGas
                }
              ]
            }
          }
        },
        deposit,
        gas
      });
    },

    // VOTE
    actProposal: ({ proposalId, action, deposit, gas }) => {
      return DaoSDK.call({
        methodName: "act_proposal",
        args: {
          id: proposalId,
          action
        },
        deposit,
        gas
      });
    },

    // SPECIFIC VOTE TXN
    approveProposal: ({ proposalId, deposit, gas }) => {
      return DaoSDK.actProposal({
        proposalId,
        action: DaoSDK.voteActions.VoteApprove,
        deposit,
        gas
      });
    },
    rejectProposal: ({ proposalId, deposit, gas }) => {
      return DaoSDK.actProposal({
        proposalId,
        action: DaoSDK.voteActions.VoteReject,
        deposit,
        gas
      });
    },
    removeProposal: ({ proposalId, deposit, gas }) => {
      return DaoSDK.actProposal({
        id: proposalId,
        action: DaoSDK.voteActions.VoteRemove,
        deposit,
        gas
      });
    },

    // BOUNTIES
    claimBounty: ({ description, bounty, gas, deposit }) => {
      return DaoSDK.call({
        methodName: "bounty_claim",
        args: {
          id: JSON.parse(bounty.id),
          deadline: bounty.max_deadline
        },
        deposit,
        gas
      });
    },
    unclaimBounty: ({ description, bounty, gas, deposit }) => {
      return DaoSDK.call({
        methodName: "bounty_giveup",
        args: {
          id: JSON.parse(bounty.id)
        },
        deposit,
        gas
      });
    }
  };
  return DaoSDK;
};
