
// FUNCIONS DE VALIDACIÓ INDIVIDUALS

// FUNCIONS DE VALIDACIÓ INDIVIDUALS

function notEmpty(val) {
  var resultat = val.length == 0;
  return resultat;
}

function isAlphabet(val) {
  var alphaExp = /^[a-zA-Z]+$/;
  var resultat = val.match(alphaExp);
  return resultat;
}

function isAlphanumeric(val) {
  var alphaExp = /^[0-9a-zA-Z ]+$/;
  var resultat = val.match(alphaExp);
  return resultat;
}

function isNumeric(val) {
  var numericExpression = /^[0-9]+$/;
  var resultat = val.match(numericExpression);
  return resultat;
}

function madeSelection(index) {
  var resultat = index != 0;
  return resultat;
}

function madeSelectionRadioB(val) {
  if(val== 'F' || val== 'M' || val== 'NB'){
    return true;
  }
  return false;
}

function lengthRestriction(val, min, max) {
  var resultat = val.length >= min && val.length <= max;
  return resultat;
}

function emailValidator(val) {
  var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  var resultat = val.match(emailExp);
  return resultat;
}

function checkValidator(val) {
  var resultat = false;
  if (val == true) {
    resultat = true;
  }
  return resultat;
}


export {notEmpty, isAlphabet, isAlphanumeric, isNumeric, madeSelection, madeSelectionRadioB, lengthRestriction, emailValidator, checkValidator}

