function buscarESalvarDadosAtividades2() {
    var idSala = '589522398325'; // ID da sala de aula inserido diretamente no código futuro mudar para pegar lista no planilhas com os ids de todas as salas

    // Definir os estados de atividade que queremos buscar
    var parametros = {
        courseWorkStates: ['DRAFT', 'PUBLISHED']
    };

    // Buscar atividades para a sala de aula específica com os estados definidos
    var resposta = Classroom.Courses.CourseWork.list(idSala, parametros);
    var atividades = resposta.courseWork;

    // Preparar a planilha para armazenar os dados
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var abaDados = planilha.getSheetByName('Dados');
    if (!abaDados) {
        abaDados = planilha.insertSheet('Dados');
    }

    abaDados.clear(); // Limpar a aba existente

    // Definir os cabeçalhos para os dados
    var cabecalhos = ['Course ID', 'ID Atividade', 'Título', 'Descrição', 'Estado', 'Data de Criação', 'Data de Atualização', 'Tipo de Trabalho', 'ID Pasta de Trabalho', 'Modo de Atribuição', 'ID Criador'];
    abaDados.appendRow(cabecalhos);

    if (atividades && atividades.length > 0) {
        // Processar cada atividade e adicionar na aba 'Dados'
        for (var i = 0; i < atividades.length; i++) {
            var atividade = atividades[i];

            // Transformar o estado da atividade
            var estado = atividade.state;
            if (estado === 'DRAFT') {
                estado = 'Previsto';
            } else if (estado === 'PUBLISHED') {
                estado = 'Realizado';
            }

            // Preparar a linha de dados
            var linhaDados = [
                atividade.courseId,
                atividade.id,
                atividade.title,
                atividade.description,
                estado,
                atividade.creationTime,
                atividade.updateTime,
                atividade.workType,
                atividade.assignment ? atividade.assignment.studentWorkFolder.id : '',
                atividade.assigneeMode,
                atividade.creatorUserId
            ];

            // Adicionar a linha na aba 'Dados'
            abaDados.appendRow(linhaDados);
        }
    } else {
        Logger.log('Nenhuma atividade encontrada para a sala: ' + idSala);
    }
}
