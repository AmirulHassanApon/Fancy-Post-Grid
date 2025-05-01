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
            postLinkTarget: { type: 'string', default: '' },
            thumbnailLink: { type: 'string', default: true },
            postLinkType: { type: 'string', default: '' },
            //SETTINGS
            //Field Selector
            showPostTitle: { type: 'boolean', default: true },
            showThumbnail: { type: 'boolean', default: true },
            showPostExcerpt: { type: 'boolean', default: true },
            showReadMoreButton: { type: 'boolean', default: true },
            showMetaData: { type: 'boolean', default: true },
            showPostDate: { type: 'boolean', default: true },
            showPostAuthor: { type: 'boolean', default: true },
            showPostCategory: { type: 'boolean', default: false },
            showPostTags: { type: 'boolean', default: false },
            showPostCommentsCount: { type: 'boolean', default: false },
            showMetaIcon: { type: 'boolean', default: true },
            showPostDateIcon: { type: 'boolean', default: true },
            showPostAuthorIcon: { type: 'boolean', default: true },
            showPostCategoryIcon: { type: 'boolean', default: false },
            showPostTagsIcon: { type: 'boolean', default: false },
            showPostCommentsCountIcon: { type: 'boolean', default: false },
            //ITEM order
            metaOrder: { type: 'number', default: '' },
            titleOrder: { type: 'number', default: '' },
            excerptOrder: { type: 'number', default: '' },
            buttonOrder: { type: 'number', default: '' },
            //Title Settings
            titleTag: { type: 'string', default: 'h3' }, // New: H1–H6 tag selection
            titleHoverUnderLine: { type: 'string', default: 'enable' },
            titleCropBy: { type: 'string', default: 'word' },
            titleLength: { type: 'number', default: 12 },
            //Thumbnail Settings
            thumbnailSize: { type: 'string', default: 'fancy_post_custom_size' },
            hoverAnimation: { type: 'string', default: 'hover-zoom_in' },
            //Excerpt Settings
            excerptType: { type: 'string', default: 'word' },
            excerptLimit: { type: 'number', default: 10 },
            excerptIndicator: { type: 'string', default: '...' },
            //Meta data Settings
            metaAuthorPrefix: { type: 'string', default: 'By' },
            metaSeperator: { type: 'string', default: '' },
            
            //Button Settings
            readMoreLabel: { type: 'string', default: 'Read More' },
            buttonStyle: { type: 'string', default: 'fpg-flat' },
            showButtonIcon: { type: 'boolean', default: true },
            iconPosition: { type: 'string', default: 'right' },
            //Style
            //SECTION Area
            sectionBgColor: { type: 'string', default: '' },
            sectionMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            sectionPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },            
            //ITEM Box           
            itemMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemGap: { type: 'number', default: '' },
            itemBoxAlignment: { type: 'string', default: '' },
            itemBorderType: { type: 'string', default: '' },
            itemBoxShadow: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemBoxShadowColor: { type: 'string', default: '' },  
            itemBackgroundColor: { type: 'string', default: '' },
            itemBorderColor: { type: 'string', default: '' },
            itemBorderWidth: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },            
            //Content Box
            contentitemMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentitemPaddingNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentBorderWidth: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentnormalBorderType: { type: 'string', default: '' },     
            contentBgColor: { type: 'string', default: '' },       
            contentBorderColor: { type: 'string', default: '' },       
            //ThumbNail            
            thumbnailMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            thumbnailPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            thumbnailBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            
            //Post Title
            postTitleFontSize: { type: 'number', default: '' },
            postTitleLineHeight: { type: 'number', default: '' },
            postTitleLetterSpacing: { type: 'number', default: '' },
            postTitleFontWeight: { type: 'string', default: '' },
            postTitleAlignment: { type: 'string', default: '' },
            postTitleMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            postTitlePadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            postTitleColor: { type: 'string', default: '' },
            postTitleBgColor: { type: 'string', default: '' },   
            postTitleHoverColor: { type: 'string', default: '' },
            postTitleHoverBgColor: { type: 'string', default: '' },
                    
            //excerpt
            excerptFontSize: { type: 'number', default: '' },
            excerptLineHeight: { type: 'number', default: '' },
            excerptLetterSpacing: { type: 'number', default: '' },
            excerptFontWeight: { type: 'string', default: '' },
            excerptAlignment: { type: 'string', default: '' },
            excerptMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            excerptPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },           
            excerptColor: { type: 'string', default: '' },
            excerptBgColor: { type: 'string', default: '' },
            excerptHoverColor: { type: 'string', default: '' },
            excerptHoverBgColor: { type: 'string', default: '' },
            excerptHoverBorderColor: { type: 'string', default: '' },
            //meta 
            metaFontSize: { type: 'number', default: '' },
            metaAlignment: { type: 'string', default: '' },
            metaMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, }, 
            metaPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, }, 
            metaTextColor: { type: 'string', default: '' },
            separatorColor: { type: 'string', default: '' },
            metaIconColor: { type: 'string', default: '' },
            
            //Button
            buttonAlignment: { type: 'string', default: '' },
            buttonMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            buttonPaddingNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },  
            buttonFontSize: { type: 'string', default: '' },
            buttonTextColor: { type: 'string', default: '' },
            buttonBackgroundColor: { type: 'string', default: '' },
            buttonBorderType: { type: 'string', default: '' },
            buttonBorderRadius: { type: 'string', default: '' },
            buttonFontWeight: { type: 'string', default: '' },          
            buttonBorderWidth: { type: 'string', default: '' },
            buttonHoverTextColor: { type: 'string', default: '' },
            buttonHoverBackgroundColor: { type: 'string', default: '' },
            buttonBorderColor: { type: 'string', default: '' },
            buttonHoverBorderColor: { type: 'string', default: '' },
           
            //Pagination
            paginationMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            paginationPaddingNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },             
            paginationAlignment: { type: 'string', default: '' },
            paginationBorderStyle: { type: 'string', default: '' },
            paginationBorderWidth: { type: 'number', default: '' },
            paginationBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            paginationGap: { type: 'number', default: '' },
            paginationFontSize: { type: 'number', default: '' },
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
                thumbnailSize,hoverAnimation,
                excerptType,excerptIndicator,excerptLimit,
                metaAuthorPrefix,metaSeperator,
                showButtonIcon,iconPosition,buttonStyle,readMoreLabel,
                sectionBgColor,sectionMargin,sectionPadding,

                itemPadding,itemMargin,itemBorderRadius,itemBoxAlignment,itemBoxShadow,itemBoxShadowColor,
                itemBorderColor,itemBackgroundColor,itemBorderWidth,itemBorderType,itemGap, 

                contentitemMarginNew,contentitemPaddingNew,contentnormalBorderType,contentBorderWidth,contentBgColor,contentBorderColor,

                thumbnailMargin,thumbnailPadding,thumbnailBorderRadius,

                postTitleFontSize,postTitleLineHeight,postTitleLetterSpacing,postTitleFontWeight,
                postTitleAlignment,postTitleMargin,postTitlePadding,postTitleColor,postTitleBgColor
                ,postTitleHoverColor,postTitleHoverBgColor,
                
                excerptFontSize,excerptLineHeight,excerptLetterSpacing,excerptFontWeight,excerptAlignment,excerptMargin,
                excerptPadding,excerptColor,excerptBgColor,excerptHoverColor,excerptHoverBgColor,
                excerptHoverBorderColor,

                metaAlignment,metaFontSize,metaMarginNew,metaPadding,metaTextColor,separatorColor,metaIconColor,

                buttonAlignment,buttonMarginNew,buttonPaddingNew,buttonTextColor,buttonBackgroundColor,buttonBorderType,buttonFontWeight,
                buttonBorderWidth,buttonBorderRadius,buttonFontSize,buttonHoverTextColor,buttonHoverBackgroundColor,
                buttonBorderColor,buttonHoverBorderColor,

                paginationMarginNew,paginationPaddingNew,paginationAlignment,
                paginationBorderStyle,paginationBorderWidth,paginationBorderRadius,paginationGap,paginationFontSize,
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
                if (!value) return '';
                
                return `${value.top || ''}px ${value.right || ''}px ${value.bottom || ''}px ${value.left || ''}px`;
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
                        'li',
                        {
                            key: i,
                            onClick: () => handlePageClick(i),
                            style: {
                                ...(currentPage === i 
                                    ? { backgroundColor: attributes.paginationActiveBackgroundColor, color: attributes.paginationActiveTextColor, borderColor: attributes.paginationActiveBorderColor }
                                    : { backgroundColor: '#007cba', color: '#fff' }),
                                ...(attributes.paginationBorderStyle ? { borderStyle: attributes.paginationBorderStyle } : {}),
                                ...(attributes.paginationBorderWidth ? { borderWidth: `${attributes.paginationBorderWidth}px` } : {}),
                                ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                ...(attributes.paginationFontSize ? { fontSize: `${attributes.paginationFontSize}px` } : {}),
                                ...(attributes.paginationPaddingNew ? { padding: getSpacingValue(attributes.paginationPaddingNew) } : {}),
                            },
                            onMouseEnter: (e) => {
                                e.currentTarget.style.backgroundColor = attributes.paginationHoverBackgroundColor;
                                e.currentTarget.style.borderColor = attributes.paginationHoverBorderColor;
                                e.currentTarget.style.color = attributes.paginationHoverTextColor;
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.backgroundColor = currentPage === i ? attributes.paginationActiveBackgroundColor : '#007cba';
                                e.currentTarget.style.borderColor = attributes.paginationActiveBorderColor;
                                e.currentTarget.style.color = currentPage === i ? attributes.paginationActiveTextColor : '#fff';
                            },
                        },
                        wp.element.createElement(
                            'span',
                            {
                                className: `page-numbers${currentPage === i ? ' current' : ''}`,
                            },
                            i
                        )
                    )
                );
            }

            // Pagination controls
            const paginationControls = wp.element.createElement(
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
                'ul',
                {
                    className: 'page-numbers',
                },
                    wp.element.createElement(
                        'li',
                        {
                            onClick: () => handlePageClick(currentPage - 1),
                            style: {
                                ...(attributes.paginationPaddingNew ? { padding: getSpacingValue(attributes.paginationPaddingNew) } : {}),
                                ...(attributes.paginationBackgroundColor ? { backgroundColor: attributes.paginationBackgroundColor } : {}),
                                ...(attributes.paginationTextColor ? { color: attributes.paginationTextColor } : {}),
                                ...(attributes.paginationBorderStyle ? { borderStyle: attributes.paginationBorderStyle } : {}),
                                ...(attributes.paginationBorderWidth ? { borderWidth: `${attributes.paginationBorderWidth}px` } : {}),
                                ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                ...(attributes.paginationBorderColor ? { borderColor: attributes.paginationBorderColor } : {}),
                                ...(attributes.paginationFontSize ? { fontSize: `${attributes.paginationFontSize}px` } : {}),
                                
                            },
                            onMouseEnter: (e) => {
                                if (currentPage !== 1) {
                                    e.currentTarget.style.backgroundColor = attributes.paginationHoverBackgroundColor;
                                    e.currentTarget.style.borderColor = attributes.paginationHoverBorderColor;
                                    e.currentTarget.style.color = attributes.paginationHoverTextColor;
                                }
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.backgroundColor = attributes.paginationBackgroundColor;
                                e.currentTarget.style.borderColor = attributes.paginationBorderColor;
                                e.currentTarget.style.color = attributes.paginationTextColor;
                            },
                        },
                        wp.element.createElement(
                            'a',
                            {
                                
                                className: 'prev page-numbers',
                                onClick: (e) => e.preventDefault(), // prevent anchor default scroll behavior
                            },
                            __('Previous', 'fancy-post-grid')
                        )
                    ),

                    ...paginationNumbers, // Dynamically generated pagination buttons
                    wp.element.createElement(
                        'li',
                        {
                            onClick: () => handlePageClick(currentPage + 1),
                            disabled: currentPage === totalPages,
                            style: {
                                
                                ...(attributes.paginationPaddingNew ? { padding: getSpacingValue(attributes.paginationPaddingNew) } : {}),
                                ...(attributes.paginationBackgroundColor ? { backgroundColor: attributes.paginationBackgroundColor } : {}),
                                ...(attributes.paginationTextColor ? { color: attributes.paginationTextColor } : {}),
                                ...(attributes.paginationBorderStyle ? { borderStyle: attributes.paginationBorderStyle } : {}),
                                ...(attributes.paginationBorderWidth ? { borderWidth: `${attributes.paginationBorderWidth}px` } : {}),
                                ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                ...(attributes.paginationBorderColor ? { borderColor: attributes.paginationBorderColor } : {}),
                                ...(attributes.paginationFontSize ? { fontSize: `${attributes.paginationFontSize}px` } : {}),
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
                        wp.element.createElement(
                            'a',
                            {
                                
                                className: 'next page-numbers',
                                onClick: (e) => e.preventDefault(), // prevent anchor default scroll behavior
                            },
                        __('Next', 'fancy-post-grid')
                        )
                    )
                ),

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
                            ...(attributes.itemGap ? { gap: attributes.itemGap } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {})
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog__single align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    
                                    ...(attributes.itemMargin ? { margin: getSpacingValue(attributes.itemMargin) } : {}),
                                    ...(attributes.itemPadding ? { padding: getSpacingValue(attributes.itemPadding) } : {}),
                                    ...(attributes.itemBorderRadius ? { borderRadius: getSpacingValue(attributes.itemBorderRadius) } : {}),
                                    ...(attributes.itemBorderWidth ? { borderWidth: getSpacingValue(attributes.itemBorderWidth) } : {}),
                                    ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : {}),
                                    ...(attributes.itemBorderType ? { borderStyle: attributes.itemBorderType } : {}),
                                    ...(attributes.itemBorderColor ? { borderColor: attributes.itemBorderColor } : {}),
                                    ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                        boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`
                                    } : {})
                                },
                            },
                        
                            // Thumbnail Display with Link if enabled
                            showThumbnail && thumbnail &&
                                wp.element.createElement(
                                    'div',
                                    {
                                        className: 'rs-thumb thumbnail-wrapper',
                                        style: {
                                            ...(attributes.thumbnailMargin ? { margin: getSpacingValue(attributes.thumbnailMargin) } : {}),
                                            ...(attributes.thumbnailPadding ? { padding: getSpacingValue(attributes.thumbnailPadding) } : {}),
                                            ...(attributes.thumbnailBorderRadius ? { borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) } : {}),
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
                                                style: { objectFit: 'cover', width: '100%',
                                                
                                                },
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
                            wp.element.createElement('div', { className: 'rs-content',
                                style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew ? { padding: getSpacingValue(attributes.contentitemPaddingNew) } : {}),
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //Meta

                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list post-meta', 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) } : {}),
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) } : {}),
                                            ...(metaAlignment ? { justifyContent: metaAlignment } : {}),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('li', { className: 'meta-date',style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                } },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } }), // Font Awesome calendar icon
                                                ` ${new Date(post.date).toLocaleDateString()}`
                                            ),


                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'li', 
                                                { className: 'meta-author',style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user',style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Category
                                            showPostCategory && wp.element.createElement('li', { className: 'meta-category',style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                } },
                                                showMetaIcon && showPostCategoryIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-folder',style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } }), // Font Awesome folder icon
                                                ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags',style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                } },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags',style:{ 
                                                    ...(metaIconColor ? { color: metaIconColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments',style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                } },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments',style:{ 
                                                    ...(metaIconColor ? { color: metaIconColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean)
                                            .reduce((acc, curr, index, arr) => {
                                                acc.push(curr);

                                                const isNotLast = index < arr.length - 1;
                                                const hasSeparator = metaSeperator && metaSeperator !== 'none';

                                                if (isNotLast && hasSeparator) {
                                                    acc.push(
                                                        wp.element.createElement('span', {
                                                            className: 'meta-separator',
                                                            style: {
                                                                ...(separatorColor ? { color: separatorColor } : {}),
                                                                ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                            }
                                                        }, ` ${metaSeperator} `)
                                                    );
                                                }

                                                return acc;
                                            }, [])
                                    ),


                                //TITLE
                                // Title with Link
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                margin: getSpacingValue(attributes.postTitleMargin || '0px'),
                                                padding: getSpacingValue(attributes.postTitlePadding || '0px'),
                                                ...(postTitleAlignment ? { textAlign: postTitleAlignment } : {}),
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                            },
                                            onMouseEnter: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleHoverBgColor;
                                                
                                            },
                                            onMouseLeave: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleBgColor;
                                            },
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: {
                                                        ...(postTitleColor ? { color: postTitleColor } : {}),
                                                        ...(postTitleFontSize ? { fontSize: `${postTitleFontSize}px` } : {}),
                                                        ...(postTitleFontWeight ? { fontWeight: postTitleFontWeight } : {}),
                                                        ...(postTitleLineHeight ? { lineHeight: postTitleLineHeight } : {}),
                                                        ...(postTitleLetterSpacing ? { letterSpacing: postTitleLetterSpacing } : {}),
                                                    },
                                                    onMouseEnter: (e) => {
                                                        e.currentTarget.style.color = postTitleHoverColor;
                                                        e.currentTarget.style.backgroundImage = `linear-gradient(to bottom, ${postTitleHoverColor} 0%, ${postTitleHoverColor} 100%)`;
                                                        e.currentTarget.style.backgroundPosition = '0 100%'; // Position at bottom
                                                    },
                                                    onMouseLeave: (e) => {
                                                        e.currentTarget.style.color = postTitleColor;
                                                    },
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),

                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { 
                                                ...(excerptOrder ? { order: excerptOrder } : {}),
                                                ...(excerptAlignment ? { textAlign: excerptAlignment } : {}),
                                                ...(attributes.excerptMargin ? { margin: getSpacingValue(attributes.excerptMargin) } : {}),
                                                ...(attributes.excerptPadding ? { padding: getSpacingValue(attributes.excerptPadding) } : {}), 
                                            } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                
                                                ...(excerptFontSize ? { fontSize: `${excerptFontSize}px` } : {}),
                                                ...(excerptFontWeight ? { fontWeight: excerptFontWeight } : {}),
                                                ...(excerptLineHeight ? { lineHeight: excerptLineHeight } : {}),
                                                ...(excerptLetterSpacing ? { letterSpacing: excerptLetterSpacing } : {}),
                                                ...(excerptColor ? { color: excerptColor } : {}),
                                                ...(excerptBgColor ? { backgroundColor: excerptBgColor } : {}),                                               
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
                                        className: `rs-link read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            ...(buttonStyle === 'fpg-filled' ? { backgroundColor: buttonBackgroundColor } : { backgroundColor: 'transparent' }),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { border: buttonBorderType } : {}),
                                            // ...(buttonBorderType && buttonBackgroundColor ? { border: `${buttonBorderType} ${buttonBackgroundColor}` } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: `${attributes.buttonBorderWidth}px` } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) } : {}),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
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
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style2' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-6 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

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
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
                                },
                            },
                        
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                //Meta
                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list post-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('li', { className: 'meta-date',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome calendar icon
                                                ` ${new Date(post.date).toLocaleDateString()}`
                                            ),


                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'li', 
                                                { className: 'meta-author',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user',style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Category
                                            showPostCategory && wp.element.createElement('li', { className: 'meta-category',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCategoryIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-folder',style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome folder icon
                                                ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags',style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments',style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator',style: { 
                                                        
                                                        color: separatorColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                        
                                                    } }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
                                    ),

                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { 
                                                order: excerptOrder,
                                                textAlign: excerptAlignment,
                                                margin: getSpacingValue(attributes.excerptMargin),
                                                padding: getSpacingValue(attributes.excerptPadding) 
                                            } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                
                                                fontSize: `${excerptFontSize}px`,
                                                fontWeight: excerptFontWeight,
                                                lineHeight: excerptLineHeight,
                                                letterSpacing: excerptLetterSpacing, 
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
                                        className: `rs-link read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )

                            ) ,
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
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style3' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-28 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || 
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-28-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        }),

                                    showMetaData && 
                                        wp.element.createElement('div', { 
                                            className: 'rs-meta post-meta',
                                            style: { 
                                                margin: getSpacingValue(attributes.metaMarginNew),
                                                padding: getSpacingValue(attributes.metaPadding),
                                                textAlign: metaAlignment, 
                                                color: metaTextColor, 
                                                order: metaOrder,
                                                fontSize: `${metaFontSize}px`,
                                            } 
                                        }, 
                                            wp.element.createElement('ul', { className: 'meta-data-list' }, // Add ul wrapper
                                                [
                                                    // Post Date
                                                    showPostDate && wp.element.createElement('li', { className: 'meta-date', style: { 
                                                            color: metaTextColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } },
                                                        showMetaIcon && showPostDateIcon &&
                                                        wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                            style:{ 
                                                                color: metaIconColor, 
                                                                fontSize: `${metaFontSize}px`,
                                                            } }), // Font Awesome calendar icon
                                                        ` ${new Date(post.date).toLocaleDateString()}`
                                                    ),

                                                    // Post Author
                                                    showPostAuthor && wp.element.createElement(
                                                        'li', 
                                                        { className: 'meta-author', style: { 
                                                            color: metaTextColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } },
                                                        showMetaIcon && showPostAuthorIcon && 
                                                            wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                                color: metaIconColor, 
                                                                fontSize: `${metaFontSize}px`,
                                                            } }), // Font Awesome user icon
                                                        ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                                    ),

                                                    // Post Category
                                                    showPostCategory && wp.element.createElement('li', { className: 'meta-category', style: { 
                                                            color: metaTextColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } },
                                                        showMetaIcon && showPostCategoryIcon &&
                                                        wp.element.createElement('i', { className: 'fas fa-folder', style:{ 
                                                                color: metaIconColor, 
                                                                fontSize: `${metaFontSize}px`,
                                                            } }), // Font Awesome folder icon
                                                        ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                                    ),

                                                    // Post Tags (Only show if tags exist)
                                                    showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags', style: { 
                                                            color: metaTextColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } },
                                                        showMetaIcon && showPostTagsIcon &&
                                                        wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                                color: metaIconColor, 
                                                                fontSize: `${metaFontSize}px`,
                                                            } }), // Font Awesome tags icon
                                                        ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                                    ),

                                                    // Comments Count (Only show if comments exist)
                                                    showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments', style: { 
                                                            color: metaTextColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } },
                                                        showMetaIcon && showPostCommentsCountIcon &&
                                                        wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                                color: metaIconColor, 
                                                                fontSize: `${metaFontSize}px`,
                                                            } }), // Font Awesome comments icon
                                                        ` ${post.comment_count} Comments`
                                                    )
                                                ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                                    acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                        ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                                color: separatorColor, 
                                                                fontSize: `${metaFontSize}px`,
                                                            } }, ` ${metaSeperator} `) 
                                                        : null
                                                    ), []
                                                )
                                            )
                                        ),


                                ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                //Meta
                                
                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { 
                                                order: excerptOrder,
                                                textAlign: excerptAlignment,
                                                margin: getSpacingValue(attributes.excerptMargin),
                                                padding: getSpacingValue(attributes.excerptPadding) 
                                            } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                
                                                fontSize: `${excerptFontSize}px`,
                                                fontWeight: excerptFontWeight,
                                                lineHeight: excerptLineHeight,
                                                letterSpacing: excerptLetterSpacing, 
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
                                        className: `rs-link read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )
                            ) ,
                            
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style4' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-30 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-30-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        }),

                                    showPostDate && wp.element.createElement(
                                        'div', 
                                            { className: 'meta-date', style: { 
                                                color: metaTextColor, 
                                                fontSize: `${metaFontSize}px`,
                                            } },
                                            wp.element.createElement(
                                                'span', 
                                                { style: { display: 'flex', alignItems: 'center', gap: '5px' } }, 
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { 
                                                    className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } 
                                                }), // Font Awesome calendar icon
                                                
                                                new Date(post.date).toLocaleDateString()
                                            )
                                        ),
                                    ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: 'rs-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                        wp.element.createElement('ul', { 
                                            className: 'post-meta', 
                                             
                                        },
                                            [
                                                // Post Author
                                                showPostAuthor && wp.element.createElement(
                                                    'li', 
                                                    { className: 'meta-author', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostAuthorIcon && 
                                                        wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome user icon
                                                    ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                                ),

                                                // Post Category
                                                showPostCategory && wp.element.createElement('li', { className: 'meta-category', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostCategoryIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-folder', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome folder icon
                                                    ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                                ),

                                                // Post Tags (Only show if tags exist)
                                                showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostTagsIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome tags icon
                                                    ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                                ),

                                                // Comments Count (Only show if comments exist)
                                                showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostCommentsCountIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome comments icon
                                                    ` ${post.comment_count} Comments`
                                                )
                                            ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                                acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                    ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                            color: separatorColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }, ` ${metaSeperator} `) 
                                                    : null
                                                ), []
                                            )
                                        )
                                    ),

                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { 
                                                order: excerptOrder,
                                                textAlign: excerptAlignment,
                                                margin: getSpacingValue(attributes.excerptMargin),
                                                padding: getSpacingValue(attributes.excerptPadding) 
                                            } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                
                                                fontSize: `${excerptFontSize}px`,
                                                fontWeight: excerptFontWeight,
                                                lineHeight: excerptLineHeight,
                                                letterSpacing: excerptLetterSpacing, 
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

                                
                            ) ,
                            
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style5' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-12 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item pre-blog-item style_12 pre-blog-meta-style2 default',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
                                },
                            },
                            wp.element.createElement('div', { className: 'blog-inner-wrap pre-thum-default pre-meta-blocks top',
                                }, 
                            // Thumbnail Display with Link if enabled
                            showThumbnail && thumbnail &&
                                wp.element.createElement(
                                    'div',
                                    {
                                        className: 'pre-image-wrap thumbnail-wrapper',
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
                                        }),

                                    showPostDate && wp.element.createElement(
                                        'div', 
                                        { className: 'pre-blog-meta', style: { 
                                            color: metaTextColor, 
                                            fontSize: `${metaFontSize}px`,
                                        } },
                                        
                                        wp.element.createElement('span', { className: 'pre-date' }, 
                                            new Date(post.date).toLocaleDateString(undefined, { day: 'numeric' })
                                        ),
                                        '',
                                        wp.element.createElement('span', { className: 'pre-month' }, 
                                            new Date(post.date).toLocaleDateString(undefined, { month: 'short' })
                                        ),
                                        ' ',
                                    ),
                                ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'pre-blog-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'title-link ',
                                            style: {
                                                margin: getSpacingValue(attributes.postTitleMargin),
                                                padding: getSpacingValue(attributes.postTitlePadding),
                                                textAlign: postTitleAlignment,
                                                transition: 'all 0.3s ease',
                                                order: titleOrder,
                                                
                                            },
                                            
                                        },
                                        wp.element.createElement(
                                            titleTag,
                                            {
                                                className: 'pre-post-title ',
                                                style: { 
                                                    // Ensure the styles apply to the <a> tag
                                                    color: postTitleColor, // Inherit from parent to avoid default blue link color
                                                    fontSize: `${postTitleFontSize}px`,
                                                    fontWeight: postTitleFontWeight,
                                                    lineHeight: postTitleLineHeight,
                                                    letterSpacing: postTitleLetterSpacing,
                                                    transition: 'all 0.3s ease',
                                                },
                                                        
                                                
                                            },
                                            postLinkType === 'yeslink'
                                                ? wp.element.createElement(
                                                    'a',
                                                    { 
                                                        href: post.link, 
                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
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
                                
                                //Meta
                                showMetaData && 
                                    
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list post-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        }
                                             
                                    },
                                        [
                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'li', 
                                                { className: 'meta-author', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Category
                                            showPostCategory && wp.element.createElement('li', { className: 'meta-category', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCategoryIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-folder', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome folder icon
                                                ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                        color: separatorColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
                                        
                                    ),

                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: 'fpg-excerpt', 
                                        style: { 
                                                order: excerptOrder,
                                                textAlign: excerptAlignment,
                                                
                                                margin: getSpacingValue(attributes.excerptMargin), // Default margin
                                                padding: getSpacingValue(attributes.excerptPadding) 
                                            } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            className: 'pre-content', 
                                            style: { 
                                                
                                                fontSize: `${excerptFontSize}px`,
                                                fontWeight: excerptFontWeight,
                                                lineHeight: excerptLineHeight,
                                                letterSpacing: excerptLetterSpacing, 
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

                                

                                showReadMoreButton && wp.element.createElement('div', { className: 'blog-btn-part',style: { 
                                            order: buttonOrder,
                                            margin: getSpacingValue(attributes.buttonMarginNew),
                                            textAlign: buttonAlignment  }, 
                                        }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `blog-btn icon-after ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )                                
                            ) ,
                            ),
                            
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style6' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-13 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-13-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        }),

                                    showPostDate && wp.element.createElement(
                                        'div', 
                                        { className: 'pre-blog-meta', style: { 
                                            color: metaTextColor, 
                                            fontSize: `${metaFontSize}px`,
                                        } },
                                        
                                        wp.element.createElement('span', { className: 'pre-date' }, 
                                            new Date(post.date).toLocaleDateString(undefined, { day: 'numeric' })
                                        ),
                                        '',
                                        wp.element.createElement('span', { className: 'pre-month' }, 
                                            new Date(post.date).toLocaleDateString(undefined, { month: 'short' })
                                        ),
                                        ' ',
                                    ),
                                ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                //Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: 'rs-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                        wp.element.createElement('ul', { 
                                            className: 'meta-data-list post-meta', 
                                             
                                        },
                                            [
                                                // Post Author
                                                showPostAuthor && wp.element.createElement(
                                                    'li', 
                                                    { className: 'meta-author', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostAuthorIcon && 
                                                        wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome user icon
                                                    ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                                ),

                                                // Post Date
                                                showPostDate && wp.element.createElement('li', { className: 'meta-date',style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostDateIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                        style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome calendar icon
                                                    ' News in ', // Add "News" text before the year
                                                    new Date(post.date).toLocaleDateString(undefined, { year: 'numeric' })
                                                ),

                                                // Post Category
                                                showPostCategory && wp.element.createElement('li', { className: 'meta-category', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostCategoryIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-folder', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome folder icon
                                                    ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                                ),

                                                // Post Tags (Only show if tags exist)
                                                showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostTagsIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome tags icon
                                                    ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                                ),

                                                // Comments Count (Only show if comments exist)
                                                showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments', style: { 
                                                        color: metaTextColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } },
                                                    showMetaIcon && showPostCommentsCountIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                            color: metaIconColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }), // Font Awesome comments icon
                                                    ` ${post.comment_count} Comments`
                                                )
                                            ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                                acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                    ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                            color: separatorColor, 
                                                            fontSize: `${metaFontSize}px`,
                                                        } }, ` ${metaSeperator} `) 
                                                    : null
                                                ), []
                                            )
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
                                        className: `blog-btn read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
                                        },
                                    }, 
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px' } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px' } })
                                    )
                                )

                                
                            ) ,
                            
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style7' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-14 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-14-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        }),
                                ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                //Meta
                                showPostDate && wp.element.createElement(
                                    'div', 
                                        { className: 'rs-meta', style: { 
                                            color: metaTextColor, 
                                            fontSize: `${metaFontSize}px`,
                                        } },
                                        wp.element.createElement(
                                            'span', 
                                            { className: 'meta-date',style: { display: 'flex', alignItems: 'center', gap: '5px' } }, 
                                            showMetaIcon && showPostDateIcon &&
                                            wp.element.createElement('i', { 
                                                className: 'fas fa-calendar-alt',
                                                style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } 
                                            }), // Font Awesome calendar icon
                                            
                                            new Date(post.date).toLocaleDateString()
                                        ),
                                        showPostAuthor && wp.element.createElement(
                                            'a', 
                                            {  style: { 
                                                color: metaTextColor, 
                                                fontSize: `${metaFontSize}px`,
                                            } },
                                            showMetaIcon && showPostAuthorIcon && 
                                                wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome user icon
                                            ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                        ),
                                    ),
                            ) ,
                            
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style8' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-15 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || 
                  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-15-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
                                },
                            },
                        
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: 'rs-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('div', { className: 'meta-date',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome calendar icon
                                                ` ${new Date(post.date).toLocaleDateString()}`
                                            ),
                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'div', // Changed from 'li' to 'div'
                                                { className: 'meta-author', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement(
                                                'div', // Changed from 'li' to 'div'
                                                { className: 'meta-tags', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement(
                                                'div', // Changed from 'li' to 'div'
                                                { className: 'meta-comments', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                        color: separatorColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
                                    )

                            ) ,
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
                                        }),
                                    // Post Category
                                    showPostCategory && wp.element.createElement(
                                        'div', // Changed from 'li' to 'div'
                                        { className: 'rs-category', style: { 
                                            color: metaTextColor, 
                                            fontSize: `${metaFontSize}px`,
                                        } },
                                        showMetaIcon && showPostCategoryIcon &&
                                        wp.element.createElement('i', { className: 'fas fa-folder', style:{ 
                                            color: metaIconColor, 
                                            fontSize: `${metaFontSize}px`,
                                        } }), // Font Awesome folder icon
                                        ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                    ),    
                                ),
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style9' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-16 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-16-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        }),
                                ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //TITLE
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
                                
                                //Meta
                                showPostDate && wp.element.createElement(
                                    'div', 
                                        { className: 'rs-meta', style: { 
                                            color: metaTextColor, 
                                            fontSize: `${metaFontSize}px`,
                                        } },
                                        showPostAuthor && wp.element.createElement(
                                            'div', // Changed from 'a' to 'div'
                                            {  className: 'rs-author',
                                                style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } 
                                            },
                                            showMetaIcon && showPostAuthorIcon && 
                                                wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome user icon
                                            ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                        ),

                                        wp.element.createElement(
                                            'div', 
                                            { className: 'rs-date',style: { display: 'flex', alignItems: 'center', gap: '5px' } }, 
                                            showMetaIcon && showPostDateIcon &&
                                            wp.element.createElement('i', { 
                                                className: 'fas fa-calendar-alt',
                                                style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } 
                                            }), // Font Awesome calendar icon
                                            
                                            new Date(post.date).toLocaleDateString()
                                        ),
                                        
                                    ),
                            ) ,
                            
                        );
                    }),
                    
                );
                
                // Add pagination below the posts
                if (enablePagination) {
                    content = wp.element.createElement(
                        wp.element.Fragment, 
                        null,
                        content, // The grid posts
                        paginationControls, // Pagination below
                    );
                }
                
            }

            else if (gridLayoutStyle === 'style10' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-19 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-19-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //Meta

                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: 'rs-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list', },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('li', { className: 'meta-date',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome calendar icon
                                                ` ${new Date(post.date).toLocaleDateString()}`
                                            ),
                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'li', // Changed from 'li' to 'div'
                                                { className: 'meta-author', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement(
                                                'li', // Changed from 'li' to 'div'
                                                { className: 'meta-tags', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement(
                                                'li', // Changed from 'li' to 'div'
                                                { className: 'meta-comments', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                        color: separatorColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
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
                                                               
                                showReadMoreButton && wp.element.createElement('div', { className: 'btn-wrapper',style: { 
                                            order: buttonOrder,
                                            margin: getSpacingValue(attributes.buttonMarginNew),
                                            textAlign: buttonAlignment  }, 
                                        }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-btn read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
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
                        paginationControls, // Pagination below
                    );
                }
                
            }
            else if (gridLayoutStyle === 'style11' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-21 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-21-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        position: 'relative', // Ensure SVG is positioned correctly
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
                                            style: { objectFit: 'cover', width: '100%', borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) },
                                        })
                                    )
                                    : wp.element.createElement('img', {
                                        src: thumbnail,
                                        alt: post.title.rendered,
                                        className: 'post-thumbnail',
                                        style: { objectFit: 'cover', width: '100%' },
                                    }),

                                // Adding the SVG shape
                                wp.element.createElement(
                                    'svg',
                                    {
                                        viewBox: '0 0 410 32',
                                        fill: 'none',
                                        xmlns: 'http://www.w3.org/2000/svg',
                                        className: 'shape__rs_course',
                                        style: {
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            zIndex: 1,
                                        },
                                    },
                                    wp.element.createElement('path', {
                                        fillRule: 'evenodd',
                                        clipRule: 'evenodd',
                                        d: 'M346.69 23.5159C371.59 23.3769 398.013 17.3185 410 4.85404V32H0V9.75773C2.99658 0.284217 26.1914 -2.12936 41.5898 1.81449C49.0762 3.72855 55.7041 6.53361 62.3281 9.33695C69.3286 12.2997 76.3247 15.2605 84.3242 17.1654C111.49 25.8323 134.405 18.6565 157.427 11.4472C171.419 7.06559 185.451 2.67167 200.5 1.81449C217.549 0.842933 234.721 5.15653 251.493 9.36967C259.098 11.2798 266.62 13.1693 274.011 14.5363C278.288 15.3272 282.339 16.1309 286.297 16.9161C304.269 20.4812 320.31 23.6632 346.69 23.5159Z',
                                        fill: '#ffffff',
                                    })
                                )
                            ),

                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //Meta

                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: 'rs-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list', },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('li', { className: 'meta-date',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome calendar icon
                                                ` ${new Date(post.date).toLocaleDateString()}`
                                            ),
                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'li', // Changed from 'li' to 'div'
                                                { className: 'meta-author', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement(
                                                'li', // Changed from 'li' to 'div'
                                                { className: 'meta-tags', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostTagsIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome tags icon
                                                ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                            ),

                                            // Comments Count (Only show if comments exist)
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement(
                                                'li', // Changed from 'li' to 'div'
                                                { className: 'meta-comments', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostCommentsCountIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                    color: metaIconColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } }), // Font Awesome comments icon
                                                ` ${post.comment_count} Comments`
                                            )
                                        ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                            acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                        color: separatorColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }, ` ${metaSeperator} `) 
                                                : null
                                            ), []
                                        )
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
                                                               
                                showReadMoreButton && wp.element.createElement('div', { className: 'btn-wrapper',style: { 
                                            order: buttonOrder,
                                            margin: getSpacingValue(attributes.buttonMarginNew),
                                            textAlign: buttonAlignment  }, 
                                        }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-btn read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
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
                        paginationControls, // Pagination below
                    );
                }
                
            }

            else if (gridLayoutStyle === 'style12' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-26 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: 'fancy-post-item rs-blog-layout-26-item',
                                style: {
                                    
                                    margin: getSpacingValue(attributes.itemMargin),
                                    padding: getSpacingValue(attributes.itemPadding),
                                    borderRadius: getSpacingValue(attributes.itemBorderRadius),
                                    borderWidth: getSpacingValue(attributes.itemBorderWidth),
                                    textAlign: attributes.itemBoxAlignment,   
                                    backgroundColor: attributes.itemBackgroundColor,
                                    borderStyle: attributes.itemBorderType,
                                    borderColor: attributes.itemBorderColor,
                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`,
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
                                        position: 'relative', // Ensure SVG is positioned correctly
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
                                            style: { objectFit: 'cover', width: '100%', borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) },
                                        })
                                    )
                                    : wp.element.createElement('img', {
                                        src: thumbnail,
                                        alt: post.title.rendered,
                                        className: 'post-thumbnail',
                                        style: { objectFit: 'cover', width: '100%' },
                                    }),
                            ),

                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    margin: getSpacingValue(attributes.contentitemMarginNew),
                                    padding: getSpacingValue(attributes.contentitemPaddingNew),
                                    borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                    borderStyle: attributes.contentnormalBorderType,
                                    backgroundColor: contentBgColor,
                                    borderColor: contentBorderColor,
                                    },
                                }, 
                                
                                //Meta

                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: 'rs-meta', 
                                        style: { 
                                            margin: getSpacingValue(attributes.metaMarginNew),
                                            padding: getSpacingValue(attributes.metaPadding),
                                            textAlign: metaAlignment, 
                                            color: metaTextColor, 
                                            order: metaOrder,
                                            fontSize: `${metaFontSize}px`,
                                        } 
                                    },
                                    
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement('div', { className: 'meta-date',style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostDateIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-calendar-alt',
                                                    style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome calendar icon
                                                ` ${new Date(post.date).toLocaleDateString()}`
                                            ),
                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'div', // Changed from 'li' to 'div'
                                                { className: 'meta-author', style: { 
                                                    color: metaTextColor, 
                                                    fontSize: `${metaFontSize}px`,
                                                } },
                                                showMetaIcon && showPostAuthorIcon && 
                                                    wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                        color: metaIconColor, 
                                                        fontSize: `${metaFontSize}px`,
                                                    } }), // Font Awesome user icon
                                                ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                            ),

                                        ]
                                       
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
                                        style: { 
                                                order: excerptOrder,
                                                textAlign: excerptAlignment,
                                                // margin: getSpacingValue(attributes.excerptMargin),
                                                margin: getSpacingValue(attributes.excerptMargin), // Default margin
                                                padding: getSpacingValue(attributes.excerptPadding) 
                                            } // Apply order to the div container
                                    }, 
                                        wp.element.createElement('p', { 
                                            style: { 
                                                
                                                fontSize: `${excerptFontSize}px`,
                                                fontWeight: excerptFontWeight,
                                                lineHeight: excerptLineHeight,
                                                letterSpacing: excerptLetterSpacing, 
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
                                        className: `rs-btn read-more ${buttonStyle}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                            fontSize: `${buttonFontSize}px`,
                                            textDecoration: buttonStyle === 'fpg-flat' ? 'none' : 'inherit'
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonBorderColor;
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
                        paginationControls, // Pagination below
                    );
                }
                
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
                                            { label: 'Style 4', value: 'style4' },
                                            { label: 'Style 5', value: 'style5' },
                                            { label: 'Style 6', value: 'style6' },
                                            { label: 'Style 7', value: 'style7' },
                                            { label: 'Style 8', value: 'style8' },
                                            { label: 'Style 9', value: 'style9' },
                                            { label: 'Style 10', value: 'style10' },
                                            { label: 'Style 11', value: 'style11' },
                                            { label: 'Style 12', value: 'style12' }
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
                                    wp.element.createElement(SelectControl, {
                                        label: __('Hover Animation', 'fancy-post-grid'),
                                        value: hoverAnimation,
                                        options: [
                                            { label: 'None', value: 'none' },
                                            { label: 'Zoom In', value: 'hover-zoom_in' },
                                            { label: 'Zoom Out', value: 'hover-zoom_out' },        
                                        ],
                                        
                                        onChange: (value) => setAttributes({ hoverAnimation: value })
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
                                            { label: 'Filled', value: 'fpg-filled' },
                                            { label: 'Border', value: 'fpg-border' },
                                            { label: 'Flat', value: 'fpg-flat' },
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
                                    
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.sectionBgColor,
                                        onChangeComplete: (value) => setAttributes({ sectionBgColor: value.hex }),
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
                                    // Font Size
                                    wp.element.createElement(RangeControl, {
                                        label: __('Item Gap', 'fancy-post-grid'),
                                        value: attributes.itemGap,
                                        onChange: (value) => setAttributes({ itemGap: value }),
                                        min: 1,
                                        max: 50
                                    }),
                                    
                                    // Box Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Box Alignment', 'fancy-post-grid'),
                                        value: attributes.itemBoxAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'start' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'end' },
                                        ],
                                        onChange: (value) => setAttributes({ itemBoxAlignment: value }),
                                    }),
                                    // Background Type
                                    wp.element.createElement('p', {}, __('Item Box Background Color', 'fancy-post-grid')),
                                    
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.itemBackgroundColor,
                                        onChangeComplete: (value) => setAttributes({ itemBackgroundColor: value.hex }),
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
                                      wp.element.createElement(wp.components.ColorPicker, {
                                            color: attributes.itemBorderColor,
                                            onChangeComplete: (value) => setAttributes({ itemBorderColor: value.hex }),
                                        }),

                                    // Box Shadow
                                    wp.element.createElement('p', {}, __('Box Shadow Color', 'fancy-post-grid')),
                                        
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.itemBoxShadowColor,
                                        onChangeComplete: (value) => setAttributes({ itemBoxShadowColor: value.hex }),
                                    }),

                                    // Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Box Shadow (e.g., 5px)', 'fancy-post-grid'),
                                        values: attributes.itemBoxShadow,
                                        onChange: (value) => setAttributes({ itemBoxShadow: value }),
                                    }),
                                    
                                ),
                                    
                                
                                // Content Box
                                wp.element.createElement(PanelBody, { title: __('Content Box', 'fancy-post-grid'), initialOpen: false },
                                    // Margin Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.contentitemMarginNew,
                                        onChange: (value) => setAttributes({ contentitemMarginNew: value }),
                                    }),

                                    // Padding Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.contentitemPaddingNew,
                                        onChange: (value) => setAttributes({ contentitemPaddingNew: value }),
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
                                    wp.element.createElement('p', {}, __('Box Background Color', 'fancy-post-grid')),
                                                        
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.contentBgColor,
                                        onChangeComplete: (value) => setAttributes({ contentBgColor: value.hex }),
                                    }),
                                    wp.element.createElement('p', {}, __('Box Border Color', 'fancy-post-grid')),
                                                        
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.contentBorderColor,
                                        onChangeComplete: (value) => setAttributes({ contentBorderColor: value.hex }),
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
                                            { label: __('Thin (100)', 'fancy-post-grid'), value: '100' },
                                            { label: __('Extra Light (200)', 'fancy-post-grid'), value: '200' },
                                            { label: __('Light (300)', 'fancy-post-grid'), value: '300' },
                                            { label: __('Normal (400)', 'fancy-post-grid'), value: '400' },
                                            { label: __('Medium (500)', 'fancy-post-grid'), value: '500' },
                                            { label: __('Semi Bold (600)', 'fancy-post-grid'), value: '600' },
                                            { label: __('Bold (700)', 'fancy-post-grid'), value: '700' },
                                            { label: __('Extra Bold (800)', 'fancy-post-grid'), value: '800' },
                                            { label: __('Black (900)', 'fancy-post-grid'), value: '900' }
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
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.postTitleColor,
                                                            onChangeComplete: (value) => setAttributes({ postTitleColor: value.hex }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.postTitleBgColor,
                                                            onChangeComplete: (value) => setAttributes({ postTitleBgColor: value.hex }),
                                                        }),
                                                        
                                                    );
                                                
                                                case "hover":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.postTitleHoverColor,
                                                            onChangeComplete: (value) => setAttributes({ postTitleHoverColor: value.hex }),
                                                        }),

                                                        wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.postTitleHoverBgColor,
                                                            onChangeComplete: (value) => setAttributes({ postTitleHoverBgColor: value.hex }),
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
                                            { label: __('Thin (100)', 'fancy-post-grid'), value: '100' },
                                            { label: __('Extra Light (200)', 'fancy-post-grid'), value: '200' },
                                            { label: __('Light (300)', 'fancy-post-grid'), value: '300' },
                                            { label: __('Normal (400)', 'fancy-post-grid'), value: '400' },
                                            { label: __('Medium (500)', 'fancy-post-grid'), value: '500' },
                                            { label: __('Semi Bold (600)', 'fancy-post-grid'), value: '600' },
                                            { label: __('Bold (700)', 'fancy-post-grid'), value: '700' },
                                            { label: __('Extra Bold (800)', 'fancy-post-grid'), value: '800' },
                                            { label: __('Black (900)', 'fancy-post-grid'), value: '900' }
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
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptColor: value.hex }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptBgColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptBgColor: value.hex }),
                                                        }),
                                                        
                                                    );
                                                
                                                case "hover":
                                                    return wp.element.createElement(
                                                        Fragment,
                                                        {},
                                                        wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptHoverColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptHoverColor: value.hex }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptHoverBgColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptHoverBgColor: value.hex }),
                                                        }),
                                                        wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptHoverBorderColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptHoverBorderColor: value.hex }),
                                                        }),
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
                                    // Font Size
                                    wp.element.createElement(RangeControl, {
                                        label: __('Font Size', 'fancy-post-grid'),
                                        value: attributes.metaFontSize,
                                        onChange: (value) => setAttributes({ metaFontSize: value }),
                                        min: 10,
                                        max: 50
                                    }),

                                    // Margin Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.metaMarginNew,
                                        onChange: (value) => setAttributes({ metaMarginNew: value }),
                                    }),
                                    // Margin Control
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.metaPadding,
                                        onChange: (value) => setAttributes({ metaPadding: value }),
                                    }),
                                    // Meta Text Color
                                    wp.element.createElement('p', {}, __('Meta Text Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.metaTextColor,
                                        onChangeComplete: (value) => setAttributes({ metaTextColor: value.hex }),
                                    }),

                                    // Separator Color
                                    wp.element.createElement('p', {}, __('Separator Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.separatorColor,
                                        onChangeComplete: (value) => setAttributes({ separatorColor: value.hex }),
                                    }),               

                                    // Icon Color
                                    wp.element.createElement('p', {}, __('Icon Color', 'fancy-post-grid')),

                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.metaIconColor,
                                        onChangeComplete: (value) => setAttributes({ metaIconColor: value.hex }),
                                    }),
                                    
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
                                    
                                    // Font Size
                                    wp.element.createElement(RangeControl, {
                                        label: __('Font Size', 'fancy-post-grid'),
                                        value: attributes.buttonFontSize,
                                        onChange: (value) => setAttributes({ buttonFontSize: value }),
                                        min: 10,
                                        max: 50
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Font Weight', 'fancy-post-grid'),
                                        value: attributes.buttonFontWeight,
                                        options: [
                                            { label: __('Default', 'fancy-post-grid'), value: 'default' },
                                            { label: __('Thin (100)', 'fancy-post-grid'), value: '100' },
                                            { label: __('Extra Light (200)', 'fancy-post-grid'), value: '200' },
                                            { label: __('Light (300)', 'fancy-post-grid'), value: '300' },
                                            { label: __('Normal (400)', 'fancy-post-grid'), value: '400' },
                                            { label: __('Medium (500)', 'fancy-post-grid'), value: '500' },
                                            { label: __('Semi Bold (600)', 'fancy-post-grid'), value: '600' },
                                            { label: __('Bold (700)', 'fancy-post-grid'), value: '700' },
                                            { label: __('Extra Bold (800)', 'fancy-post-grid'), value: '800' },
                                            { label: __('Black (900)', 'fancy-post-grid'), value: '900' }
                                        ],
                                        onChange: (value) => setAttributes({ buttonFontWeight: value }),
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
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonTextColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonTextColor: value.hex }),
                                                }),

                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonBackgroundColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonBackgroundColor: value.hex }),
                                                }),
                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonBorderColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonBorderColor: value.hex }),
                                                }),

                                            ] : [
                                                // Hover Button Text Color
                                                wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonHoverTextColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonHoverTextColor: value.hex }),
                                                }),

                                                // Hover Button Background Color
                                                wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonHoverBackgroundColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonHoverBackgroundColor: value.hex }),
                                                }),
                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonHoverBorderColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonHoverBorderColor: value.hex }),
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

                                    
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Radius', 'fancy-post-grid'),
                                        values: attributes.paginationBorderRadius,
                                        onChange: (value) => setAttributes({ paginationBorderRadius: value }),
                                    }),

                                    wp.element.createElement(RangeControl, {
                                        label: __('Gap', 'fancy-post-grid'),
                                        value: attributes.paginationGap,
                                        onChange: (value) => setAttributes({ paginationGap: value }),
                                        min: 0,
                                        max: 100
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Font Size', 'fancy-post-grid'),
                                        value: attributes.paginationFontSize,
                                        onChange: (value) => setAttributes({ paginationFontSize: value }),
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
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationTextColor,
                                                onChangeComplete: (value) => setAttributes({ paginationTextColor: value.hex }),
                                            }),

                                            // Normal Background Color
                                            wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ paginationBackgroundColor: value.hex }),
                                            }),

                                            // Normal Border Color
                                            wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationBorderColor,
                                                onChangeComplete: (value) => setAttributes({ paginationBorderColor: value.hex }),
                                            }),

                                        ] : tab.name === 'hover' ? [
                                            // Hover Text Color
                                            wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationHoverTextColor,
                                                onChangeComplete: (value) => setAttributes({ paginationHoverTextColor: value.hex }),
                                            }),

                                            // Hover Background Color
                                            wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationHoverBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ paginationHoverBackgroundColor: value.hex }),
                                            }),

                                            // Hover Border Color
                                            wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationHoverBorderColor,
                                                onChangeComplete: (value) => setAttributes({ paginationHoverBorderColor: value.hex }),
                                            }),

                                        ] : [
                                            // Active Text Color
                                            wp.element.createElement('p', {}, __('Active Text Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationActiveTextColor,
                                                onChangeComplete: (value) => setAttributes({ paginationActiveTextColor: value.hex }),
                                            }),

                                            // Active Background Color
                                            wp.element.createElement('p', {}, __('Active Background Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationActiveBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ paginationActiveBackgroundColor: value.hex }),
                                            }),

                                            // Active Border Color
                                            wp.element.createElement('p', {}, __('Active Border Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationActiveBorderColor,
                                                onChangeComplete: (value) => setAttributes({ paginationActiveBorderColor: value.hex }),
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
