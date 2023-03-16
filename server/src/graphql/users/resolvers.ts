
import { isValidToken, singToken } from '../../services/jwt';
import { MyContext } from '../../app';
import { IUser } from '../../interfaces/User.interfaces';
import { User } from '../../models/User';




 export const userResolvers = {
  Query: {
    users: async (_:any,_arg:any,{token}:MyContext) => {
		if(!token) throw new Error('Action not allowed');
		return await User.find({});
	}
  },
  Mutation: {
	addUser: async (
		_:any,
		{
			name,
			last, 
			email, 
			password,
			role = "user"
		}:IUser):Promise<string> => {

				const foundUser = await User.findOne({email});

				if(foundUser) throw new Error('This Email already exists');

				const newUser = User.build({
					name,
					last,
					email,
					password,
					role
				});

				newUser.save();

				const token = singToken(
						newUser.id,
						newUser.email, 
						newUser.role
					);

				return token;
		},

		updateUser: async (
			_:any,
			{
				name,
				last,
				email,
				role}:IUser,
				{token}:MyContext
			) => {
			
				if(!token) throw new Error('Action not allowed');

				let user:IUser | null = null;

				try {
					user = await isValidToken(token);
				} catch (error) {
					throw new Error("Token are no valid");
				}

				const updatedUser = await User.findByIdAndUpdate(user.id,{
					name,
					last,
					email,
					role
				},{
					new: true
				});

				if(!updatedUser) throw new Error('User not found');
				return updatedUser;
		},

		deleteUser: async (
				_:any,
				{id}:IUser,
				{token}:MyContext
			):Promise<IUser> => {
			
				if(!token) throw new Error('This action is not allowed');

				let user:IUser | null = null;

				try {
					user = await isValidToken(token);
				} catch (error) {
					throw new Error("Token are no valid");
				}

				if(user?.role !== "admin") throw new Error("This action is not allowed")

				const foundUser = await User.findById(id);

				if(!foundUser) throw Error('User not found');
				
				
				const deletedUser = await User.findByIdAndDelete(id);

				if(!deletedUser) throw new Error('User not found');
				return deletedUser;
		}

  	},
};

