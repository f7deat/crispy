interface AccountModel {
    id: string,
    name: string,
    dateOfBirth: Date,
    phoneNumber: string,
    phoneNumberConfirmed: boolean,
    email: string,
    emailConfirmed: boolean
}

export type { AccountModel };