import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from "react-native";

const UserScreen = ({ route, navigation }) => {
  const { users, index } = route.params;
  const user = users[index];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <UserInfo label="First Name" value={user.first_name} />
          <UserInfo label="Last Name" value={user.last_name} />
          <UserInfo label="Username" value={user.username} />
          <UserInfo label="Email" value={user.email} />
          <UserInfo label="Password" value={user.password} />
          <UserInfo label="ID" value={user.id} />
          <UserInfo label="UID" value={user.uid} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {index > 0 && (
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => navigation.navigate("User", { users, index: index - 1 })}
          >
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}

        {index < users.length - 1 && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("User", { users, index: index + 1 })}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const UserInfo = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default UserScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f7", alignItems: "center" },
  scrollContainer: { flexGrow: 1, paddingBottom: 100 },
  profileContainer: { alignItems: "center", paddingHorizontal: 20, paddingTop: 40 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#e0e0e0", marginBottom: 30 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 15 },
  infoLabel: { fontSize: 16, fontWeight: "500", color: "#333" },
  infoValue: { fontSize: 16, color: "#555" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#f5f5f7" },
  previousButton: { backgroundColor: "#f0f0f0", padding: 12, borderRadius: 25, width: 120, alignItems: "center" },
  previousButtonText: { color: "#333", fontSize: 16, fontWeight: "500" },
  nextButton: { backgroundColor: "#333", padding: 12, borderRadius: 25, width: 120, alignItems: "center" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});
