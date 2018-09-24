export interface HearMap {
    keyword: string;
}

export interface Message {
    context: string;
    once: boolean;
}

export interface Events {
    message: Message;
}

export interface Events2 {
}

export interface Handle {
    reading: boolean;
    owner: string;
    onread?: any;
    writeQueueSize: number;
}

export interface Server {
    domain?: any;
    _events: Events2;
    _eventsCount: number;
    _connections: number;
    _handle: Handle;
    _usingSlaves: boolean;
    _slaves: any[];
    _unref: boolean;
    allowHalfOpen: boolean;
    pauseOnConnect: boolean;
    httpAllowHalfOpen: boolean;
    timeout: number;
    _pendingResponseData: number;
    _connectionKey: string;
}

export interface Bot {
    accessToken: string;
    verifyToken: string;
    appSecret: string;
    broadcastEchoes: boolean;
    webhook: string;
    _hearMap: HearMap[];
    _conversations: any[];
    _events: Events;
    server: Server;
}

export interface Chat {
    bot: Bot;
    userId: string;
    say: any;
}
