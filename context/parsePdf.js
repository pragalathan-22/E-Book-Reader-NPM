import RNFS from 'react-native-fs';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';

// Use require to include the worker as a blob
GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.js');

export const parsePdf = async (uri) => {
  // Read the PDF file as binary
  const fileData = await RNFS.readFile(uri, 'base64');
  
  // Convert base64 to a Uint8Array
  const pdfData = new Uint8Array(
    atob(fileData)
      .split('')
      .map((char) => char.charCodeAt(0))
  );

  // Load the PDF document
  const pdf = await getDocument({ data: pdfData }).promise;
  const totalPages = pdf.numPages;
  let chapters = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    // Extract the text from the page
    const pageText = textContent.items.map((item) => item.str).join(' ');

    // Assuming each page is a chapter; you can modify this logic as needed
    chapters.push({ title: `Chapter ${i}`, content: pageText });
  }

  return chapters; // Return an array of chapter objects
};
