import { useRouter } from 'expo-router';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from "../firebase"; // Ensure you import the Firestore database instance

const Profile = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user data
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid); // Fixed: replaced `dismissBrowser` with `db`
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User is not logged in.");
        router.push('/'); // Redirect to login if not logged in
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onLogout = () => {
    auth.signOut()
      .then(() => {
        router.push('/'); // Redirect to login after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      {userDetails ? (
        <View style={styles.profileCard}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.value}>{userDetails.firstName || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.value}>{userDetails.lastName || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userDetails.email || "N/A"}</Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text> // Display loading message while fetching data
      )}
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F0FF', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3A7A',
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Shadow for Android
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#343A40',
  },
  logoutButton: {
    backgroundColor: '#1B3A7A',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 24,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
