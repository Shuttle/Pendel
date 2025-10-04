const home = {
    text: '',
    items: [
        {
            text: 'Shuttle.Pigeon',
            link: '/shuttle-pigeon/home'
        },
    ]
};

const access = [
    home,
    {
        items: [
            {
                text: 'Overview',
                link: '/shuttle-pigeon/overview'
            },
            {
                text: 'Docker',
                link: '/shuttle-pigeon/docker'
            },
            {
                text: 'Docker Compose',
                link: '/shuttle-pigeon/docker-compose'
            },
        ]
    }
]

const sidebar = {
    '/shuttle-pigeon/': access
}

export default sidebar;