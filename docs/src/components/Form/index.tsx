export default function Form({ translateJson }) {
	return (
		<>
			<form action={translateJson}>
				<label htmlFor="jsonfile">Paste the json code here</label>
				<textarea name="jsonfile" id="jsonfile"></textarea>
				<button type="submit">Translate</button>
			</form>
			<div>
				<p>Result: </p>
			</div>
		</>
	);
}
