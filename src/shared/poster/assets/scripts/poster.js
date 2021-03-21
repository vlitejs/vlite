import { createElement } from 'jsx-dom'

export default function ({ posterUrl = '' }) {
	const style = {
		backgroundImage: posterUrl && `url(${posterUrl})`
	}
	return <div className="v-poster v-active" style={style}></div>
}
