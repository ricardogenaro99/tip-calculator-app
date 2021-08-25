const inputBill = document.getElementById('bill');
const inputProcentaje = document.getElementById('input-porcentaje');
const inputPeople = document.getElementById('number-people');
const resultTip = document.getElementById('result-tip-amount');
const resultTotal = document.getElementById('result-total');
const submitsProcentaje = document.getElementsByClassName('input-porcentaje-submit');
const alert_num_people = document.getElementById('alert-number-people');
const btnReset = document.getElementById('btn-reset');

//Ingresar un valor Bill
inputBill.addEventListener('input', () => {
    calcular(inputProcentaje.value / 100);
});

//Seleccionar un tip submit
for (i = 0; i < submitsProcentaje.length; i++) {
    submitsProcentaje[i].addEventListener('click', (e) => {
        removeTipSelect();
        inputProcentaje.value = null;
        e.target.classList.add('tip-select');

        let tipString = e.target.value.replace('%', '')
        let tipNumber = parseInt(tipString)

        calcular(tipNumber / 100);
    });
}

//Ingresar un valor al input tip
inputProcentaje.addEventListener('input', () => {
    removeTipSelect();
    calcular(inputProcentaje.value / 100);
})

//Validar numero de personas - generar alerta
inputPeople.addEventListener('input', () => {
    calcular(inputProcentaje.value / 100);
});

//Boton RESET
btnReset.addEventListener('click', () => {
    reset()
})


//Funciones
function calcular(tipChoose) {
    if (isValido()) {
        let bill = inputBill.value
        let people = inputPeople.value
        let tip = tipChoose;
        resultTip.innerHTML = tipAmount(bill, tip, people);
        resultTotal.innerHTML = total(bill, tip, people);
    } else {
        resetResult();
    }
}

function isValido() {
    if (inputPeople.value == 0) {
        alertZero('Can´t be zero', '1px inset red');
        return false;
    } else {
        alertZero('', 'none');
        return true
    }
}

function alertZero(message, border) {
    alert_num_people.innerText = `${message}`;
    inputPeople.style = `border: ${border}`
}

function removeTipSelect() {
    for (j = 0; j < submitsProcentaje.length; j++) {
        submitsProcentaje[j].classList.remove('tip-select');
    }
}

function tipAmount(bill, tip, people) {    // bill * tip% /people
    let total = bill * tip / people;
    total = redondear(total, 2);
    return '$' + total;
}

function total(bill, tip, people) {    // bill* (100% + tip%) / people
    let total = bill * (1 + tip) / people;
    total = total.toFixed(2);
    return '$' + total;
}

function redondear(num, dec) {
    let exp = Math.pow(10, dec);
    return parseInt(num * exp, 10) / exp;
}

function resetResult() {
    resultTip.innerHTML = '$0.00';
    resultTotal.innerHTML = '$0.00';
}

function reset() {
    inputBill.value = null;
    inputProcentaje.value = null;
    inputPeople.value = null
    removeTipSelect();
    alertZero('', 'none');
    resetResult();
}