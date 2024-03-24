import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(array: any[], text: string): any[] {
    if (text === null || text === ''){
      return array;
    } else {
      
      return array.filter(project =>{
        return project.title.toLowerCase().includes(text.toLowerCase());
      });

    }
  }

}
