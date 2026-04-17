export const authValidation = {
  signup: {
    nameMaxLength: 100,
    emailMaxLength: 100,
    passwordMinLength: 8,
    passwordMaxLength: 100,
  },
  login: {
    emailMaxLength: 100,
  },
} as const
