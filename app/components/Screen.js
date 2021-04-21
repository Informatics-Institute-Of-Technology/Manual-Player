import { mdiRugby } from '@mdi/js';
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import color from '../misc/color';

const Screen = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
backgroundColor: 'rgba(52,52,52,0)',
    paddingTop: 5,
  },
});

export default Screen;
