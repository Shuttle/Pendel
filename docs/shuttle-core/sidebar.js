const home = {
    text: '',
    items: [
        {
            text: 'Shuttle.Core',
            link: '/shuttle-core/index'
        },
    ]
};

const infrastructure = [
    home,
    {
        text: 'Infrastructure',
        items: [
            {
                text: 'Cli',
                link: '/shuttle-core/infrastructure/shuttle-core-cli'
            },
            {
                text: 'Compression',
                link: '/shuttle-core/infrastructure/shuttle-core-compression'
            },
            {
                text: 'Contract',
                link: '/shuttle-core/infrastructure/shuttle-core-contract'
            },
            {
                text: 'Cron',
                link: '/shuttle-core/infrastructure/shuttle-core-cron'
            },
            {
                text: 'Dependency Injection',
                link: '/shuttle-core/infrastructure/shuttle-core-dependencyinjection'
            },
            {
                text: 'Encryption',
                link: '/shuttle-core/infrastructure/shuttle-core-encryption'
            },
            {
                text: 'Mediator',
                link: '/shuttle-core/infrastructure/shuttle-core-mediator'
            },
            {
                text: 'Pipelines',
                link: '/shuttle-core/infrastructure/shuttle-core-pipelines'
            },
            {
                text: 'Reflection',
                link: '/shuttle-core/infrastructure/shuttle-core-reflection'
            },
            {
                text: 'Specification',
                link: '/shuttle-core/infrastructure/shuttle-core-specification'
            },
            {
                text: 'Streams',
                link: '/shuttle-core/infrastructure/shuttle-core-streams'
            },
            {
                text: 'System',
                link: '/shuttle-core/infrastructure/shuttle-core-system'
            },
            {
                text: 'Threading',
                link: '/shuttle-core/infrastructure/shuttle-core-threading'
            },
            {
                text: 'Transactions',
                link: '/shuttle-core/infrastructure/shuttle-core-transactions'
            },
        ]
    }
];

const data = [
    home,
    {
        text: 'Data / Micro ORM',
        items: [
            {
                text: 'Shuttle.Core.Data',
                link: '/shuttle-core/data/shuttle-core-data'
            },
        ]
    }
]

const serialization = [
    home,
    {
        text: 'Serialization',
        items: [
            {
                text: 'Shuttle.Core.Serialization',
                link: '/shuttle-core/serialization/shuttle-core-serialization'
            },
        ]
    },
    {
        text: 'Implementations',
        items: [
            {
                text: 'Json',
                link: '/shuttle-core/serialization/shuttle-core-json'
            },
        ]
    }
]

const core = [
    {
        text: "Shuttle.Core",
        items: [
            {
                text: 'Infrastructure',
                activeMatch: `^/infrastructure/`,
                link: '/shuttle-core/infrastructure/shuttle-core-cli'
            },
            {
                text: 'Data / Micro ORM',
                activeMatch: `^/data/`,
                link: '/shuttle-core/data/shuttle-core-data'
            },
            {
                text: 'Serialization',
                activeMatch: `^/serialization/`,
                link: '/shuttle-core/serialization/shuttle-core-serialization'
            },
            {
                text: 'Hosting',
                activeMatch: `^/core/`,
                link: '/shuttle-core/core/hosting'
            },
            {
                text: 'v-previous',
                link: 'https://shuttle.github.io/shuttle-core-pre-ms-di/'
            },
        ]
    }
]

const sidebar = {
    '/shuttle-core/': core,
    '/shuttle-core/infrastructure/': infrastructure,
    '/shuttle-core/data/': data,
    '/shuttle-core/serialization/': serialization,
}

export default sidebar;