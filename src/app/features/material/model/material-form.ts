import {CategoryForm} from '../../category/model/categoryForm';

export interface MaterialForm{
  nameMaterial: string;
  category: CategoryForm;
  isAvailable: boolean;
}
