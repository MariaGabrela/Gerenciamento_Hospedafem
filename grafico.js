document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('myChart').getContext('2d');

    // Dados iniciais para o gráfico
    var data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
            label: 'Vendas Mensais',
            data: [12, 19, 3, 5, 2, 3], // Dados de exemplo
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Opções do gráfico
    var options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Inicializar o gráfico
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    // Função para atualizar os dados do gráfico
    function updateChartData(newData) {
        myChart.data.datasets[0].data = newData;
        myChart.update();

        // Calcular e exibir a soma mensal
        var sum = newData.reduce((acc, curr) => acc + curr, 0);
        document.getElementById('monthlySum').textContent = sum;
    }

    // Evento para atualizar dados ao clicar no botão
    var updateButton = document.getElementById('updateButton');
    updateButton.addEventListener('click', function() {
        var newData = [15, 12, 8, 10, 6, 4]; // Dados atualizados (exemplo)
        updateChartData(newData);
    });
});
