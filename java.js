//puxa o html,o evento DOM.. espera todo o conteudo html aparecer, quando ele aparece o add.. é disparado para executar o codigo javascript
document.addEventListener('DOMContentLoaded', function() {
    const monthsBR = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];//armazena para usar em outras partes quando precisar
    const tableDays = document.getElementById('dias');
    const mensagemSelecao = document.getElementById('mensagemSelecao');//chamou pra manipular aq no javacsript
    const mensagemTexto = document.getElementById('mensagemTexto');
    let primeiraSelecao = null; // Variável para armazenar o primeiro dia selecionado no intervalo
    let checkin = null; // Data de check-in selecionada
    let checkout = null; // Data de check-out selecionada

    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthsBR[mes];
        document.getElementById('ano').innerHTML = ano;

        //retorna ano, mes, dia
        //getDay() retorna o dia da semana de acordo com a data colocada, metodo disponivel em new date
        var firstDayOfWeek = new Date(ano, mes, 1).getDay();
        //mes+1=mostra o proximo mes, 0 = mostra o ultimo dia do mes anterior
        //de modo geral quer representar o ultimo dia do mes anterior ao mes atual
        //getdate imprime o ultimo dia do mes 
        var getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();
        tableDays.innerHTML = ''; // Limpa os dias anteriores para ter outros do proximo mes

        var row = document.createElement('tr');//criou uma nova linha para adicionar os novos dias do mes
        tableDays.appendChild(row);//colocou a linha na tabela dias

        // Dias do mês anterior
        for (var i = firstDayOfWeek; i > 0; i--) {//enquanto i for maior qu zero continue 
            var cell = document.createElement('td');//crando nova celula
            cell.classList.add('mes_anterior');//classe mes anterior para a nova celula
            cell.textContent = new Date(ano, mes, -i + 1).getDate();//peenche as celulas do mes anterior
            //exemplo: mes de agosto começa em uma quinta,entao i=4, -4+1+-3= mostra os dias anteriores, ate domingo
            row.appendChild(cell);//coloca a nova celula
        }

        // Dias do mês atual
        for (var i = 1; i <= getLastDayThisMonth; i++) {//um ate o ultimo dia do mes
            if (row.children.length === 7) {//verifica se tem sete celulas 
                row = document.createElement('tr');//se sim,nova linha tr
                tableDays.appendChild(row);//cria na tabela da semana
            }
            var cell = document.createElement('td');//nova celula para cada dia do mes
            cell.textContent = i;//define com o numero do dia do mes
            row.appendChild(cell);//adiciona a na tabela tabledays

            let dt = new Date(ano, mes, i);//dia atual do loop
            let dtNow = new Date();//data atual do sistema

            //se o dia atual é igual a data atual do sistema adiciona a classe dia_atual a variavel cell para destacar 
            if (dt.getFullYear() === dtNow.getFullYear() && dt.getMonth() === dtNow.getMonth() && dt.getDate() === dtNow.getDate()) {
                cell.classList.add('dia_atual');
            }
        }

        cell.addEventListener('click', function() {//evento de clique para uma celula
            // Verifica se não há nenhuma primeira seleção ou se a célula clicada é a mesma que a primeira seleção
            if (!primeiraSelecao || primeiraSelecao === this) {
                primeiraSelecao = this; // Marca esta célula como a primeira seleção
                this.classList.toggle('selecionado');// Alterna a classe 'selecionado' para marcar ou desmarcar a célula clicada
                if (this.classList.contains('selecionado')) {//se celula selecionada
                    checkin = new Date(ano, mes, parseInt(this.textContent));//conversao de strint para numero selecionnado
                } else {
                    checkin = null;//se celula desmarcada ela é nula
                }
            } else {//era pra ver o inicio e o fim de um intervalo 
                let inicio = parseInt(primeiraSelecao.textContent);
                let fim = parseInt(this.textContent);
        
                if (inicio > fim) {// Verifica se o início do intervalo é maior que o fim e os troca, se necessário
                    let temp = inicio;
                    inicio = fim;
                    fim = temp;
                }
        
                let cells = tableDays.querySelectorAll('td');//seleciona todas as ceulas e armazena
                cells.forEach(cell => {//permite passar pelas celulas individualmente
                    let dia = parseInt(cell.textContent);//converte o texto contido em cada célula (<td>) do calendário para um número inteiro
                    if (dia >= inicio && dia <= fim) {//se dia for maior que inicio e menro que fim
                        cell.classList.add('selecionado');//seleciona a classe selecionado
                    } else {
                        cell.classList.remove('selecionado');
                    }
                });

                //data de chekin e chekout 
                checkin = new Date(ano, mes, inicio);
                checkout = new Date(ano, mes, fim);
                
                //exibe na tela as datas de chekin e chekout quando confirmado
                mensagemTexto.innerHTML = `Check-in: ${checkin.getDate()} de ${monthsBR[checkin.getMonth()]} de ${checkin.getFullYear()}<br>Check-out: ${checkout.getDate()} de ${monthsBR[checkout.getMonth()]} de ${checkout.getFullYear()}`;
                mensagemTexto.style.color = 'white';
                mensagemSelecao.style.display = 'block';
        
                primeiraSelecao = null;
            }
        });
           
    
        // Dias do próximo mês
        //armazena o numero de dias a mais de um calendario +42-30(dias que ja existem)=12 dias a mais para completar 42 celulas
        //conta todos os td(dias) das celeulas 
        var daysToShow = 42 - tableDays.querySelectorAll('td').length;
        //enquanto i for igual quantidade de dias ele continua o loop, para ter exatamente 42 celulas 
        for (let i = 1; i <= daysToShow; i++) {
            if(row.children.length === 7) {  //se uma linha tem 7 celulas
                row = document.createElement('tr');//crie outra linha
                tableDays.appendChild(row);//acrescenta linhas nos td
            }
            var cell = document.createElement('td');//crie uma nova celula
            cell.classList.add('proximo_mes');//adiciona à classse proximo mes
            cell.textContent = i;//conteudo da celula com valor i
            row.appendChild(cell);//adiciona linha a celula
        }
    }



    let now = new Date();//data e hora atual
    let mes = now.getMonth();//mes atual(janeiro=0)
    let ano = now.getFullYear();//ano atual
    GetDaysCalendar(mes, ano);//função para dias do calendario para mes e ano atualvar 
    funcionarioCloseBtn = reservationModal.getElementsByClassName("close")[0]; 

    const botao_proximo = document.getElementById('bnt_pro');//acessa os elementos pelo id e se chamara botao_proximo
    const botao_anterior = document.getElementById('bnt_ant');

    botao_proximo.onclick = function() {//ao clicar em botao proximo
        mes++;//incrementa mais um mes
        if (mes > 11) {//se mes for maior que 11 
            mes = 0;//mes = janeiro
            ano++;//incrementa um ano
        }
        GetDaysCalendar(mes, ano);//atualiza com o novo mes e ano 
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
    
    document.getElementById('closeButton').addEventListener('click', function() {
        document.getElementById('reservationModal').style.display = 'none';
    });
    
    document.getElementById('confirmButton').addEventListener('click', function() {
        let adults = document.getElementById('adults').value;
        let children = document.getElementById('children').value;
        let rooms = document.getElementById('rooms').value;
    
        alert(`Reserva confirmada!\nAdultos: ${adults}\nCrianças: ${children}\nQuartos: ${rooms}`);
    
        document.getElementById('reservationModal').style.display = 'none';
    });

});






