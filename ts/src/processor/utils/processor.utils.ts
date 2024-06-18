import mongoose from 'mongoose';
import * as crypto from 'crypto';
import { IAppEnv } from '../../types/appBuilder.types';
import { TokenPeriods } from '../../types/enums';

export const generateObjectId = (): string => {
    return new mongoose.Types.ObjectId().toHexString();
}

export const encrypt = (text: string, key: string): string => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt a string
export const decrypt = (encryptedText: string, key: string): string => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const extractNumberFromArrayString = (str: string): number | null => {
    const regex = /^\[(\d+)\]$/; // Regular expression to match [number]

    const match = str.match(regex); // Check if the string matches the pattern

    if (match) {
        // If there is a match, return the captured number
        return parseInt(match[1]);
    } else {
        // If there is no match, return null
        return null;
    }
}

export const calculateExpiry = (expiry: number, period: TokenPeriods): number => {
    const now = new Date(); // Get the current date

    if(expiry === null) {
        now.setFullYear(now.getFullYear() + 100); // return time in 100 years time
        return now.getTime();
    }

    switch (period) {
        case TokenPeriods.SECONDS:
            return now.getTime() + (expiry * 1000);
        case TokenPeriods.MINUTES:
            return now.getTime() + (expiry * 60 * 1000);
        case TokenPeriods.HOURS:
            return now.getTime() + (expiry * 60 * 60 * 1000);
        case TokenPeriods.DAYS:
            return now.getTime() + (expiry * 24 * 60 * 60 * 1000);
        case TokenPeriods.WEEKS:
            return now.getTime() + (expiry * 7 * 24 * 60 * 60 * 1000);
        case TokenPeriods.MONTHS:
            now.setMonth(now.getMonth() + expiry);
            return now.getTime();
        case TokenPeriods.YEARS:
            now.setFullYear(now.getFullYear() + expiry);
            return now.getTime();
        default:
            throw new Error("Invalid token period");
    }
};

export function parameterizeResource(
    resource: string,
    key: string,
    datapoint: string | undefined
  ): string {
    return resource.replace(`:${key}`, datapoint);
  }