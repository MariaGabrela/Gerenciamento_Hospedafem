document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('myChart').getContext('2d');

    // Dados iniciais para o gráfico em porcentagem
    var data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [{
            label: 'Relatório de Ocupação (%)',
            data: [50, 70, 30, 80, 45, 60, 65, 75], // Dados de exemplo em porcentagem até Agosto
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(100, 159, 64, 0.2)',
                'rgba(200, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(100, 159, 64, 1)',
                'rgba(200, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Opções do gráfico
    var options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // Define o limite máximo como 100%
                ticks: {
                    callback: function(value) {
                        return value + '%'; // Adiciona o símbolo de % aos rótulos do eixo Y
                    }
                }
            }
        }
    };

    // Inicializar o gráfico
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    // Função para atualizar os dados do gráfico e exibir informações adicionais
    function updateChartData(newData) {
        myChart.data.datasets[0].data = newData;
        myChart.update();

        // Calcular e exibir a soma mensal em porcentagem
        var sum = newData.reduce((acc, curr) => acc + curr, 0);
        var avg = sum / newData.length; // Média das porcentagens
        document.getElementById('monthlySum').textContent = `Média de Ocupação: ${avg.toFixed(2)}%`;

        // Dados de agosto (último mês no array)
        var ocupacaoAgosto = newData[7]; // Valor de agosto
        var totalQuartos = 100; // Exemplo: total de 100 quartos
        var quartosOcupados = Math.round((ocupacaoAgosto / 100) * totalQuartos);
        var quartosLivres = totalQuartos - quartosOcupados;
        var entradasHoje = 5; // Exemplo: número de entradas para hoje
        var saidasHoje = 3; // Exemplo: número de saídas para hoje

        // Atualizar os elementos com as informações
        document.getElementById('occupiedRooms').textContent = `Quartos Ocupados: ${quartosOcupados}`;
        document.getElementById('freeRooms').textContent = `Quartos Livres: ${quartosLivres}`;
        document.getElementById('checkInsToday').textContent = `Entradas Hoje: ${entradasHoje}`;
        document.getElementById('checkOutsToday').textContent = `Saídas Hoje: ${saidasHoje}`;
    }

    // Evento para atualizar dados ao clicar no botão
    var updateButton = document.getElementById('updateButton');
    updateButton.addEventListener('click', function() {
        var newData = [60, 75, 50, 90, 55, 70, 68, 80]; // Dados atualizados (exemplo) em porcentagem até Agosto
        updateChartData(newData);
    });

    // Atualizar os dados iniciais na carga da página
    updateChartData(data.datasets[0].data);
});