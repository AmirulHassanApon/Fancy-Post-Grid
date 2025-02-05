(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    const { PanelBody, TabPanel, RangeControl, ColorPalette, ToggleControl, TextControl, SelectControl } = wp.components;

    registerBlockType('fancy-post-grid/block', {
        title: __('Grid Layout', 'fancy-post-grid'),
        icon: 'grid-view',
        category: 'fancy-post-grid-category',

        attributes: {
            titleColor: { type: 'string', default: '#000000' },
            buttonColor: { type: 'string', default: '#0073aa' },
            titleFontSize: { type: 'number', default: 20 },
            imageSize: { type: 'number', default: 100 },
            gridColumns: { type: 'number', default: 3 },
            excerptLength: { type: 'number', default: 20 },
            showMeta: { type: 'boolean', default: true },
            readMoreText: { type: 'string', default: __('Read More', 'fancy-post-grid') },
            postType: { type: 'string', default: 'post' },
            orderBy: { type: 'string', default: 'date' },
            order: { type: 'string', default: 'desc' },
            layoutStyle: { type: 'string', default: 'style1' },
            textAlign: { type: 'string', default: 'left' },
            includePosts: { type: 'string', default: '' },
            excludePosts: { type: 'string', default: '' },
            postLimit: { type: 'number', default: 6 },
            filterCategory: { type: 'string', default: '' },
            filterTag: { type: 'string', default: '' },
            filterAuthor: { type: 'string', default: '' },
            filterDate: { type: 'string', default: '' },
            enablePagination: { type: 'boolean', default: true }
        },

        edit: function ({ attributes, setAttributes }) {
             const { titleColor, buttonColor, titleFontSize, imageSize, gridColumns, excerptLength, showMeta, readMoreText, postType, orderBy, order, layoutStyle, textAlign, includePosts, excludePosts, postLimit, filterCategory, filterTag, filterAuthor, filterDate, enablePagination } = attributes;
            
            const posts = useSelect((select) => select('core').getEntityRecords('postType', postType, { per_page: postLimit, _embed: true, orderby: orderBy, order: order }), [postType, orderBy, order, postLimit]);

            return (
                wp.element.createElement('div', { ...useBlockProps() },
                    wp.element.createElement(InspectorControls, {},
                        wp.element.createElement(TabPanel, {
                            className: "fancy-post-tabs",
                            activeClass: "active-tab",
                            tabs: [
                                { name: 'content', title: __('Content', 'fancy-post-grid') },
                                { name: 'settings', title: __('Settings', 'fancy-post-grid') },
                                { name: 'style', title: __('Style', 'fancy-post-grid') }
                            ]
                        }, (tab) => (
                            tab.name === 'content' ? wp.element.createElement('div', {}, 
                                wp.element.createElement(PanelBody, { title: __('Layout', 'fancy-post-grid'), initialOpen: true },
                                    wp.element.createElement(SelectControl, {
                                        label: __('Style ', 'fancy-post-grid'),
                                        value: layoutStyle,
                                        options: [
                                            { label: 'Style 1', value: 'style1' },
                                            { label: 'Style 2', value: 'style2' },
                                            { label: 'Style 3', value: 'style3' },
                                            { label: 'Style 4', value: 'style4' }
                                        ],
                                        onChange: (value) => setAttributes({ layoutStyle: value })
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Grid Columns', 'fancy-post-grid'),
                                        value: gridColumns,
                                        onChange: (columns) => setAttributes({ gridColumns: columns }),
                                        min: 1,
                                        max: 6
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Text Align', 'fancy-post-grid'),
                                        value: textAlign,
                                        options: [
                                            { label: 'Left', value: 'left' },
                                            { label: 'Center', value: 'center' },
                                            { label: 'Right', value: 'right' }
                                        ],
                                        onChange: (value) => setAttributes({ textAlign: value })
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: __('Read More Text', 'fancy-post-grid'),
                                        value: readMoreText,
                                        onChange: (text) => setAttributes({ readMoreText: text })
                                    })
                                ),
                                wp.element.createElement(PanelBody, { title: __('Query Build', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(TextControl, {
                                        label: __('Include Posts (IDs)', 'fancy-post-grid'),
                                        value: includePosts,
                                        onChange: (value) => setAttributes({ includePosts: value })
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: __('Exclude Posts (IDs)', 'fancy-post-grid'),
                                        value: excludePosts,
                                        onChange: (value) => setAttributes({ excludePosts: value })
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Post Limit', 'fancy-post-grid'),
                                        value: postLimit,
                                        onChange: (limit) => setAttributes({ postLimit: limit }),
                                        min: 1,
                                        max: 20
                                    })
                                ),
                                wp.element.createElement(PanelBody, { title: __('Pagination Settings', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Pagination', 'fancy-post-grid'),
                                        checked: enablePagination,
                                        onChange: (value) => setAttributes({ enablePagination: value })
                                    })
                                )
                            ) : tab.name === 'settings' ? wp.element.createElement(PanelBody, { title: __('Grid Settings', 'fancy-post-grid'), initialOpen: true },
                                wp.element.createElement(RangeControl, {
                                    label: __('Grid Columns', 'fancy-post-grid'),
                                    value: gridColumns,
                                    onChange: (columns) => setAttributes({ gridColumns: columns }),
                                    min: 1,
                                    max: 4
                                }),
                                wp.element.createElement(RangeControl, {
                                    label: __('Image Size', 'fancy-post-grid'),
                                    value: imageSize,
                                    onChange: (size) => setAttributes({ imageSize: size }),
                                    min: 50,
                                    max: 300
                                })
                            ) : wp.element.createElement(PanelBody, { title: __('Style Settings', 'fancy-post-grid'), initialOpen: true },
                                wp.element.createElement(ColorPalette, {
                                    label: __('Title Color', 'fancy-post-grid'),
                                    value: titleColor,
                                    onChange: (color) => setAttributes({ titleColor: color })
                                }),
                                wp.element.createElement(RangeControl, {
                                    label: __('Title Font Size', 'fancy-post-grid'),
                                    value: titleFontSize,
                                    onChange: (size) => setAttributes({ titleFontSize: size }),
                                    min: 10,
                                    max: 50
                                }),
                                wp.element.createElement(ColorPalette, {
                                    label: __('Button Color', 'fancy-post-grid'),
                                    value: buttonColor,
                                    onChange: (color) => setAttributes({ buttonColor: color })
                                })
                            )
                        ))
                    ),

                    posts && posts.length
                        ? wp.element.createElement(
                              'div',
                              {
                                  className: 'fancy-post-grid',
                                  style: { display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: '20px' }
                              },
                              posts.map((post) => {
                                  const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                                  const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLength).join(' ') + '...';

                                  return wp.element.createElement('div', { key: post.id, className: 'fancy-post-item' },
                                      thumbnail && wp.element.createElement('img', { src: thumbnail, alt: post.title.rendered, className: 'post-thumbnail', style: { width: imageSize, height: imageSize } }),
                                      wp.element.createElement('h3', { style: { color: titleColor, fontSize: titleFontSize } },
                                          wp.element.createElement('a', { href: post.link }, post.title.rendered)
                                      ),
                                      wp.element.createElement('p', {}, excerpt),
                                      wp.element.createElement('a', { href: post.link, className: 'read-more', style: { backgroundColor: buttonColor } }, readMoreText)
                                  );
                              })
                          )
                        : __('Loading posts...', 'fancy-post-grid')
                )
            );
        },

        save: function () {
            return null;
        }
    });
})(window.wp);
