interface LanguageTranslations {
  [key: string]: string | string[];
}

interface Translations {
  [key: string]: LanguageTranslations;
}

const translations: Translations = {
    en: {
      Login: "Login",
      CreateAccount: "Create Account",
      LoginMessage: "Please log in to see the forecast.",
      Password: "Password",
      Email: "Email",
      cityNames: ['London', 'Toronto', 'Singapore'],
      Message: 'Message',
      Submit: 'Submit',
      InvalidEmail: 'The email is not correct.',
      MessageSubmited: 'Message successfully submited.',
      InvalidUserPass: 'Invalid user or password.',
      UnknownError: 'Unknown error.',
      EmailInUse: 'Email already in use.',
      WeakPassword: 'Weak password (6 characters min).',
      WrongPassword: 'Wrong password.'
    },
    es: {
      Login: "Iniciar sessión",
      CreateAccount: "Crear cuenta",
      LoginMessage: "Inicia sessión para ver las previsiones.",
      Password: "Contraseña",
      Email: "Correo electrónico",
      cityNames: ['Londres', 'Toronto', 'Singapur'],
      Message: 'Mensaje',
      Submit: 'Enviar',
      InvalidEmail: 'El email introducido no es correcto.',
      MessageSubmited: 'Mensaje enviado correctamente.',
      InvalidUserPass: 'Usuario o contraseña incorrectos.',
      UnknownError: 'Error desconocido.',
      EmailInUse: 'El email introducido ya está en uso.',
      WeakPassword: 'Contraseña demasiado corta (6 caracters mín.)',
      WrongPassword: 'Contraseña incorrecta.'
    }
};

export default translations;