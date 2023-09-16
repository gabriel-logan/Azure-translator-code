import * as path from 'path';
import * as fs from 'fs';

// Função para simplificar um array de partes do caminho
export function simplifyPath(parts: string[]): string {
	const stack: string[] = [];

	// Itera pelas partes do caminho
	for (const part of parts) {
		if (part === '..') {
			// Se a parte for '..', remove o diretório anterior do stack
			stack.pop();
		} else {
			// Caso contrário, adiciona a parte ao stack
			stack.push(part);
		}
	}

	// Retorna o caminho simplificado
	return `../${stack.join('/')}`;
}

// Função de teste para criar o diretório com base no caminho simplificado
export function teste(folderNamePath: string[]) {
	// Obtém o caminho simplificado
	const simplifiedLocation = simplifyPath(folderNamePath);

	// Exibe o caminho simplificado
	console.log(simplifiedLocation);

	// Cria o diretório com base no caminho simplificado
	const traducoesDir: string = path.join(__dirname, simplifiedLocation);

	if (!fs.existsSync(traducoesDir)) {
		fs.mkdirSync(traducoesDir, { recursive: true }); // Use { recursive: true } para criar pastas recursivamente, se necessário
	}
}
