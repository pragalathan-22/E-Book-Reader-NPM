import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'; 
import { fetchDocument } from 'pdfjs-dist/legacy/build/pdf';

export const parsePdf = async (uri) => {
  const pdf = await fetchDocument(uri).promise;
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

  return chapters; // Array of chapter objects
};
