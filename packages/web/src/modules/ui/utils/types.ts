export type ButtonVariant = 'full' | 'outlined' | 'ghost' | 'light';

export type WithScreen<T extends string> = T | `screen-${T}`;

export type Size = WithScreen<'xs' | 'sm' | 'md' | 'lg' | 'xl' | `${number}xl`>;
