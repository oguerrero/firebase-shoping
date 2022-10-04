// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, getToken } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKJ06DIjZjoJ2e477kjLV8EeDOUWgA6zc',
  authDomain: 'fir-shopping-67a92.firebaseapp.com',
  projectId: 'fir-shopping-67a92',
  storageBucket: 'fir-shopping-67a92.appspot.com',
  messagingSenderId: '57630007493',
  appId: '1:57630007493:web:aa59e5ee1eca537f3f50ac'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// VAPID KEY
const vapidKey =
  'BMWyBj3b9fBYzuRKpPOmVFtIH0q1WWIz0pHbQbHY_XtdjTJapn4I_rIfJ0FCyCPHreagiNoYPJCYO0JuibbavaE'

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
export const messaging = getMessaging()
getToken(messaging, { vapidKey })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      // console.log(currentToken)
      sendToken(currentToken)
      // e52eOHNq7LDmCidzVFHIzv:APA91bGAoUDE26lug3m27MM3ywNUDtT57lDS2RVMpXiCmw6pJ0CL1McHNXobnyO0wh02TQ8a2QwyN6wJMm2k69_uecR_4dsPkuojgRUKCkM9aoBxII8eQ9pv_f4eIGqOlnGAs49T4giI
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.'
      )
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
    // ...
  })

// Send token to Server
const sendToken = (token) => {
  if (localStorage.getItem('fcm-token')) return
  // TODO: Server side save client fcm-token
  localStorage.setItem('fcm-token', '1')
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
