import jwt from "jsonwebtoken";
import { IUser } from '../interfaces/User.interfaces';

export const singToken = ({id,email,role,last,name}:IUser) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error(
			"Is not secret seed for json web token, check env variables"
		);
	}

	return jwt.sign(
		{
			id,
			email,
			role,
			last,
			name
		},
		process.env.JWT_SECRET_SEED,
		{ expiresIn: "30d" }
	);
};




export const isValidToken = (token: string): Promise<IUser> => {

	if (!process.env.JWT_SECRET_SEED) {
		throw new Error(
			"Is not secret seed for json web token, check env variables"
		);
	}

	if (token.length <= 10) {
		return Promise.reject("JWT is not valid");
	}

	return new Promise((resolve, reject) => {
		try {
			jwt.verify(
				token,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				process.env.JWT_SECRET_SEED!,
				(err: unknown, payload: any) => {
					if (err) return reject("JWT is not valid");

					resolve(payload);
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};
