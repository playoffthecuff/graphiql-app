export const handlePasswordCheck = (lang: string, password: string): string | null => {
  if (password.length < 8) {
    if (lang === 'en') return 'Password must be at least 8 characters long.';
    if (lang === 'es') return 'La contraseña debe tener al menos 8 caracteres.';
  }

  const hasUpperCase = /[\p{Lu}]/u.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[\p{S}\p{P}]/u.test(password);

  if (!hasUpperCase) {
    if (lang === 'en') return 'Password must contain at least one uppercase letter (unicode is supported).';
    if (lang === 'es') return 'La contraseña debe contener al menos una letra mayúscula (se admite unicode).';
  }

  if (!hasNumber) {
    if (lang === 'en') return 'Password must contain at least one number (unicode is supported).';
    if (lang === 'es') return 'La contraseña debe contener al menos un número (se admite unicode).';
  }

  if (!hasSpecialChar) {
    if (lang === 'en') return 'Password must contain at least one special character (unicode is supported).';
    if (lang === 'es') return 'La contraseña debe contener al menos un carácter especial (se admite unicode).';
  }

  return null;
};
