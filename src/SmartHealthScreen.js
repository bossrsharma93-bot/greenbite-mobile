// mobile_app_expo/src/screens/SmartHealthScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import api from '../utils/api'; // ensure this exists in your app

export default function SmartHealthScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ age:'', gender:'male', height_cm:'', weight_kg:'', activity_level:'light', goal:'maintain' });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{ fetchProfile(); fetchSuggestions(); }, []);

  async function fetchProfile() {
    try {
      const res = await api.get('/health/profile/' + api.userId);
      if(res) setProfile(res);
    } catch(e){}
  }

  async function saveProfile() {
    try {
      const payload = { user_id: api.userId, ...form };
      const res = await api.post('/health/profile', payload);
      if(res && res.ok) fetchProfile();
    } catch(e){ console.warn(e); }
  }

  async function fetchSuggestions() {
    try {
      const res = await api.get('/health/suggestions/' + api.userId);
      if(res && res.suggestions) setSuggestions(res.suggestions);
    } catch(e){}
  }

  return (
    <ScrollView style={{padding:16}}>
      <Text style={{fontSize:20,fontWeight:'600'}}>Smart Health</Text>

      <View style={{marginTop:12}}>
        <Text>Age</Text>
        <TextInput keyboardType='number-pad' value={form.age} onChangeText={(t)=>setForm({...form, age:t})} />
        <Text>Height (cm)</Text>
        <TextInput keyboardType='number-pad' value={form.height_cm} onChangeText={(t)=>setForm({...form, height_cm:t})} />
        <Text>Weight (kg)</Text>
        <TextInput keyboardType='number-pad' value={form.weight_kg} onChangeText={(t)=>setForm({...form, weight_kg:t})} />
        <Button title='Save Profile' onPress={saveProfile} />
      </View>

      <View style={{marginTop:20}}>
        <Text style={{fontSize:18}}>Your Summary</Text>
        {profile ? (
          <>
            <Text>BMI: {profile.bmi}</Text>
            <Text>Daily Target: {profile.daily_calorie_target} kcal</Text>
          </>
        ): <Text>No profile yet</Text>}
      </View>

      <View style={{marginTop:20}}>
        <Text style={{fontSize:18}}>Recommended for you</Text>
        {suggestions.map(item => (
          <View key={item.id} style={{borderWidth:1, padding:12, marginVertical:8, borderRadius:8}}>
            <Text style={{fontWeight:'600'}}>{item.name}</Text>
            <Text>{item.vendor_name || ''}</Text>
            <Text>{item.calorie_estimate ? `${item.calorie_estimate} kcal` : ''}</Text>
            <Button title='Add to cart' onPress={()=>{/* integrate with cart flow */}} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
