import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../model/project.model';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private firestore = inject(Firestore); 
  private projectCollection = collection(this.firestore, 'projects')

  // Crear un documento
  addProject(data: Partial<Project>): Promise<DocumentReference<DocumentData, DocumentData>>  {
    return addDoc(this.projectCollection, {
      created: Date.now(),
      ...data
    });
  }

  // Leer todos los documentos de una colección
  getProjects() {
    const queryFn = query(this.projectCollection, orderBy('created', 'desc'))
    return collectionData(queryFn, { idField: 'id' }) as Observable<Project[]>; // Incluye el ID del documento
  }

  // Leer un documento por ID
  async getProjectById(id: string): Promise<Project> {
    const docRef = this.getRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Project;
  }

  // Actualizar un documento
  updateProject(id: string, data: Project): Promise<void> {
    const docRef = this.getRef(id);
    return updateDoc(docRef, {...data})
  }

  // Eliminar un documento
  deleteProject(id: string): void {
    const docRef = this.getRef(id)
    deleteDoc(docRef);
  }

  private getRef(id: string) {
    return doc(this.firestore, environment.APP_CONSTANTS.COLLECTION_NAME, id);
  }
}
