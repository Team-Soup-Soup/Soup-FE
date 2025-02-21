export type FormItem = 'NAME' | 'ID' | 'EMAIL' | 'PW';

export type FormField = {
  label: string;
  placeholder: string;
  description: string | null;
  button: string | null;
};
