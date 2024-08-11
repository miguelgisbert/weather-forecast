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
      cityNames: ['London', 'Toronto', 'Singapore']
    },
    es: {
      Login: "Iniciar sessión",
      CreateAccount: "Crear cuenta",
      LoginMessage: "Inicia sessión para ver las previsiones.",
      Password: "Contraseña",
      Email: "Correo electrónico",
      cityNames: ['Londres', 'Toronto', 'Singapur']
    }
};

export default translations;