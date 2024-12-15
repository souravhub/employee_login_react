import React from 'react';
import { Input, Button } from '../index';
import { useForm } from 'react-hook-form';

function SignUp() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm();

	const submit = async function (data) {
		await new Promise((resolve) => setTimeout(resolve, 5000));
		console.log('submitting form', data);
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
						label="First Name :"
						placeholder="Enter Your First Name"
						className="mb-4"
						{...register('firstName', {
							required: true,
							minLength: {
								value: 3,
								message:
									'First name must be at least 3 characters long',
							},
						})}
					/>
					{errors.firstName && (
						<p className="text-red-600">
							{errors.firstName.message}
						</p>
					)}
					<Input
						label="First Name :"
						placeholder="Enter Your Last Name"
						className="mb-4"
						{...register('lastName', { required: true })}
					/>
					<Input
						label="User Name :"
						placeholder="Enter User Name"
						className="mb-4"
						{...register('userName', { required: true })}
					/>
					<Input
						label="Password :"
						placeholder="Enter Password"
						className="mb-4"
						{...register('password', { required: true })}
					/>
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
