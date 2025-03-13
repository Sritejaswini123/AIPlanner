import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "https://random-data-api.com/api/users/random_user?size=80";

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("User", { users, index: 0 })}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f7" },
  startButton: { backgroundColor: "#333", padding: 15, borderRadius: 25, width: 200, alignItems: "center" },
  startButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
