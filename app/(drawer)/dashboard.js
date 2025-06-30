import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from "../firebase";

const Dashboard = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [taskCounts, setTaskCounts] = useState({
    completed: 0,
    incompleted: 0,
    work: 0,
    personal: 0,
    urgent: 0,
  });

  // Fetch task counts from AsyncStorage
  const fetchTaskCounts = async () => {
    try {
      const tasksData = await AsyncStorage.getItem('tasks');
      if (tasksData) {
        const tasks = JSON.parse(tasksData);

        const completed = tasks.filter((task) => task.completed).length;
        const incompleted = tasks.length - completed;
        const work = tasks.filter((task) => task.category === 'work').length;
        const personal = tasks.filter((task) => task.category === 'personal').length;
        const urgent = tasks.filter((task) => task.category === 'urgent').length;

        setTaskCounts({ completed, incompleted, work, personal, urgent });
      }
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };

  // Fetch user details (for demonstration)
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
    fetchTaskCounts();
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Welcome Card */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          Hey, let’s turn plans into progress.
        </Text>
      </View>

      {/* Task Counts Section */}
      <View style={[styles.card, styles.statsCard]}>
        <Text style={styles.subheading}>Task Overview</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>Completed: {taskCounts.completed}</Text>
          <Text style={styles.statText}>Incomplete: {taskCounts.incompleted}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>Work: {taskCounts.work}</Text>
          <Text style={styles.statText}>Personal: {taskCounts.personal}</Text>
          <Text style={styles.statText}>Urgent: {taskCounts.urgent}</Text>
        </View>
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
  statsCard: {
    alignItems: 'flex-start',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  statText: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: 'bold',
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
