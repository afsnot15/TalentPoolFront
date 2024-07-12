import { ESnackbarType } from '../enums/types/snackbar.enum';

export interface ISnackbarData {
  type: ESnackbarType;
  message: string;
}
