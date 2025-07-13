(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    
    const { Fragment,useState, useEffect  } = wp.element;
    const { PanelBody, TabPanel,__experimentalBoxControl  , RangeControl,ColorPicker,Button, ToggleControl, TextControl, SelectControl  } = wp.components;

    registerBlockType('fancy-post-isotope/block', {
        title: __('Isotope Layout', 'fancy-post-grid'),
        icon: 'table-col-before',
        category: 'fancy-post-grid-category',

        attributes: {

            // Layout
            gridColumns: { type: 'number', default: '3' },
            isotopeLayoutStyle: { type: 'string', default: 'style1' },
            // Query Builder
            selectedCategory: { type: 'string', default: '' },
            selectedTag: { type: 'string', default: '' },
            orderBy: { type: 'string', default: 'title' },
            postLimit: { type: 'number', default: 6 },           
            
            // links
            postLinkTarget: { type: 'string', default: 'sameWindow' },
            thumbnailLink: { type: 'string', default: true },
            postLinkType: { type: 'string', default: 'yeslink' },
            fancyPostFilterText: { type: 'string', default: 'All' },
            fancyPostFilterAlignment: { type: 'string' },
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
            sectionPadding: { type: 'object',  },            
            //ITEM Box           
            itemMargin: { type: 'object' },
            itemPadding: { type: 'object' },
            itemBorderRadius: { type: 'object', },
            itemGap: { type: 'number', default: 30 },
            itemBoxAlignment: { type: 'string' },
            itemBorderType: { type: 'string', default: '' },
            itemBoxShadow: { type: 'object' },
            itemBoxShadowColor: { type: 'string' },  
            itemBackgroundColor: { type: 'string' },
            itemBorderColor: { type: 'string'},
            itemBorderWidth: { type: 'object',  },            
            //Content Box
            contentitemMarginNew: { type: 'object' },
            contentitemPaddingNew: { type: 'object' },
            contentBorderWidth: { type: 'object',  },
            contentitemRadius: { type: 'object',  },
            contentnormalBorderType: { type: 'string', default: '' },     
            contentBgColor: { type: 'string', default: '' },       
            contentHoverBgColor: { type: 'string', default: '' },       
            contentBorderColor: { type: 'string', default: '' },       
            //ThumbNail            
            thumbnailMargin: { type: 'object'  },
            thumbnailPadding: { type: 'object'  },
            thumbnailBorderRadius: { type: 'object' },
            
            //Post Title
            postTitleFontSize: { type: 'number' },
            postTitleLineHeight: { type: 'number', default: '' },
            postTitleLetterSpacing: { type: 'number', default: '' },
            postTitleFontWeight: { type: 'string'},
            postTitleAlignment: { type: 'string' },
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
            excerptMargin: { type: 'object' },
            excerptPadding: { type: 'object' },           
            excerptColor: { type: 'string', default: '' },
            excerptBgColor: { type: 'string', default: '' },
            excerptHoverColor: { type: 'string', default: '' },
            excerptHoverBgColor: { type: 'string', default: '' },
            //meta 
            metaFontSize: { type: 'number' },
            metaAlignment: { type: 'string' },
            metaMarginNew: { type: 'object' }, 
            metaPadding: { type: 'object' }, 
            metaTextColor: { type: 'string', default: '' },
            metaBgColor: { type: 'string', default: '' },
            separatorColor: { type: 'string', default: '' },
            metaIconColor: { type: 'string', default: '' },
            
            //Button
            buttonAlignment: { type: 'string' },
            buttonMarginNew: { type: 'object' },
            buttonPaddingNew: { type: 'object' },  
            buttonFontSize: { type: 'string'},
            buttonTextColor: { type: 'string', default: '' },
            buttonBackgroundColor: { type: 'string', default: '' },
            buttonBorderType: { type: 'string', default: '' },
            buttonBorderRadius: { type: 'string',  },
            buttonFontWeight: { type: 'string',  },          
            buttonBorderWidth: { type: 'string',  },
            buttonHoverTextColor: { type: 'string', default: '' },
            buttonHoverBackgroundColor: { type: 'string', default: '' },
            buttonBorderColor: { type: 'string', default: '' },
            buttonHoverBorderColor: { type: 'string', default: '' },          
            
            //filter
            filterWrapperMargin: { type: 'object' },
            filterWrapperPadding: { type: 'object' }, 
            filterMargin: { type: 'object' },
            filterPadding: { type: 'object' },             
            filterBorderStyle: { type: 'string', default: '' },
            filterBorderWidth: { type: 'object'  },
            filterBorderRadius: { type: 'object'  },            
            filterWrapperBorderRadius: { type: 'object'  },            
            filterGap: { type: 'number', default: '' },
            filterFontSize: { type: 'number', default: '' },
            filterTextColor: { type: 'string', default: '' },
            filterWrapperBackgroundColor: { type: 'string', default: '' },
            filterBackgroundColor: { type: 'string', default: '' },
            filterBorderColor: { type: 'string', default: '' },
            filterHoverTextColor: { type: 'string', default: '' },
            filterHoverBackgroundColor: { type: 'string', default: '' },
            filterHoverBorderColor: { type: 'string', default: '' },
            filterActiveTextColor: { type: 'string', default: '' },
            filterActiveBackgroundColor: { type: 'string', default: '' },
            filterActiveBorderColor: { type: 'string', default: '' },
            postType: { type: 'string', default: 'post' },
        },

        edit: function ({ attributes, setAttributes }) {
            const { 
                gridColumns,isotopeLayoutStyle
                ,selectedCategory, selectedTag,orderBy, postLimit,
                postLinkTarget,thumbnailLink,postLinkType,fancyPostFilterText,fancyPostFilterAlignment,

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

                contentitemMarginNew,contentitemPaddingNew,contentnormalBorderType,contentitemRadius,contentBorderWidth,contentBgColor,contentHoverBgColor,contentBorderColor,

                thumbnailMargin,thumbnailPadding,thumbnailBorderRadius,

                postTitleFontSize,postTitleLineHeight,postTitleLetterSpacing,postTitleFontWeight,
                postTitleAlignment,postTitleMargin,postTitlePadding,postTitleColor,postTitleBgColor
                ,postTitleHoverColor,postTitleHoverBgColor,
                
                excerptFontSize,excerptLineHeight,excerptLetterSpacing,excerptFontWeight,excerptAlignment,excerptMargin,
                excerptPadding,excerptColor,excerptBgColor,excerptHoverColor,excerptHoverBgColor,

                metaAlignment,metaFontSize,metaMarginNew,metaPadding,metaTextColor,metaBgColor,separatorColor,metaIconColor,

                buttonAlignment,buttonMarginNew,buttonPaddingNew,buttonTextColor,buttonBackgroundColor,buttonBorderType,buttonFontWeight,
                buttonBorderWidth,buttonBorderRadius,buttonFontSize,buttonHoverTextColor,buttonHoverBackgroundColor,
                buttonBorderColor,buttonHoverBorderColor,

                filterWrapperMargin,filterWrapperPadding,filterMargin,filterPadding,filterGap,filterFontSize,filterTextColor,filterWrapperBackgroundColor,filterWrapperBorderRadius,
                filterBackgroundColor,filterBorderColor,filterHoverTextColor,filterHoverBackgroundColor,
                filterHoverBorderColor,filterActiveTextColor,filterActiveBackgroundColor,filterBorderStyle,filterBorderWidth,filterBorderRadius,
                filterActiveBorderColor,postType  } = attributes;

            const thumbnailSize1 = (isotopeLayoutStyle === 'style1' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize; 
            const thumbnailSize2 = (isotopeLayoutStyle === 'style2' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize;  
            const thumbnailSize3 = (isotopeLayoutStyle === 'style3' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize;
            const thumbnailSize4 = (isotopeLayoutStyle === 'style4' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize; 
            const thumbnailSize5 = (isotopeLayoutStyle === 'style5' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize;  
            const thumbnailSize6 = (isotopeLayoutStyle === 'style6' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize; 
            const thumbnailSize7 = (isotopeLayoutStyle === 'style7' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize;

            // Button Style
            const buttonStyle1 = (isotopeLayoutStyle === 'style1' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle; 
            const buttonStyle2 = (isotopeLayoutStyle === 'style2' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle;  
            const buttonStyle3 = (isotopeLayoutStyle === 'style3' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle;
            const buttonStyle5 = (isotopeLayoutStyle === 'style5' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle; 
            const buttonStyle7 = (isotopeLayoutStyle === 'style7' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle;

            // Filter Alignment 
            const fancyPostFilterAlignment1 = (isotopeLayoutStyle === 'style1' && attributes.fancyPostFilterAlignment == null)
              ? 'center' : attributes.fancyPostFilterAlignment; 
            const fancyPostFilterAlignment2 = (isotopeLayoutStyle === 'style2' && attributes.fancyPostFilterAlignment == null)
              ? 'flex-start' : attributes.fancyPostFilterAlignment;  
            const fancyPostFilterAlignment3 = (isotopeLayoutStyle === 'style3' && attributes.fancyPostFilterAlignment == null)
              ? 'center' : attributes.fancyPostFilterAlignment;
            const fancyPostFilterAlignment4 = (isotopeLayoutStyle === 'style4' && attributes.fancyPostFilterAlignment == null)
              ? 'center' : attributes.fancyPostFilterAlignment; 
            const fancyPostFilterAlignment5 = (isotopeLayoutStyle === 'style5' && attributes.fancyPostFilterAlignment == null)
              ? 'center' : attributes.fancyPostFilterAlignment;  
            const fancyPostFilterAlignment6 = (isotopeLayoutStyle === 'style6' && attributes.fancyPostFilterAlignment == null)
              ? 'center' : attributes.fancyPostFilterAlignment; 
            const fancyPostFilterAlignment7 = (isotopeLayoutStyle === 'style7' && attributes.fancyPostFilterAlignment == null)
              ? 'flex-start' : attributes.fancyPostFilterAlignment;  

            // itemBoxAlignment
            const itemBoxAlignment1 = (isotopeLayoutStyle === 'style1' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment; 
            const itemBoxAlignment2 = (isotopeLayoutStyle === 'style2' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;  
            const itemBoxAlignment3 = (isotopeLayoutStyle === 'style3' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;
            const itemBoxAlignment4 = (isotopeLayoutStyle === 'style4' && attributes.itemBoxAlignment == null)
              ? 'center' : attributes.itemBoxAlignment; 
            const itemBoxAlignment5 = (isotopeLayoutStyle === 'style5' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;  
            const itemBoxAlignment6 = (isotopeLayoutStyle === 'style6' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment; 
            const itemBoxAlignment7 = (isotopeLayoutStyle === 'style7' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;   

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
            
            const categoryFilter1 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-1-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment1,
                                
                                
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 

                                            ...(attributes.filterBorderWidth
                                              ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                              : {}), 
                                            ...(attributes.filterBorderRadius
                                              ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                              : {}),

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterPadding
                                                  ? { padding: getSpacingValue(attributes.filterPadding) }
                                                  : { }), 
                                                ...(attributes.filterMargin
                                                  ? { margin: getSpacingValue(attributes.filterMargin) }
                                                  : { }),  
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : { }), 
                                                ...(attributes.filterBorderRadius
                                                  ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                  : { }), 

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            const categoryFilter2 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-2-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment2,
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : {}), 
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }),
                                            ...(attributes.filterBorderWidth
                                              ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                              : {}), 
                                            ...(attributes.filterBorderRadius
                                              ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                              : {}), 

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterMargin
                                                  ? { margin: getSpacingValue(attributes.filterMargin) }
                                                  : {}), 
                                                ...(attributes.filterPadding
                                                  ? { padding: getSpacingValue(attributes.filterPadding) }
                                                  : { }),
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {}), 
                                                ...(attributes.filterBorderRadius
                                                  ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                  : {}),

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            const categoryFilter3 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-3-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment3,
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                    
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : {}), 
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }),
                                            ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {}), 
                                            ...(attributes.filterBorderRadius
                                              ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                              : {}),

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterPadding
                                                  ? { padding: getSpacingValue(attributes.filterPadding) }
                                                  : { }), 
                                                ...(attributes.filterMargin
                                                  ? { margin: getSpacingValue(attributes.filterMargin) }
                                                  : { }), 
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {}), 
                                                ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            const categoryFilter4 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-4-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment4,
                                
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                    
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                            ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {  }), 
                                            ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : { }), 
                                                ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            const categoryFilter5 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-5-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment5,
                                
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                    
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                            ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {}), 
                                            ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : {}),

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {  }), 
                                                ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            const categoryFilter6 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-6-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment6,
                                
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                    
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                            ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {}), 
                                            ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : {}), 
                                                ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : {}),

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            const categoryFilter7 = wp.element.createElement(
                'div',
                { className: 'row' },
                wp.element.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'rs-blog-layout-7-filter',
                            style: {
                                
                                justifyContent: fancyPostFilterAlignment7,
                                
                            },
                        },
                        wp.element.createElement(
                            'div',
                            { className: 'filter-button-group',
                                style: {
                                    display: 'flex',
                                    gap: attributes.filterGap,
                                    backgroundColor: attributes.filterWrapperBackgroundColor,
                                    ...(attributes.filterWrapperPadding
                                        ? { padding: getSpacingValue(attributes.filterWrapperPadding) }
                                        : { }), 
                                    ...(attributes.filterWrapperMargin
                                        ? { margin: getSpacingValue(attributes.filterWrapperMargin) }
                                        : { }), 
                                    ...(attributes.filterWrapperBorderRadius
                                        ? { borderRadius: getSpacingValue(attributes.filterWrapperBorderRadius) }
                                        : {}),
                                }, 
                            },
                            [
                                wp.element.createElement(
                                    'button',
                                    {
                                        className: 'active',
                                        'data-filter': '*',
                                        key: 'all',
                                        style: {
                                            fontSize: attributes.filterFontSize,
                                            color: attributes.filterTextColor,
                                            backgroundColor: attributes.filterBackgroundColor,
                                            borderColor: attributes.filterBorderColor,
                                            borderStyle: attributes.filterBorderStyle,
                                            ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                            ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : { }), 
                                            ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                        },
                                        onMouseOver: (e) => {
                                            e.target.style.color = attributes.filterHoverTextColor;
                                            e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                            e.target.style.borderColor = attributes.filterHoverBorderColor;
                                        },
                                        onMouseOut: (e) => {
                                            e.target.style.color = attributes.filterTextColor;
                                            e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                            e.target.style.borderColor = attributes.filterBorderColor;
                                        },
                                        onClick: (e) => {
                                            const buttons = document.querySelectorAll('.filter-button-group button');
                                            buttons.forEach(btn => btn.classList.remove('active'));
                                            e.target.classList.add('active');

                                            e.target.style.color = attributes.filterActiveTextColor;
                                            e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                            e.target.style.borderColor = attributes.filterActiveBorderColor;
                                        },
                                    },
                                    attributes.fancyPostFilterText
                                ),
                                ...(categories || []).map((category) =>
                                    wp.element.createElement(
                                        'button',
                                        {
                                            'data-filter': `.${category.slug}`,
                                            key: category.value,
                                            style: {
                                                fontSize: attributes.filterFontSize,
                                                color: attributes.filterTextColor,
                                                backgroundColor: attributes.filterBackgroundColor,
                                                borderColor: attributes.filterBorderColor,
                                                borderStyle: attributes.filterBorderStyle,
                                                ...(attributes.filterPadding
                                              ? { padding: getSpacingValue(attributes.filterPadding) }
                                              : { }), 
                                            ...(attributes.filterMargin
                                              ? { margin: getSpacingValue(attributes.filterMargin) }
                                              : { }), 
                                                ...(attributes.filterBorderWidth
                                                  ? { borderWidth: getSpacingValue(attributes.filterBorderWidth) }
                                                  : { }), 
                                                ...(attributes.filterBorderRadius
                                                    ? { borderRadius: getSpacingValue(attributes.filterBorderRadius) }
                                                    : { }),

                                            },
                                            onMouseOver: (e) => {
                                                e.target.style.color = attributes.filterHoverTextColor;
                                                e.target.style.backgroundColor = attributes.filterHoverBackgroundColor;
                                                e.target.style.borderColor = attributes.filterHoverBorderColor;
                                            },
                                            onMouseOut: (e) => {
                                                if (!e.target.classList.contains('active')) {
                                                    e.target.style.color = attributes.filterTextColor;
                                                    e.target.style.backgroundColor = attributes.filterBackgroundColor;
                                                    e.target.style.borderColor = attributes.filterBorderColor;
                                                }
                                            },
                                            onClick: (e) => {
                                                const buttons = document.querySelectorAll('.filter-button-group button');
                                                buttons.forEach(btn => {
                                                    btn.classList.remove('active');
                                                    btn.style.color = attributes.filterTextColor;
                                                    btn.style.backgroundColor = attributes.filterBackgroundColor;
                                                    btn.style.borderColor = attributes.filterBorderColor;
                                                });
                                                e.target.classList.add('active');
                                                e.target.style.color = attributes.filterActiveTextColor;
                                                e.target.style.backgroundColor = attributes.filterActiveBackgroundColor;
                                                e.target.style.borderColor = attributes.filterActiveBorderColor;

                                                setSelectedCategory(category.value);
                                            },
                                        },
                                        category.label
                                    )
                                )
                            ]
                        )
                    )
                )
            );
            
            let content;

            if (isotopeLayoutStyle === 'style1' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-4 rs-blog-layout-10 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter1, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                                        ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                        ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                        ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                        ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                        
                                    } 
                                },
                                posts.map((post) => {
                                    
                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize1]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                    
                                    return wp.element.createElement(
                                        'div',
                                        {   key: post.id, 
                                            className: `fancy-post-item rs-blog__item align-${itemBoxAlignment1} ${hoverAnimation} ${postLinkType}`,
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
                                                        boxShadow: `${getSpacingValue(attributes.itemBoxShadow) } ${attributes.itemBoxShadowColor }`
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
                                                  : {}), // your default fallback
                                                ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
                                                ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                                ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                                ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                                },
                                            }, 
                                            
                                            //Meta                                                           
                                            wp.element.createElement('div', {
                                                className: `rs-category post-meta align-${metaAlignment} `, 
                                                style: { 
                                                    
                                                    ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                                }
                                            },
                                                showPostCategory && post._embedded?.['wp:term']?.[0]?.length > 0 &&
                                                (() => {
                                                    const firstCategory = post._embedded['wp:term'][0][0];
                                                    return wp.element.createElement('a', {
                                                        href: firstCategory.link,
                                                        style: {
                                                          ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { }),
                                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                                            ...(metaBgColor ? { backgroundColor: metaBgColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {}),
                                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { }), 
                                                            textDecoration: 'none'
                                                        }
                                                    },
                                                        firstCategory.name
                                                    );
                                                })()
                                            ),

                                            //TITLE
                                            // Title with Link
                                            showPostTitle &&
                                              wp.element.createElement(
                                                  titleTag,
                                                  {
                                                      className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                                      style: {
                                                          
                                                          ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { }), 
                                                          ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: {  }), 
                                                          
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
                                                wp.element.createElement('p', { 
                                                    className: `desc align-${excerptAlignment}`,
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

                                  
                                            wp.element.createElement('div', { 
                                                    className: 'rs-blog-footer',style: { 
                                                        order: buttonOrder}, },

                                                showPostAuthor &&
                                                  wp.element.createElement(
                                                    'div',
                                                    { className: 'user' },
                                                    wp.element.createElement(
                                                      'a',
                                                      {
                                                        href: post._embedded?.author?.[0]?.link || '#',
                                                        style: { textDecoration: 'none' },
                                                      },
                                                      wp.element.createElement(
                                                        'div',
                                                        {
                                                          className: 'author-thumb',
                                                          
                                                        },
                                                        showMetaIcon &&
                                                          showPostAuthorIcon &&
                                                          post._embedded?.author?.[0]?.avatar_urls?.['48'] &&
                                                          wp.element.createElement('img', {
                                                            src: post._embedded.author[0].avatar_urls['48'],
                                                            srcSet: post._embedded.author[0].avatar_urls['96'] + ' 2x',
                                                            alt: post._embedded.author[0].name || '',
                                                            className: 'avatar avatar-32 photo',
                                                            width: '32',
                                                            height: '32',
                                                          })
                                                      ),
                                                      wp.element.createElement(
                                                        'span',{
                                                          
                                                          style: {
                                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {}),
                                                          },
                                                        },
                                                        null,
                                                        ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : 'by '}${post._embedded?.author?.[0]?.name || ''}`
                                                      )
                                                    )
                                                  ),

                                                showReadMoreButton && wp.element.createElement('div', { 
                                                    className: `btn-wrapper align-${buttonAlignment} `,
                                                    style: { 
                                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                                    }, 
                                                    wp.element.createElement('a', { 
                                                        href: post.link, 
                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                        className: `btn-link read-more ${buttonStyle1}`,  // Dynamic class based on buttonStyle
                                                        style: { 
                                                            
                                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: {}),
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
                                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                        readMoreLabel, 
                                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
                                                    )
                                                )
                                            )

                                        )    
                                                            

                                    );
                                }),
                                
                            )
                        )
                        )
                    )
                );
                
            }
            else if (isotopeLayoutStyle === 'style2' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-5 rs-blog-layout-10 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter2, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                                        ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                        ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                        ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                        ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                    } 
                                },
                                posts.map((post) => {
                                    
                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize2]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                    
                                    return wp.element.createElement(
                                        'div',
                                        {   
                                            className: `fancy-post-item rs-blog__single align-${itemBoxAlignment2} ${hoverAnimation} ${postLinkType}`,
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
                                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) } ${attributes.itemBoxShadowColor }`
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
                                                ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
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
                                                            
                                                        } // Apply order to the div container
                                                }, 
                                                    wp.element.createElement('p', { 
                                                        style: { 
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
                                                    className: `rs-link read-more ${buttonStyle2}`,  // Dynamic class based on buttonStyle
                                                    style: { 
                                                        
                                                        ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                                        ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                                        ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                                        ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                                        ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                                        ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                                        ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { }),
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
                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                    readMoreLabel, 
                                                    iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
                                                )
                                            )

                                        )    
                                                            

                                    );
                                }),
                                
                            )
                        )
                        )
                    )
                );             
                
            }
            else if (isotopeLayoutStyle === 'style3' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-28 rs-blog-layout-10 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter3, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                                        ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                        ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                        ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                        ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                        
                                    } 
                                },
                                posts.map((post) => {
                                    
                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize3]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                    
                                    return wp.element.createElement(
                                        'div',
                                        {   
                                            key: post.id, 
                                            className: `fancy-post-item rs-blog-layout-28-item align-${itemBoxAlignment3} ${hoverAnimation} ${postLinkType}`,
                                            style: {
                                                ...(attributes.itemMargin
                                                  ? { margin: getSpacingValue(attributes.itemMargin) }
                                                  : {}), // your default fallback
                                                ...(attributes.itemPadding
                                                  ? { padding: getSpacingValue(attributes.itemPadding) }
                                                  : {}), // your default fallback
                                                ...(attributes.itemBorderRadius ? { borderRadius: getSpacingValue(attributes.itemBorderRadius) } : {}),
                                                ...(attributes.itemBorderWidth ? { borderWidth: getSpacingValue(attributes.itemBorderWidth) } : {}),
                                                ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : {}),
                                                ...(attributes.itemBorderType ? { borderStyle: attributes.itemBorderType } : {}),
                                                ...(attributes.itemBorderColor ? { borderColor: attributes.itemBorderColor } : {}),
                                                ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) } ${attributes.itemBoxShadowColor}`
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
                                                          ...(metaBgColor ? { backgroundColor: metaBgColor } : {}),
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
                                        wp.element.createElement('div', { className: 'rs-content',style: {
                                                ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                                ...(attributes.contentitemPaddingNew
                                              ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                              : {}), // your default fallback
                                                ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
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
                                                          
                                                          ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: {  }), 
                                                          ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: {  }), 
                                                          
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
                                
                                            //EXCERPT
                                            showPostExcerpt &&
                                                wp.element.createElement('div', { 
                                                    className: `fpg-excerpt align-${excerptAlignment}`,
                                                    style: { 
                                                            ...(excerptOrder ? { order: excerptOrder } : {}),
                                                            
                                                        } // Apply order to the div container
                                                }, 
                                                    wp.element.createElement('p', { 
                                                        style: { 
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
                                                        ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { }),
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
                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                    readMoreLabel, 
                                                    iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
                                                )
                                            )
                                        ) ,    
                                                            

                                    );
                                }),
                                
                            )
                        )
                        )
                    )
                );
            }
            else if (isotopeLayoutStyle === 'style4' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-30 rs-blog-layout-10 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter4, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                                        ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                        ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                        ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                        ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                    } 
                                },
                                posts.map((post) => {
                                    
                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize4]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                    
                                    return wp.element.createElement(
                                        'div',
                                        {   
                                            key: post.id, 
                                            className: `fancy-post-item rs-blog-layout-30-item align-${itemBoxAlignment4} ${hoverAnimation} ${postLinkType}`,
                                            style: {
                                                
                                                ...(attributes.itemMargin
                                                  ? { margin: getSpacingValue(attributes.itemMargin) }
                                                  : {}), // your default fallback
                                                ...(attributes.itemPadding
                                                  ? { padding: getSpacingValue(attributes.itemPadding) }
                                                  : {}), // your default fallback
                                                ...(attributes.itemBorderRadius ? { borderRadius: getSpacingValue(attributes.itemBorderRadius) } : {}),
                                                ...(attributes.itemBorderWidth ? { borderWidth: getSpacingValue(attributes.itemBorderWidth) } : {}),
                                                ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : {}),
                                                ...(attributes.itemBorderType ? { borderStyle: attributes.itemBorderType } : {}),
                                                ...(attributes.itemBorderColor ? { borderColor: attributes.itemBorderColor } : {}),
                                                ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) } ${attributes.itemBoxShadowColor }`
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
                                                           
                                                          fontSize: `${metaFontSize}px`,

                                                      } },
                                                      wp.element.createElement(
                                                          'span', 
                                                          { style: { display: 'flex', alignItems: 'center', gap: '5px',color: metaTextColor,fontSize: `${metaFontSize}px`,
                                                            ...(metaBgColor ? { backgroundColor: metaBgColor } : {}), } }, 
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
                                        wp.element.createElement('div', { className: 'rs-content',style: {
                                                ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                                ...(attributes.contentitemPaddingNew
                                                  ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                  : { }), // your default fallback
                                                ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
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
                                                          
                                                          ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { }), 
                                                          ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { }), 
                                                          
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
                                
                                            // Meta
                                            showMetaData && 
                                                wp.element.createElement('div', { 
                                                    className: `rs-meta align-${metaAlignment}`, 
                                                    style: { 
                                                        margin: getSpacingValue(attributes.metaMarginNew),
                                                        padding: getSpacingValue(attributes.metaPadding),
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
                                                    className: `fpg-excerpt align-${excerptAlignment}`, 
                                                    style: { 
                                                            ...(excerptOrder ? { order: excerptOrder } : {}),
                                                            
                                                        } // Apply order to the div container
                                                }, 
                                                    wp.element.createElement('p', { 
                                                        style: { 
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
                                                    )
                                                ),

                                            
                                        ) ,    
                                                            

                                    );
                                }),
                                
                            )
                        )
                        )
                    )
                );
                
            }
            else if (isotopeLayoutStyle === 'style5' && posts && posts.length) {
                content = wp.element.createElement(
                          wp.element.Fragment,
                          null,
                          wp.element.createElement('style', null, `
                              .pre-blog-item.style_12:after {
                                  
                                  border-color: ${attributes.itemBorderColor || '#007aff'};
                                  border-style: ${attributes.itemBorderType || 'solid'} ;
                                  border-width: ${getSpacingValue(attributes.itemBorderWidth) || '1px 1px 1px 1px'} ;
                                  border-radius: ${getSpacingValue(attributes.itemBorderRadius) || '5px 5px 5px 5px'} ; 
                              }
                              .pre-blog-item.style_12 .blog-inner-wrap .pre-image-wrap .pre-blog-meta::after {
                                  border-style:  solid ;
                                  border-width:  1px 1px 1px 1px ;
                                  border-color: ${attributes.metaBgColor || '#fff'};
                              }
                              .pre-blog-item.style_12:hover .blog-inner-wrap .pre-blog-content {
                                  background: ${attributes.contentBgColor || '#007aff'};
                              },
                          `),
                wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-12 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter5, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'row rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
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
                                            className: `fancy-post-item pre-blog-item style_12 pre-blog-meta-style2 default `,
                                            style: { 
                                                ...(attributes.itemMargin
                                                  ? { margin: getSpacingValue(attributes.itemMargin) }
                                                  : { }), // your default fallback
                                                ...(attributes.itemPadding
                                                  ? { padding: getSpacingValue(attributes.itemPadding) }
                                                  : { }), // your default fallback     
                                                ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : {}),
                                                ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                                    boxShadow: `${getSpacingValue(attributes.itemBoxShadow) } ${attributes.itemBoxShadowColor }`
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
                                                      backgroundColor: metaBgColor, 
                                                  } },
                                                  
                                                  wp.element.createElement('span', { className: 'pre-date', style: { 
                                                      color: metaTextColor, 
                                                      ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                  } }, 
                                                      new Date(post.date).toLocaleDateString(undefined, { day: 'numeric' })
                                                  ),
                                                  '',
                                                  wp.element.createElement('span', { className: 'pre-month', style: { 
                                                      color: metaTextColor, 
                                                      ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                  } }, 
                                                      new Date(post.date).toLocaleDateString(undefined, { month: 'long' })
                                                  ),
                                                  ' ',
                                              ),
                                          ),
                           
                                        // Wrap the entire content in a new div (e.g., rs-content)
                                        wp.element.createElement('div', { className: `pre-blog-content align-${itemBoxAlignment5} ${postLinkType}`,style: {
                                                ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                                ...(attributes.contentitemPaddingNew
                                                  ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                  : { }), // your default fallback
                                                ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
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
                                                        ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: {  }), 
                                                        ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { }),
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
                                                            
                                                            ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: {}), 
                                                            ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { }), 
                                                            
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
                                                        ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { }),
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
                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                    readMoreLabel, 
                                                    iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
                                                )
                                            )                                
                                        ) ,
                                        ),
                                        
                                    );
                                }),
                                
                            )
                        )
                        )
                    )
                ));
                
            }
            else if (isotopeLayoutStyle === 'style6' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-15 fancy-post-grid',
                      style: {                 
                            ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                            ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                            ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                        }  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter6, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'row rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
                                        ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                    } 
                                },
                    posts.map((post) => {
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize6]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                        
                        return wp.element.createElement('div', { 
                            key: post.id, 
                                className: `fancy-post-item rs-blog-layout-15-item align-${itemBoxAlignment6} ${hoverAnimation} ${postLinkType}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { }), // your default fallback
                                    ...(attributes.itemBorderRadius ? { borderRadius: getSpacingValue(attributes.itemBorderRadius) } : {}),
                                    ...(attributes.itemBorderWidth ? { borderWidth: getSpacingValue(attributes.itemBorderWidth) } : {}),
                                    ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : {}),
                                    ...(attributes.itemBorderType ? { borderStyle: attributes.itemBorderType } : {}),
                                    ...(attributes.itemBorderColor ? { borderColor: attributes.itemBorderColor } : {}),
                                    ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                        boxShadow: `${getSpacingValue(attributes.itemBoxShadow) } ${attributes.itemBoxShadowColor}`
                                    } : {})
                                },
                            },
                            
                            // Wrap the entire content in a new div (e.g., rs-content)
                            wp.element.createElement('div', { className: 'rs-content',style: {
                                    ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                    ...(attributes.contentitemPaddingNew
                                      ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                      : { }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
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
                                
                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', { 
                                        className: `rs-meta post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { }),
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
                                            backgroundColor: metaBgColor, 
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
                   )))), 
                );
            }
            else if (isotopeLayoutStyle === 'style7' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-26 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        
                        wp.element.createElement(
                            wp.element.Fragment,
                            null,
                            categoryFilter7, // ← Inserted here before the grid
                            wp.element.createElement(
                            'div',
                            { className: 'row rs-grid' },
                            wp.element.createElement(
                                'div',
                                { 
                                    className: 'fancy-post-grid rs-grid-item', 
                                    style: { 
                                        display: 'grid', 
                                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
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
                                className: `fancy-post-item rs-blog-layout-26-item align-${itemBoxAlignment7} ${hoverAnimation} ${postLinkType}`,
                                style: {
                                    ...(attributes.itemMargin
                                      ? { margin: getSpacingValue(attributes.itemMargin) }
                                      : { }), // your default fallback
                                    ...(attributes.itemPadding
                                      ? { padding: getSpacingValue(attributes.itemPadding) }
                                      : { }), // your default fallback
                                    
                                    ...(attributes.itemBorderRadius ? { borderRadius: getSpacingValue(attributes.itemBorderRadius) } : {}),
                                    ...(attributes.itemBorderWidth ? { borderWidth: getSpacingValue(attributes.itemBorderWidth) } : {}),
                                    ...(attributes.itemBackgroundColor ? { backgroundColor: attributes.itemBackgroundColor } : {}),
                                    ...(attributes.itemBorderType ? { borderStyle: attributes.itemBorderType } : {}),
                                    ...(attributes.itemBorderColor ? { borderColor: attributes.itemBorderColor } : {}),
                                    ...((getSpacingValue(attributes.itemBoxShadow) || attributes.itemBoxShadowColor) ? {
                                        boxShadow: `${getSpacingValue(attributes.itemBoxShadow)} ${attributes.itemBoxShadowColor }`
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
                                      : { }), // your default fallback
                                    ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                    ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
                                    ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                    ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                    ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                    },
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.backgroundColor = contentHoverBgColor;
                                    },
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.backgroundColor = contentBgColor;
                                        
                                    },
                              }, 
                                
                                // Meta
                                showMetaData && 
                                    wp.element.createElement('div', {  
                                        className: `rs-meta post-meta align-${metaAlignment} `, 
                                        style: { 
                                            ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { }), 
                                            ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: {  }),
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
                                                  
                                              },
                                              wp.element.createElement(
                                                  'span',
                                                  {
                                                      className: 'date',
                                                      style: {
                                                          color: metaTextColor,
                                                          fontSize: `${metaFontSize}px`,
                                                      }
                                                  },
                                                  
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
                                            },
                                              post._embedded?.['wp:term']?.[0]?.map((cat, index, arr) => [
                                                  wp.element.createElement(
                                                      'a',
                                                      {
                                                          key: cat.id,
                                                          href: cat.link,
                                                          style: { textDecoration: 'none',
                                                          ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {}), 
                                                          color: metaTextColor },
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
                                        className: `rs-btn read-more ${buttonStyle7}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            
                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { }),
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
                                        iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                        readMoreLabel, 
                                        iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
                                    )
                                )
                            ),
                            
                        );
                    }),
                    )))),
                );          
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
                                        value: isotopeLayoutStyle,
                                        options: [
                                            { label: 'Style 1', value: 'style1' },
                                            { label: 'Style 2', value: 'style2' },
                                            { label: 'Style 3', value: 'style3' },
                                            { label: 'Style 4', value: 'style4' },
                                            { label: 'Style 5', value: 'style5' },
                                            { label: 'Style 6', value: 'style6' },
                                            { label: 'Style 7', value: 'style7' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ isotopeLayoutStyle: value })
                                    }),
                                    wp.element.createElement(RangeControl, {
                                        label: __('Isotope Columns', 'fancy-post-grid'),
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
                                wp.element.createElement(PanelBody, { title: __('Filter', 'fancy-post-grid'), initialOpen: false },

                                    wp.element.createElement(TextControl, {
                                        label: __('Filter Text', 'fancy-post-grid'),
                                        value: fancyPostFilterText,
                                        onChange: (text) => setAttributes({ fancyPostFilterText: text })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Alignment ', 'fancy-post-grid'),
                                        value: fancyPostFilterAlignment,
                                        options: [
                                            { label: 'Left', value: 'flex-start' },
                                            { label: 'Center', value: 'center' },
                                            { label: 'Right', value: 'flex-end' },
                                        ],
                                        onChange: (value) => setAttributes({ fancyPostFilterAlignment: value })
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
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ sectionBgColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

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
                                        max: 200
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
                                    // Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Radius (e.g., 5px)', 'fancy-post-grid'),
                                        values: attributes.contentitemRadius,
                                        onChange: (value) => setAttributes({ contentitemRadius: value }),
                                    }),
                                    // Border Width
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Border Width', 'fancy-post-grid'),
                                        values: attributes.contentBorderWidth,
                                        onChange: (value) => setAttributes({ contentBorderWidth: value }),
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
                                    
                                    wp.element.createElement('p', {}, __('Hover Box Background Color', 'fancy-post-grid')),
                                                        
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.contentHoverBgColor,
                                        onChangeComplete: (value) => setAttributes({ contentHoverBgColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ contentHoverBgColor: '' }),
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

                                    // Meta Text Color
                                    wp.element.createElement('p', {}, __('Meta Background Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.metaBgColor,
                                        onChangeComplete: (value) => setAttributes({ metaBgColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ metaBgColor: '' }),
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
                                
                                // Filter Options
                                wp.element.createElement(PanelBody, { title: __('Filter', 'fancy-post-grid'), initialOpen: false },

                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Filter Wrapper Margin', 'fancy-post-grid'),
                                        values: attributes.filterWrapperMargin,
                                        onChange: (value) => setAttributes({ filterWrapperMargin: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Filter Wrapper Padding', 'fancy-post-grid'),
                                        values: attributes.filterWrapperPadding,
                                        onChange: (value) => setAttributes({ filterWrapperPadding: value }),
                                    }),

                                    // Filter Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Filter Wrapper Border Radius', 'fancy-post-grid'),
                                        values: attributes.filterWrapperBorderRadius,
                                        onChange: (value) => setAttributes({ filterWrapperBorderRadius: value }),
                                    }),

                                    wp.element.createElement('p', {}, __('Filter Wrapper Background Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.filterWrapperBackgroundColor,
                                        onChangeComplete: (value) => setAttributes({ filterWrapperBackgroundColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ filterWrapperBackgroundColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Margin
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Margin', 'fancy-post-grid'),
                                        values: attributes.filterMargin,
                                        onChange: (value) => setAttributes({ filterMargin: value }),
                                    }),

                                    // Padding
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Padding', 'fancy-post-grid'),
                                        values: attributes.filterPadding,
                                        onChange: (value) => setAttributes({ filterPadding: value }),
                                    }),
                       
                                    // Gap
                                    wp.element.createElement(RangeControl, {
                                        label: __('Gap', 'fancy-post-grid'),
                                        value: attributes.filterGap,
                                        onChange: (value) => setAttributes({ filterGap: value }),
                                        min: 0,
                                        max: 100
                                    }),

                                    // Font Size
                                    wp.element.createElement(RangeControl, {
                                        label: __('Font Size', 'fancy-post-grid'),
                                        value: attributes.filterFontSize,
                                        onChange: (value) => setAttributes({ filterFontSize: value }),
                                        min: 10,
                                        max: 50
                                    }),
                                    // Filter Border Style
                                    wp.element.createElement(SelectControl, {
                                        label: __('Filter Border Style', 'fancy-post-grid'),
                                        value: attributes.filterBorderStyle,
                                        options: [
                                            { label: __('None', 'fancy-post-grid'), value: 'none' },
                                            { label: __('Solid', 'fancy-post-grid'), value: 'solid' },
                                            { label: __('Dashed', 'fancy-post-grid'), value: 'dashed' },
                                            { label: __('Dotted', 'fancy-post-grid'), value: 'dotted' },
                                            { label: __('Double', 'fancy-post-grid'), value: 'double' },
                                            { label: __('Groove', 'fancy-post-grid'), value: 'groove' },
                                        ],
                                        onChange: (value) => setAttributes({ filterBorderStyle: value }),
                                    }),

                                    // Filter Border Width
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Filter Border Width', 'fancy-post-grid'),
                                        values: attributes.filterBorderWidth,
                                        onChange: (value) => setAttributes({ filterBorderWidth: value }),
                                    }),

                                    // Filter Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Filter Border Radius', 'fancy-post-grid'),
                                        values: attributes.filterBorderRadius,
                                        onChange: (value) => setAttributes({ filterBorderRadius: value }),
                                    }),

                                    // Tabs: Normal / Hover / Active States
                                    wp.element.createElement(TabPanel, {
                                        className: "filter-tabs",
                                        activeClass: "active-tab",
                                        tabs: [
                                            { name: 'normal', title: __('Normal', 'fancy-post-grid'), className: 'normal-tab' },
                                            { name: 'hover', title: __('Hover', 'fancy-post-grid'), className: 'hover-tab' },
                                            { name: 'active', title: __('Active', 'fancy-post-grid'), className: 'active-tab' },
                                        ],
                                    }, (tab) => {
                                        return tab.name === 'normal' ? [

                                            wp.element.createElement('p', {}, __('Text Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterTextColor,
                                                onChangeComplete: (value) => setAttributes({ filterTextColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterTextColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            wp.element.createElement('p', {}, __('Background Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ filterBackgroundColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterBackgroundColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            wp.element.createElement('p', {}, __('Border Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterBorderColor,
                                                onChangeComplete: (value) => setAttributes({ filterBorderColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterBorderColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                        ] : tab.name === 'hover' ? [

                                            wp.element.createElement('p', {}, __('Hover Text Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterHoverTextColor,
                                                onChangeComplete: (value) => setAttributes({ filterHoverTextColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterHoverTextColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            wp.element.createElement('p', {}, __('Hover Background Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterHoverBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ filterHoverBackgroundColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterHoverBackgroundColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            wp.element.createElement('p', {}, __('Hover Border Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterHoverBorderColor,
                                                onChangeComplete: (value) => setAttributes({ filterHoverBorderColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterHoverBorderColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                        ] : [

                                            wp.element.createElement('p', {}, __('Active Text Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterActiveTextColor,
                                                onChangeComplete: (value) => setAttributes({ filterActiveTextColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterActiveTextColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            wp.element.createElement('p', {}, __('Active Background Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterActiveBackgroundColor,
                                                onChangeComplete: (value) => setAttributes({ filterActiveBackgroundColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterActiveBackgroundColor: '' }),
                                                    style: { marginTop: '10px' },
                                                }, __('Clear Color', 'fancy-post-grid')),

                                            wp.element.createElement('p', {}, __('Active Border Color', 'fancy-post-grid')),
                                            wp.element.createElement(wp.components.ColorPicker, {
                                                color: attributes.filterActiveBorderColor,
                                                onChangeComplete: (value) => setAttributes({ filterActiveBorderColor: value.hex }),
                                            }),
                                            wp.element.createElement(Button, {
                                                    isSecondary: true,
                                                    onClick: () => setAttributes({ filterActiveBorderColor: '' }),
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
