else if (gridLayoutStyle === 'style5' && posts && posts.length) {
                content = wp.element.createElement(
                    'div',
                    { 
                        className: 'rs-blog-layout-12 fancy-post-grid', 
                        style: { 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${newGridColumns5}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize5]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

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
                                        ),
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
                                        className: `blog-btn icon-after ${buttonStyle5}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            // borderWidth: `${attributes.buttonBorderWidth}px`,
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
                            gridTemplateColumns: `repeat(${newGridColumns6}, 1fr)`, 
                            gap: attributes.itemGap,
                            backgroundColor: sectionBgColor,
                            margin: getSpacingValue(attributes.sectionMargin),
                            padding: getSpacingValue(attributes.sectionPadding),
                            
                        } 
                    },
                    posts.map((post) => {
                        // const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        const thumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.[thumbnailSize6]?.source_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

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
                                        className: `blog-btn read-more ${buttonStyle6}`,  // Dynamic class based on buttonStyle
                                        style: { 
                                            backgroundColor: buttonStyle === 'fpg-filled' ? buttonBackgroundColor : 'transparent',
                                            color: buttonTextColor,
                                            borderColor: buttonTextColor,
                                            border:  ` ${buttonBorderType} ${buttonBackgroundColor}`, 
                                            fontWeight: buttonFontWeight,
                                            // Border style
                                            // borderWidth: `${attributes.buttonBorderWidth}px`,
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












            else if ($gridLayoutStyle === 'style5') {
        $output = '<div class="rs-blog-layout-12 grey  ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns5) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }

        // Margin
        if (!empty($sectionMargin['top']) || !empty($sectionMargin['right']) || !empty($sectionMargin['bottom']) || !empty($sectionMargin['left'])) {
            $output .= 'margin: ' . 
                (is_numeric($sectionMargin['top']) ? $sectionMargin['top'] . 'px' : esc_attr($sectionMargin['top'])) . ' ' . 
                (is_numeric($sectionMargin['right']) ? $sectionMargin['right'] . 'px' : esc_attr($sectionMargin['right'])) . ' ' . 
                (is_numeric($sectionMargin['bottom']) ? $sectionMargin['bottom'] . 'px' : esc_attr($sectionMargin['bottom'])) . ' ' . 
                (is_numeric($sectionMargin['left']) ? $sectionMargin['left'] . 'px' : esc_attr($sectionMargin['left'])) . '; ';
        }

        // Padding
        if (!empty($sectionPadding['top']) || !empty($sectionPadding['right']) || !empty($sectionPadding['bottom']) || !empty($sectionPadding['left'])) {
            $output .= 'padding: ' . 
                (is_numeric($sectionPadding['top']) ? $sectionPadding['top'] . 'px' : esc_attr($sectionPadding['top'])) . ' ' . 
                (is_numeric($sectionPadding['right']) ? $sectionPadding['right'] . 'px' : esc_attr($sectionPadding['right'])) . ' ' . 
                (is_numeric($sectionPadding['bottom']) ? $sectionPadding['bottom'] . 'px' : esc_attr($sectionPadding['bottom'])) . ' ' . 
                (is_numeric($sectionPadding['left']) ? $sectionPadding['left'] . 'px' : esc_attr($sectionPadding['left'])) . '; ';
        }

        $output .= '">';
    }else if ($gridLayoutStyle === 'style6') {
        $output = '<div class="rs-blog-layout-13 ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns6) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }

        // Margin
        if (!empty($sectionMargin['top']) || !empty($sectionMargin['right']) || !empty($sectionMargin['bottom']) || !empty($sectionMargin['left'])) {
            $output .= 'margin: ' . 
                (is_numeric($sectionMargin['top']) ? $sectionMargin['top'] . 'px' : esc_attr($sectionMargin['top'])) . ' ' . 
                (is_numeric($sectionMargin['right']) ? $sectionMargin['right'] . 'px' : esc_attr($sectionMargin['right'])) . ' ' . 
                (is_numeric($sectionMargin['bottom']) ? $sectionMargin['bottom'] . 'px' : esc_attr($sectionMargin['bottom'])) . ' ' . 
                (is_numeric($sectionMargin['left']) ? $sectionMargin['left'] . 'px' : esc_attr($sectionMargin['left'])) . '; ';
        }

        // Padding
        if (!empty($sectionPadding['top']) || !empty($sectionPadding['right']) || !empty($sectionPadding['bottom']) || !empty($sectionPadding['left'])) {
            $output .= 'padding: ' . 
                (is_numeric($sectionPadding['top']) ? $sectionPadding['top'] . 'px' : esc_attr($sectionPadding['top'])) . ' ' . 
                (is_numeric($sectionPadding['right']) ? $sectionPadding['right'] . 'px' : esc_attr($sectionPadding['right'])) . ' ' . 
                (is_numeric($sectionPadding['bottom']) ? $sectionPadding['bottom'] . 'px' : esc_attr($sectionPadding['bottom'])) . ' ' . 
                (is_numeric($sectionPadding['left']) ? $sectionPadding['left'] . 'px' : esc_attr($sectionPadding['left'])) . '; ';
        }

        $output .= '">';
    }


    elseif ($gridLayoutStyle === 'style5') {
                // Full post layout
                $output .= '<div class="pre-blog-item style_12 pre-blog-meta-style2 default">';
                $output .= '<div class="fancy-post-item blog-inner-wrap pre-thum-default pre-meta-blocks top" style=" margin: ' . 
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
                        $output .= '<div class="fancy-post-image pre-image-wrap" style="margin: ' .
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' .
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' .
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' .
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; padding: ' .
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' .
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' .
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' .
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">';

                        $output .= '<a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' .
                            (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . '; overflow: hidden;">' .
                            $thumbnail . '</a>';

                        // Date
                        if ($showPostDate) {
                            $output .= '<div class="pre-blog-meta" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                            
                            $output .= '<span class="pre-date">' . esc_html(get_the_date('d')) . '</span>';
                            $output .= '<span class="pre-month"> ' . esc_html(get_the_date('F')) . '</span>';

                            
                            $output .= '</div>';
                        }
                        $output .= '</div>'; // Close fancy-post-image rs-thumb
                    }
                

                // MAIN Content
                $output .= '<div class="pre-blog-content" style=" margin: ' . 
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
                    (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . ';">';

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

                    $meta_items = [];

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Categories
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    $output .= implode('<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span>', $meta_items);

                    $output .= '</ul>'; // Close meta-data-list
                    
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $output .= '<' . esc_attr($titleTag) . ' class="pre-post-title" 
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
                    $output .= '<div class="pre-content" style="order: ' . esc_attr($excerptOrder) . '; 
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
                    $output .= '<div class="blog-btn-part" style="margin: ' . 
                        (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' . 
                        (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' . 
                        (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' . 
                        (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; text-align: ' . esc_attr($buttonAlignment) . '; order: ' . esc_attr($buttonOrder) . ';">';

                    // Inline styles
                    $buttonInlineStyles = 'color: ' . esc_attr($buttonTextColor) . ';
                        background-color: ' . esc_attr($buttonBackgroundColor) . ';
                        font-size: ' . esc_attr($buttonFontSize) . 'px;
                        font-weight: ' . esc_attr($buttonFontWeight) . '; 
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
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "'; this.style.borderColor='" . esc_attr($buttonBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="blog-btn icon-after read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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
                $output .= '</div>';
                // End Full post layout
            } 
            elseif ($gridLayoutStyle === 'style6') {
                // Full post layout
                
                $output .= '<div class="fancy-post-item rs-blog-layout-13-item" style=" margin: ' . 
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
                        $output .= '<div class="fancy-post-image rs-thumb" style="margin: ' .
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' .
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' .
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' .
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; padding: ' .
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' .
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' .
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' .
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">';

                        $output .= '<a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' .
                            (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . '; overflow: hidden;">' .
                            $thumbnail . '</a>';

                        // Date
                        if ($showPostDate) {
                            $output .= '<div class="pre-blog-meta" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                            
                            
                            if ($showPostDateIcon && $showMetaIcon) {
                                $output .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                            }

                            $output .= '<span class="pre-date">' . esc_html(get_the_date('d')) . '</span>';
                            $output .= '<span class="pre-month"> ' . esc_html(get_the_date('F')) . '</span>';

                            
                            $output .= '</div>';
                        }
                        $output .= '</div>'; // Close fancy-post-image rs-thumb
                    }
                

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
                    (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . ';">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta">';        
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

                    $meta_items = [];

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                        $meta .= '<span>';
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html__('News in', 'fancy-post-grid') . ' ' . esc_html(get_the_date('Y'));
                        $meta .= '</span></li>';
                        $meta_items[] = $meta;
                    }


                    // Categories
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    $output .= implode('<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span>', $meta_items);

                    $output .= '</ul>'; // Close meta-data-list
                    $output .= '</div>'; // Close meta-data-list
                    
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
                        font-weight: ' . esc_attr($buttonFontWeight) . '; 
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
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "'; this.style.borderColor='" . esc_attr($buttonBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="blog-btn icon-after read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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



else if ($gridLayoutStyle === 'style10') {
                // Full post layout
                $output .= '<div class="fancy-post-item rs-blog-layout-19-item" style=" margin: ' . 
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
                    (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . ';">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta">';        
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

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($date) . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Categories
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    $output .= implode('<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span>', $meta_items);

                    $output .= '</ul>'; // Close meta-data-list
                    $output .= '</div>'; // Close meta-data-list
                    
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
                        font-weight: ' . esc_attr($buttonFontWeight) . '; 
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
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "'; this.style.borderColor='" . esc_attr($buttonBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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
            else if ($gridLayoutStyle === 'style11') {
                // Full post layout
                $output .= '<div class="fancy-post-item rs-blog-layout-21-item" style=" margin: ' . 
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
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="fancy-post-image rs-thumb" style=" margin: ' . 
                        (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                        (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                        (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                        (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; padding: ' . 
                        (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                        (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                        (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                        (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">';

                    $output .= '<a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' . 
                        (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . '; overflow: hidden;">' . 
                        $thumbnail . 
                    '</a>';

                    // 👇 Add your SVG right after the </a> tag
                    $output .= '
                    <svg viewBox="0 0 410 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shape__rs_course">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M346.69 23.5159C371.59 23.3769 398.013 17.3185 410 4.85404V32H0V9.75773C2.99658 0.284217 26.1914 -2.12936 41.5898 1.81449C49.0762 3.72855 55.7041 6.53361 62.3281 9.33695C69.3286 12.2997 76.3247 15.2605 84.3242 17.1654C111.49 25.8323 134.405 18.6565 157.427 11.4472C171.419 7.06559 185.451 2.67167 200.5 1.81449C217.549 0.842933 234.721 5.15653 251.493 9.36967C259.098 11.2798 266.62 13.1693 274.011 14.5363C278.288 15.3272 282.339 16.1309 286.297 16.9161C304.269 20.4812 320.31 23.6632 346.69 23.5159Z" fill="#ffffff"></path>
                    </svg>';

                    $output .= '</div>';
                }

                

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
                    (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . ';">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta">';        
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

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($date) . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Categories
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    $output .= implode('<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span>', $meta_items);

                    $output .= '</ul>'; // Close meta-data-list
                    $output .= '</div>'; // Close meta-data-list
                    
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
                        font-weight: ' . esc_attr($buttonFontWeight) . '; 
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
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "'; this.style.borderColor='" . esc_attr($buttonBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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
            else if ($gridLayoutStyle === 'style12') {
                // Full post layout
                $output .= '<div class="fancy-post-item rs-blog-layout-26-item" style=" margin: ' . 
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
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="fancy-post-image rs-thumb" style=" margin: ' . 
                        (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                        (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                        (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                        (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; padding: ' . 
                        (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                        (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                        (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                        (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">';

                    $output .= '<a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' . 
                        (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . '; overflow: hidden;">' . 
                        $thumbnail . 
                    '</a>';

                    // 👇 Add your SVG right after the </a> tag
                    $output .= '
                    <svg viewBox="0 0 410 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shape__rs_course">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M346.69 23.5159C371.59 23.3769 398.013 17.3185 410 4.85404V32H0V9.75773C2.99658 0.284217 26.1914 -2.12936 41.5898 1.81449C49.0762 3.72855 55.7041 6.53361 62.3281 9.33695C69.3286 12.2997 76.3247 15.2605 84.3242 17.1654C111.49 25.8323 134.405 18.6565 157.427 11.4472C171.419 7.06559 185.451 2.67167 200.5 1.81449C217.549 0.842933 234.721 5.15653 251.493 9.36967C259.098 11.2798 266.62 13.1693 274.011 14.5363C278.288 15.3272 282.339 16.1309 286.297 16.9161C304.269 20.4812 320.31 23.6632 346.69 23.5159Z" fill="#ffffff"></path>
                    </svg>';

                    $output .= '</div>';
                }

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
                    (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . ';">';

                // Meta Data
                if ($showMetaData) {
                            
                    $output .= '<div class="rs-meta" style="
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

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<div class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($date) . '</div>';
                        $meta_items[] = $meta;
                    }

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<div class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</div>';
                        $meta_items[] = $meta;
                    }

                    // Categories
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<div class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</div>';
                        $meta_items[] = $meta;
                    }

                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<div class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</div>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    $output .= implode('<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span>', $meta_items);

                    
                    $output .= '</div>'; // Close meta-data-list
                    
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
                        font-weight: ' . esc_attr($buttonFontWeight) . '; 
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
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "'; this.style.borderColor='" . esc_attr($buttonBorderColor) . "'; this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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