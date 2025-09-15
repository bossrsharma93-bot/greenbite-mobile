import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import Constants from 'expo-constants';

export default function ReorderButton({ userId, onSuccess }) {
  const handleReorder = async () => {
    try {
      const resp = await fetch((Constants.manifest?.extra?.API_URL || '') + '/api/reorder/last', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await resp.json();
      if (data.success) {
        Alert.alert('Order placed', 'Your previous order was placed successfully.');
        if (onSuccess) onSuccess(data.order);
      } else {
        Alert.alert('Failed', data.error || 'Unable to place reorder.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Network or server error.');
    }
  };

  return (
    <TouchableOpacity onPress={handleReorder} style={{ padding: 10, backgroundColor: '#4CAF50', borderRadius: 6 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reorder Last Meal</Text>
    </TouchableOpacity>
  );
}
