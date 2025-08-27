import {CategoryDto} from '../../category/model/category';

export interface MaterialForm{
  nameMaterial: string;
  category: CategoryDto;
  isAvailable: boolean;
}
