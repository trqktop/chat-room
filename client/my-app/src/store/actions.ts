function getActions() {
    let actions = [
        {
            reducerAction: "chat/activeUsers",
            socketAction: "GET_USERS",
        },
        {
            reducerAction: "chat/updateMessages",
            socketAction: "GET_MESSAGES",
        },
        {
            reducerAction: "chat/updateMessages",
            socketAction: "REQUEST_MESSAGES",
        },
    ];
    let emitsActions: any = {
        "chat/AddMessage": "SEND_MESSAGE",
        "chat/userName": "JOIN_CHAT",
    };

    return {
        emitsActions,
        actions,
    };
}

export { getActions };
