import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
	{
		label,
		type = 'text',
		invalid = false,
		invalidMsg = '',
		className = '',
		...props
	},
	ref
) {
	const id = useId();

	return (
		<div className={`w-full text-left ${className}`}>
			{label && (
				<label className="inline-block mb-1 pl-1" htmlFor={id}>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
				ref={ref}
				{...props}
				id={id}
			/>
			{invalid && <p className="text-red-600">{invalidMsg}</p>}
		</div>
	);
});

export default Input;
