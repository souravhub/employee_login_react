import React, { useEffect } from 'react';
import { Input, Button, SelectInput } from '../index';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import conf from '../../conf/conf.js';
import { useNavigate } from 'react-router-dom';

function SignUp() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const password = watch('password');

	const submit = async function (data) {
		// await new Promise((resolve) => setTimeout(resolve, 5000));

		const {
			firstName,
			lastName,
			email,
			userName,
			userType,
			password,
			jobProfile,
			confirmPassword,
		} = data;

		const apiBody = {
			name: { firstName, lastName },
			email,
			userName,
			userType,
			password,
			jobProfile,
		};

		const res = await axios.post(
			`${conf.apiBaseUrl}/api/v1/users/register`,
			apiBody
		);
		console.log(res, 'res');
		navigate('/login');
	};
	return (
		<>
			<p className="text-3xl font-bold my-3">Welcome to Login Portal</p>
			<div className="w-1/2 m-auto my-4">
				<form
					onSubmit={handleSubmit(submit)}
					className="flex flex-wrap"
				>
					<Input
						label="First Name"
						placeholder="Enter Your First Name"
						className={`${errors.firstName ? 'mb-1' : 'mb-4'}`}
						{...register('firstName', {
							required: 'First name is required',
							minLength: {
								value: 3,
								message:
									'First name must be at least 3 characters long',
							},
						})}
					/>
					{errors.firstName && (
						<p className="text-red-600 mb-4">
							{errors.firstName.message}
						</p>
					)}
					<Input
						label="First Name"
						placeholder="Enter Your Last Name"
						className={`${errors.lastName ? 'mb-1' : 'mb-4'}`}
						{...register('lastName', {
							required: 'Last name is required',
						})}
					/>
					{errors.lastName && (
						<p className="text-red-600 mb-4">
							{errors.lastName.message}
						</p>
					)}
					<Input
						label="Email"
						placeholder="Enter Your email address"
						className={`${errors.email ? 'mb-1' : 'mb-4'}`}
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email format',
							},
						})}
					/>
					{errors.email && (
						<p className="text-red-600 mb-4">
							{errors.email.message}
						</p>
					)}
					<Input
						label="User Name"
						placeholder="Enter User Name"
						className={`${errors.userName ? 'mb-1' : 'mb-4'}`}
						{...register('userName', {
							required: 'User name is required',
						})}
					/>
					{errors.userName && (
						<p className="text-red-600 mb-4">
							{errors.userName.message}
						</p>
					)}
					<SelectInput
						options={[
							{ text: 'User', value: 'user' },
							{ text: 'Admin', value: 'admin' },
						]}
						labelKey="text"
						valueKey="value"
						label="User Type"
						className={`${errors.userType ? 'mb-1' : 'mb-4'}`}
						{...register('userType', {
							required: 'User type is required',
						})}
					/>
					{errors.userType && (
						<p className="text-red-600 mb-4">
							{errors.userType.message}
						</p>
					)}
					<SelectInput
						options={[
							'Frontend Developer',
							'Backend Developer',
							'Architect',
							'UX Designer',
							'Project Manager',
						]}
						label="Job Profile"
						className={`${errors.jobProfile ? 'mb-1' : 'mb-4'}`}
						{...register('jobProfile', {
							required: 'Job profile is required',
						})}
					/>
					{errors.jobProfile && (
						<p className="text-red-600">
							{errors.jobProfile.message}
						</p>
					)}
					<Input
						label="Password"
						placeholder="Enter Password"
						className={`${errors.password ? 'mb-1' : 'mb-4'}`}
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message:
									'Password must be at least 6 characters',
							},
						})}
					/>
					{errors.password && (
						<p className="text-red-600 mb-4">
							{errors.password.message}
						</p>
					)}
					<Input
						label="Confirm Password"
						placeholder="Confirm Password"
						className={`${
							errors.confirmPassword ? 'mb-1' : 'mb-4'
						}`}
						{...register('confirmPassword', {
							required: 'Confirm Password is required',
							validate: (value) =>
								value === password || 'Passwords do not match',
						})}
					/>
					{errors.confirmPassword && (
						<p className="text-red-600 mb-4">
							{errors.confirmPassword.message}
						</p>
					)}
					<Button
						type="submit"
						bgColor={'bg-blue-500'}
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Loading...' : 'Sign Up'}
					</Button>
				</form>
			</div>
		</>
	);
}

export default SignUp;
