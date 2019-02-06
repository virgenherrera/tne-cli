import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import { randomBytes } from 'crypto';

export function obfuscatePassword(rawPass: string, rounds: number = 7): string {
	const salt = genSaltSync(rounds);
	return hashSync(rawPass, salt);
}

export function validatePassword(rawPass: string, hashPass: string): boolean {
	return compareSync(rawPass, hashPass);
}

export function generateHash(str): string {
	const size = (isNaN(str)) ? 20 : parseInt(str, 10);
	const buffer = randomBytes(size);

	return buffer.toString('hex');
}
