import Paper from '@mui/material/Paper';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from '@mui/material/Typography';
import { validation } from '../utils';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { M_ADD_USER } from '../graphql/mutations';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface FormData {
	formValue: {
		email: string;
		password: string;
		name: string;
		last: string;
	};
}

const CardLogin = styled(Paper)(({ theme }: { theme: Theme }): CSSObject => ({
	width: 400,
	height: "auto",
	padding: 10,
}));

const Main = styled(Paper)(({ theme }: { theme: Theme }): CSSObject => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	height: "100vh",
	background: theme.palette.primary.main
}));

const Copy = styled("div")`
	display: flex;
	padding: 10px;
`;


const RegisterPage = () => {
	const navigation = useNavigate();
	const [notification, setNotification] = useState({ open: false, message: "" })

	const [addUser, { loading }] = useMutation(M_ADD_USER, {
		onCompleted(data) {
			const { addUser } = data;
			localStorage.setItem('token', addUser);
			navigation("/home");
		},
		onError(error) {
			setNotification({
				open: true,
				message: error.message
			})
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			formValue: {
				email: "",
				password: "",
				name: "",
				last: ""
			},
		},
	});

	const handleOnSubmit = async ({ formValue }: FormData) => {
		const { email, password, name, last } = formValue;
		addUser({
			variables: {
				email,
				password,
				name,
				last
			}
		});

		reset();
	};

	return (<Main>
		<CardLogin>
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<Box padding={1}>
					<Typography variant="h2" component="h2">
						Sign Up
					</Typography>
				</Box>
				<Box padding={1}>
					<TextField
						id="name"
						label="name"
						variant="outlined"
						type="text"
						placeholder="Name"
						fullWidth
						{...register("formValue.name", {
							required:
								"The name field are required",
						})}
						error={!!errors.formValue?.name}
						helperText={
							errors.formValue?.name?.message
						}
					/>
				</Box>
				<Box padding={1}>
					<TextField
						id="last"
						label="last"
						variant="outlined"
						type="text"
						placeholder="Last"
						fullWidth
						{...register("formValue.last", {
							required:
								"The last field are required",
						})}
						error={!!errors.formValue?.name}
						helperText={
							errors.formValue?.name?.message
						}
					/>
				</Box>
				<Box padding={1}>
					<TextField
						id="email"
						label="email"
						variant="outlined"
						type="email"
						placeholder="Email"
						fullWidth
						{...register("formValue.email", {
							required:
								"The email field are required",
							validate: validation.isEmail,
						})}
						error={!!errors.formValue?.email}
						helperText={
							errors.formValue?.email?.message
						}
					/>
				</Box>
				<Box padding={1}>
					<TextField
						id="password"
						label="password"
						variant="outlined"
						type="password"
						fullWidth
						autoComplete="password"
						placeholder="Password"
						{...register("formValue.password", {
							required:
								"The password field are required",
						})}
						error={!!errors.formValue?.password}
						helperText={
							errors.formValue?.password
								?.message
						}
					/>
				</Box>
				<Box padding={1}>
					{loading ? (
						<LoadingButton
							fullWidth
							loading
							loadingPosition="start"
							variant="contained"
							color="secondary"
						>
							Sing Up
						</LoadingButton>
					) : (
						<Button
							variant="contained"
							type="submit"
							color="secondary"
							fullWidth
						>
							Sing Up
						</Button>
					)}
				</Box>
				<Box
					sx={{
						py: 2,
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
				</Box>
			</form>
		</CardLogin>
		<Copy>
			<Typography
				variant="body1"
				component="p"
				sx={{
					color: "white",
					marginRight: 2,
					fontSize: 16,
				}}
			>
				An account already
			</Typography>
			<Link
				style={{ color: 'white' }}
				to={"/login"}>
				Sign In
			</Link>
		</Copy>
		<Snackbar
			open={notification.open}
			autoHideDuration={6000}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			onClose={() => setNotification(old => ({ ...old, open: false }))}
		>
			<Alert severity="error" variant="filled" sx={{ width: "100%" }}>
				{`${notification.message} please try some other email or contact
				the app manager.`}
			</Alert>
		</Snackbar>
	</Main>
	);
}

export default RegisterPage;