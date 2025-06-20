import { useRouter } from 'expo-router';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebase';

const Dashboard = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user data
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
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

  return (
    <View style={styles.container}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          Hey {userDetails?.firstName || "User"}, let’s turn plans into progress.
        </Text>
      </View>

      {/* Graph Section */}
      <View style={styles.graphs}>
        <View style={[styles.graphCard, styles.card]}>
          <Text style={styles.subheading}>Task Distribution</Text>
          {/* Placeholder for Graph */}
          <Text style={styles.placeholderText}>Graph 1 Placeholder</Text>
        </View>
        <View style={[styles.graphCard, styles.card]}>
          <Text style={styles.subheading}>Task Priority Levels</Text>
          {/* Placeholder for Graph */}
          <Text style={styles.placeholderText}>Graph 2 Placeholder</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F0FF', // Light blue background
    padding: 16,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#1B3A7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#343A40',
    marginBottom: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginVertical: 12,
    width: '100%',
  },
  graphs: {
    flexDirection: 'row', // Arrange horizontally
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  graphCard: {
    flex: 1, // Equal width for both cards
    marginHorizontal: 8,
  },
  placeholderText: {
    color: '#6C757D',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default Dashboard;
