import InputField from './InputField.jsx'

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
  return (
    <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-700">Vos coordonnées</legend>
        <div className="flex gap-3">
          {['Homme', 'Femme'].map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50 has-[:checked]:text-sky-800">
              <input className="size-4 accent-sky-600" type="radio" name="gender" value={option.toLowerCase()} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label="Prénom" id="first-name" placeholder="Votre prénom" autoComplete="given-name" />
        <InputField label="Nom" id="last-name" placeholder="Votre nom" autoComplete="family-name" />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-700">Date de naissance</legend>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <label className="sr-only" htmlFor="birth-day">Jour</label>
          <select id="birth-day" name="birth-day" defaultValue="" className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
            <option value="" disabled>JJ</option>
            {days.map((day) => <option key={day} value={day}>{String(day).padStart(2, '0')}</option>)}
          </select>

          <label className="sr-only" htmlFor="birth-month">Mois</label>
          <select id="birth-month" name="birth-month" defaultValue="" className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
            <option value="" disabled>MM</option>
            {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
          </select>

          <label className="sr-only" htmlFor="birth-year">Année</label>
          <select id="birth-year" name="birth-year" defaultValue="" className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
            <option value="" disabled>AAAA</option>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label="Adresse e-mail" id="register-email" type="email" placeholder="vous@pharmacie.com" autoComplete="email" />
        <InputField label="Mot de passe" id="register-password" type="password" placeholder="••••••••" autoComplete="new-password" />
      </div>
      <InputField label="Confirmer le mot de passe" id="confirm-password" type="password" placeholder="••••••••" autoComplete="new-password" />
      <button className="h-12 w-full rounded-xl bg-[#0b83a8] px-4 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#086e91] hover:shadow-sky-600/30 focus:outline-none focus:ring-4 focus:ring-sky-200" type="submit">
        S’inscrire
      </button>
    </form>
  )
}

export default RegisterForm
