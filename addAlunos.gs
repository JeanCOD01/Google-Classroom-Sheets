function addStudentsToClassrooms() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('UP alunos');
  var range = sheet.getRange('A2:C'); // A coluna A contém os nomes dos alunos, a coluna B contém os e-mails dos alunos, e a coluna C contém os IDs das salas

  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    var studentName = values[i][0];
    var studentEmail = values[i][1];
    var classroomId = values[i][2].toString(); // Convertendo para string

  if (studentEmail && studentEmail.trim() !== '' && classroomId && classroomId.trim() !== '') {
      try {
          var studentEmail = Classroom.Courses.Students.create({
          'userId': studentEmail,
          'courseId': classroomId
        });
        
        Logger.log('Aluno ' + studentName + ' adicionado à sala ' + classroomId);
      } catch (error) {
        Logger.log('Erro ao adicionar aluno à sala ' + classroomId + ': ' + error);
      }
    }
     Logger.log('Não caiu no IF ' + studentEmail);
  }
}
