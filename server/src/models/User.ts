import {Schema, model, Model, Document } from 'mongoose';
import { Password } from '../services/password';


interface IUserAttrs {
	email: string;
	password: string;
	last: string;
	name: string;
	role: string,
}

interface IUserModel extends Model<IUserDoc> {
	build(attrs: IUserAttrs): IUserDoc;
}

interface IUserDoc extends Document {
	email: string;
	password: string;
	last: string;
	name: string;
	role: string;
}

const usersSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	last: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
        default: 'admin'
	},

},{
	timestamps: true,
	toJSON: {
		transform(doc,ret) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.password;
			delete ret.__v;
		}
	}
});

usersSchema.pre('save', async function(done){
	if(this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password',hashed);
	}
	done();
});

usersSchema.statics.build = (attrs: IUserAttrs) => {
	return new User(attrs);
}

const User = model<IUserDoc, IUserModel>('User',usersSchema);

export { User };