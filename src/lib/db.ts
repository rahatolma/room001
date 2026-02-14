import fs from 'fs/promises';
import path from 'path';
import { User } from '@/types';

// Path to the JSON file
// In a real environment, this should be outside the source code, but for this prototype:
const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

export async function getUsers(): Promise<User[]> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function saveUser(user: User): Promise<void> {
    const users = await getUsers();
    users.push(user);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

export async function updateUserInDb(updatedUser: User): Promise<void> {
    const users = await getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
        await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
    }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
    const users = await getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}
