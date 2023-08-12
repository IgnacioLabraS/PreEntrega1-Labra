
//entrada de datos
    const nombre = prompt('Cúal es tu nombre?')
    let altura = parseFloat(prompt('Ingresa tu estatura en centimetros'))
// bucle condicional para que el usuario solo ingrese números
    while(isNaN(altura)){
        altura = parseFloat(prompt('Sólo se aceptan números, porfavor intentalo nuevamente'))
    }
    let peso = parseFloat(prompt('Ingresa tu peso en kilogramos')) 
    while(isNaN(peso)){
        peso = parseFloat(prompt('Sólo se aceptan números, porfavor intentalo nuevamente'))
    }
// funcion para hacer el cálculo
    function CalcularImc(peso, altura){
    const alturaMetros= altura/100
    const valorImc = peso/(alturaMetros*alturaMetros)
    return valorImc
    }
    const valorFinal = CalcularImc(peso,altura)
    let conclusion
    if (valorFinal < 18.5) {
        conclusion = 'estás en un peso insuficiente, deberías considerar subir de peso'
    } else if (valorFinal >= 18.5 && valorFinal < 24.9){
        conclusion = 'estás en un peso saludable'
    } else if (valorFinal >= 25 && valorFinal < 29.9){
        conclusion = 'Tienes sobrepeso, deberías considerar bajar un poco de peso'
    } else if(valorFinal >= 30 ){
        conclusion = 'Tienes Obesidad, con riesgo de padecer enfermedades cardiovasculares'
    }
    else{
        alert('No pudimos sacar el cálculo, vuelve a intentarlo')
    }

//salida de información 
    const respuesta = 'hola '+nombre +' tu imc es de ' +valorFinal.toFixed(2) +' y ' +conclusion
    parseFloat(alert(respuesta))