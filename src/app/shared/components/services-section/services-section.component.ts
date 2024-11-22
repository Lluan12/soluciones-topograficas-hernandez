import { Component, signal } from '@angular/core';
import { CardSolutionComponent } from '../card-solution/card-solution.component';
import { Solution } from '../../model/solution.model';

@Component({
	selector: 'app-services-section',
	imports: [CardSolutionComponent],
	templateUrl: './services-section.component.html',
	styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent {
	solutions = signal<Solution[]>([
		{
			id: '1',
			image: 'images/levantamiento-topografico.png',
			title: 'Levantamientos Topográficos',
			description: 'Generación de planos y modelos precisos del terreno',
		},
		{
			id: '2',
			image: 'images/lotificacion.png',
			title: 'Delimitación, Subdivisión, Lotificación de terrenos',
			description:
				'Establecimiento de límites y fraccionamiento de terrenos',
		},
		{
			id: '3',
			image: 'images/replanteo.png',
			title: 'Nivelación y Replanteos',
			description: 'Aseguramos niveles exactos para construcciones',
		},
		{
			id: '4',
			image: 'images/calculo-volumen.png',
			title: 'Calculo de Volumenes',
			description: 'Determinación precisa de movimientos de tierra',
		},
		{
			id: '5',
			image: 'images/geometrico-1.png',
			title: 'Proyectos Geometricos',
			description: 'Diseño de curvas y trazos en proyectos urbanísticos',
		},
		{
			id: '6',
			image: 'images/lineas-control.png',
			title: 'Lineas de Control',
			description: 'Referencias para el desarrollo de obras',
		},
	]);
}