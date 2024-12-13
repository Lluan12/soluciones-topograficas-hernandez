import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../shared/services/projects.service';
import { Project } from '../../shared/model/project.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
	selector: 'app-project-section',
	imports: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './project-section.component.html',
	styleUrl: './project-section.component.css',
})
export class ProjectSectionComponent implements OnInit {
	private router = inject(ActivatedRoute);
	private projectService = inject(ProjectsService);
	id: string = '';
	project = signal<Project>({
		title: '',
		description: '',
		created: Timestamp.now(),
		images: [],
	});

	constructor() {
		this.router.params.subscribe((params) => {
			this.id = params['id'];
		});

		this.getData();
	}

	ngOnInit(): void {
		this.customSwiper();
	}

	customSwiper() {
		const swiperEl = document.querySelector('swiper-container');

		const params = {
			injectStyles: [
				`
		.swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
    }

	.swiper-pagination-bullet-active {
        color: #fff;
        background: #000;
    }
    `,
			],
			pagination: {
				clickable: true,
				renderBullet: function (index: number, className: string) {
					return (
						'<span class="' +
						className +
						'">' +
						(index + 1) +
						'</span>'
					);
				},
			},
			navigator: {},
		};

		Object.assign(swiperEl!, params);
		swiperEl!.initialize();
	}

	async getData() {
		try {
			const data = await this.projectService.getProjectById(this.id);
			this.project.set(data);
		} catch (error) {
			console.log(error);
		}
	}
}
