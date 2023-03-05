import { genericErrors } from "../logs.types";

export const extractError = (e: genericErrors): string => {

    return JSON.stringify(e);
}
