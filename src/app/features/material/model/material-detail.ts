import {CategoryDto} from '../../category/model/category';

export interface MaterialDetailDto {
  id: number;
  nameMaterial: string;
  isAvailable: boolean;
  category: CategoryDto
}
