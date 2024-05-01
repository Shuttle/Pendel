const home = {
    text: '',
    items: [
        {
            text: 'Shuttle.Esb',
            link: '/shuttle-esb/index'
        },
    ]
};

const concepts = [
    home,
    {
        text: 'Concepts',
        items: [
            {
                text: 'Why?',
                link: '/shuttle-esb/concepts/why'
            },
            {
                text: 'Autonomous Business Components',
                link: '/shuttle-esb/concepts/autonomous-business-components'
            },
        ]
    },
    {
        text: 'Patterns',
        items: [
            {
                text: 'Stream Processing',
                link: '/shuttle-esb/concepts/patterns/stream-processing'
            },
            {
                text: 'Request / Response',
                link: '/shuttle-esb/concepts/patterns/request-response'
            },
            {
                text: 'Publish / Subscribe',
                link: '/shuttle-esb/concepts/patterns/publish-subscribe'
            },
            {
                text: 'Message Idempotence',
                link: '/shuttle-esb/concepts/patterns/message-idempotence'
            },
            {
                text: 'Deferred Messages',
                link: '/shuttle-esb/concepts/patterns/deferred-messages'
            },
            {
                text: 'Message Routing',
                link: '/shuttle-esb/concepts/patterns/message-routing'
            },
        ]
    },
    {
        text: 'Essentials',
        items: [
            {
                text: 'Bounded Contexts',
                link: '/shuttle-esb/concepts/essentials/bounded-contexts'
            },
        ]
    },
];

const guide = [
    home,
    {
        text: 'Overview',
        items: [
            {
                text: 'Getting Started',
                link: '/shuttle-esb/guide/getting-started'
            },
        ]
    },
    {
        text: 'Patterns',
        items: [
            {
                text: 'Stream Processing',
                link: '/shuttle-esb/guide/patterns/stream-processing'
            },
            {
                text: 'Request / Response',
                link: '/shuttle-esb/guide/patterns/request-response'
            },
            {
                text: 'Publish / Subscribe',
                link: '/shuttle-esb/guide/patterns/publish-subscribe'
            },
            {
                text: 'Deferred Messages',
                link: '/shuttle-esb/guide/patterns/deferred-messages'
            },
            {
                text: 'Dependency Injection',
                link: '/shuttle-esb/guide/patterns/dependency-injection'
            },
            {
                text: 'Message Idempotence',
                link: '/shuttle-esb/guide/patterns/message-idempotence'
            },
            {
                text: 'Process Management',
                link: '/shuttle-esb/guide/patterns/process-management'
            },
        ]
    },
    {
        text: 'Essentials',
        items: [
            {
                text: 'Exception Handling',
                link: '/shuttle-esb/guide/essentials/exception-handling'
            },
        ]
    },
];

const components = [
    home,
    {
        text: 'Implementations',
        items: [
            {
                text: 'Idempotence Service',
                link: '/shuttle-esb/components/idempotence-service'
            },
            {
                text: 'Identity Provider',
                link: '/shuttle-esb/components/identity-provider'
            },
            {
                text: 'Message Handler Invoker',
                link: '/shuttle-esb/components/message-handler-invoker'
            },
            {
                text: 'Message Handler',
                link: '/shuttle-esb/components/message-handler'
            },
            {
                text: 'Message Handling Assessor',
                link: '/shuttle-esb/components/message-handling-assessor'
            },
            {
                text: 'Message Route Provider',
                link: '/shuttle-esb/components/message-route-provider'
            },
            {
                text: 'Message Sender',
                link: '/shuttle-esb/components/message-sender'
            },
            {
                text: 'Queue Factory Service',
                link: '/shuttle-esb/components/queue-factory-service'
            },
            {
                text: 'Queue Service',
                link: '/shuttle-esb/components/queue-service'
            },
            {
                text: 'Policy',
                link: '/shuttle-esb/components/service-bus-policy'
            },
            {
                text: 'Subscription Service',
                link: '/shuttle-esb/components/subscription-service'
            },
            {
                text: 'Transport Message',
                link: '/shuttle-esb/components/transport-message'
            },
            {
                text: 'Transport Message Builder',
                link: '/shuttle-esb/components/transport-message-builder'
            },
            {
                text: 'Transport Header',
                link: '/shuttle-esb/components/transport-header'
            },
        ]
    },
];

const implementations = [
    home,
    {
        items: [
            {
                text: 'Overview',
                link: '/shuttle-esb/implementations/overview'
            },
        ]
    },
    {
        text: 'Streams',
        items: [
            {
                text: 'Kafka',
                link: '/shuttle-esb/implementations/stream/kafka'
            },
            {
                text: 'Azure Event Hubs',
                link: '/shuttle-esb/implementations/stream/azureeh'
            },
        ]
    },
    {
        text: 'Queue',
        items: [
            {
                text: 'Amazon SQS',
                link: '/shuttle-esb/implementations/queue/amazonsqs'
            },
            {
                text: 'Azure Storage Queues',
                link: '/shuttle-esb/implementations/queue/azuresq'
            },
            {
                text: 'File',
                link: '/shuttle-esb/implementations/queue/filemq'
            },
            {
                text: 'MSMQ',
                link: '/shuttle-esb/implementations/queue/msmq'
            },
            {
                text: 'RabbitMQ',
                link: '/shuttle-esb/implementations/queue/rabbitmq'
            },
            {
                text: 'SQL',
                link: '/shuttle-esb/implementations/queue/sql'
            },
        ]
    },
    {
        text: 'Subscription',
        items: [
            {
                text: 'SQL',
                link: '/shuttle-esb/implementations/subscription/sql'
            },
        ]
    },
    {
        text: 'Idempotence',
        items: [
            {
                text: 'SQL',
                link: '/shuttle-esb/implementations/idempotence/sql'
            },
        ]
    },
];

const modules = [
    home,
    {
        text: 'Implementations',
        items: [
            {
                text: 'Active Time Range',
                link: '/shuttle-esb/modules/active-time-range'
            },
            {
                text: 'Corrupt Transport Message',
                link: '/shuttle-esb/modules/corrupt-transport-message'
            },
            {
                text: 'Message Forwarding',
                link: '/shuttle-esb/modules/message-forwarding'
            },
            {
                text: 'Purge Inbox',
                link: '/shuttle-esb/modules/purge-inbox'
            },
            {
                text: 'Purge Queues',
                link: '/shuttle-esb/modules/purge-queues'
            },
            {
                text: 'Throttle',
                link: '/shuttle-esb/modules/throttle'
            },
        ]
    },
];

const options = [
    home,
    {
        text: 'Options',
        items: [
            {
                text: 'Service Bus',
                link: '/shuttle-esb/options/servicebus'
            },
            {
                text: 'Inbox',
                link: '/shuttle-esb/options/inbox'
            },
            {
                text: 'Message Routes',
                link: '/shuttle-esb/options/message-routes'
            },
            {
                text: 'Outbox',
                link: '/shuttle-esb/options/outbox'
            },
            {
                text: 'Subscription',
                link: '/shuttle-esb/options/subscription'
            },
            {
                text: 'Idempotence',
                link: '/shuttle-esb/options/idempotence'
            },
            {
                text: 'Processor Thread',
                link: '/shuttle-esb/options/processor-thread'
            },
        ]
    },
];

const esb = [
    {
        text: 'Service Bus',
        items: [
            {
                text: 'Concepts',
                link: '/shuttle-esb/concepts/why'
            },
            {
                text: 'Getting started',
                link: '/shuttle-esb/guide/getting-started'
            },
            {
                text: 'Options',
                link: '/shuttle-esb/options/servicebus'
            },
            {
                text: 'Components',
                link: '/shuttle-esb/components/overview'
            },
            {
                text: 'Implementations',
                link: '/shuttle-esb/implementations/overview'
            },
            {
                text: 'Modules',
                link: '/shuttle-esb/modules/overview'
            },
            {
                text: 'History',
                items: [
                    {
                        text: 'changelog',
                        link: '/shuttle-esb/changelog',
                    },
                    {
                        text: 'v-previous',
                        link: 'https://shuttle.github.io/shuttle-esb-v12/',
                    }
                ]
            },
        ]
    },
];

const sidebar = {
    '/shuttle-esb/': esb,
    '/shuttle-esb/concepts/': concepts,
    '/shuttle-esb/guide/': guide,
    '/shuttle-esb/components/': components,
    '/shuttle-esb/options/': options,
    '/shuttle-esb/implementations/': implementations,
    '/shuttle-esb/modules/': modules
}

export default sidebar;