import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreditCardDetails from './creditCardDetails';
import { RadioButton } from 'react-native-paper';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [linkToken, setLinkToken] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const client_id = '6560cf51691abd001bade97d';
  const secret = 'aad1c6fa9c79ae4a466e64a98b94b6';
  const envURL = 'production.plaid.com';

  // const client_id = '66d82b266f8802001a5184f8';
  // const secret = 'a782703a30b6331a78bf90591833c4';
  // const envURL = 'sandbox.plaid.com';



  // Create Link Token Function
  const createLinkToken = async (country) => {
    try {
      const response = await fetch(`https://${envURL}/link/token/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id,
          secret,
          client_name: 'plaid_project',
          country_codes: [country],
          language: 'en',
          user: {
            client_user_id: 'unique_user_id',
          },
          products: ['auth', 'transactions', 'liabilities'],
        }),
      });
      const data = await response.json();
      if (data.link_token) {
        setLinkToken(data.link_token);  // Set the link token
      } else {
        Alert.alert('Error', 'Unable to create link token');
      }
    } catch (error) {
      console.error('Error creating link token:', error);
      Alert.alert('Error', 'Failed to create link token');
    }
  };

  // Fetch credit card details
  const fetchCreditCardDetails = async (accessToken) => {
    try {
      const response = await fetch(`https://${envURL}/liabilities/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id,
          secret,
          access_token: accessToken,
        }),
      });
      const data = await response.json();
      console.log('data', data);
      const creditCardDetails = data.liabilities.credit[0];
      console.log('creditCardDetails', creditCardDetails);
      navigation.navigate('CreditCardDetails', { creditCardDetails });
    } catch (error) {
      console.error('Error fetching credit card details:', error);
      Alert.alert('Error', 'Failed to fetch credit card details.');
    }
  };

  // Handle success after linking account
  const handleLinkSuccess = async (success) => {
    const publicToken = success.publicToken;
    try {
      const response = await fetch(`https://${envURL}/item/public_token/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id,
          secret,
          public_token: publicToken,
        }),
      });
      const data = await response.json();
      const accessToken = data.access_token;
      fetchCreditCardDetails(accessToken);
    } catch (error) {
      Alert.alert('Error', 'Failed to exchange public token for access token.');
    }
  };


  useEffect(() => {
    createLinkToken(selectedCountry);  
  }, [selectedCountry]);

   return (
    <View style={styles.container}>
    <Text style={styles.title}>Connect Your Bank Account</Text>
    <View style={styles.card}>

    <Text style={styles.subtitle}>Select Your Country</Text>

    <View style={styles.radioGroup}>
      <RadioButton.Group
        onValueChange={(newValue) => setSelectedCountry(newValue)}
        value={selectedCountry}
      >
        <View style={styles.radioOption}>
          <RadioButton value="US" color="#007BFF" />
          <Text style={styles.radioLabel}>United States (US)</Text>
        </View>

        <View style={styles.radioOption}>
          <RadioButton value="CA" color="#007BFF" />
          <Text style={styles.radioLabel}>Canada (CA)</Text>
        </View>
      </RadioButton.Group>
    </View>

    <TouchableOpacity
      style={[styles.button, !linkToken && styles.buttonDisabled]}
      disabled={!linkToken}
    >
      {linkToken ? (
        <PlaidLink
          tokenConfig={{ token: linkToken }}
          onSuccess={handleLinkSuccess}
          onExit={() => {
            Alert.alert('Exit', 'Exited without linking the account.');
          }}
        >
          <Text style={styles.buttonText}>Connect Account</Text>
        </PlaidLink>
      ) : (
        <Text style={styles.buttonText}>Loading...</Text>
      )}
    </TouchableOpacity>
    </View>
  </View>
);
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home Page',
            headerStyle: {
              backgroundColor: '#007BFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 10,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
             
              textAlign: 'center',
            },
          }}
        />
        <Stack.Screen
          name="CreditCardDetails"
          component={CreditCardDetails}
          options={{ title: 'Credit Card Details',
            headerStyle: {
              backgroundColor: '#007BFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 10,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              
              textAlign: 'center',
            },
           }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
   
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
  },
 radioGroup: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

});

export default App;
