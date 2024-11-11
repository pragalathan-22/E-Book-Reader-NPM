// const getMostSuggestedWords = () => {
//     const wordCount = {};

//     savedBooks.forEach(book => {
//         book.suggestions.forEach(word => {
//             wordCount[word] = (wordCount[word] || 0) + 1; // Count occurrences of each word
//         });
//     });

//     // Sort words by frequency
//     const sortedWords = Object.entries(wordCount)
//         .sort(([, countA], [, countB]) => countB - countA)
//         .map(([word]) => word);

//     return sortedWords.slice(0, 5); // Return top 5 suggested words
// };
