
import { useState, useMemo, useRef } from 'react'
import './App.css'

// Set di caratteri validi per la validazione di username e password
const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\\\`~`;


function App() {

  /**********
      HOOK
  ***********/
  // Campi controllati
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    descrizioneSviluppatore: ""
  });

  // Campi non controllati
  const fullNameRef = useRef();
  const specializzazioneRef = useRef();
  const anniEsperienzaRef = useRef();

  /*****************
      VALIDAZIONI
  ******************/

  // Validazione username
  const isUsernameValid = useMemo(() => {

    const username = formData.username.toLowerCase();
    let isValid = true;

    // Controllo lunghezza
    if (username.length < 6) {
      isValid = false;
    } else {

      // Controllo caratteri
      const usernameArray = username.split("");
      isValid = usernameArray.every((carattere) => (
        letters.includes(carattere) || numbers.includes(carattere)
      ));
    }

    return isValid;

  }, [formData.username]);

  // Validazione password
  const isPasswordValid = useMemo( () => {
    const password = formData.password.toLowerCase();
    let isValid = true;

    // Controllo lunghezza
    if(password.length <8 ){
      isValid = false;
    }
    else {
      // Controllo caratteri
      const passwordArray = password.split("");

      // Controllo se ha almeno una lettera
      const hasLetters = passwordArray.some( (carattere) => (letters.includes(carattere)))

      // Controllo se ha almeno un numero
      const hasNumbers = passwordArray.some((carattere) => (numbers.includes(carattere)))

      // Controllo se ha almeno un simbolo
      const hasSymbols = passwordArray.some((carattere) => (symbols.includes(carattere)))

      isValid = hasLetters && hasNumbers && hasSymbols;
    }

    return isValid;

  }, [formData.password])

  // Validazione descrizione
  const isDescriptionValid = useMemo( () => {
    const description = formData.descrizioneSviluppatore.trim();
    let isValid = true;

    if ( !(description.length >= 100 && description.length <= 1000))
      isValid = false;

    return isValid;

  }, [formData.descrizioneSviluppatore]);


  /************
      RENDER
  ************/
  return (

    <div className="app-container">

      {/* Titolo */}
      <h1>  Web Developer Signup </h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Nome completo */}
        <div className="form-group">
          <label htmlFor="fullName">Nome completo</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            ref={fullNameRef}
          />
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFormData}
          />

          {/* Validazione */}
          {
            formData.username && (
              <p className={isUsernameValid ? "success" : "error"}> 
              { isUsernameValid  
                ? "Username valido!" 
                : "Deve contenere almeno 6 caratteri alfanumerici!"} 
            </p>
            )
          }
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
          />

          {/* Validazione */}
          {
            formData.password && (
              <p className={isPasswordValid ? "success" : "error"}>
                {isPasswordValid
                  ? "Password valida!"
                  : "Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo!"}
              </p>
            )
          }
        </div>

        {/* Specializzazione */}
        <div className="form-group">
          <label htmlFor="specializzazione">Specializzazione</label>
          <select
            id="specializzazione"
            name="specializzazione"
            ref={specializzazioneRef}
          >
            <option value="">Seleziona specializzazione</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>

        {/* Anni di esperienza */}
        <div className="form-group">
          <label htmlFor="anniEsperienza">Anni di esperienza</label>
          <input
            id="anniEsperienza"
            type="number"
            name="anniEsperienza"
            ref={anniEsperienzaRef}
            min="1"
          />
        </div>

        {/* Descrizione */}
        <div className="form-group">
          <label htmlFor="descrizioneSviluppatore">
            Breve descrizione
          </label>
          <textarea
            id="descrizioneSviluppatore"
            name="descrizioneSviluppatore"
            value={formData.descrizioneSviluppatore}
            onChange={handleFormData}
          />

          {/* Validazione */}
          {
            formData.descrizioneSviluppatore && (
              <p className={isDescriptionValid ? "success" : "error"}>
                {isDescriptionValid
                  ? "Descrizione valida!"
                  : `Deve contenere tra 100 e 1000 caratteri! (${formData.descrizioneSviluppatore.trim().length}/1000)`}
              </p>
            )
          }
        </div>

        <button type="submit">Registrati</button>

      </form>
    </div>
  )

  /**************
      FUNZIONI
  ***************/

  // Funzione che gestisce il submit del form
  function handleSubmit(event) {
    event.preventDefault();

    // Recupero valori input
    const fullName = fullNameRef.current.value;
    const specializzazione = specializzazioneRef.current.value;
    const anniEsperienza = anniEsperienzaRef.current.value;
    const { username, password, descrizioneSviluppatore } = formData;

    // Controllo campi vuoti
    if ( !fullName.trim() || !username || !password || !specializzazione || !anniEsperienza || !descrizioneSviluppatore.trim()) {
      alert("Tutti i campi sono obbligatori");
      return;
    }

    // Controllo numero positivo
    if (Number(anniEsperienza) <= 0) {
      alert("Gli anni di esperienza devono essere un numero positivo");
      return;
    }

    // Controllo validazioni
    if (!isUsernameValid || !isPasswordValid || !isDescriptionValid) {
      alert("Alcuni campi non sono validi!");
      return;
    }

    console.log({ fullName, username, password, specializzazione, anniEsperienza, descrizioneSviluppatore});

  }

  // Funzione che gestisce gli eventi onChange del form
  function handleFormData(e) {
    setFormData ({
      ...formData, 
      [e.target.name]: e.target.value
    })
  }
}

export default App
