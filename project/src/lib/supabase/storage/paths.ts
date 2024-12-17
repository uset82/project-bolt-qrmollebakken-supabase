import { v4 as uuidv4 } from 'uuid';

export function generateFilePath(studentId: string, originalFileName: string): string {
  const fileExt = originalFileName.split('.').pop() || 'jpg';
  const fileName = `${uuidv4()}.${fileExt}`;
  return `${studentId}/${fileName}`;
}

export function getStudentFolderPath(studentId: string): string {
  return `${studentId}`;
}

export function parseFilePath(filePath: string) {
  const [studentId, fileName] = filePath.split('/');
  return { studentId, fileName };
}