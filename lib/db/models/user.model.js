import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	clerk_user_id: {
		type: String,
		required: true,
		unique: true,
	},
	bio: {
		type: String,
		required: false,
	},
	charts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Chart',
		},
	],
});

export const User = mongoose.models['Users'] || mongoose.model('Users', UserSchema);
