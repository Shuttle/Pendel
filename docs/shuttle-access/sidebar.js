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
                text: 'Docker Compose',
                link: '/shuttle-access/docker-compose'
            },
            {
                text: 'Guide',
                link: '/shuttle-access/guide'
            },
            {
                text: 'JSON Web Tokens (JWT)',
                link: '/shuttle-access/json-web-tokens'
            }
        ]
    }
]

const sidebar = {
    '/shuttle-access/': access
}

export default sidebar;