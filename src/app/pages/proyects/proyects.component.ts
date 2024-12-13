import { Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Project } from '../../shared/model/project.model';
import { ProjectsService } from '../../shared/services/projects.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
	selector: 'app-proyects',
	imports: [NgClass, MatProgressSpinnerModule],
	templateUrl: './proyects.component.html',
	styleUrl: './proyects.component.css',
})
export class ProyectsComponent implements OnInit {
	private projectService = inject(ProjectsService);
	private router = inject(Router);
	private dialog = inject(MatDialog);
	private authenticationService = inject(AuthenticationService);
	privateMode = signal<boolean>(false);
	projects = signal<Project[]>([]);
	
	ngOnInit(): void {
		this.getStateAuth();
		this.getAllProjects();
	}

	getAllProjects() {
		this.projectService.getProjects().subscribe((projects) => {
			this.projects.set(projects);
		});
	}

	getStateAuth() {
		this.authenticationService.stateAuth.subscribe((user) => {
			if (!user) this.privateMode.set(false);
			else this.privateMode.set(true);
		});
	}

	showMore(id: string) {
		this.router.navigate(['projects', id]);
	}

	openModal() {
		const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
		buttonElement.blur();
		this.dialog.open(ModalComponent, {
			width: '800px',
			height: '550px',
		});
	}

	async delete(id: string): Promise<void> {
		const result = await Swal.fire({
			titleText: '¿Estas seguro de eliminar este elemento?',
			icon: 'warning',
			confirmButtonColor: '#1976D2',
			cancelButtonColor: '#d33',
			iconColor: '#d33',
			confirmButtonText: 'Aceptar',
			showCancelButton: true,
		})
		if(result.isConfirmed)
		this.projectService.deleteProject(id);
	}
}
