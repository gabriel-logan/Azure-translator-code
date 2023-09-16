import { simplifyPath } from './functionsToTest'; // Substitua 'seuArquivo.js' pelo caminho real do seu arquivo

test('Deve simplificar o caminho corretamente', () => {
	const inputPath = ['_oioi', '_oioi_oioioioi'];
	const expectedOutput = '../_oioi/_oioi_oioioioi';

	const result = simplifyPath(inputPath);

	expect(result).toBe(expectedOutput);
});
