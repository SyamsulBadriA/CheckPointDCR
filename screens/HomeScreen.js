import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation }) {
  const [selectedValue, setSelectedValue] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [switchValues, setSwitchValues] = useState({
    10: false,
    21: false,
    42: false,
    75: false,
  });
  const [dropdownValue, setDropdownValue] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.navigate('Login');
  };

  const handleSwitchChange = (value, key) => {
    const newSwitchValues = { ...switchValues };
    Object.keys(newSwitchValues).forEach((k) => {
      if (k !== key) {
        newSwitchValues[k] = false;
      }
    });
    setSwitchValues({ ...newSwitchValues, [key]: value });
    setSelectedValue(value ? key.toString() : '');
    setDropdownValue(''); 
  };

  const handleSubmit = async () => {
    if (!selectedValue || !textInputValue || !dropdownValue) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const category = `${selectedValue}_km`;
    const data = {
      user_id: selectedValue+textInputValue,
      category: category,
      checkpoint_name: dropdownValue,
    };

    try {
      const response = await fetch('https://dev.diengcalderarace.com/api/checkpoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // console.log(data);

      if (response.ok) {
        Alert.alert("Success", "Data submitted successfully");
      } else {
        Alert.alert("Error", "Failed to submit data");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while submitting data");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background 2.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/logo-white.png")}
          style={styles.logo}
        />
        <View style={styles.checkboxes}>
          <View style={styles.checkboxItem}>
            <Text style={{ color: 'white' }}>42</Text>
            <Switch
              value={switchValues[42]}
              onValueChange={(value) => handleSwitchChange(value, 42)}
            />
          </View>
          <View style={styles.checkboxItem}>
            <Text style={{ color: 'white' }}>75</Text>
            <Switch
              value={switchValues[75]}
              onValueChange={(value) => handleSwitchChange(value, 75)}
            />
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={[styles.inputLabel, { color: 'white' }]}>Select Checkpoint:</Text>
          {selectedValue === '42' && (
            <Picker
              selectedValue={dropdownValue}
              onValueChange={(itemValue) => setDropdownValue(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="CP1" value="CP1_Prau" />
            </Picker>
          )}
          {selectedValue === '75' && (
            <Picker
              selectedValue={dropdownValue}
              onValueChange={(itemValue) => setDropdownValue(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="CP1" value="CP1_Prau" />
              <Picker.Item label="CP2" value="CP2_Prau" />
              <Picker.Item label="CP3" value="CP3_Prau" />
            </Picker>
          )}
          <Text style={[styles.inputLabel, { color: 'white' }]}>Category:</Text>
          <TextInput
            style={[styles.textInput, { color: 'white' }]}
            value={selectedValue + textInputValue}
            editable={false}
          />
          <Text style={[styles.inputLabel, { color: 'white' }]}>Input No Runner:</Text>
          <TextInput
            style={[styles.textInput, { color: 'white' }]}
            value={textInputValue}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, ''); 
              setTextInputValue(numericValue);
            }}
            placeholder="No Runner"
            placeholderTextColor="white"
            keyboardType="numeric"
            maxLength={3} 
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.logoutButtonContainer}
        onPress={handleLogout}
      >
        <Image
          source={require("../assets/logout.png")}
          style={styles.logoutButton}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  checkboxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textInputContainer: {
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputLabel: {
    marginBottom: 5,
    color: 'white',
  },
  button: {
    width: "100%",
    backgroundColor: "#1f91c3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 200,
    textAlign: 'center',
    color: 'white',
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  logoutButton: {
    width: 40,
    height: 40,
  },
  picker: {
    width: 200,
    color: 'white', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    marginBottom: 20,
  },
});
