// Google Apps Script - Paste this into your Google Sheet's script editor
// This creates a web API for the grade tracker app

const SHEET_NAME = 'Grades';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const action = (e.parameter && e.parameter.action) || 'get';

    let result;
    switch (action) {
      case 'get':
        result = getAllGrades();
        break;
      case 'add':
        result = addGrade(JSON.parse(e.postData.contents));
        break;
      case 'delete':
        result = deleteGrade(e.parameter.id);
        break;
      case 'sync':
        result = syncGrades(JSON.parse(e.postData.contents));
        break;
      default:
        result = { error: 'Unknown action' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id', 'date', 'subject', 'type', 'earned', 'possible', 'percentage', 'letterGrade']);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  }

  return sheet;
}

function getAllGrades() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return { grades: [] };

  const headers = data[0];
  const grades = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      if (h === 'earned' || h === 'possible' || h === 'percentage') {
        obj[h] = Number(row[i]);
      } else {
        obj[h] = row[i];
      }
    });
    return obj;
  });

  return { grades: grades };
}

function addGrade(grade) {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    grade.id,
    grade.date,
    grade.subject,
    grade.type,
    grade.earned,
    grade.possible,
    grade.percentage,
    grade.letterGrade
  ]);
  return { success: true };
}

function deleteGrade(id) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: 'Not found' };
}

function syncGrades(payload) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const existingIds = new Set(data.slice(1).map(row => row[0]));

  const newGrades = payload.grades.filter(g => !existingIds.has(g.id));

  newGrades.forEach(grade => {
    sheet.appendRow([
      grade.id,
      grade.date,
      grade.subject,
      grade.type,
      grade.earned,
      grade.possible,
      grade.percentage,
      grade.letterGrade
    ]);
  });

  return getAllGrades();
}
