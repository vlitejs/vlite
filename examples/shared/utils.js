export function changeSourceEvent({ player }) {
	document.querySelector('.change-source').addEventListener('submit', (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		player.setSource(formData.get('url'))
	})
}
