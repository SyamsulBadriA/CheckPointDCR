import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CheckBoxComponent() {
  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckBox = (value) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleCheckBox(10)}
      >
        <Text>{checkedValues.includes(10) ? '☑' : '☐'}</Text>
        <Text>10</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleCheckBox(21)}
      >
        <Text>{checkedValues.includes(21) ? '☑' : '☐'}</Text>
        <Text>21</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleCheckBox(42)}
      >
        <Text>{checkedValues.includes(42) ? '☑' : '☐'}</Text>
        <Text>42</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleCheckBox(75)}
      >
        <Text>{checkedValues.includes(75) ? '☑' : '☐'}</Text>
        <Text>75</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
});
