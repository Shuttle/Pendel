import { mdiArrowLeft } from '@mdi/js'
import { useIcon } from '@/.vitepress/theme/composables/icon'

const home = {
    text: 'Hopper',
    items: [
        {
            text: `${useIcon(mdiArrowLeft)} Back`,
            link: '/shuttle-hopper/home'
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
                link: '/shuttle-hopper/concepts/why'
            },
            {
                text: 'Autonomous Business Components',
                link: '/shuttle-hopper/concepts/autonomous-business-components'
            },
        ]
    },
    {
        text: 'Patterns',
        items: [
            {
                text: 'Stream Processing',
                link: '/shuttle-hopper/concepts/patterns/stream-processing'
            },
            {
                text: 'Request / Response',
                link: '/shuttle-hopper/concepts/patterns/request-response'
            },
            {
                text: 'Publish / Subscribe',
                link: '/shuttle-hopper/concepts/patterns/publish-subscribe'
            },
            {
                text: 'Message Idempotence',
                link: '/shuttle-hopper/concepts/patterns/message-idempotence'
            },
            {
                text: 'Deferred Messages',
                link: '/shuttle-hopper/concepts/patterns/deferred-messages'
            },
            {
                text: 'Message Routing',
                link: '/shuttle-hopper/concepts/patterns/message-routing'
            },
        ]
    },
    {
        text: 'Essentials',
        items: [
            {
                text: 'Bounded Contexts',
                link: '/shuttle-hopper/concepts/essentials/bounded-contexts'
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
                link: '/shuttle-hopper/guide/getting-started'
            },
        ]
    },
    {
        text: 'Patterns',
        items: [
            {
                text: 'Stream Processing',
                link: '/shuttle-hopper/guide/patterns/stream-processing'
            },
            {
                text: 'Request / Response',
                link: '/shuttle-hopper/guide/patterns/request-response'
            },
            {
                text: 'Publish / Subscribe',
                link: '/shuttle-hopper/guide/patterns/publish-subscribe'
            },
            {
                text: 'Deferred Messages',
                link: '/shuttle-hopper/guide/patterns/deferred-messages'
            },
            {
                text: 'Dependency Injection',
                link: '/shuttle-hopper/guide/patterns/dependency-injection'
            },
            {
                text: 'Message Idempotence',
                link: '/shuttle-hopper/guide/patterns/message-idempotence'
            },
        ]
    },
    {
        text: 'Essentials',
        items: [
            {
                text: 'Exception Handling',
                link: '/shuttle-hopper/guide/essentials/exception-handling'
            },
        ]
    },
];

const components = [
    home,
    {
        text: 'Components',
        items: [
            {
                text: 'Identity Provider',
                link: '/shuttle-hopper/components/identity-provider'
            },
            {
                text: 'Message Handler Invoker',
                link: '/shuttle-hopper/components/message-handler-invoker'
            },
            {
                text: 'Message Handler',
                link: '/shuttle-hopper/components/message-handler'
            },
            {
                text: 'Message Route Provider',
                link: '/shuttle-hopper/components/message-route-provider'
            },
            {
                text: 'Message Sender',
                link: '/shuttle-hopper/components/message-sender'
            },
            {
                text: 'Queue Factory Service',
                link: '/shuttle-hopper/components/queue-factory-service'
            },
            {
                text: 'Queue Service',
                link: '/shuttle-hopper/components/queue-service'
            },
            {
                text: 'Policy',
                link: '/shuttle-hopper/components/service-bus-policy'
            },
            {
                text: 'Subscription Service',
                link: '/shuttle-hopper/components/subscription-service'
            },
            {
                text: 'Transport Message',
                link: '/shuttle-hopper/components/transport-message'
            },
            {
                text: 'Transport Message Builder',
                link: '/shuttle-hopper/components/transport-message-builder'
            },
            {
                text: 'Transport Header',
                link: '/shuttle-hopper/components/transport-header'
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
                link: '/shuttle-hopper/implementations/overview'
            },
        ]
    },
    {
        text: 'Streams',
        items: [
            {
                text: 'Kafka',
                link: '/shuttle-hopper/implementations/stream/kafka'
            },
            {
                text: 'Azure Event Hubs',
                link: '/shuttle-hopper/implementations/stream/azureeh'
            },
        ]
    },
    {
        text: 'Queue',
        items: [
            {
                text: 'Amazon SQS',
                link: '/shuttle-hopper/implementations/queue/amazonsqs'
            },
            {
                text: 'Azure Storage Queues',
                link: '/shuttle-hopper/implementations/queue/azuresq'
            },
            {
                text: 'RabbitMQ',
                link: '/shuttle-hopper/implementations/queue/rabbitmq'
            },
            {
                text: 'SQL Server',
                link: '/shuttle-hopper/implementations/queue/sql-server'
            },
        ]
    },
    {
        text: 'Subscription',
        items: [
            {
                text: 'SQL Server',
                link: '/shuttle-hopper/implementations/subscription/sql-server'
            },
        ]
    }
];

const options = [
    home,
    {
        text: 'Options',
        items: [
            {
                text: 'Service Bus',
                link: '/shuttle-hopper/options/servicebus'
            },
            {
                text: 'Inbox',
                link: '/shuttle-hopper/options/inbox'
            },
            {
                text: 'Message Routes',
                link: '/shuttle-hopper/options/message-routes'
            },
            {
                text: 'Outbox',
                link: '/shuttle-hopper/options/outbox'
            },
            {
                text: 'Subscription',
                link: '/shuttle-hopper/options/subscription'
            },
        ]
    },
];

const esb = [
    {
        text: 'Hopper',
        items: [
            {
                text: 'Concepts',
                link: '/shuttle-hopper/concepts/why'
            },
            {
                text: 'Getting started',
                link: '/shuttle-hopper/guide/getting-started'
            },
            {
                text: 'Options',
                link: '/shuttle-hopper/options/servicebus'
            },
            {
                text: 'Components',
                link: '/shuttle-hopper/components/overview'
            },
            {
                text: 'Implementations',
                link: '/shuttle-hopper/implementations/overview'
            },
        ]
    },
];

const sidebar = {
    '/shuttle-hopper/': esb,
    '/shuttle-hopper/concepts/': concepts,
    '/shuttle-hopper/guide/': guide,
    '/shuttle-hopper/components/': components,
    '/shuttle-hopper/options/': options,
    '/shuttle-hopper/implementations/': implementations,
}

export default sidebar;