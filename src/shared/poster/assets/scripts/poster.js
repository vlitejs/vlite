import { createElement } from 'jsx-dom'

export default function ({ posterUrl = '' }) {
	const style = {
		backgroundImage: posterUrl && `url(${posterUrl})`
	}
	return <div className="v-poster v-active" data-v-toggle-play-pause style={style}></div>
}
