export interface Sender {
    id: string;
}

export interface Recipient {
    id: string;
}

export interface Message {
    mid: string;
    seq: number;
    text: string;
}

export interface Payload {
    sender: Sender;
    recipient: Recipient;
    timestamp: number;
    message: Message;
}