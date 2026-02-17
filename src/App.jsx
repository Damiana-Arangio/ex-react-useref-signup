
import { useState } from 'react'
import './App.css'

function App() {

  /**********
      HOOK
  ***********/
  // Stato che rappresenta i dati controllati del form
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: "",
    descrizioneSviluppatore: ""
  });


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
            value={formData.fullName}
            onChange={handleFormData}
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
        </div>

        {/* Specializzazione */}
        <div className="form-group">
          <label htmlFor="specializzazione">Specializzazione</label>
          <select
            id="specializzazione"
            name="specializzazione"
            value={formData.specializzazione}
            onChange={handleFormData}
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
            value={formData.anniEsperienza}
            onChange={handleFormData}
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

    const { fullName, username, password, specializzazione, anniEsperienza, descrizioneSviluppatore } = formData;

    // Controllo campi vuoti
    if (
      !fullName || !username || !password || !specializzazione || !anniEsperienza || !descrizioneSviluppatore
    ) {
      alert("Tutti i campi sono obbligatori");
      return;
    }

    // Controllo numero positivo
    if (Number(anniEsperienza) <= 0) {
      alert("Gli anni di esperienza devono essere un numero positivo");
      return;
    }

    console.log(formData);
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
