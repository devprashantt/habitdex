'use client';

import axios from 'axios';
import { useState } from 'react';

const useUser = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const registerUser = async (payload, cb) => {
		const response = await axios.get('/api/v1/user/create-user');
	};

	return {
		registerUser,
		error,
		isLoading,
	};
};

export default useUser;
