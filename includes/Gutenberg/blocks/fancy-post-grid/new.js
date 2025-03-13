(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    
    const { Fragment,useState, useEffect  } = wp.element;
    const { PanelBody, TabPanel,__experimentalBoxControl  , RangeControl,ColorPicker, ColorPalette, ToggleControl, TextControl, SelectControl  } = wp.components;

    registerBlockType('fancy-post-grid/block', {
        title: __('Grid Layout', 'fancy-post-grid'),
        icon: 'grid-view',
        category: 'fancy-post-grid-category',

        attributes: {

            // CONTENT
            // Layout
            gridColumns: { type: 'number', default: 3 },
            gridLayoutStyle: { type: 'string', default: 'style1' },
            // Query Builder
            selectedCategory: { type: 'string', default: '' },
            selectedTag: { type: 'string', default: '' },
            
            orderBy: { type: 'string', default: 'title' },
            
            postLimit: { type: 'number', default: 3 },           
            // Pagination settings
            enablePagination: { type: 'boolean', default: true },
            // links
            postLinkTarget: { type: 'string', default: 'sameWindow' },
            thumbnailLink: { type: 'string', default: true },
            postLinkType: { type: 'string', default: 'yeslink' },
            //SETTINGS
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
            //ITEM order
            metaOrder: { type: 'number', default: 1 },
            titleOrder: { type: 'number', default: 2 },
            excerptOrder: { type: 'number', default: 3 },
            buttonOrder: { type: 'number', default: 4 },
            //Title Settings
            titleTag: { type: 'string', default: 'h2' }, // New: H1–H6 tag selection
            titleHoverUnderLine: { type: 'string', default: 'enable' },
            titleCropBy: { type: 'string', default: 'cha' },
            titleLength: { type: 'number', default: 20 },
            //Thumbnail Settings
            thumbnailSize: { type: 'string', default: 'full' },
            //Excerpt Settings
            excerptType: { type: 'string', default: 'word' },
            excerptLimit: { type: 'number', default: 50 },
            excerptIndicator: { type: 'string', default: '...' },
            //Meta data Settings
            metaAuthorPrefix: { type: 'string', default: 'By' },
            metaSeperator: { type: 'string', default: '' },
            
            //Button Settings
            readMoreLabel: { type: 'string', default: 'Read More' },
            buttonStyle: { type: 'string', default: 'filled' },
            showButtonIcon: { type: 'boolean', default: true },
            iconPosition: { type: 'string', default: 'right' },
            //Style
            //SECTION Area
            sectionBgColor: { type: 'string', default: '#ffffff' },
            sectionMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            sectionPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },            
            //ITEM Box
            
            itemMargin: {
                type: 'object',
                default: {
                    top: { value: '', unit: 'px' },
                    right: { value: '', unit: 'px' },
                    bottom: { value: '', unit: 'px' },
                    left: { value: '', unit: 'px' },
                },
            },

            itemPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemBoxAlignment: { type: 'string', default: 'center' },
            itemBorderType: { type: 'string', default: 'solid' },
            itemBoxShadow: { type: 'string', default: '' },
            itemBackgroundColor: { type: 'string', default: '' },
            itemBorderColor: { type: 'string', default: '' },
            
            itemHoverBackgroundColor: { type: 'string', default: '' },
            itemBorderWidth: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },            
            //Content Box
            contentitemMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentitemPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentBorderWidth: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentnormalBorderType: { type: 'string', default: 'none' },            
            //ThumbNail            
            thumbnailMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            thumbnailPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            thumbnailBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            
            //Post Title
            postTitleFontSize: { type: 'number', default: 16 },
            postTitleLineHeight: { type: 'number', default: 1.5 },
            postTitleLetterSpacing: { type: 'number', default: 1 },
            postTitleFontWeight: { type: 'string', default: '400' },
            postTitleAlignment: { type: 'string', default: 'left' },
            postTitleMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            postTitlePadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            postTitleColor: { type: 'string', default: '#000000' },
            postTitleBgColor: { type: 'string', default: '' },
            
            postTitleHoverColor: { type: 'string', default: '' },
            postTitleHoverBgColor: { type: 'string', default: '' },
                    
            //excerpt
            excerptFontSize: { type: 'number', default: 16 },
            excerptLineHeight: { type: 'number', default: 1.5 },
            excerptLetterSpacing: { type: 'number', default: 1 },
            excerptFontWeight: { type: 'string', default: '400' },
            excerptAlignment: { type: 'string', default: 'left' },
            excerptMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            excerptPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },           
            excerptColor: { type: 'string', default: '#000000' },
            excerptBgColor: { type: 'string', default: '' },
            excerptBorderType: { type: 'string', default: 'none' },
            excerptHoverColor: { type: 'string', default: '' },
            excerptHoverBgColor: { type: 'string', default: '' },
            excerptHoverBorderColor: { type: 'string', default: '' },
            //meta 
            metaAlignment: { type: 'string', default: 'left' },
            metaMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, }, 
            metaTextColor: { type: 'string', default: '#333333' },
            separatorColor: { type: 'string', default: '#cccccc' },
            metaLinkColor: { type: 'string', default: '#0073aa' },
            metaIconColor: { type: 'string', default: '#555555' },
            metaLinkHoverColor: { type: 'string', default: '#005177' },
            //Button
            buttonAlignment: { type: 'string', default: 'center' },
            buttonMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            buttonPaddingNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },  
            buttonTextColor: { type: 'string', default: '#ffffff' },
            buttonBackgroundColor: { type: 'string', default: '#0073aa' },
            buttonBorderType: { type: 'string', default: 'solid' },
            buttonBorderRadius: { type: 'string', default: '5px' },
            buttonBorderWidth: { type: 'string', default: '5px' },
            buttonHoverTextColor: { type: 'string', default: '#ffffff' },
            buttonHoverBackgroundColor: { type: 'string', default: '#005177' },
           
            //Pagination
            paginationMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            paginationPaddingNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },  
            
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
            postType: { type: 'string', default: 'post' },
            
        },

        edit: function ({ attributes, setAttributes }) {
            const { 
                gridColumns,gridLayoutStyle
                ,selectedCategory, selectedTag,orderBy, postLimit,enablePagination,
                postLinkTarget,thumbnailLink,postLinkType,

                showPostTitle,showThumbnail,showPostExcerpt,showReadMoreButton,showMetaData,showPostDate
                ,showPostAuthor,showPostCategory,showPostTags,showPostCommentsCount,showMetaIcon,
                showPostDateIcon,showPostAuthorIcon,showPostCategoryIcon,showPostTagsIcon,
                showPostCommentsCountIcon,
                metaOrder, titleOrder, excerptOrder, buttonOrder,                
                titleTag,titleHoverUnderLine,titleCropBy,titleLength,
                thumbnailSize,
                excerptType,excerptIndicator,excerptLimit,
                metaAuthorPrefix,metaSeperator,
                showButtonIcon,iconPosition,buttonStyle,readMoreLabel,
                sectionBgColor,sectionMargin,sectionPadding,

                itemPadding,itemMargin,itemBorderRadius,itemHoverBackgroundColor,
                itemBoxAlignment,itemBoxShadow,itemBorderColor,itemBackgroundColor,itemBorderWidth,
                itemBorderType, 

                contentitemMargin,contentitemPadding,contentnormalBorderType,contentBorderWidth,

                thumbnailMargin,thumbnailPadding,thumbnailBorderRadius,

                postTitleFontSize,postTitleLineHeight,postTitleLetterSpacing,postTitleFontWeight,
                postTitleAlignment,postTitleMargin,postTitlePadding,postTitleColor,postTitleBgColor
                ,postTitleHoverColor,postTitleHoverBgColor,
                
                excerptFontSize,excerptLineHeight,excerptLetterSpacing,excerptFontWeight,excerptAlignment,excerptMargin,
                excerptPadding,excerptColor,excerptBgColor,excerptBorderType,excerptHoverColor,excerptHoverBgColor,
                excerptHoverBorderColor,

                metaAlignment,metaMargin,metaTextColor,separatorColor,metaLinkColor,metaIconColor,metaLinkHoverColor,

                buttonAlignment,buttonMarginNew,buttonPaddingNew,buttonTextColor,buttonBackgroundColor,buttonBorderType
                ,buttonBorderWidth,
                buttonBorderRadius,buttonHoverTextColor,buttonHoverBackgroundColor,

                paginationMarginNew,paginationPaddingNew,paginationAlignment,
                paginationBorderStyle,paginationBorderWidth,paginationBorderRadius,paginationGap,
                paginationTextColor,paginationBackgroundColor,paginationBorderColor,
                paginationHoverTextColor,paginationHoverBackgroundColor,paginationHoverBorderColor,
                paginationActiveTextColor,paginationActiveBackgroundColor,paginationActiveBorderColor, 
                postType  } = attributes;

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
            
            const [currentPage, setCurrentPage] = useState(1);
            const [totalPages, setTotalPages] = useState(1);

            // Fetch posts dynamically based on the current page
            const { posts, totalPagesFromAPI } = useSelect((select) => {
                const query = {
                    per_page: postLimit,
                    _embed: true,
                    page: currentPage,
                    orderby: orderBy, // Dynamic sorting field (e.g., 'date', 'title', etc.)
                    categories: selectedCategory ? selectedCategory : undefined, // Apply category filter if selected
                    tags: selectedTag ? selectedTag : undefined, // Apply tag filter if selected
                };

                // Fetch posts
                const postsData = select('core').getEntityRecords('postType', postType, query);
                
                // Fetch total pages from response headers
                const totalPagesFromAPI = select('core').getEntityRecords('postType', postType, {
                    per_page: 1, // Fetching only 1 to get total count
                })?._paging?.totalPages || 1; // Ensure fallback value

                return {
                    posts: postsData,
                    totalPagesFromAPI,
                };
            }, [postType, postLimit, currentPage, selectedCategory, selectedTag, orderBy]);

            // Update total pages when API response changes
            useEffect(() => {
                if (totalPagesFromAPI) {
                    setTotalPages(totalPagesFromAPI);
                }
            }, [totalPagesFromAPI]);

            // Function to handle page changes
            const handlePageClick = (pageNumber) => {
                if (pageNumber >= 1 && pageNumber <= totalPages) {
                    setCurrentPage(pageNumber);
                }
            };

            // Generate pagination numbers (1,2,3,...)
            const paginationNumbers = [];
            for (let i = 1; i <= totalPages; i++) {
                paginationNumbers.push(
                    wp.element.createElement(
                        'button',
                        {
                            key: i,
                            onClick: () => handlePageClick(i),
                            style: {
                                
                                backgroundColor: currentPage === i ? attributes.paginationActiveBackgroundColor : '#007cba',
                                color: currentPage === i ? attributes.paginationActiveTextColor : '#fff',
                                borderStyle: attributes.paginationBorderStyle,
                                borderWidth: `${attributes.paginationBorderWidth}px`,
                                borderRadius: `${attributes.paginationBorderRadius}px`,
                                borderColor: attributes.paginationActiveBorderColor,
                                padding: getSpacingValue(attributes.paginationPaddingNew),
                            },
                            
                        },
                        i
                    )
                );
            }
            // Pagination controls
            const paginationControls = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'fpg-pagination',
                            style: {
                                display: 'flex',
                                justifyContent: attributes.paginationAlignment,
                                margin: getSpacingValue(attributes.paginationMarginNew),
                                gap: attributes.paginationGap,
                            },
                        },
                        wp.element.createElement(
                            'button',
                            {
                                onClick: () => handlePageClick(currentPage - 1),
                                disabled: currentPage === 1,
                                style: {
                                    
                                    padding: getSpacingValue(attributes.paginationPaddingNew),
                                    backgroundColor: attributes.paginationBackgroundColor,
                                    color: attributes.paginationTextColor,
                                    borderStyle: attributes.paginationBorderStyle,
                                    borderWidth: `${attributes.paginationBorderWidth}px`,
                                    borderRadius: `${attributes.paginationBorderRadius}px`,
                                    borderColor: attributes.paginationBorderColor,
                                },
                                onMouseEnter: (e) => {
                                    e.currentTarget.style.backgroundColor = attributes.paginationHoverBackgroundColor;
                                    e.currentTarget.style.borderColor = attributes.paginationHoverBorderColor;
                                    e.currentTarget.style.color = attributes.paginationHoverTextColor;
                                    
                                },
                                onMouseLeave: (e) => {
                                    e.currentTarget.style.backgroundColor = attributes.paginationBackgroundColor;
                                    e.currentTarget.style.borderColor = attributes.paginationBorderColor;
                                    e.currentTarget.style.color = attributes.paginationTextColor;
                                    
                                },
                            },
                            __('Previous', 'fancy-post-grid')
                        ),
                        ...paginationNumbers, // Dynamically generated pagination buttons
                        wp.element.createElement(
                            'button',
                            {
                                onClick: () => handlePageClick(currentPage + 1),
                                disabled: currentPage === totalPages,
                                style: {
                                    
                                    padding: getSpacingValue(attributes.paginationPaddingNew),
                                    backgroundColor: attributes.paginationBackgroundColor,
                                    color: attributes.paginationTextColor,
                                    borderStyle: attributes.paginationBorderStyle,
                                    borderWidth: `${attributes.paginationBorderWidth}px`,
                                    borderRadius: `${attributes.paginationBorderRadius}px`,
                                    borderColor: attributes.paginationBorderColor,
                                },
                                onMouseEnter: (e) => {
                                    e.currentTarget.style.backgroundColor = attributes.paginationHoverBackgroundColor;
                                    e.currentTarget.style.borderColor = attributes.paginationHoverBorderColor;
                                    e.currentTarget.style.color = attributes.paginationHoverTextColor;
                                    
                                },
                                onMouseLeave: (e) => {
                                    e.currentTarget.style.backgroundColor = attributes.paginationBackgroundColor;
                                    e.currentTarget.style.borderColor = attributes.paginationBorderColor;
                                    e.currentTarget.style.color = attributes.paginationTextColor;
                                    
                                },
                            },
                            __('Next', 'fancy-post-grid')
                        )
                    )
                )
            );
            
            let content;

            if (gridLayoutStyle === 'style1' && posts && posts.length) {
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
                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
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
                                    e.currentTarget.style.backgroundColor = attributes.itemHoverBackgroundColor;
                                    // e.currentTarget.style.boxShadow = attributes.itemHoverBoxShadow;
                                },
                                onMouseLeave: (e) => {
                                    e.currentTarget.style.backgroundColor = attributes.itemBackgroundColor;
                                    // e.currentTarget.style.boxShadow = attributes.itemBoxShadow;
                                },
                            },
                        
                            // Thumbnail Display with Link if enabled
                            showThumbnail && thumbnail &&
                                wp.element.createElement(
                                    'div',
                                    {
                                        className: 'rs-thumb thumbnail-wrapper',
                                        style: {
                                            margin: getSpacingValue(attributes.thumbnailMargin),
                                            padding: getSpacingValue(attributes.thumbnailPadding),
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
                                                style: { objectFit: 'cover', width: '100%',borderRadius: getSpacingValue(attributes.thumbnailBorderRadius), },
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
                                            showPostAuthor && wp.element.createElement(
                                                'li', 
                                                { className: 'meta-author' },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user' }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
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
                                                transition: 'all 0.3s ease',
                                                order: titleOrder,
                                                backgroundColor: postTitleBgColor, // Background only for title div
                                            },
                                            onMouseEnter: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleBgColor;
                                            },
                                        },
                                        wp.element.createElement(
                                            titleTag,
                                            {
                                                
                                                
                                            },
                                            postLinkType === 'yeslink'
                                                ? wp.element.createElement(
                                                    'a',
                                                    { 
                                                        href: post.link, 
                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                        style: { // Ensure the styles apply to the <a> tag
                                                            color: postTitleColor, // Inherit from parent to avoid default blue link color
                                                            fontSize: `${postTitleFontSize}px`,
                                                            fontWeight: postTitleFontWeight,
                                                            lineHeight: postTitleLineHeight,
                                                            letterSpacing: postTitleLetterSpacing,
                                                            
                                                            transition: 'all 0.3s ease',

                                                        },
                                                        onMouseEnter: (e) => {
                                                            e.currentTarget.style.color = postTitleHoverColor;
                                                        },
                                                        onMouseLeave: (e) => {
                                                            e.currentTarget.style.color = postTitleColor;
                                                        },
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
                                        style: { order: excerptOrder,
                                                margin: getSpacingValue(attributes.excerptMargin),
                                                padding: getSpacingValue(attributes.excerptPadding) } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                fontSize: excerptFontSize, 
                                                lineHeight: excerptLineHeight, 
                                                color: excerptColor, 
                                                backgroundColor: excerptBgColor                                                
                                            },
                                            onMouseEnter: (e) => {
                                                e.currentTarget.style.color = excerptHoverColor;
                                                e.currentTarget.style.backgroundColor = excerptHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.currentTarget.style.color = excerptColor;
                                                e.currentTarget.style.backgroundColor = excerptBgColor;
                                                
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
                                            order: buttonOrder,
                                            margin: getSpacingValue(attributes.buttonMarginNew),
                                            textAlign: buttonAlignment  }, 
                                        }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-link read-more-${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )

                            )    

                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        wp.element.createElement('div', { className: 'pagination-container' }, paginationControls) // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style2' && posts && posts.length) {
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
                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
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
                                            margin: getSpacingValue(attributes.buttonMarginNew),
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
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
            else if (gridLayoutStyle === 'style3' && posts && posts.length) {
                
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
                                        value: gridLayoutStyle,
                                        options: [
                                            { label: 'Style 1', value: 'style1' },
                                            { label: 'Style 2', value: 'style2' },
                                            { label: 'Style 3', value: 'style3' },
                                            { label: 'Style 4', value: 'style4' }
                                        ],
                                        onChange: (value) => setAttributes({ gridLayoutStyle: value })
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

                                    
                                    // Select Category
                                    wp.element.createElement(SelectControl, {
                                        label: __('Select Category', 'fancy-post-grid'),
                                        value: selectedCategory || '', // Default to '' if selectedCategory is not set
                                        options: [{ label: __('All Categories', 'fancy-post-grid'), value: '' }, ...categories],
                                        onChange: (value) => setAttributes({ selectedCategory: value }) // Update selectedCategory value
                                    }),

                                    // Select Tag
                                    wp.element.createElement(SelectControl, {
                                        label: __('Select Tag', 'fancy-post-grid'),
                                        value: selectedTag || '',
                                        options: [{ label: __('All Tags', 'fancy-post-grid'), value: '' }, ...tags],
                                        onChange: (value) => setAttributes({ selectedTag: value })
                                    }),
                                    
                                    // Create SelectControl for selecting orderBy field (sorting field)
                                    wp.element.createElement(SelectControl, {
                                        label: __('Order By', 'fancy-post-grid'),
                                        value: orderBy,  // orderBy is the state variable
                                        
                                        options: [
                                            { label: __('Date', 'fancy-post-grid'), value: 'date' },
                                            { label: __('Title', 'fancy-post-grid'), value: 'title' },
                                            { label: __('Modified', 'fancy-post-grid'), value: 'modified' },
                                        ],
                                        onChange: (value) => setAttributes({ orderBy: value }) // Set the selected field as orderBy
                                    }),
                                    
                                    wp.element.createElement(RangeControl, {
                                        label: __('Post Limit', 'fancy-post-grid'),
                                        value: postLimit,
                                        onChange: (limit) => setAttributes({ postLimit: limit }),
                                        min: 1,
                                        max: 50
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
                                            { label: 'Character', value: 'cha' },
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
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.sectionPadding,
                                        onChange: (value) => setAttributes({ sectionPadding: value }),
                                    }),
                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.sectionMargin,
                                        onChange: (value) => setAttributes({ sectionMargin: value }),
                                    }),
                                    
                                ),
                                //Item Box
                                
                                // Panel for "Item Box"
                                wp.element.createElement(
                                    PanelBody,
                                    { title: __('Item Box', 'fancy-post-grid'), initialOpen: false },
                                    // Padding
                                    
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.itemPadding,
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
                                        values: attributes.itemBorderRadius,
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
                                                      
                                                      wp.element.createElement(ColorPalette, {
                                                            label: __('Background Color', 'fancy-post-grid'),
                                                            value: attributes.itemBackgroundColor,
                                                            onChange: (value) => setAttributes({ itemBackgroundColor: value }),
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
                                                      
                                                      wp.element.createElement(ColorPalette, {
                                                            label: __('Item Border Color', 'fancy-post-grid'),
                                                            value: attributes.itemBorderColor,
                                                            onChange: (value) => setAttributes({ itemBorderColor: value }),
                                                        }),

                                                      // Box Shadow
                                                      wp.element.createElement('p', {}, __('Box Shadow Color', 'fancy-post-grid')),
                                                      
                                                      wp.element.createElement(ColorPalette, {
                                                            label: __('Box Shadow Color', 'fancy-post-grid'),
                                                            value: attributes.itemBoxShadow,
                                                            onChange: (value) => setAttributes({ itemBoxShadow: value }),
                                                        }),
                                                      
                                                  )
                                                : wp.element.createElement(
                                                      'div',
                                                      {},
                                                      // Background Type
                                                      wp.element.createElement('p', {}, __('Item Box Hover Background Color', 'fancy-post-grid')),
                                                      wp.element.createElement(ColorPalette, {
                                                            label: __('Box Shadow Color', 'fancy-post-grid'),
                                                            value: attributes.itemHoverBackgroundColor,
                                                            onChange: (value) => setAttributes({ itemHoverBackgroundColor: value }),
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

                                    // Image Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Image Radius', 'fancy-post-grid'),
                                        values: attributes.thumbnailBorderRadius,
                                        onChange: (value) => setAttributes({ thumbnailBorderRadius: value }),
                                    }),
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
                                        values: attributes.buttonMarginNew,
                                        onChange: (value) => setAttributes({ buttonMarginNew: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.buttonPaddingNew,
                                        onChange: (value) => setAttributes({ buttonPaddingNew: value }),
                                    }),
                                    // Button Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Radius', 'fancy-post-grid'),
                                        values: attributes.buttonBorderRadius,
                                        onChange: (value) => setAttributes({ buttonBorderRadius: value }),
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

                                    // Border Width
                                    
                                    wp.element.createElement(RangeControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        value: attributes.buttonBorderWidth,
                                        onChange: (value) => setAttributes({ buttonBorderWidth: value }),
                                        min: 0,
                                        max: 100
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

                                            ];
                                        }
                                    )
                                                                                                                                     
                                ),
                                // Pagination
                                wp.element.createElement(PanelBody, { title: __('Pagination', 'fancy-post-grid'), initialOpen: false },
                                    
                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.paginationMarginNew,
                                        onChange: (value) => setAttributes({ paginationMarginNew: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.paginationPaddingNew,
                                        onChange: (value) => setAttributes({ paginationPaddingNew: value }),
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
                                            { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                            { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                            { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                        ],
                                        onChange: (value) => setAttributes({ paginationBorderStyle: value }),
                                    }),

                                    wp.element.createElement(RangeControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        value: attributes.paginationBorderWidth,
                                        onChange: (value) => setAttributes({ paginationBorderWidth: value }),
                                        min: 0,
                                        max: 100
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
                                        max: 100
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
<?php
if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}

function fancy_post_grid_add_custom_block_category($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'fancy-post-grid-category',
                'title' => __('Fancy Post Grid', 'fancy-post-grid'),
            ),
        )
    );
}
add_filter('block_categories_all', 'fancy_post_grid_add_custom_block_category');


function fancy_post_grid_register_gutenberg_block() {  

    wp_register_script(
        'fancy-post-grid-block',
        plugins_url('blocks/fancy-post-grid/grid-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-grid/grid-block.js')
    );

    wp_register_script(
        'fancy-post-slider-block',
        plugins_url('blocks/fancy-post-slider/slider-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-slider/slider-block.js')
    );

    wp_register_script(
        'fancy-post-list-block',
        plugins_url('blocks/fancy-post-list/list-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-list/list-block.js')
    );

    wp_register_script(
        'fancy-post-isotope-block',
        plugins_url('blocks/fancy-post-isotope/isotope-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-isotope/isotope-block.js')
    );    

    wp_register_style(
        'fancy-post-grid-style',
        plugins_url('blocks/fancy-post-grid/grid-style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-grid/grid-style.css')
    );

    wp_register_style(
        'fancy-post-slider-style',
        plugins_url('blocks/fancy-post-slider/slider-style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-slider/slider-style.css')
    );

    wp_register_style(
        'fancy-post-isotope-style',
        plugins_url('blocks/fancy-post-isotope/isotope-style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-isotope/isotope-style.css')
    );

    wp_register_style(
        'fancy-post-list-style',
        plugins_url('blocks/fancy-post-list/list-style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/fancy-post-list/list-style.css')
    );

    register_block_type('fancy-post-grid/block', array(
        'editor_script' => 'fancy-post-grid-block',
        'editor_style'  => 'fancy-post-grid-style',
        'style'         => 'fancy-post-grid-style',
        'render_callback' => 'fancy_post_grid_render_callback', // PHP function to render posts
    ));

     register_block_type('fancy-post-slider/block', array(
        'editor_script' => 'fancy-post-slider-block',
        'editor_style'  => 'fancy-post-slider-style',
        'style'         => 'fancy-post-slider-style',
        'render_callback' => 'fancy_post_slider_render_callback', // PHP function to render posts
    ));

    register_block_type('fancy-post-list/block', array(
        'editor_script' => 'fancy-post-list-block',
        'editor_style'  => 'fancy-post-list-style',
        'style'         => 'fancy-post-list-style',
        'render_callback' => 'fancy_post_list_render_callback', // PHP function to render posts
    ));

     register_block_type('fancy-post-isotope/block', array(
        'editor_script' => 'fancy-post-isotope-block',
        'editor_style'  => 'fancy-post-isotope-style',
        'style'         => 'fancy-post-isotope-style',
        'render_callback' => 'fancy_post_isotope_render_callback', // PHP function to render posts
    )); 
}
add_action('init', 'fancy_post_grid_register_gutenberg_block');


function fancy_post_grid_render_callback($attributes) {
    // Content Layout
    $gridLayoutStyle = isset($attributes['gridLayoutStyle']) ? $attributes['gridLayoutStyle'] : 'style1';
    $gridColumns = isset($attributes['gridColumns']) ? absint($attributes['gridColumns']) : 3;
    //Query Builder
    $selectedCategory = isset($attributes['selectedCategory']) ? sanitize_text_field($attributes['selectedCategory']) : '';
    $selectedTag = isset($attributes['selectedTag']) ? sanitize_text_field($attributes['selectedTag']) : '';

    $orderBy = isset($attributes['orderBy']) ? sanitize_text_field($attributes['orderBy']) : 'title';
    $postLimit = isset($attributes['postLimit']) ? absint($attributes['postLimit']) : 3;
      
    // Pagination settings
    $enablePagination = isset($attributes['enablePagination']) ? filter_var($attributes['enablePagination'], FILTER_VALIDATE_BOOLEAN) : true;
    // Links
    $postLinkTarget = isset($attributes['postLinkTarget']) ? sanitize_text_field($attributes['postLinkTarget']) : '_self';
    $thumbnailLink = isset($attributes['thumbnailLink']) ? sanitize_text_field($attributes['thumbnailLink']) : 'post';
    $postLinkType = isset($attributes['postLinkType']) ? sanitize_text_field($attributes['postLinkType']) : 'default';

    // Field Selector
    $showPostTitle = isset($attributes['showPostTitle']) ? filter_var($attributes['showPostTitle'], FILTER_VALIDATE_BOOLEAN) : true;
    $showThumbnail = isset($attributes['showThumbnail']) ? filter_var($attributes['showThumbnail'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostExcerpt = isset($attributes['showPostExcerpt']) ? filter_var($attributes['showPostExcerpt'], FILTER_VALIDATE_BOOLEAN) : true;
    $showReadMoreButton = isset($attributes['showReadMoreButton']) ? filter_var($attributes['showReadMoreButton'], FILTER_VALIDATE_BOOLEAN) : true;
    $showMetaData = isset($attributes['showMetaData']) ? filter_var($attributes['showMetaData'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostDate = isset($attributes['showPostDate']) ? filter_var($attributes['showPostDate'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostAuthor = isset($attributes['showPostAuthor']) ? filter_var($attributes['showPostAuthor'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCategory = isset($attributes['showPostCategory']) ? filter_var($attributes['showPostCategory'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostTags = isset($attributes['showPostTags']) ? filter_var($attributes['showPostTags'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCommentsCount = isset($attributes['showPostCommentsCount']) ? filter_var($attributes['showPostCommentsCount'], FILTER_VALIDATE_BOOLEAN) : true;
    $showMetaIcon = isset($attributes['showMetaIcon']) ? filter_var($attributes['showMetaIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostDateIcon = isset($attributes['showPostDateIcon']) ? filter_var($attributes['showPostDateIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostAuthorIcon = isset($attributes['showPostAuthorIcon']) ? filter_var($attributes['showPostAuthorIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCategoryIcon = isset($attributes['showPostCategoryIcon']) ? filter_var($attributes['showPostCategoryIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostTagsIcon = isset($attributes['showPostTagsIcon']) ? filter_var($attributes['showPostTagsIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCommentsCountIcon = isset($attributes['showPostCommentsCountIcon']) ? filter_var($attributes['showPostCommentsCountIcon'], FILTER_VALIDATE_BOOLEAN) : true;

    // Order values
    $metaOrder = isset($attributes['metaOrder']) ? absint($attributes['metaOrder']) : 1;
    $titleOrder = isset($attributes['titleOrder']) ? absint($attributes['titleOrder']) : 2;
    $excerptOrder = isset($attributes['excerptOrder']) ? absint($attributes['excerptOrder']) : 3;
    $buttonOrder = isset($attributes['buttonOrder']) ? absint($attributes['buttonOrder']) : 4;

    // Post title settings
    $titleTag               = isset($attributes['titleTag']) ? sanitize_text_field($attributes['titleTag']) : 'h3';
    $titleHoverUnderLine    = isset($attributes['titleHoverUnderLine']) ? sanitize_text_field($attributes['titleHoverUnderLine']) : 'enable';
    $titleCropBy            = isset($attributes['titleCropBy']) ? sanitize_text_field($attributes['titleCropBy']) : '';
    $titleLength            = isset($attributes['titleLength']) ? absint($attributes['titleLength']) : 20;
    
    //THUMB sETTINGS
    $thumbnailSize = isset($attributes['thumbnailSize']) ? sanitize_text_field($attributes['thumbnailSize']) : 'full';
    // Excerpt Settings
    $excerptType = isset($attributes['excerptType']) ? sanitize_text_field($attributes['excerptType']) : 'word';
    $excerptIndicator = isset($attributes['excerptIndicator']) ? sanitize_text_field($attributes['excerptIndicator']) : '...';
    $excerptLimit = isset($attributes['excerptLimit']) ? absint($attributes['excerptLimit']) : 20;
    // Meta data Settings
    $metaAuthorPrefix = isset($attributes['metaAuthorPrefix']) ? sanitize_text_field($attributes['metaAuthorPrefix']) : __('By', 'fancy-post-grid');
    $metaSeperator = isset($attributes['metaSeperator']) ? sanitize_text_field($attributes['metaSeperator']) : '|';
    //Button Settings   
    $showButtonIcon = isset($attributes['showButtonIcon']) ? filter_var($attributes['showPostCommentsCountIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $iconPosition = isset($attributes['iconPosition']) ? sanitize_text_field($attributes['iconPosition']) : 'right';
    $buttonStyle = isset($attributes['buttonStyle']) ? sanitize_text_field($attributes['buttonStyle']) : 'filled';
    $readMoreLabel = isset($attributes['readMoreLabel']) ? sanitize_text_field($attributes['readMoreLabel']) : __('Read More', 'fancy-post-grid');
    // SECTION Area
    $sectionBgColor    = isset($attributes['sectionBgColor']) ? sanitize_hex_color($attributes['sectionBgColor']) : '';
    $sectionMargin = isset($attributes['sectionMargin']) ? $attributes['sectionMargin'] : ['top' => '', 'right' => '', 'bottom' => '10px', 'left' => ''];
    $sectionPadding = isset($attributes['sectionPadding']) ? $attributes['sectionPadding'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    // ITEM Box
    $itemPadding = isset($attributes['itemPadding']) ? $attributes['itemPadding'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $itemMargin = isset($attributes['itemMargin']) ? $attributes['itemMargin'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $itemBorderRadius = isset($attributes['itemBorderRadius']) ? $attributes['itemBorderRadius'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $itemBorderWidth = isset($attributes['itemBorderWidth']) ? $attributes['itemBorderWidth'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $itemBoxAlignment   = isset($attributes['itemBoxAlignment']) ? sanitize_text_field($attributes['itemBoxAlignment']) : 'center';
    $itemBorderType     = isset($attributes['itemBorderType']) ? sanitize_text_field($attributes['itemBorderType']) : 'solid';
    $itemBoxShadow = isset($attributes['itemBoxShadow']) ? $attributes['itemBoxShadow'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $itemBackgroundColor = isset($attributes['itemBackgroundColor']) ? sanitize_hex_color($attributes['itemBackgroundColor']) : '';
    $itemBorderColor    = isset($attributes['itemBorderColor']) ? sanitize_hex_color($attributes['itemBorderColor']) : '';   
    $itemBoxShadowColor = isset($attributes['itemBoxShadowColor']) ? sanitize_hex_color($attributes['itemBoxShadowColor']) : '';
    $itemGap      = isset($attributes['itemGap']) ? absint($attributes['itemGap']) : 10;

    // Content Box
    $contentitemPaddingNew = isset($attributes['contentitemPaddingNew']) ? $attributes['contentitemPaddingNew'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];

    $contentitemMarginNew = isset($attributes['contentitemMarginNew']) ? $attributes['contentitemMarginNew'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $contentBorderWidth = isset($attributes['contentBorderWidth']) ? $attributes['contentBorderWidth'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $contentNormalBorderType = isset($attributes['contentnormalBorderType']) ? sanitize_text_field($attributes['contentnormalBorderType']) : 'none';
    $contentBgColor    = isset($attributes['contentBgColor']) ? sanitize_hex_color($attributes['contentBgColor']) : '';   
    $contentBorderColor = isset($attributes['contentBorderColor']) ? sanitize_hex_color($attributes['contentBorderColor']) : '';
    // Thumbnail
    $thumbnailMargin = isset($attributes['thumbnailMargin']) ? $attributes['thumbnailMargin'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $thumbnailPadding = isset($attributes['thumbnailPadding']) ? $attributes['thumbnailPadding'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $thumbnailBorderRadius = isset($attributes['thumbnailBorderRadius']) ? $attributes['thumbnailBorderRadius'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];

    // Post Title
    $postTitleFontSize      = isset($attributes['postTitleFontSize']) ? absint($attributes['postTitleFontSize']) : 16;
    $postTitleLineHeight    = isset($attributes['postTitleLineHeight']) ? floatval($attributes['postTitleLineHeight']) : 1.5;
    $postTitleLetterSpacing = isset($attributes['postTitleLetterSpacing']) ? floatval($attributes['postTitleLetterSpacing']) : 1;
    $postTitleFontWeight    = isset($attributes['postTitleFontWeight']) ? sanitize_text_field($attributes['postTitleFontWeight']) : '400';
    $postTitleAlignment     = isset($attributes['postTitleAlignment']) ? sanitize_text_field($attributes['postTitleAlignment']) : 'left';
    $postTitleColor         = isset($attributes['postTitleColor']) ? sanitize_hex_color($attributes['postTitleColor']) : '#000000';
    $postTitleBgColor       = isset($attributes['postTitleBgColor']) ? sanitize_hex_color($attributes['postTitleBgColor']) : ''; 
    $postTitleHoverColor    = isset($attributes['postTitleHoverColor']) ? sanitize_hex_color($attributes['postTitleHoverColor']) : '';
    $postTitleHoverBgColor  = isset($attributes['postTitleHoverBgColor']) ? sanitize_hex_color($attributes['postTitleHoverBgColor']) : '';
    $postTitleMargin  = isset($attributes['postTitleMargin']) ? array_map('sanitize_text_field', $attributes['postTitleMargin']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $postTitlePadding = isset($attributes['postTitlePadding']) ? array_map('sanitize_text_field', $attributes['postTitlePadding']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];

    // Excerpt
    $excerptFontSize = isset($attributes['excerptFontSize']) ? absint($attributes['excerptFontSize']) : 16;
    $excerptLineHeight = isset($attributes['excerptLineHeight']) ? floatval($attributes['excerptLineHeight']) : 1.5;
    $excerptLetterSpacing = isset($attributes['excerptLetterSpacing']) ? floatval($attributes['excerptLetterSpacing']) : 1;
    $excerptFontWeight = isset($attributes['excerptFontWeight']) ? sanitize_text_field($attributes['excerptFontWeight']) : '400';
    $excerptAlignment = isset($attributes['excerptAlignment']) ? sanitize_text_field($attributes['excerptAlignment']) : 'left';
    $excerptMargin = isset($attributes['excerptMargin']) ? array_map('sanitize_text_field', $attributes['excerptMargin']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $excerptPadding = isset($attributes['excerptPadding']) ? array_map('sanitize_text_field', $attributes['excerptPadding']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $excerptColor = isset($attributes['excerptColor']) ? sanitize_hex_color($attributes['excerptColor']) : '#000000';
    $excerptBgColor = isset($attributes['excerptBgColor']) ? sanitize_hex_color($attributes['excerptBgColor']) : '';
    $excerptBorderType = isset($attributes['excerptBorderType']) ? sanitize_text_field($attributes['excerptBorderType']) : 'none';
    $excerptHoverColor = isset($attributes['excerptHoverColor']) ? sanitize_hex_color($attributes['excerptHoverColor']) : '';
    $excerptHoverBgColor = isset($attributes['excerptHoverBgColor']) ? sanitize_hex_color($attributes['excerptHoverBgColor']) : '';
    $excerptHoverBorderColor = isset($attributes['excerptHoverBorderColor']) ? sanitize_hex_color($attributes['excerptHoverBorderColor']) : '';

    // Meta Data Attributes
    $metaAlignment = isset($attributes['metaAlignment']) ? sanitize_text_field($attributes['metaAlignment']) : 'left';
    $metaMarginNew = isset($attributes['metaMarginNew']) ? $attributes['metaMarginNew'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $metaPadding = isset($attributes['metaPadding']) ? $attributes['metaPadding'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $metaTextColor = isset($attributes['metaTextColor']) ? sanitize_hex_color($attributes['metaTextColor']) : '#333333';
    $separatorColor = isset($attributes['separatorColor']) ? sanitize_hex_color($attributes['separatorColor']) : '#cccccc';
    $metaFontSize = isset($attributes['metaFontSize']) ? absint($attributes['metaFontSize']) : 16;
    $metaIconColor = isset($attributes['metaIconColor']) ? sanitize_hex_color($attributes['metaIconColor']) : '#555555';
    
    // Button Alignment
    $buttonAlignment = isset($attributes['buttonAlignment']) ? sanitize_text_field($attributes['buttonAlignment']) : 'center';
    $buttonMarginNew = isset($attributes['buttonMarginNew']) ? array_map('sanitize_text_field', $attributes['buttonMarginNew']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $buttonPaddingNew = isset($attributes['buttonPaddingNew']) ? array_map('sanitize_text_field', $attributes['buttonPaddingNew']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $buttonFontSize = isset($attributes['buttonFontSize']) ? absint($attributes['buttonFontSize']) : 16;
    $buttonBorderWidth = isset($attributes['buttonBorderWidth']) ? absint($attributes['buttonBorderWidth']) : 2;
    
    $buttonTextColor = isset($attributes['buttonTextColor']) ? sanitize_hex_color($attributes['buttonTextColor']) : '#ffffff';
    $buttonBackgroundColor = isset($attributes['buttonBackgroundColor']) ? sanitize_hex_color($attributes['buttonBackgroundColor']) : '#0073aa';
    $buttonBorderType = isset($attributes['buttonBorderType']) ? sanitize_text_field($attributes['buttonBorderType']) : 'solid';
    $buttonBorderRadius = isset($attributes['buttonBorderRadius']) ? array_map('sanitize_text_field', $attributes['buttonBorderRadius']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    

    $buttonHoverTextColor = isset($attributes['buttonHoverTextColor']) ? sanitize_hex_color($attributes['buttonHoverTextColor']) : '#ffffff';
    $buttonHoverBackgroundColor = isset($attributes['buttonHoverBackgroundColor']) ? sanitize_hex_color($attributes['buttonHoverBackgroundColor']) : '#005177';
    
    $buttonBorderColor = isset($attributes['buttonBorderColor']) ? sanitize_hex_color($attributes['buttonBorderColor']) : '#ffffff';
    $buttonHoverBorderColor = isset($attributes['buttonHoverBorderColor']) ? sanitize_hex_color($attributes['buttonHoverBorderColor']) : '#005177';


    // Pagination Attributes
    $paginationAlignment = isset($attributes['paginationAlignment']) ? sanitize_text_field($attributes['paginationAlignment']) : 'center';

    $paginationMarginNew = isset($attributes['paginationMarginNew']) ? array_map('sanitize_text_field', $attributes['paginationMarginNew']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $paginationPaddingNew = isset($attributes['paginationPaddingNew']) ? array_map('sanitize_text_field', $attributes['paginationPaddingNew']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $paginationBorderStyle = isset($attributes['paginationBorderStyle']) ? sanitize_text_field($attributes['paginationBorderStyle']) : 'solid';
    $paginationBorderWidth = isset($attributes['paginationBorderWidth']) ? absint($attributes['paginationBorderWidth']) : 1;
    $paginationBorderRadius = isset($attributes['paginationBorderRadius']) ? absint($attributes['paginationBorderRadius']) : 4;
    $paginationGap = isset($attributes['paginationGap']) ? absint($attributes['paginationGap']) : 10;
    $paginationTextColor = isset($attributes['paginationTextColor']) ? sanitize_hex_color($attributes['paginationTextColor']) : '';
    $paginationBackgroundColor = isset($attributes['paginationBackgroundColor']) ? sanitize_hex_color($attributes['paginationBackgroundColor']) : '';
    $paginationBorderColor = isset($attributes['paginationBorderColor']) ? sanitize_hex_color($attributes['paginationBorderColor']) : '';
    $paginationHoverTextColor = isset($attributes['paginationHoverTextColor']) ? sanitize_hex_color($attributes['paginationHoverTextColor']) : '';
    $paginationHoverBackgroundColor = isset($attributes['paginationHoverBackgroundColor']) ? sanitize_hex_color($attributes['paginationHoverBackgroundColor']) : '';
    $paginationHoverBorderColor = isset($attributes['paginationHoverBorderColor']) ? sanitize_hex_color($attributes['paginationHoverBorderColor']) : '';
    $paginationActiveTextColor = isset($attributes['paginationActiveTextColor']) ? sanitize_hex_color($attributes['paginationActiveTextColor']) : '';
    $paginationActiveBackgroundColor = isset($attributes['paginationActiveBackgroundColor']) ? sanitize_hex_color($attributes['paginationActiveBackgroundColor']) : '';
    $paginationActiveBorderColor = isset($attributes['paginationActiveBorderColor']) ? sanitize_hex_color($attributes['paginationActiveBorderColor']) : '';


    //END ATTRIBUTES
    
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $query_args = array(
        'post_type'      => 'post',
        'posts_per_page' => $postLimit, // Adjust as needed
        'paged'          => $paged,
        'orderby'        => $orderBy,
        'order'          => 'DESC', // Ensure ordering
    );

    // Filter by category (use 'cat' for category ID)
    if (!empty($selectedCategory) && is_numeric($selectedCategory)) {
        $query_args['cat'] = intval($selectedCategory); 
    }

    // Filter by tag (use 'tag__in' for tag IDs)
    if (!empty($selectedTag) && is_numeric($selectedTag)) {
        $query_args['tag__in'] = array(intval($selectedTag)); 
    }

    // Run the query
    $query = new WP_Query($query_args);

    if (!$query->have_posts()) {
        return '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
    }

    $output = '<div class="rs-blog-layout-5 fancy-post-grid ' . esc_attr($gridLayoutStyle) . '" 
                style="grid-template-columns: repeat(' . esc_attr($gridColumns) . ', 1fr); 
                background-color: ' . esc_attr($sectionBgColor) . '; 
                margin: ' . 
                (is_numeric($sectionMargin['top']) ? $sectionMargin['top'] . 'px' : esc_attr($sectionMargin['top'])) . ' ' . 
                (is_numeric($sectionMargin['right']) ? $sectionMargin['right'] . 'px' : esc_attr($sectionMargin['right'])) . ' ' . 
                (is_numeric($sectionMargin['bottom']) ? $sectionMargin['bottom'] . 'px' : esc_attr($sectionMargin['bottom'])) . ' ' . 
                (is_numeric($sectionMargin['left']) ? $sectionMargin['left'] . 'px' : esc_attr($sectionMargin['left'])) . '; 
                padding: ' . 
                (is_numeric($sectionPadding['top']) ? $sectionPadding['top'] . 'px' : esc_attr($sectionPadding['top'])) . ' ' . 
                (is_numeric($sectionPadding['right']) ? $sectionPadding['right'] . 'px' : esc_attr($sectionPadding['right'])) . ' ' . 
                (is_numeric($sectionPadding['bottom']) ? $sectionPadding['bottom'] . 'px' : esc_attr($sectionPadding['bottom'])) . ' ' . 
                (is_numeric($sectionPadding['left']) ? $sectionPadding['left'] . 'px' : esc_attr($sectionPadding['left'])) . ';">';


        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $permalink = get_permalink($post_id);
            $title = get_the_title();
            // $excerpt = wp_trim_words(get_the_excerpt(), 20);
            $date = get_the_date();
            $author = get_the_author();
            $categories = get_the_category_list(', ');
            $tags = get_the_tag_list('', ', ');
            $comments_count = get_comments_number();
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize, ['class' => 'fancy-post-thumbnail']);


            // Title Crop
            if ($titleCropBy === 'word') {
                $titleArray = explode(' ', $title);
                $croppedTitle = implode(' ', array_slice($titleArray, 0, $titleLength));
            } else {
                $croppedTitle = mb_substr($title, 0, $titleLength);
            }
            // Fetch full content when 'full_content' is selected
            if ($excerptType === 'full_content') {
                $excerpt = apply_filters('the_content', get_the_content());
            } elseif ($excerptType === 'word') {
                $excerpt = wp_trim_words(get_the_excerpt(), $excerptLimit, $excerptIndicator);
            } else { // 'character'
                $excerpt = mb_substr(get_the_excerpt(), 0, $excerptLimit) . $excerptIndicator;
            }

            // Style-based output
            if ($gridLayoutStyle === 'style1') {
                // Full post layout
                $output .= '<div class="fancy-post-item rs-blog__single" 
                            style=" margin: ' . 
                                    (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) . ' ' . 
                                    (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) . ' ' . 
                                    (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) . ' ' . 
                                    (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) . '; padding: ' . 
                                    (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                                    (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                                    (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                                    (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; border-radius: ' . 
                                    (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                                    (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                                    (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                                    (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . ';  border-width: ' . 
                                    (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                                    (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                                    (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                                    (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; border-style: ' . esc_attr($itemBorderType) . '; border-color: ' . esc_attr($itemBorderColor) . '; background-color: ' . esc_attr($itemBackgroundColor) . '; box-shadow: ' . 
                                    (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                                    (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                                    (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                                    (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                                    esc_attr($itemBoxShadowColor) . ';    text-align: ' . esc_attr($itemBoxAlignment) . ';">';
                // Thumbnail
                if ($thumbnail && $showThumbnail) {

                    $output .= '<div class="fancy-post-image rs-thumb" style=" margin: ' . 
                                    (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                                    (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                                    (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                                    (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; padding: ' . 
                                    (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                                    (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                                    (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                                    (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">
                                <a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' . 
                                    (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' . 
                                    (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' . 
                                    (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' . 
                                    (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';  overflow: hidden;">' . $thumbnail . '</a>
                        </div>';
                }
                // END Thumbnail
                

                // MAIN Content
                $output .= '<div class="rs-content" style=" margin: ' . 
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' . 
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' . 
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' . 
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; padding: ' . 
                            (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) . ' ' . 
                            (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) . ' ' . 
                            (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) . ' ' . 
                            (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) . '; border-width: ' . 
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' . 
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' . 
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . ';
                ">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<ul class="meta-data-list" style="
                        order: ' . esc_attr($metaOrder) . '; 
                        text-align: ' . esc_attr($metaAlignment) . ';
                        
                        margin: ' . 
                            (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' . 
                            (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' . 
                            (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' . 
                            (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . ';padding: ' . 
                            (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' . 
                            (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' . 
                            (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' . 
                            (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . ';
                        color: ' . esc_attr($metaTextColor) . ';
                    ">';

                    // Date
                    if ($showPostDate) {
                        $output .= '<li class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                        
                        if ($showPostDateIcon && $showMetaIcon) {
                            $output .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        
                        $output .= esc_html($date) . '</li>';

                        // Add separator with font size and color
                        $output .= '<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span> ';
                    }


                    // Author
                    if ($showPostAuthor) {
                        $output .= '<li class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon  && $showMetaIcon) {
                            $output .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li> ';
                        // Add separator with font size and color
                        $output .= '<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span> ';
                    }
                    
                    // Categories
                    if ($showPostCategory) {
                        $output .= '<li class="meta-categories" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $output .= '<i class="ri-folder-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= $categories . '</li> '; 
                        // Add separator with font size and color
                        $output .= '<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span> ';
                    }

                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $output .= '<li class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $output .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li> '; 
                        // Add separator with font size and color
                        $output .= '<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span> ';
                    }

                    // Comment Count
                    if ($showPostCommentsCount) {
                        $output .= '<li class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $output .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                    }

                    $output .= '</ul>';
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $output .= '<' . esc_attr($titleTag) . ' class="title" 
                                    style="
                                    order: ' . esc_attr($titleOrder) . '; 
                                    font-size: ' . esc_attr($postTitleFontSize) . 'px; 
                                    line-height: ' . esc_attr($postTitleLineHeight) . '; 
                                    letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; 
                                    font-weight: ' . esc_attr($postTitleFontWeight) . '; 
                                    text-align: ' . esc_attr($postTitleAlignment) . '; 
                                    color: ' . esc_attr($postTitleColor) . '; 
                                    background-color: ' . esc_attr($postTitleBgColor) . '; 
                                    margin: ' . 
                                    (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' . 
                                    (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' . 
                                    (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' . 
                                    (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . ';padding: ' . 
                                    (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' . 
                                    (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' . 
                                    (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' . 
                                    (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . ';"
                                    onmouseover="this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';
                                                 this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';" 
                                    onmouseout="this.style.color=\'' . esc_attr($postTitleColor) . '\';
                                                this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';">';

                    $output .= '<a href="' . esc_url($permalink) . '" 
                                    style="display: inline-block; width: 100%; text-decoration: none;"
                                    onmouseover="this.style.textDecoration=\'' . ($titleHoverUnderLine === 'enable' ? 'underline' : 'none') . '\';"
                                    onmouseout="this.style.textDecoration=\'none\';">' . esc_html($croppedTitle) . '</a>';

                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Excerpt
                if ($showPostExcerpt) {
                    $output .= '<div class="fpg-excerpt" 
                                    style="order: ' . esc_attr($excerptOrder) . '; 
                                           font-size: ' . esc_attr($excerptFontSize) . 'px; 
                                           line-height: ' . esc_attr($excerptLineHeight) . '; 
                                           letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; 
                                           font-weight: ' . esc_attr($excerptFontWeight) . '; 
                                           text-align: ' . esc_attr($excerptAlignment) . '; 
                                           color: ' . esc_attr($excerptColor) . '; 
                                           background-color: ' . esc_attr($excerptBgColor) . '; 
                                           border-style: ' . esc_attr($excerptBorderType) . '; 
                                           margin: ' . 
                                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' . 
                                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' . 
                                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' . 
                                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . ';padding: ' . 
                                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' . 
                                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' . 
                                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' . 
                                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . ';"
                                    onmouseover="this.style.color=\'' . esc_attr($excerptHoverColor) . '\';
                                                 this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';
                                                 this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';" 
                                    onmouseout="this.style.color=\'' . esc_attr($excerptColor) . '\';
                                                this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';
                                                this.style.borderColor=\'inherit\';">';

                    $output .= '<p>' . esc_html($excerpt) . '</p>';
                    $output .= '</div>';
                }
                // End Excerpt

                
                // Button Output                
                if ($showReadMoreButton) {
                    $output .= '<div class="btn-wrapper" style="margin: ' . 
                                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' . 
                                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' . 
                                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' . 
                                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; text-align: ' . esc_attr($buttonAlignment) . '; order: ' . esc_attr($buttonOrder) . ';">';

                    // Inline styles
                    $buttonInlineStyles = 'color: ' . esc_attr($buttonTextColor) . ';
                                            background-color: ' . esc_attr($buttonBackgroundColor) . ';
                                            
                                            font-size: ' . esc_attr($buttonFontSize) . 'px;
                                            border: ' . esc_attr($buttonBorderWidth) . 'px ' . esc_attr($buttonBorderType) . ' ' . esc_attr($buttonBorderColor) . ';
                                            border-radius: ' . 
                                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' . 
                                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' . 
                                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' . 
                                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . ';

                                            padding: ' . 
                                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' . 
                                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' . 
                                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' . 
                                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . ';';

                    // Hover styles using JS inline
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';
                                                this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "';
                                          this.style.borderColor='" . esc_attr($buttonBorderColor) . "';

                                          this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="rs-link read-more ' . esc_attr($buttonStyle) . '" 
                                    href="' . esc_url(get_permalink()) . '" 
                                    style="' . esc_attr($buttonInlineStyles) . '" 
                                    onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" 
                                    onmouseout="' . esc_attr($buttonResetStyles) . '">';

                    // Icon setup
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';  
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    // Icon Positioning
                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }
                    
                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a>';
                    $output .= '</div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            
            
             elseif ($gridLayoutStyle === 'style2') {
                // Only Title, Image, and Excerpt
                // Full post layout
                $output .= '<div class="fancy-post-item rs-blog__single" 
                            style="
                                
                                padding: ' . esc_attr($itemPadding['top']) . 'px ' . esc_attr($itemPadding['right']) . 'px ' . esc_attr($itemPadding['bottom']) . 'px ' . esc_attr($itemPadding['left']) . 'px; 
                                margin: ' . esc_attr($itemMargin['top']) . 'px ' . esc_attr($itemMargin['right']) . 'px ' . esc_attr($itemMargin['bottom']) . 'px ' . esc_attr($itemMargin['left']) . 'px; 
                                border-radius: ' . esc_attr($itemBorderRadius['top']) . 'px ' . esc_attr($itemBorderRadius['right']) . 'px ' . esc_attr($itemBorderRadius['bottom']) . 'px ' . esc_attr($itemBorderRadius['left']) . 'px; 
                                border-width: ' . esc_attr($itemBorderWidth['top']) . 'px ' . esc_attr($itemBorderWidth['right']) . 'px ' . esc_attr($itemBorderWidth['bottom']) . 'px ' . esc_attr($itemBorderWidth['left']) . 'px; 
                                border-style: ' . esc_attr($itemBorderType) . ';
                                border-color: ' . esc_attr($itemBorderColor) . ';
                                background-color: ' . esc_attr($itemBackgroundColor) . ';
                                box-shadow: ' . esc_attr($itemBoxShadow) . ';
                                text-align: ' . esc_attr($itemBoxAlignment) . ';">';

                // Thumbnail
                if ($thumbnail) {
                    $output .= '<div class="fancy-post-image rs-thumb"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
                }
                // END Thumbnail

                // MAIN Content
                $output .= '<div class="rs-content" style="background-color:' . esc_attr($itemBackgroundColor) . ';">';

                // Meta Data
                $output .= '<ul class="meta-data-list">';
                $output .= '<li class="meta-date">' . esc_html($date) . '</li> | ';
                $output .= '<li class="meta-author">' . esc_html__('By', 'fancy-post-grid') . ' ' . esc_html($author) . '</li> | ';
                $output .= '<li class="meta-categories">' . $categories . '</li> | ';
                if (!empty($tags)) {
                    $output .= '<li class="meta-tags">' . esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li> | ';
                }
                $output .= '<li class="meta-comment-count">' . esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                $output .= '</ul>';
                // End Meta Data

                // Title
                $output .= '<' . esc_attr($titleTag) . ' class="title" 
                                style="font-size: ' . esc_attr($postTitleFontSize) . 'px; 
                                line-height: ' . esc_attr($postTitleLineHeight) . '; 
                                letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; 
                                font-weight: ' . esc_attr($postTitleFontWeight) . '; 
                                text-align: ' . esc_attr($postTitleAlignment) . '; 
                                color: ' . esc_attr($postTitleColor) . '; 
                                background-color: ' . esc_attr($postTitleBgColor) . '; 
                                
                                margin: ' . esc_attr($postTitleMargin['top']) . 'px ' . esc_attr($postTitleMargin['right']) . 'px ' . esc_attr($postTitleMargin['bottom']) . 'px ' . esc_attr($postTitleMargin['left']) . 'px; 
                                padding: ' . esc_attr($postTitlePadding['top']) . 'px ' . esc_attr($postTitlePadding['right']) . 'px ' . esc_attr($postTitlePadding['bottom']) . 'px ' . esc_attr($postTitlePadding['left']) . 'px;"
                                onmouseover="this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';
                                             this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';" 
                                onmouseout="this.style.color=\'' . esc_attr($postTitleColor) . '\';
                                            this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';
                                            this.style.borderColor=\'inherit\';">';

                $output .= '<a href="' . esc_url($permalink) . '" 
                                style="display: inline-block; width: 100%; text-decoration: none;"
                                onmouseover="this.style.textDecoration=\'' . ($titleHoverUnderLine === 'enable' ? 'underline' : 'none') . '\';"
                                onmouseout="this.style.textDecoration=\'none\';">' . esc_html($title) . '</a>';

                $output .= '</' . esc_attr($titleTag) . '>';


                // Excerpt
                $output .= '<div class="fpg-excerpt" 
                                style="font-size: ' . esc_attr($excerptFontSize) . 'px; 
                                line-height: ' . esc_attr($excerptLineHeight) . '; 
                                letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; 
                                font-weight: ' . esc_attr($excerptFontWeight) . '; 
                                text-align: ' . esc_attr($excerptAlignment) . '; 
                                color: ' . esc_attr($excerptColor) . '; 
                                background-color: ' . esc_attr($excerptBgColor) . '; 
                                border-style: ' . esc_attr($excerptBorderType) . '; 
                                margin: ' . esc_attr($excerptMargin['top']) . 'px ' . esc_attr($excerptMargin['right']) . 'px ' . esc_attr($excerptMargin['bottom']) . 'px ' . esc_attr($excerptMargin['left']) . 'px; 
                                padding: ' . esc_attr($excerptPadding['top']) . 'px ' . esc_attr($excerptPadding['right']) . 'px ' . esc_attr($excerptPadding['bottom']) . 'px ' . esc_attr($excerptPadding['left']) . 'px;' . '"
                                onmouseover="this.style.color=\'' . esc_attr($excerptHoverColor) . '\';
                                             this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';
                                             this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';" 
                                onmouseout="this.style.color=\'' . esc_attr($excerptColor) . '\';
                                            this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';
                                            this.style.borderColor=\'inherit\';">';

                $output .= '<p>' . esc_html($excerpt) . '</p>';
                $output .= '</div>';



                // End Excerpt


                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            } elseif ($gridLayoutStyle === 'style3') {
                // Only Title & Image
                $output .= '<div class="fancy-post-image"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
                $output .= '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
            } elseif ($gridLayoutStyle === 'style4') {
                $output .= '<div class="fancy-post-item rs-blog__single">';
                if ($thumbnail) {
                $output .= '<div class="fancy-post-image rs-thumb"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
                }
                $output .= '<div class="rs-content">';
                $output .= '<h3 class="title"><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
                $output .= '<ul class="meta-data-list">';
                $output .= '<li class="post-date">' . esc_html($date) . '</li> | ';
                $output .= '<li class="post-author">' . esc_html__('By', 'fancy-post-grid') . ' ' . esc_html($author) . '</li> | ';
                $output .= '<li class="post-categories">' . $categories . '</li> | ';
                if (!empty($tags)) {
                    $output .= '<li class="post-tags">' . esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li> | ';
                }
                $output .= '<li class="post-comments">' . esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                $output .= '</ul>';
                $output .= '<div class="fpg-excerpt">';
                $output .= '<p>' . esc_html($excerpt) . '</p>';
                $output .= '</div>';
                
                $output .= '</div>';
                $output .= '</div>';
            }
            
        }
        
        $output .= '</div>'; // End .fancy-post-grid

        // Check if pagination is enabled
        if ($enablePagination) {

            $output .= '<div class="fancy-pagination fpg-pagination" style="
                text-align: ' . esc_attr($paginationAlignment) . ';
                margin: ' . 
                        (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' . 
                        (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' . 
                        (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' . 
                        (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . ';  order: ' . esc_attr($buttonOrder) . ';
            ">';
            $output .= paginate_links(array(
                'total'   => $query->max_num_pages,
                'current' => $paged,
                'format'  => '?paged=%#%',
                'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
                'next_text' => esc_html__('Next »', 'fancy-post-grid'),
            ));
            $output .= '</div>';
        }
        // Custom CSS for pagination styles
        $output .= '<style>
            .fpg-pagination a, .fpg-pagination span {
                display: inline-block;
                text-decoration: none;
                padding: ' . 
                (is_numeric($paginationPaddingNew['top']) ? $paginationPaddingNew['top'] . 'px' : esc_attr($paginationPaddingNew['top'])) . ' ' . 
                (is_numeric($paginationPaddingNew['right']) ? $paginationPaddingNew['right'] . 'px' : esc_attr($paginationPaddingNew['right'])) . ' ' . 
                (is_numeric($paginationPaddingNew['bottom']) ? $paginationPaddingNew['bottom'] . 'px' : esc_attr($paginationPaddingNew['bottom'])) . ' ' . 
                (is_numeric($paginationPaddingNew['left']) ? $paginationPaddingNew['left'] . 'px' : esc_attr($paginationPaddingNew['left'])) . '; text-align: ' . esc_attr($buttonAlignment) . '; 
                margin-right: ' . esc_attr($paginationGap) . 'px;
                border: ' . esc_attr($paginationBorderWidth) . 'px ' . esc_attr($paginationBorderStyle) . ' ' . esc_attr($paginationBorderColor) . ';
                
                border-radius: ' . 
                    (is_numeric($paginationBorderRadius['top']) ? $paginationBorderRadius['top'] . 'px' : esc_attr($paginationBorderRadius['top'])) . ' ' . 
                    (is_numeric($paginationBorderRadius['right']) ? $paginationBorderRadius['right'] . 'px' : esc_attr($paginationBorderRadius['right'])) . ' ' . 
                    (is_numeric($paginationBorderRadius['bottom']) ? $paginationBorderRadius['bottom'] . 'px' : esc_attr($paginationBorderRadius['bottom'])) . ' ' . 
                    (is_numeric($paginationBorderRadius['left']) ? $paginationBorderRadius['left'] . 'px' : esc_attr($paginationBorderRadius['left'])) . ';
                                
                color: ' . esc_attr($paginationTextColor) . ';
                background-color: ' . esc_attr($paginationBackgroundColor) . ';
            }

            .fpg-pagination a:hover {
                color: ' . esc_attr($paginationHoverTextColor) . ';
                background-color: ' . esc_attr($paginationHoverBackgroundColor) . ';
                border-color: ' . esc_attr($paginationHoverBorderColor) . ';
            }

            .fpg-pagination .current {
                color: ' . esc_attr($paginationActiveTextColor) . ';
                background-color: ' . esc_attr($paginationActiveBackgroundColor) . ';
                border-color: ' . esc_attr($paginationActiveBorderColor) . ';
            }
        </style>';

    wp_reset_postdata();

    return $output;
}

function fancy_post_slider_render_callback($attributes) {
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $query_args = array(
        'post_type'      => 'post',
        'posts_per_page' => 6, // Adjust as needed
        'paged'          => $paged,
    );

    $query = new WP_Query($query_args);
    if (!$query->have_posts()) {
        return '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
    }

    $output = '<div class="fancy-post-grid">';

    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $permalink = get_permalink($post_id);
        $title = get_the_title();
        $excerpt = wp_trim_words(get_the_excerpt(), 20);
        $date = get_the_date();
        $author = get_the_author();
        $categories = get_the_category_list(', ');
        $tags = get_the_tag_list('', ', ');
        $comments_count = get_comments_number();
        $thumbnail = get_the_post_thumbnail($post_id, 'medium', ['class' => 'fancy-post-thumbnail']);

        $output .= '<div class="fancy-post-item">';
        if ($thumbnail) {
            $output .= '<div class="fancy-post-image"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
        }
        $output .= '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
        $output .= '<div class="fancy-post-meta">';
        $output .= '<span class="post-date">' . esc_html($date) . '</span> | ';
        $output .= '<span class="post-author">' . esc_html__('By', 'fancy-post-grid') . ' ' . esc_html($author) . '</span> | ';
        $output .= '<span class="post-categories">' . $categories . '</span> | ';
        if (!empty($tags)) {
            $output .= '<span class="post-tags">' . esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</span> | ';
        }
        $output .= '<span class="post-comments">' . esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</span>';
        $output .= '</div>';
        $output .= '<p>' . esc_html($excerpt) . '</p>';
        $output .= '</div>';
    }

    $output .= '</div>'; // End .fancy-post-grid

    // Pagination
    $output .= '<div class="fancy-pagination fpg-pagination">';
    $output .= paginate_links(array(
        'total'   => $query->max_num_pages,
        'current' => $paged,
        'format'  => '?paged=%#%',
        'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
        'next_text' => esc_html__('Next »', 'fancy-post-grid'),
    ));
    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}
function fancy_post_list_render_callback($attributes) {
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $query_args = array(
        'post_type'      => 'post',
        'posts_per_page' => 6, // Adjust as needed
        'paged'          => $paged,
    );

    $query = new WP_Query($query_args);
    if (!$query->have_posts()) {
        return '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
    }

    $output = '<div class="fancy-post-grid">';

    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $permalink = get_permalink($post_id);
        $title = get_the_title();
        $excerpt = wp_trim_words(get_the_excerpt(), 20);
        $date = get_the_date();
        $author = get_the_author();
        $categories = get_the_category_list(', ');
        $tags = get_the_tag_list('', ', ');
        $comments_count = get_comments_number();
        $thumbnail = get_the_post_thumbnail($post_id, 'medium', ['class' => 'fancy-post-thumbnail']);

        $output .= '<div class="fancy-post-item">';
        if ($thumbnail) {
            $output .= '<div class="fancy-post-image"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
        }
        $output .= '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
        $output .= '<div class="fancy-post-meta">';
        $output .= '<span class="post-date">' . esc_html($date) . '</span> | ';
        $output .= '<span class="post-author">' . esc_html__('By', 'fancy-post-grid') . ' ' . esc_html($author) . '</span> | ';
        $output .= '<span class="post-categories">' . $categories . '</span> | ';
        if (!empty($tags)) {
            $output .= '<span class="post-tags">' . esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</span> | ';
        }
        $output .= '<span class="post-comments">' . esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</span>';
        $output .= '</div>';
        $output .= '<p>' . esc_html($excerpt) . '</p>';
        $output .= '</div>';
    }

    $output .= '</div>'; // End .fancy-post-grid

    // Pagination
    $output .= '<div class="fancy-pagination">';
    $output .= paginate_links(array(
        'total'   => $query->max_num_pages,
        'current' => $paged,
        'format'  => '?paged=%#%',
        'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
        'next_text' => esc_html__('Next »', 'fancy-post-grid'),
    ));
    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}
function fancy_post_isotope_render_callback($attributes) {
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $query_args = array(
        'post_type'      => 'post',
        'posts_per_page' => 6, // Adjust as needed
        'paged'          => $paged,
    );

    $query = new WP_Query($query_args);
    if (!$query->have_posts()) {
        return '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
    }

    $output = '<div class="fancy-post-grid">';

    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $permalink = get_permalink($post_id);
        $title = get_the_title();
        $excerpt = wp_trim_words(get_the_excerpt(), 20);
        $date = get_the_date();
        $author = get_the_author();
        $categories = get_the_category_list(', ');
        $tags = get_the_tag_list('', ', ');
        $comments_count = get_comments_number();
        $thumbnail = get_the_post_thumbnail($post_id, 'medium', ['class' => 'fancy-post-thumbnail']);

        $output .= '<div class="fancy-post-item">';
        if ($thumbnail) {
            $output .= '<div class="fancy-post-image"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
        }
        $output .= '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
        $output .= '<div class="fancy-post-meta">';
        $output .= '<span class="post-date">' . esc_html($date) . '</span> | ';
        $output .= '<span class="post-author">' . esc_html__('By', 'fancy-post-grid') . ' ' . esc_html($author) . '</span> | ';
        $output .= '<span class="post-categories">' . $categories . '</span> | ';
        if (!empty($tags)) {
            $output .= '<span class="post-tags">' . esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</span> | ';
        }
        $output .= '<span class="post-comments">' . esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</span>';
        $output .= '</div>';
        $output .= '<p>' . esc_html($excerpt) . '</p>';
        $output .= '</div>';
    }

    $output .= '</div>'; // End .fancy-post-grid

    // Pagination
    $output .= '<div class="fancy-pagination">';
    $output .= paginate_links(array(
        'total'   => $query->max_num_pages,
        'current' => $paged,
        'format'  => '?paged=%#%',
        'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
        'next_text' => esc_html__('Next »', 'fancy-post-grid'),
    ));
    $output .= '</div>';

    wp_reset_postdata();

    return $output;
}