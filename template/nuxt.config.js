const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

// Sprites
const spriteType = 'scss'; // scss/less
const spritesSrc = path.resolve('src/assets/sprites/ico');
const spritesTarget = path.resolve('src/assets/sprites/generated');

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'tour-review',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Tour review core' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },
    /*
    ** Set src directory
     */
    srcDir: 'src/',
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        extend(config, { isDev, isClient }) {
            /**
             * Run ESLint on save
             */
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }

            /**
             * Add image-webpack-loader
             */
            config.module.rules.forEach((rule) => {
                if (rule.test.toString() === '/\\.(png|jpe?g|gif|svg)$/') {
                    delete rule.loader;
                    delete rule.options;
                    rule.use = [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1000, // 1KO
                                name: 'img/[name].[hash:7].[ext]',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true,
                                gifsicle: {
                                    enabled: false,
                                },
                                mozjpeg: {
                                    enabled: true,
                                    progressive: true,
                                    quality: 70,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    enabled: true,
                                    quality: '65-90',
                                    speed: 1,
                                    verbose: true,
                                },
                                svgo: {
                                    enabled: false,
                                },
                            },
                        },
                    ];
                }
            });
        },

        plugins: [
            /**
             * Spritesmith plugin configuration
             */
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve(spritesSrc),
                    glob: '*.png',
                },
                target: {
                    image: path.resolve(spritesTarget, 'sprite.png'),
                    css: [
                        [path.resolve(
                            spritesTarget,
                            `${spriteType === 'scss' ? '_' : ''}sprite.${spriteType}`,
                        ), { format: `${spriteType}_handlebars_template` }],
                    ],
                },
                apiOptions: {
                    cssImageRef: '~/assets/sprites/generated/sprite.png',
                },
                spritesmithOptions: {
                    algorithm: 'binary-tree',
                    padding: 2,
                },
                customTemplates: {
                    less_handlebars_template: path.resolve('build/sprite-templates', 'sprite.less.handlebars'),
                    scss_handlebars_template: path.resolve('build/sprite-templates', 'sprite.scss.handlebars'),
                },
            }),
        ],
    },
};
