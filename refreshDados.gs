// Este codigo é pra manter os dados atualizado nas mudanças realizadas no ambiente de sala de aula classroom junto com um gatilho de execução diario noturno.
function atualizarDadosGerais() {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var abaDados = planilha.getSheetByName('Dados');
    var abaDadosGerais = planilha.getSheetByName('Dados Geral');

    // Ler os dados das abas
    var dados = abaDados.getDataRange().getValues();
    var dadosGerais = abaDadosGerais.getDataRange().getValues();

    // Mapear os dados da aba 'Dados Gerais' para fácil acesso
    var mapDadosGerais = new Map();
    dadosGerais.forEach(function(row) {
        var idAtividade = row[1]; // Supondo que o ID da atividade esteja na coluna 2
        mapDadosGerais.set(idAtividade, row);
    });

    // Iterar pelos dados da aba 'Dados' e comparar com 'Dados Gerais'
    dados.forEach(function(row) {
        var idAtividade = row[1]; // Supondo que o ID da atividade esteja na coluna 2
        var estado = row[4]; // Supondo que o estado da atividade esteja na coluna 5

        if (estado === 'Realizado' && mapDadosGerais.has(idAtividade)) {
            var rowDadosGerais = mapDadosGerais.get(idAtividade);
            var estadoDadosGerais = rowDadosGerais[4]; // Supondo que o estado esteja na coluna 5

            if (estadoDadosGerais === 'Previsto') {
                // Adicionar nova linha na aba 'Dados Gerais'
                abaDadosGerais.appendRow(row);
            }
        }
    });
}
