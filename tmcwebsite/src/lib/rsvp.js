import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase.js'

const RSVP_COLLECTION = 'rsvp_tmc_2026'

export async function submitRSVP(values) {
  await addDoc(collection(db, RSVP_COLLECTION), {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    region: values.region,
    otherRegion: values.region === 'Other' ? values.otherRegion.trim() : '',
    edition: values.edition ?? 'classic',
    createdAt: serverTimestamp(),
  })
}
