import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://agri-trust-ai-ledger.vercel.app/api'; // Or your local IP for dev

export const getBatches = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/batches`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

export const getBatchDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/batches/${id}`);
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return response.json();
};
