import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const User = () => {
  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"User"</Text> screen!
      </Text>
    </View>
    );
  };
  

export default User;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },
});