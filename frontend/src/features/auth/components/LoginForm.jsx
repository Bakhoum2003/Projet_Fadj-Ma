import { useState } from 'react'
import InputField from './InputField.jsx'
import { loginUser } from '../../../services/authService.js'
import { useToast } from '../../../components/ui/useToast.js'

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const showToast = useToast()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await loginUser(form)
      onLogin(response.user)
    } catch (requestError) {
      showToast(requestError.message || 'La connexion a échoué.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <InputField label="Adresse e-mail" id="login-email" type="email" placeholder="vous@pharmacie.com" autoComplete="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} disabled={loading} />
      <div>
        <InputField label="Mot de passe" id="login-password" type="password" placeholder="••••••••" autoComplete="current-password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} disabled={loading} />
        <a href="#mot-de-passe-oublie" className="mt-2 inline-block text-sm font-semibold text-sky-700 transition hover:text-sky-900 hover:underline">
          Mot de passe oublié ?
        </a>
      </div>
      <button disabled={loading} className="h-12 w-full rounded-xl bg-[#0b83a8] px-4 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#086e91] hover:shadow-sky-600/30 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}

export default LoginForm
