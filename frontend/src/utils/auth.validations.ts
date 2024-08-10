export function validateEmail(email: string): string | null {
  if (!email.includes('@')) {
    return 'Email deve conter "@"';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Senha deve conter pelo menos 8 caracteres.';
  }
  return null;
}