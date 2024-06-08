import { Injectable } from '@angular/core';
import { ColorRange } from 'src/app/models/color-range.model';
import { ProjectService } from '../project/project.service';
import { Project } from 'src/app/models/project.model';
import { CardMetricsColors } from 'src/app/models/card-metrics-colors.model';
import { ColorRangeAPIService } from '../api/colorRange/colorRange.api.service';
import { ProjectAPIService } from '../api/project/project.api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorDefinerService {

  public colorRanges!: ColorRange[];

  metrics = ['releaseFrequency', 'leadTime', 'timeToRepair', 'bugIssuesRate'];

  // Códigos de colores para cada rango. En caso de que dos proyectos coincidan, se asignará un
  // color más oscuro al proyecto secundario
  mainGreen: string = '#07de00';
  sideGreen: string = '#076e03';

  mainYellow: string = '#fffb00';
  sideYellow: string = '#ffc800';

  mainRed: string = '#ff0000';
  sideRed: string= '#940404';

  constructor(private projectService: ProjectService,
              private projectAPIService: ProjectAPIService,
              private colorRangeAPIService: ColorRangeAPIService
  ) { }

  /**
   * Establece los rangos de valores que pertenecen a cada color para cada métrica
   */
  public async defineColorRanges(): Promise<void> {
    const data = await this.colorRangeAPIService.getAllRanges().toPromise();
    this.colorRanges = this.mapRangeObject(data as any[]);
    // const projects = this.projectService.getAllProjects();

    // this.metrics.forEach(metric => {
    //   // Extraer todos los valores de la métrica actual de los proyectos
    //   const values = projects.map(project => project[metric as keyof Project] as number);
    //   values.sort((a, b) => a - b); // Ordenar valores para calcular percentiles
  
    //   // Calcular percentiles
    //   const lowPercentileIndex = Math.floor(values.length / 3);
    //   const highPercentileIndex = Math.ceil(2 * values.length / 3);
  
    //   // Crear ColorRange para la métrica actual
    //   this.colorRanges.push({
    //     metric: metric,
    //     green: { start: values[highPercentileIndex] + 0.01, end: Math.max(...values) },
    //     yellow: { start: values[lowPercentileIndex]+ 0.01, end: values[highPercentileIndex] },
    //     red: { start: Math.min(...values), end: values[lowPercentileIndex] }
    //   });
    // });
  }

  private mapRangeObject(data: any[]) {
    let parsedRanges : ColorRange[] = [];
    data.forEach(range => {
      const greenParts = range.green.split(',').map((s: string) => parseFloat(s.trim()));
      const yellowParts = range.yellow.split(',').map((s: string) => parseFloat(s.trim()));
      const redParts = range.red.split(',').map((s: string) => parseFloat(s.trim()));

      let newRange: ColorRange = {
          metric: range.metric,
          green: { start: greenParts[0], end: greenParts[1] },
          yellow: { start: yellowParts[0], end: yellowParts[1] },
          red: { start: redParts[0], end: redParts[1] }
      };
      parsedRanges.push(newRange);
    });
    return parsedRanges;
  }

  /**
   * Obtiene el color con el que representar la barra del gráfico para una métrica y uno o dos proyectos
   * @param metric, métrica a representar 
   * @param mainProjectName, nombre del proyecto principal a representar 
   * @param sideProjectName, opcional, nombre del proyecto secundario a representar 
   * @returns Object, con los códigos de color en hexadecimal para el proyecto principal o para ambos proyectos
   */
  public async getBarColorCode(metric: string, mainProjectName: string, sideProjectName?: string){
    await this.defineColorRanges();
    // Obtenemos los rangos de colores de la métrica especificada
    const range = this.colorRanges.filter((item) => item.metric === metric)[0];

    const mainProject = await firstValueFrom(this.projectAPIService.getProjectByName(mainProjectName));
    const mainProjectMetricValue = mainProject[metric as keyof Project] as number;
    const mainProjectColorCode = this.checkValueInterval(range, mainProjectMetricValue);

    // Comprobamos si hay que definir el color del proyecto secundario
    if (sideProjectName){
      const sideProject = await firstValueFrom(this.projectAPIService.getProjectByName(sideProjectName));
      const sideProjectMetricValue = sideProject[metric as keyof Project] as number;

      // Llamamos al método auxiliar que saca el código del color según a que intervalo pertenece
      // En este caso, indicamos que este es el proyecto secundario para que devuelva un código más oscuro
      const sideProjectColorCode = this.checkValueInterval(range, sideProjectMetricValue, true);
      // Devolvemos un Object con los dos códigos
      return {mainProjectColorCode: mainProjectColorCode, sideProjectColorCode: sideProjectColorCode};
    } else {
      return {mainProjectColorCode: mainProjectColorCode};
    }
  }

  /**
   * Obtiene los colores que se mostrarán en los iconos de las métricas en las tarjetas del inicio
   * @param project, objeto Project del cual se obtendrán sus colores 
   * @returns Object con el nombre, el título y los códigos de color de cada métrica del proyecto
   */
  public async getMetricsCardColor(project: Project){
    await this.defineColorRanges();
    // Obtenemos los colorRange de cada métrica y su código de color
    const releaseFreqRange = this.colorRanges.find( item => item.metric == "releaseFrequency");
    const releaseFreqCode = this.checkValueInterval(releaseFreqRange as ColorRange,  project.releaseFrequency as number);

    const timeToRepairRange = this.colorRanges.find( item => item.metric == "timeToRepair");
    const timeToRepairCode = this.checkValueInterval(timeToRepairRange as ColorRange,  project.timeToRepair as number);

    const leadTimeRange = this.colorRanges.find( item => item.metric == "leadTime");
    const leadTimeCode = this.checkValueInterval(leadTimeRange as ColorRange,  project.leadTime as number);

    const bugIssuesRateRange = this.colorRanges.find( item => item.metric == "bugIssuesRate");
    const bugIssuesRateCode = this.checkValueInterval(bugIssuesRateRange as ColorRange,  project.bugIssuesRate as number);

    return { projectName: project.name, projectTitle: project.title, releaseFreqCode: releaseFreqCode, timeToRepairCode: timeToRepairCode, 
             bugIssuesRateCode: bugIssuesRateCode, leadTimeCode: leadTimeCode} as CardMetricsColors
    
  }

  /**
   * Obtiene el código de color de un valor de una métrica en función de a qué rango pertenece
   * @param range, tipo ColorRange, rangos de color para una métrica en concreto
   * @param projectMetricValue, number, valor de la métrica del proyecto que se quiere comprobar 
   * @param isSideProject, opcional, booleano, indica si se deben tomar los tonos oscuros, ya que se trata de un
   *                       proyecto secundario
   * @returns string, código de color correspondiente al valor indicado
   */
  private checkValueInterval(range: ColorRange, projectMetricValue: number, isSideProject:  boolean = false): string{
    if (projectMetricValue < 0.01){
      return isSideProject ? "#5c5c5c" : "#828282"; // sideGrey, mainGrey
    } else if (projectMetricValue >= range.green.start && projectMetricValue < range.green.end) {
      return isSideProject ? '#076e03' : '#07de00'; // sideGreen, mainGreen
    } else if (projectMetricValue >= range.yellow.start && projectMetricValue < range.yellow.end) {
      return isSideProject ? '#ffc800' : '#fffb00'; // sideYellow, mainYellow
    } else {
      return isSideProject ? '#940404' : '#ff0000'; // sideRed, mainRed
    }
  }
}
