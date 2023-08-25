export const errorMessage = {
  isNotEmpty(property: string): string {
    return `${property} - Não deve ser vazio`;
  },
  isString(property: string): string {
    return `${property} - Deverá ser do tipo String`;
  },
  minLength(property: string, value: number) {
    return `${property} - Deve conter no mínimo ${value} caracteres`;
  },
  maxLength(property: string, value: number) {
    return `${property} - Deve conter no máximo ${value} caracteres`;
  },
  isEmail(property: string) {
    return `${property} - Deve ser um e-mail válido`;
  },
};
