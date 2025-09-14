// mobile_app_expo/src/components/SmartSuggestionsCard.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SmartSuggestionsCard({ item, onAdd }) {
  return (
    <View style={{borderWidth:1, padding:12, marginVertical:8, borderRadius:8}}>
      <Text style={{fontWeight:'600'}}>{item.name}</Text>
      <Text>{item.vendor_name || ''}</Text>
      <Text>{item.calorie_estimate ? `${item.calorie_estimate} kcal` : ''}</Text>
      <Text>Why: {item.score ? `Score ${item.score}` : 'Healthy choice'}</Text>
      <Button title='Add to cart' onPress={() => onAdd && onAdd(item)} />
    </View>
  );
}
