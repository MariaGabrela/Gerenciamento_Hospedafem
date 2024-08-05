document.addEventListener('DOMContentLoaded', (event) => {
    // Função para abrir o modal
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    // Função para fechar o modal
    function closeModal(modal) {
        modal.style.display = "none";
    }

    // Eventos para o modal de Login
    var loginBtn = document.getElementById("loginBtn");
    var loginModal = document.getElementById("loginModal");
    var loginCloseBtn = loginModal.getElementsByClassName("close")[0];

    loginBtn.onclick = function() {
        openModal("loginModal");
    }

    loginCloseBtn.onclick = function() {
        closeModal(loginModal);
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            closeModal(loginModal);
        }
    }

    // Eventos para o modal de Funcionário
    var funcionarioBtn = document.getElementById("funcionarioBtn");
    var funcionarioModal = document.getElementById("funcionarioModal");
    var funcionarioCloseBtn = funcionarioModal.getElementsByClassName("close")[0];

    funcionarioBtn.onclick = function() {
        openModal("funcionarioModal");
    }

    funcionarioCloseBtn.onclick = function() {
        closeModal(funcionarioModal);
    }

    window.onclick = function(event) {
        if (event.target == funcionarioModal) {
            closeModal(funcionarioModal);
        }
    }

    
    // Redirecionamento ao clicar no botão "Entrar" no modal de funcionário
    var loginButton = document.getElementById("loginButton");
    loginButton.onclick = function() {
        // Redirecionar para a página desejada
        window.location.href = "PagFuncionario.html";
    };

});