import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

// Get the encryption key from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-secret-key-for-encryption';

// Encrypt message content
export const encryptMessage = (text) => {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

// Decrypt message content
export const decryptMessage = (encryptedText) => {
  if (!encryptedText) return '';
  const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}; 