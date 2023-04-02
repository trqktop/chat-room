function getActions() {
  let actions = [
    {
      reducerAction: "chat/getUsers",
      socketAction: "GET_USERS",
    },
    {
      reducerAction: "chat/updateMessages",
      socketAction: "REQUEST_MESSAGES",
    },
    {
      reducerAction: "chat/getMessage",
      socketAction: "GET_MESSAGES",
    },
    // {
    //   reducerAction: "chat/sendMessage",
    //   socketAction: "GET_MESSAGES",
    // },
  ];
  let emitsActions: any = {
    "chat/sendMessage": "SEND_MESSAGE",
    "chat/sendName": "JOIN_CHAT",
  };

  return {
    emitsActions,
    actions,
  };
}

export { getActions };
