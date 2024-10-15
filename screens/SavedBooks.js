// import React, { useContext } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BooksContext } from '../context/BooksContext'; // Import BooksContext

// const SavedBooks = ({ navigation }) => {
//   const { savedBooks } = useContext(BooksContext); // Access savedBooks from context

//   return (
//     <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
//       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         <Text style={styles.sectionTitle}>Saved Books</Text>
//         <View style={styles.booksContainer}>
//           {savedBooks.length === 0 ? (
//             <Text style={styles.noBooksText}>No saved books yet!</Text>
//           ) : (
//             savedBooks.map((book, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.bookItem}
//                 onPress={() => navigation.navigate('PlayScreen', { book })}
//               >
//                 <Image source={{ uri: book.image }} style={styles.bookCover} />
//                 <View style={styles.bookDetails}>
//                   <Text style={styles.bookTitle}>{book.title}</Text>
//                   <Text style={styles.bookAuthor}>{book.author}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingBottom: 100, // Ensure content is visible above bottom nav
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   booksContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   noBooksText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   bookItem: {
//     width: '48%', // Two book boxes per row
//     backgroundColor: '#2b394b',
//     borderRadius: 8,
//     marginBottom: 20,
//     padding: 10,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     alignItems: 'center',
//   },
//   bookCover: {
//     width: '100%',
//     height: 150,
//     borderRadius: 5,
//   },
//   bookDetails: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   bookTitle: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   bookAuthor: {
//     color: 'gray',
//     fontSize: 14,
//   },
// });

// export default SavedBooks;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SavedBooks = () => {
  return (
    <View>
      <Text>SavedBooks</Text>
    </View>
  )
}

export default SavedBooks

const styles = StyleSheet.create({})