function criarAtividade() {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var abaAtividades = planilha.getSheetByName('Atividades');
    var ultimaLinha = abaAtividades.getLastRow();
    var atividades = abaAtividades.getRange('A2:C' + ultimaLinha).getValues();

    atividades.forEach(function(atividade, index) {
        var salaID = String(atividade[0]); // Garantir que o ID do curso seja uma string
        var titulo = atividade[1];
        var descricao = atividade[2];

        if (validarDadosAtividade(titulo)) {
            try {
                var idNovaAtividade = criarNovaAtividade(salaID, titulo, descricao);
                if (idNovaAtividade) {
                    // Gravar o ID da nova atividade na coluna D
                    abaAtividades.getRange(index + 2, 4).setValue(idNovaAtividade);
                }
            } catch (error) {
                Logger.log('Erro ao criar atividade na linha: ' + (index + 2) + ' - ' + error);
            }
        } else {
            Logger.log('Título da atividade não foi fornecido na linha: ' + (index + 2));
        }
    });

    // Função interna para validar os dados da atividade
    function validarDadosAtividade(titulo) {
        return titulo && titulo.trim() !== '';
    }

    // Função interna para criar uma nova atividade
    function criarNovaAtividade(salaID, titulo, descricao) {
        var dadosAtividade = {
            'courseId': salaID,
            'title': titulo,
            'description': descricao,
            'workType': 'ASSIGNMENT',
            'state': 'DRAFT' //Sobe como rascunho // 'PUBLISHED' SOBE COMO PUBLICADO
        };

        var novaAtividade = Classroom.Courses.CourseWork.create(dadosAtividade, salaID);

        Logger.log('Atividade criada com o ID: ' + novaAtividade.id + ' para a sala: ' + salaID);
        return novaAtividade.id; // Retorna o ID da nova atividade
    }
}
