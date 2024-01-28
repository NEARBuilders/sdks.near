const $ = VM.require(`sdks.near/widget/Loader`);
const { Notification } = $("@sdks/lens/queries");
const { NotificationRequests } = $("@sdks/lens/requests");

return {
  fetch: (Client, notificationRequest) => {
    return Client.graphql(Notification.NOTIFICATION_QUERY, {
      notificationRequest
    }).then((payload) => {
      return {
        notifications: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    });
  },
};
