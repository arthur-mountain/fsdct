/** @type {Parameters<typeof import('redis').createClient>[0]} */
const clientConfig = {
  url: `redis://${process.env.REDIS_HOST1}:${process.env.REDIS_PORT1}`,
  password: process.env.REDIS_PASSWORD,
};

/** @type {Parameters<typeof import('redis').createCluster>[0]} */
const clusterConfig = {
  rootNodes: [
    {
      url: `redis://${process.env.REDIS_HOST1}:${process.env.REDIS_PORT1}`,
    },
    {
      url: `redis://${process.env.REDIS_HOST2}:${process.env.REDIS_PORT2}`,
    },
    {
      url: `redis://${process.env.REDIS_HOST3}:${process.env.REDIS_PORT3}`,
    },
    {
      url: `redis://${process.env.REDIS_HOST4}:${process.env.REDIS_PORT4}`,
    },
    {
      url: `redis://${process.env.REDIS_HOST5}:${process.env.REDIS_PORT5}`,
    },
    {
      url: `redis://${process.env.REDIS_HOST6}:${process.env.REDIS_PORT6}`,
    },
  ],
  defaults: {
    password: process.env.REDIS_PASSWORD,
  },
};

export { clusterConfig };
