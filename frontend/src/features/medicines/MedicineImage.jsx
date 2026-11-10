function MedicineImage({ medicine, className = '' }) {
  if (medicine.image) {
    return <img src={medicine.image} alt={medicine.name} className={`object-cover ${className}`} />
  }

  return (
    <div className={`grid place-items-center bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100 text-sky-700 ${className}`} aria-label={`Illustration de ${medicine.name}`}>
      <span className="grid size-[46%] place-items-center rounded-2xl bg-white/75 text-[clamp(1rem,3vw,2rem)] font-bold shadow-sm ring-1 ring-sky-100">✚</span>
    </div>
  )
}

export default MedicineImage
