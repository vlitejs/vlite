// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'vLitejs',
			description:
				'Fast and lightweight JavaScript library for customizing video and audio players.',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/vlitejs/vlite' },
				{ icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/vlitejs' }
			],
			customCss: ['./src/styles/vlite.css', './src/styles/home.css'],
			sidebar: [
				{ label: 'Getting Started', slug: 'getting-started' },
				{ label: 'Configuration', slug: 'configuration' },
				{ label: 'Options', slug: 'options' },
				{ label: 'Events', slug: 'events' },
				{ label: 'Methods', slug: 'methods' },
				{ label: 'CSS Properties', slug: 'css-properties' },
				{
					label: 'Providers',
					items: [
						{ label: 'Overview', slug: 'providers' },
						{ label: 'HTML5', slug: 'providers/html5' },
						{ label: 'YouTube', slug: 'providers/youtube' },
						{ label: 'Vimeo', slug: 'providers/vimeo' },
						{ label: 'Dailymotion', slug: 'providers/dailymotion' }
					]
				},
				{
					label: 'Plugins',
					items: [
						{ label: 'Overview', slug: 'plugins' },
						{ label: 'Subtitle', slug: 'plugins/subtitle' },
						{ label: 'Picture-in-Picture', slug: 'plugins/pip' },
						{ label: 'Volume Bar', slug: 'plugins/volume-bar' },
						{ label: 'Cast', slug: 'plugins/cast' },
						{ label: 'AirPlay', slug: 'plugins/airplay' },
						{ label: 'IMA', slug: 'plugins/ima' },
						{ label: 'Sticky', slug: 'plugins/sticky' },
						{ label: 'Hotkeys', slug: 'plugins/hotkeys' }
					]
				}
			]
		})
	]
})
