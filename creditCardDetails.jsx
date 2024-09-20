import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CreditCardDetails = ({ route }) => {
  const { creditCardDetails } = route.params;

  const {
    is_overdue,
    last_payment_amount,
    last_payment_date,
    last_statement_issue_date,
    last_statement_balance,
    minimum_payment_amount,
    next_payment_due_date,
  } = creditCardDetails;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Card Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Overdue:</Text>
        <Text style={[styles.value, is_overdue ? styles.overdue : styles.notOverdue]}>
          {is_overdue ? 'Yes' : 'No'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Last Payment:</Text>
        <Text style={styles.value}>${last_payment_amount} on {last_payment_date}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Last Statement Balance:</Text>
        <Text style={styles.value}>${last_statement_balance}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Minimum Payment:</Text>
        <Text style={styles.value}>${minimum_payment_amount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Last Statement Issue Date:</Text>
        <Text style={styles.value}>{last_statement_issue_date}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Next Payment Due:</Text>
        <Text style={styles.value}>{next_payment_due_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  overdue: {
    color: '#FF4D4D',
  },
  notOverdue: {
    color: '#28A745',
  },
});

export default CreditCardDetails;
