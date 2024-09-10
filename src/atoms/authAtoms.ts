import { User } from '@/models/User';
import { atom } from 'jotai';

export const authAtom = atom<boolean>(false); 

export const userAtom = atom<User | null>(null);