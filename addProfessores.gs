function addProfessorsToClassroom() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('UP Professores'); // Altere o nome da planilha para 'UP Professores'
  var range = sheet.getRange('A2:C'); // A coluna A contém os nomes dos professores, a coluna B contém os e-mails dos professores, e a coluna C contém os IDs das salas

  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    var professorName = values[i][0];
    var professorEmail = values[i][1];
    var classroomId = values[i][2].toString(); // Convertendo para string

    if (professorEmail && professorEmail.trim() !== '' && classroomId && classroomId.trim() !== '') {
      try {
        Classroom.Courses.Teachers.create({
          'userId': professorEmail,
          'id': classroomId // Altere 'courseId' para 'id'
        });

        Logger.log('Professor ' + professorName + ' adicionado à sala ' + classroomId);
      } catch (error) {
        Logger.log('Erro ao adicionar professor à sala ' + classroomId + ': ' + error);
      }
    }
  }
}
