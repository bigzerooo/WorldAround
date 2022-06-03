export interface IValidationModel {
  isValid: () => boolean;
  message: () => string | null;
}
