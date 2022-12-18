import {default as core} from '../shuttle-core/sidebar';
import {default as esb} from '../shuttle-esb/sidebar';
import {default as recall} from '../shuttle-recall/sidebar';

module.exports = (async () => {
    return {
        vite: {
            build: {
                minify: false
            },
        },

        base: '/',
        lang: 'en-US',
        title: 'Shuttle',
        description: 'Shuttle.Esb Documentation',

        head: [
            ['link', { rel: "shortcut icon", href: "/favicon.ico" }]
        ],

        themeConfig: {
            logo: '/logo.svg',
            algolia: {
                indexName: 'pendel',
                appId: 'GJYF98YRRG',
                apiKey: '81ba59e2c51ff9b5a0308da85d014a3b'
            },

            // carbonAds: {
            //     code: '',
            //     placement: ''
            // },

            socialLinks: [
                { icon: 'github', link: 'https://github.com/Shuttle/Pendel' },
                { icon: 'discord', link: 'https://discord.gg/J2suHcy2x8' }
            ],

            footer: {
                copyright: `Copyright © 2013-${new Date().getFullYear()} Eben Roux`
            },

            nav: [
                {
                    text: 'Core',
                    activeMatch: `^/shuttle-core/`,
                    link: '/shuttle-core/index'
                },
                {
                    text: 'Service Bus',
                    activeMatch: `^/shuttle-esb/`,
                    link: '/shuttle-esb/index'
                },
                {
                    text: 'Event Sourcing',
                    activeMatch: `^/shuttle-recall/`,
                    link: '/shuttle-recall/index'
                },
            ],

            sidebar: {
                ...esb,
                ...core,
                ...recall
            }
        },
    };
})()
