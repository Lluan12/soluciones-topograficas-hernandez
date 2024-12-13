import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ImagesService {
	private supabase: SupabaseClient;
	private BUCKET = 'sth-hernandez-topografia';

	constructor() {
		// Configura tus credenciales de Supabase
		const SUPABASE_URL = environment.supabaseConfig.supabaseUrl; // Reemplaza con tu URL
		const SUPABASE_KEY = environment.supabaseConfig.supabaseKey; // Reemplaza con tu API Key pública
		this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
	}

	// Método para subir imágenes al bucket de Supabase
	async uploadImage(file: File, path: string): Promise<string> {
		const { data, error } = await this.supabase.storage
			.from(this.BUCKET)
			.upload(path, file);

		return data!.path;
	}

	// Método para obtener la URL pública de una imagen
	getPublicUrl(path: string): string {
		const { data } = this.supabase.storage.from(this.BUCKET).getPublicUrl(path);
		return data.publicUrl;
	}
}
