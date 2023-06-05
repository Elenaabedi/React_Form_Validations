//import React from "react";
import { useEffect, useState } from "react";
// Importem les funcions de validació
import {
  isAlphabet,
  isAlphanumeric,
  isNumeric,
  madeSelection,
  madeSelectionRadioB,
  lengthRestriction,
  emailValidator,
  checkValidator,
} from "./validaciones";

// Afegim el nostre objecte configurador 
var obj = {
  firstname: {
    errorMessage: "Please enter only letters for your name",
    function: isAlphabet,
  },
  sex: {
    errorMessage: "Please select your Sex",
    function: madeSelectionRadioB,
  },
  addr: {
    errorMessage: "Numbers and Letters Only for Address",
    function: isAlphanumeric,
  },
  zip: { errorMessage: "Please enter a valid zip code", function: isNumeric },
  state: {
    errorMessage: "Please select your state",
    function: madeSelection,
  },
  username: {
    errorMessage: "Please enter a username. length 6 - 8.",
    function: lengthRestriction,
    params: [6, 8],
  },
  email: {
    errorMessage: "Please enter a correct e-mail",
    function: emailValidator,
  },
  conditions: {
    errorMessage: "Please check conditions",
    function: checkValidator,
  },
};

export function MyForm() {
  const [values, setValues] = useState({
    firstname: "",
    sex: "",
    addr: "",
    zip: "",
    state: "",
    username: "",
    email: "",
    conditions: false,
  });

  const [validations, setValidations] = useState({
    firstname: "",
    sex: "",
    addr: "",
    zip: "",
    state: "",
    username: "",
    email: "",
    conditions: "",
  });

  let [focusTo, setFocusTo] = useState(null);

  useEffect(() => {
    // S'executa després de renderitzar
    // Update the document title using the browser API
    if (focusTo) {
      focusTo.focus();
      setFocusTo(null);
    }
  });

  const validateAll = (form) => {
    const { name, sex, addr, zip, state, username, email, conditions } = values;
    const validations = {
      firstname: "",
      sex: "",
      addr: "",
      zip: "",
      state: "",
      username: "",
      email: "",
      conditions: "",
    };

    // Posarà el focus a l'element que toqui:
    focusTo = null;
    // Si aquest camp passa a ser diferent a null, executem el setValidations
    var noValid = null;

    let value = "";
    let funct = "";
    let errorM = "";

    // Recorrem el nostre objecte configurador per aplicar les funcions i els missatges d'error segons l'element a validar
    for (const elem in obj) {
      value = values[elem];
      errorM = obj[elem].errorMessage;
      funct = obj[elem].function;

      // Si la funció té parametres:
      if (obj[elem].params) {
        if (!funct(value, ...obj[elem].params)) {
          validations[elem] = errorM;
          noValid = elem;
          // Si el focusTo és true (té valor assignat) es queda com està, si no, obté el nom de l'element
          focusTo = focusTo ? focusTo : form[elem];
        }
        // Si la funció no té paràmetres:
      } else {
        if (!funct(value)) {
          validations[elem] = errorM;
          noValid = elem;
          focusTo = focusTo ? focusTo : form[elem];
        }
      }
    }
    // Si hi ha algún element erroni, executem el setValidations
    if (noValid) {
      setValidations(validations);
    }
    // Executem el set focus pel primer element que ha donat error
    setFocusTo(focusTo);

    return noValid;
  };

  const validateOne = (e) => {
    //  const  name = e.target.name
    //  const value = e.target.value
    // ES6 -> deconstrucció d'objectes

    let { name, value } = e.target;
    let message = "";
    let func = "";

    // El checkbox no te value, així que li assignem el valor del checked (true o false)
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    // mirem si existeix el name dins del nostre objecte configurador i obtenim les dades que ens interessen d'ell
    if (name in obj) {
      //Recuperem el missatge d'error per a aquest element
      //Recuperem la funció de validació per a aquest element
      func = obj[name].function;
      //Apliquem la funció de validació
      if (obj[name].params) {
        if (!func(value, ...obj[name].params)) {
          message = obj[name].errorMessage;
        }
      } else {
        if (!func(value)) {
          message = obj[name].errorMessage;
        }
      }
    }

    setValidations({ ...validations, [name]: message });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    // El checkbox no te value, així que li assignem el valor del checked (true o false)
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setValues({ ...values, [name]: value });
    validateOne(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAll(e.target);

    if (!isValid) {
      return false;
    }

    alert(JSON.stringify(values));
  };

  const { name, sex, addr, zip, state, username, email, conditions } = values;

  const {
    // El nombre del campo debe coincidir con el name del elemento, y el nombre asignado con el valor del span error
    firstname: firstnameVal,
    sex: sexVal,
    addr: addrVal,
    zip: zipVal,
    state: stateVal,
    username: usernameVal,
    email: emailVal,
    conditions: conditionsVal,
  } = validations;

  return (
    <div>
      <h1>Simple form</h1>
      <p>
        In this example, we can learn how validations work in a form with React. Obviously, the aspect in this example is not the important thing.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Firts Name:
            <input
              type="text"
              name="firstname"
              value={name}
              onChange={handleChange}
            />
          </label>
          <span className="error">{firstnameVal}</span>
        </div>
        <br></br>
        <div>
          <label>Sex: &nbsp;&nbsp;</label>
          <label>
            <input type="radio" name="sex" value="F" onChange={handleChange} />
            &nbsp;&nbsp;Woman
          </label>
          <label>
            <input type="radio" name="sex" value="M" onChange={handleChange} />
            &nbsp;&nbsp;Man
          </label>
          <label>
            <input type="radio" name="sex" value="NB" onChange={handleChange} />
            &nbsp;&nbsp;Non-binary
          </label>
          <span className="error">{sexVal}</span>
        </div>
        <br></br>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="addr"
              value={name}
              onChange={handleChange}
            />
          </label>
          <span className="error">{addrVal}</span>
        </div>
        <br></br>

        <div>
          <label>
            Zip Code:
            <input
              type="text"
              name="zip"
              value={name}
              onChange={handleChange}
            />
          </label>
          <span className="error">{zipVal}</span>
        </div>
        <br></br>

        <div>
          <label>
            State:
            <select name="state" id="state" onChange={handleChange}>
              <option value="0">Please Choose</option>
              <option value="1">AL</option>
              <option value="2">CA</option>
              <option value="3">TX</option>
              <option value="4">WI</option>
            </select>
          </label>
          <span className="error">{stateVal}</span>
        </div>
        <br></br>

        <div>
          <label>
            Username (6-8 characters):
            <input
              type="text"
              name="username"
              value={name}
              onChange={handleChange}
            />
          </label>
          <span className="error">{usernameVal}</span>
        </div>
        <br></br>

        <div>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </label>
          <span className="error">{emailVal}</span>
        </div>
        <br></br>

        <div>
          <label>
            <input
              type="checkbox"
              name="conditions"
              checked={conditions}
              value="conditions"
              onChange={handleChange}
            />
            Accept the mentioned conditions.
          </label>
          <span className="error">{conditionsVal}</span>
        </div>
        <br></br>

        <button type="submit">Send</button>
      </form>

      <div>
        <h2>Values of the form</h2>
        <p>{JSON.stringify(values)}</p>
      </div>
    </div>
  );
}
