/* eslint-disable */
export default {
    e2e: {
        setupNodeEvents(on, config) {},
        baseUrl: 'http://localhost:3000',
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
};
