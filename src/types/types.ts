export interface Response {
    success: boolean,
    reason?: string
}

export interface OtpResponse extends Response{
    retryDelay:	number
}

export interface SignInResponse extends Response{
    user: User,
    token:	string
}

export interface SessionResponse extends Response {
    user: User
}

export interface CreateOtpDto{
    phone: string
}

export interface SignInDto {
    phone: string
    code: number
}

export interface User {
    phone: string,
    firstname: string,
    middlename: string,
    lastname: string,
    email: string,
    city: string
}

