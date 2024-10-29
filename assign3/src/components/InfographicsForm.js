import React, {useState} from 'react';
import dayjs from 'dayjs';
import { TextField, Button, Container, Stack, Box } from '@mui/material';
import { Link } from "react-router-dom"
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function InfographicsForm() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState(dayjs())
	const [password, setPassword] = useState('')

	function handleSubmit(event) {
		event.preventDefault();
		// ...
		console.log(firstName, lastName, email, dateOfBirth, password) 
	}
	return (
		<>
			<h2>Form</h2>
			<form onSubmit={handleSubmit} action={<Link to="/login" />}>
				<Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
					<TextField
						type="text"
						variant='outlined'
						color='secondary'
						label="First Name"
						onChange={e => setFirstName(e.target.value)}
						value={firstName}
						fullWidth
						required
					/>
					<TextField
						type="text"
						variant='outlined'
						color='secondary'
						label="Last Name"
						onChange={e => setLastName(e.target.value)}
						value={lastName}
						fullWidth
						required
					/>
				</Stack>
				<TextField
					type="email"
					variant='outlined'
					color='secondary'
					label="Email"
					onChange={e => setEmail(e.target.value)}
					value={email}
					fullWidth
					required
					sx={{mb: 4}}
				/>
				<TextField
					type="password"
					variant='outlined'
					color='secondary'
					label="Password"
					onChange={e => setPassword(e.target.value)}
					value={password}
					required
					fullWidth
					sx={{mb: 4}}
				/>
				<Box sx={{mb: 4}}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['DateField']}>
							<DateField
								label="Date"
								value={dateOfBirth}
								onChange={(newValue) => setDateOfBirth(newValue)}
							/>
						</DemoContainer>
					</LocalizationProvider>
				</Box>
				<Button variant="outlined" color="secondary" type="submit">Register</Button>
			</form>
			<small>Already have an account? <Link to="/login">Login Here</Link></small>
		</>
	)
}
