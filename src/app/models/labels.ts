export const TYPE_OF_SKINS = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc'];
export interface SkinDate {
  lesion_id: string;
  image_id: string;
  dx: string;
  dx_type: string;
  age: number;
  sex: string;
  localization: string;
}
