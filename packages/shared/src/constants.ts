export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 40;
export const PASSWORD_REGEXP = new RegExp(
  `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`
);
