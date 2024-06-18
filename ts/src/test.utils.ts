import * as crypto from 'crypto';

// Function to encrypt a string
function encrypt(text: string, key: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt a string
function decrypt(encryptedText: string, key: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const originalText = 'Hello, world!';
const encryptionKey = 'YourEncryptionKey';

const encryptedText = encrypt(originalText, encryptionKey);
console.log('Encrypted:', encryptedText);

const decryptedText = decrypt(encryptedText, encryptionKey);
console.log('Decrypted:', decryptedText);
