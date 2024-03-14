'use client';

import axios from 'axios';

const useUser = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const registerUser = async (payload, cb) => {
		const response = await axios.get('/api/v1/create-user');
	};

	return {
		registerUser,
		error,
		isLoading,
	};
};

export default useUser;
