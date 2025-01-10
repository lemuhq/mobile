import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const KeyboardAvoidingViewContainer = ({ children }) => {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoidingViewContainer;
