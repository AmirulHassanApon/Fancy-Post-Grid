(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    const { Fragment } = wp.element;
    const { PanelBody, TabPanel,__experimentalBoxControl  , RangeControl,ColorPicker, ColorPalette, ToggleControl, TextControl, SelectControl  } = wp.components;

    registerBlockType('fancy-post-grid/block', {
        title: __('Grid Layout', 'fancy-post-grid'),
        icon: 'grid-view',
        category: 'fancy-post-grid-category',

        attributes: {
           
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

            //order
            metaOrder: {
                type: 'number',
                default: 1
            },
            titleOrder: {
                type: 'number',
                default: 2
            },
            excerptOrder: {
                type: 'number',
                default: 3
            },
            buttonOrder: {
                type: 'number',
                default: 4
            },
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
            metaSeperator: { type: 'string', default: '' },
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
            
            sectionMargin: {
                type: 'object',
                default: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                },
            },
            sectionPadding: {
                type: 'object',
                default: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                },
            },
            //ITEM Box
            
            itemPadding: {
                type: 'object',
                default: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                },
            },
            itemMargin: {
                type: 'object',
                default: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                },
            },
            itemBorderRadius: {
                type: 'object',
                default: {
                    top: '',
                    right: '',
                    bottom: '',
                    left: ''
                },
            },
            
            itemBoxAlignment: { type: 'string', default: 'center' },
            
            itemBorderType: { type: 'string', default: 'solid' },
            itemBoxShadow: { type: 'string', default: '' },
            itemBackgroundColor: { type: 'string', default: '' },
            itemBorderColor: { type: 'string', default: '' },
            itemHoverBoxShadow: { type: 'string', default: '' },
            itemHoverBackgroundColor: { type: 'string', default: '' },
            itemBorderWidth: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },

            //Content Box
            contentitemMargin: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            contentitemPadding: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            contentnormalBorderType: {
                type: 'string',
                default: 'none'
            },
            contentBorderWidth: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },

            //ThumbNail
            thumbnailImageWidth: { type: 'number', default: 150 },
            thumbnailWrapperWidth: { type: 'number', default: 200 },
            thumbnailWrapperHeight: { type: 'number', default: 200 },
            thumbnailMargin: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            thumbnailPadding: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            thumbnailBorderRadius: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            thumbnailBorderType: { type: 'string', default: 'none' },
            thumbnailBoxShadowColor: { type: 'string', default: '#000000' },
            //Post Title
            postTitleFontSize: { type: 'number', default: 16 },
            postTitleLineHeight: { type: 'number', default: 1.5 },
            postTitleLetterSpacing: { type: 'number', default: 1 },
            postTitleFontWeight: { type: 'string', default: '400' },
            postTitleAlignment: { type: 'string', default: 'left' },
            postTitleMargin: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            postTitlePadding: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            postTitleColor: { type: 'string', default: '#000000' },
            postTitleBgColor: { type: 'string', default: '' },
            postTitleBorderType: { type: 'string', default: 'none' },
            postTitleHoverColor: { type: 'string', default: '' },
            postTitleHoverBgColor: { type: 'string', default: '' },
            postTitleHoverBorderColor: { type: 'string', default: '' },
            postTitleBoxHoverColor: { type: 'string', default: '' },
            postTitleBoxHoverBgColor: { type: 'string', default: '' },

            //excerpt
            excerptFontSize: { type: 'number', default: 16 },
            excerptLineHeight: { type: 'number', default: 1.5 },
            excerptLetterSpacing: { type: 'number', default: 1 },
            excerptFontWeight: { type: 'string', default: '400' },
            excerptAlignment: { type: 'string', default: 'left' },
            excerptMargin: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            excerptPadding: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },
            excerptColor: { type: 'string', default: '#000000' },
            excerptBgColor: { type: 'string', default: '' },
            excerptBorderType: { type: 'string', default: 'none' },
            excerptHoverColor: { type: 'string', default: '' },
            excerptHoverBgColor: { type: 'string', default: '' },
            excerptHoverBorderColor: { type: 'string', default: '' },
            //meta 
            // Alignment
            metaAlignment: {
                type: 'string',
                default: 'left',
            },

            // Margin
            metaMargin: {
                type: 'object',
                default: { top: '', right: '', bottom: '', left: '' }
            },

            // Normal State Colors
            metaTextColor: {
                type: 'string',
                default: '#333333',
            },
            separatorColor: {
                type: 'string',
                default: '#cccccc',
            },
            metaLinkColor: {
                type: 'string',
                default: '#0073aa',
            },
            metaIconColor: {
                type: 'string',
                default: '#555555',
            },

            // Hover State Colors
            metaLinkHoverColor: {
                type: 'string',
                default: '#005177',
            },

            //Button
            // Button Alignment
            buttonAlignment: {
                type: 'string',
                default: 'center',
            },

            // Button Margin
            buttonMargin: {
                type: 'object',
                default: {
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },

            // Button Padding
            buttonPadding: {
                type: 'object',
                default: {
                    top: '10px',
                    right: '20px',
                    bottom: '10px',
                    left: '20px',
                },
            },

            // Normal State
            buttonTextColor: {
                type: 'string',
                default: '#ffffff',
            },
            buttonBackgroundColor: {
                type: 'string',
                default: '#0073aa',
            },
            buttonBorderType: {
                type: 'string',
                default: 'solid',
            },
            buttonBorderRadius: {
                type: 'string',
                default: '5px',
            },

            // Hover State
            buttonHoverTextColor: {
                type: 'string',
                default: '#ffffff',
            },
            buttonHoverBackgroundColor: {
                type: 'string',
                default: '#005177',
            },
            buttonHoverBorderType: {
                type: 'string',
                default: 'solid',
            },
            buttonHoverBorderRadius: {
                type: 'string',
                default: '5px',
            },

            //Pagination
            paginationMargin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
            paginationPadding: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
            paginationAlignment: { type: 'string', default: 'center' },
            paginationBorderStyle: { type: 'string', default: 'solid' },
            paginationBorderWidth: { type: 'number', default: 1 },
            paginationBorderRadius: { type: 'number', default: 4 },
            paginationGap: { type: 'number', default: 10 },
            paginationTextColor: { type: 'string', default: '' },
            paginationBackgroundColor: { type: 'string', default: '' },
            paginationBorderColor: { type: 'string', default: '' },
            paginationHoverTextColor: { type: 'string', default: '' },
            paginationHoverBackgroundColor: { type: 'string', default: '' },
            paginationHoverBorderColor: { type: 'string', default: '' },
            paginationActiveTextColor: { type: 'string', default: '' },
            paginationActiveBackgroundColor: { type: 'string', default: '' },
            paginationActiveBorderColor: { type: 'string', default: '' },
            buttonColor: { type: 'string', default: '#0073aa' },
            
            gridColumns: { type: 'number', default: 3 },
            excerptLength: { type: 'number', default: 20 },
            showMeta: { type: 'boolean', default: true },
            readMoreText: { type: 'string', default: __('Read More', 'fancy-post-grid') },
            postType: { type: 'string', default: 'post' },
            
            layoutStyle: { type: 'string', default: 'style1' },
            textAlign: { type: 'string', default: 'left' },
            includePosts: { type: 'string', default: '' },
            excludePosts: { type: 'string', default: '' },
            postLimit: { type: 'number', default: 6 },
            selectedCategory: {
                type: 'string',
                default: ''
            },
            selectedTag: {
                type: 'string',
                default: ''
            },
            selectedAuthor: {
                type: 'string',
                default: ''
            },
            sortOrder: {
                type: 'string',
                default: 'DESC'
            },

            postLinkTarget: { type: 'string', default: 'sameWindow' },
            thumbnailLink: { type: 'string', default: true },
            postLinkType: { type: 'string', default: 'yeslink' },

            filterCategory: { type: 'string', default: '' },
            filterTag: { type: 'string', default: '' },
            filterAuthor: { type: 'string', default: '' },
            filterDate: { type: 'string', default: '' },
            enablePagination: { type: 'boolean', default: true }
        },

        edit: function ({ attributes, setAttributes }) {
            const { 
                selectedAuthor,selectedCategory, selectedTag,sortOrder,postLinkTarget,thumbnailLink,postLinkType,

                showPostTitle,showThumbnail,showPostExcerpt,showReadMoreButton,showMetaData,showPostDate
                ,showPostAuthor,showPostCategory,showPostTags,showPostCommentsCount,showMetaIcon,
                showPostDateIcon,showPostAuthorIcon,showPostCategoryIcon,showPostTagsIcon,
                showPostCommentsCountIcon,itemBackgroundColor,itemBorderWidth,itemBorderType,
                metaOrder, titleOrder, excerptOrder, buttonOrder,
                titleTag,titleHoverUnderLine,titleCropBy,titleLength,
                thumbnailSize,excerptType,excerptIndicator,excerptLimit,metaAuthorPrefix,metaSeperator,
                authorIcon,metaAuthorIcon,showButtonIcon,iconPosition,buttonStyle,readMoreLabel,
                sectionBgColor,sectionMargin,sectionPadding,itemPadding,itemMargin,itemBorderRadius,itemHoverBackgroundColor,
                itemBoxAlignment,normalBorderType,itemBoxShadow,itemBorderColor,
                itemHoverBoxShadow,contentitemMargin,contentitemPadding,contentnormalBorderType,contentBorderWidth,
                thumbnailImageWidth,thumbnailWrapperWidth,thumbnailWrapperHeight,thumbnailMargin,
                thumbnailPadding,thumbnailBorderRadius,thumbnailBorderType,thumbnailBoxShadowColor,
                postTitleFontSize,postTitleLineHeight,postTitleLetterSpacing,postTitleFontWeight,
                postTitleAlignment,postTitleMargin,postTitlePadding,postTitleColor,postTitleBgColor,
                postTitleBorderType,postTitleHoverColor,postTitleHoverBgColor,postTitleHoverBorderColor,
                postTitleBoxHoverColor,postTitleBoxHoverBgColor,excerptFontSize,excerptLineHeight,
                excerptLetterSpacing,excerptFontWeight,excerptAlignment,excerptMargin,excerptPadding,
                excerptColor,excerptBgColor,excerptBorderType,excerptHoverColor,excerptHoverBgColor,
                excerptHoverBorderColor,metaAlignment,metaMargin,metaTextColor,separatorColor,
                metaLinkColor,metaIconColor,metaLinkHoverColor,buttonAlignment,buttonMargin,
                buttonPadding,buttonTextColor,buttonBackgroundColor,buttonBorderType,buttonBorderRadius,
                buttonHoverTextColor,buttonHoverBackgroundColor,buttonHoverBorderType,
                buttonHoverBorderRadius,paginationMargin,paginationPadding,paginationAlignment,
                paginationBorderStyle,paginationBorderWidth,paginationBorderRadius,paginationGap,
                paginationTextColor,paginationBackgroundColor,paginationBorderColor,
                paginationHoverTextColor,paginationHoverBackgroundColor,paginationHoverBorderColor,
                paginationActiveTextColor,paginationActiveBackgroundColor,paginationActiveBorderColor,

                buttonColor, gridColumns, excerptLength, readMoreText, postType, order, layoutStyle, textAlign, includePosts, excludePosts, postLimit, enablePagination } = attributes;

            const posts = useSelect((select) =>
                select('core').getEntityRecords('postType', postType, {
                    per_page: postLimit,
                    _embed: true,
                    sortOrder: sortOrder,
                    
                }),
                [postType, sortOrder, postLimit]
            );
            const authors = useSelect((select) => {
                const users = select('core').getUsers({ per_page: -1 });
                if (!users) return [];
                return users.map((user) => ({
                    label: user.name, // Display Name
                    value: user.id // User ID
                }));
            }, []);
            // Fetch categories dynamically
            const categories = useSelect((select) => {
                const terms = select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 });
                if (!terms) return [];
                return terms.map((term) => ({
                    label: term.name,
                    value: term.id
                }));
            }, []);
            // Sorting options (ASC / DESC)
            const sortingOptions = [
                { label: __('Ascending', 'fancy-post-grid'), value: 'ASC' },
                { label: __('Descending', 'fancy-post-grid'), value: 'DESC' }
            ];

            // Fetch tags dynamically
            const tags = useSelect((select) => {
                const terms = select('core').getEntityRecords('taxonomy', 'post_tag', { per_page: -1 });
                if (!terms) return [];
                return terms.map((term) => ({
                    label: term.name,
                    value: term.id
                }));
            }, []);
            const getSpacingValue = (value) => {
                if (!value) return '0px';
                
                return `${value.top || 0}px ${value.right || 0}px ${value.bottom || 0}px ${value.left || 0}px`;
            };


            let content;

            if (layoutStyle === 'style1' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-5 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: '20px',
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLength).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog__single',
                                style: {
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,
                                    boxShadow: attributes.itemBoxShadow,
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                },
                                onMouseEnter: (e) => {
                                    e.target.style.backgroundColor = attributes.itemHoverBackgroundColor;
                                    e.target.style.boxShadow = attributes.itemHoverBoxShadow;
                                },
                                onMouseLeave: (e) => {
                                    e.target.style.backgroundColor = attributes.itemBackgroundColor;
                                    e.target.style.boxShadow = attributes.itemBoxShadow;                             
                                },
                            },
                        
                            // Thumbnail Display
                            // Thumbnail Display with Link if enabled
                            showThumbnail && thumbnail &&
                                wp.element.createElement(
                                    'div',
                                    {
                                        className: 'rs-thumb thumbnail-wrapper',
                                        style: {
                                            margin: getSpacingValue(attributes.thumbnailMargin),
                                            padding: getSpacingValue(attributes.thumbnailPadding),
                                            borderRadius: getSpacingValue(attributes.thumbnailBorderRadius),
                                            boxShadow: thumbnailBoxShadowColor, // Apply shadow
                                            overflow: 'hidden', // Prevent overflow on border-radius
                                        },
                                    },
                                    thumbnailLink
                                        ? wp.element.createElement(
                                            'a',
                                            { href: post.link, target: postLinkTarget === 'newWindow' ? '_blank' : '_self' },
                                            wp.element.createElement('img', {
                                                src: thumbnail,
                                                alt: post.title.rendered,
                                                className: 'post-thumbnail',
                                                style: { objectFit: 'cover', width: '100%' },
                                            })
                                        )
                                        : wp.element.createElement('img', {
                                            src: thumbnail,
                                            alt: post.title.rendered,
                                            className: 'post-thumbnail',
                                            style: { objectFit: 'cover', width: '100%' },
                                        })
                                ),

                            
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMargin),
                                    padding: getSpacingValue(attributes.contentitemPadding),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,},
                                }, 
                                //Meta

                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list post-meta', 
                                        style: { margin: metaMargin, textAlign: metaAlignment, color: metaTextColor, order: metaOrder } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('li', { className: 'meta-date' },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt' }), // Font Awesome calendar icon
                                                ` ${post.date}`
                                            ),

                                            // Post Author
                                            showPostAuthor && wp.element.createElement('li', { className: 'meta-author' },
                                                showMetaIcon && showPostAuthorIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-user' }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}`,
                                                metaAuthorIcon === 'image' && post._embedded?.author?.[0]?.avatar_urls?.['48']
                                                    ? wp.element.createElement('img', { src: post._embedded.author[0].avatar_urls['48'], alt: 'Author Image', className: 'meta-author-image' })
                                                    : '',
                                                ` ${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Category
                                            showPostCategory && wp.element.createElement('li', { className: 'meta-category' },
                                                showMetaIcon && showPostCategoryIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-folder' }), // Font Awesome folder icon
                                                ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags' },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags' }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments' },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments' }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator' }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
                                    ),


                                //TITLE
                                // Title with Link
                                showPostTitle &&
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'title',
                                            style: {
                                                margin: getSpacingValue(attributes.postTitleMargin),
                                                padding: getSpacingValue(attributes.postTitlePadding),
                                                textAlign: postTitleAlignment,
                                                borderStyle: postTitleBorderType,
                                                transition: 'all 0.3s ease',
                                                order: titleOrder,
                                                backgroundColor: postTitleBgColor, // Background only for title div
                                            },
                                            onMouseEnter: (e) => {
                                                e.target.style.backgroundColor = postTitleHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.target.style.backgroundColor = postTitleBgColor;
                                            },
                                        },
                                        wp.element.createElement(
                                            titleTag,
                                            {
                                                style: {
                                                    color: postTitleColor,
                                                    fontSize: `${postTitleFontSize}px`,
                                                    fontWeight: postTitleFontWeight,
                                                    lineHeight: postTitleLineHeight,
                                                    letterSpacing: postTitleLetterSpacing,
                                                    borderStyle: postTitleBorderType,
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: 'transparent', // Ensure no background on title
                                                    textDecoration: titleHoverUnderLine === 'enable' ? 'underline' : 'none', // Apply underline dynamically
                                                },
                                                onMouseEnter: (e) => {
                                                    e.target.style.color = postTitleHoverColor;
                                                    e.target.style.borderColor = postTitleHoverBorderColor;
                                                },
                                                onMouseLeave: (e) => {
                                                    e.target.style.color = postTitleColor;
                                                    e.target.style.borderColor = postTitleBorderType;
                                                },
                                            },
                                            postLinkType === 'yeslink'
                                                ? wp.element.createElement(
                                                    'a',
                                                    { 
                                                        href: post.link, 
                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self' 
                                                    },
                                                    titleCropBy === 'word'
                                                        ? post.title.rendered.split(' ').slice(0, titleLength).join(' ') // Crop by word
                                                        : post.title.rendered.substring(0, titleLength) // Crop by character
                                                )
                                                : (titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength))
                                        )
                                    ),
                                
                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { order: excerptOrder } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                fontSize: excerptFontSize, 
                                                lineHeight: excerptLineHeight, 
                                                color: excerptColor, 
                                                backgroundColor: excerptBgColor,
                                                margin: getSpacingValue(attributes.excerptMargin),
                                                padding: getSpacingValue(attributes.excerptPadding),
                                            },
                                            onMouseEnter: (e) => {
                                                e.target.style.color = excerptHoverColor;
                                                e.target.style.backgroundColor = excerptHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.target.style.color = excerptColor;
                                                e.target.style.backgroundColor = excerptBgColor;
                                                
                                            }, 
                                        }, 
                                        excerptType === 'full_content' 
                                            ? excerpt 
                                            : excerptType === 'word'
                                                ? excerpt.split(' ').slice(0, excerptLimit).join(' ') + (excerpt.split(' ').length > excerptLimit ? excerptIndicator : '')
                                                : excerpt.substring(0, excerptLimit) + (excerpt.length > excerptLimit ? excerptIndicator : '')
                                        )
                                    ),

                                
                                showReadMoreButton && wp.element.createElement('div', { className: 'btn-wrapper',style: { 
                                            order: buttonOrder,  }, 
                                        }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-link read-more-${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            border: buttonStyle === 'border' ? `1px solid ${buttonBackgroundColor}` : 'none', // Border style
                                            margin: getSpacingValue(attributes.buttonMargin),
                                            padding: getSpacingValue(attributes.buttonPadding),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.target.style.color = buttonHoverTextColor;
                                            e.target.style.backgroundColor = buttonHoverBackgroundColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.target.style.color = buttonTextColor;
                                            e.target.style.backgroundColor = buttonBackgroundColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )


                            )    

                        );
                    })
                );
            }
            else if (layoutStyle === 'style2' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-5 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: '20px',
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLength).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog__single',
                                style: {
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,
                                    boxShadow: attributes.itemBoxShadow,
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                },
                                onMouseEnter: (e) => {
                                    e.target.style.backgroundColor = attributes.itemHoverBackgroundColor;
                                    e.target.style.boxShadow = attributes.itemHoverBoxShadow;
                                },
                                onMouseLeave: (e) => {
                                    e.target.style.backgroundColor = attributes.itemBackgroundColor;
                                    e.target.style.boxShadow = attributes.itemBoxShadow;                             
                                },
                            },
                        
                            // Thumbnail Display
                            // Thumbnail Display with Link if enabled
                            showThumbnail && thumbnail &&
                                wp.element.createElement(
                                    'div',
                                    {
                                        className: 'rs-thumb thumbnail-wrapper',
                                        style: {
                                            margin: getSpacingValue(attributes.thumbnailMargin),
                                            padding: getSpacingValue(attributes.thumbnailPadding),
                                            borderRadius: getSpacingValue(attributes.thumbnailBorderRadius),
                                            boxShadow: thumbnailBoxShadowColor, // Apply shadow
                                            overflow: 'hidden', // Prevent overflow on border-radius
                                        },
                                    },
                                    thumbnailLink
                                        ? wp.element.createElement(
                                            'a',
                                            { href: post.link, target: postLinkTarget === 'newWindow' ? '_blank' : '_self' },
                                            wp.element.createElement('img', {
                                                src: thumbnail,
                                                alt: post.title.rendered,
                                                className: 'post-thumbnail',
                                                style: { objectFit: 'cover', width: '100%' },
                                            })
                                        )
                                        : wp.element.createElement('img', {
                                            src: thumbnail,
                                            alt: post.title.rendered,
                                            className: 'post-thumbnail',
                                            style: { objectFit: 'cover', width: '100%' },
                                        })
                                ),

                            
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMargin),
                                    padding: getSpacingValue(attributes.contentitemPadding),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,},
                                }, 
                                //Meta

                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list post-meta', 
                                        style: { margin: metaMargin, textAlign: metaAlignment, color: metaTextColor, order: metaOrder } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('li', { className: 'meta-date' },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt' }), // Font Awesome calendar icon
                                                ` ${post.date}`
                                            ),

                                            // Post Author
                                            showPostAuthor && wp.element.createElement('li', { className: 'meta-author' },
                                                showMetaIcon && showPostAuthorIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-user' }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}`,
                                                metaAuthorIcon === 'image' && post._embedded?.author?.[0]?.avatar_urls?.['48']
                                                    ? wp.element.createElement('img', { src: post._embedded.author[0].avatar_urls['48'], alt: 'Author Image', className: 'meta-author-image' })
                                                    : '',
                                                ` ${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Category
                                            showPostCategory && wp.element.createElement('li', { className: 'meta-category' },
                                                showMetaIcon && showPostCategoryIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-folder' }), // Font Awesome folder icon
                                                ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags' },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags' }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments' },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments' }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator' }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
                                    ),


                                //TITLE
                                // Title with Link
                                showPostTitle &&
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'title',
                                            style: {
                                                margin: getSpacingValue(attributes.postTitleMargin),
                                                padding: getSpacingValue(attributes.postTitlePadding),
                                                textAlign: postTitleAlignment,
                                                borderStyle: postTitleBorderType,
                                                transition: 'all 0.3s ease',
                                                order: titleOrder,
                                                backgroundColor: postTitleBgColor, // Background only for title div
                                            },
                                            onMouseEnter: (e) => {
                                                e.target.style.backgroundColor = postTitleHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.target.style.backgroundColor = postTitleBgColor;
                                            },
                                        },
                                        wp.element.createElement(
                                            titleTag,
                                            {
                                                style: {
                                                    color: postTitleColor,
                                                    fontSize: `${postTitleFontSize}px`,
                                                    fontWeight: postTitleFontWeight,
                                                    lineHeight: postTitleLineHeight,
                                                    letterSpacing: postTitleLetterSpacing,
                                                    borderStyle: postTitleBorderType,
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: 'transparent', // Ensure no background on title
                                                    textDecoration: titleHoverUnderLine === 'enable' ? 'underline' : 'none', // Apply underline dynamically
                                                },
                                                onMouseEnter: (e) => {
                                                    e.target.style.color = postTitleHoverColor;
                                                    e.target.style.borderColor = postTitleHoverBorderColor;
                                                },
                                                onMouseLeave: (e) => {
                                                    e.target.style.color = postTitleColor;
                                                    e.target.style.borderColor = postTitleBorderType;
                                                },
                                            },
                                            postLinkType === 'yeslink'
                                                ? wp.element.createElement(
                                                    'a',
                                                    { 
                                                        href: post.link, 
                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self' 
                                                    },
                                                    titleCropBy === 'word'
                                                        ? post.title.rendered.split(' ').slice(0, titleLength).join(' ') // Crop by word
                                                        : post.title.rendered.substring(0, titleLength) // Crop by character
                                                )
                                                : (titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength))
                                        )
                                    ),
                                
                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { order: excerptOrder } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                fontSize: excerptFontSize, 
                                                lineHeight: excerptLineHeight, 
                                                color: excerptColor, 
                                                backgroundColor: excerptBgColor,
                                                margin: getSpacingValue(attributes.excerptMargin),
                                                padding: getSpacingValue(attributes.excerptPadding),
                                            },
                                            onMouseEnter: (e) => {
                                                e.target.style.color = excerptHoverColor;
                                                e.target.style.backgroundColor = excerptHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.target.style.color = excerptColor;
                                                e.target.style.backgroundColor = excerptBgColor;
                                                
                                            }, 
                                        }, 
                                        excerptType === 'full_content' 
                                            ? excerpt 
                                            : excerptType === 'word'
                                                ? excerpt.split(' ').slice(0, excerptLimit).join(' ') + (excerpt.split(' ').length > excerptLimit ? excerptIndicator : '')
                                                : excerpt.substring(0, excerptLimit) + (excerpt.length > excerptLimit ? excerptIndicator : '')
                                        )
                                    ),

                                
                                showReadMoreButton && wp.element.createElement('div', { className: 'btn-wrapper',style: { 
                                            order: buttonOrder,  }, 
                                        }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-link read-more-${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            border: buttonStyle === 'border' ? `1px solid ${buttonBackgroundColor}` : 'none', // Border style
                                            margin: getSpacingValue(attributes.buttonMargin),
                                            padding: getSpacingValue(attributes.buttonPadding),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.target.style.color = buttonHoverTextColor;
                                            e.target.style.backgroundColor = buttonHoverBackgroundColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.target.style.color = buttonTextColor;
                                            e.target.style.backgroundColor = buttonBackgroundColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )


                            )    

                        );
                    })
                );
            }
            else if (layoutStyle === 'style3' && posts && posts.length) {
                
            }
             else {
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
                                    
                                ),
                                wp.element.createElement(PanelBody, { title: __('Query Build', 'fancy-post-grid'), initialOpen: false },

                                    wp.element.createElement(SelectControl, {
                                        label: __('Select Author', 'fancy-post-grid'),
                                        value: selectedAuthor,
                                        options: [{ label: __('All Authors', 'fancy-post-grid'), value: '' }, ...authors],
                                        onChange: (value) => setAttributes({ selectedAuthor: value })
                                    }),
                                    // Select Category
                                    wp.element.createElement(SelectControl, {
                                        label: __('Select Category', 'fancy-post-grid'),
                                        value: selectedCategory,
                                        options: [{ label: __('All Categories', 'fancy-post-grid'), value: '' }, ...categories],
                                        onChange: (value) => setAttributes({ selectedCategory: value })
                                    }),
                                    // Select Tag
                                    wp.element.createElement(SelectControl, {
                                        label: __('Select Tag', 'fancy-post-grid'),
                                        value: selectedTag,
                                        options: [{ label: __('All Tags', 'fancy-post-grid'), value: '' }, ...tags],
                                        onChange: (value) => setAttributes({ selectedTag: value })
                                    }),
                                    
                                    // Sort Order (ASC/DESC)
                                    wp.element.createElement(SelectControl, {
                                        label: __('Sort Order', 'fancy-post-grid'),
                                        value: sortOrder,
                                        options: sortingOptions,
                                        onChange: (value) => setAttributes({ sortOrder: value })
                                    }),

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
                                    }),
                                ),
                                wp.element.createElement(PanelBody, { title: __('Pagination Settings', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Pagination', 'fancy-post-grid'),
                                        checked: enablePagination,
                                        onChange: (value) => setAttributes({ enablePagination: value })
                                    })
                                ),
                                wp.element.createElement(PanelBody, { title: __('Links', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(SelectControl, {
                                        label: __('Post Link Type ', 'fancy-post-grid'),
                                        value: postLinkType,
                                        options: [
                                            { label: 'Link to details page', value: 'yeslink' },
                                            { label: 'No Link', value: 'nolink' },
                                        ],
                                        onChange: (value) => setAttributes({ postLinkType: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Link Target ', 'fancy-post-grid'),
                                        value: postLinkTarget,
                                        options: [
                                            { label: 'Same Window', value: 'sameWindow' },
                                            { label: 'New Window', value: 'newWindow' },
                                        ],
                                        onChange: (value) => setAttributes({ postLinkTarget: value })
                                    }),

                                    wp.element.createElement(ToggleControl, {
                                        label: __('Thumbnail Link', 'fancy-post-grid'),
                                        checked: thumbnailLink,
                                        onChange: (value) => setAttributes({ thumbnailLink: value })
                                    }),
                                ),

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
                                wp.element.createElement(PanelBody, { title: __('Item Order', 'fancy-post-grid'), initialOpen: false },
                                    wp.element.createElement(RangeControl, {
                                        label: __('Meta', 'fancy-post-grid'),
                                        value: metaOrder,
                                        onChange: (limit) => setAttributes({ metaOrder: limit }),
                                        min: 1,
                                        max: 4
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Title Order', 'fancy-post-grid'),
                                        value: titleOrder,
                                        onChange: (value) => setAttributes({ titleOrder: value }),
                                        min: 1,
                                        max: 4
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Excerpt Order', 'fancy-post-grid'),
                                        value: excerptOrder,
                                        onChange: (value) => setAttributes({ excerptOrder: value }),
                                        min: 1,
                                        max: 4
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Button Order', 'fancy-post-grid'),
                                        value: buttonOrder,
                                        onChange: (value) => setAttributes({ buttonOrder: value }),
                                        min: 1,
                                        max: 4
                                    })
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
                                            { label: 'None', value: '' },
                                            { label: 'Dot (.)', value: '.' },
                                            { label: 'Hyphen (-)', value: '-' },
                                            { label: 'Single Slash (/)', value: '/' },
                                            { label: 'Double Slash (//)', value: '//' },
                                            { label: 'Vertical Pipe (|)', value: '|' },
                                            
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
                                    
                                    wp.element.createElement(ColorPalette, {
                                        label: __('Background Color', 'fancy-post-grid'),
                                        value: attributes.sectionBgColor,
                                        onChange: (value) => setAttributes({ sectionBgColor: value }),
                                    }),
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin (e.g., 10px, 5%)', 'fancy-post-grid'),
                                        value: attributes.sectionMargin,
                                        onChange: (value) => setAttributes({ sectionMargin: value })
                                    }),
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding (e.g., 10px, 5%)', 'fancy-post-grid'),
                                        value: attributes.sectionPadding,
                                        onChange: (value) => setAttributes({ sectionPadding: value })
                                    })
                                    
                                ),
                                //Item Box
                                
                                // Panel for "Item Box"
                                wp.element.createElement(
                                    PanelBody,
                                    { title: __('Item Box', 'fancy-post-grid'), initialOpen: false },
                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        value: attributes.itemPadding,
                                        onChange: (value) => setAttributes({ itemPadding: value }),
                                    }),
                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.itemMargin,
                                        onChange: (value) => setAttributes({ itemMargin: value }),
                                    }),
                                    // Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Radius (e.g., 5px)', 'fancy-post-grid'),
                                        value: attributes.itemBorderRadius,
                                        onChange: (value) => setAttributes({ itemBorderRadius: value }),
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
                                                      wp.element.createElement('p', {}, __('Item Box Background Color', 'fancy-post-grid')),
                                                      wp.element.createElement(ColorPicker, {
                                                          color: attributes.itemBackgroundColor,
                                                          onChangeComplete: (value) => setAttributes({ itemBackgroundColor: value.hex }),
                                                          disableAlpha: false,
                                                      }),
                                                      // Border Type
                                                      wp.element.createElement(SelectControl, {
                                                          label: __('Border Type', 'fancy-post-grid'),
                                                          value: attributes.itemBorderType,
                                                          options: [
                                                              { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                              { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                                              { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                                              { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                                              { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                                              { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                                          ],
                                                          onChange: (value) => setAttributes({ itemBorderType: value }),
                                                      }),
                                                      // Border Width
                                                      wp.element.createElement(__experimentalBoxControl, {
                                                        label: __('Border Width', 'fancy-post-grid'),
                                                        values: attributes.itemBorderWidth,
                                                        onChange: (value) => setAttributes({ itemBorderWidth: value }),
                                                      }),
                                                      // Border Color
                                                      wp.element.createElement('p', {}, __('Item Border Color', 'fancy-post-grid')),
                                                      wp.element.createElement(ColorPicker, {
                                                          color: attributes.itemBorderColor,
                                                          onChangeComplete: (value) => setAttributes({ itemBorderColor: value.hex }),
                                                          disableAlpha: false,
                                                      }),
                                                      // Box Shadow
                                                      wp.element.createElement('p', {}, __('Box Shadow', 'fancy-post-grid')),
                                                      wp.element.createElement(ColorPicker, {
                                                          color: attributes.itemBoxShadow,
                                                          onChangeComplete: (value) => setAttributes({ itemBoxShadow: value.hex }),
                                                          disableAlpha: false,
                                                      }),
                                                      
                                                  )
                                                : wp.element.createElement(
                                                      'div',
                                                      {},
                                                      // Background Type
                                                      wp.element.createElement('p', {}, __('Item Box Hover Background Color', 'fancy-post-grid')),
                                                      wp.element.createElement(ColorPicker, {
                                                          color: attributes.itemHoverBackgroundColor,
                                                          onChangeComplete: (value) => setAttributes({ itemHoverBackgroundColor: value.hex }),
                                                          disableAlpha: false,
                                                      }),

                                                      // Box Shadow
                                                      wp.element.createElement('p', {}, __('Box Shadow Hover Color', 'fancy-post-grid')),
                                                      wp.element.createElement(ColorPicker, {
                                                          color: attributes.itemHoverBoxShadow,
                                                          onChangeComplete: (value) => setAttributes({ itemHoverBoxShadow: value.hex }),
                                                          disableAlpha: false,
                                                      }),
                                                      
                                                  ),
                                    })
                                ),
                                    
                                
                                // Content Box
                                wp.element.createElement(PanelBody, { title: __('Content Box', 'fancy-post-grid'), initialOpen: false },
                                    // Margin Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.contentitemMargin,
                                        onChange: (value) => setAttributes({ contentitemMargin: value }),
                                    }),

                                    // Padding Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.contentitemPadding,
                                        onChange: (value) => setAttributes({ contentitemPadding: value }),
                                    }),

                                    // Border Style Control
                                    wp.element.createElement(SelectControl, {
                                        label: __('Border Type', 'fancy-post-grid'),
                                        value: attributes.contentnormalBorderType,
                                        options: [
                                            { label: __('None', 'fancy-post-grid'), value: 'none' },
                                            { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                            { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                            { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                            { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                            { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                        ],
                                        onChange: (value) => setAttributes({ contentnormalBorderType: value }),
                                    }),
                                    // Border Width
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        values: attributes.contentBorderWidth,
                                        onChange: (value) => setAttributes({ contentBorderWidth: value }),
                                    }),
                                ),
                                // Thumbnail
                                wp.element.createElement(PanelBody, { title: __(' Thumbnail', 'fancy-post-grid'), initialOpen: false },
                                    // Image Width
                                    wp.element.createElement(RangeControl, {
                                        label: __('Image Width', 'fancy-post-grid'),
                                        value: attributes.thumbnailImageWidth,
                                        onChange: (value) => setAttributes({ thumbnailImageWidth: value }),
                                        min: 50,
                                        max: 500
                                    }),

                                    // Wrapper Width
                                    wp.element.createElement(RangeControl, {
                                        label: __('Wrapper Width', 'fancy-post-grid'),
                                        value: attributes.thumbnailWrapperWidth,
                                        onChange: (value) => setAttributes({ thumbnailWrapperWidth: value }),
                                        min: 50,
                                        max: 500
                                    }),

                                    // Wrapper Height
                                    wp.element.createElement(RangeControl, {
                                        label: __('Wrapper Height', 'fancy-post-grid'),
                                        value: attributes.thumbnailWrapperHeight,
                                        onChange: (value) => setAttributes({ thumbnailWrapperHeight: value }),
                                        min: 50,
                                        max: 500
                                    }),

                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.thumbnailMargin,
                                        onChange: (value) => setAttributes({ thumbnailMargin: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.thumbnailPadding,
                                        onChange: (value) => setAttributes({ thumbnailPadding: value }),
                                    }),

                                    // Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Radius', 'fancy-post-grid'),
                                        values: attributes.thumbnailBorderRadius,
                                        onChange: (value) => setAttributes({ thumbnailBorderRadius: value }),
                                    }),

                                    // Border Type
                                    wp.element.createElement(SelectControl, {
                                        label: __('Border Type', 'fancy-post-grid'),
                                        value: attributes.thumbnailBorderType,
                                        options: [
                                            { label: __('None', 'fancy-post-grid'), value: 'none' },
                                            { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                            { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                            { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                            { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                            { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                        ],
                                        onChange: (value) => setAttributes({ thumbnailBorderType: value }),
                                    }),

                                    // Box Shadow Color
                                    wp.element.createElement('p', {}, __('Box Shadow Color', 'fancy-post-grid')),
                                    wp.element.createElement(ColorPicker, {
                                        label: __('Box Shadow Color', 'fancy-post-grid'),
                                        color: attributes.thumbnailBoxShadowColor,
                                        onChange: (color) => setAttributes({ thumbnailBoxShadowColor: color }),
                                    })
                                ),
                                // Post Title
                                wp.element.createElement(PanelBody, { title: __('Post Title', 'fancy-post-grid'), initialOpen: false },
                                    // Typography Section
                                    wp.element.createElement(RangeControl, {
                                        label: __('Font Size', 'fancy-post-grid'),
                                        value: attributes.postTitleFontSize,
                                        onChange: (value) => setAttributes({ postTitleFontSize: value }),
                                        min: 10,
                                        max: 50
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Line Height', 'fancy-post-grid'),
                                        value: attributes.postTitleLineHeight,
                                        onChange: (value) => setAttributes({ postTitleLineHeight: value }),
                                        min: 1,
                                        max: 3,
                                        step: 0.1
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Letter Spacing', 'fancy-post-grid'),
                                        value: attributes.postTitleLetterSpacing,
                                        onChange: (value) => setAttributes({ postTitleLetterSpacing: value }),
                                        min: 0,
                                        max: 10
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Font Weight', 'fancy-post-grid'),
                                        value: attributes.postTitleFontWeight,
                                        options: [
                                            { label: __('Default', 'fancy-post-grid'), value: 'default' },
                                            { label: __('Light', 'fancy-post-grid'), value: '300' },
                                            { label: __('Normal', 'fancy-post-grid'), value: '400' },
                                            { label: __('Bold', 'fancy-post-grid'), value: '700' },
                                            { label: __('Extra Bold', 'fancy-post-grid'), value: '900' }
                                        ],
                                        onChange: (value) => setAttributes({ postTitleFontWeight: value }),
                                    }),

                                    // Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Text Alignment', 'fancy-post-grid'),
                                        value: attributes.postTitleAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' }
                                        ],
                                        onChange: (value) => setAttributes({ postTitleAlignment: value }),
                                    }),

                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.postTitleMargin,
                                        onChange: (value) => setAttributes({ postTitleMargin: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.postTitlePadding,
                                        onChange: (value) => setAttributes({ postTitlePadding: value }),
                                    }),

                                    // Tabs for Normal, Hover, Box Hover
                                    wp.element.createElement(
                                        TabPanel,
                                        {
                                            className: "fpg-post-title-tabs",
                                            activeClass: "active-tab",
                                            tabs: [
                                                { name: "normal", title: __("Normal", "fancy-post-grid") },
                                                { name: "hover", title: __("Hover", "fancy-post-grid") },
                                                { name: "box-hover", title: __("Box Hover", "fancy-post-grid") }
                                            ]
                                        },
                                        (tab) => {
                                            switch (tab.name) {
                                                case "normal":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Text Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Text Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleColor,
                                                            onChange: (value) => setAttributes({ postTitleColor: value }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Background Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleBgColor,
                                                            onChange: (value) => setAttributes({ postTitleBgColor: value }),
                                                        }),
                                                        wp.element.createElement(SelectControl, {
                                                            label: __('Border Type', 'fancy-post-grid'),
                                                            value: attributes.postTitleBorderType,
                                                            options: [
                                                                { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                                { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                                                { label: __('Dashed', 'fancy-post-grid') , value: 'dashed' },
                                                                { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' }
                                                            ],
                                                            onChange: (value) => setAttributes({ postTitleBorderType: value }),
                                                        })
                                                    );
                                                
                                                case "hover":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Text Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Hover Text Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleHoverColor,
                                                            onChange: (value) => setAttributes({ postTitleHoverColor: value }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Hover Background Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleHoverBgColor,
                                                            onChange: (value) => setAttributes({ postTitleHoverBgColor: value }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Hover Border Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleHoverBorderColor,
                                                            onChange: (value) => setAttributes({ postTitleHoverBorderColor: value }),
                                                        })
                                                    );
                                                
                                                case "box-hover":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Box Hover Text Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Box Hover Text Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleBoxHoverColor,
                                                            onChange: (value) => setAttributes({ postTitleBoxHoverColor: value }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Box Hover Background Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Box Hover Background Color', 'fancy-post-grid'),
                                                            value: attributes.postTitleBoxHoverBgColor,
                                                            onChange: (value) => setAttributes({ postTitleBoxHoverBgColor: value }),
                                                        })
                                                    );
                                            }
                                        }
                                    )                                                                 
                                ),
                                //Excerpt
                                wp.element.createElement(PanelBody, { title: __('Excerpt', 'fancy-post-grid'), initialOpen: false },
                                    // Typography Section
                                    wp.element.createElement(RangeControl, {
                                        label: __('Font Size', 'fancy-post-grid'),
                                        value: attributes.excerptFontSize,
                                        onChange: (value) => setAttributes({ excerptFontSize: value }),
                                        min: 10,
                                        max: 50
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Line Height', 'fancy-post-grid'),
                                        value: attributes.excerptLineHeight,
                                        onChange: (value) => setAttributes({ excerptLineHeight: value }),
                                        min: 1,
                                        max: 3,
                                        step: 0.1
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Letter Spacing', 'fancy-post-grid'),
                                        value: attributes.excerptLetterSpacing,
                                        onChange: (value) => setAttributes({ excerptLetterSpacing: value }),
                                        min: 0,
                                        max: 10
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Font Weight', 'fancy-post-grid'),
                                        value: attributes.excerptFontWeight,
                                        options: [
                                            { label: __('Default', 'fancy-post-grid'), value: 'default' },
                                            { label: __('Light', 'fancy-post-grid'), value: '300' },
                                            { label: __('Normal', 'fancy-post-grid'), value: '400' },
                                            { label: __('Bold', 'fancy-post-grid'), value: '700' },
                                            { label: __('Extra Bold', 'fancy-post-grid'), value: '900' }
                                        ],
                                        onChange: (value) => setAttributes({ excerptFontWeight: value }),
                                    }),

                                    // Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Text Alignment', 'fancy-post-grid'),
                                        value: attributes.excerptAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' }
                                        ],
                                        onChange: (value) => setAttributes({ excerptAlignment: value }),
                                    }),

                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.excerptMargin,
                                        onChange: (value) => setAttributes({ excerptMargin: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.excerptPadding,
                                        onChange: (value) => setAttributes({ excerptPadding: value }),
                                    }),

                                    // Tabs for Normal & Hover
                                    wp.element.createElement(
                                        TabPanel,
                                        {
                                            className: "fpg-excerpt-tabs",
                                            activeClass: "active-tab",
                                            tabs: [
                                                { name: "normal", title: __("Normal", "fancy-post-grid") },
                                                { name: "hover", title: __("Hover", "fancy-post-grid") }
                                            ]
                                        },
                                        (tab) => {
                                            switch (tab.name) {
                                                case "normal":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Text Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Text Color', 'fancy-post-grid'),
                                                            value: attributes.excerptColor,
                                                            onChange: (value) => setAttributes({ excerptColor: value }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Background Color', 'fancy-post-grid'),
                                                            value: attributes.excerptBgColor,
                                                            onChange: (value) => setAttributes({ excerptBgColor: value }),
                                                        }),
                                                        wp.element.createElement(SelectControl, {
                                                            label: __('Border Type', 'fancy-post-grid'),
                                                            value: attributes.excerptBorderType,
                                                            options: [
                                                                { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                                { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                                                { label: __('Dashed', 'fancy-post-grid') , value: 'dashed' },
                                                                { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' }
                                                            ],
                                                            onChange: (value) => setAttributes({ excerptBorderType: value }),
                                                        })
                                                    );
                                                
                                                case "hover":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Hover Text Color', 'fancy-post-grid'),
                                                            value: attributes.excerptHoverColor,
                                                            onChange: (value) => setAttributes({ excerptHoverColor: value }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Hover Background Color', 'fancy-post-grid'),
                                                            value: attributes.excerptHoverBgColor,
                                                            onChange: (value) => setAttributes({ excerptHoverBgColor: value }),
                                                        }),
                                                        wp.element.createElement(ColorPalette, {
                                                            label: __('Hover Border Color', 'fancy-post-grid'),
                                                            value: attributes.excerptHoverBorderColor,
                                                            onChange: (value) => setAttributes({ excerptHoverBorderColor: value }),
                                                        })
                                                    );
                                            }
                                        }
                                    )
                                ),
                                // Meta Data
                                wp.element.createElement(PanelBody, { title: __(' Meta Data', 'fancy-post-grid'), initialOpen: false },
                                    
                                    // Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Alignment', 'fancy-post-grid'),
                                        value: attributes.metaAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' },
                                        ],
                                        onChange: (value) => setAttributes({ metaAlignment: value }),
                                    }),

                                    // Margin Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.metaMargin,
                                        onChange: (value) => setAttributes({ metaMargin: value }),
                                    }),

                                    // Tabs for Normal & Hover States
                                    wp.element.createElement(TabPanel, {
                                        className: "meta-settings-tabs",
                                        activeClass: "active-tab",
                                        tabs: [
                                            { name: 'normal', title: __('Normal', 'fancy-post-grid'), className: 'normal-tab' },
                                            { name: 'hover', title: __('Hover', 'fancy-post-grid'), className: 'hover-tab' },
                                        ],
                                    }, (tab) => {
                                        return tab.name === 'normal' ? [
                                            // Meta Text Color
                                            wp.element.createElement('p', {}, __('Meta Text Color', 'fancy-post-grid')),

                                            wp.element.createElement(ColorPalette, {
                                                label: __('Meta Text Color', 'fancy-post-grid'),
                                                value: attributes.metaTextColor,
                                                onChange: (value) => setAttributes({ metaTextColor: value }),
                                            }),

                                            // Separator Color
                                            wp.element.createElement('p', {}, __('Separator Color', 'fancy-post-grid')),

                                            wp.element.createElement(ColorPalette, {
                                                label: __('Separator Color', 'fancy-post-grid'),
                                                value: attributes.separatorColor,
                                                onChange: (value) => setAttributes({ separatorColor: value }),
                                            }),

                                            // Meta Link Color
                                            wp.element.createElement('p', {}, __('Meta Link Color', 'fancy-post-grid')),
    
                                            wp.element.createElement(ColorPalette, {
                                                label: __('Meta Link Color', 'fancy-post-grid'),
                                                value: attributes.metaLinkColor,
                                                onChange: (value) => setAttributes({ metaLinkColor: value }),
                                            }),

                                            // Icon Color
                                            wp.element.createElement('p', {}, __('Icon Color', 'fancy-post-grid')),

                                            wp.element.createElement(ColorPalette, {
                                                label: __('Icon Color', 'fancy-post-grid'),
                                                value: attributes.metaIconColor,
                                                onChange: (value) => setAttributes({ metaIconColor: value }),
                                            }),

                                        ] : [
                                            // Hover Meta Link Color
                                            wp.element.createElement('p', {}, __('Meta Link Hover Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                label: __('Meta Link Hover Color', 'fancy-post-grid'),
                                                value: attributes.metaLinkHoverColor,
                                                onChange: (value) => setAttributes({ metaLinkHoverColor: value }),
                                            }),
                                        ];
                                    })
                                    
                                ),
                                // Button
                                wp.element.createElement(PanelBody, { title: __('Button', 'fancy-post-grid'), initialOpen: false },
                                    // Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Alignment', 'fancy-post-grid'),
                                        value: attributes.buttonAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' },
                                        ],
                                        onChange: (value) => setAttributes({ buttonAlignment: value }),
                                    }),

                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.buttonMargin,
                                        onChange: (value) => setAttributes({ buttonMargin: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.buttonPadding,
                                        onChange: (value) => setAttributes({ buttonPadding: value }),
                                    }),

                                    wp.element.createElement(
                                        TabPanel,
                                        {
                                            className: "button-settings-tabs",
                                            activeClass: "active-tab",
                                            tabs: [
                                                { name: 'normal', title: __('Normal', 'fancy-post-grid'), className: 'normal-tab' },
                                                { name: 'hover', title: __('Hover', 'fancy-post-grid'), className: 'hover-tab' },
                                            ],
                                        },
                                        (tab) => {
                                            return tab.name === 'normal' ? [
                                                // Button Text Color
                                                wp.element.createElement('p', {}, __('Text Color', 'fancy-post-grid')),
                                                wp.element.createElement(ColorPalette, {
                                                    label: __('Text Color', 'fancy-post-grid'),
                                                    value: attributes.buttonTextColor,
                                                    onChange: (value) => setAttributes({ buttonTextColor: value }),
                                                }),

                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                wp.element.createElement(ColorPalette, {
                                                    label: __('Background Color', 'fancy-post-grid'),
                                                    value: attributes.buttonBackgroundColor,
                                                    onChange: (value) => setAttributes({ buttonBackgroundColor: value }),
                                                }),

                                                // Button Border Type
                                                wp.element.createElement(SelectControl, {
                                                    label: __('Border Type', 'fancy-post-grid'),
                                                    value: attributes.buttonBorderType,
                                                    options: [
                                                        { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                        { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                                        { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                                        { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                                        { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                                        { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                                    ],
                                                    onChange: (value) => setAttributes({ buttonBorderType: value }),
                                                }),

                                                // Button Border Radius
                                                wp.element.createElement(RangeControl, {
                                                    label: __('Border Radius', 'fancy-post-grid'),
                                                    value: attributes.buttonBorderRadius,
                                                    min: 0,
                                                    max: 50,
                                                    onChange: (value) => setAttributes({ buttonBorderRadius: value }),
                                                }),

                                            ] : [
                                                // Hover Button Text Color
                                                wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                                wp.element.createElement(ColorPalette, {
                                                    label: __('Hover Text Color', 'fancy-post-grid'),
                                                    value: attributes.buttonHoverTextColor,
                                                    onChange: (value) => setAttributes({ buttonHoverTextColor: value }),
                                                }),

                                                // Hover Button Background Color
                                                wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                wp.element.createElement(ColorPalette, {
                                                    label: __('Hover Background Color', 'fancy-post-grid'),
                                                    value: attributes.buttonHoverBackgroundColor,
                                                    onChange: (value) => setAttributes({ buttonHoverBackgroundColor: value }),
                                                }),

                                                // Hover Button Border Type
                                                wp.element.createElement(SelectControl, {
                                                    label: __('Hover Border Type', 'fancy-post-grid'),
                                                    value: attributes.buttonHoverBorderType,
                                                    options: [
                                                        { label: __('None', 'fancy-post-grid'), value: 'none' },
                                                        { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                                        { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                                        { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                                        { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                                        { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                                    ],
                                                    onChange: (value) => setAttributes({ buttonHoverBorderType: value }),
                                                }),

                                                // Hover Button Border Radius
                                                wp.element.createElement(RangeControl, {
                                                    label: __('Hover Border Radius', 'fancy-post-grid'),
                                                    value: attributes.buttonHoverBorderRadius,
                                                    min: 0,
                                                    max: 50,
                                                    onChange: (value) => setAttributes({ buttonHoverBorderRadius: value }),
                                                }),
                                            ];
                                        }
                                    )
                                                                                                                                     
                                ),
                                // Pagination
                                wp.element.createElement(PanelBody, { title: __('Pagination', 'fancy-post-grid'), initialOpen: false },
                                    // Margin & Padding Controls
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.paginationMargin,
                                        onChange: (value) => setAttributes({ paginationMargin: value }),
                                    }),
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.paginationPadding,
                                        onChange: (value) => setAttributes({ paginationPadding: value }),
                                    }),

                                    // Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Alignment', 'fancy-post-grid'),
                                        value: attributes.paginationAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' },
                                        ],
                                        onChange: (value) => setAttributes({ paginationAlignment: value }),
                                    }),

                                    // Border Controls
                                    wp.element.createElement(SelectControl, {
                                        label: __('Border Style', 'fancy-post-grid'),
                                        value: attributes.paginationBorderStyle,
                                        options: [
                                            { label: __('None', 'fancy-post-grid'), value: 'none' },
                                            { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                            { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                            { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                        ],
                                        onChange: (value) => setAttributes({ paginationBorderStyle: value }),
                                    }),

                                    wp.element.createElement(RangeControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        value: attributes.paginationBorderWidth,
                                        onChange: (value) => setAttributes({ paginationBorderWidth: value }),
                                        min: 0,
                                        max: 10
                                    }),

                                    wp.element.createElement(RangeControl, {
                                        label: __('Border Radius', 'fancy-post-grid'),
                                        value: attributes.paginationBorderRadius,
                                        onChange: (value) => setAttributes({ paginationBorderRadius: value }),
                                        min: 0,
                                        max: 50
                                    }),

                                    wp.element.createElement(RangeControl, {
                                        label: __('Gap', 'fancy-post-grid'),
                                        value: attributes.paginationGap,
                                        onChange: (value) => setAttributes({ paginationGap: value }),
                                        min: 0,
                                        max: 50
                                    }),

                                    // Tabs for Normal, Hover, Active States
                                    wp.element.createElement(TabPanel, {
                                        className: "pagination-tabs",
                                        activeClass: "active-tab",
                                        tabs: [
                                            { name: 'normal', title: __('Normal', 'fancy-post-grid'), className: 'normal-tab' },
                                            { name: 'hover', title: __('Hover', 'fancy-post-grid'), className: 'hover-tab' },
                                            { name: 'active', title: __('Active', 'fancy-post-grid'), className: 'active-tab' },
                                        ],
                                    }, (tab) => {
                                        return tab.name === 'normal' ? [
                                            // Normal Text Color
                                            wp.element.createElement('p', {}, __('Text Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationTextColor,
                                                onChange: (value) => setAttributes({ paginationTextColor: value }),
                                            }),

                                            // Normal Background Color
                                            wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationBackgroundColor,
                                                onChange: (value) => setAttributes({ paginationBackgroundColor: value }),
                                            }),

                                            // Normal Border Color
                                            wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationBorderColor,
                                                onChange: (value) => setAttributes({ paginationBorderColor: value }),
                                            }),

                                        ] : tab.name === 'hover' ? [
                                            // Hover Text Color
                                            wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationHoverTextColor,
                                                onChange: (value) => setAttributes({ paginationHoverTextColor: value }),
                                            }),

                                            // Hover Background Color
                                            wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationHoverBackgroundColor,
                                                onChange: (value) => setAttributes({ paginationHoverBackgroundColor: value }),
                                            }),

                                            // Hover Border Color
                                            wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationHoverBorderColor,
                                                onChange: (value) => setAttributes({ paginationHoverBorderColor: value }),
                                            }),

                                        ] : [
                                            // Active Text Color
                                            wp.element.createElement('p', {}, __('Active Text Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationActiveTextColor,
                                                onChange: (value) => setAttributes({ paginationActiveTextColor: value }),
                                            }),

                                            // Active Background Color
                                            wp.element.createElement('p', {}, __('Active Background Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationActiveBackgroundColor,
                                                onChange: (value) => setAttributes({ paginationActiveBackgroundColor: value }),
                                            }),

                                            // Active Border Color
                                            wp.element.createElement('p', {}, __('Active Border Color', 'fancy-post-grid')),
                                            wp.element.createElement(ColorPalette, {
                                                value: attributes.paginationActiveBorderColor,
                                                onChange: (value) => setAttributes({ paginationActiveBorderColor: value }),
                                            }),
                                        ];
                                    })
                                    
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
