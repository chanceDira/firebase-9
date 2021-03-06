import { initializeApp } from 'firebase/app'
import { 
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'

console.log("Firebase Initialization")

const firebaseConfig = {
    apiKey: "AIzaSyAHQ6L0iWS8ZlJmRrB6goF52sldmUoMmQs",
    authDomain: "fir-9-rw.firebaseapp.com",
    projectId: "fir-9-rw",
    storageBucket: "fir-9-rw.appspot.com",
    messagingSenderId: "209862182115",
    appId: "1:209862182115:web:7252894914f7ed43b231d6"
  };

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })

})

// delete documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
  
})