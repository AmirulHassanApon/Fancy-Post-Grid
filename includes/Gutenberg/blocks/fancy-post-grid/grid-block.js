(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    
    const { Fragment,useState, useEffect  } = wp.element;
    const { PanelBody, TabPanel,__experimentalBoxControl  , RangeControl,ColorPicker,Button , ToggleControl, TextControl, SelectControl  } = wp.components;

    registerBlockType('fancy-post-grid/block', {
        title: __('Grid Layout', 'fancy-post-grid'),
        icon: 'grid-view',
        category: 'fancy-post-grid-category',

        attributes: {
            // Layout
            gridColumns: { type: 'number'},
            gridLayoutStyle: { type: 'string', default: 'style1' },
            // Query Builder
            selectedCategory: { type: 'string', default: '' },
            selectedTag: { type: 'string', default: '' },
            orderBy: { type: 'string', default: 'title' },  
            postLimit: { type: 'number', default: 3 },           
            // Pagination settings
            enablePagination: { type: 'boolean', default: true },
            // links
            postLinkTarget: { type: 'string', default: 'newWindow' },
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
            showPostTags: { type: 'boolean', default: false },
            showPostCommentsCount: { type: 'boolean', default: false },
            showMetaIcon: { type: 'boolean', default: true },
            showPostDateIcon: { type: 'boolean', default: true },
            showPostAuthorIcon: { type: 'boolean', default: true },
            showPostCategoryIcon: { type: 'boolean', default: true },
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
            thumbnailSize: { type: 'string' },
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
            buttonStyle: { type: 'string' },
            showButtonIcon: { type: 'boolean', default: true },
            iconPosition: { type: 'string', default: 'right' },
            //SECTION Area
            sectionBgColor: { type: 'string', default: '' },
            sectionMargin: { type: 'object' },
            sectionPadding: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },            
            //ITEM Box           
            itemMargin: { type: 'object' },
            itemPadding: { type: 'object' },
            itemBorderRadius: { type: 'object', default: { top: '5', right: '5', bottom: '5', left: '5' }, },
            itemGap: { type: 'number', default: '30' },
            itemBoxAlignment: { type: 'string', default: 'start' },
            itemBorderType: { type: 'string', default: '' },
            itemBoxShadow: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },
            itemBoxShadowColor: { type: 'string', default: '' },  
            itemBackgroundColor: { type: 'string', default: '' },
            itemBorderColor: { type: 'string', default: '' },
            itemBorderWidth: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },            
            //Content Box
            contentitemMarginNew: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },
            contentitemPaddingNew: { type: 'object' },
            contentBorderWidth: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },
            contentnormalBorderType: { type: 'string', default: '' },     
            contentBgColor: { type: 'string', default: '' },       
            contentBorderColor: { type: 'string', default: '' },       
            //ThumbNail            
            thumbnailMargin: { type: 'object' },
            thumbnailPadding: { type: 'object' },
            thumbnailBorderRadius: { type: 'object' },
            
            //Post Title
            postTitleFontSize: { type: 'number', default: '24' },
            postTitleLineHeight: { type: 'number', default: '' },
            postTitleLetterSpacing: { type: 'number', default: '' },
            postTitleFontWeight: { type: 'string', default: '600' },
            postTitleAlignment: { type: 'string'},
            postTitleMargin: { type: 'object' },
            postTitlePadding: { type: 'object' },
            postTitleColor: { type: 'string', default: '' },
            postTitleBgColor: { type: 'string', default: '' },   
            postTitleHoverColor: { type: 'string', default: '' },
            postTitleHoverBgColor: { type: 'string', default: '' },
                    
            //excerpt
            excerptFontSize: { type: 'number', default: '' },
            excerptLineHeight: { type: 'number', default: '' },
            excerptLetterSpacing: { type: 'number', default: '' },
            excerptFontWeight: { type: 'string', default: '' },
            excerptAlignment: { type: 'string' },
            excerptMargin: { type: 'object', default: { top: '10', right: '0', bottom: '10', left: '0' }, },
            excerptPadding: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },
            excerptColor: { type: 'string', default: '' },
            excerptBgColor: { type: 'string', default: '' },
            excerptHoverColor: { type: 'string', default: '' },
            excerptHoverBgColor: { type: 'string', default: '' },
            excerptHoverBorderColor: { type: 'string', default: '' },
            //meta 
            metaFontSize: { type: 'number' },
            metaAlignment: { type: 'string' },
            metaMarginNew: { type: 'object' }, 
            metaPadding: { type: 'object' }, 
            metaTextColor: { type: 'string', default: '' },
            separatorColor: { type: 'string', default: '' },
            metaIconColor: { type: 'string', default: '' },
            
            //Button
            buttonAlignment: { type: 'string'},
            buttonMarginNew: { type: 'object' },
            buttonPaddingNew: { type: 'object'},
            buttonFontSize: { type: 'string'},
            buttonTextColor: { type: 'string', default: '' },
            buttonBackgroundColor: { type: 'string', default: '' },
            buttonBorderType: { type: 'string', default: '' },
            buttonBorderRadius: { type: 'object' },
            buttonFontWeight: { type: 'string' },
            buttonBorderWidth: { type: 'object' },
            buttonHoverTextColor: { type: 'string', default: '' },
            buttonHoverBackgroundColor: { type: 'string', default: '' },
            buttonBorderColor: { type: 'string', default: '' },
            buttonHoverBorderColor: { type: 'string', default: '' },
           
            //Pagination
            paginationMarginNew: { type: 'object', default: { top: '50', right: '0', bottom: '0', left: '0' }, },
            paginationPaddingNew: { type: 'object', default: { top: '0', right: '20', bottom: '0', left: '20' }, },             
            paginationAlignment: { type: 'string', default: 'center' },
            paginationBorderStyle: { type: 'string', default: '' },
            paginationBorderRadius: { type: 'object', default: { top: '0', right: '0', bottom: '0', left: '0' }, },
            paginationBorderWidthNew: { type: 'object', default: { top: '1', right: '1', bottom: '1', left: '1' }, },
            paginationGap: { type: 'number', default: '20' },
            paginationFontSize: { type: 'number', default: '16' },
            paginationTextColor: { type: 'string', default: '#6a6d7a' },
            paginationBackgroundColor: { type: 'string', default: '' },
            paginationBorderColor: { type: 'string', default: '#eaeaea' },
            paginationHoverTextColor: { type: 'string', default: '#ffffff' },
            paginationHoverBackgroundColor: { type: 'string', default: '#007aff' },
            paginationHoverBorderColor: { type: 'string', default: '#007aff' },
            paginationActiveTextColor: { type: 'string', default: '#ffffff' },
            paginationActiveBackgroundColor: { type: 'string', default: '#007aff' },
            paginationActiveBorderColor: { type: 'string', default: '#007aff' },
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
                paginationBorderStyle,paginationBorderRadius,paginationGap,paginationFontSize,paginationBorderWidthNew,
                paginationTextColor,paginationBackgroundColor,paginationBorderColor,
                paginationHoverTextColor,paginationHoverBackgroundColor,paginationHoverBorderColor,
                paginationActiveTextColor,paginationActiveBackgroundColor,paginationActiveBorderColor, 
                postType  } = attributes;
            // You can handle layout-specific logic here
            // Grid Column    
            const newGridColumns1 = (gridLayoutStyle === 'style1' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns2 = (gridLayoutStyle === 'style2' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns3 = (gridLayoutStyle === 'style3' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns4 = (gridLayoutStyle === 'style4' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns;
            const newGridColumns5 = (gridLayoutStyle === 'style5' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns6 = (gridLayoutStyle === 'style6' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns7 = (gridLayoutStyle === 'style7' && attributes.gridColumns == null)
              ? 4 : attributes.gridColumns; 
            const newGridColumns8 = (gridLayoutStyle === 'style8' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns;
            const newGridColumns9 = (gridLayoutStyle === 'style9' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns10 = (gridLayoutStyle === 'style10' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns11 = (gridLayoutStyle === 'style11' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 
            const newGridColumns12 = (gridLayoutStyle === 'style12' && attributes.gridColumns == null)
              ? 3 : attributes.gridColumns; 

            // thumbnailSize
            const thumbnailSize1 = (gridLayoutStyle === 'style1' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize; 
            const thumbnailSize2 = (gridLayoutStyle === 'style2' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize;  
            const thumbnailSize3 = (gridLayoutStyle === 'style3' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize;
            const thumbnailSize4 = (gridLayoutStyle === 'style4' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize; 
            const thumbnailSize5 = (gridLayoutStyle === 'style5' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize;  
            const thumbnailSize6 = (gridLayoutStyle === 'style6' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize; 
            const thumbnailSize7 = (gridLayoutStyle === 'style7' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize;  
            const thumbnailSize8 = (gridLayoutStyle === 'style8' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize;
            const thumbnailSize9 = (gridLayoutStyle === 'style9' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize;  
            const thumbnailSize10 = (gridLayoutStyle === 'style10' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize; 
            const thumbnailSize11 = (gridLayoutStyle === 'style11' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize;  
            const thumbnailSize12 = (gridLayoutStyle === 'style12' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize;

            // Button Style
            const buttonStyle1 = (gridLayoutStyle === 'style1' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle; 
            const buttonStyle2 = (gridLayoutStyle === 'style2' && attributes.buttonStyle == null)
              ? 'fpg-border' : attributes.buttonStyle;  
            const buttonStyle3 = (gridLayoutStyle === 'style3' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle;
            const buttonStyle5 = (gridLayoutStyle === 'style5' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle; 
            const buttonStyle6 = (gridLayoutStyle === 'style6' && attributes.buttonStyle == null)
              ? 'fpg-border' : attributes.buttonStyle;  
            const buttonStyle10 = (gridLayoutStyle === 'style10' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle; 
            const buttonStyle11 = (gridLayoutStyle === 'style11' && attributes.buttonStyle == null)
              ? 'fpg-border' : attributes.buttonStyle;  
            const buttonStyle12 = (gridLayoutStyle === 'style12' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle;  
            
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
                
                return `${value.top || '0'}px ${value.right || '0'}px ${value.bottom || '0'}px ${value.left || '0'}px`;
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

            const titleTextStyle = {
                ...(postTitleColor ? { color: postTitleColor } : {}),
                ...(postTitleFontSize ? { fontSize: `${postTitleFontSize}px` } : {}),
                ...(postTitleFontWeight ? { fontWeight: postTitleFontWeight } : {}),
                ...(postTitleLineHeight ? { lineHeight: postTitleLineHeight } : {}),
                ...(postTitleLetterSpacing ? { letterSpacing: postTitleLetterSpacing } : {}),
            };

            const titleTextHoverHandlers = {
                onMouseEnter: (e) => {
                    e.currentTarget.style.color = postTitleHoverColor;
                    e.currentTarget.style.backgroundImage = `linear-gradient(to bottom, ${postTitleHoverColor} 0%, ${postTitleHoverColor} 100%)`;
                    e.currentTarget.style.backgroundPosition = '0 100%';
                },
                onMouseLeave: (e) => {
                    e.currentTarget.style.color = postTitleColor;
                },
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
                            
                        },
                        wp.element.createElement(
                            'span',
                            {
                                className: `page-numbers${currentPage === i ? ' current' : ''}`,
                                style: {
                                    ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                    ...(attributes.paginationPaddingNew ? { padding: getSpacingValue(attributes.paginationPaddingNew) } : {}),
                                    ...(attributes.paginationActiveTextColor ? { color: attributes.paginationActiveTextColor } : {}),
                                    ...(attributes.paginationActiveBorderColor ? { borderColor: attributes.paginationActiveBorderColor } : {}),
                                    ...(attributes.paginationActiveBackgroundColor ? { backgroundColor: attributes.paginationActiveBackgroundColor } : {}),
                                    ...(attributes.paginationFontSize ? { fontSize: `${attributes.paginationFontSize}px` } : {}),
                                    ...(attributes.paginationBorderStyle ? { borderStyle: attributes.paginationBorderStyle } : {}),
                                    ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                    ...(attributes.paginationBorderWidthNew ? { borderWidth: getSpacingValue(attributes.paginationBorderWidthNew) } : {}),
                                },
                                
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
                        
                    },
                },
                wp.element.createElement(
                'ul',
                {
                    className: 'page-numbers',
                    style: {
                        gap: attributes.paginationGap,
                    },
                },
                    wp.element.createElement(
                        'li',
                        {
                            onClick: () => handlePageClick(currentPage - 1),
                            
                        },
                        wp.element.createElement(
                            'a',
                            {
                                className: 'prev page-numbers',
                                style: {
                                    ...(attributes.paginationPaddingNew ? { padding: getSpacingValue(attributes.paginationPaddingNew) } : {}),
                                    ...(attributes.paginationTextColor ? { color: attributes.paginationTextColor } : {}),
                                    ...(attributes.paginationBackgroundColor ? { backgroundColor: attributes.paginationBackgroundColor } : {}),
                                    ...(attributes.paginationFontSize ? { fontSize: `${attributes.paginationFontSize}px` } : {}),
                                    ...(attributes.paginationBorderStyle ? { borderStyle: attributes.paginationBorderStyle } : {}),
                                    ...(attributes.paginationBorderWidthNew ? { borderWidth: getSpacingValue(attributes.paginationBorderWidthNew) } : {}),
                                    ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                    ...(attributes.paginationBorderColor ? { borderColor: attributes.paginationBorderColor } : {}),
                                },
                                onMouseEnter: (e) => {
                                    
                                        e.currentTarget.style.color = attributes.paginationHoverTextColor;
                                    e.currentTarget.style.borderColor = attributes.paginationHoverBorderColor;
                                    e.currentTarget.style.backgroundColor = attributes.paginationHoverBackgroundColor;
                                    
                                },
                                onMouseLeave: (e) => {
                                    e.currentTarget.style.color = attributes.paginationTextColor;
                                    e.currentTarget.style.borderColor = attributes.paginationBorderColor;
                                    e.currentTarget.style.backgroundColor = attributes.paginationBackgroundColor;
                                },
                            },
                            __('<< Prev', 'fancy-post-grid')
                        )
                    ),

                    ...paginationNumbers, // Dynamically generated pagination buttons
                    wp.element.createElement(
                        'li',
                        {
                            onClick: () => handlePageClick(currentPage + 1),
                            disabled: currentPage === totalPages,
                            
                        },
                        wp.element.createElement(
                            'a',
                            {
                                
                                className: 'next page-numbers',
                                style: {
                                    ...(attributes.paginationBackgroundColor ? { backgroundColor: attributes.paginationBackgroundColor } : {}),
                                    ...(attributes.paginationPaddingNew ? { padding: getSpacingValue(attributes.paginationPaddingNew) } : {}),
                                    ...(attributes.paginationTextColor ? { color: attributes.paginationTextColor } : {}),
                                    ...(attributes.paginationFontSize ? { fontSize: `${attributes.paginationFontSize}px` } : {}),
                                    ...(attributes.paginationBorderStyle ? { borderStyle: attributes.paginationBorderStyle } : {}),
                                ...(attributes.paginationBorderWidthNew ? { borderWidth: getSpacingValue(attributes.paginationBorderWidthNew) } : {}),
                                ...(attributes.paginationBorderRadius ? { borderRadius: getSpacingValue(attributes.paginationBorderRadius) } : {}),
                                ...(attributes.paginationBorderColor ? { borderColor: attributes.paginationBorderColor } : {}),
                                },
                                onMouseEnter: (e) => {
                                    
                                        e.currentTarget.style.color = attributes.paginationHoverTextColor;
                                    e.currentTarget.style.borderColor = attributes.paginationHoverBorderColor;
                                    e.currentTarget.style.backgroundColor = attributes.paginationHoverBackgroundColor;
                                    
                                },
                                onMouseLeave: (e) => {
                                    e.currentTarget.style.color = attributes.paginationTextColor;
                                    e.currentTarget.style.borderColor = attributes.paginationBorderColor;
                                    e.currentTarget.style.backgroundColor = attributes.paginationBackgroundColor;
                                },
                            },
                        __('Next >>', 'fancy-post-grid')
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
                            gridTemplateColumns: `repeat(${newGridColumns1}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize1]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog__single align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
                                    
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
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '20px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //Meta

                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: `meta-data-list post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                                'li',
                                                {
                                                    className: 'meta-date',
                                                    style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    },
                                                },
                                                showMetaIcon && showPostDateIcon &&
                                                    wp.element.createElement('i', {
                                                        className: 'fas fa-calendar-alt',
                                                        style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        },
                                                    }),
                                                ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}`
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
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            onMouseEnter: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleBgColor;
                                                
                                            }, 
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
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
                                        className: `fpg-excerpt align-${excerptAlignment}`, 
                                        style: { 
                                              ...(excerptOrder ? { order: excerptOrder } : {}),
                                              ...(attributes.excerptMargin ? { margin: getSpacingValue(attributes.excerptMargin) } : {}),
                                              ...(attributes.excerptPadding ? { padding: getSpacingValue(attributes.excerptPadding) } : {}), 
                                          } 
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

                                
                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `btn-wrapper align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-link read-more ${buttonStyle1}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '0px 0px 0px 0px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                            gridTemplateColumns: `repeat(${newGridColumns2}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize2]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog__single mt-30 align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemBorderRadius ? { borderRadius: getSpacingValue(attributes.itemBorderRadius) } : {}),
                                    ...(attributes.itemBorderWidth ? { borderWidth: getSpacingValue(attributes.itemBorderWidth) } : {}),
                                    ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : { backgroundColor: '#f7f7f7' }),
                                    ...(attributes.itemBorderType ? { borderStyle: attributes.itemBorderType } : {}),
                                    ...(attributes.itemBorderColor ? { borderColor: attributes.itemBorderColor } : {}),
                                    ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                        boxShadow: `${getSpacingValue(attributes.itemBoxShadow) || '10px'} ${attributes.itemBoxShadowColor || 'rgba(0,0,0,0.1)'}`
                                    } : {})
                                },
                            },
                        
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',
                                    style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '30px 30px 30px 30px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //Meta
                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: `meta-data-list post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                                'li',
                                                {
                                                    className: 'meta-date',
                                                    style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    },
                                                },
                                                showMetaIcon && showPostDateIcon &&
                                                    wp.element.createElement('i', {
                                                        className: 'fas fa-calendar-alt',
                                                        style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        },
                                                    }),
                                                ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}`
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
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            onMouseEnter: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleHoverBgColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.currentTarget.style.backgroundColor = postTitleBgColor;
                                                
                                            }, 
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
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
                                        className: `fpg-excerpt align-${excerptAlignment}`,
                                        style: { 
                                                ...(excerptOrder ? { order: excerptOrder } : {}),
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

                                
                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `btn-wrapper align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew)  }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-link read-more ${buttonStyle2}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '0px 0px 0px 0px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                            gridTemplateColumns: `repeat(${newGridColumns3}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        }
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize3]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                            const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                            
                            return wp.element.createElement('div', { 
                                key: post.id, 
                                    className: `fancy-post-item rs-blog-layout-28-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                    style: {
                                        ...(attributes.itemMargin
                                          ? { margin: getSpacingValue(attributes.itemMargin) }
                                          : { margin: '40px 0px 0px 0px' }), // your default fallback
                                        ...(attributes.itemPadding
                                          ? { margin: getSpacingValue(attributes.itemPadding) }
                                          : { margin: '0px 0px 0px 0px' }), // your default fallback
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
                                                    style: { objectFit: 'cover', width: '100%' },
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
                                                    className: `rs-meta post-meta align-${metaAlignment}`,
                                                    style: { 
                                                    
                                                    ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                                    ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '9px 30px 9px 30px' }),
                                                    
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } 
                                                }, 
                                                    wp.element.createElement('ul', { className: 'meta-data-list' }, // Add ul wrapper
                                                        [
                                                    // Post Date
                                                    showPostDate && wp.element.createElement(
                                                        'li',
                                                        {
                                                            className: 'meta-date',
                                                            style: { 
                                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                            },
                                                        },
                                                        showMetaIcon && showPostDateIcon &&
                                                            wp.element.createElement('i', {
                                                                className: 'fas fa-calendar-alt',
                                                                style:{ 
                                                                ...(metaIconColor ? { color: metaIconColor } : {}),
                                                                ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                                },
                                                            }),
                                                        ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}`
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
                                                    )
                                                ),
                                    ),
                               
                                // Wrap the entire content in a new div (e.g., rs-content)
                                wp.element.createElement('div', { className: 'rs-content',
                                    style: {
                                        ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                        ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '20px 30px 30px 30px' }), // your default fallback
                                        ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                        ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                        ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                        ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                        },
                                    }, 
                                    
                                    //TITLE
                                    showPostTitle &&
                                        wp.element.createElement(
                                            titleTag,
                                            {
                                                className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                                style: {
                                                    ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '0px 0px 0px 0px' }), 
                                                    ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '5px 0px 10px 0px' }),
                                                    ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                    ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                    ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                                },
                                                ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                            },
                                            postLinkType === 'yeslink'
                                                ? wp.element.createElement(
                                                    'a',
                                                    {
                                                        href: post.link,
                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                        style: titleTextStyle,
                                                        ...titleTextHoverHandlers,
                                                    },
                                                    titleCropBy === 'word'
                                                        ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                        : post.title.rendered.substring(0, titleLength)
                                                )
                                                : (titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength))
                                        ),
                                    
                                    //Meta
                                    showPostExcerpt &&
                                        wp.element.createElement('div', { 
                                            className: `fpg-excerpt align-${excerptAlignment}`,
                                            style: { 
                                                    ...(excerptOrder ? { order: excerptOrder } : {}),
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

                                    
                                    showReadMoreButton && wp.element.createElement('div', { 
                                        className: `btn-wrapper align-${buttonAlignment} `,
                                        style: { 
                                            order: buttonOrder,
                                            margin: getSpacingValue(attributes.buttonMarginNew),
                                            textAlign: buttonAlignment  }, 

                                        }, 
                                        wp.element.createElement('a', { 
                                            href: post.link, 
                                            target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                            className: `rs-btn read-more ${buttonStyle3}`,  // Dynamic class based on buttonStyle
                                            style: { 
                                                
                                                ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                                ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                                ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                                ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                                ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                                ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                                ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '10px 30px 10px 30px' }),
                                                ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                                ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                                ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                            },
                                            onMouseEnter: (e) => {
                                                e.currentTarget.style.color = buttonHoverTextColor;
                                                e.currentTarget.style.background = buttonHoverBackgroundColor;
                                                e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                            },
                                            onMouseLeave: (e) => {
                                                e.currentTarget.style.color = buttonTextColor;
                                                e.currentTarget.style.background = buttonBackgroundColor;
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
                            gridTemplateColumns: `repeat(${newGridColumns4}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                            
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize4]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-30-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '20px 20px 15px 20px' }), // your default fallback
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
                                                
                                                ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}`
                                            )
                                        ),
                                    ),
                           
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',
                                style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '20px 0px 20px 0px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }),
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                
                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        
                                        className: `rs-meta post-meta align-${metaAlignment} `,
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        }  
                                    },
                                        wp.element.createElement('ul', { 
                                            className: 'post-meta', 
                                        },
                                            [
                                                // Post Author
                                                showPostAuthor && wp.element.createElement(
                                                    'li', 
                                                    { className: 'meta-author', 
                                                        style: { 
                                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        }
                                                    },
                                                    showMetaIcon && showPostAuthorIcon && 
                                                        wp.element.createElement('i', { className: 'fas fa-user', style:{ 
                                                            ...(metaIconColor ? { color: metaIconColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        } }), // Font Awesome user icon
                                                    ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                                ),

                                                // Post Category
                                                showPostCategory && wp.element.createElement('li', { className: 'meta-category', style: { 
                                                        ...(metaTextColor ? { color: metaTextColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } },
                                                    showMetaIcon && showPostCategoryIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-folder', style:{ 
                                                            ...(metaIconColor ? { color: metaIconColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        } }), // Font Awesome folder icon
                                                    ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
                                                ),

                                                // Post Tags (Only show if tags exist)
                                                showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('li', { className: 'meta-tags', style: { 
                                                        ...(metaTextColor ? { color: metaTextColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } },
                                                    showMetaIcon && showPostTagsIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-tags', style:{ 
                                                            ...(metaIconColor ? { color: metaIconColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        } }), // Font Awesome tags icon
                                                    ` ${post._embedded?.['wp:term']?.[1]?.map(tag => tag.name).join(', ')}`
                                                ),

                                                // Comments Count (Only show if comments exist)
                                                showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('li', { className: 'meta-comments', style: { 
                                                        ...(metaTextColor ? { color: metaTextColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } },
                                                    showMetaIcon && showPostCommentsCountIcon &&
                                                    wp.element.createElement('i', { className: 'fas fa-comments', style:{ 
                                                            ...(metaIconColor ? { color: metaIconColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        } }), // Font Awesome comments icon
                                                    ` ${post.comment_count} Comments`
                                                )
                                            ].filter(Boolean).reduce((acc, curr, index, arr) => 
                                                acc.concat(curr, index < arr.length - 1 && metaSeperator !== 'none' 
                                                    ? wp.element.createElement('span', { className: 'meta-separator', style: { 
                                                            ...(separatorColor ? { color: separatorColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        } }, ` ${metaSeperator} `) 
                                                    : null
                                                ), []
                                            )
                                        )
                                    ),

                                showPostExcerpt &&
                                    wp.element.createElement('div', { 
                                        className: `fpg-excerpt align-${excerptAlignment}`, 
                                        style: { 
                                                ...(excerptOrder ? { order: excerptOrder } : {}),
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
                            gridTemplateColumns: `repeat(${newGridColumns5}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize5]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item pre-blog-item style_12 pre-blog-meta-style2 default align-${itemBoxAlignment}`,
                                style: { 
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback                                   
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
                            wp.element.createElement('div', { className: 'blog-inner-wrap pre-thum-default pre-meta-blocks top',
                                }, 
                            // Thumbnail Display with Link if enabled
                            showThumbnail && thumbnail &&
                                wp.element.createElement(
                                    'div',
                                    {
                                        className: 'pre-image-wrap thumbnail-wrapper',
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
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '75px 20px 25px 20px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                //Meta
                                showMetaData && 
                                    wp.element.createElement('ul', { 
                                        className: `meta-data-list post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        } 
                                    },
                                        [
                                            
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
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `pre-post-title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '0px 0px 28px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
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
                                    wp.element.createElement('p', { 
                                        
                                        className: `pre-content align-${excerptAlignment}`, 
                                        style: { 
                                            ...(excerptOrder ? { order: excerptOrder } : {}),
                                            ...(attributes.excerptMargin ? { margin: getSpacingValue(attributes.excerptMargin) } : {}),
                                            ...(attributes.excerptPadding ? { padding: getSpacingValue(attributes.excerptPadding) } : {}), 
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
                                    ),

                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `blog-btn-part align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `blog-btn read-more ${buttonStyle5}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '0px 0px 0px 0px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                            gridTemplateColumns: `repeat(${newGridColumns6}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        }
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize6]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-13-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
                                    
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
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '30px 25px 30px 30px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                
                                //Meta
                                showMetaData && 
                                    wp.element.createElement('div', {  
                                        className: `rs-meta post-meta align-${metaAlignment} `,
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        }
                                    },
                                        wp.element.createElement('ul', { 
                                            className: 'meta-data-list post-meta', 
                                        },
                                          [                                            
                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                              'div',
                                                {
                                                    className: 'meta-author',
                                                    style: {
                                                        ...(metaTextColor ? { color: metaTextColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    },
                                                },
                                                
                                                // Author Avatar (Image)
                                                showMetaIcon && showPostAuthorIcon && post._embedded?.author?.[0]?.avatar_urls?.['48'] &&
                                                    wp.element.createElement('img', {
                                                        src: post._embedded.author[0].avatar_urls['48'],
                                                        alt: post._embedded.author[0].name,
                                                    }),

                                                // Author Name and Prefix inside <span>
                                                wp.element.createElement(
                                                    'span',
                                                    null,
                                                    wp.element.createElement(
                                                        'a',
                                                        {
                                                            href: post._embedded?.author?.[0]?.link || '#',
                                                            style: {
                                                                textDecoration: 'none',
                                                                color: metaTextColor || 'inherit'
                                                            },
                                                        },
                                                        `${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name || ''}`
                                                    )
                                                )
                                            ),
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                              'li',
                                              {
                                                  className: 'meta-date',
                                                  style: { 
                                                      ...(metaTextColor ? { color: metaTextColor } : {}),
                                                      ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                  },
                                              },
                                              
                                              ` News in ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric' })}`
                                          ),

                                            
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
                                        )
                                    ),

                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `btn-wrapper align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `blog-btn read-more ${buttonStyle6}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '0px 0px 0px 0px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                        className: 'rs-blog-layout-14 grey fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${newGridColumns7}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                            
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize7]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-14-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 40px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
                                    
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
                            wp.element.createElement('div', { className: 'rs-content',
                                  style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '20px 20px 20px 20px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                  },
                                }, 
                                
                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                
                                //Meta
                                showPostDate && wp.element.createElement(
                                    'div', 
                                        { className: `rs-meta post-meta align-${metaAlignment}`, style: { 
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
                                            
                                            ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric',
                                              })}`
                                        ),
                                        showPostAuthor && wp.element.createElement(
                                            'a', 
                                            {  style: { 
                                                color: metaTextColor, 
                                                fontSize: `${metaFontSize}px`,
                                            } },
                                            showMetaIcon && showPostCategoryIcon &&
                                                wp.element.createElement('i', { className: 'fas fa-folder',style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    } }), // Font Awesome folder icon
                                                ` ${post._embedded?.['wp:term']?.[0]?.map(cat => cat.name).join(', ')}`
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
                            gridTemplateColumns: `repeat(${newGridColumns8}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        }  
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize8]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-15-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 40px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
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
                        
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '20px 20px 20px 20px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //TITLE
                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                
                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: `rs-meta post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        } 
                                    },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                                'div',
                                                {
                                                    className: 'meta-date',
                                                    style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    },
                                                },
                                                showMetaIcon && showPostDateIcon &&
                                                    wp.element.createElement('i', {
                                                        className: 'fas fa-calendar-alt',
                                                        style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        },
                                                    }),
                                                ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}`
                                            ),

                                            // Post Author
                                            showPostAuthor && wp.element.createElement(
                                                'div', 
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

                                            // Post Tags (Only show if tags exist)
                                            showPostTags && post._embedded?.['wp:term']?.[1]?.length > 0 && wp.element.createElement('div', { className: 'meta-tags',style: { 
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
                                            showPostCommentsCount && post.comment_count > 0 && wp.element.createElement('div', { className: 'meta-comments',style: { 
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
                                    )

                            ) ,
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
                            gridTemplateColumns: `repeat(${newGridColumns9}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize9]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-16-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
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
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '30px 30px 30px 30px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                
                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                
                                //Meta
                                showPostDate && wp.element.createElement(
                                    'div', 
                                        { className: `rs-meta post-meta align-${metaAlignment} `, style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '20px 0px 20px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        } },
                                        showPostAuthor && wp.element.createElement(
                                          'div',
                                          {
                                              className: 'meta-author',
                                              style: {
                                                  ...(metaTextColor ? { color: metaTextColor } : {}),
                                                  ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                              },
                                          },
                                          
                                          // Author Avatar (Image)
                                          showMetaIcon && showPostAuthorIcon && post._embedded?.author?.[0]?.avatar_urls?.['48'] &&
                                              wp.element.createElement('img', {
                                                  src: post._embedded.author[0].avatar_urls['48'],
                                                  alt: post._embedded.author[0].name,
                                              }),

                                          // Author Name and Prefix inside <span>
                                          wp.element.createElement(
                                              'span',
                                              null,
                                              wp.element.createElement(
                                                  'a',
                                                  {
                                                      href: post._embedded?.author?.[0]?.link || '#',
                                                      style: {
                                                          textDecoration: 'none',
                                                          color: metaTextColor || 'inherit'
                                                      },
                                                  },
                                                  `${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name || ''}`
                                              )
                                          )
                                      ),


                                      wp.element.createElement(
                                        'div', 
                                        { 
                                            className: 'meta-date',
                                            style: { display: 'flex', alignItems: 'center', gap: '5px' } 
                                        }, 
                                        showMetaIcon && showPostDateIcon &&
                                        wp.element.createElement('i', { 
                                            className: 'fa-regular fa-clock',
                                            style: { 
                                                ...(metaIconColor ? { color: metaIconColor } : {}),
                                                ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                            }
                                        }),
                                        ` ${new Date(post.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}`
                                      ),

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
            else if (gridLayoutStyle === 'style10' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-19 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${newGridColumns10}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        } 
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize10]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-19-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 40px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
                                    
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
                            wp.element.createElement('div', { className: 'rs-content', style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '25px 35px 30px 35px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 

                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        
                                        className: `rs-meta post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        }  
                                    },
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list', },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                                'li',
                                                {
                                                    className: 'meta-date',
                                                    style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    },
                                                },
                                                showMetaIcon && showPostDateIcon &&
                                                    wp.element.createElement('i', {
                                                        className: 'fas fa-calendar-alt',
                                                        style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        },
                                                    }),
                                                ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}`
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
                                        )   
                                    ),

                                //TITLE
                                // Title with Link
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                                             
                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `btn-wrapper align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-btn read-more ${buttonStyle10}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '10px 15px 10px 15px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                            gridTemplateColumns: `repeat(${newGridColumns11}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        }  
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize11]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-21-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '40px 0px 40px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 0px 0px' }), // your default fallback
                                    
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
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '20px 0px 0px 0px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 

                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                         
                                        className: `rs-meta post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                        }  
                                    },
                                    wp.element.createElement('ul', { 
                                        className: 'meta-data-list', },
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                                'li',
                                                {
                                                    className: 'meta-date',
                                                    style: { 
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                    },
                                                },
                                                showMetaIcon && showPostDateIcon &&
                                                    wp.element.createElement('i', {
                                                        className: 'fas fa-calendar-alt',
                                                        style:{ 
                                                        ...(metaIconColor ? { color: metaIconColor } : {}),
                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                        },
                                                    }),
                                                ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}`
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
                                     )   
                                    ),

                                //TITLE
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
                                                },
                                                titleCropBy === 'word'
                                                    ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                    : post.title.rendered.substring(0, titleLength)
                                            )
                                            : (titleCropBy === 'word'
                                                ? post.title.rendered.split(' ').slice(0, titleLength).join(' ')
                                                : post.title.rendered.substring(0, titleLength))
                                    ),
                                                         
                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `btn-wrapper align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-btn read-more ${buttonStyle11}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '0px 0px 0px 0px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                            gridTemplateColumns: `repeat(${newGridColumns12}, 1fr)`, 
                            ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        }  
                    },
                    posts.map((post) => {
                        
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize12]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-26-item align-${itemBoxAlignment} ${hoverAnimation}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { margin: '0px 0px 40px 0px' }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { padding: '0px 0px 40px 0px' }), // your default fallback
                                    
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
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { padding: '40px 35px 50px 35px' }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                }, 
                                

                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', {  
                                        className: `rs-meta post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 0px 0px' }),
                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                            ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                            
                                        }
                                    },
                                    
                                        [
                                            // Post Date
                                            showPostDate && wp.element.createElement(
                                              'div',
                                              {
                                                  className: 'meta-date',
                                                  style: {
                                                      color: metaTextColor,
                                                      // fontSize: `${metaFontSize}px`,
                                                  }
                                              },
                                              wp.element.createElement(
                                                  'span',
                                                  null,
                                                  ` ${new Date(post.date).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'short',
                                                      day: 'numeric',
                                                  })}`
                                              )
                                          ),

                                            
                                          showPostCategory && wp.element.createElement(
                                            'div',
                                            {
                                                className: 'meta-category',
                                                style: {
                                                    ...(metaTextColor ? { color: metaTextColor } : {}),
                                                    // ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                }
                                            },
                                              post._embedded?.['wp:term']?.[0]?.map((cat, index, arr) => [
                                                  wp.element.createElement(
                                                      'a',
                                                      {
                                                          key: cat.id,
                                                          href: cat.link,
                                                          style: { textDecoration: 'none', color: metaTextColor },
                                                      },
                                                      cat.name
                                                  ),
                                                  index < arr.length - 1 ? ', ' : '' // Add comma between categories
                                              ])
                                          )


                                        ]
                                       
                                    ),

                                //TITLE
                                // Title with Link
                                showPostTitle &&
                                    wp.element.createElement(
                                        titleTag,
                                        {
                                            className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                            style: {
                                                
                                                ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }), 
                                                
                                                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                                                ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                            },
                                            ...(postLinkType === 'nolink' ? titleTextHoverHandlers : {}), // attach hover if nolink
                                        },
                                        postLinkType === 'yeslink'
                                            ? wp.element.createElement(
                                                'a',
                                                {
                                                    href: post.link,
                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                    style: titleTextStyle,
                                                    ...titleTextHoverHandlers,
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
                                      wp.element.createElement('p', { 
                                          className: `fpg-excerpt align-${excerptAlignment}`,
                                          style: { 
                                              
                                              ...(excerptFontSize ? { fontSize: `${excerptFontSize}px` } : {}),
                                              ...(excerptFontWeight ? { fontWeight: excerptFontWeight } : {}),
                                              ...(excerptLineHeight ? { lineHeight: excerptLineHeight } : {}),
                                              ...(excerptLetterSpacing ? { letterSpacing: excerptLetterSpacing } : {}),
                                              ...(excerptColor ? { color: excerptColor } : {}),
                                              ...(excerptBgColor ? { backgroundColor: excerptBgColor } : {}), 
                                              ...(excerptOrder ? { order: excerptOrder } : {}),
                                              ...(attributes.excerptMargin ? { margin: getSpacingValue(attributes.excerptMargin) } : {}),
                                              ...(attributes.excerptPadding ? { padding: getSpacingValue(attributes.excerptPadding) } : {}),                                               
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
                                    ),

                                                              
                                showReadMoreButton && wp.element.createElement('div', { 
                                    className: `btn-wrapper align-${buttonAlignment} `,
                                    style: { 
                                        order: buttonOrder,
                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                    }, 
                                    wp.element.createElement('a', { 
                                        href: post.link, 
                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                        className: `rs-btn read-more ${buttonStyle12}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '10px 17px 11px 15px' }),
                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
                                            ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
                                            ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
                                        },
                                        onMouseEnter: (e) => {
                                            e.currentTarget.style.color = buttonHoverTextColor;
                                            e.currentTarget.style.background = buttonHoverBackgroundColor;
                                            e.currentTarget.style.borderColor = buttonHoverBorderColor;
                                        },
                                        onMouseLeave: (e) => {
                                            e.currentTarget.style.color = buttonTextColor;
                                            e.currentTarget.style.background = buttonBackgroundColor;
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
                                        label: __('Post Limit Per Page', 'fancy-post-grid'),
                                        value: postLimit,
                                        onChange: (limit) => setAttributes({ postLimit: limit }),
                                        min: 1,
                                        max: 100
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
                                    
                                    wp.element.createElement('h4', {}, __('Background Color', 'fancy-post-grid')),
                                    
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.sectionBgColor,
                                        onChangeComplete: (value) => setAttributes({ sectionBgColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ sectionBgColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),
                                    //Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.sectionPadding,
                                        onChange: (value) => setAttributes({ sectionPadding: value }),
                                    }),
                                    // Margin
                                    wp.element.createElement(wp.components.__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.sectionMargin,
                                        onChange: (value) => setAttributes({ sectionMargin: value }),
                                    })
                                ),

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
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ itemBackgroundColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),
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
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ itemBorderColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Box Shadow
                                    wp.element.createElement('p', {}, __('Box Shadow Color', 'fancy-post-grid')),
                                        
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.itemBoxShadowColor,
                                        onChangeComplete: (value) => setAttributes({ itemBoxShadowColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ itemBoxShadowColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

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
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ contentBgColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    wp.element.createElement('p', {}, __('Box Border Color', 'fancy-post-grid')),
                                                        
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.contentBorderColor,
                                        onChangeComplete: (value) => setAttributes({ contentBorderColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ contentBorderColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),
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
                                            { label: __('Left', 'fancy-post-grid'), value: 'start' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'end' }
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
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ postTitleColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),

                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.postTitleBgColor,
                                                            onChangeComplete: (value) => setAttributes({ postTitleBgColor: value.hex }),
                                                        }),
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ postTitleBgColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),
                                                        
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
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ postTitleHoverColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),

                                                        wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.postTitleHoverBgColor,
                                                            onChangeComplete: (value) => setAttributes({ postTitleHoverBgColor: value.hex }),
                                                        }),
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ postTitleHoverBgColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),
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
                                            { label: __('Left', 'fancy-post-grid'), value: 'start' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'end' }
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
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ excerptColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),

                                                        wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptBgColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptBgColor: value.hex }),
                                                        }),
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ excerptBgColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),
                                                        
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
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ excerptHoverColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),

                                                        wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                        
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptHoverBgColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptHoverBgColor: value.hex }),
                                                        }),
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ excerptHoverBgColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),

                                                        wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                                        wp.element.createElement(wp.components.ColorPicker, {
                                                            color: attributes.excerptHoverBorderColor,
                                                            onChangeComplete: (value) => setAttributes({ excerptHoverBorderColor: value.hex }),
                                                        }),
                                                        wp.element.createElement(Button, {
                                                            isSecondary: true,
                                                            onClick: () => setAttributes({ sectionBgColor: '' }),
                                                            style: { marginTop: '10px' },
                                                        }, __('Clear Color', 'fancy-post-grid')),
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
                                            { label: __('Left', 'fancy-post-grid'), value: 'start' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'end' },
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
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ metaTextColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Separator Color
                                    wp.element.createElement('p', {}, __('Separator Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.separatorColor,
                                        onChangeComplete: (value) => setAttributes({ separatorColor: value.hex }),
                                    }),               
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ separatorColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),
                                    // Icon Color
                                    wp.element.createElement('p', {}, __('Icon Color', 'fancy-post-grid')),

                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.metaIconColor,
                                        onChangeComplete: (value) => setAttributes({ metaIconColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ metaIconColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),
                                    
                                ),
                                // Button
                                wp.element.createElement(PanelBody, { title: __('Button', 'fancy-post-grid'), initialOpen: false },
                                    // Alignment
                                    wp.element.createElement(SelectControl, {
                                        label: __('Alignment', 'fancy-post-grid'),
                                        value: attributes.buttonAlignment,
                                        options: [
                                            { label: __('Left', 'fancy-post-grid'), value: 'start' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'end' },
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
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        values: attributes.buttonBorderWidth,
                                        onChange: (value) => setAttributes({ buttonBorderWidth: value }),
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
                                                wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ buttonTextColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonBackgroundColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonBackgroundColor: value.hex }),
                                                }),
                                                wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ buttonBackgroundColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),
                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonBorderColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonBorderColor: value.hex }),
                                                }),
                                                wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ buttonBorderColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            ] : [
                                                // Hover Button Text Color
                                                wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonHoverTextColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonHoverTextColor: value.hex }),
                                                }),
                                                wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ buttonHoverTextColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                                // Hover Button Background Color
                                                wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonHoverBackgroundColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonHoverBackgroundColor: value.hex }),
                                                }),
                                                wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ buttonHoverBackgroundColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                                // Button Background Color
                                                wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                                
                                                wp.element.createElement(wp.components.ColorPicker, {
                                                    color: attributes.buttonHoverBorderColor,
                                                    onChangeComplete: (value) => setAttributes({ buttonHoverBorderColor: value.hex }),
                                                }),
                                                wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ buttonHoverBorderColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

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

                                    // Border Width
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        values: attributes.paginationBorderWidthNew,
                                        onChange: (value) => setAttributes({ paginationBorderWidthNew: value }),
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

                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationTextColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                            // Normal Background Color
                                            wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ paginationBackgroundColor: value.hex }),
                                            }),

                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationBackgroundColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                            // Normal Border Color
                                            wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationBorderColor,
                                                onChangeComplete: (value) => setAttributes({ paginationBorderColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationBorderColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                        ] : tab.name === 'hover' ? [
                                            // Hover Text Color
                                            wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationHoverTextColor,
                                                onChangeComplete: (value) => setAttributes({ paginationHoverTextColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationHoverTextColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                            // Hover Background Color
                                            wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationHoverBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ paginationHoverBackgroundColor: value.hex }),
                                            }),

                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationHoverBackgroundColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                            // Hover Border Color
                                            wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationHoverBorderColor,
                                                onChangeComplete: (value) => setAttributes({ paginationHoverBorderColor: value.hex }),
                                            }),

                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationHoverBorderColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                        ] : [
                                            // Active Text Color
                                            wp.element.createElement('p', {}, __('Active Text Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationActiveTextColor,
                                                onChangeComplete: (value) => setAttributes({ paginationActiveTextColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationActiveTextColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                            // Active Background Color
                                            wp.element.createElement('p', {}, __('Active Background Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationActiveBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ paginationActiveBackgroundColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationActiveBackgroundColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),

                                            // Active Border Color
                                            wp.element.createElement('p', {}, __('Active Border Color', 'fancy-post-grid')),
                                            
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.paginationActiveBorderColor,
                                                onChangeComplete: (value) => setAttributes({ paginationActiveBorderColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                isSecondary: true,
                                                onClick: () => setAttributes({ paginationActiveBorderColor: '' }),
                                                style: { marginTop: '10px' },
                                            }, __('Clear Color', 'fancy-post-grid')),
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