import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { M_ADD_PRODUCT } from "../../graphql/mutations";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import UploadFiles from "../UploadFiles/UploadFiles";
import { IProduct } from '../../interfaces/Product.interfaces';

const steps = [
	{
		label: 'Create Product',
		content: `create`,
	},
	{
		label: 'Upload image',
		content: 'upload',
	},
];

interface FormData {
	formValue: {
		description: string;
		img: string;
		price: string;
		qty: string;
		sizes: string[];
		sku: string;
		slug: string;
		title: string;
	};
}

interface Props {
	setOpen: (value: React.SetStateAction<boolean>) => void
}


const CreateProduct = ({ setOpen }: Props) => {
	const [notification, setNotification] = useState({ open: false, message: "", error: false });
	const [product, setProduct] = useState<IProduct | null>(null);

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			formValue: {
				description: "",
				img: "",
				price: "",
				qty: "",
				sizes: [],
				sku: "",
				slug: "",
				title: "",

			},
		},
	});

	const [addProduct, { loading }] = useMutation(M_ADD_PRODUCT, {
		onCompleted({ addProduct }) {
			setProduct(addProduct);
			handleNext();
		},
		onError(error) {
			setNotification({
				open: true,
				message: error.message,
				error: true,
			})
		},
	});

	const handleOnSubmit = async ({ formValue }: FormData) => {

		const {
			description,
			img,
			price,
			qty,
			sku,
			title,
		} = formValue;

		const setSlug = title.replaceAll(" ", "-").toLocaleLowerCase();

		addProduct({
			variables: {
				description,
				img,
				price,
				qty,
				sku,
				title,
				slug: setSlug,
			}
		});
	};

	return (
		<>

			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((step, index) => (
					<Step key={step.label}>
						<StepLabel
							optional={
								index === 2 ? (
									<Typography variant="caption">Last step</Typography>
								) : null
							}
						>
							{step.label}
						</StepLabel>
						{step.content === 'create' &&
							<StepContent>
								<form onSubmit={handleSubmit(handleOnSubmit)}>
									<Box padding={1}>
										<TextField
											id="title"
											label="title"
											variant="outlined"
											type="title"
											placeholder="title"
											fullWidth
											{...register("formValue.title", {
												required: "The title field are required",
											})}
											error={!!errors.formValue?.title}
											helperText={
												errors.formValue?.title?.message
											}
										/>
									</Box>
									<Box padding={1}>
										<TextField
											id="description"
											label="description"
											variant="outlined"
											type="description"
											fullWidth
											autoComplete="description"
											placeholder="description"
											{...register("formValue.description", {
												required:
													"The description field are required",
											})}
											error={!!errors.formValue?.description}
											helperText={
												errors.formValue?.description?.message
											}
										/>
									</Box>
									<Box padding={1}>
										<TextField
											id="price"
											label="price"
											variant="outlined"
											type="price"
											fullWidth
											autoComplete="price"
											placeholder="price"
											{...register("formValue.price", {
												required:
													"The price field are required",
											})}
											error={!!errors.formValue?.price}
											helperText={
												errors.formValue?.price?.message
											}
										/>
									</Box>
									<Box padding={1}>
										<TextField
											id="qty"
											label="qty"
											variant="outlined"
											type="qty"
											fullWidth
											autoComplete="qty"
											placeholder="qty"
											{...register("formValue.qty", {
												required:
													"The qty field are required",
											})}
											error={!!errors.formValue?.qty}
											helperText={
												errors.formValue?.qty?.message
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
												Continue
											</LoadingButton>
										) : (
											<Button
												variant="contained"
												type="submit"
												color="secondary"
												fullWidth
											>
												Continue
											</Button>
										)}
										<Button
											sx={{ mt: 1 }}
											onClick={() => setOpen(false)}
											variant="contained"
											color="primary"
											fullWidth
										>
											Cancel
										</Button>
										{index !== 0 &&
											<Button
												disabled={index === 0}
												variant="contained"
												onClick={handleBack}
												fullWidth
											>
												Back
											</Button>
										}

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
							</StepContent>
						}
						{step.content === 'upload' &&
							<StepContent>
								<UploadFiles handleNext={handleNext} product={product} />
								<Box sx={{ mb: 2 }}>
									<div>
										<Button
											disabled={index === 0}
											onClick={handleBack}
											sx={{ mt: 1, mr: 1 }}
										>
											Back
										</Button>
									</div>
								</Box>
							</StepContent>
						}

					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button onClick={() => setOpen(false)} sx={{ mt: 1, mr: 1 }}>
						I Done
					</Button>
				</Paper>
			)}

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
		</>
	);
}

export default CreateProduct;