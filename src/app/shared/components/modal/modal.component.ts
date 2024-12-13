import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
	ReactiveFormsModule,
	Validators,
	FormGroup,
	FormBuilder,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import Swal from 'sweetalert2';
import { ImagesService } from '../../services/images.service';
import { ProjectsService } from '../../services/projects.service';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
	selector: 'app-modal',
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule
	],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
	private dialogRef = inject(MatDialogRef);
	private formBuilder = inject(FormBuilder);
	private projectService = inject(ProjectsService);
	private supabaseService = inject(ImagesService);
	projectForm!: FormGroup;
	imagenesPrevisualizadas: string[] = []; // Almacena las URLs de las imágenes para previsualización
	imagenesArchivos: File[] = []; // Almacena los archivos seleccionados
	isLoading = signal(false);

	ngOnInit(): void {
		this.projectForm = this.formBuilder.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
		});
	}

	// Manejar selección de imágenes
	onFilesSelected(event: Event): void {
		const input = event.target as HTMLInputElement;

		if (input.files) {
			const archivos = Array.from(input.files);
			archivos.forEach((archivo) => {
				if (
					archivo.type === 'image/png' ||
					archivo.type === 'image/jpeg'
				) {
					this.imagenesArchivos.push(archivo);

					// Crear la previsualización
					const reader = new FileReader();
					reader.onload = () => {
						this.imagenesPrevisualizadas.push(
							reader.result as string
						);
					};
					reader.readAsDataURL(archivo);
				} else {
					this.warning(archivo.name);
				}
			});
		}
	}

	warning(name: string) {
		Swal.fire({
			titleText: 'Archivo invalido',
			text: `El archivo "${name}" no es válido. Solo se permiten imágenes PNG o JPG/JPEG.`,
			confirmButtonText: 'Aceptar',
			icon: 'warning',
			confirmButtonColor: '#1976D2',
		});
	}

	// Eliminar una imagen
	deleteImage(index: number): void {
		this.imagenesPrevisualizadas.splice(index, 1);
		this.imagenesArchivos.splice(index, 1);
		console.log(this.imagenesArchivos);
	}

	async save(): Promise<void> {
		if (this.projectForm.invalid || this.imagenesArchivos.length === 0) {
			return;
		}

		this.isLoading.set(true);

		try {
			// CREAR PROYECTO Y RECUPERAR EL ID
			const project = {
				title: this.projectForm.value.title,
				description: this.projectForm.value.description,
				images: [],
			};
			const id = (await this.projectService.addProject(project)).id;

			const uploads: Promise<string>[] = [];
			// ELIMINAR ESPACIOS EN BLANCO DEL TITULO PARA NOMBRAR
			const title = this.projectForm.value.title.replace(' ', '');

			// Obtener URLS DE LAS IMAGENES
			// Subir cada imagen a una subcarpeta específica identificada por el ID único
			this.imagenesArchivos.forEach((archivo, index) => {
				const path = `${id}/${title}_${Date.now()}_${index}.${
					archivo.type.split('/')[1]
				}`;
				uploads.push(this.supabaseService.uploadImage(archivo, path));
			});

			const paths = await Promise.all(uploads);
			// Generar URLs públicas para las imágenes subidas
			const urls = paths
				.filter((path): path is string => path !== null)
				.map((path) => this.supabaseService.getPublicUrl(path));

			const data = await this.projectService.getProjectById(id);
			data.images = urls;
			await this.projectService.updateProject(id, data);

			this.showToastify('Se ha agregado el proyecto correctamente');
		} catch (error) {
			console.error('Error subiendo imágenes:', error);
		} finally {
			this.isLoading.set(false);
			this.dialogRef.close();
		}
	}

	showToastify(message: string) {
		Toastify({
			text: message,
			duration: 3000,
			newWindow: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				background: 'linear-gradient(to right, #00b09b, #96c93d)',
			},
			onClick: function () {}, // Callback after click
		}).showToast();
	}
}
