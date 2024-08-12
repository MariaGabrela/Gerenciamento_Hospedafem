// Pega elementos do DOM
const modal = document.getElementById("paymentModal");
const closeBtn = document.querySelector(".close");
const reservarBtns = document.querySelectorAll(".reservar-btn");
const confirmBtn = document.getElementById("confirmBtn");

// Abre o modal ao clicar em "reservar"
reservarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });
});

// Fecha o modal ao clicar no "X"
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Exibe o alerta de confirmação ao clicar em "Confirmar"
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Reserva confirmada!");
    modal.style.display = "none";
});

//barra de pesquisa 
function filterQuartos() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let quartos = document.querySelectorAll('.quarto');
    let botoes = document.querySelectorAll('.reservar-btn');
    let hrLinhas = document.querySelectorAll('hr');

    quartos.forEach((quarto, index) => {
        let nomeQuarto = quarto.querySelector('h2').textContent.toLowerCase();

        if (nomeQuarto.includes(input)) {
            quarto.style.display = "block";
            botoes[index].style.display = "inline-block";
            hrLinhas[index].style.display = "block";
        } else {
            quarto.style.display = "none";
            botoes[index].style.display = "none";
            hrLinhas[index].style.display = "none";
        }
    });
}
