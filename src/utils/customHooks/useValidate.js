import { useState, useEffect } from 'react';

const useValidationFilter = (value, validations) => {
	const [isEmpty, setIsEmpty] = useState(true);
	const [isEmail, setIsEmail] = useState(false);
	const [minLengthError, setMinLengthError] = useState(false);
	const [buttonValid, setButtonValid] = useState(true);

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					value.length < validations[validation]
						? setMinLengthError(
								`The field must contains minimum ${validations[validation]} characters`
						  )
						: setMinLengthError(false);
					break;
				case 'isEmpty':
					value ? setIsEmpty(false) : setIsEmpty('The field can not be empty!');
					break;
				case 'isEmail':
					const reg =
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					reg.test(String(value).toLowerCase())
						? setIsEmail(false)
						: setIsEmail('The email is not valid!!');

					break;

				default:
					return null;
			}
		}
	}, [value, validations]);

	useEffect(() => {
		if (isEmpty || isEmail || minLengthError) {
			setButtonValid(true);
		} else {
			setButtonValid(false);
		}
	}, [isEmpty, isEmail, minLengthError]);

	return [{ buttonValid }, { isEmpty }, { minLengthError }, { isEmail }];
};

const useValidate = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue);
	const [isDirty, setIsDirty] = useState(false);

	const validate = useValidationFilter(value, validations);

	const onChange = ({ target: { value } }) => {
		setValue(value);
	};

	const onBlur = (event) => {
		setIsDirty(true);
	};

	const [buttonValid] = validate.map((settings) => settings.buttonValid);

	return {
		value,
		isDirty,
		onChange,
		onBlur,
		validate,
		buttonValid,
	};
};

export default useValidate;
