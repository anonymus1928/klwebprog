export const WS_CONNECT = 'WS_CONNECT'
export const WS_DISCONNECT = 'WS_DISCONNECT'

export const WS_CREATE_ROOM = 'WS_CREATE_ROOM'
export const WS_SYNC_STATE = 'WS_SYNC_STATE'
export const WS_READY = 'WS_READY'

export const wsConnect = () => ({
    type: WS_CONNECT
})

export const wsCreateRoom = message => ({
    type: WS_CREATE_ROOM,
    payload: message,
})

export const wsSyncState = mode => ({
    type: WS_SYNC_STATE,
    payload: mode,
})

export const wsReady = () => ({
    type: WS_READY,
})
