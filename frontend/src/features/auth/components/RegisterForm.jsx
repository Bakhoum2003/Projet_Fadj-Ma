import { useState } from 'react'
import InputField from './InputField.jsx'
import { registerUser } from '../../../services/authService.js'
import { useToast } from '../../../components/ui/useToast.js'

const days = Array.from({ length: 31 }, (_, index) => index + 1)
const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]
const years = Array.from({ length: 107 }, (_, index) => 2026 - index)

function RegisterForm() {
  const [form, setForm] = useState({ gender: '', firstName: '', lastName: '', day: '', month: '', year: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const showToast = useToast()

  const update = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }))

  async function handleSubmit(event) {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      showToast('Les mots de passe ne correspondent pas.', 'warning')
      return
    }
    if (!form.gender || !form.day || !form.month || !form.year) {
      showToast('Veuillez renseigner toutes vos coordonnées et votre date de naissance.', 'warning')
      return
    }

    setLoading(true)
    try {
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        birthDate: `${form.year}-${String(form.month).padStart(2, '0')}-${String(form.day).padStart(2, '0')}`,
        email: form.email,
        password: form.password,
      })
      showToast('Inscription réussie. Vous pouvez maintenant vous connecter.', 'success')
    } catch (requestError) {
      showToast(requestError.message || "L'inscription a échoué.", 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-700">Vos coordonnées</legend>
        <div className="flex gap-3">
          {['Homme', 'Femme'].map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50 has-[:checked]:text-sky-800">
              <input className="size-4 accent-sky-600" type="radio" name="gender" value={option === 'Homme' ? 'male' : 'female'} checked={form.gender === (option === 'Homme' ? 'male' : 'female')} onChange={update('gender')} disabled={loading} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label="Prénom" id="first-name" placeholder="Votre prénom" autoComplete="given-name" value={form.firstName} onChange={update('firstName')} disabled={loading} />
        <InputField label="Nom" id="last-name" placeholder="Votre nom" autoComplete="family-name" value={form.lastName} onChange={update('lastName')} disabled={loading} />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-700">Date de naissance</legend>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <label className="sr-only" htmlFor="birth-day">Jour</label>
          <select id="birth-day" name="birth-day" value={form.day} onChange={update('day')} disabled={loading} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
            <option value="" disabled>JJ</option>
            {days.map((day) => <option key={day} value={day}>{String(day).padStart(2, '0')}</option>)}
          </select>

          <label className="sr-only" htmlFor="birth-month">Mois</label>
          <select id="birth-month" name="birth-month" value={form.month} onChange={update('month')} disabled={loading} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
            <option value="" disabled>MM</option>
            {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
          </select>

          <label className="sr-only" htmlFor="birth-year">Année</label>
          <select id="birth-year" name="birth-year" value={form.year} onChange={update('year')} disabled={loading} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
            <option value="" disabled>AAAA</option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label="Adresse e-mail" id="register-email" type="email" placeholder="vous@pharmacie.com" autoComplete="email" value={form.email} onChange={update('email')} disabled={loading} />
        <InputField label="Mot de passe" id="register-password" type="password" placeholder="••••••••" autoComplete="new-password" value={form.password} onChange={update('password')} disabled={loading} />
      </div>
      <InputField label="Confirmer le mot de passe" id="confirm-password" type="password" placeholder="••••••••" autoComplete="new-password" value={form.confirmPassword} onChange={update('confirmPassword')} disabled={loading} />
      <button disabled={loading} className="h-12 w-full rounded-xl bg-[#0b83a8] px-4 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#086e91] hover:shadow-sky-600/30 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
        {loading ? 'Inscription…' : 'S’inscrire'}
      </button>
    </form>
  )
}

export default RegisterForm
