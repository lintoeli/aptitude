import { Injectable } from '@angular/core';
import { ColorRange } from 'src/app/models/color-range.model';
import { ProjectService } from '../project/project.service';
import { Project } from 'src/app/models/project.model';
import { CardMetricsColors } from 'src/app/models/card-metrics-colors.model';

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

  constructor(private projectService: ProjectService) { }

  public defineColorRanges() {
    this.colorRanges = [];
    const projects = this.projectService.getAllProjects();

    this.metrics.forEach(metric => {
      // Extraer todos los valores de la métrica actual de los proyectos
      const values = projects.map(project => project[metric as keyof Project] as number);
      values.sort((a, b) => a - b); // Ordenar valores para calcular percentiles
  
      // Calcular percentiles
      const lowPercentileIndex = Math.floor(values.length / 3);
      const highPercentileIndex = Math.ceil(2 * values.length / 3);
  
      // Crear ColorRange para la métrica actual
      this.colorRanges.push({
        metric: metric,
        green: { start: values[highPercentileIndex] + 0.01, end: Math.max(...values) },
        yellow: { start: values[lowPercentileIndex]+ 0.01, end: values[highPercentileIndex] },
        red: { start: Math.min(...values), end: values[lowPercentileIndex] }
      });
    });
  }

  public getBarColorCode(metric: string, mainProjectName: string, sideProjectName?: string){
    this.defineColorRanges();
    const range = this.colorRanges.filter((item) => item.metric === metric)[0];

    const mainProject = this.projectService.findOneProjectByName(mainProjectName);
    const mainProjectMetricValue = mainProject[metric as keyof Project] as number;
    const mainProjectColorCode = this.checkValueInterval(range, mainProjectMetricValue);

    if (sideProjectName){
      const sideProject = this.projectService.findOneProjectByName(sideProjectName);
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

  public getMetricsCardColor(project: Project){
    // Obtenemos los colorRange de cada métrica y su código de color
    const releaseFreqRange = this.colorRanges.find( item => item.metric == "releaseFrequency");
    const releaseFreqCode = this.checkValueInterval(releaseFreqRange as ColorRange,  project.releaseFrequency as number);

    const timeToRepairRange = this.colorRanges.find( item => item.metric == "timeToRepair");
    const timeToRepairCode = this.checkValueInterval(timeToRepairRange as ColorRange,  project.timeToRepair as number);

    const leadTimeRange = this.colorRanges.find( item => item.metric == "leadTime");
    const leadTimeCode = this.checkValueInterval(leadTimeRange as ColorRange,  project.leadTime as number);

    const bugIssuesRateRange = this.colorRanges.find( item => item.metric == "bugIssuesRate");
    const bugIssuesRateCode = this.checkValueInterval(bugIssuesRateRange as ColorRange,  project.bugIssuesRate as number);

    return { project: project.name, releaseFreqCode: releaseFreqCode, timeToRepairCode: timeToRepairCode, 
             bugIssuesRateCode: bugIssuesRateCode, leadTimeCode: leadTimeCode} as CardMetricsColors
    
  }

  private checkValueInterval(range: ColorRange, projectMetricValue: number, isSideProject:  boolean = false): string{
    if (projectMetricValue >= range.green.start) {
      return isSideProject ? '#076e03' : '#07de00'; // sideGreen, mainGreen
    } else if (projectMetricValue >= range.yellow.start && projectMetricValue < range.yellow.end) {
      return isSideProject ? '#ffc800' : '#fffb00'; // sideYellow, mainYellow
    } else {
      return isSideProject ? '#940404' : '#ff0000'; // sideRed, mainRed
    }
  }
}
