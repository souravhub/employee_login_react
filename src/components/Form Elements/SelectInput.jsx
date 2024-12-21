import React, { useId } from 'react';

function SelectInput(
	{
		options,
		label,
		invalid = false,
		invalidMsg = '',
		labelKey = '',
		valueKey = '',
		className,
		...props
	},
	ref
) {
	const id = useId();
	return (
		<div className={`w-full text-left ${className}`}>
			{label && (
				<label htmlFor={id} className="inline-block mb-1 pl-1">
					{label}
				</label>
			)}
			<select
				{...props}
				id={id}
				ref={ref}
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
			>
				{options?.map((option) => (
					<option
						key={valueKey ? option[valueKey] : option}
						value={valueKey ? option[valueKey] : option}
					>
						{labelKey ? option[labelKey] : option}
					</option>
				))}
			</select>
			{invalid && <p className="text-red-600">{invalidMsg}</p>}
		</div>
	);
}

export default React.forwardRef(SelectInput);
