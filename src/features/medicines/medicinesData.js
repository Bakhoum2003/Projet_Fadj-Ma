const medicalDetails = {
  description: 'Médicament destiné à accompagner la prise en charge selon les recommandations du professionnel de santé.',
  posology: 'Suivre la prescription médicale ou les indications de la notice.',
  activeIngredients: 'Voir la composition complète sur la notice du produit.',
  sideEffects: 'Des effets indésirables peuvent survenir. Demandez conseil à votre pharmacien.',
  pharmaceuticalForm: 'Comprimé',
}

export const medicines = [
  { id: 'D06ID232435454', name: 'Augmentin 625 Duo comprimé', category: 'Médecine générale', stock: 350, status: 'En stock', dosage: '625 mg', price: '4 500', ...medicalDetails },
  { id: 'D06ID232435451', name: 'Azithral 500 comprimé', category: 'Antibiotique', stock: 20, status: 'Stock faible', dosage: '500 mg', price: '3 200', ...medicalDetails },
  { id: 'D06ID232435452', name: 'Sirop Ascoril LS', category: 'Toux et rhume', stock: 0, status: 'En rupture', dosage: '100 ml', price: '2 800', ...medicalDetails, pharmaceuticalForm: 'Sirop' },
  { id: 'D06ID232435450', name: 'Azée 500 comprimé', category: 'Médecine générale', stock: 75, status: 'En stock', dosage: '500 mg', price: '2 600', ...medicalDetails },
  { id: 'D06ID232435455', name: 'Allegra 120 mg comprimé', category: 'Allergie', stock: 44, status: 'En stock', dosage: '120 mg', price: '3 900', ...medicalDetails },
  { id: 'D06ID232435456', name: 'Sirop d’Alex', category: 'Pédiatrie', stock: 65, status: 'En stock', dosage: '125 ml', price: '2 100', ...medicalDetails, pharmaceuticalForm: 'Sirop' },
  { id: 'D06ID232435457', name: 'Amoxyclav 625 comprimé', category: 'Antibiotique', stock: 8, status: 'Stock faible', dosage: '625 mg', price: '4 100', ...medicalDetails },
  { id: 'D06ID232435458', name: 'Avil 25 tablette', category: 'Allergie', stock: 270, status: 'En stock', dosage: '25 mg', price: '1 500', ...medicalDetails },
]
