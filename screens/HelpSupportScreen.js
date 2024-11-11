import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Import Firestore from your firebase config

const HelpSupportScreen = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [query, setQuery] = useState('');
  const [submittedQueries, setSubmittedQueries] = useState([]); // State for submitted queries

  const faqs = [
    { question: "How do I reset my password?", answer: "To reset your password, go to the settings and select 'Reset Password'." },
    { question: "How do I contact support?", answer: "You can contact support at support@example.com." },
    { question: "Where can I find my saved books?", answer: "Your saved books can be found in the 'Saved Books' section in your profile." },
  ];

  // Submit query to Firestore
  const handleSubmitQuery = async () => {
    if (query.trim()) {
      try {
        // Add the query to Firestore
        await addDoc(collection(db, 'queries'), {
          query: query,
          status: 'pending',
          createdAt: new Date(),
        });
        setQuery(''); // Clear input after submitting
      } catch (error) {
        console.error("Error submitting query: ", error);
      }
    }
  };

  // Fetch queries from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'queries'), (snapshot) => {
      const queries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmittedQueries(queries);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle FAQ toggle
  const handleQuestionPress = (index) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index);
  };

  // Handle updating a query with a reply
  const handleReplyToQuery = async (queryId, replyMessage) => {
    try {
      const queryDocRef = doc(db, 'queries', queryId);
      await updateDoc(queryDocRef, {
        reply: replyMessage,
        status: 'answered',
      });
    } catch (error) {
      console.error("Error replying to query: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Help & Support</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.chatContainer}>
            <TouchableOpacity onPress={() => handleQuestionPress(index)} style={styles.questionBubble}>
              <Text style={styles.question}>{faq.question}</Text>
            </TouchableOpacity>
            {selectedQuestionIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Display the submitted queries */}
        {submittedQueries.length > 0 && (
          <View style={styles.submittedQueriesContainer}>
            <Text style={styles.submittedQueriesTitle}>Your Queries:</Text>
            {submittedQueries.map((submittedQuery, index) => (
              <View key={index} style={styles.queryContainer}>
                <View style={styles.questionBubble}>
                  <Text style={styles.submittedQuery}>{submittedQuery.query}</Text>
                </View>
                {submittedQuery.reply ? (
                  <View style={styles.answerContainer}>
                    <Text style={styles.replyText}>Reply: {submittedQuery.reply}</Text>
                  </View>
                ) : (
                  <View style={styles.answerContainer}>
                    <Text style={styles.pendingReplyText}>Status: Pending...</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.queryInputContainer}>
        <TextInput
          style={styles.queryInput}
          placeholder="Type your question here..."
          placeholderTextColor="lightgray"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleSubmitQuery} style={styles.submitButton}>
          <Icon name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#212f3d",
  },
  scrollContainer: {
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  chatContainer: {
    marginBottom: 15,
  },
  questionBubble: {
    backgroundColor: '#3e4a6d',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  question: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  answerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  answer: {
    fontSize: 16,
    color: 'lightgray',
  },
  queryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  queryInput: {
    backgroundColor: '#3e4a6d',
    borderRadius: 20,
    padding: 10,
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    padding: 10,
  },
  submittedQueriesContainer: {
    marginTop: 20,
  },
  submittedQueriesTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  queryContainer: {
    marginVertical: 5,
  },
  submittedQuery: {
    fontSize: 16,
    color: 'lightgray',
  },
  replyText: {
    fontSize: 16,
    color: '#00ff00',
    marginTop: 5,
  },
  pendingReplyText: {
    fontSize: 16,
    color: 'orange',
    marginTop: 5,
  },
});
