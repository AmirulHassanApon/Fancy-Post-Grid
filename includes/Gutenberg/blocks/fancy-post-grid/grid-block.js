(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    const { PanelBody, TabPanel,DimensionControl , RangeControl,ColorPicker, ColorPalette, ToggleControl, TextControl, SelectControl } = wp.components;

    registerBlockType('fancy-post-grid/block', {
        title: __('Grid Layout', 'fancy-post-grid'),
        icon: 'grid-view',
        category: 'fancy-post-grid-category',

        attributes: {
            titleColor: { type: 'string', default: '#000000' },
            titleHoverColor: { type: 'string', default: '#ff0000' }, // New: Title hover color
            titleFontWeight: { type: 'string', default: 'normal' }, // New: Font weight
            titleFontFamily: { type: 'string', default: 'Arial' }, // New: Font family
            //Field Selector
            showPostTitle: { type: 'boolean', default: true },
            showThumbnail: { type: 'boolean', default: true },
            showPostExcerpt: { type: 'boolean', default: true },
            showReadMoreButton: { type: 'boolean', default: true },
            showMetaData: { type: 'boolean', default: true },
            showPostDate: { type: 'boolean', default: true },
            showPostAuthor: { type: 'boolean', default: true },
            showPostCategory: { type: 'boolean', default: true },
            showPostTags: { type: 'boolean', default: true },
            showPostCommentsCount: { type: 'boolean', default: true },

            showMetaIcon: { type: 'boolean', default: true },
            showPostDateIcon: { type: 'boolean', default: true },
            showPostAuthorIcon: { type: 'boolean', default: true },
            showPostCategoryIcon: { type: 'boolean', default: true },
            showPostTagsIcon: { type: 'boolean', default: true },
            showPostCommentsCountIcon: { type: 'boolean', default: true },
            //Title Settings
            titleTag: { type: 'string', default: 'h2' }, // New: H1–H6 tag selection
            titleHoverUnderLine: { type: 'string', default: 'enable' },
            titleCropBy: { type: 'string', default: 'character' },
            titleLength: { type: 'number', default: 20 },
            //Thumbnail Settings
            thumbnailSize: { type: 'string', default: 'full' },
            //Excerpt Settings
            excerptType: { type: 'string', default: 'character' },
            excerptLimit: { type: 'number', default: 50 },
            excerptIndicator: { type: 'string', default: '...' },
            //Meta data Settings
            metaAuthorPrefix: { type: 'string', default: 'By' },
            metaSeperator: { type: 'string', default: 'none' },
            authorIcon: { type: 'boolean', default: true },
            metaAuthorIcon: { type: 'string', default: 'icon' },
            //Button Settings
            readMoreLabel: { type: 'string', default: 'Read More' },
            buttonStyle: { type: 'string', default: 'filled' },
            showButtonIcon: { type: 'boolean', default: true },
            iconPosition: { type: 'string', default: 'right' },

            //Style
            //SECTION Area
            sectionBgColor: { type: 'string', default: '#ffffff' },
            sectionMargin: { type: 'string', default: '10px' },
            sectionPadding: { type: 'string', default: '10px' },
            //ITEM Box
            itemPadding: { type: 'string', default: '' },
            itemMargin: { type: 'string', default: '' },
            itemBorderRadius: { type: 'string', default: '' },
            itemBoxAlignment: { type: 'string', default: 'center' },
            normalBgType: { type: 'string', default: 'none' },
            normalBorderType: { type: 'string', default: 'solid' },
            normalBoxShadow: { type: 'string', default: '' },
            hoverBgType: { type: 'string', default: 'none' },
            hoverBorderColor: { type: 'string', default: '#000000' },
            hoverBoxShadow: { type: 'string', default: '' },

            titleFontSize: { type: 'number', default: 20 },

            buttonColor: { type: 'string', default: '#0073aa' },
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
            const { titleColor,titleHoverColor,titleFontSize,titleFontWeight,titleFontFamily,
                showPostTitle,showThumbnail,showPostExcerpt,showReadMoreButton,showMetaData,showPostDate
                ,showPostAuthor,showPostCategory,showPostTags,showPostCommentsCount,showMetaIcon,
                showPostDateIcon,showPostAuthorIcon,showPostCategoryIcon,showPostTagsIcon,showPostCommentsCountIcon,titleTag,titleHoverUnderLine,titleCropBy,titleLength,thumbnailSize,excerptType,excerptIndicator,excerptLimit,metaAuthorPrefix,metaSeperator,authorIcon,metaAuthorIcon,showButtonIcon,iconPosition,readMoreLabel,
                sectionBgColor,sectionMargin,sectionPadding,

                buttonStyle, buttonColor, imageSize, gridColumns, excerptLength, readMoreText, postType, orderBy, order, layoutStyle, textAlign, includePosts, excludePosts, postLimit, enablePagination } = attributes;

            const posts = useSelect((select) =>
                select('core').getEntityRecords('postType', postType, {
                    per_page: postLimit,
                    _embed: true,
                    orderby: orderBy,
                    order: order
                }),
                [postType, orderBy, order, postLimit]
            );

            let content;

            if (layoutStyle === 'style1' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-5 fancy-post-grid', style: { display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: '20px' } },
                    posts.map((post) => {
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLength).join(' ') + '...';

                        return wp.element.createElement('div', { key: post.id, className: 'fancy-post-item rs-blog__single' },
                            thumbnail && wp.element.createElement('img', { 
                                src: thumbnail, 
                                alt: post.title.rendered, 
                                className: 'rs-thumb post-thumbnail', 
                                style: { width: imageSize, height: imageSize } 
                            }),

                            // Title with dynamic tag, typography settings, and hover effect
                            wp.element.createElement('div', { className: 'post-title' },
                                wp.element.createElement(
                                    titleTag, 
                                    {
                                        style: { 
                                            color: titleColor, 
                                            fontSize: `${titleFontSize}px`, 
                                            fontWeight: titleFontWeight, 
                                            fontFamily: titleFontFamily, 
                                            transition: 'color 0.3s ease',
                                        },
                                        onMouseEnter: (e) => e.target.style.color = titleHoverColor,
                                        onMouseLeave: (e) => e.target.style.color = titleColor
                                    },
                                    wp.element.createElement('a', { href: post.link }, post.title.rendered)
                                )
                            ),

                            wp.element.createElement('p', {}, excerpt),
                            wp.element.createElement('a', { href: post.link, className: 'read-more', style: { backgroundColor: buttonColor } }, readMoreText)
                        );
                    })
                );
            } else if (layoutStyle === 'style2' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'fancy-post-grid', style: { display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, gap: '20px' } },
                    posts.map((post) => {
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        return wp.element.createElement('div', { key: post.id, className: 'fancy-post-item' },
                            thumbnail && wp.element.createElement('img', { src: thumbnail, alt: post.title.rendered, className: 'post-thumbnail', style: { width: imageSize, height: imageSize } }),
                            wp.element.createElement('h3', { style: { color: titleColor, fontSize: titleFontSize } },
                                wp.element.createElement('a', { href: post.link }, post.title.rendered)
                            ),
                            wp.element.createElement('a', { href: post.link, className: 'read-more', style: { backgroundColor: buttonColor } }, readMoreText)
                        );
                    })
                );
            } else {
                content = wp.element.createElement('p', {}, __('Select a style to display posts.', 'fancy-post-grid'));
            }

            return wp.element.createElement(
                'div',
                { ...useBlockProps() },
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
                            ) : tab.name === 'settings' ? wp.element.createElement('div', {}, 
                                // Field Selector Section
                                wp.element.createElement(PanelBody, { title: __('Field Selector', 'fancy-post-grid'), initialOpen: true },
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Title', 'fancy-post-grid'),
                                        checked: attributes.showPostTitle,
                                        onChange: (value) => setAttributes({ showPostTitle: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Thumbnail', 'fancy-post-grid'),
                                        checked: attributes.showThumbnail,
                                        onChange: (value) => setAttributes({ showThumbnail: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Excerpt', 'fancy-post-grid'),
                                        checked: attributes.showPostExcerpt,
                                        onChange: (value) => setAttributes({ showPostExcerpt: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Read More Button', 'fancy-post-grid'),
                                        checked: attributes.showReadMoreButton,
                                        onChange: (value) => setAttributes({ showReadMoreButton: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Meta Data', 'fancy-post-grid'),
                                        checked: attributes.showMetaData,
                                        onChange: (value) => setAttributes({ showMetaData: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Date', 'fancy-post-grid'),
                                        checked: attributes.showPostDate,
                                        onChange: (value) => setAttributes({ showPostDate: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Author', 'fancy-post-grid'),
                                        checked: attributes.showPostAuthor,
                                        onChange: (value) => setAttributes({ showPostAuthor: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Category', 'fancy-post-grid'),
                                        checked: attributes.showPostCategory,
                                        onChange: (value) => setAttributes({ showPostCategory: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Tags', 'fancy-post-grid'),
                                        checked: attributes.showPostTags,
                                        onChange: (value) => setAttributes({ showPostTags: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Comments Count', 'fancy-post-grid'),
                                        checked: attributes.showPostCommentsCount,
                                        onChange: (value) => setAttributes({ showPostCommentsCount: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Meta Icon', 'fancy-post-grid'),
                                        checked: attributes.showMetaIcon,
                                        onChange: (value) => setAttributes({ showMetaIcon: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Date Icon', 'fancy-post-grid'),
                                        checked: attributes.showPostDateIcon,
                                        onChange: (value) => setAttributes({ showPostDateIcon: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Author Icon', 'fancy-post-grid'),
                                        checked: attributes.showPostAuthorIcon,
                                        onChange: (value) => setAttributes({ showPostAuthorIcon: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Category Icon', 'fancy-post-grid'),
                                        checked: attributes.showPostCategoryIcon,
                                        onChange: (value) => setAttributes({ showPostCategoryIcon: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Tags Icon', 'fancy-post-grid'),
                                        checked: attributes.showPostTagsIcon,
                                        onChange: (value) => setAttributes({ showPostTagsIcon: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Post Comments Count Icon', 'fancy-post-grid'),
                                        checked: attributes.showPostCommentsCountIcon,
                                        onChange: (value) => setAttributes({ showPostCommentsCountIcon: value })
                                    }),
                                ),
                                //Title
                                wp.element.createElement(PanelBody, { title: __('Post Title', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(SelectControl, {
                                        label: __('Title Tag ', 'fancy-post-grid'),
                                        value: titleTag,
                                        options: [
                                            { label: 'H1', value: 'h1' },
                                            { label: 'H2', value: 'h2' },
                                            { label: 'H3', value: 'h3' },
                                            { label: 'H4', value: 'h4' },
                                            { label: 'H5', value: 'h5' },
                                            { label: 'H6', value: 'h6' },
                                        ],
                                        onChange: (value) => setAttributes({ titleTag: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Title Hover Underline ', 'fancy-post-grid'),
                                        value: titleHoverUnderLine,
                                        options: [
                                            { label: 'Enable', value: 'enable' },
                                            { label: 'Disable', value: 'disable' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ titleHoverUnderLine: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Title Crop By ', 'fancy-post-grid'),
                                        value: titleCropBy,
                                        options: [
                                            { label: 'Character', value: 'character' },
                                            { label: 'Word', value: 'word' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ titleCropBy: value })
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Title Length', 'fancy-post-grid'),
                                        value: titleLength,
                                        onChange: (limit) => setAttributes({ titleLength: limit }),
                                        min: 1,
                                        max: 50
                                    }),
                                ),
                                // Thumbnail
                                wp.element.createElement(PanelBody, { title: __('Thumbnail', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(SelectControl, {
                                        label: __('Thumbnail Size', 'fancy-post-grid'),
                                        value: thumbnailSize,
                                        options: [
                                            { label: 'Thumbnail', value: 'thumbnail' },
                                            { label: 'Medium', value: 'medium' },
                                            { label: 'Large', value: 'large' },
                                            { label: 'Full', value: 'full' },
                                            { label: 'Custom Size (768x500)', value: 'fancy_post_custom_size' },
                                            { label: 'Square(500x500)', value: 'fancy_post_square' },
                                            { label: 'Landscape(834x550)', value: 'fancy_post_landscape' },
                                            { label: 'Portrait(421x550)', value: 'fancy_post_portrait' },
                                            { label: 'List Size(1200 x 650)', value: 'fancy_post_list' },
                                        ],
                                        
                                        onChange: (value) => setAttributes({ thumbnailSize: value })
                                    }),
                                ),
                                // Excerpt / Content
                                wp.element.createElement(PanelBody, { title: __(' Excerpt / Content', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(SelectControl, {
                                        label: __('Excerpt Type ', 'fancy-post-grid'),
                                        value: excerptType,
                                        options: [
                                            { label: 'Character', value: 'character' },
                                            { label: 'Word', value: 'word' },
                                            { label: 'Full Content', value: 'full_content' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ excerptType: value })
                                    }),
                                                                  
                                    wp.element.createElement(RangeControl, {
                                        label: __('Excerpt Limit', 'fancy-post-grid'),
                                        value: excerptLimit,
                                        onChange: (limit) => setAttributes({ excerptLimit: limit }),
                                        min: 1,
                                        max: 250
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: __('Expansion Indicator', 'fancy-post-grid'),
                                        value: excerptIndicator,
                                        onChange: (text) => setAttributes({ excerptIndicator: text })
                                    })
                                ),
                                // Meta Data
                                wp.element.createElement(PanelBody, { title: __(' Meta Data', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(TextControl, {
                                        label: __('Author Prefix', 'fancy-post-grid'),
                                        value: metaAuthorPrefix,
                                        onChange: (text) => setAttributes({ metaAuthorPrefix: text })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Meta Seperator ', 'fancy-post-grid'),
                                        value: metaSeperator,
                                        options: [
                                            { label: 'None', value: 'none' },
                                            { label: 'Dot (.)', value: 'dot' },
                                            { label: 'Hyphen (-)', value: 'hyphen' },
                                            { label: 'Single Slash (/)', value: 'slash' },
                                            { label: 'Double Slash (//)', value: 'double_slash' },
                                            { label: 'Vertical Pipe (|)', value: 'pipe' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ metaSeperator: value })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Author Icon', 'fancy-post-grid'),
                                        checked: authorIcon,
                                        onChange: (value) => setAttributes({ authorIcon: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Author Image/Icon ', 'fancy-post-grid'),
                                        value: metaAuthorIcon,
                                        options: [
                                            { label: 'Icon', value: 'icon' },
                                            { label: 'Image', value: 'image' },
                                        ],
                                        onChange: (value) => setAttributes({ metaAuthorIcon: value })
                                    }),                                                                   
                                ),
                                // Button Section
                                wp.element.createElement(PanelBody, { title: __('Button Settings', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(SelectControl, {
                                        label: __('Button Style', 'fancy-post-grid'),
                                        value: buttonStyle,
                                        options: [
                                            { label: 'Filled', value: 'filled' },
                                            { label: 'Border', value: 'border' },
                                            { label: 'Flat', value: 'flat' },
                                        ],
                                        onChange: (value) => setAttributes({ buttonStyle: value })
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: __('Read More Label', 'fancy-post-grid'),
                                        value: readMoreLabel,
                                        onChange: (text) => setAttributes({ readMoreLabel: text })
                                    }),
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Show Button Icon', 'fancy-post-grid'),
                                        checked: showButtonIcon,
                                        onChange: (value) => setAttributes({ showButtonIcon: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Icon Position', 'fancy-post-grid'),
                                        value: iconPosition,
                                        options: [
                                            { label: 'Right', value: 'right' },
                                            { label: 'Left', value: 'left' },
                                        ],
                                        onChange: (value) => setAttributes({ iconPosition: value })
                                    })
                                ),
                            ) : tab.name === 'style' ? wp.element.createElement('div', {}, 
                                // Section Area
                                wp.element.createElement(PanelBody, { title: __('Section Area', 'fancy-post-grid'), initialOpen: true },
                                    
                                    wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                    wp.element.createElement(ColorPicker, {
                                        color: attributes.sectionBgColor,
                                        onChangeComplete: (value) => setAttributes({ sectionBgColor: value.hex }),
                                        disableAlpha: false,
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: __('Margin (e.g., 10px, 5%)', 'fancy-post-grid'),
                                        value: attributes.sectionMargin,
                                        onChange: (text) => setAttributes({ sectionMargin: text })
                                    }),
                                    wp.element.createElement(TextControl, {
                                        label: __('Padding (e.g., 10px, 5%)', 'fancy-post-grid'),
                                        value: attributes.sectionPadding,
                                        onChange: (text) => setAttributes({ sectionPadding: text })
                                    })
                                    
                                ),
                                //Item Box
                                
                                // Panel for "Item Box"
                                wp.element.createElement(
                                    PanelBody,
                                    { title: __('Item Box', 'fancy-post-grid'), initialOpen: false },
                                    // Padding
                                    wp.element.createElement(TextControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        value: attributes.itemPadding,
                                        onChange: (text) => setAttributes({ itemPadding: text }),
                                    }),
                                    // Margin
                                    wp.element.createElement(TextControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        value: attributes.itemMargin,
                                        onChange: (text) => setAttributes({ itemMargin: text }),
                                    }),
                                    // Border Radius
                                    wp.element.createElement(TextControl, {
                                        label: __('Border Radius (e.g., 5px)', 'fancy-post-grid'),
                                        value: attributes.itemBorderRadius,
                                        onChange: (text) => setAttributes({ itemBorderRadius: text }),
                                    }),
                                    // Box Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Box Alignment', 'fancy-post-grid'),
                                        value: attributes.itemBoxAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' },
                                        ],
                                        onChange: (value) => setAttributes({ itemBoxAlignment: value }),
                                    }),
                                    // Normal and Hover Tab
                                    wp.element.createElement(TabPanel, {
                                        tabs: [
                                            {
                                                name: 'normal',
                                                title: __('Normal', 'fancy-post-grid'),
                                                className: 'normal-tab',
                                            },
                                            {
                                                name: 'hover',
                                                title: __('Hover', 'fancy-post-grid'),
                                                className: 'hover-tab',
                                            },
                                        ],
                                        children: (tab) =>
                                            tab.name === 'normal'
                                                ? wp.element.createElement(
                                                      'div',
                                                      {},
                                                      // Background Type
                                                      wp.element.createElement(SelectControl, {
                                                          label: __('Background Type', 'fancy-post-grid'),
                                                          value: attributes.normalBgType,
                                                          options: [
                                                              { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                              { label: __('Color', 'fancy-post-grid'), value: 'color' },
                                                          ],
                                                          onChange: (value) => setAttributes({ normalBgType: value }),
                                                      }),
                                                      // Border Type
                                                      wp.element.createElement(SelectControl, {
                                                          label: __('Border Type', 'fancy-post-grid'),
                                                          value: attributes.normalBorderType,
                                                          options: [
                                                              { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                              { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                                              { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                                          ],
                                                          onChange: (value) => setAttributes({ normalBorderType: value }),
                                                      }),
                                                      // Box Shadow
                                                      wp.element.createElement(TextControl, {
                                                          label: __('Box Shadow', 'fancy-post-grid'),
                                                          value: attributes.normalBoxShadow,
                                                          onChange: (text) => setAttributes({ normalBoxShadow: text }),
                                                      })
                                                  )
                                                : wp.element.createElement(
                                                      'div',
                                                      {},
                                                      // Background Type
                                                      wp.element.createElement(SelectControl, {
                                                          label: __('Background Type', 'fancy-post-grid'),
                                                          value: attributes.hoverBgType,
                                                          options: [
                                                              { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                              { label: __('Color', 'fancy-post-grid'), value: 'color' },
                                                          ],
                                                          onChange: (value) => setAttributes({ hoverBgType: value }),
                                                      }),
                                                      // Border Color
                                                      wp.element.createElement(ColorPicker, {
                                                          color: attributes.hoverBorderColor,
                                                          onChangeComplete: (value) => setAttributes({ hoverBorderColor: value.hex }),
                                                          disableAlpha: false,
                                                      }),
                                                      // Box Shadow
                                                      wp.element.createElement(TextControl, {
                                                          label: __('Box Shadow', 'fancy-post-grid'),
                                                          value: attributes.hoverBoxShadow,
                                                          onChange: (text) => setAttributes({ hoverBoxShadow: text }),
                                                      })
                                                  ),
                                    })
                                ),
                                    
                                
                                // Content Box
                                wp.element.createElement(PanelBody, { title: __('Content Box', 'fancy-post-grid'), initialOpen: false },
                                    
                                ),
                                // Thumbnail
                                wp.element.createElement(PanelBody, { title: __(' Thumbnail', 'fancy-post-grid'), initialOpen: false },
                                    
                                ),
                                // Post Title
                                wp.element.createElement(PanelBody, { title: __('Post Title', 'fancy-post-grid'), initialOpen: false },
                                                                                                     
                                ),
                                //Excerpt
                                wp.element.createElement(PanelBody, { title: __('Excerpt', 'fancy-post-grid'), initialOpen: false },
                                    
                                ),
                                // Meta Data
                                wp.element.createElement(PanelBody, { title: __(' Meta Data', 'fancy-post-grid'), initialOpen: false },
                                    
                                ),
                                // Button
                                wp.element.createElement(PanelBody, { title: __('Button', 'fancy-post-grid'), initialOpen: false },
                                                                                                     
                                ),
                                // Pagination
                                wp.element.createElement(PanelBody, { title: __('Pagination', 'fancy-post-grid'), initialOpen: false },
                                    
                                ),
                            ) : wp.element.createElement(PanelBody, { title: __('Settings Style', 'fancy-post-grid'), initialOpen: false },
                                
                            )
                        ))
                    ),
                content
            );
        },

        save: function () {
            return null;
        }
    });
})(window.wp);
