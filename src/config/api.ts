import {CreateMessageApiResponse, OneMessageFromDB} from "types";


export const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3001'

export const MSG = {
    sender: '',
    body: '',
    toBeDeletedAfter24h: false
}
export const APIRES: CreateMessageApiResponse = {
    isSucces: false,
    secretKey: '',
    sender: '',
    errMsg: ''
}
export const MAX_SENDER_LENGTH: number = 30
export const MAX_MESSAGE_LENGTH: number = 500
export const ONE_MINUTE: number = 60

export const CREDENTIALS = {
    sender: '',
    secretKey: ''
}
export const SECRET_MESSAGE: OneMessageFromDB ={
    sender: '',
    secretKey: '',
    body: '',
    createdAt: ''
}