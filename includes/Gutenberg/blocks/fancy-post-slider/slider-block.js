(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    
    const { Fragment,useState, useEffect  } = wp.element;
    const { PanelBody, TabPanel,__experimentalBoxControl  , RangeControl,ColorPicker, ColorPalette, ToggleControl, TextControl, SelectControl  } = wp.components;

    registerBlockType('fancy-post-slider/block', {
        title: __('Slider Layout', 'fancy-post-grid'),
        icon: 'slides',
        category: 'fancy-post-grid-category',

        attributes: {

            // CONTENT
            // Layout
            gridColumns: { type: 'number', default: 3 },
            sliderLayoutStyle: { type: 'string', default: 'style1' },
            // Query Builder
            selectedCategory: { type: 'string', default: '' },
            selectedTag: { type: 'string', default: '' },
            
            orderBy: { type: 'string', default: 'title' },
            
            postLimit: { type: 'number', default: 3 },           
            // Pagination settings
            
            enablePagination: { type: 'boolean', default: true },
            enableArrow: { type: 'boolean', default: false },
            enableKeyboard: { type: 'boolean', default: true },
            enableLoop: { type: 'boolean', default: false },
            enableFreeMode: { type: 'boolean', default: false },
            paginationClickable: { type: 'boolean', default: false },
            
            autoPlaySpeed: { type: 'string', default: '3000' },
            paginationType: { type: 'string', default: 'bullets' },
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
            metaOrder: { type: 'number', default: 1 },
            titleOrder: { type: 'number', default: 2 },
            excerptOrder: { type: 'number', default: 3 },
            buttonOrder: { type: 'number', default: 4 },
            //Title Settings
            titleTag: { type: 'string', default: 'h3' }, // New: H1–H6 tag selection
            titleHoverUnderLine: { type: 'string', default: 'enable' },
            titleCropBy: { type: 'string', default: 'word' },
            titleLength: { type: 'number', default: 16 },
            //Thumbnail Settings
            thumbnailSize: { type: 'string', default: 'fancy_post_custom_size' },
            //Excerpt Settings
            excerptType: { type: 'string', default: 'word' },
            excerptLimit: { type: 'number', default: 20 },
            excerptIndicator: { type: 'string', default: '...' },
            //Meta data Settings
            metaAuthorPrefix: { type: 'string', default: 'By' },
            metaSeperator: { type: 'string', default: '' },
            
            //Button Settings
            readMoreLabel: { type: 'string', default: 'Read More' },
            buttonStyle: { type: 'string', default: 'flat' },
            showButtonIcon: { type: 'boolean', default: true },
            iconPosition: { type: 'string', default: 'right' },
            //Style
            //SECTION Area
            sectionBgColor: { type: 'string', default: '#ffffff' },
            sectionMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            sectionPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },            
            //ITEM Box           
            itemMargin: { type: 'object', default: { top: '40px', right: '0', bottom: '40px', left: '0' }, },
            itemPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemGap: { type: 'number', default: 10 },
            itemBoxAlignment: { type: 'string', default: 'left' },
            itemBorderType: { type: 'string', default: 'solid' },
            itemBoxShadow: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            itemBoxShadowColor: { type: 'string', default: '' },  
            itemBackgroundColor: { type: 'string', default: '' },
            itemBorderColor: { type: 'string', default: '' },
            itemBorderWidth: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },            
            //Content Box
            contentitemMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentitemPaddingNew: { type: 'object', default: { top: '10px', right: '', bottom: '', left: '' }, },
            contentBorderWidth: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            contentnormalBorderType: { type: 'string', default: 'none' },     
            contentBgColor: { type: 'string', default: '' },       
            contentBorderColor: { type: 'string', default: '' },       
            //ThumbNail            
            thumbnailMargin: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            thumbnailPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            thumbnailBorderRadius: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            
            //Post Title
            postTitleFontSize: { type: 'number', default: 24 },
            postTitleLineHeight: { type: 'number', default: 1.5 },
            postTitleLetterSpacing: { type: 'number', default: 1 },
            postTitleFontWeight: { type: 'string', default: '600' },
            postTitleAlignment: { type: 'string', default: 'left' },
            postTitleMargin: { type: 'object', default: { top: '10px', right: '0px', bottom: '0px', left: '0px' }, },
            postTitlePadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            postTitleColor: { type: 'string', default: '#161616' },
            postTitleBgColor: { type: 'string', default: '' },   
            postTitleHoverColor: { type: 'string', default: '#007aff' },
            postTitleHoverBgColor: { type: 'string', default: '' },
                    
            //excerpt
            excerptFontSize: { type: 'number', default: 16 },
            excerptLineHeight: { type: 'number', default: 1.5 },
            excerptLetterSpacing: { type: 'number', default: 1 },
            excerptFontWeight: { type: 'string', default: '400' },
            excerptAlignment: { type: 'string', default: 'left' },
            excerptMargin: { type: 'object', default: { top: '10px', right: '0', bottom: '10px', left: '0' }, },
            excerptPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },           
            excerptColor: { type: 'string', default: '' },
            excerptBgColor: { type: 'string', default: '' },
            excerptHoverColor: { type: 'string', default: '' },
            excerptHoverBgColor: { type: 'string', default: '' },
            excerptHoverBorderColor: { type: 'string', default: '' },
            //meta 
            metaFontSize: { type: 'number', default: 16 },
            metaAlignment: { type: 'string', default: 'left' },
            metaMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, }, 
            metaPadding: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, }, 
            metaTextColor: { type: 'string', default: '#05100b' },
            separatorColor: { type: 'string', default: '#cccccc' },
            metaIconColor: { type: 'string', default: '#007aff' },
            
            //Button
            buttonAlignment: { type: 'string', default: 'left' },
            buttonMarginNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },
            buttonPaddingNew: { type: 'object', default: { top: '', right: '', bottom: '', left: '' }, },  
            buttonFontSize: { type: 'string', default: '' },
            buttonTextColor: { type: 'string', default: '#454545' },
            buttonBackgroundColor: { type: 'string', default: '' },
            buttonBorderType: { type: 'string', default: 'none' },
            buttonBorderRadius: { type: 'string', default: '' },
            buttonFontWeight: { type: 'string', default: '700' },          
            buttonBorderWidth: { type: 'string', default: '' },
            buttonHoverTextColor: { type: 'string', default: '#007aff' },
            buttonHoverBackgroundColor: { type: 'string', default: '' },
            buttonBorderColor: { type: 'string', default: '' },
            buttonHoverBorderColor: { type: 'string', default: '' },
            //sLIDER OPTION
            sliderDots: { type: 'string', default: '#cccccc' },
            sliderDotsActive: { type: 'string', default: '#000000' },
            arrowColor: { type: 'string', default: '#000000' },
            arrowHoverColor: { type: 'string', default: '#ff0000' },
            arrowBgColor: { type: 'string', default: '#ffffff' },
            arrowBgHoverColor: { type: 'string', default: '#eeeeee' },
            arrowFontSize: { type: 'number', default: 16 },
            //Pagination
            
            postType: { type: 'string', default: 'post' },
            
        },

        edit: function ({ attributes, setAttributes }) {
            const { 
                gridColumns,sliderLayoutStyle
                ,selectedCategory, selectedTag,orderBy, postLimit,enablePagination,enableArrow,enableKeyboard,enableLoop,enableFreeMode,paginationClickable,autoPlaySpeed,paginationType,
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
                sliderDots,sliderDotsActive,arrowColor,arrowHoverColor,arrowBgColor,arrowBgHoverColor,arrowFontSize,
                 
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
            
            

            // Fetch posts dynamically based on the current page
            const { posts } = useSelect((select) => {
                const query = {
                    per_page: gridColumns,
                    _embed: true,
                    orderby: orderBy, // Dynamic sorting field (e.g., 'date', 'title', etc.)
                    categories: selectedCategory ? selectedCategory : undefined, // Apply category filter if selected
                    tags: selectedTag ? selectedTag : undefined, // Apply tag filter if selected
                };
                // Fetch posts
                const postsData = select('core').getEntityRecords('postType', postType, query);
                return {
                    posts: postsData,
                };
            }, [postType, gridColumns, selectedCategory, selectedTag, orderBy]);

            const swiperOptions = {
                
                slidesPerView: parseInt(attributes.gridColumns),
                freeMode: attributes.enableFreeMode,
                loop: attributes.enableLoop,
                autoplay: {
                    delay: parseInt(attributes.autoPlaySpeed),
                },
                keyboard: {
                    enabled: attributes.enableKeyboard,
                },
                breakpoints: {
                    10: {
                        slidesPerView: parseInt(attributes.gridColumns),
                    },
                    576: {
                        slidesPerView: parseInt(attributes.gridColumns),
                    },
                    768: {
                        slidesPerView: parseInt(attributes.gridColumns),
                    },
                    992: {
                        slidesPerView: parseInt(attributes.gridColumns),
                    }
                }
            };

            swiperOptions.pagination = {
                el: '.swiper-pagination-1',
                clickable: attributes.paginationClickable,
                type: attributes.paginationType !== 'bullets' ? attributes.paginationType : 'bullets',
            };
            const paginationControls = [];

            if (attributes.enablePagination) {
                // For bullet-based types
                if (['default', 'dynamic'].includes(attributes.paginationType)) {
                    paginationControls.push(
                        wp.element.createElement('div', { className: 'swiper-pagination swiper-pagination-1' })
                    );
                }

                // For progressbar and fraction types
                if (['progress', 'fraction'].includes(attributes.paginationType)) {
                    paginationControls.push(
                        wp.element.createElement('div', {
                            className: `swiper-pagination swiper-pagination-1 swiper-pagination-${attributes.paginationType}`
                        })
                    );
                }
            }

            if (attributes.enableArrow) {
                // Inject CSS for the ::after pseudo-elements dynamically
                const style = document.createElement('style');
                style.innerHTML = `
                    .swiper-button-next::after {
                        color: ${arrowColor} !important; /* Arrow color */
                        font-size: ${arrowFontSize}px !important; /* Font size */
                    }

                    .swiper-button-prev::after {
                        color: ${arrowColor} !important; /* Meta text color */
                        font-size: ${arrowFontSize}px !important; /* Font size */
                    }

                    .swiper-button-next:hover::after {
                        color: ${arrowHoverColor} !important; /* Hover arrow color */
                    }

                    .swiper-button-prev:hover::after {
                        color: ${arrowHoverColor} !important; /* Hover arrow color */
                    }
                `;
                document.head.appendChild(style);

                // Create next and prev buttons with the custom class
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-button-next`,  // Add the custom class
                        style: {
                            backgroundColor: arrowBgColor,
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgHoverColor;
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgColor;
                        }
                    }),

                    wp.element.createElement('div', {
                        className: `swiper-button-prev`,  // Add the custom class
                        style: {
                            backgroundColor: arrowBgColor,
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgHoverColor;
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgColor;
                        }
                    })
                );
            }


            let content;

            if (sliderLayoutStyle === 'style1' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-1 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'blog-item fancy-post-item' },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                            wp.element.createElement(
                                                                'div',
                                                                {
                                                                    className: 'image-wrap shape-show thumbnail-wrapper',
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
                                                        wp.element.createElement('div', { className: 'blog-content',style: {
                                                                margin: getSpacingValue(attributes.contentitemMarginNew),
                                                                padding: getSpacingValue(attributes.contentitemPaddingNew),
                                                                borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                                                borderStyle: attributes.contentnormalBorderType,
                                                                backgroundColor: contentBgColor,
                                                                borderColor: contentBorderColor,
                                                                },
                                                            }, 
                                                            
                                                            //Meta

                                                            showMetaData && 
                                                                wp.element.createElement('ul', { 
                                                                    className: 'blog-meta post-meta', 
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


                                                            //TITLE
                                                            // Title with Link
                                                            showPostTitle &&
                                                                wp.element.createElement(
                                                                    'div',
                                                                    {
                                                                        className: 'blog-title',
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
                                                                    className: 'desc', 
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

                                                            
                                                            showReadMoreButton && wp.element.createElement('div', { className: 'blog-btn',style: { 
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
                                                                        borderColor: buttonTextColor,
                                                                        border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                        fontWeight: buttonFontWeight,
                                                                        // Border style
                                                                        borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                        padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                        borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                        fontSize: `${buttonFontSize}px`,
                                                                        textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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
)
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
                );
            }
            else if (sliderLayoutStyle === 'style2' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-2 grey fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'blog-item fancy-post-item' },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                            wp.element.createElement(
                                                                'div',
                                                                {
                                                                    className: 'image-wrap shape-show thumbnail-wrapper',
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
                                                        wp.element.createElement('div', { className: 'blog-content',style: {
                                                                margin: getSpacingValue(attributes.contentitemMarginNew),
                                                                padding: getSpacingValue(attributes.contentitemPaddingNew),
                                                                borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                                                borderStyle: attributes.contentnormalBorderType,
                                                                backgroundColor: contentBgColor,
                                                                borderColor: contentBorderColor,
                                                                },
                                                            }, 
                                                            
                                                            //Meta

                                                            showMetaData && 
                                                                wp.element.createElement('ul', { 
                                                                    className: 'blog-meta post-meta', 
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


                                                            //TITLE
                                                            // Title with Link
                                                            showPostTitle &&
                                                                wp.element.createElement(
                                                                    'div',
                                                                    {
                                                                        className: 'blog-title',
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
                                                                    className: 'desc', 
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

                                                            
                                                            showReadMoreButton && wp.element.createElement('div', { className: 'blog-btn',style: { 
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
                                                                        borderColor: buttonTextColor,
                                                                        border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                        fontWeight: buttonFontWeight,
                                                                        // Border style
                                                                        borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                        padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                        borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                        fontSize: `${buttonFontSize}px`,
                                                                        textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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
)
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
                );
            }
            else if (sliderLayoutStyle === 'style3' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-3 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'rs-blog__single fancy-post-item' },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                            wp.element.createElement(
                                                                'div',
                                                                {
                                                                    className: 'thumb thumbnail-wrapper',
                                                                    style: {
                                                                        margin: getSpacingValue(attributes.thumbnailMargin),
                                                                        padding: getSpacingValue(attributes.thumbnailPadding),
                                                                        overflow: 'hidden',
                                                                    },
                                                                },
                                                                thumbnailLink
                                                                    ? wp.element.createElement(
                                                                        wp.element.Fragment,
                                                                        null,
                                                                        wp.element.createElement(
                                                                            'a',
                                                                            { href: post.link, target: postLinkTarget === 'newWindow' ? '_blank' : '_self' },
                                                                            wp.element.createElement('img', {
                                                                                src: thumbnail,
                                                                                alt: post.title.rendered,
                                                                                className: 'post-thumbnail',
                                                                                style: {
                                                                                    objectFit: 'cover',
                                                                                    width: '100%',
                                                                                    borderRadius: getSpacingValue(attributes.thumbnailBorderRadius),
                                                                                },
                                                                            })
                                                                        ),
                                                                        wp.element.createElement(
                                                                            'div',
                                                                            { className: 'rs-contact-icon' },
                                                                            wp.element.createElement(
                                                                                'a',
                                                                                { href: post.link },
                                                                                wp.element.createElement(
                                                                                    'svg',
                                                                                    {
                                                                                        width: '14',
                                                                                        height: '16',
                                                                                        viewBox: '0 0 14 14',
                                                                                        xmlns: 'http://www.w3.org/2000/svg',
                                                                                    },
                                                                                    wp.element.createElement('path', {
                                                                                        d: 'M3.70371 13.1768L7.90054e-06 14L0.823208 10.2963C0.28108 9.28226 -0.00172329 8.14985 7.90054e-06 7C7.90054e-06 3.1339 3.13391 0 7 0C10.8661 0 14 3.1339 14 7C14 10.8661 10.8661 14 7 14C5.85015 14.0017 4.71774 13.7189 3.70371 13.1768Z',
                                                                                        fill: 'white',
                                                                                    })
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                    : wp.element.createElement('img', {
                                                                        src: thumbnail,
                                                                        alt: post.title.rendered,
                                                                        className: 'post-thumbnail',
                                                                        style: { objectFit: 'cover', width: '100%' },
                                                                    })
                                                            ),

                                                        
                                                        // Wrap the entire content in a new div (e.g., rs-content)
                                                        wp.element.createElement('div', { className: 'content',style: {
                                                                margin: getSpacingValue(attributes.contentitemMarginNew),
                                                                padding: getSpacingValue(attributes.contentitemPaddingNew),
                                                                borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                                                borderStyle: attributes.contentnormalBorderType,
                                                                backgroundColor: contentBgColor,
                                                                borderColor: contentBorderColor,
                                                                },
                                                            }, 
                                                            
                                                            //Meta                                                           
                                                            wp.element.createElement('div', {
                                                                className: 'rs-blog-category',
                                                                style: {
                                                                    margin: getSpacingValue(attributes.metaMarginNew),
                                                                    padding: getSpacingValue(attributes.metaPadding),
                                                                    textAlign: metaAlignment,
                                                                    
                                                                }
                                                            },
                                                                showPostCategory && post._embedded?.['wp:term']?.[0]?.length > 0 &&
                                                                (() => {
                                                                    const firstCategory = post._embedded['wp:term'][0][0];
                                                                    return wp.element.createElement('a', {
                                                                        href: firstCategory.link,
                                                                        style: {
                                                                            color: metaTextColor,
                                                                            fontSize: `${metaFontSize}px`,
                                                                            textDecoration: 'none'
                                                                        }
                                                                    },
                                                                        wp.element.createElement('span', {
                                                                            className: 'icon',
                                                                            dangerouslySetInnerHTML: {
                                                                                __html: `
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                                                        <path d="M3 0L5.59808 1.5V4.5L3 6L0.401924 4.5V1.5L3 0Z" fill="#513DE8"></path>
                                                                                        <defs>
                                                                                            <linearGradient x1="-3.93273e-08" y1="0.803572" x2="6.33755" y2="1.30989" gradientUnits="userSpaceOnUse">
                                                                                                <stop stop-color="#513DE8" offset="1"></stop>
                                                                                                <stop offset="1" stop-color="#8366E3"></stop>
                                                                                            </linearGradient>
                                                                                        </defs>
                                                                                    </svg>
                                                                                `
                                                                            },
                                                                            style: { marginRight: '6px' }
                                                                        }),
                                                                        firstCategory.name
                                                                    );
                                                                })()
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
                                                            
                                                            //Meta

                                                            showMetaData && 
                                                                wp.element.createElement('ul', { 
                                                                    className: 'blog-meta post-meta', 
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
                                                                    className: 'desc', 
                                                                    style: { 
                                                                        order: excerptOrder,
                                                                        textAlign: excerptAlignment,
                                                                        
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

                                                            wp.element.createElement('div', { 
                                                                    className: 'rs-blog-author',style: { 
                                                                        order: buttonOrder}, },
                                                                // Post Author
                                                                showPostAuthor &&
                                                                    wp.element.createElement(
                                                                        'div',
                                                                        { className: 'user' },
                                                                        wp.element.createElement(
                                                                            'li',
                                                                            {
                                                                                className: 'meta-author',
                                                                                style: {
                                                                                    color: metaTextColor,
                                                                                    fontSize: `${metaFontSize}px`,
                                                                                },
                                                                            },
                                                                            showMetaIcon &&
                                                                                showPostAuthorIcon &&
                                                                                wp.element.createElement('i', {
                                                                                    className: 'fas fa-user',
                                                                                    style: {
                                                                                        color: metaIconColor,
                                                                                        fontSize: `${metaFontSize}px`,
                                                                                    },
                                                                                }),
                                                                            ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : ''}${post._embedded?.author?.[0]?.name}`
                                                                        )
                                                                    ),

                                                                showReadMoreButton && wp.element.createElement('div', { className: 'rs-link',style: { 
                                                                        
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
                                                                            borderColor: buttonTextColor,
                                                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                            fontWeight: buttonFontWeight,
                                                                            // Border style
                                                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                            fontSize: `${buttonFontSize}px`,
                                                                            textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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

                                                        )    
                                                        )
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
                );
            }
            else if (sliderLayoutStyle === 'style4' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-4 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'rs-blog__item fancy-post-item' },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                            wp.element.createElement(
                                                                'div',
                                                                {
                                                                    className: 'rs-thumb thumbnail-wrapper',
                                                                    style: {
                                                                        margin: getSpacingValue(attributes.thumbnailMargin),
                                                                        padding: getSpacingValue(attributes.thumbnailPadding),
                                                                        overflow: 'hidden',
                                                                    },
                                                                },
                                                                thumbnailLink
                                                                    ? wp.element.createElement(
                                                                        wp.element.Fragment,
                                                                        null,
                                                                        wp.element.createElement(
                                                                            'a',
                                                                            { href: post.link, target: postLinkTarget === 'newWindow' ? '_blank' : '_self' },
                                                                            wp.element.createElement('img', {
                                                                                src: thumbnail,
                                                                                alt: post.title.rendered,
                                                                                className: 'post-thumbnail',
                                                                                style: {
                                                                                    objectFit: 'cover',
                                                                                    width: '100%',
                                                                                    borderRadius: getSpacingValue(attributes.thumbnailBorderRadius),
                                                                                },
                                                                            })
                                                                        ),
                                                                        wp.element.createElement(
                                                                            'div',
                                                                            { className: 'rs-contact-icon' },
                                                                            wp.element.createElement(
                                                                                'a',
                                                                                { href: post.link },
                                                                                wp.element.createElement(
                                                                                    'svg',
                                                                                    {
                                                                                        width: '14',
                                                                                        height: '16',
                                                                                        viewBox: '0 0 14 14',
                                                                                        xmlns: 'http://www.w3.org/2000/svg',
                                                                                    },
                                                                                    wp.element.createElement('path', {
                                                                                        d: 'M3.70371 13.1768L7.90054e-06 14L0.823208 10.2963C0.28108 9.28226 -0.00172329 8.14985 7.90054e-06 7C7.90054e-06 3.1339 3.13391 0 7 0C10.8661 0 14 3.1339 14 7C14 10.8661 10.8661 14 7 14C5.85015 14.0017 4.71774 13.7189 3.70371 13.1768Z',
                                                                                        fill: 'white',
                                                                                    })
                                                                                )
                                                                            )
                                                                        )
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
                                                            wp.element.createElement('div', {
                                                                className: 'rs-category',
                                                                style: {
                                                                    margin: getSpacingValue(attributes.metaMarginNew),
                                                                    padding: getSpacingValue(attributes.metaPadding),
                                                                    textAlign: metaAlignment,
                                                                    
                                                                }
                                                            },
                                                                showPostCategory && post._embedded?.['wp:term']?.[0]?.length > 0 &&
                                                                (() => {
                                                                    const firstCategory = post._embedded['wp:term'][0][0];
                                                                    return wp.element.createElement('a', {
                                                                        href: firstCategory.link,
                                                                        style: {
                                                                            color: metaTextColor,
                                                                            fontSize: `${metaFontSize}px`,
                                                                            textDecoration: 'none'
                                                                        }
                                                                    },
                                                                        wp.element.createElement('span', {
                                                                            className: 'icon',
                                                                            dangerouslySetInnerHTML: {
                                                                                __html: `
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                                                        <path d="M3 0L5.59808 1.5V4.5L3 6L0.401924 4.5V1.5L3 0Z" fill="#513DE8"></path>
                                                                                        <defs>
                                                                                            <linearGradient x1="-3.93273e-08" y1="0.803572" x2="6.33755" y2="1.30989" gradientUnits="userSpaceOnUse">
                                                                                                <stop stop-color="#513DE8" offset="1"></stop>
                                                                                                <stop offset="1" stop-color="#8366E3"></stop>
                                                                                            </linearGradient>
                                                                                        </defs>
                                                                                    </svg>
                                                                                `
                                                                            },
                                                                            style: { marginRight: '6px' }
                                                                        }),
                                                                        firstCategory.name
                                                                    );
                                                                })()
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
                                                                    className: 'desc', 
                                                                    style: { 
                                                                        order: excerptOrder,
                                                                        textAlign: excerptAlignment,
                                                                        
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

                                                            wp.element.createElement('div', { 
                                                                    className: 'rs-blog-author',style: { 
                                                                        order: buttonOrder}, },
                                                                
                                                                showReadMoreButton && wp.element.createElement('div', { className: 'rs-link',style: { 
                                                                        
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
                                                                            borderColor: buttonTextColor,
                                                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                            fontWeight: buttonFontWeight,
                                                                            // Border style
                                                                            borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                            padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                            borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                            fontSize: `${buttonFontSize}px`,
                                                                            textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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

                                                        )    
                                                        )
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
                );
            }

            
            else if (sliderLayoutStyle === 'style5' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-18 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'rs-blog-layout-18-item fancy-post-item' },
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
                                                                                                                                                                                   
                                                            showMetaData && wp.element.createElement('div', { 
                                                                    className: 'rs-meta post-meta'},
                                                                wp.element.createElement('ul', { 
                                                                    className: 'blog-meta post-meta', 
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
                                                                )),


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
                                                            
                                                            
                                                            showReadMoreButton && wp.element.createElement('div', { className: 'blgo-btn-box',style: { 
                                                                    order: buttonOrder,
                                                                    margin: getSpacingValue(attributes.buttonMarginNew),
                                                                    textAlign: buttonAlignment  }, 
                                                                }, 
                                                                wp.element.createElement('a', { 
                                                                    href: post.link, 
                                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                                    className: `rs-btn read-more-${buttonStyle}`,  // Dynamic class based on buttonStyle
                                                                    style: { 
                                                                        backgroundColor: buttonStyle === 'filled' ? buttonBackgroundColor : 'transparent',
                                                                        color: buttonTextColor,
                                                                        borderColor: buttonTextColor,
                                                                        border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                        fontWeight: buttonFontWeight,
                                                                        // Border style
                                                                        borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                        padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                        borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                        fontSize: `${buttonFontSize}px`,
                                                                        textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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
)
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
                );
            }
            else if (sliderLayoutStyle === 'style6' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-23 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'rs-blog-layout-23-item fancy-post-item' },
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
                                                        wp.element.createElement('div', { className: 'rs-blog-layout-23-overlay',style: {
                                                                margin: getSpacingValue(attributes.contentitemMarginNew),
                                                                padding: getSpacingValue(attributes.contentitemPaddingNew),
                                                                borderWidth: getSpacingValue(attributes.contentBorderWidth),
                                                                borderStyle: attributes.contentnormalBorderType,
                                                                backgroundColor: contentBgColor,
                                                                borderColor: contentBorderColor,
                                                                },
                                                            }, 

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
                                                            
                                                            
                                                            showReadMoreButton && wp.element.createElement('div', { className: 'rs-btn-box',style: { 
                                                                    order: buttonOrder,
                                                                    margin: getSpacingValue(attributes.buttonMarginNew),
                                                                    textAlign: buttonAlignment  }, 
                                                                }, 
                                                                wp.element.createElement('a', { 
                                                                    href: post.link, 
                                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                                    className: `rs-btn read-more-${buttonStyle}`,  // Dynamic class based on buttonStyle
                                                                    style: { 
                                                                        backgroundColor: buttonStyle === 'filled' ? buttonBackgroundColor : 'transparent',
                                                                        color: buttonTextColor,
                                                                        borderColor: buttonTextColor,
                                                                        border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                        fontWeight: buttonFontWeight,
                                                                        // Border style
                                                                        borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                        padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                        borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                        fontSize: `${buttonFontSize}px`,
                                                                        textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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
)
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
                );
            }
            else if (sliderLayoutStyle === 'style7' && posts && posts.length) {
                
                content = wp.element.createElement(
                    'div',
                    { className: 'rs-blog-layout-28 fancy-post-grid'  },
                    wp.element.createElement(
                        'div',
                        { className: 'container' },
                        wp.element.createElement(
                            'div',
                            { className: 'row' },
                            wp.element.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                wp.element.createElement(
                                    'div',
                                    { className: 'swiper_wrap' },
                                    wp.element.createElement(
                                        'div',
                                        {
                                            className: 'swiper mySwiper',
                                            'data-swiper': JSON.stringify(swiperOptions),
                                        },
                                        wp.element.createElement(
                                            'div',
                                            { className: 'swiper-wrapper',
                                            style: {
                                                display: 'grid', 
                                                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                                                gap: attributes.itemGap,
                                                backgroundColor: sectionBgColor,
                                                margin: getSpacingValue(attributes.sectionMargin),
                                                padding: getSpacingValue(attributes.sectionPadding),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[attributes.thumbnailSize]?.source_url ||  post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
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
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: 'rs-blog-layout-28-item fancy-post-item' },
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
                                                                showMetaData && wp.element.createElement('div', { 
                                                                    className: 'rs-meta post-meta'},
                                                                wp.element.createElement('ul', { 
                                                                    className: 'blog-meta post-meta', 
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
                                                                )),
    
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
                                                                    className: 'desc', 
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

                                                            
                                                            showReadMoreButton && wp.element.createElement('div', { className: 'rs-btn-box',style: { 
                                                                    order: buttonOrder,
                                                                    margin: getSpacingValue(attributes.buttonMarginNew),
                                                                    textAlign: buttonAlignment  }, 
                                                                }, 
                                                                wp.element.createElement('a', { 
                                                                    href: post.link, 
                                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                                    className: `rs-btn read-more-${buttonStyle}`,  // Dynamic class based on buttonStyle
                                                                    style: { 
                                                                        backgroundColor: buttonStyle === 'filled' ? buttonBackgroundColor : 'transparent',
                                                                        color: buttonTextColor,
                                                                        borderColor: buttonTextColor,
                                                                        border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                                                        fontWeight: buttonFontWeight,
                                                                        // Border style
                                                                        borderWidth: `${attributes.buttonBorderWidth}px`,
                                                                        padding: getSpacingValue(attributes.buttonPaddingNew),
                                                                        borderRadius: getSpacingValue(attributes.buttonBorderRadius),
                                                                        fontSize: `${buttonFontSize}px`,
                                                                        textDecoration: buttonStyle === 'flat' ? 'none' : 'inherit'
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
)
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )
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
                                        value: sliderLayoutStyle,
                                        options: [
                                            { label: 'Style 1', value: 'style1' },
                                            { label: 'Style 2', value: 'style2' },
                                            { label: 'Style 3', value: 'style3' },
                                            { label: 'Style 4', value: 'style4' },
                                            { label: 'Style 5', value: 'style5' },
                                            { label: 'Style 6', value: 'style6' },
                                            { label: 'Style 7', value: 'style7' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ sliderLayoutStyle: value })
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
                                wp.element.createElement(PanelBody, { title: __('Enable Slider Option', 'fancy-post-grid'), initialOpen: false },
                                    // Enable Pagination
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Pagination Control', 'fancy-post-grid'),
                                        checked: enablePagination,
                                        onChange: (value) => setAttributes({ enablePagination: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Pagination Type ', 'fancy-post-grid'),
                                        value: paginationType,
                                        options: [
                                            { label: 'Pagination Default', value: 'bullets' },
                                            { label: 'Pagination Fraction', value: 'fraction' },
                                        ],
                                        onChange: (value) => setAttributes({ paginationType: value })
                                    }),

                                    // Enable Arrow Control
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Arrow Control', 'fancy-post-grid'),
                                        checked: enableArrow,
                                        onChange: (value) => setAttributes({ enableArrow: value })
                                    }),

                                    // Enable Keyboard Control
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Keyboard Control', 'fancy-post-grid'),
                                        checked: enableKeyboard,
                                        onChange: (value) => setAttributes({ enableKeyboard: value })
                                    }),

                                    // Enable Looping
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Looping', 'fancy-post-grid'),
                                        checked: enableLoop,
                                        onChange: (value) => setAttributes({ enableLoop: value })
                                    }),

                                    // Enable Free Mode
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Free Mode', 'fancy-post-grid'),
                                        checked: enableFreeMode,
                                        onChange: (value) => setAttributes({ enableFreeMode: value })
                                    }),

                                    // Enable Pagination Clickable Mode
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Pagination Clickable Mode', 'fancy-post-grid'),
                                        checked: paginationClickable,
                                        onChange: (value) => setAttributes({ paginationClickable: value })
                                    }),
                                    wp.element.createElement(SelectControl, {
                                        label: __('Auto Play Speed(ms): ', 'fancy-post-grid'),
                                        value: autoPlaySpeed,
                                        options: [
                                            { label: '1000 ms', value: '1000' },
                                            { label: '2000 ms', value: '2000' },
                                            { label: '3000 ms', value: '3000' },
                                            { label: '4000 ms', value: '4000' },
                                            { label: '5000 ms', value: '5000' },
                                            { label: '6000 ms', value: '6000' },
                                            { label: '7000 ms', value: '7000' },
                                            { label: '8000 ms', value: '8000' },
                                            { label: '9000 ms', value: '9000' },
                                            { label: '10000 ms', value: '10000' },
                                            
                                        ],
                                        onChange: (value) => setAttributes({ autoPlaySpeed: value })
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
                                            { label: __('Left', 'fancy-post-grid'), value: 'left' },
                                            { label: __('Center', 'fancy-post-grid'), value: 'center' },
                                            { label: __('Right', 'fancy-post-grid'), value: 'right' },
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
                                
                                wp.element.createElement(PanelBody, { title: __('Slider Dot & Arrow Style', 'fancy-post-grid'), initialOpen: false },

                                    // Slider Dots Color
                                    wp.element.createElement('p', {}, __('Slider Dots Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.sliderDots,
                                        onChangeComplete: (value) => setAttributes({ sliderDots: value.hex }),
                                    }),

                                    // Slider Dots Active Color
                                    wp.element.createElement('p', {}, __('Slider Dots Active Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.sliderDotsActive,
                                        onChangeComplete: (value) => setAttributes({ sliderDotsActive: value.hex }),
                                    }),

                                    // Arrow Color
                                    wp.element.createElement('p', {}, __('Arrow Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowColor,
                                        onChangeComplete: (value) => setAttributes({ arrowColor: value.hex }),
                                    }),

                                    // Arrow Hover Color
                                    wp.element.createElement('p', {}, __('Arrow Hover Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowHoverColor,
                                        onChangeComplete: (value) => setAttributes({ arrowHoverColor: value.hex }),
                                    }),

                                    // Arrow Background Color
                                    wp.element.createElement('p', {}, __('Arrow Background Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowBgColor,
                                        onChangeComplete: (value) => setAttributes({ arrowBgColor: value.hex }),
                                    }),

                                    // Arrow Background Hover Color
                                    wp.element.createElement('p', {}, __('Arrow Background Hover Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowBgHoverColor,
                                        onChangeComplete: (value) => setAttributes({ arrowBgHoverColor: value.hex }),
                                    }),

                                    // Arrow Icon Font Size
                                    wp.element.createElement('p', {}, __('Arrow Icon Font Size (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.arrowFontSize,
                                        onChange: (value) => setAttributes({ arrowFontSize: value }),
                                        min: 8,
                                        max: 48,
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
