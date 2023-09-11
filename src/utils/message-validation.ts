export const isNotEmpty = (property: string): string => {
  return `${property} - Não deve ser vazio`;
};
export const isString = (property: string): string => {
  return `${property} - Deverá ser do tipo String`;
};
export const minLength = (property: string, value: number): string => {
  return `${property} - Deve conter no mínimo ${value} caracteres`;
};
export const maxLength = (property: string, value: number): string => {
  return `${property} - Deve conter no máximo ${value} caracteres`;
};
export const isEmail = (property: string): string => {
  return `${property} - Deve ser um e-mail válido`;
};
export const isUrl = (property: string): string => {
  return `${property} - Deve ser uma URL válida`;
};
export const isStatus = (): string => {
  return `status - deve ser apenas: PENDING, POSITIVE, NEGATIVE`;
};
