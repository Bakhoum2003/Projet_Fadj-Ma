import InputField from './InputField.jsx'

function LoginForm({ onLogin }) {
  return (
    <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); onLogin() }}>
      <InputField label="Adresse e-mail" id="login-email" type="email" placeholder="vous@pharmacie.com" autoComplete="email" />
      <div>
        <InputField label="Mot de passe" id="login-password" type="password" placeholder="••••••••" autoComplete="current-password" />
        <a href="#mot-de-passe-oublie" className="mt-2 inline-block text-sm font-semibold text-sky-700 transition hover:text-sky-900 hover:underline">
          Mot de passe oublié ?
        </a>
      </div>
      <button className="h-12 w-full rounded-xl bg-[#0b83a8] px-4 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#086e91] hover:shadow-sky-600/30 focus:outline-none focus:ring-4 focus:ring-sky-200" type="submit">
        Se connecter
      </button>
    </form>
  )
}

export default LoginForm
