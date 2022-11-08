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
            // algolia: {
            //     indexName: 'shuttle-esb',
            //     appId: 'VM33RJ87BH',
            //     apiKey: 'fc560606a3c14b173d0ddf57a3258c84'
            // },

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
                    text: 'Shuttle.Core',
                    activeMatch: `^/shuttle-core/`,
                    link: '/shuttle-core/index'
                },
                {
                    text: 'Shuttle.Esb',
                    activeMatch: `^/shuttle-esb/`,
                    link: '/shuttle-esb/index'
                },
                {
                    text: 'Shuttle.Recall',
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
