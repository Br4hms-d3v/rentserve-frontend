import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchMaterialFilter'
})
export class SearchMaterialPipe implements PipeTransform {

  // The 'transform' method is called when we use the pipe in a template
  transform(value: any, args?: any): any {

    // If 'value' is empty or null, return null (no change)
    if (!value) {
      return null;
    }

    // If no 'args' are provided, return the original 'value' (no filter)
    if (!args) {
      return value;
    }

    // Convert 'args' to lowercase to make the search case-insensitive
    args = args.toLowerCase();

    // Use the filter method to go through each 'item' in the 'value'
    return value.filter(function (item: any) {

      // Convert each 'item' to a string and make it lowercase, then check if it includes 'args'
      // If 'args' is found inside 'item', this item will stay in the filtered list
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
