(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { useSelect } = wp.data;
    const { Fragment,useState, useEffect  } = wp.element;
    const { PanelBody, TabPanel,__experimentalBoxControl,Button, RangeControl,ColorPicker, ToggleControl, TextControl, SelectControl  } = wp.components;

    registerBlockType('fancy-post-slider/block', {
        title: __('Slider Layout', 'fancy-post-grid'),
        icon: 'slides',
        category: 'fancy-post-grid-category',

        attributes: {
            // Layout
            gridColumns: { type: 'number', default: 3 },
            sliderLayoutStyle: { type: 'string', default: 'style1' },
            // Query Builder
            selectedCategory: { type: 'string', default: '' },
            selectedTag: { type: 'string', default: '' },
            orderBy: { type: 'string', default: 'title' },       
            postLimit: { type: 'number', default: 9 },           
            // Pagination settings
            enablePagination: { type: 'boolean', default: true },
            enableArrow: { type: 'boolean', default: true },
            enableDynamicBullets: { type: 'boolean', default: false },
            enableKeyboard: { type: 'boolean', default: true },
            enableLoop: { type: 'boolean', default: true },
            enableFreeMode: { type: 'boolean', default: true },
            enableAutoPlay: { type: 'boolean', default: false },
            paginationClickable: { type: 'boolean', default: true },     
            autoPlaySpeed: { type: 'string', default: '3000' },
            paginationType: { type: 'string', default: 'bullets' },
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
            buttonStyle: { type: 'string'},
            showButtonIcon: { type: 'boolean', default: true },
            iconPosition: { type: 'string', default: 'right' },
            //Style
            //SECTION Area
            sectionBgColor: { type: 'string', default: '' },
            sectionMargin: { type: 'object' },
            sectionPadding: { type: 'object' },            
            //ITEM Box           
            itemMargin: { type: 'object' },
            itemPadding: { type: 'object' },
            itemBorderRadius: { type: 'object' },
            itemGap: { type: 'number', default: '30' },
            itemBoxAlignment: { type: 'string' },
            itemBorderType: { type: 'string', default: '' },
            itemBoxShadow: { type: 'object' },
            itemBoxShadowColor: { type: 'string', default: '' },  
            itemBackgroundColor: { type: 'string', default: '' },
            itemBorderColor: { type: 'string', default: '' },
            itemBorderWidth: { type: 'object' },            
            //Content Box
            contentitemMarginNew: { type: 'object' },
            contentitemPaddingNew: { type: 'object' },
            contentitemRadius: { type: 'object', default: 'none' },
            contentBorderWidth: { type: 'object' },
            contentnormalBorderType: { type: 'string', default: '' },     
            contentBgColor: { type: 'string', default: '' },       
            contentBorderColor: { type: 'string', default: '' },       
            //ThumbNail            
            thumbnailMargin: { type: 'object' },
            thumbnailPadding: { type: 'object' },
            thumbnailBorderRadius: { type: 'object' },
            
            //Post Title
            postTitleFontSize: { type: 'number'},
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
            buttonPaddingNew: { type: 'object'},
            buttonFontSize: { type: 'string' },
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
            //sLIDER OPTION
            sliderDots: { type: 'string', default: '' },
            sliderDotsActive: { type: 'string', default: '' },
            bulletHeight: { type: 'number', default: '' },
            bulletWeight: { type: 'number', default: '' },
            normalProcessColor: { type: 'string', default: '' },
            activeProcessColor: { type: 'string', default: '' },
            arrowColor: { type: 'string', default: '' },
            arrowHoverColor: { type: 'string', default: '' },
            arrowBgColorr: { type: 'string', default: '' },
            arrowBgHoverColor: { type: 'string', default: '' },
            arrowFontSize: { type: 'number', default: '' },
            arrowHeight: { type: 'number', default: '' },
            arrowWeight: { type: 'number', default: '' },
            fractionCurrentColor: { type: 'string', default: '' },
            fractionFontSize: { type: 'number', default: '' },
            arrowBorderRadius: { type: 'object' },
            bulletsRadius: { type: 'object' },
            
            postType: { type: 'string', default: 'post' },
            
        },

        edit: function ({ attributes, setAttributes }) {
            const { 
                gridColumns,sliderLayoutStyle
                ,selectedCategory, selectedTag,orderBy, postLimit,enablePagination,enableArrow,enableDynamicBullets,enableKeyboard,enableLoop,enableFreeMode,enableAutoPlay,paginationClickable,autoPlaySpeed,paginationType,
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

                contentitemMarginNew,contentitemPaddingNew,contentnormalBorderType,contentitemRadius,contentBorderWidth,contentBgColor,contentBorderColor,

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
                sliderDots,sliderDotsActive,normalProcessColor,activeProcessColor,arrowColor,arrowHoverColor,arrowBgColorr,arrowBgHoverColor,arrowFontSize,fractionCurrentColor,fractionFontSize,arrowHeight,arrowWeight,bulletHeight,bulletWeight,arrowBorderRadius,bulletsRadius,
                 
                postType  } = attributes;

            // thumbnailSize
            const thumbnailSize1 = (sliderLayoutStyle === 'style1' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize; 
            const thumbnailSize2 = (sliderLayoutStyle === 'style2' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize;  
            const thumbnailSize3 = (sliderLayoutStyle === 'style3' && attributes.thumbnailSize == null)
              ? 'fancy_post_custom_size' : attributes.thumbnailSize;
            const thumbnailSize4 = (sliderLayoutStyle === 'style4' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize; 
            const thumbnailSize5 = (sliderLayoutStyle === 'style5' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize;  
            const thumbnailSize6 = (sliderLayoutStyle === 'style6' && attributes.thumbnailSize == null)
              ? 'fancy_post_square' : attributes.thumbnailSize; 
            const thumbnailSize7 = (sliderLayoutStyle === 'style7' && attributes.thumbnailSize == null)
              ? 'fancy_post_landscape' : attributes.thumbnailSize;
            // itemBoxAlignment
            const itemBoxAlignment1 = (sliderLayoutStyle === 'style1' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment; 
            const itemBoxAlignment2 = (sliderLayoutStyle === 'style2' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;  
            const itemBoxAlignment3 = (sliderLayoutStyle === 'style3' && attributes.itemBoxAlignment == null)
              ? 'center' : attributes.itemBoxAlignment;
            const itemBoxAlignment4 = (sliderLayoutStyle === 'style4' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment; 
            const itemBoxAlignment5 = (sliderLayoutStyle === 'style5' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;  
            const itemBoxAlignment6 = (sliderLayoutStyle === 'style6' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment; 
            const itemBoxAlignment7 = (sliderLayoutStyle === 'style7' && attributes.itemBoxAlignment == null)
              ? 'start' : attributes.itemBoxAlignment;  

            const buttonStyle1 = (sliderLayoutStyle === 'style1' && attributes.buttonStyle == null)
              ? 'fpg-border' : attributes.buttonStyle; 
            const buttonStyle2 = (sliderLayoutStyle === 'style2' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle;  
            const buttonStyle3 = (sliderLayoutStyle === 'style3' && attributes.buttonStyle == null)
              ? 'fpg-filled' : attributes.buttonStyle;
            const buttonStyle4 = (sliderLayoutStyle === 'style4' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle; 
            const buttonStyle5 = (sliderLayoutStyle === 'style5' && attributes.buttonStyle == null)
              ? 'fpg-flat' : attributes.buttonStyle;  
            const buttonStyle6 = (sliderLayoutStyle === 'style6' && attributes.buttonStyle == null)
              ? 'fpg-border' : attributes.buttonStyle; 
            const buttonStyle7 = (sliderLayoutStyle === 'style7' && attributes.buttonStyle == null)
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
                if (!value) return '0px';
                
                return `${value.top || 0}px ${value.right || 0}px ${value.bottom || 0}px ${value.left || 0}px`;
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
                    
                    e.currentTarget.style.backgroundImage = `linear-gradient(to bottom, ${postTitleHoverColor} 0%, ${postTitleHoverColor} 100%)`;
                    e.currentTarget.style.backgroundPosition = '0 100%';
                    e.currentTarget.style.color = postTitleHoverColor;
                },
                onMouseLeave: (e) => {
                    e.currentTarget.style.color = postTitleColor;
                },
            };

            const titleTextStyleS = {
                ...(postTitleColor ? { color: postTitleColor } : {}),
                ...(postTitleBgColor ? { backgroundColor: postTitleBgColor } : {}),
                ...(postTitleFontSize ? { fontSize: `${postTitleFontSize}px` } : {}),
                ...(postTitleFontWeight ? { fontWeight: postTitleFontWeight } : {}),
                ...(postTitleLineHeight ? { lineHeight: postTitleLineHeight } : {}),
                ...(postTitleLetterSpacing ? { letterSpacing: postTitleLetterSpacing } : {}),
            };

            const titleTextHoverHandlersS = {
                onMouseEnter: (e) => {
                    e.currentTarget.style.color = postTitleHoverColor;
                    e.currentTarget.style.backgroundColor = postTitleHoverBgColor;
                    e.currentTarget.style.backgroundImage = `linear-gradient(to bottom, ${postTitleHoverColor} 0%, ${postTitleHoverColor} 100%)`;
                    e.currentTarget.style.backgroundPosition = '0 100%';
                },
                onMouseLeave: (e) => {
                    
                    e.currentTarget.style.backgroundColor = postTitleBgColor;
                    e.currentTarget.style.color = postTitleColor;
                },
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
                spaceBetween: attributes.itemGap,
                slidesPerView: parseInt(attributes.gridColumns),
                freeMode: attributes.enableFreeMode,
                
                dynamicBullets: attributes.enableDynamicBullets,
                loop: attributes.enableLoop,
                autoplay: {
                    delay: parseInt(attributes.autoPlaySpeed),
                },
                keyboard: {
                    enabled: attributes.enableKeyboard,
                },
                breakpoints: {
                    10: {
                        slidesPerView: 1, // Default for smallest screens
                    },
                    576: {
                        slidesPerView: 2, // Default for small devices
                    },
                    768: {
                        slidesPerView: 3, // Default for tablets
                    },
                    992: {
                        slidesPerView: parseInt(attributes.gridColumns),
                    }
                }
            };
            useEffect(() => {
                const swiper = new Swiper('.swiper-container', swiperOptions);
            }, []);

            const paginationControls = [];

            const validTypes = ['bullets', 'fraction', 'progressbar'];
            const swiperPaginationType = validTypes.includes(attributes.paginationType)
                ? attributes.paginationType
                : 'bullets';

            swiperOptions.pagination = {
                el: '.swiper-pagination-1,.swiper-pagination-2,.swiper-pagination-3,.swiper-pagination-4,.swiper-pagination-18,.swiper-pagination-23',
                clickable: !!attributes.paginationClickable,
                type: swiperPaginationType,
            };

            if (sliderLayoutStyle === 'style1' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-1 swiper-pagination-${swiperPaginationType}`,
                    })
                );
            }
            if (sliderLayoutStyle === 'style2' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-2 swiper-pagination-${swiperPaginationType}`,
                    })
                );
            }
            if (sliderLayoutStyle === 'style3' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-3 swiper-pagination-${swiperPaginationType}`,
                    })
                );
            }
            if (sliderLayoutStyle === 'style4' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-4 swiper-pagination-${swiperPaginationType}`,
                    })
                );
            }
            if (sliderLayoutStyle === 'style5' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-18 swiper-pagination-${swiperPaginationType}`,
                    })
                );
            }
            if (sliderLayoutStyle === 'style6' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-23 swiper-pagination-${swiperPaginationType}`,
                    })
                );
            }
            if (sliderLayoutStyle === 'style7' && attributes.enablePagination) {
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-pagination swiper-pagination-1 swiper-pagination-${swiperPaginationType}`,
                    })
                );
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
                    .swiper_wrap .swiper-button-next, .swiper_wrap .swiper-button-prev {
                
                        height: ${arrowHeight}px !important;
                        width: ${arrowWeight}px !important;
                        border-radius: ${attributes.arrowBorderRadius ? getSpacingValue(attributes.arrowBorderRadius) : ''} !important;
                    }

                `;
                document.head.appendChild(style);

                // Create next and prev buttons with the custom class
                paginationControls.push(
                    wp.element.createElement('div', {
                        className: `swiper-button-next`,  // Add the custom class
                        style: {
                            backgroundColor: arrowBgColorr,
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgHoverColor;
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgColorr;
                        }
                    }),

                    wp.element.createElement('div', {
                        className: `swiper-button-prev`,  // Add the custom class
                        style: {
                            backgroundColor: arrowBgColorr,
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgHoverColor;
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.backgroundColor = arrowBgColorr;
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
                                                ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize1]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide' },
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item blog-item align-${itemBoxAlignment1} ${hoverAnimation} ${postLinkType}`,
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
                                                            }, },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                            wp.element.createElement(
                                                                'div',
                                                                {
                                                                    className: 'image-wrap shape-show thumbnail-wrapper',
                                                                    style: {
                                                                        ...(attributes.thumbnailMargin ? { margin: getSpacingValue(attributes.thumbnailMargin) } : {}),
                                                                        ...(attributes.thumbnailPadding ? { padding: getSpacingValue(attributes.thumbnailPadding) } : {}),
                                                                        
                                                                        ...(attributes.thumbnailBorderRadius
                                                                          ? { borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) }
                                                                          : { borderRadius: '70px 0px 0px 0px' }), // your default fallback
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
                                                        wp.element.createElement('div', { className: 'blog-content',style: {
                                                                
                                                                ...(attributes.contentitemMarginNew
                                                                  ? { margin: getSpacingValue(attributes.contentitemMarginNew) }
                                                                  : { margin: '0px 0px 0px 0px' }), 
                                                                ...(attributes.contentitemPaddingNew
                                                                  ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                                  : { padding: '27px 30px 34px 30px' }), // your default fallback
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
                                                                    className: `blog-meta post-meta align-${metaAlignment} `, 
                                                                    style: { 
                                                                        ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '0px 0px 0px 0px' }), 
                                                                        ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '0px 0px 12px 0px' }),
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
                                                            // Title with Link
                                                            showPostTitle &&
                                                                wp.element.createElement(
                                                                    titleTag,
                                                                    {
                                                                        className: `blog-title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                                                        style: {
                                                                            
                                                                            ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '0px 0px 0px 0px' }), 
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
                                                                    className: `desc align-${excerptAlignment}`, 
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
                                                                className: `blog-btn align-${buttonAlignment} `,
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
                                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                                    readMoreLabel, 
                                                                    iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
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
                    { className: 'rs-blog-layout-2 fancy-post-grid'  },
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
                                                  ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                  ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                  ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                  ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                  
                                                }, 
                                            },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize2]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';;

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide', },
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item blog-item align-${itemBoxAlignment2} ${hoverAnimation} ${postLinkType}`,
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
                                                                  className: 'image-wrap shape-show thumbnail-wrapper',
                                                                  style: {
                                                                      ...(attributes.thumbnailMargin ? { margin: getSpacingValue(attributes.thumbnailMargin) } : {}),
                                                                      ...(attributes.thumbnailPadding ? { padding: getSpacingValue(attributes.thumbnailPadding) } : {}),
                                                                      
                                                                      ...(attributes.thumbnailBorderRadius
                                                                        ? { borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) }
                                                                        : { borderRadius: '5px 5px 0px 0px' }), // your default fallback
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
                                                        wp.element.createElement('div', { className: 'blog-content',style: {
                                                              ...(attributes.contentitemMarginNew
                                                                  ? { margin: getSpacingValue(attributes.contentitemMarginNew) }
                                                                  : { margin: '0px 0px 0px 0px' }),
                                                              ...(attributes.contentitemPaddingNew
                                                                ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                                : { padding: '20px 20px 20px 20px' }), // your default fallback
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
                                                                    className: `blog-meta post-meta align-${metaAlignment} `, 
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
                                                            // Title with Link
                                                            showPostTitle &&
                                                                wp.element.createElement(
                                                                    titleTag,
                                                                    {
                                                                        className: `blog-title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
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
                                
                                                            //eXCERPT
                                                            showPostExcerpt &&
                                                                wp.element.createElement('div', { 
                                                                    className: `desc align-${excerptAlignment}`, 
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
                                                                className: `blog-btn align-${buttonAlignment} `,
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
                                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                                      readMoreLabel, 
                                                                      iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
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
                          wp.element.Fragment,
                          null,
                          wp.element.createElement('style', null, `
                              
                              .rs-blog-layout-3 .rs-blog__single .content .rs-blog-category a .icon svg path {
                                  fill: ${attributes.metaTextColor || '#513de8'};
                              },
                          `),
                          wp.element.createElement(
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
                                                ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize3]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',},
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item rs-blog__single align-${itemBoxAlignment3} ${hoverAnimation} ${postLinkType}`,
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
                                                          }, },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                          wp.element.createElement(
                                                              'div',
                                                              {
                                                                  className: 'thumb thumbnail-wrapper',
                                                                  style: {
                                                                      ...(attributes.thumbnailMargin ? { margin: getSpacingValue(attributes.thumbnailMargin) } : {}),
                                                                      ...(attributes.thumbnailPadding ? { padding: getSpacingValue(attributes.thumbnailPadding) } : {}),
                                                                      
                                                                      ...(attributes.thumbnailBorderRadius
                                                                        ? { borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) }
                                                                        : { borderRadius: '10px 10px 10px 10px' }), // your default fallback
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
                                                        wp.element.createElement('div', { className: 'content',style: {
                                                              ...(attributes.contentitemMarginNew
                                                                  ? { margin: getSpacingValue(attributes.contentitemMarginNew) }
                                                                  : { margin: '-90px 0px 0px 0px' }),
                                                              ...(attributes.contentitemPaddingNew
                                                                ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                                : { padding: '0px 20px 40px 20px' }), // your default fallback
                                                              ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                              ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
                                                              ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                                              ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                                              ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                                              },
                                                            }, 
                                                            
                                                            //Meta                                                           
                                                            wp.element.createElement('div', {
                                                                className: 'rs-blog-category',
                                                                
                                                            },
                                                                showPostCategory && post._embedded?.['wp:term']?.[0]?.length > 0 &&
                                                                (() => {
                                                                    const firstCategory = post._embedded['wp:term'][0][0];
                                                                    return wp.element.createElement('a', {
                                                                        href: firstCategory.link,
                                                                        style: {
                                                                            ...(metaTextColor ? { color: metaTextColor } : {}),
                                                                            ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {}),
                                                                            ...(metaBgColor ? { backgroundColor: metaBgColor } : {}),
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
                                                                  titleTag,
                                                                  {
                                                                      className: `title align-${postTitleAlignment} ${titleHoverUnderLine === 'enable' ? ' underline' : ''}`,
                                                                      style: {
                                                                          
                                                                          ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '10px 0px 0px 0px' }), 
                                                                          ...(attributes.postTitlePadding ? { padding: getSpacingValue(attributes.postTitlePadding) }: { padding: '0px 0px 0px 0px' }),                                                                           
                                                                          ...(titleOrder !== undefined ? { order: titleOrder } : {}),
                                                                          ...(postLinkType === 'nolink' ? titleTextStyle : {}), // apply if nolink
                                                                      },
                                                                      ...(postLinkType === 'nolink' ? titleTextHoverHandlersS : {}), // attach hover if nolink
                                                                  },
                                                                  postLinkType === 'yeslink'
                                                                      ? wp.element.createElement(
                                                                          'a',
                                                                          {
                                                                              href: post.link,
                                                                              target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
                                                                              style: titleTextStyleS,
                                                                              ...titleTextHoverHandlersS,
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
                                                              wp.element.createElement('ul', { 
                                                                  className: `blog-meta post-meta align-${metaAlignment} `, 
                                                                  style: { 
                                                                      ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '29px 0px 0px 0px' }), 
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


                                                            showPostExcerpt &&
                                                                wp.element.createElement('p', { 
                                                                    className: `desc align-${excerptAlignment}`,
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
                                                              
                                                            wp.element.createElement('div', { 
                                                                    className: 'rs-blog-author',style: { 
                                                                        order: buttonOrder}, },
                                                                // Post Author
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
                                                                            style: {
                                                                              ...(metaTextColor ? { color: metaTextColor } : {}),
                                                                              ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {}),
                                                                            },
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
                                                                          'span',
                                                                          null,
                                                                          ` ${metaAuthorPrefix ? metaAuthorPrefix + ' ' : 'by '}${post._embedded?.author?.[0]?.name || ''}`
                                                                        )
                                                                      )
                                                                    ),

                                                                showReadMoreButton && wp.element.createElement('div', { 
                                                                    className: `rs-link align-${buttonAlignment} `,
                                                                    style: { 
                                                                        order: buttonOrder,
                                                                        margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                                                    }, 
                                                                    wp.element.createElement('a', { 
                                                                        href: post.link, 
                                                                        target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                                        className: `read-more ${buttonStyle3}`,  // Dynamic class based on buttonStyle
                                                                        style: { 
                                                                            
                                                                            ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
                                                                            ...(buttonTextColor ? { color: buttonTextColor } : {}),
                                                                            ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
                                                                            ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
                                                                            ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
                                                                            ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : {}),
                                                                            ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) }: { padding: '6px 20px 6px 20px' }),
                                                                            
                                                                            ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) }: { borderRadius: '45px 45px 45px 45px' }),
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
                                                        )
                                                    );
                                                }),
                                        ),
                                    ),
                                    ...paginationControls
                                )
                            )
                        )
                    )),
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
                                                ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize4]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide' },
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item rs-blog__item align-${itemBoxAlignment4} ${hoverAnimation} ${postLinkType}`,
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
                                                            },  },
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
                                                                  : { padding: '22px 30px 20px 30px' }), // your default fallback
                                                                ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                                ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
                                                                ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                                                ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                                                ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                                                },
                                                            }, 
                                                            
                                                            //Meta                                                      
                                                        wp.element.createElement('div', {
                                                            className: `rs-category post-meta  align-${metaAlignment}`, 
                                                            style: { 
                                                                
                                                                
                                                                ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                                                ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                            }
                                                            },
                                                            showPostCategory && post._embedded?.['wp:term']?.[0]?.length > 0 &&
                                                            (() => {
                                                                const firstCategory = post._embedded['wp:term'][0][0];
                                                                return wp.element.createElement('a', {
                                                                    href: firstCategory.link,
                                                                    style: {
                                                                        ...(metaTextColor ? { color: metaTextColor } : {}),
                                                                        ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '' }), 
                                                                        ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '' }),
                                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {}),
                                                                        ...(metaBgColor ? { backgroundColor: metaBgColor } : {}),
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
                                                                            
                                                                            ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '0px 0px 0px 0px' }), 
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
                                                                    className: `desc align-${excerptAlignment}`,
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
              
                                                      
                                                              showReadMoreButton &&  
                                                                  wp.element.createElement('a', { 
                                                                      href: post.link, 
                                                                      target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                                      className: `btn-link read-more ${buttonStyle4}`,  // Dynamic class based on buttonStyle
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
                                                                      iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                                      readMoreLabel, 
                                                                      iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
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
                                                ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize5]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide' },
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item rs-blog-layout-18-item align-${itemBoxAlignment5} ${hoverAnimation} ${postLinkType}`,
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
                                                            }, },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                          wp.element.createElement(
                                                              'div',
                                                              {
                                                                  className: 'rs-thumb thumbnail-wrapper',
                                                                  style: {
                                                                      ...(attributes.thumbnailMargin ? { margin: getSpacingValue(attributes.thumbnailMargin) } : {}),
                                                                      ...(attributes.thumbnailPadding ? { padding: getSpacingValue(attributes.thumbnailPadding) } : {}),
                                                                      
                                                                      ...(attributes.thumbnailBorderRadius
                                                                        ? { borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) }
                                                                        : { borderRadius: '30px 30px 30px 30px' }), // your default fallback
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
                                                              
                                                              ...(attributes.contentitemMarginNew
                                                                ? { margin: getSpacingValue(attributes.contentitemMarginNew) }
                                                                : { margin: '-80px 0px 0px 70px' }),
                                                              ...(attributes.contentitemPaddingNew
                                                                ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                                : { padding: '60px 25px 25px 25px' }), 
                                                              ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                              ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
                                                              ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                                              ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                                              ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                                              },
                                                            }, 
                                                                                                                                                                                   
                                                            showMetaData && wp.element.createElement('div', { 
                                                                    className: `rs-meta post-meta align-${metaAlignment} `,
                                                                    style: { 
                                                                        ...(metaBgColor ? { background: metaBgColor } : {}),
                                                                        ...(attributes.metaMarginNew ? { margin: getSpacingValue(attributes.metaMarginNew) }: { margin: '' }), 
                                                                        ...(attributes.metaPadding ? { padding: getSpacingValue(attributes.metaPadding) }: { padding: '' }),
                                                                    } },
                                                                wp.element.createElement('ul', { 
                                                                    className: 'blog-meta post-meta', 
                                                                    style: { 
                                                                        
                                                                        ...(metaTextColor ? { color: metaTextColor } : {}),
                                                                        ...(typeof metaOrder !== 'undefined' ? { order: metaOrder } : {}),
                                                                        ...(metaFontSize ? { fontSize: `${metaFontSize}px` } : {})
                                                                    } 
                                                                },
                                                                    [
                                                                      
                                                                      // Post Author
                                                                      showPostAuthor && wp.element.createElement(
                                                                          'li', 
                                                                          { style: { 
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
                                                                      showPostCategory && wp.element.createElement('li', { style: { 
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
                    
                                                            showReadMoreButton && wp.element.createElement('div', { 
                                                                className: `blgo-btn-box align-${buttonAlignment} `,
                                                                style: { 
                                                                    order: buttonOrder,
                                                                    margin: getSpacingValue(attributes.buttonMarginNew) }, 
                                                                }, 
                                                                wp.element.createElement('a', { 
                                                                    href: post.link, 
                                                                    target: postLinkTarget === 'newWindow' ? '_blank' : '_self', 
                                                                    className: `rs-btn read-more ${buttonStyle5}`,  // Dynamic class based on buttonStyle
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
                                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                                    readMoreLabel, 
                                                                    iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
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
                                                    ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                    ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                    ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                    ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                }, 
                                              },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize6]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide' },
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item rs-blog-layout-23-item align-${itemBoxAlignment6} ${hoverAnimation} ${postLinkType}`,
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
                                                            }, },
                                                        // Thumbnail Display with Link if enabled
                                                        showThumbnail && thumbnail &&
                                                          wp.element.createElement(
                                                              'div',
                                                              {
                                                                  className: 'rs-thumb thumbnail-wrapper',
                                                                  style: {
                                                                      ...(attributes.thumbnailMargin ? { margin: getSpacingValue(attributes.thumbnailMargin) } : {}),
                                                                      ...(attributes.thumbnailPadding ? { padding: getSpacingValue(attributes.thumbnailPadding) } : {}),
                                                                      
                                                                      ...(attributes.thumbnailBorderRadius
                                                                        ? { borderRadius: getSpacingValue(attributes.thumbnailBorderRadius) }
                                                                        : { borderRadius: '0px 0px 0px 0px' }), // your default fallback
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
                                                        wp.element.createElement('div', { className: 'rs-blog-layout-23-overlay',style: {
                                                              ...(attributes.contentitemMarginNew ? { margin: getSpacingValue(attributes.contentitemMarginNew) } : {}),
                                                              ...(attributes.contentitemPaddingNew
                                                                ? { padding: getSpacingValue(attributes.contentitemPaddingNew) }
                                                                : { padding: '20px 20px 20px 20px' }), // your default fallback
                                                              ...(attributes.contentBorderWidth ? { borderWidth: getSpacingValue(attributes.contentBorderWidth) } : {}),
                                                              ...(attributes.contentitemRadius ? { borderRadius: getSpacingValue(attributes.contentitemRadius) } : {}),
                                                              ...(attributes.contentnormalBorderType ? { borderStyle: attributes.contentnormalBorderType } : {}),
                                                              ...(contentBgColor ? { backgroundColor: contentBgColor } : {}),
                                                              ...(contentBorderColor ? { borderColor: contentBorderColor } : {})
                                                              },
                                                            }, 

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
                    
                                                            showReadMoreButton &&
                                                              wp.element.createElement(
                                                                'div',
                                                                {
                                                                  className: `rs-btn-box align-${buttonAlignment}`,
                                                                  style: {
                                                                    order: buttonOrder,
                                                                    margin: getSpacingValue(attributes.buttonMarginNew) || '0px',
                                                                  },
                                                                },
                                                                wp.element.createElement(
  'a',
  {
    href: post.link,
    target: postLinkTarget === 'newWindow' ? '_blank' : '_self',
    className: `rs-btn read-more ${buttonStyle6}`,
    style: {
      ...(buttonBackgroundColor ? { background: buttonBackgroundColor } : {}),
      ...(buttonTextColor ? { color: buttonTextColor } : {}),
      ...(buttonBorderColor ? { borderColor: buttonBorderColor } : {}),
      ...(buttonBorderType ? { borderStyle: buttonBorderType } : {}),
      ...(buttonFontWeight ? { fontWeight: buttonFontWeight } : {}),
      ...(attributes.buttonBorderWidth ? { borderWidth: getSpacingValue(attributes.buttonBorderWidth) } : { borderWidth: '0px' }),
      ...(attributes.buttonPaddingNew ? { padding: getSpacingValue(attributes.buttonPaddingNew) } : { padding: '0px' }),
      ...(attributes.buttonBorderRadius ? { borderRadius: getSpacingValue(attributes.buttonBorderRadius) } : {}),
      ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}),
      ...(buttonStyle === 'fpg-flat' ? { textDecoration: 'none' } : { textDecoration: 'inherit' }),
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.color = buttonHoverTextColor || '';
      e.currentTarget.style.background = buttonHoverBackgroundColor || '';
      e.currentTarget.style.borderColor = buttonHoverBorderColor || '';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = buttonTextColor || '';
      e.currentTarget.style.background = buttonBackgroundColor || '';
      e.currentTarget.style.borderColor = buttonBorderColor || '';
    },
  },
  // Button text
  readMoreLabel || 'Read More',
  // Optional icon if position is right
  iconPosition === 'right' &&
    showButtonIcon &&
    wp.element.createElement('i', {
      className: 'fas fa-arrow-right',
      style: { marginLeft: '5px' },
    })
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
                                                ...(attributes.itemGap ? { gap: `${itemGap}px` } : {}),
                                                ...(sectionBgColor ? { backgroundColor: sectionBgColor } : {}),
                                                ...(attributes.sectionPadding ? { padding: getSpacingValue(attributes.sectionPadding) } : {}),
                                                ...(attributes.sectionMargin ? { margin: getSpacingValue(attributes.sectionMargin) } : {}),
                                                
                                            }, },
                                            
                                                posts.map((post) => {
                        
                                                    const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize7]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                                                    const excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, '').split(' ').slice(0, excerptLimit).join(' ') + excerptIndicator;
                                                    
                                                    return wp.element.createElement('div', { 
                                                        key: post.id, 
                                                            className: 'swiper-slide',
                                                        },
                                                        wp.element.createElement(
                                                        'div',
                                                        { className: `fancy-post-item rs-blog-layout-28-item align-${itemBoxAlignment7} ${hoverAnimation} ${postLinkType}`,
                                                            style: {
                                                                ...(attributes.itemMargin
                                                                  ? { margin: getSpacingValue(attributes.itemMargin) }
                                                                  : { margin: '40px 0px 0px 0px' }), // your default fallback
                                                                ...(attributes.itemPadding
                                                                  ? { margin: getSpacingValue(attributes.itemPadding) }
                                                                  : { margin: '40px 0px 40px 0px' }), // your default fallback
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
                                                                            ...(metaBgColor ? { backgroundColor: metaBgColor } : {}),
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
                                                                            
                                                                            ...(attributes.postTitleMargin ? { margin: getSpacingValue(attributes.postTitleMargin) }: { margin: '0px 0px 0px 0px' }), 
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
                                
                                                            //Meta
                                                            showPostExcerpt &&
                                                                wp.element.createElement('div', { 
                                                                    className: `fpg-excerpt align-${excerptAlignment}`,
                                                                    style: { 
                                                                            ...(excerptOrder ? { order: excerptOrder } : {}),
                                                                            ...(attributes.excerptMargin
                                                                            ? { margin: getSpacingValue(attributes.excerptMargin) }
                                                                            : { margin: '10px 0px 15px 0px' }), // your default fallback
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
                                                                    className: `rs-btn read-more ${buttonStyle7}`,  // Dynamic class based on buttonStyle
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
                                                                    iconPosition === 'left' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: '5px', ...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } }), 
                                                                    readMoreLabel, 
                                                                    iconPosition === 'right' && showButtonIcon && wp.element.createElement('i', { className: 'fas fa-arrow-right', style: { marginLeft: '5px',...(buttonFontSize ? { fontSize: `${buttonFontSize}px` } : {}), } })
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
                                        label: __('Slider Items', 'fancy-post-grid'),
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
                                            { label: 'Pagination Bullets', value: 'bullets' },
                                            { label: 'Pagination Fraction', value: 'fraction' },
                                            { label: 'Pagination Progressbar', value: 'progressbar' },
                                        ],
                                        onChange: (value) => setAttributes({ paginationType: value })
                                    }),

                                    // Enable Arrow Control
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Arrow Control', 'fancy-post-grid'),
                                        checked: enableArrow,
                                        onChange: (value) => setAttributes({ enableArrow: value })
                                    }),
                                    // Enable Arrow Control
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable Dynamic Bullets', 'fancy-post-grid'),
                                        checked: enableDynamicBullets,
                                        onChange: (value) => setAttributes({ enableDynamicBullets: value })
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
                                    // Enable Free Mode
                                    wp.element.createElement(ToggleControl, {
                                        label: __('Enable AutoPlay', 'fancy-post-grid'),
                                        checked: enableAutoPlay,
                                        onChange: (value) => setAttributes({ enableAutoPlay: value })
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
                                    // Border Width
                                    wp.element.createElement(__experimentalBoxControl, {
                                      label: __('Border Width', 'fancy-post-grid'),
                                      values: attributes.itemBorderWidth,
                                      onChange: (value) => setAttributes({ itemBorderWidth: value }),
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
                                
                                wp.element.createElement(PanelBody, { title: __('Pagination & Arrow Style', 'fancy-post-grid'), initialOpen: false },

                                    // Slider Bullets Color
                                    wp.element.createElement('p', {}, __('Bullets Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.sliderDots,
                                        onChangeComplete: (value) => setAttributes({ sliderDots: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ sliderDots: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Slider Bullets Active Color
                                    wp.element.createElement('p', {}, __('Bullets Active Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.sliderDotsActive,
                                        onChangeComplete: (value) => setAttributes({ sliderDotsActive: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ sliderDotsActive: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),
                                    // Bullet Height
                                    wp.element.createElement('p', {}, __('Bullet Height (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.bulletHeight,
                                        onChange: (value) => setAttributes({ bulletHeight: value }),
                                        min: 1,
                                        max: 100,
                                    }),

                                    // Bullet Weight
                                    wp.element.createElement('p', {}, __('Bullet Weight (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.bulletWeight,
                                        onChange: (value) => setAttributes({ bulletWeight: value }),
                                        min: 1,
                                        max: 100,
                                    }),
                                    // Bullet Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Bullet Border Radius', 'fancy-post-grid'),
                                        values: attributes.bulletsRadius,
                                        onChange: (value) => setAttributes({ bulletsRadius: value }),
                                    }),

                                    // Fraction Color
                                    wp.element.createElement('p', {}, __('Fraction Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.fractionCurrentColor,
                                        onChangeComplete: (value) => setAttributes({ fractionCurrentColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ fractionCurrentColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Fraction Font Size
                                    wp.element.createElement('p', {}, __('Fraction Font Size (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.fractionFontSize,
                                        onChange: (value) => setAttributes({ fractionFontSize: value }),
                                        min: 8,
                                        max: 48,
                                    }),

                                    // Progress Color
                                    wp.element.createElement('p', {}, __('Normal Progress Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.normalProcessColor,
                                        onChangeComplete: (value) => setAttributes({ normalProcessColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ normalProcessColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Active Progress Color
                                    wp.element.createElement('p', {}, __('Active Progress Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.activeProcessColor,
                                        onChangeComplete: (value) => setAttributes({ activeProcessColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ activeProcessColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Arrow Color
                                    wp.element.createElement('p', {}, __('Arrow Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowColor,
                                        onChangeComplete: (value) => setAttributes({ arrowColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ arrowColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Arrow Hover Color
                                    wp.element.createElement('p', {}, __('Arrow Hover Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowHoverColor,
                                        onChangeComplete: (value) => setAttributes({ arrowHoverColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ arrowHoverColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Arrow Background Color
                                    wp.element.createElement('p', {}, __('Arrow Background Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowBgColorr,
                                        onChangeComplete: (value) => setAttributes({ arrowBgColorr: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ arrowBgColorr: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Arrow Background Hover Color
                                    wp.element.createElement('p', {}, __('Arrow Background Hover Color', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.ColorPicker, {
                                        color: attributes.arrowBgHoverColor,
                                        onChangeComplete: (value) => setAttributes({ arrowBgHoverColor: value.hex }),
                                    }),
                                    wp.element.createElement(Button, {
                                        isSecondary: true,
                                        onClick: () => setAttributes({ arrowBgHoverColor: '' }),
                                        style: { marginTop: '10px' },
                                    }, __('Clear Color', 'fancy-post-grid')),

                                    // Arrow Icon Font Size
                                    wp.element.createElement('p', {}, __('Arrow Icon Font Size (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.arrowFontSize,
                                        onChange: (value) => setAttributes({ arrowFontSize: value }),
                                        min: 1,
                                        max: 100,
                                    }),
                                    // Arrow Height
                                    wp.element.createElement('p', {}, __('Arrow Height (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.arrowHeight,
                                        onChange: (value) => setAttributes({ arrowHeight: value }),
                                        min: 1,
                                        max: 100,
                                    }),

                                    // Arrow Weight
                                    wp.element.createElement('p', {}, __('Arrow Weight (px)', 'fancy-post-grid')),
                                    wp.element.createElement(wp.components.RangeControl, {
                                        value: attributes.arrowWeight,
                                        onChange: (value) => setAttributes({ arrowWeight: value }),
                                        min: 1,
                                        max: 100,
                                    }),
                                    // Arrow Border Radius
                                    wp.element.createElement(__experimentalBoxControl, {
                                        label: __('Arrow Border Radius', 'fancy-post-grid'),
                                        values: attributes.arrowBorderRadius,
                                        onChange: (value) => setAttributes({ arrowBorderRadius: value }),
                                    }),
                                    
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
