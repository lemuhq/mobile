export type LoginUser = {
	token: string;
	user: {
		email: string;
		firstName: string;
		id: string;
		lastName: string;
	};
};

type Device = {
	userAgent: string;
	ipAddress: string;
	lastUsed: string;
	_id: string;
};

export type User = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	transactionPin: string;
	lockPin: string;
	gender: string;
	enrollmentBank: string;
	enrollmentBranch: string;
	lgaOfOrigin: string;
	lgaOfResidence: string;
	maritalStatus: string;
	nationality: string;
	residentialAddress: string;
	stateOfOrigin: string;
	stateOfResidence: string;
	image: string;
	accountNumber: string;
	accountName: string;
	accountId: string;
	externalReference: string;
	bvn: string;
	nin: string;
	accountType: string;
	accountBalance: number;
	loginAttempts: number;
	twoFactorEnabled: boolean;
	accountStatus: string;
	blockAccount: boolean;
	isDeleted: boolean;
	knownDevices: Device[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	lastLogin: string;
	lockUntil: string | null;
};
