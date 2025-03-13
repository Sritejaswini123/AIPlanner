import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";

const Stack = createStackNavigator();
const API_URL = "https://random-data-api.com/api/users/random_user?size=80";

const UserScreen = ({ route, navigation }) => {
  const { users, index } = route.params;
  const user = users[index];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          
          <Text style={styles.nameHeader}>{user.first_name} {user.last_name}</Text>
        
          
        
      
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username:</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user.username}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Password:</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user.password}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID:</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user.id}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>UID:</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user.uid}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        {index > 0 ? (
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.navigate("User", { users, index: index - 1 })}
          >
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonPlaceholder} />
        )}
        
        <View style={styles.centerButtonPlaceholder} />
        
        {index < users.length - 1 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("User", { users, index: index + 1 })}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonPlaceholder} />
        )}
      </View>
    </SafeAreaView>
  );
};

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
    <View style={styles.homeContainer}>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("User", { users, index: 0 })}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#f5f5f7",
    alignItems: 'center'
  },
  homeContainer: { 
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#f5f5f7",
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Space for buttons
  },
  profileContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  avatar: { 
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0",
    marginBottom: 30,
  },
  nameHeader: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  nameValue: {
    fontSize: 18,
    color: "#333",
    padding: 12,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  infoValueContainer: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
    padding: 12,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: "#f5f5f7",
  },
  previousButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 120,
    alignItems: "center",
  },
  previousButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 120,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonPlaceholder: {
    width: 120,
  },
  centerButtonPlaceholder: {
    width: 50,
  },
  startButton: { 
    backgroundColor:  "#333", 
    padding: 15, 
    borderRadius: 25,
    width: 200,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600",
  },
  loader: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});