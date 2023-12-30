function createClassrooms() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); // Obtém a planilha ativa do Google Sheets.
  var sheet = ss.getSheetByName('salas'); // Obtém a referência para a aba "salas" 
  var range = sheet.getRange('A2:A'); // Obtém a referência para a faixa de células na coluna A a partir da segunda linha.
  var legendaRange = sheet.getRange('C2:C'); //Obtém a referência para a faixa de células na coluna C a partir da segunda linha.
  var idsRange = sheet.getRange('B2:B'); // Obtém a referência para a faixa de células na coluna B a partir da segunda linha.

  var courseNames = range.getValues(); // Recebe os nomes dos cursos da coluna A.
  var legendas = legendaRange.getValues(); // Recebe as legendas dos cursos da coluna C.
  var ids = []; // Inicializa um array vazio para armazenar os IDs das salas criadas.

  for (var i = 0; i < courseNames.length; i++) {
    var courseName = courseNames[i][0]; // Obtém o nome do curso respondente ao curso atual
    var legenda = legendas [i][0]; // Obtém a legenda correspondente ao curso atual

    if (courseName.trim() !== '') { // Verifica se o nome do curso não está em branco
      try {
        var course = Classroom.Courses.create({
          'name': courseName,
          'section': legenda,
          'ownerId': 'me' // Substitua 'ID_DO_PROPRIETARIO_AQUI' pelo ID do proprietário da sala
        });

        ids.push([course.id]); // Armazena o ID da sala criada

        Logger.log('Sala criada: ' + course.name + ' - ID: ' + course.id);
      } catch (error) {
        Logger.log('Erro ao criar sala: ' + error);
      }
    }
  }

  // Percorre a matriz idsValues e grava cada valor na coluna B
  for (var j = 0; j < ids.length; j++) {
    idsRange.getCell(j + 1, 1).setValue(ids[j][0]);
  }

  Logger.log('IDs gravados na coluna B.');
}
