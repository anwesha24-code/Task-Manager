import React from 'react';
import { StyleSheet, Text, View } from 'react-native';




const Dashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Hey User, let’s turn plans into progress.</Text>
      </View>
      <View style={styles.graphs}>
        <View style={styles.card}>
          <Text style={styles.subheading}>Task Distribution</Text>
          {/* graph */}
        </View>
        <View style={styles.card}>
          <Text style={styles.subheading}>Task Priority Levels</Text>
          {/* graph */}

        </View>
      </View>



      
    </View>
  );
};

const styles = StyleSheet.create({
  heading:{
    fontWeight:'bold',
    fontSize:42,

  },
  subheading:{
    fontWeight:'bold',
    fontSize:19,
  },
  container: {
    flex: 1,
    backgroundColor: '#E3F0FF',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 6,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: 100,                   // Set a reasonable minimum width
    margin: 10,
  },
  graphs: {
    flexDirection: 'row',            // Arrange children horizontally
    justifyContent: 'center',        // Center cards horizontally
    alignItems: 'flex-start',        // Align cards to the top (or 'center' for vertical centering)
  }
});

export default Dashboard;
