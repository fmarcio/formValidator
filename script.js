//Selecionando form e inputs no DOM

const form = document.getElementById('form');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const senhaConfirmacao = document.getElementById('senha-confirmacao');

//FUNÇÕES

//Mostrar borda de erro (vermelha)
function mostrarErro(input, message) {
    //Selec o elemento pai do input (form-item) com a prop parentElement
    const formItem = input.parentElement;
    //mudar classe do pai para a classe "erro"
    formItem.className = 'form-item erro';
    //Selecionando a tag small
    const small = formItem.querySelector('small');
    small.innerText = message;
}

//Mostrar borda de sucesso (verde)
function mostrarSucesso(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item sucesso';
}

//Verificar se email é válido 
function checarEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        mostrarSucesso(input);
    }
    else {
        mostrarErro(input, 'E-mail inválido');
    }
}

//1a letra das ids dos inputs em maisc + restante minusc
function pegarLetraInput(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); 
}

//Checar required inputs
function checarRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            mostrarErro(input, `${pegarLetraInput(input)} é necessário(a)`);
        }
        else {
            mostrarSucesso(input);
        }
    });
}

//Checar length dos inputs
function checarLength(input, min, max) {
    if (input.value.length < min) {
        mostrarErro(input, 
            `${(pegarLetraInput(input))} deve ter no mínimo ${min} caracteres`
        );
    }
    else if (input.value.length > max) {
        mostrarErro(input, 
            `${(pegarLetraInput(input))} deve ter menos do que ${max} caracteres`
        );
    }
    else {
        mostrarSucesso(input);
    }
}

//Checar se senhas combinam
function senhasCombinam(input1, input2) {
    if (input1.value !== input2.value) {
        mostrarErro(input2, 'Senhas devem ser iguais');
    }
}

//EVENT LISTENER

form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Colocando inputs numa array para evitar repetição
    checarRequired([usuario, email, senha, senhaConfirmacao]);
    checarLength(usuario, 4, 12);
    checarLength(senha, 5, 15);
    checarEmail(email);
    senhasCombinam(senha, senhaConfirmacao);
});