import { DataFormats } from "../../types/enums"

export const generateAxiosConfig = (token: string, format: DataFormats) => {
    return {
        headers :{
            Authorization: BearerAuth(token)
        }
    }
}

export const BearerAuth = (token: string) => {
    return `Bearer ${token}`
}