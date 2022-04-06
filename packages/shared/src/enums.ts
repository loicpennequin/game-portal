import { Values } from './types';

export const userRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};
export type UserRole = Values<typeof userRoles>;

export const friendRequestStatuses = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REFUSED: 'refused'
};
export type FriendRequestStatus = Values<typeof friendRequestStatuses>;

export const gameStatuses = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REFUSED: 'refused'
};
export type GameStatus = Values<typeof gameStatuses>;

export const sortDirections = {
  ASC: 'ASC',
  DESC: 'DESC'
};
export type SortDirection = Values<typeof sortDirections>;
