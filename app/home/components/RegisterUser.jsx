'use client';
import { useEffect } from 'react';
import useUser from '@/hooks/apis/useUser';

const RegisterUser = () => {
	const { registerUser, error } = useUser();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {};
		const response = await registerUser(payload, () => {});
	};

	useEffect(() => {
		handleSubmit();
	}, []);

	return <div>Logging in...</div>;
};

export default RegisterUser;
