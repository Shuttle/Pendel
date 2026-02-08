const home = {
    text: '',
    items: [
        {
            text: 'Shuttle.Recall',
            link: '/shuttle-recall/home'
        },
    ]
};

const guide = [
    home,
    {
        text: '',
        items: [
            {
                text: 'Getting Started',
                link: '/shuttle-recall/guide/getting-started'
            },
        ]
    },
];

const events = [
    home,
    {
        text: 'Events',
        items: [
            {
                text: 'Overview',
                link: '/shuttle-recall/events/overview'
            },
        ]
    },
    {
        text: 'Implementations',
        items: [
            {
                text: 'SQL Server',
                link: '/shuttle-recall/events/sql-server'
            },
        ]
    },
];

const projections = [
    home,
    {
        text: 'Projections',
        items: [
            {
                text: 'Overview',
                link: '/shuttle-recall/projections/overview'
            },
        ]
    },
    {
        text: 'Implementations',
        items: [
            {
                text: 'SQL Server',
                link: '/shuttle-recall/projections/sql-server'
            },
        ]
    },
];

const recall = [
    {
        text: "Shuttle.Recall",
        items: [
            {
                text: 'Getting started',
                link: '/shuttle-recall/getting-started'
            },
            {
                text: 'Events',
                link: '/shuttle-recall/events/overview'
            },
            {
                text: 'Projections',
                link: '/shuttle-recall/projections/overview'
            },
            {
                text: 'Walkthrough',
                link: '/shuttle-recall/walkthrough'
            },
        ]
    }
]

const sidebar = {
    '/shuttle-recall/': recall,
    '/shuttle-recall/guide/': guide,
    '/shuttle-recall/events/': events,
    '/shuttle-recall/projections/': projections,
}

export default sidebar;