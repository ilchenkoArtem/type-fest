import {expectTypeOf} from 'expect-type';
import {SetProp} from '../index';

interface ApiResponse {
	key1_1: {
		key2_1: string;
		key2_2: {
			key3_1: string;
		};
	};
	array1_2: string[];
}

type AddNewTypeToFirstLevelResult = ApiResponse & {
	setKey1: number;
};
expectTypeOf<SetProp<ApiResponse, 'setKey1', number>>().toEqualTypeOf<AddNewTypeToFirstLevelResult>();

type AddNewTypeToThirdLevelResult = ApiResponse & {
	setKey1: {
		setKey2: {
			setKey3: number;
		};
	};
};
expectTypeOf<SetProp<ApiResponse, 'setKey1.setKey2.setKey3', number>>().toEqualTypeOf<AddNewTypeToThirdLevelResult>();

interface AddNewTypeToCurrentSecondLevelResult {
	key1_1: {
		key2_1: string;
		key2_2: {
			key3_1: string;
		};
		key2_3: number;
	};
	array1_2: string[];
}
expectTypeOf<SetProp<ApiResponse, 'key1_1.key2_3', number>>().toEqualTypeOf<AddNewTypeToCurrentSecondLevelResult>();

interface AddNewDeepKeyToCurrentSecondLevelResult {
	key1_1: {
		key2_1: string;
		key2_2: {
			key3_1: string;
		};
		key2_3: {
			key3_1: number;
		};
	};
	array1_2: string[];
}
expectTypeOf<SetProp<ApiResponse, 'key1_1.key2_3.key3_1', number>>().toEqualTypeOf<AddNewDeepKeyToCurrentSecondLevelResult>();

type UpdateFirstLevelKeyResult = {
	key1_1: number;
	array1_2: string[];
};
expectTypeOf<SetProp<ApiResponse, 'key1_1', number>>().toEqualTypeOf<UpdateFirstLevelKeyResult>();

type UpdateSecondLevelKeyResult = {
	key1_1: {
		key2_1: string;
		key2_2: number;
	};
	array1_2: string[];
};
expectTypeOf<SetProp<ApiResponse, 'key1_1.key2_2', number>>().toEqualTypeOf<UpdateSecondLevelKeyResult>();
