type GetFirstKeyByPath<Path> =
	Path extends `${infer Key}.${infer Rest}`
		? Key
		: Path extends string
			? Path
			: never;

type GetPathWithoutFirstKey<Path> =
	Path extends `${infer Key}.${infer Rest}`
		? Rest
		: never;

type IsNever<T> = [T] extends [never] ? true : false;
type IsObject<T> = T extends Record<string | number | symbol, any> ? true : false;

export type SetProp<InitObject, Path extends string, Value, SetKeyName extends string | never = GetFirstKeyByPath<Path>, RestPath extends string | never = GetPathWithoutFirstKey<Path>> = {
	[Key in keyof InitObject]:
		Key extends SetKeyName
			? IsObject<InitObject[Key]> extends true
				? IsNever<RestPath> extends true
					? Value
					: SetProp<InitObject[Key], RestPath, Value>
				: Value
			: InitObject[Key]
} & {
	[Key in SetKeyName as Key extends keyof InitObject ? never : Key]:
		IsNever<RestPath> extends true
			? Value
			: SetProp<{}, RestPath, Value>
};
