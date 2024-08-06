document.addEventListener('DOMContentLoaded', function() {
    const monthsBR = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const tableDays = document.getElementById('dias');
    const mensagemSelecao = document.getElementById('mensagemSelecao');
    const mensagemTexto = document.getElementById('mensagemTexto');
    let primeiraSelecao = null;
    let segundaSelecao = null;
    let checkin = null;
    let checkout = null;
    
    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthsBR[mes];
        document.getElementById('ano').innerHTML = ano;

        const firstDayOfWeek = new Date(ano, mes, 1).getDay();
        const getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();
        tableDays.innerHTML = '';

        let row = document.createElement('tr');
        tableDays.appendChild(row);

        for (let i = firstDayOfWeek; i > 0; i--) {
            const cell = document.createElement('td');
            cell.classList.add('mes_anterior');
            cell.textContent = new Date(ano, mes, -i + 1).getDate();
            cell.setAttribute('data-mes', mes - 1);
            row.appendChild(cell);
        }

        for (let i = 1; i <= getLastDayThisMonth; i++) {
            if (row.children.length === 7) {
                row = document.createElement('tr');
                tableDays.appendChild(row);
            }
            const cell = document.createElement('td');
            cell.textContent = i;
            cell.setAttribute('data-mes', mes);
            cell.setAttribute('data-ano', ano);
            row.appendChild(cell);

            const dt = new Date(ano, mes, i);
            const dtNow = new Date();

            if (dt.getFullYear() === dtNow.getFullYear() && dt.getMonth() === dtNow.getMonth() && dt.getDate() === dtNow.getDate()) {
                cell.classList.add('dia_atual');
            }

            cell.addEventListener('click', function() {
                if (!primeiraSelecao) {
                    primeiraSelecao = { cell, mes, ano };
                    cell.classList.add('selecionado');
                } else if (!segundaSelecao && cell !== primeiraSelecao.cell) {
                    segundaSelecao = { cell, mes, ano };
                    cell.classList.add('selecionado');
                    destacarIntervalo(); // Destacar os dias entre as seleções
                } else {
                    limparSelecao();
                    primeiraSelecao = { cell, mes, ano };
                    cell.classList.add('selecionado');
                }
            });
        }

        const daysToShow = 42 - tableDays.querySelectorAll('td').length;
        for (let i = 1; i <= daysToShow; i++) {
            if (row.children.length === 7) {
                row = document.createElement('tr');
                tableDays.appendChild(row);
            }
            const cell = document.createElement('td');
            cell.classList.add('proximo_mes');
            cell.setAttribute('data-mes', mes + 1);
            cell.textContent = i;
            row.appendChild(cell);
        }
    }

    function destacarIntervalo() {
        let inicioDia = parseInt(primeiraSelecao.cell.textContent);
        let fimDia = parseInt(segundaSelecao.cell.textContent);
        let inicioMes = primeiraSelecao.mes;
        let fimMes = segundaSelecao.mes;
        let inicioAno = primeiraSelecao.ano;
        let fimAno = segundaSelecao.ano;

        // Corrigir a ordem se necessário
        if (inicioMes > fimMes || (inicioMes === fimMes && inicioDia > fimDia)) {
            [inicioDia, fimDia] = [fimDia, inicioDia];
            [inicioMes, fimMes] = [fimMes, inicioMes];
            [inicioAno, fimAno] = [fimAno, inicioAno];
        }

        // Limpar a seleção anterior
        limparSelecao();

        let currentMes = inicioMes;
        let currentAno = inicioAno;

        while (currentAno < fimAno || (currentAno === fimAno && currentMes <= fimMes)) {
            const cells = tableDays.querySelectorAll(`td[data-mes="${currentMes}"][data-ano="${currentAno}"]`);
            cells.forEach(cell => {
                const dia = parseInt(cell.textContent);
                if ((currentMes === inicioMes && dia >= inicioDia) || 
                    (currentMes === fimMes && dia <= fimDia) || 
                    (currentMes > inicioMes && currentMes < fimMes)) {
                    cell.classList.add('selecionado');
                }
            });

            if (currentMes === 11) {
                currentMes = 0;
                currentAno++;
            } else {
                currentMes++;
            }
        }

        checkin = new Date(inicioAno, inicioMes, inicioDia);
        checkout = new Date(fimAno, fimMes, fimDia);

        mensagemTexto.innerHTML = `Check-in: ${checkin.getDate()} de ${monthsBR[checkin.getMonth()]} de ${checkin.getFullYear()}<br>Check-out: ${checkout.getDate()} de ${monthsBR[checkout.getMonth()]} de ${checkout.getFullYear()}`;
        mensagemTexto.style.color = 'white';
        mensagemSelecao.style.display = 'block';
    }

    function limparSelecao() {
        const cells = tableDays.querySelectorAll('td.selecionado');
        cells.forEach(cell => cell.classList.remove('selecionado'));
        primeiraSelecao = null;
        segundaSelecao = null;
    }

    const now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDaysCalendar(mes, ano);

    const botao_proximo = document.getElementById('bnt_pro');
    const botao_anterior = document.getElementById('bnt_ant');

    botao_proximo.onclick = function() {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        GetDaysCalendar(mes, ano);
    };

    botao_anterior.onclick = function() {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        GetDaysCalendar(mes, ano);
    };

    document.getElementById('reserveButton').addEventListener('click', function() {
        document.getElementById('reservationModal').style.display = 'block';
    });

    document.getElementById('confirmButton').addEventListener('click', function() {
        if (checkin && checkout) {
            alert(`Check-in: ${checkin.getDate()} de ${monthsBR[checkin.getMonth()]} de ${checkin.getFullYear()}\nCheck-out: ${checkout.getDate()} de ${monthsBR[checkout.getMonth()]} de ${checkout.getFullYear()}`);
        } else {
            alert('Por favor, selecione as datas de check-in e check-out.');
        }
    });
});