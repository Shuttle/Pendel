const home = {
    text: '',
    items: [
        {
            text: 'Shuttle.Access',
            link: '/shuttle-access/home'
        },
    ]
};

const access = [
    home,
    {
        items: [
            {
                text: 'Overview',
                link: '/shuttle-access/overview'
            },
            {
                text: 'Consistency',
                link: '/shuttle-access/consistency'
            },
            {
                text: 'Configuration',
                link: '/shuttle-access/configuration'
            },
            {
                text: 'Docker',
                link: '/shuttle-access/docker'
            },
            {
                text: 'Docker Compose',
                link: '/shuttle-access/docker-compose'
            },
            {
                text: 'Guide',
                link: '/shuttle-access/guide'
            },
            {
                text: 'Sessions',
                link: '/shuttle-access/sessions'
            },
            {
                text: 'JSON Web Tokens (JWT)',
                link: '/shuttle-access/json-web-tokens'
            },
            {
                text: 'Rest Client',
                link: '/shuttle-access/rest-client'
            }
        ]
    }
]

const sidebar = {
    '/shuttle-access/': access
}

export default sidebar;