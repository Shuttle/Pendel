const home = {
    text: '',
    items: [
        {
            text: 'Shuttle.Recall',
            link: '/shuttle-recall/index'
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
                text: 'SQL',
                link: '/shuttle-recall/events/sql'
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
                text: 'SQL',
                link: '/shuttle-recall/projections/sql'
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
                link: '/shuttle-recall/guide/getting-started'
            },
            {
                text: 'Events',
                link: '/shuttle-recall/events/overview'
            },
            {
                text: 'Projections',
                link: '/shuttle-recall/projections/overview'
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