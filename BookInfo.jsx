import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import PropTypes from "prop-types";

const BookInfo = ({ isbn }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isbn) {
      fetchBookInfo();
    }
  }, [isbn]);

  const fetchBookInfo = async () => {
    setLoading(true);
    setBook(null);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      if (response.data.items && response.data.items.length > 0) {
        setBook(response.data.items[0].volumeInfo);
      } else {
        setBook(null);
        Alert.alert("No Book Found", "No book found with that ISBN");
      }
    } catch (error) {
      setError("Failed to fetch book information");
      console.error("Error fetching book data:", error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {book && (
        <View style={styles.bookContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text>
            <Text style={styles.bold}>Authors:</Text> {book.authors?.join(", ")}
          </Text>
          <Text>
            <Text style={styles.bold}>Published:</Text> {book.publishedDate}
          </Text>
          <Text>
            <Text style={styles.bold}>Publisher:</Text> {book.publisher}
          </Text>
          <Text>
            <Text style={styles.bold}>Page Count:</Text> {book.pageCount}
          </Text>
          {book.imageLinks?.thumbnail && (
            <Image
              source={{ uri: book.imageLinks.thumbnail }}
              style={styles.thumbnail}
            />
          )}
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  bookContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

BookInfo.propTypes = {
  isbn: PropTypes.string.isRequired,
};

export default BookInfo;
