function fancy_post_grid_render_callback($attributes) {
    // Content Layout
    
    $gridLayoutStyle = isset($attributes['gridLayoutStyle']) ? $attributes['gridLayoutStyle'] : 'style1';
    $gridColumns = isset($attributes['gridColumns']) ? absint($attributes['gridColumns']) : '';
    //Query Builder
    $selectedCategory = isset($attributes['selectedCategory']) ? sanitize_text_field($attributes['selectedCategory']) : '';
    $selectedTag = isset($attributes['selectedTag']) ? sanitize_text_field($attributes['selectedTag']) : '';
    $orderBy = isset($attributes['orderBy']) ? sanitize_text_field($attributes['orderBy']) : 'title';
    $postLimit = isset($attributes['postLimit']) ? absint($attributes['postLimit']) : 3;
      
    // Pagination settings
    $enablePagination = isset($attributes['enablePagination']) ? filter_var($attributes['enablePagination'], FILTER_VALIDATE_BOOLEAN) : true;
    // Links
    $postLinkTarget = isset($attributes['postLinkTarget']) ? sanitize_text_field($attributes['postLinkTarget']) : 'newWindow';
    $thumbnailLink = isset($attributes['thumbnailLink']) ? filter_var($attributes['thumbnailLink'], FILTER_VALIDATE_BOOLEAN) : true;
    $postLinkType = isset($attributes['postLinkType']) ? sanitize_text_field($attributes['postLinkType']) : 'yeslink';

    // Field Selector
    $showPostTitle = isset($attributes['showPostTitle']) ? filter_var($attributes['showPostTitle'], FILTER_VALIDATE_BOOLEAN) : true;
    $showThumbnail = isset($attributes['showThumbnail']) ? filter_var($attributes['showThumbnail'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostExcerpt = isset($attributes['showPostExcerpt']) ? filter_var($attributes['showPostExcerpt'], FILTER_VALIDATE_BOOLEAN) : true;
    $showReadMoreButton = isset($attributes['showReadMoreButton']) ? filter_var($attributes['showReadMoreButton'], FILTER_VALIDATE_BOOLEAN) : true;
    $showMetaData = isset($attributes['showMetaData']) ? filter_var($attributes['showMetaData'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostDate = isset($attributes['showPostDate']) ? filter_var($attributes['showPostDate'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostAuthor = isset($attributes['showPostAuthor']) ? filter_var($attributes['showPostAuthor'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCategory = isset($attributes['showPostCategory']) ? filter_var($attributes['showPostCategory'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostTags = isset($attributes['showPostTags']) ? filter_var($attributes['showPostTags'], FILTER_VALIDATE_BOOLEAN) : false;
    $showPostCommentsCount = isset($attributes['showPostCommentsCount']) ? filter_var($attributes['showPostCommentsCount'], FILTER_VALIDATE_BOOLEAN) : false;
    $showMetaIcon = isset($attributes['showMetaIcon']) ? filter_var($attributes['showMetaIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostDateIcon = isset($attributes['showPostDateIcon']) ? filter_var($attributes['showPostDateIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostAuthorIcon = isset($attributes['showPostAuthorIcon']) ? filter_var($attributes['showPostAuthorIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCategoryIcon = isset($attributes['showPostCategoryIcon']) ? filter_var($attributes['showPostCategoryIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostTagsIcon = isset($attributes['showPostTagsIcon']) ? filter_var($attributes['showPostTagsIcon'], FILTER_VALIDATE_BOOLEAN) : false;
    $showPostCommentsCountIcon = isset($attributes['showPostCommentsCountIcon']) ? filter_var($attributes['showPostCommentsCountIcon'], FILTER_VALIDATE_BOOLEAN) : false;

    // Order values
    $metaOrder = isset($attributes['metaOrder']) ? absint($attributes['metaOrder']) : '';
    $titleOrder = isset($attributes['titleOrder']) ? absint($attributes['titleOrder']) : '';
    $excerptOrder = isset($attributes['excerptOrder']) ? absint($attributes['excerptOrder']) : '';
    $buttonOrder = isset($attributes['buttonOrder']) ? absint($attributes['buttonOrder']) : '';

    // Post title settings
    $titleTag               = isset($attributes['titleTag']) ? sanitize_text_field($attributes['titleTag']) : 'h3';
    $titleHoverUnderLine    = isset($attributes['titleHoverUnderLine']) ? sanitize_text_field($attributes['titleHoverUnderLine']) : 'enable';
    $titleCropBy            = isset($attributes['titleCropBy']) ? sanitize_text_field($attributes['titleCropBy']) : 'word';
    $titleLength            = isset($attributes['titleLength']) ? absint($attributes['titleLength']) : 12;
    
    //THUMB sETTINGS
    $thumbnailSize = isset($attributes['thumbnailSize']) ? sanitize_text_field($attributes['thumbnailSize']) : '';
    $hoverAnimation = isset($attributes['hoverAnimation']) ? sanitize_text_field($attributes['hoverAnimation']) : 'hover-zoom_in';

    // Excerpt Settings
    $excerptType = isset($attributes['excerptType']) ? sanitize_text_field($attributes['excerptType']) : 'word';
    $excerptIndicator = isset($attributes['excerptIndicator']) ? sanitize_text_field($attributes['excerptIndicator']) : '...';
    $excerptLimit = isset($attributes['excerptLimit']) ? absint($attributes['excerptLimit']) : 10;
    // Meta data Settings
    $metaAuthorPrefix = isset($attributes['metaAuthorPrefix']) ? sanitize_text_field($attributes['metaAuthorPrefix']) : __('By', 'fancy-post-grid');
    $metaSeperator = isset($attributes['metaSeperator']) ? sanitize_text_field($attributes['metaSeperator']) : '';
    //Button Settings   
    $showButtonIcon = isset($attributes['showButtonIcon']) ? filter_var($attributes['showPostCommentsCountIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $iconPosition = isset($attributes['iconPosition']) ? sanitize_text_field($attributes['iconPosition']) : 'right';
    $buttonStyle = isset($attributes['buttonStyle']) ? sanitize_text_field($attributes['buttonStyle']) : '';
    $readMoreLabel = isset($attributes['readMoreLabel']) ? sanitize_text_field($attributes['readMoreLabel']) : __('Read More', 'fancy-post-grid');
    // SECTION Area
    $sectionBgColor    = isset($attributes['sectionBgColor']) ? sanitize_hex_color($attributes['sectionBgColor']) : '';
    $sectionMargin = isset($attributes['sectionMargin']) ? $attributes['sectionMargin'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $sectionPadding = isset($attributes['sectionPadding']) ? $attributes['sectionPadding'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    // ITEM Box
    $itemPadding = isset($attributes['itemPadding']) ? $attributes['itemPadding'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $itemMargin = isset($attributes['itemMargin']) ? $attributes['itemMargin'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $itemBorderRadius = isset($attributes['itemBorderRadius']) ? $attributes['itemBorderRadius'] : ['top' => '5', 'right' => '5', 'bottom' => '5', 'left' => '5'];
    $itemBorderWidth = isset($attributes['itemBorderWidth']) ? $attributes['itemBorderWidth'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $itemBoxAlignment   = isset($attributes['itemBoxAlignment']) ? sanitize_text_field($attributes['itemBoxAlignment']) : 'start';
    $itemBorderType     = isset($attributes['itemBorderType']) ? sanitize_text_field($attributes['itemBorderType']) : '';
    $itemBoxShadow = isset($attributes['itemBoxShadow']) ? $attributes['itemBoxShadow'] : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $itemBackgroundColor = isset($attributes['itemBackgroundColor']) ? sanitize_hex_color($attributes['itemBackgroundColor']) : '';
    $itemBorderColor    = isset($attributes['itemBorderColor']) ? sanitize_hex_color($attributes['itemBorderColor']) : '';   
    $itemBoxShadowColor = isset($attributes['itemBoxShadowColor']) ? sanitize_hex_color($attributes['itemBoxShadowColor']) : '';
    $itemGap      = isset($attributes['itemGap']) ? absint($attributes['itemGap']) : 30;

    // Content Box
    $contentitemPaddingNew = isset($attributes['contentitemPaddingNew']) ? $attributes['contentitemPaddingNew'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $contentitemMarginNew = isset($attributes['contentitemMarginNew']) ? $attributes['contentitemMarginNew'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $contentBorderWidth = isset($attributes['contentBorderWidth']) ? $attributes['contentBorderWidth'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $contentNormalBorderType = isset($attributes['contentnormalBorderType']) ? sanitize_text_field($attributes['contentnormalBorderType']) : '';
    $contentBgColor    = isset($attributes['contentBgColor']) ? sanitize_hex_color($attributes['contentBgColor']) : '';   
    $contentBorderColor = isset($attributes['contentBorderColor']) ? sanitize_hex_color($attributes['contentBorderColor']) : '';
    // Thumbnail
    $thumbnailMargin = isset($attributes['thumbnailMargin']) ? $attributes['thumbnailMargin'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $thumbnailPadding = isset($attributes['thumbnailPadding']) ? $attributes['thumbnailPadding'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $thumbnailBorderRadius = isset($attributes['thumbnailBorderRadius']) ? $attributes['thumbnailBorderRadius'] : ['top' => '5', 'right' => '5', 'bottom' => '5', 'left' => '5'];

    // Post Title
    $postTitleFontSize      = isset($attributes['postTitleFontSize']) ? absint($attributes['postTitleFontSize']) : 24;
    $postTitleLineHeight    = isset($attributes['postTitleLineHeight']) ? floatval($attributes['postTitleLineHeight']) : '';
    $postTitleLetterSpacing = isset($attributes['postTitleLetterSpacing']) ? floatval($attributes['postTitleLetterSpacing']) : '';
    $postTitleFontWeight    = isset($attributes['postTitleFontWeight']) ? sanitize_text_field($attributes['postTitleFontWeight']) : '600';
    $postTitleAlignment     = isset($attributes['postTitleAlignment']) ? sanitize_text_field($attributes['postTitleAlignment']) : 'start';
    $postTitleColor         = isset($attributes['postTitleColor']) ? sanitize_hex_color($attributes['postTitleColor']) : '';
    $postTitleBgColor       = isset($attributes['postTitleBgColor']) ? sanitize_hex_color($attributes['postTitleBgColor']) : ''; 
    $postTitleHoverColor    = isset($attributes['postTitleHoverColor']) ? sanitize_hex_color($attributes['postTitleHoverColor']) : '';
    $postTitleHoverBgColor  = isset($attributes['postTitleHoverBgColor']) ? sanitize_hex_color($attributes['postTitleHoverBgColor']) : '';
    $postTitleMargin  = isset($attributes['postTitleMargin']) ? array_map('sanitize_text_field', $attributes['postTitleMargin']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $postTitlePadding = isset($attributes['postTitlePadding']) ? array_map('sanitize_text_field', $attributes['postTitlePadding']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];

    // Excerpt
    $excerptFontSize = isset($attributes['excerptFontSize']) ? absint($attributes['excerptFontSize']) : '';
    $excerptLineHeight = isset($attributes['excerptLineHeight']) ? floatval($attributes['excerptLineHeight']) : '';
    $excerptLetterSpacing = isset($attributes['excerptLetterSpacing']) ? floatval($attributes['excerptLetterSpacing']) : '';
    $excerptFontWeight = isset($attributes['excerptFontWeight']) ? sanitize_text_field($attributes['excerptFontWeight']) : '';
    $excerptAlignment = isset($attributes['excerptAlignment']) ? sanitize_text_field($attributes['excerptAlignment']) : '';
    $excerptMargin = isset($attributes['excerptMargin']) ? array_map('sanitize_text_field', $attributes['excerptMargin']) : ['top' => '10', 'right' => '0', 'bottom' => '10', 'left' => '0'];
    $excerptPadding = isset($attributes['excerptPadding']) ? array_map('sanitize_text_field', $attributes['excerptPadding']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $excerptColor = isset($attributes['excerptColor']) ? sanitize_hex_color($attributes['excerptColor']) : '';
    $excerptBgColor = isset($attributes['excerptBgColor']) ? sanitize_hex_color($attributes['excerptBgColor']) : '';
    $excerptBorderType = isset($attributes['excerptBorderType']) ? sanitize_text_field($attributes['excerptBorderType']) : '';
    $excerptHoverColor = isset($attributes['excerptHoverColor']) ? sanitize_hex_color($attributes['excerptHoverColor']) : '';
    $excerptHoverBgColor = isset($attributes['excerptHoverBgColor']) ? sanitize_hex_color($attributes['excerptHoverBgColor']) : '';
    $excerptHoverBorderColor = isset($attributes['excerptHoverBorderColor']) ? sanitize_hex_color($attributes['excerptHoverBorderColor']) : '';

    // Meta Data Attributes
    $metaAlignment = isset($attributes['metaAlignment']) ? sanitize_text_field($attributes['metaAlignment']) : '';
    $metaMarginNew = isset($attributes['metaMarginNew']) ? $attributes['metaMarginNew'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $metaPadding = isset($attributes['metaPadding']) ? $attributes['metaPadding'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $metaTextColor = isset($attributes['metaTextColor']) ? sanitize_hex_color($attributes['metaTextColor']) : '';
    $separatorColor = isset($attributes['separatorColor']) ? sanitize_hex_color($attributes['separatorColor']) : '';
    $metaFontSize = isset($attributes['metaFontSize']) ? absint($attributes['metaFontSize']) : '15';
    $metaIconColor = isset($attributes['metaIconColor']) ? sanitize_hex_color($attributes['metaIconColor']) : '';
    
    // Button Alignment
    $buttonAlignment = isset($attributes['buttonAlignment']) ? sanitize_text_field($attributes['buttonAlignment']) : 'start';
    $buttonMarginNew = isset($attributes['buttonMarginNew']) ? array_map('sanitize_text_field', $attributes['buttonMarginNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $buttonPaddingNew = isset($attributes['buttonPaddingNew']) ? array_map('sanitize_text_field', $attributes['buttonPaddingNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $buttonFontSize = isset($attributes['buttonFontSize']) ? absint($attributes['buttonFontSize']) : '';
    $buttonBorderWidth = isset($attributes['buttonBorderWidth']) ? array_map('sanitize_text_field', $attributes['buttonBorderWidth']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $buttonFontWeight = isset($attributes['buttonFontWeight']) ? sanitize_text_field($attributes['buttonFontWeight']) : '';
    $buttonTextColor = isset($attributes['buttonTextColor']) ? sanitize_hex_color($attributes['buttonTextColor']) : '';
    $buttonBackgroundColor = isset($attributes['buttonBackgroundColor']) ? sanitize_hex_color($attributes['buttonBackgroundColor']) : '';
    $buttonBorderType = isset($attributes['buttonBorderType']) ? sanitize_text_field($attributes['buttonBorderType']) : '';
    $buttonBorderRadius = isset($attributes['buttonBorderRadius']) ? array_map('sanitize_text_field', $attributes['buttonBorderRadius']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $buttonHoverTextColor = isset($attributes['buttonHoverTextColor']) ? sanitize_hex_color($attributes['buttonHoverTextColor']) : '';
    $buttonHoverBackgroundColor = isset($attributes['buttonHoverBackgroundColor']) ? sanitize_hex_color($attributes['buttonHoverBackgroundColor']) : ''; 
    $buttonBorderColor = isset($attributes['buttonBorderColor']) ? sanitize_hex_color($attributes['buttonBorderColor']) : '';
    $buttonHoverBorderColor = isset($attributes['buttonHoverBorderColor']) ? sanitize_hex_color($attributes['buttonHoverBorderColor']) : '';
    // Pagination Attributes
    $paginationAlignment = isset($attributes['paginationAlignment']) ? sanitize_text_field($attributes['paginationAlignment']) : 'center';
    $paginationMarginNew = isset($attributes['paginationMarginNew']) ? array_map('sanitize_text_field', $attributes['paginationMarginNew']) : ['top' => '40', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $paginationPaddingNew = isset($attributes['paginationPaddingNew']) ? array_map('sanitize_text_field', $attributes['paginationPaddingNew']) : ['top' => '0', 'right' => '20', 'bottom' => '0', 'left' => '20'];
    $paginationBorderStyle = isset($attributes['paginationBorderStyle']) ? sanitize_text_field($attributes['paginationBorderStyle']) : 'solid';
    $paginationFontSize = isset($attributes['paginationFontSize']) ? absint($attributes['paginationFontSize']) : '16';
    $paginationBorderWidthNew = isset($attributes['paginationBorderWidthNew']) ? array_map('sanitize_text_field', $attributes['paginationBorderWidthNew']) : ['top' => '1', 'right' => '1', 'bottom' => '1', 'left' => '1'];
    
    $paginationBorderRadius = isset($attributes['paginationBorderRadius']) ? array_map('sanitize_text_field', $attributes['paginationBorderRadius']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $paginationGap = isset($attributes['paginationGap']) ? absint($attributes['paginationGap']) : 20;
    $paginationTextColor = isset($attributes['paginationTextColor']) ? sanitize_hex_color($attributes['paginationTextColor']) : '#6a6d7a';
    $paginationBackgroundColor = isset($attributes['paginationBackgroundColor']) ? sanitize_hex_color($attributes['paginationBackgroundColor']) : '';
    $paginationBorderColor = isset($attributes['paginationBorderColor']) ? sanitize_hex_color($attributes['paginationBorderColor']) : '#eaeaea';
    $paginationHoverTextColor = isset($attributes['paginationHoverTextColor']) ? sanitize_hex_color($attributes['paginationHoverTextColor']) : '#ffffff';
    $paginationHoverBackgroundColor = isset($attributes['paginationHoverBackgroundColor']) ? sanitize_hex_color($attributes['paginationHoverBackgroundColor']) : '#007aff';
    $paginationHoverBorderColor = isset($attributes['paginationHoverBorderColor']) ? sanitize_hex_color($attributes['paginationHoverBorderColor']) : '#007aff';
    $paginationActiveTextColor = isset($attributes['paginationActiveTextColor']) ? sanitize_hex_color($attributes['paginationActiveTextColor']) : '#ffffff';
    $paginationActiveBackgroundColor = isset($attributes['paginationActiveBackgroundColor']) ? sanitize_hex_color($attributes['paginationActiveBackgroundColor']) : '#007aff';
    $paginationActiveBorderColor = isset($attributes['paginationActiveBorderColor']) ? sanitize_hex_color($attributes['paginationActiveBorderColor']) : '#007aff';

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
    // GRID COLUMNS
    $gridColumns1 = ($gridLayoutStyle === 'style1' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns2 = ($gridLayoutStyle === 'style2' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns3 = ($gridLayoutStyle === 'style3' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns4 = ($gridLayoutStyle === 'style4' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns5 = ($gridLayoutStyle === 'style5' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns6 = ($gridLayoutStyle === 'style6' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns7 = ($gridLayoutStyle === 'style7' && $gridColumns == null)
              ? 4 : $gridColumns; 
    $gridColumns8 = ($gridLayoutStyle === 'style8' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns9 = ($gridLayoutStyle === 'style9' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns10 = ($gridLayoutStyle === 'style10' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns11 = ($gridLayoutStyle === 'style11' && $gridColumns == null)
              ? 3 : $gridColumns; 
    $gridColumns12 = ($gridLayoutStyle === 'style12' && $gridColumns == null)
              ? 3 : $gridColumns; 

    // GRID COLUMNS
    $thumbnailSize1 = ($gridLayoutStyle === 'style1' && $thumbnailSize == null)
              ? 'fancy_post_custom_size' : $thumbnailSize; 
    $thumbnailSize2 = ($gridLayoutStyle === 'style2' && $thumbnailSize == null)
              ? 'fancy_post_custom_size' : $thumbnailSize; 
    $thumbnailSize3 = ($gridLayoutStyle === 'style3' && $thumbnailSize == null)
              ? 'fancy_post_custom_size' : $thumbnailSize; 
    $thumbnailSize4 = ($gridLayoutStyle === 'style4' && $thumbnailSize == null)
              ? 'fancy_post_landscape' : $thumbnailSize; 
    $thumbnailSize5 = ($gridLayoutStyle === 'style5' && $thumbnailSize == null)
              ? 'fancy_post_square' : $thumbnailSize; 
    $thumbnailSize6 = ($gridLayoutStyle === 'style6' && $thumbnailSize == null)
              ? 'fancy_post_landscape' : $thumbnailSize; 
    $thumbnailSize7 = ($gridLayoutStyle === 'style7' && $thumbnailSize == null)
              ? 'fancy_post_square' : $thumbnailSize; 
    $thumbnailSize8 = ($gridLayoutStyle === 'style8' && $thumbnailSize == null)
              ? 'fancy_post_landscape' : $thumbnailSize; 
    $thumbnailSize9 = ($gridLayoutStyle === 'style9' && $thumbnailSize == null)
              ? 'fancy_post_landscape' : $thumbnailSize; 
    $thumbnailSize10 = ($gridLayoutStyle === 'style10' && $thumbnailSize == null)
              ? 'fancy_post_landscape' : $thumbnailSize; 
    $thumbnailSize11 = ($gridLayoutStyle === 'style11' && $thumbnailSize == null)
              ? 'fancy_post_landscape' : $thumbnailSize; 
    $thumbnailSize12 = ($gridLayoutStyle === 'style12' && $thumbnailSize == null)
              ? 'fancy_post_square' : $thumbnailSize;
    // MetaAlignment
    $metaAlignment1 = ($gridLayoutStyle === 'style1' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment2 = ($gridLayoutStyle === 'style2' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment3 = ($gridLayoutStyle === 'style3' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment4 = ($gridLayoutStyle === 'style4' && $metaAlignment == null)
              ? 'center' : $metaAlignment; 
    $metaAlignment5 = ($gridLayoutStyle === 'style5' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment6 = ($gridLayoutStyle === 'style6' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment7 = ($gridLayoutStyle === 'style7' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment8 = ($gridLayoutStyle === 'style8' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment9 = ($gridLayoutStyle === 'style9' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment10 = ($gridLayoutStyle === 'style10' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment11 = ($gridLayoutStyle === 'style11' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    $metaAlignment12 = ($gridLayoutStyle === 'style12' && $metaAlignment == null)
              ? 'start' : $metaAlignment; 
    // ExcerptAlignment
    $excerptAlignment1 = ($gridLayoutStyle === 'style1' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment2 = ($gridLayoutStyle === 'style2' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment3 = ($gridLayoutStyle === 'style3' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment4 = ($gridLayoutStyle === 'style4' && $excerptAlignment == null)
              ? 'center' : $excerptAlignment; 
    $excerptAlignment5 = ($gridLayoutStyle === 'style5' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment6 = ($gridLayoutStyle === 'style6' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment7 = ($gridLayoutStyle === 'style7' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment8 = ($gridLayoutStyle === 'style8' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment9 = ($gridLayoutStyle === 'style9' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment10 = ($gridLayoutStyle === 'style10' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment11 = ($gridLayoutStyle === 'style11' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    $excerptAlignment12 = ($gridLayoutStyle === 'style12' && $excerptAlignment == null)
              ? 'start' : $excerptAlignment; 
    // buttonStyle
    $buttonStyle1 = ($gridLayoutStyle === 'style1' && $buttonStyle == null)
              ? 'fpg-flat' : $buttonStyle; 
    $buttonStyle2 = ($gridLayoutStyle === 'style2' && $buttonStyle == null)
              ? 'fpg-border' : $buttonStyle; 
    $buttonStyle3 = ($gridLayoutStyle === 'style3' && $buttonStyle == null)
              ? 'fpg-filled' : $buttonStyle; 
    $buttonStyle5 = ($gridLayoutStyle === 'style5' && $buttonStyle == null)
              ? 'fpg-flat' : $buttonStyle; 
    $buttonStyle6 = ($gridLayoutStyle === 'style6' && $buttonStyle == null)
              ? 'fpg-border' : $buttonStyle; 
    $buttonStyle10 = ($gridLayoutStyle === 'style10' && $buttonStyle == null)
              ? 'fpg-filled' : $buttonStyle; 
    $buttonStyle11 = ($gridLayoutStyle === 'style11' && $buttonStyle == null)
              ? 'fpg-border' : $buttonStyle; 
    $buttonStyle12 = ($gridLayoutStyle === 'style12' && $buttonStyle == null)
              ? 'fpg-filled' : $buttonStyle;  

    // Run the query
    $query = new WP_Query($query_args);
    
    if (!$query->have_posts()) {
        return '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
    }
    if ($gridLayoutStyle === 'style1') {
        $output = '<div class="rs-blog-layout-5 ' . esc_attr($gridLayoutStyle) . '" style="display: grid; grid-template-columns: repeat(' . esc_attr($gridColumns1) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style2') {
        $output = '<div class="rs-blog-layout-6 grey ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns2) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style3') {
        $output = '<div class="rs-blog-layout-28  ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns3) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style4') {
        $output = '<div class="rs-blog-layout-30  ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns4) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style5') {
        $output = '<div class="rs-blog-layout-12 ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns5) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style7') {
        $output = '<div class="rs-blog-layout-14 grey ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns7) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style8') {
        $output = '<div class="rs-blog-layout-15 ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns8) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style9') {
        $output = '<div class="rs-blog-layout-16 ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns9) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style10') {
        $output = '<div class="rs-blog-layout-19' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns10) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style11') {
        $output = '<div class="rs-blog-layout-21  ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns11) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
    }else if ($gridLayoutStyle === 'style12') {
        $output = '<div class="rs-blog-layout-26  ' . esc_attr($gridLayoutStyle) . '" style="display: grid; 
                    grid-template-columns: repeat(' . esc_attr($gridColumns12) . ', 1fr); ';
        
        // Background Color
        if (!empty($sectionBgColor)) {
            $output .= 'background-color: ' . esc_attr($sectionBgColor) . '; ';
        }
        // GAP
        if (!empty($itemGap)) {
            $output .= 'gap: ' . (is_numeric($itemGap) ? $itemGap . 'px' : esc_attr($itemGap)) . '; ';
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
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $permalink = get_permalink($post_id);
            $title = get_the_title();
            $date = get_the_date();
            $getdate = get_the_date('M j, Y', $post_id);
            $author = get_the_author();
            $categories = get_the_category_list(', ');
            $tags = get_the_tag_list('', ', ');
            $comments_count = get_comments_number();
            if ($gridLayoutStyle === 'style1') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize1, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style2') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize2, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style3') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize3, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style4') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize4, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style5') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize5, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style6') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize6, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style7') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize7, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style8') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize8, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style9') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize9, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style10') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize10, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style11') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize11, ['class' => 'fancy-post-thumbnail']);}
            if ($gridLayoutStyle === 'style12') {
            $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize12, ['class' => 'fancy-post-thumbnail']);}

            // Title Crop
            if ($titleCropBy === 'word') {
                $titleArray = explode(' ', $title);
                $croppedTitle = implode(' ', array_slice($titleArray, 0, (int) $titleLength));
            } elseif ($titleCropBy === 'cha') {
                $croppedTitle = mb_substr($title, 0, $titleLength);
            } else {
                $croppedTitle = $title; // fallback
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
                
                $output .= '<div class="rs-blog__single align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';

                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a></div>';
                }
                // END Thumbnail
                

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 20px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<ul class="meta-data-list align-' . $metaAlignment1 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Icon
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-calendar-alt" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($getdate) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Category
                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                        }

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-tags" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="';
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-comments" style="';
                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }
                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }
                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; // Close meta-data-list               
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Excerpt
                if ($showPostExcerpt) {
                    $excerptStyles = '';

                    // Order
                    if (!empty($excerptOrder)) {
                        $excerptStyles .= 'order: ' . esc_attr($excerptOrder) . '; ';
                    }

                    // Typography
                    if (!empty($excerptFontSize)) {
                        $excerptStyles .= 'font-size: ' . esc_attr($excerptFontSize) . 'px; ';
                    }

                    if (!empty($excerptLineHeight)) {
                        $excerptStyles .= 'line-height: ' . esc_attr($excerptLineHeight) . '; ';
                    }

                    if (!empty($excerptLetterSpacing)) {
                        $excerptStyles .= 'letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; ';
                    }

                    if (!empty($excerptFontWeight)) {
                        $excerptStyles .= 'font-weight: ' . esc_attr($excerptFontWeight) . '; ';
                    }

                    if (!empty($excerptColor)) {
                        $excerptStyles .= 'color: ' . esc_attr($excerptColor) . '; ';
                    }

                    if (!empty($excerptBgColor)) {
                        $excerptStyles .= 'background-color: ' . esc_attr($excerptBgColor) . '; ';
                    }

                    if (!empty($excerptBorderType)) {
                        $excerptStyles .= 'border-style: ' . esc_attr($excerptBorderType) . '; ';
                    }

                    // Margin
                    if (!empty($excerptMargin['top']) || !empty($excerptMargin['right']) || !empty($excerptMargin['bottom']) || !empty($excerptMargin['left'])) {
                        $excerptStyles .= 'margin: ' .
                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' .
                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' .
                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' .
                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($excerptPadding['top']) || !empty($excerptPadding['right']) || !empty($excerptPadding['bottom']) || !empty($excerptPadding['left'])) {
                        $excerptStyles .= 'padding: ' .
                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' .
                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' .
                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' .
                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . '; ';
                    }

                    // Handle hover logic conditionally
                    $hoverIn = '';
                    $hoverOut = '';

                    if (!empty($excerptHoverColor)) {
                        $hoverIn .= 'this.style.color=\'' . esc_attr($excerptHoverColor) . '\';';
                        $hoverOut .= 'this.style.color=\'' . esc_attr($excerptColor) . '\';';
                    }

                    if (!empty($excerptHoverBgColor)) {
                        $hoverIn .= 'this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';';
                        $hoverOut .= 'this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';';
                    }

                    if (!empty($excerptHoverBorderColor)) {
                        $hoverIn .= 'this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';';
                        $hoverOut .= 'this.style.borderColor=\'inherit\';';
                    }

                    $output .= '<div class="fpg-excerpt' . ' align-' . esc_attr($excerptAlignment1) . '" style="' . esc_attr(trim($excerptStyles)) . '"';

                    if (!empty($hoverIn) || !empty($hoverOut)) {
                        $output .= ' onmouseover="' . esc_attr($hoverIn) . '"';
                        $output .= ' onmouseout="' . esc_attr($hoverOut) . '"';
                    }

                    $output .= '>';
                    $output .= '<p>' . esc_html($excerpt) . '</p>';
                    $output .= '</div>';
                }
                // End Excerpt

                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="rs-link read-more ' . esc_attr($buttonStyle1) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style2') {
                // Full post layout
                
                $output .= '<div class="rs-blog__single align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 20px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<ul class="meta-data-list align-' . $metaAlignment2 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Icon
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-calendar-alt" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($getdate) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Category
                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                        }

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-tags" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="';
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-comments" style="';
                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }
                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }
                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; // Close meta-data-list               
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Excerpt
                if ($showPostExcerpt) {
                    $excerptStyles = '';

                    // Order
                    if (!empty($excerptOrder)) {
                        $excerptStyles .= 'order: ' . esc_attr($excerptOrder) . '; ';
                    }

                    // Typography
                    if (!empty($excerptFontSize)) {
                        $excerptStyles .= 'font-size: ' . esc_attr($excerptFontSize) . 'px; ';
                    }

                    if (!empty($excerptLineHeight)) {
                        $excerptStyles .= 'line-height: ' . esc_attr($excerptLineHeight) . '; ';
                    }

                    if (!empty($excerptLetterSpacing)) {
                        $excerptStyles .= 'letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; ';
                    }

                    if (!empty($excerptFontWeight)) {
                        $excerptStyles .= 'font-weight: ' . esc_attr($excerptFontWeight) . '; ';
                    }

                    if (!empty($excerptColor)) {
                        $excerptStyles .= 'color: ' . esc_attr($excerptColor) . '; ';
                    }

                    if (!empty($excerptBgColor)) {
                        $excerptStyles .= 'background-color: ' . esc_attr($excerptBgColor) . '; ';
                    }

                    if (!empty($excerptBorderType)) {
                        $excerptStyles .= 'border-style: ' . esc_attr($excerptBorderType) . '; ';
                    }

                    // Margin
                    if (!empty($excerptMargin['top']) || !empty($excerptMargin['right']) || !empty($excerptMargin['bottom']) || !empty($excerptMargin['left'])) {
                        $excerptStyles .= 'margin: ' .
                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' .
                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' .
                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' .
                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($excerptPadding['top']) || !empty($excerptPadding['right']) || !empty($excerptPadding['bottom']) || !empty($excerptPadding['left'])) {
                        $excerptStyles .= 'padding: ' .
                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' .
                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' .
                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' .
                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . '; ';
                    }

                    // Handle hover logic conditionally
                    $hoverIn = '';
                    $hoverOut = '';

                    if (!empty($excerptHoverColor)) {
                        $hoverIn .= 'this.style.color=\'' . esc_attr($excerptHoverColor) . '\';';
                        $hoverOut .= 'this.style.color=\'' . esc_attr($excerptColor) . '\';';
                    }

                    if (!empty($excerptHoverBgColor)) {
                        $hoverIn .= 'this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';';
                        $hoverOut .= 'this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';';
                    }

                    if (!empty($excerptHoverBorderColor)) {
                        $hoverIn .= 'this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';';
                        $hoverOut .= 'this.style.borderColor=\'inherit\';';
                    }

                    $output .= '<div class="fpg-excerpt' . ' align-' . esc_attr($excerptAlignment1) . '" style="' . esc_attr(trim($excerptStyles)) . '"';

                    if (!empty($hoverIn) || !empty($hoverOut)) {
                        $output .= ' onmouseover="' . esc_attr($hoverIn) . '"';
                        $output .= ' onmouseout="' . esc_attr($hoverOut) . '"';
                    }

                    $output .= '>';
                    $output .= '<p>' . esc_html($excerpt) . '</p>';
                    $output .= '</div>';
                }
                // End Excerpt

                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="rs-link read-more ' . esc_attr($buttonStyle2) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="display: block; overflow: hidden;';

                    if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                        $output .= ' border-radius: ' .
                            (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                            (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                    }

                    $output .= '">';
                    $output .= $thumbnail . '</a></div>';
                }
                // END Thumbnail
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            
            else if ($gridLayoutStyle === 'style3') {
                // Full post layout
            
                $output .= '<div class="rs-blog-layout-28-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';

                    // Thumbnail
                    if ($thumbnail && $showThumbnail) {

                        $output .= '<div class="rs-thumb" style="';
                            // Margin
                            if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                                $output .= 'margin: ' . 
                                    (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                                    (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                                    (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                                    (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                            }

                            // Padding
                            if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                                $output .= 'padding: ' . 
                                    (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                                    (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                                    (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                                    (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                            }

                        $output .= '">';
                        

                        // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a>';

                        // Now Insert Meta Data inside the Thumbnail
                        if ($showMetaData) {
                            $output .= '<div class="rs-meta align-' . $metaAlignment3 . '">';
                                $output .= '<ul class="meta-data-list align-' . $metaAlignment3 . ' " style="';  
                                    // Margin
                                    if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                                        $output .= 'margin: ' .
                                            (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                            (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                            (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                            (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                                    }
                                    // Padding
                                    if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                                        $output .= 'padding: ' .
                                            (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                            (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                            (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                            (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                                    }   
                                    
                                    // Color
                                    if (!empty($metaTextColor)) {
                                        $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                                    }
                                    // Order
                                    if (!empty($metaOrder)) {
                                        $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                                    }
                                $output .= '">';

                                    $meta_items = [];

                                    // Date
                                    if ($showPostDate) {
                                        $meta = '<li class="meta-date" style="';

                                        // Color
                                        if (!empty($metaTextColor)) {
                                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                                        }

                                        // Font size
                                        if (!empty($metaFontSize)) {
                                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                        }

                                        $meta .= '">';

                                        // Icon
                                        if ($showPostDateIcon && $showMetaIcon) {
                                            $meta .= '<i class="fas fa-calendar-alt" style="';

                                            if (!empty($metaIconColor)) {
                                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                                            }

                                            if (!empty($metaFontSize)) {
                                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                            }

                                            $meta .= '"></i> ';
                                        }

                                        $meta .= esc_html($getdate) . '</li>';
                                        $meta_items[] = $meta;
                                    }
                                    // Author
                                    if ($showPostAuthor) {
                                        $meta = '<li class="meta-author" style="';

                                        if (!empty($metaTextColor)) {
                                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                                        }

                                        if (!empty($metaFontSize)) {
                                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                        }

                                        $meta .= '">';

                                        if ($showPostAuthorIcon && $showMetaIcon) {
                                            $meta .= '<i class="fas fa-user" style="';

                                            if (!empty($metaIconColor)) {
                                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                                            }

                                            if (!empty($metaFontSize)) {
                                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                            }

                                            $meta .= '"></i> ';
                                        }

                                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                                        $meta_items[] = $meta;
                                    }
                                    // Category
                                    if ($showPostCategory) {
                                        $meta = '<li class="meta-categories" style="';

                                        if (!empty($metaTextColor)) {
                                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                                        }

                                        if (!empty($metaFontSize)) {
                                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                        }

                                        $meta .= '">';

                                        if ($showPostCategoryIcon && $showMetaIcon) {
                                            $meta .= '<i class="fas fa-folder" style="';

                                            if (!empty($metaIconColor)) {
                                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                                            }

                                            if (!empty($metaFontSize)) {
                                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                            }

                                            $meta .= '"></i> ';
                                        }

                                        // Get category names without links
                                        $categories_list = get_the_category($post_id);
                                        if (!empty($categories_list)) {
                                            $category_names = array();
                                            foreach ($categories_list as $category) {
                                                $category_names[] = esc_html($category->name);
                                            }
                                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                                        }

                                        $meta .= '</li>';
                                        $meta_items[] = $meta;
                                    }
                                    // Tags
                                    if ($showPostTags && !empty($tags)) {
                                        $meta = '<li class="meta-tags" style="';

                                        if (!empty($metaTextColor)) {
                                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                                        }

                                        if (!empty($metaFontSize)) {
                                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                        }

                                        $meta .= '">';

                                        if ($showPostTagsIcon && $showMetaIcon) {
                                            $meta .= '<i class="fas fa-tags" style="';

                                            if (!empty($metaIconColor)) {
                                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                                            }

                                            if (!empty($metaFontSize)) {
                                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                            }

                                            $meta .= '"></i> ';
                                        }

                                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                                        $meta_items[] = $meta;
                                    }
                                    // Comment Count
                                    if ($showPostCommentsCount) {
                                        $meta = '<li class="meta-comment-count" style="';
                                        if (!empty($metaTextColor)) {
                                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                                        }
                                        if (!empty($metaFontSize)) {
                                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                        }

                                        $meta .= '">';

                                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                                            $meta .= '<i class="fas fa-comments" style="';
                                            if (!empty($metaIconColor)) {
                                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                                            }
                                            if (!empty($metaFontSize)) {
                                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                            }
                                            $meta .= '"></i> ';
                                        }

                                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                                        $meta_items[] = $meta;
                                    }
                                    // Now join meta items with the separator
                                    if (!empty($meta_items)) {
                                        $separator = '';

                                        if ($metaSeperator !== '') {
                                            $separator = '';
                                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                                $separatorStyle = '';
                                                if (!empty($separatorColor)) {
                                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                                }
                                                if (!empty($metaFontSize)) {
                                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                                }

                                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                                            }
                                        }

                                        $output .= implode($separator, $meta_items);
                                    }
                                $output .= '</ul>'; // ul Close 
                            $output .= '</div>'; // Close meta-data-list
                        }

                        $output .= '</div>'; // Close fancy-post-image rs-thumb
                    }

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 20px 30px 30px 30px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';
                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Excerpt
                if ($showPostExcerpt) {
                    $excerptStyles = '';

                    // Order
                    if (!empty($excerptOrder)) {
                        $excerptStyles .= 'order: ' . esc_attr($excerptOrder) . '; ';
                    }

                    // Typography
                    if (!empty($excerptFontSize)) {
                        $excerptStyles .= 'font-size: ' . esc_attr($excerptFontSize) . 'px; ';
                    }

                    if (!empty($excerptLineHeight)) {
                        $excerptStyles .= 'line-height: ' . esc_attr($excerptLineHeight) . '; ';
                    }

                    if (!empty($excerptLetterSpacing)) {
                        $excerptStyles .= 'letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; ';
                    }

                    if (!empty($excerptFontWeight)) {
                        $excerptStyles .= 'font-weight: ' . esc_attr($excerptFontWeight) . '; ';
                    }

                    if (!empty($excerptColor)) {
                        $excerptStyles .= 'color: ' . esc_attr($excerptColor) . '; ';
                    }

                    if (!empty($excerptBgColor)) {
                        $excerptStyles .= 'background-color: ' . esc_attr($excerptBgColor) . '; ';
                    }

                    if (!empty($excerptBorderType)) {
                        $excerptStyles .= 'border-style: ' . esc_attr($excerptBorderType) . '; ';
                    }

                    // Margin
                    if (!empty($excerptMargin['top']) || !empty($excerptMargin['right']) || !empty($excerptMargin['bottom']) || !empty($excerptMargin['left'])) {
                        $excerptStyles .= 'margin: ' .
                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' .
                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' .
                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' .
                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($excerptPadding['top']) || !empty($excerptPadding['right']) || !empty($excerptPadding['bottom']) || !empty($excerptPadding['left'])) {
                        $excerptStyles .= 'padding: ' .
                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' .
                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' .
                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' .
                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . '; ';
                    }

                    // Handle hover logic conditionally
                    $hoverIn = '';
                    $hoverOut = '';

                    if (!empty($excerptHoverColor)) {
                        $hoverIn .= 'this.style.color=\'' . esc_attr($excerptHoverColor) . '\';';
                        $hoverOut .= 'this.style.color=\'' . esc_attr($excerptColor) . '\';';
                    }

                    if (!empty($excerptHoverBgColor)) {
                        $hoverIn .= 'this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';';
                        $hoverOut .= 'this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';';
                    }

                    if (!empty($excerptHoverBorderColor)) {
                        $hoverIn .= 'this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';';
                        $hoverOut .= 'this.style.borderColor=\'inherit\';';
                    }

                    $output .= '<div class="fpg-excerpt' . ' align-' . esc_attr($excerptAlignment3) . '" style="' . esc_attr(trim($excerptStyles)) . '"';

                    if (!empty($hoverIn) || !empty($hoverOut)) {
                        $output .= ' onmouseover="' . esc_attr($hoverIn) . '"';
                        $output .= ' onmouseout="' . esc_attr($hoverOut) . '"';
                    }

                    $output .= '>';
                    $output .= '<p>' . esc_html($excerpt) . '</p>';
                    $output .= '</div>';
                }
                // End Excerpt
                
                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle3) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style4') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-30-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    if ( !empty($itemPadding['top']) || !empty($itemPadding['right']) ||  !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'margin: ' .(isset($itemPadding['top']) && $itemPadding['top'] !== '' ? (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) : '0px') . ' ' . (isset($itemPadding['right']) && $itemPadding['right'] !== '' ? (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) : '0px') . ' ' . (isset($itemPadding['bottom']) && $itemPadding['bottom'] !== '' ? (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) : '0px') . ' ' . (isset($itemPadding['left']) && $itemPadding['left'] !== '' ? (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 20px 20px 15px 20px;';
                    }
                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';
                
                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                        // Margin
                        if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                            $output .= 'margin: ' . 
                                (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                                (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                                (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                                (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                        }

                        // Padding
                        if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                            $output .= 'padding: ' . 
                                (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                                (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                                (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                                (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                        }

                        $output .= '">';

                        // Anchor with optional border-radius and overflow
                        $output .= '<a href="' . esc_url($permalink) . '" style="';

                            if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                                $output .= ' border-radius: ' .
                                    (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                    (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                    (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                    (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                            }

                        $output .= '">';
                        $output .= $thumbnail . '</a>';

                        // Date
                        if ($showPostDate) {
                            // Build dynamic style for the container
                            $style = '';
                            if (!empty($metaTextColor)) {
                                $style .= 'color:' . esc_attr($metaTextColor) . ';';
                            }
                            if (!empty($metaFontSize)) {
                                $style .= 'font-size:' . esc_attr($metaFontSize) . 'px;';
                            }

                            $output .= '<div class="meta-date" style="' . $style . '">';
                            $output .= '<span>';

                            // Build dynamic style for the icon
                            $iconStyle = '';
                            if (!empty($metaIconColor)) {
                                $iconStyle .= 'color:' . esc_attr($metaIconColor) . ';';
                            }
                            if (!empty($metaFontSize)) {
                                $iconStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px;';
                            }

                            if ($showPostDateIcon && $showMetaIcon) {
                                $output .= '<i class="fas fa-calendar-alt" style="' . $iconStyle . '"></i> ';
                            }

                            $output .= esc_html($getdate);
                            $output .= '</span>';
                            $output .= '</div>';
                        }

                        $output .= '</div>'; // Close fancy-post-image rs-thumb
                    }

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 20px 0px 20px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }
                // Now Insert Meta Data inside the Thumbnail
                if ($showMetaData) {
                    $output .= '<div class="rs-meta align-' . $metaAlignment4 . '">';
                    $output .= '<ul class="meta-data-list" style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Category
                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                        }

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-tags" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="';
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-comments" style="';
                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }
                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }
                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; // Close meta-data-list
                    $output .= '</div>'; // Close meta-data-list
                }
                // Excerpt
                if ($showPostExcerpt) {
                    $excerptStyles = '';

                    // Order
                    if (!empty($excerptOrder)) {
                        $excerptStyles .= 'order: ' . esc_attr($excerptOrder) . '; ';
                    }

                    // Typography
                    if (!empty($excerptFontSize)) {
                        $excerptStyles .= 'font-size: ' . esc_attr($excerptFontSize) . 'px; ';
                    }

                    if (!empty($excerptLineHeight)) {
                        $excerptStyles .= 'line-height: ' . esc_attr($excerptLineHeight) . '; ';
                    }

                    if (!empty($excerptLetterSpacing)) {
                        $excerptStyles .= 'letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; ';
                    }

                    if (!empty($excerptFontWeight)) {
                        $excerptStyles .= 'font-weight: ' . esc_attr($excerptFontWeight) . '; ';
                    }

                    if (!empty($excerptColor)) {
                        $excerptStyles .= 'color: ' . esc_attr($excerptColor) . '; ';
                    }

                    if (!empty($excerptBgColor)) {
                        $excerptStyles .= 'background-color: ' . esc_attr($excerptBgColor) . '; ';
                    }

                    if (!empty($excerptBorderType)) {
                        $excerptStyles .= 'border-style: ' . esc_attr($excerptBorderType) . '; ';
                    }

                    // Margin
                    if (!empty($excerptMargin['top']) || !empty($excerptMargin['right']) || !empty($excerptMargin['bottom']) || !empty($excerptMargin['left'])) {
                        $excerptStyles .= 'margin: ' .
                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' .
                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' .
                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' .
                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($excerptPadding['top']) || !empty($excerptPadding['right']) || !empty($excerptPadding['bottom']) || !empty($excerptPadding['left'])) {
                        $excerptStyles .= 'padding: ' .
                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' .
                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' .
                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' .
                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . '; ';
                    }

                    // Handle hover logic conditionally
                    $hoverIn = '';
                    $hoverOut = '';

                    if (!empty($excerptHoverColor)) {
                        $hoverIn .= 'this.style.color=\'' . esc_attr($excerptHoverColor) . '\';';
                        $hoverOut .= 'this.style.color=\'' . esc_attr($excerptColor) . '\';';
                    }

                    if (!empty($excerptHoverBgColor)) {
                        $hoverIn .= 'this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';';
                        $hoverOut .= 'this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';';
                    }

                    if (!empty($excerptHoverBorderColor)) {
                        $hoverIn .= 'this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';';
                        $hoverOut .= 'this.style.borderColor=\'inherit\';';
                    }

                    $output .= '<div class="fpg-excerpt' . ' align-' . esc_attr($excerptAlignment4) . '" style="' . esc_attr(trim($excerptStyles)) . '"';

                    if (!empty($hoverIn) || !empty($hoverOut)) {
                        $output .= ' onmouseover="' . esc_attr($hoverIn) . '"';
                        $output .= ' onmouseout="' . esc_attr($hoverOut) . '"';
                    }

                    $output .= '>';
                    $output .= '<p>' . esc_html($excerpt) . '</p>';
                    $output .= '</div>';
                }
                // End Excerpt

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            elseif ($gridLayoutStyle === 'style5') {
                // Full post layout
                $output .= '<div class="pre-blog-item style_12 pre-blog-meta-style2 default">';
                $output .= '<div class="blog-inner-wrap pre-thum-default pre-meta-blocks top align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 0px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';    
                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="pre-image-wrap" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a>';
                    if ($showPostDate) {
                        $output .= '<div class="pre-blog-meta" style="color:' . esc_attr($metaTextColor) . '; ">';
                        
                        $output .= '<span class="pre-date">' . esc_html(get_the_date('d')) . '</span>';
                        $output .= '<span class="pre-month"> ' . esc_html(get_the_date('F')) . '</span>'; 
                        $output .= '</div>';
                    }
                    $output .= '</div>';
                }
                
                // MAIN Content
                $output .= '<div class="pre-blog-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 75px 20px 25px 20px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<ul class="meta-data-list align-' . $metaAlignment5 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Category
                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                        }

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-tags" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="';
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-comments" style="';
                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }
                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }
                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; // Close meta-data-list               
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    
                    if ( !empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) ||  !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .(isset($postTitleMargin['top']) && $postTitleMargin['top'] !== '' ? (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) : '0px') . ' ' . (isset($postTitleMargin['right']) && $postTitleMargin['right'] !== '' ? (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) : '0px') . ' ' . (isset($postTitleMargin['bottom']) && $postTitleMargin['bottom'] !== '' ? (is_numeric($postTitleMargin['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) : '0px') . ' ' . (isset($postTitleMargin['left']) && $postTitleMargin['left'] !== '' ? (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $titleStyles .= 'margin: 0px 0px 28px 0px;';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'pre-post-title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Excerpt
                if ($showPostExcerpt) {
                    $excerptStyles = '';

                    // Order
                    if (!empty($excerptOrder)) {
                        $excerptStyles .= 'order: ' . esc_attr($excerptOrder) . '; ';
                    }

                    // Typography
                    if (!empty($excerptFontSize)) {
                        $excerptStyles .= 'font-size: ' . esc_attr($excerptFontSize) . 'px; ';
                    }

                    if (!empty($excerptLineHeight)) {
                        $excerptStyles .= 'line-height: ' . esc_attr($excerptLineHeight) . '; ';
                    }

                    if (!empty($excerptLetterSpacing)) {
                        $excerptStyles .= 'letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; ';
                    }

                    if (!empty($excerptFontWeight)) {
                        $excerptStyles .= 'font-weight: ' . esc_attr($excerptFontWeight) . '; ';
                    }

                    if (!empty($excerptColor)) {
                        $excerptStyles .= 'color: ' . esc_attr($excerptColor) . '; ';
                    }

                    if (!empty($excerptBgColor)) {
                        $excerptStyles .= 'background-color: ' . esc_attr($excerptBgColor) . '; ';
                    }

                    if (!empty($excerptBorderType)) {
                        $excerptStyles .= 'border-style: ' . esc_attr($excerptBorderType) . '; ';
                    }

                    // Margin
                    if (!empty($excerptMargin['top']) || !empty($excerptMargin['right']) || !empty($excerptMargin['bottom']) || !empty($excerptMargin['left'])) {
                        $excerptStyles .= 'margin: ' .
                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' .
                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' .
                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' .
                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($excerptPadding['top']) || !empty($excerptPadding['right']) || !empty($excerptPadding['bottom']) || !empty($excerptPadding['left'])) {
                        $excerptStyles .= 'padding: ' .
                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' .
                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' .
                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' .
                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . '; ';
                    }

                    // Handle hover logic conditionally
                    $hoverIn = '';
                    $hoverOut = '';

                    if (!empty($excerptHoverColor)) {
                        $hoverIn .= 'this.style.color=\'' . esc_attr($excerptHoverColor) . '\';';
                        $hoverOut .= 'this.style.color=\'' . esc_attr($excerptColor) . '\';';
                    }

                    if (!empty($excerptHoverBgColor)) {
                        $hoverIn .= 'this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';';
                        $hoverOut .= 'this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';';
                    }

                    if (!empty($excerptHoverBorderColor)) {
                        $hoverIn .= 'this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';';
                        $hoverOut .= 'this.style.borderColor=\'inherit\';';
                    }

                    $output .= '<div class="pre-content' . ' align-' . esc_attr($excerptAlignment5) . '" style="' . esc_attr(trim($excerptStyles)) . '"';

                    if (!empty($hoverIn) || !empty($hoverOut)) {
                        $output .= ' onmouseover="' . esc_attr($hoverIn) . '"';
                        $output .= ' onmouseout="' . esc_attr($hoverOut) . '"';
                    }

                    $output .= '>';
                    $output .= '<p>' . esc_html($excerpt) . '</p>';
                    $output .= '</div>';
                }
                // End Excerpt
               
                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="blog-btn-part align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="blog-btn icon-after read-more ' . esc_attr($buttonStyle5) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
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
                
                $output .= '<div class="rs-blog-layout-13-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';
                    // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a>';
                    if ($showPostDate) {
                        $output .= '<div class="pre-blog-meta" style="color:' . esc_attr($metaTextColor) . '; ">';
                        
                        $output .= '<span class="pre-date">' . esc_html(get_the_date('d')) . '</span>';
                        $output .= '<span class="pre-month"> ' . esc_html(get_the_date('F')) . '</span>'; 
                        $output .= '</div>';
                    }
                    $output .= '</div>';
                }
                
                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 0px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta">'; 
                    $output .= '<ul class="meta-data-list align-' . $metaAlignment6 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Author
                    
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author">';

                        // Author Avatar
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $author_id = get_the_author_meta('ID');
                            $avatar_size = !empty($metaFontSize) ? intval($metaFontSize) * 2 : 24; // Double the font size for avatar
                            $avatar = get_avatar($author_id, $avatar_size, '', '', [
                                'class' => 'author-avatar',
                                'style' => !empty($metaIconColor) ? 'vertical-align:middle; margin-right:8px; border-radius:50%; color:' . esc_attr($metaIconColor) . ';' : 'vertical-align:middle; margin-right:8px; border-radius:50%;',
                            ]);
                            $meta .= $avatar;
                        }

                        // Author Name
                        $meta .= '<span style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        $meta .= '<a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '" style="text-decoration:none; color:inherit;">';
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author);
                        $meta .= '</a>';

                        $meta .= '</span></li>';

                        $meta_items[] = $meta;
                    }
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="';

                        // Text color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Only year
                        $year = get_the_date('Y', $post_id); // Make sure $post_id is defined
                        $meta .= 'News in ' . esc_html($year);

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; 
                    $output .= '</div>';               
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }
                
                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="blog-btn icon-after read-more ' . esc_attr($buttonStyle6) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style7') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-14-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';
                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a></div>';
                }
                // END Thumbnail
                

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 0px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }
                // Meta Data
                if ($showMetaData) {
                            
                    $output .= '<div class="rs-meta align-' . $metaAlignment7 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<span class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Icon
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-calendar-alt" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($getdate) . '</span>';
                        $meta_items[] = $meta;
                    }

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<a class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</a>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }

                    $output .= '</div>'; // Close meta-data-list
                    
                }
                // End Meta Data

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style8') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-15-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';
                
                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 0px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';               

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }
                // Meta Data
                if ($showMetaData) {
                            
                    $output .= '<div class="rs-meta align-' . $metaAlignment8 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        // Format the date as "Oct 14, 2024"
                        $formatted_date = get_the_date('M j, Y', $post_id); // 'M' = short month, 'j' = day (no leading 0), 'Y' = full year

                        $meta = '<span class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Icon
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-calendar-alt" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($formatted_date) . '</span>';
                        $meta_items[] = $meta;
                    }


                    // Author
                    if ($showPostAuthor) {
                        $meta = '<a class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</a>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }

                    $output .= '</div>'; // Close meta-data-list
                    
                }
                // End Meta Data

                $output .= '</div>';

                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a>';
                    // Category
                    if ($showPostCategory) {
                        $meta = '<div class="rs-category" style="';

                        // Add color and font-size styles if provided
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Add icon if enabled
                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get and display category names
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text
                        }

                        $meta .= '</div>';
                        $output .= $meta;
                    }

                    $output .= '</div>'; // Close fancy-post-image rs-thumb
                }
                // END Thumbnail

                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style9') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-16-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';
                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a></div>';
                }
                // END Thumbnail
                

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'margin: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 0px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta align-' . esc_attr($metaAlignment9) . '" style="';

                    // Margin
                    if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                            (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                            (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                            (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                        $output .= 'padding: ' .
                            (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                            (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                            (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                            (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                    }

                    // Color
                    if (!empty($metaTextColor)) {
                        $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                    }

                    // Order
                    if (!empty($metaOrder)) {
                        $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                    }

                    $output .= '">';

                    $meta_items = [];

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<div class="meta-author">';

                        // Author Avatar
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $author_id = get_the_author_meta('ID');
                            $avatar_size = !empty($metaFontSize) ? intval($metaFontSize) * 2 : 24; // Double the font size for avatar
                            $avatar = get_avatar($author_id, $avatar_size, '', '', [
                                'class' => 'author-avatar',
                                'style' => !empty($metaIconColor) ? 'vertical-align:middle; margin-right:8px; border-radius:50%; color:' . esc_attr($metaIconColor) . ';' : 'vertical-align:middle; margin-right:8px; border-radius:50%;',
                            ]);
                            $meta .= $avatar;
                        }

                        // Author Name
                        $meta .= '<span style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        $meta .= '<a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '" style="text-decoration:none; color:inherit;">';
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author);
                        $meta .= '</a>';

                        $meta .= '</span></div>';

                        $meta_items[] = $meta;
                    }

                    // Date
                    if ($showPostDate) {
                        $meta = '<div class="meta-date"><span style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fa-regular fa-clock" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Format date as "26 Aug 2024"
                        $formatted_date = get_the_date('d M Y', $post_id); // use $post_id if needed
                        $meta .= esc_html($formatted_date) . '</span></div>';

                        $meta_items[] = $meta;
                    }



                    // Output all metadata without separators
                    $output .= implode('', $meta_items);

                    $output .= '</div>'; // Close .rs-meta
                }

                // End Meta Data

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style10') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-19-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';
                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a></div>';
                }
                // END Thumbnail
                
                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 0px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta">'; 
                    $output .= '<ul class="meta-data-list align-' . $metaAlignment10 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Icon
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-calendar-alt" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($getdate) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Category
                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                        }

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-tags" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="';
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-comments" style="';
                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }
                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }
                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; 
                    $output .= '</div>'; // Close meta-data-list               
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle10) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style11') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-21-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 40px 0px 0px 0px;';
                    }

                    // Padding
                    if (!empty($itemPadding['top']) || !empty($itemPadding['right']) || !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) . ' ' . 
                            (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) . ' ' . 
                            (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) . ' ' . 
                            (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) . '; ';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';

                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a>';
                    $output .= '
                    <svg viewBox="0 0 410 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shape__rs_course">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M346.69 23.5159C371.59 23.3769 398.013 17.3185 410 4.85404V32H0V9.75773C2.99658 0.284217 26.1914 -2.12936 41.5898 1.81449C49.0762 3.72855 55.7041 6.53361 62.3281 9.33695C69.3286 12.2997 76.3247 15.2605 84.3242 17.1654C111.49 25.8323 134.405 18.6565 157.427 11.4472C171.419 7.06559 185.451 2.67167 200.5 1.81449C217.549 0.842933 234.721 5.15653 251.493 9.36967C259.098 11.2798 266.62 13.1693 274.011 14.5363C278.288 15.3272 282.339 16.1309 286.297 16.9161C304.269 20.4812 320.31 23.6632 346.69 23.5159Z" fill="#ffffff"></path>
                    </svg>';
                    $output .= '</div>';
                }

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 20px 0px 0px 0px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                    $output .= '<div class="rs-meta">'; 
                    $output .= '<ul class="meta-data-list align-' . $metaAlignment11 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<li class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Icon
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-calendar-alt" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($getdate) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Author
                    if ($showPostAuthor) {
                        $meta = '<li class="meta-author" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-user" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Category
                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-folder" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();
                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name);
                            }
                            $meta .= implode(', ', $category_names); // comma-separated plain text categories
                        }

                        $meta .= '</li>';
                        $meta_items[] = $meta;
                    }
                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $meta = '<li class="meta-tags" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostTagsIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-tags" style="';

                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }

                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }

                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Comment Count
                    if ($showPostCommentsCount) {
                        $meta = '<li class="meta-comment-count" style="';
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        if ($showPostCommentsCountIcon && $showMetaIcon) {
                            $meta .= '<i class="fas fa-comments" style="';
                            if (!empty($metaIconColor)) {
                                $meta .= 'color:' . esc_attr($metaIconColor) . '; ';
                            }
                            if (!empty($metaFontSize)) {
                                $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                            }
                            $meta .= '"></i> ';
                        }

                        $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</li>';
                        $meta_items[] = $meta;
                    }
                    // Now join meta items with the separator
                    if (!empty($meta_items)) {
                        $separator = '';

                        if ($metaSeperator !== '') {
                            $separator = '';
                            if (!empty($metaSeperator) && strtolower($metaSeperator) !== 'none') {
                                $separatorStyle = '';
                                if (!empty($separatorColor)) {
                                    $separatorStyle .= 'color:' . esc_attr($separatorColor) . '; ';
                                }
                                if (!empty($metaFontSize)) {
                                    $separatorStyle .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                                }

                                $separator = '<span class="meta-separator" style="' . esc_attr(trim($separatorStyle)) . '">' . esc_html($metaSeperator) . '</span>';
                            }
                        }

                        $output .= implode($separator, $meta_items);
                    }
                    $output .= '</ul>'; 
                    $output .= '</div>'; // Close meta-data-list                 
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }
                    // Background color
                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }
                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }
                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }
                    // Class name
                    $classNames = 'title' 
                        . ($titleHoverUnderLine === 'enable' ? ' underline' : '') 
                        . ' align-' . esc_attr($postTitleAlignment);
                    // Hover JS (conditionally included)
                    $onmouseover = !empty($postTitleHoverBgColor) 
                        ? ' onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"' 
                        : '';
                    $onmouseout = !empty($postTitleBgColor) 
                        ? ' onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';"' 
                        : '';
                    // Final output
                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '"' 
                        . $onmouseover 
                        . $onmouseout 
                        . '>';

                    $style = '';
                    $hoverStyle = '';
                    $mouseoutStyle = '';

                    // Build inline styles conditionally
                    if (!empty($postTitleFontSize)) {
                        $style .= 'font-size: ' . esc_attr($postTitleFontSize) . 'px; ';
                    }
                    if (!empty($postTitleLineHeight)) {
                        $style .= 'line-height: ' . esc_attr($postTitleLineHeight) . '; ';
                    }
                    if (!empty($postTitleLetterSpacing)) {
                        $style .= 'letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; ';
                    }
                    if (!empty($postTitleFontWeight)) {
                        $style .= 'font-weight: ' . esc_attr($postTitleFontWeight) . '; ';
                    }
                    if (!empty($postTitleColor)) {
                        $style .= 'color: ' . esc_attr($postTitleColor) . '; ';
                        $mouseoutStyle = 'this.style.color=\'' . esc_attr($postTitleColor) . '\';';
                    }
                    // Build hover color style if set
                    if (!empty($postTitleHoverColor)) {
                        $hoverStyle = 'this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';';
                    }
                    // Final output
                    $output .= '<a href="' . esc_url($permalink) . '" 
                        style="' . esc_attr(trim($style)) . '"'
                        . (!empty($hoverStyle) ? ' onmouseover="' . $hoverStyle . '"' : '')
                        . (!empty($mouseoutStyle) ? ' onmouseout="' . $mouseoutStyle . '"' : '') . '>'
                        . esc_html($croppedTitle) . '</a>';    
                    $output .= '</' . esc_attr($titleTag) . '>';
                }

                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }

                   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';


                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle11) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
            else if ($gridLayoutStyle === 'style12') {
                // Full post layout
                $output .= '<div class="rs-blog-layout-26-item align-' . $itemBoxAlignment . ' ' . $hoverAnimation . '" style="';
                    // MARGIN    
                    if ( !empty($itemMargin['top']) || !empty($itemMargin['right']) ||  !empty($itemMargin['bottom']) || !empty($itemMargin['left'])) {
                        $output .= 'margin: ' .(isset($itemMargin['top']) && $itemMargin['top'] !== '' ? (is_numeric($itemMargin['top']) ? $itemMargin['top'] . 'px' : esc_attr($itemMargin['top'])) : '0px') . ' ' . (isset($itemMargin['right']) && $itemMargin['right'] !== '' ? (is_numeric($itemMargin['right']) ? $itemMargin['right'] . 'px' : esc_attr($itemMargin['right'])) : '0px') . ' ' . (isset($itemMargin['bottom']) && $itemMargin['bottom'] !== '' ? (is_numeric($itemMargin['bottom']) ? $itemMargin['bottom'] . 'px' : esc_attr($itemMargin['bottom'])) : '0px') . ' ' . (isset($itemMargin['left']) && $itemMargin['left'] !== '' ? (is_numeric($itemMargin['left']) ? $itemMargin['left'] . 'px' : esc_attr($itemMargin['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'margin: 0px 0px 40px 0px;';
                    }

                    if ( !empty($itemPadding['top']) || !empty($itemPadding['right']) ||  !empty($itemPadding['bottom']) || !empty($itemPadding['left'])) {
                        $output .= 'padding: ' .(isset($itemPadding['top']) && $itemPadding['top'] !== '' ? (is_numeric($itemPadding['top']) ? $itemPadding['top'] . 'px' : esc_attr($itemPadding['top'])) : '0px') . ' ' . (isset($itemPadding['right']) && $itemPadding['right'] !== '' ? (is_numeric($itemPadding['right']) ? $itemPadding['right'] . 'px' : esc_attr($itemPadding['right'])) : '0px') . ' ' . (isset($itemPadding['bottom']) && $itemPadding['bottom'] !== '' ? (is_numeric($itemPadding['bottom']) ? $itemPadding['bottom'] . 'px' : esc_attr($itemPadding['bottom'])) : '0px') . ' ' . (isset($itemPadding['left']) && $itemPadding['left'] !== '' ? (is_numeric($itemPadding['left']) ? $itemPadding['left'] . 'px' : esc_attr($itemPadding['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 0px 0px 40px 0px;';
                    }

                    // Border Radius
                    if (!empty($itemBorderRadius['top']) || !empty($itemBorderRadius['right']) || !empty($itemBorderRadius['bottom']) || !empty($itemBorderRadius['left'])) {
                        $output .= 'border-radius: ' . 
                            (is_numeric($itemBorderRadius['top']) ? $itemBorderRadius['top'] . 'px' : esc_attr($itemBorderRadius['top'])) . ' ' . 
                            (is_numeric($itemBorderRadius['right']) ? $itemBorderRadius['right'] . 'px' : esc_attr($itemBorderRadius['right'])) . ' ' . 
                            (is_numeric($itemBorderRadius['bottom']) ? $itemBorderRadius['bottom'] . 'px' : esc_attr($itemBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($itemBorderRadius['left']) ? $itemBorderRadius['left'] . 'px' : esc_attr($itemBorderRadius['left'])) . '; ';
                    }

                    // Border Width
                    if (!empty($itemBorderWidth['top']) || !empty($itemBorderWidth['right']) || !empty($itemBorderWidth['bottom']) || !empty($itemBorderWidth['left'])) {
                        $output .= 'border-width: ' . 
                            (is_numeric($itemBorderWidth['top']) ? $itemBorderWidth['top'] . 'px' : esc_attr($itemBorderWidth['top'])) . ' ' . 
                            (is_numeric($itemBorderWidth['right']) ? $itemBorderWidth['right'] . 'px' : esc_attr($itemBorderWidth['right'])) . ' ' . 
                            (is_numeric($itemBorderWidth['bottom']) ? $itemBorderWidth['bottom'] . 'px' : esc_attr($itemBorderWidth['bottom'])) . ' ' . 
                            (is_numeric($itemBorderWidth['left']) ? $itemBorderWidth['left'] . 'px' : esc_attr($itemBorderWidth['left'])) . '; ';
                    }

                    // Border Style & Color
                    if (!empty($itemBorderType)) {
                        $output .= 'border-style: ' . esc_attr($itemBorderType) . '; ';
                    }
                    if (!empty($itemBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($itemBorderColor) . '; ';
                    }

                    // Background Color
                    if (!empty($itemBackgroundColor)) {
                        $output .= 'background-color: ' . esc_attr($itemBackgroundColor) . '; ';
                    }

                    // Box Shadow
                    if (!empty($itemBoxShadow['top']) || !empty($itemBoxShadow['right']) || !empty($itemBoxShadow['bottom']) || !empty($itemBoxShadow['left'])) {
                        $output .= 'box-shadow: ' . 
                            (is_numeric($itemBoxShadow['top']) ? $itemBoxShadow['top'] . 'px' : esc_attr($itemBoxShadow['top'])) . ' ' . 
                            (is_numeric($itemBoxShadow['right']) ? $itemBoxShadow['right'] . 'px' : esc_attr($itemBoxShadow['right'])) . ' ' . 
                            (is_numeric($itemBoxShadow['bottom']) ? $itemBoxShadow['bottom'] . 'px' : esc_attr($itemBoxShadow['bottom'])) . ' ' . 
                            (is_numeric($itemBoxShadow['left']) ? $itemBoxShadow['left'] . 'px' : esc_attr($itemBoxShadow['left'])) . ' ' . 
                            esc_attr($itemBoxShadowColor) . '; ';
                    }

                $output .= '">';

                // Thumbnail
                if ($thumbnail && $showThumbnail) {
                    $output .= '<div class="rs-thumb" style="';

                    // Margin
                    if (!empty($thumbnailMargin['top']) || !empty($thumbnailMargin['right']) || !empty($thumbnailMargin['bottom']) || !empty($thumbnailMargin['left'])) {
                        $output .= 'margin: ' . 
                            (is_numeric($thumbnailMargin['top']) ? $thumbnailMargin['top'] . 'px' : esc_attr($thumbnailMargin['top'])) . ' ' . 
                            (is_numeric($thumbnailMargin['right']) ? $thumbnailMargin['right'] . 'px' : esc_attr($thumbnailMargin['right'])) . ' ' . 
                            (is_numeric($thumbnailMargin['bottom']) ? $thumbnailMargin['bottom'] . 'px' : esc_attr($thumbnailMargin['bottom'])) . ' ' . 
                            (is_numeric($thumbnailMargin['left']) ? $thumbnailMargin['left'] . 'px' : esc_attr($thumbnailMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($thumbnailPadding['top']) || !empty($thumbnailPadding['right']) || !empty($thumbnailPadding['bottom']) || !empty($thumbnailPadding['left'])) {
                        $output .= 'padding: ' . 
                            (is_numeric($thumbnailPadding['top']) ? $thumbnailPadding['top'] . 'px' : esc_attr($thumbnailPadding['top'])) . ' ' . 
                            (is_numeric($thumbnailPadding['right']) ? $thumbnailPadding['right'] . 'px' : esc_attr($thumbnailPadding['right'])) . ' ' . 
                            (is_numeric($thumbnailPadding['bottom']) ? $thumbnailPadding['bottom'] . 'px' : esc_attr($thumbnailPadding['bottom'])) . ' ' . 
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ';
                    }

                    $output .= '">';

                    // Anchor with optional border-radius and overflow
                    $output .= '<a href="' . esc_url($permalink) . '" style="';

                        if ( !empty($thumbnailBorderRadius['top']) || !empty($thumbnailBorderRadius['right']) || !empty($thumbnailBorderRadius['bottom']) || !empty($thumbnailBorderRadius['left'])) {
                            $output .= ' border-radius: ' .
                                (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' .
                                (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . ';';
                        }

                    $output .= '">';
                    $output .= $thumbnail . '</a></div>';
                }
                // END Thumbnail

                // MAIN Content
                $output .= '<div class="rs-content" style="';
                    // Margin
                    if (!empty($contentitemMarginNew['top']) || !empty($contentitemMarginNew['right']) || !empty($contentitemMarginNew['bottom']) || !empty($contentitemMarginNew['left'])) {
                        $output .= 'margin: ' .
                            (is_numeric($contentitemMarginNew['top']) ? $contentitemMarginNew['top'] . 'px' : esc_attr($contentitemMarginNew['top'])) . ' ' .
                            (is_numeric($contentitemMarginNew['right']) ? $contentitemMarginNew['right'] . 'px' : esc_attr($contentitemMarginNew['right'])) . ' ' .
                            (is_numeric($contentitemMarginNew['bottom']) ? $contentitemMarginNew['bottom'] . 'px' : esc_attr($contentitemMarginNew['bottom'])) . ' ' .
                            (is_numeric($contentitemMarginNew['left']) ? $contentitemMarginNew['left'] . 'px' : esc_attr($contentitemMarginNew['left'])) . '; ';
                    }
                    // Padding
                    if ( !empty($contentitemPaddingNew['top']) || !empty($contentitemPaddingNew['right']) ||  !empty($contentitemPaddingNew['bottom']) || !empty($contentitemPaddingNew['left'])) {
                        $output .= 'padding: ' .(isset($contentitemPaddingNew['top']) && $contentitemPaddingNew['top'] !== '' ? (is_numeric($contentitemPaddingNew['top']) ? $contentitemPaddingNew['top'] . 'px' : esc_attr($contentitemPaddingNew['top'])) : '0px') . ' ' . (isset($contentitemPaddingNew['right']) && $contentitemPaddingNew['right'] !== '' ? (is_numeric($contentitemPaddingNew['right']) ? $contentitemPaddingNew['right'] . 'px' : esc_attr($contentitemPaddingNew['right'])) : '0px') . ' ' . (isset($contentitemPaddingNew['bottom']) && $contentitemPaddingNew['bottom'] !== '' ? (is_numeric($contentitemPaddingNew['bottom']) ? $contentitemPaddingNew['bottom'] . 'px' : esc_attr($contentitemPaddingNew['bottom'])) : '0px') . ' ' . (isset($contentitemPaddingNew['left']) && $contentitemPaddingNew['left'] !== '' ? (is_numeric($contentitemPaddingNew['left']) ? $contentitemPaddingNew['left'] . 'px' : esc_attr($contentitemPaddingNew['left'])) : '0px') . '; '; 
                    } else { // Default fallback
                        $output .= 'padding: 40px 35px 50px 35px;';
                    }
                    // Check if at least one side is not empty
                    if ( !empty($contentBorderWidth['top']) || !empty($contentBorderWidth['right']) || !empty($contentBorderWidth['bottom']) || !empty($contentBorderWidth['left'])) {
                        $output .= 'border-width: ' .
                            (is_numeric($contentBorderWidth['top']) ? $contentBorderWidth['top'] . 'px' : esc_attr($contentBorderWidth['top'])) . ' ' .
                            (is_numeric($contentBorderWidth['right']) ? $contentBorderWidth['right'] . 'px' : esc_attr($contentBorderWidth['right'])) . ' ' .
                            (is_numeric($contentBorderWidth['bottom']) ? $contentBorderWidth['bottom'] . 'px' : esc_attr($contentBorderWidth['bottom'])) . ' ' .
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . '; ';
                    }
                    // Border Style
                    if (!empty($contentNormalBorderType)) {
                        $output .= 'border-style: ' . esc_attr($contentNormalBorderType) . '; ';
                    }
                    // Background Color
                    if (!empty($contentBgColor)) {
                        $output .= 'background-color: ' . esc_attr($contentBgColor) . '; ';
                    }
                    // Border Color
                    if (!empty($contentBorderColor)) {
                        $output .= 'border-color: ' . esc_attr($contentBorderColor) . '; ';
                    }
                $output .= '">';

                // Meta Data
                if ($showMetaData) {
                            
                    $output .= '<div class="rs-meta align-' . $metaAlignment12 . ' " style="';  
                        // Margin
                        if (!empty($metaMarginNew['top']) || !empty($metaMarginNew['right']) || !empty($metaMarginNew['bottom']) || !empty($metaMarginNew['left'])) {
                            $output .= 'margin: ' .
                                (is_numeric($metaMarginNew['top']) ? $metaMarginNew['top'] . 'px' : esc_attr($metaMarginNew['top'])) . ' ' .
                                (is_numeric($metaMarginNew['right']) ? $metaMarginNew['right'] . 'px' : esc_attr($metaMarginNew['right'])) . ' ' .
                                (is_numeric($metaMarginNew['bottom']) ? $metaMarginNew['bottom'] . 'px' : esc_attr($metaMarginNew['bottom'])) . ' ' .
                                (is_numeric($metaMarginNew['left']) ? $metaMarginNew['left'] . 'px' : esc_attr($metaMarginNew['left'])) . '; ';
                        }
                        // Padding
                        if (!empty($metaPadding['top']) || !empty($metaPadding['right']) || !empty($metaPadding['bottom']) || !empty($metaPadding['left'])) {
                            $output .= 'padding: ' .
                                (is_numeric($metaPadding['top']) ? $metaPadding['top'] . 'px' : esc_attr($metaPadding['top'])) . ' ' .
                                (is_numeric($metaPadding['right']) ? $metaPadding['right'] . 'px' : esc_attr($metaPadding['right'])) . ' ' .
                                (is_numeric($metaPadding['bottom']) ? $metaPadding['bottom'] . 'px' : esc_attr($metaPadding['bottom'])) . ' ' .
                                (is_numeric($metaPadding['left']) ? $metaPadding['left'] . 'px' : esc_attr($metaPadding['left'])) . '; ';
                        }   
                        
                        // Color
                        if (!empty($metaTextColor)) {
                            $output .= 'color: ' . esc_attr($metaTextColor) . '; ';
                        }
                        // Order
                        if (!empty($metaOrder)) {
                            $output .= 'order: ' . esc_attr($metaOrder) . '; ';
                        }
                    $output .= '">';

                    $meta_items = [];

                    // Date
                    if ($showPostDate) {
                        $meta = '<div class="meta-date" style="';

                        // Color
                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }

                        // Font size
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }
                        $meta .= '">';
                        $meta .= '<span>' . esc_html($getdate) . '</span>';
                        $meta .= '</div>';

                        $meta_items[] = $meta;
                    }

                    // Author
                    if ($showPostCategory) {
                        $meta = '<div class="meta-category" style="';

                        if (!empty($metaTextColor)) {
                            $meta .= 'color:' . esc_attr($metaTextColor) . '; ';
                        }
                        if (!empty($metaFontSize)) {
                            $meta .= 'font-size:' . esc_attr($metaFontSize) . 'px; ';
                        }

                        $meta .= '">';

                        // Get category names without links
                        $categories_list = get_the_category($post_id);
                        if (!empty($categories_list)) {
                            $category_names = array();

                            foreach ($categories_list as $category) {
                                // If you want to link to the category archive, use get_category_link()
                                $category_link = esc_url(get_category_link($category->term_id));
                                $category_names[] = '<a href="' . $category_link . '">' . esc_html($category->name) . '</a>';
                            }

                            $meta .= implode(', ', $category_names); // comma-separated category links
                        }

                        $meta .= '</div>';
                        $meta_items[] = $meta;
                    }


                    // Now join meta items with the separator
                    $output .= implode( $meta_items);

                    $output .= '</div>'; // Close meta-data-list
                    
                }
                // End Meta Data

                // title
                if ($showPostTitle) {
                    $titleStyles = '';

                    // Order
                    if (!empty($titleOrder)) {
                        $titleStyles .= 'order: ' . esc_attr($titleOrder) . '; ';
                    }

                    if (!empty($postTitleAlignment)) {
                        $titleStyles .= 'text-align: ' . esc_attr($postTitleAlignment) . '; ';
                    }

                    if (!empty($postTitleBgColor)) {
                        $titleStyles .= 'background-color: ' . esc_attr($postTitleBgColor) . '; ';
                    }

                    // Margin
                    if (!empty($postTitleMargin['top']) || !empty($postTitleMargin['right']) || !empty($postTitleMargin['bottom']) || !empty($postTitleMargin['left'])) {
                        $titleStyles .= 'margin: ' .
                            (is_numeric($postTitleMargin['top']) ? $postTitleMargin['top'] . 'px' : esc_attr($postTitleMargin['top'])) . ' ' .
                            (is_numeric($postTitleMargin['right']) ? $postTitleMargin['right'] . 'px' : esc_attr($postTitleMargin['right'])) . ' ' .
                            (is_numeric($postTitleMargin['bottom']) ? $postTitleMargin['bottom'] . 'px' : esc_attr($postTitleMargin['bottom'])) . ' ' .
                            (is_numeric($postTitleMargin['left']) ? $postTitleMargin['left'] . 'px' : esc_attr($postTitleMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($postTitlePadding['top']) || !empty($postTitlePadding['right']) || !empty($postTitlePadding['bottom']) || !empty($postTitlePadding['left'])) {
                        $titleStyles .= 'padding: ' .
                            (is_numeric($postTitlePadding['top']) ? $postTitlePadding['top'] . 'px' : esc_attr($postTitlePadding['top'])) . ' ' .
                            (is_numeric($postTitlePadding['right']) ? $postTitlePadding['right'] . 'px' : esc_attr($postTitlePadding['right'])) . ' ' .
                            (is_numeric($postTitlePadding['bottom']) ? $postTitlePadding['bottom'] . 'px' : esc_attr($postTitlePadding['bottom'])) . ' ' .
                            (is_numeric($postTitlePadding['left']) ? $postTitlePadding['left'] . 'px' : esc_attr($postTitlePadding['left'])) . '; ';
                    }

                    $classNames = 'title' . ($titleHoverUnderLine === 'enable' ? ' underline' : '');

                    $output .= '<' . esc_attr($titleTag) . ' class="' . esc_attr($classNames) . '" style="' . esc_attr(trim($titleStyles)) . '" 
                        onmouseover="this.style.backgroundColor=\'' . esc_attr($postTitleHoverBgColor) . '\';"
                        onmouseout="this.style.backgroundColor=\'' . esc_attr($postTitleBgColor) . '\';">';

                    $output .= '<a href="' . esc_url($permalink) . '" 
                        
                        style="
                        font-size: ' . esc_attr($postTitleFontSize) . 'px; 
                        line-height: ' . esc_attr($postTitleLineHeight) . '; 
                        letter-spacing: ' . esc_attr($postTitleLetterSpacing) . 'px; 
                        font-weight: ' . esc_attr($postTitleFontWeight) . '; 
                        color: ' . esc_attr($postTitleColor) . ';"
                        onmouseover="this.style.color=\'' . esc_attr($postTitleHoverColor) . '\';"
                        onmouseout="this.style.color=\'' . esc_attr($postTitleColor) . '\';">' . esc_html($croppedTitle) . '</a>';

                    $output .= '</' . esc_attr($titleTag) . '>';
                }
                if ($showPostExcerpt) {
                    $excerptStyles = '';

                    // Order
                    if (!empty($excerptOrder)) {
                        $excerptStyles .= 'order: ' . esc_attr($excerptOrder) . '; ';
                    }

                    // Typography
                    if (!empty($excerptFontSize)) {
                        $excerptStyles .= 'font-size: ' . esc_attr($excerptFontSize) . 'px; ';
                    }

                    if (!empty($excerptLineHeight)) {
                        $excerptStyles .= 'line-height: ' . esc_attr($excerptLineHeight) . '; ';
                    }

                    if (!empty($excerptLetterSpacing)) {
                        $excerptStyles .= 'letter-spacing: ' . esc_attr($excerptLetterSpacing) . 'px; ';
                    }

                    if (!empty($excerptFontWeight)) {
                        $excerptStyles .= 'font-weight: ' . esc_attr($excerptFontWeight) . '; ';
                    }

                    if (!empty($excerptColor)) {
                        $excerptStyles .= 'color: ' . esc_attr($excerptColor) . '; ';
                    }

                    if (!empty($excerptBgColor)) {
                        $excerptStyles .= 'background-color: ' . esc_attr($excerptBgColor) . '; ';
                    }

                    if (!empty($excerptBorderType)) {
                        $excerptStyles .= 'border-style: ' . esc_attr($excerptBorderType) . '; ';
                    }

                    // Margin
                    if (!empty($excerptMargin['top']) || !empty($excerptMargin['right']) || !empty($excerptMargin['bottom']) || !empty($excerptMargin['left'])) {
                        $excerptStyles .= 'margin: ' .
                            (is_numeric($excerptMargin['top']) ? $excerptMargin['top'] . 'px' : esc_attr($excerptMargin['top'])) . ' ' .
                            (is_numeric($excerptMargin['right']) ? $excerptMargin['right'] . 'px' : esc_attr($excerptMargin['right'])) . ' ' .
                            (is_numeric($excerptMargin['bottom']) ? $excerptMargin['bottom'] . 'px' : esc_attr($excerptMargin['bottom'])) . ' ' .
                            (is_numeric($excerptMargin['left']) ? $excerptMargin['left'] . 'px' : esc_attr($excerptMargin['left'])) . '; ';
                    }

                    // Padding
                    if (!empty($excerptPadding['top']) || !empty($excerptPadding['right']) || !empty($excerptPadding['bottom']) || !empty($excerptPadding['left'])) {
                        $excerptStyles .= 'padding: ' .
                            (is_numeric($excerptPadding['top']) ? $excerptPadding['top'] . 'px' : esc_attr($excerptPadding['top'])) . ' ' .
                            (is_numeric($excerptPadding['right']) ? $excerptPadding['right'] . 'px' : esc_attr($excerptPadding['right'])) . ' ' .
                            (is_numeric($excerptPadding['bottom']) ? $excerptPadding['bottom'] . 'px' : esc_attr($excerptPadding['bottom'])) . ' ' .
                            (is_numeric($excerptPadding['left']) ? $excerptPadding['left'] . 'px' : esc_attr($excerptPadding['left'])) . '; ';
                    }

                    // Handle hover logic conditionally
                    $hoverIn = '';
                    $hoverOut = '';

                    if (!empty($excerptHoverColor)) {
                        $hoverIn .= 'this.style.color=\'' . esc_attr($excerptHoverColor) . '\';';
                        $hoverOut .= 'this.style.color=\'' . esc_attr($excerptColor) . '\';';
                    }

                    if (!empty($excerptHoverBgColor)) {
                        $hoverIn .= 'this.style.backgroundColor=\'' . esc_attr($excerptHoverBgColor) . '\';';
                        $hoverOut .= 'this.style.backgroundColor=\'' . esc_attr($excerptBgColor) . '\';';
                    }

                    if (!empty($excerptHoverBorderColor)) {
                        $hoverIn .= 'this.style.borderColor=\'' . esc_attr($excerptHoverBorderColor) . '\';';
                        $hoverOut .= 'this.style.borderColor=\'inherit\';';
                    }

                    $output .= '<p class="fpg-excerpt' . ' align-' . esc_attr($excerptAlignment12) . '" style="' . esc_attr(trim($excerptStyles)) . '"';

                    if (!empty($hoverIn) || !empty($hoverOut)) {
                        $output .= ' onmouseover="' . esc_attr($hoverIn) . '"';
                        $output .= ' onmouseout="' . esc_attr($hoverOut) . '"';
                    }

                    $output .= '>';
                    $output .= '' . esc_html($excerpt) . '</p>';
                    
                }
                // Button Output                
                if ($showReadMoreButton) {
                    // Button wrapper styles
                    $buttonWrapperStyle = '';

                    // Margin
                    if (!empty($buttonMarginNew['top']) || !empty($buttonMarginNew['right']) || !empty($buttonMarginNew['bottom']) || !empty($buttonMarginNew['left'])) {
                        $buttonWrapperStyle .= 'margin: ' .
                            (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' .
                            (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' .
                            (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' .
                            (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; ';
                    }

                    // Order
                    if (!empty($buttonOrder)) {
                        $buttonWrapperStyle .= 'order: ' . esc_attr($buttonOrder) . ';';
                    }
   
                    $output .= '<div class="btn-wrapper align-' . esc_attr($buttonAlignment) . '" style="' . esc_attr(trim($buttonWrapperStyle)) . '">';

                    // Button inline styles
                    $buttonInlineStyles = '';

                    if (!empty($buttonTextColor)) {
                        $buttonInlineStyles .= 'color: ' . esc_attr($buttonTextColor) . '; ';
                    }
                    if (!empty($buttonBackgroundColor)) {
                        $buttonInlineStyles .= 'background-color: ' . esc_attr($buttonBackgroundColor) . '; ';
                    }
                    if (!empty($buttonFontSize)) {
                        $buttonInlineStyles .= 'font-size: ' . esc_attr($buttonFontSize) . 'px; ';
                    }
                    if (!empty($buttonFontWeight)) {
                        $buttonInlineStyles .= 'font-weight: ' . esc_attr($buttonFontWeight) . '; ';
                    }
                    if (!empty($buttonBorderColor)) {
                        $buttonInlineStyles .= 'border-color: ' . esc_attr($buttonBorderColor) . '; ';
                    }
                    if (!empty($buttonBorderType)) {
                        $buttonInlineStyles .= 'border-style: ' . esc_attr($buttonBorderType) . '; ';
                    }

                    // Border width
                    
                    if (!empty($buttonBorderWidth['top']) || !empty($buttonBorderWidth['right']) || !empty($buttonBorderWidth['bottom']) || !empty($buttonBorderWidth['left'])) {
                        $buttonInlineStyles .= 'border-width: ' .
                            (is_numeric($buttonBorderWidth['top']) ? $buttonBorderWidth['top'] . 'px' : esc_attr($buttonBorderWidth['top'])) . ' ' .
                            (is_numeric($buttonBorderWidth['right']) ? $buttonBorderWidth['right'] . 'px' : esc_attr($buttonBorderWidth['right'])) . ' ' .
                            (is_numeric($buttonBorderWidth['bottom']) ? $buttonBorderWidth['bottom'] . 'px' : esc_attr($buttonBorderWidth['bottom'])) . ' ' .
                            (is_numeric($buttonBorderWidth['left']) ? $buttonBorderWidth['left'] . 'px' : esc_attr($buttonBorderWidth['left'])) . '; ';
                    }
                    if (!empty($buttonBorderRadius['top']) || !empty($buttonBorderRadius['right']) || !empty($buttonBorderRadius['bottom']) || !empty($buttonBorderRadius['left'])) {
                        $buttonInlineStyles .= 'border-radius: ' .
                            (is_numeric($buttonBorderRadius['top']) ? $buttonBorderRadius['top'] . 'px' : esc_attr($buttonBorderRadius['top'])) . ' ' .
                            (is_numeric($buttonBorderRadius['right']) ? $buttonBorderRadius['right'] . 'px' : esc_attr($buttonBorderRadius['right'])) . ' ' .
                            (is_numeric($buttonBorderRadius['bottom']) ? $buttonBorderRadius['bottom'] . 'px' : esc_attr($buttonBorderRadius['bottom'])) . ' ' .
                            (is_numeric($buttonBorderRadius['left']) ? $buttonBorderRadius['left'] . 'px' : esc_attr($buttonBorderRadius['left'])) . '; ';
                    }
                    if (!empty($buttonPaddingNew['top']) || !empty($buttonPaddingNew['right']) || !empty($buttonPaddingNew['bottom']) || !empty($buttonPaddingNew['left'])) {
                        $buttonInlineStyles .= 'padding: ' .
                            (is_numeric($buttonPaddingNew['top']) ? $buttonPaddingNew['top'] . 'px' : esc_attr($buttonPaddingNew['top'])) . ' ' .
                            (is_numeric($buttonPaddingNew['right']) ? $buttonPaddingNew['right'] . 'px' : esc_attr($buttonPaddingNew['right'])) . ' ' .
                            (is_numeric($buttonPaddingNew['bottom']) ? $buttonPaddingNew['bottom'] . 'px' : esc_attr($buttonPaddingNew['bottom'])) . ' ' .
                            (is_numeric($buttonPaddingNew['left']) ? $buttonPaddingNew['left'] . 'px' : esc_attr($buttonPaddingNew['left'])) . '; ';
                    }

                    // Hover styles
                    $buttonHoverInlineStyles = '';
                    $buttonResetStyles = '';

                    if (!empty($buttonHoverTextColor)) {
                        $buttonHoverInlineStyles .= "this.style.color='" . esc_attr($buttonHoverTextColor) . "';";
                        $buttonResetStyles .= "this.style.color='" . esc_attr($buttonTextColor) . "';";
                    }
                    if (!empty($buttonHoverBorderColor)) {
                        $buttonHoverInlineStyles .= "this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';";
                        $buttonResetStyles .= "this.style.borderColor='" . esc_attr($buttonBorderColor) . "';";
                    }
                    if (!empty($buttonHoverBackgroundColor)) {
                        $buttonHoverInlineStyles .= "this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";
                        $buttonResetStyles .= "this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";
                    }

                    // Button anchor tag
                    $output .= '<a class="rs-btn read-more ' . esc_attr($buttonStyle12) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr(trim($buttonInlineStyles)) . '"';

                    if (!empty($buttonHoverInlineStyles)) {
                        $output .= ' onmouseover="' . $buttonHoverInlineStyles . '"';
                    }

                    if (!empty($buttonResetStyles)) {
                        $output .= ' onmouseout="' . $buttonResetStyles . '"';
                    }

                    $output .= '>';

                    // Icon handling
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';
                    $rightIcon = '<i class="ri-arrow-right-line"></i>';

                    if ($iconPosition === 'left' && $showButtonIcon) {
                        $output .= $leftIcon . ' ';
                    }

                    $output .= esc_html($readMoreLabel);

                    if ($iconPosition === 'right' && $showButtonIcon) {
                        $output .= ' ' . $rightIcon;
                    }

                    $output .= '</a></div>';
                }
                // End Button

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                // End Full post layout
            }
        }
        
        $output .= '</div>'; // End .fancy-post-grid


        if ($enablePagination) {
            // Generate individual style strings
            $margin = (is_numeric($paginationMarginNew['top']) ? $paginationMarginNew['top'] . 'px' : esc_attr($paginationMarginNew['top'])) . ' ' .
                      (is_numeric($paginationMarginNew['right']) ? $paginationMarginNew['right'] . 'px' : esc_attr($paginationMarginNew['right'])) . ' ' .
                      (is_numeric($paginationMarginNew['bottom']) ? $paginationMarginNew['bottom'] . 'px' : esc_attr($paginationMarginNew['bottom'])) . ' ' .
                      (is_numeric($paginationMarginNew['left']) ? $paginationMarginNew['left'] . 'px' : esc_attr($paginationMarginNew['left']));

            $borderWidth = (is_numeric($paginationBorderWidthNew['top']) ? $paginationBorderWidthNew['top'] . 'px' : esc_attr($paginationBorderWidthNew['top'])) . ' ' .
                           (is_numeric($paginationBorderWidthNew['right']) ? $paginationBorderWidthNew['right'] . 'px' : esc_attr($paginationBorderWidthNew['right'])) . ' ' .
                           (is_numeric($paginationBorderWidthNew['bottom']) ? $paginationBorderWidthNew['bottom'] . 'px' : esc_attr($paginationBorderWidthNew['bottom'])) . ' ' .
                           (is_numeric($paginationBorderWidthNew['left']) ? $paginationBorderWidthNew['left'] . 'px' : esc_attr($paginationBorderWidthNew['left']));

            $borderRadius = (is_numeric($paginationBorderRadius['top']) ? $paginationBorderRadius['top'] . 'px' : esc_attr($paginationBorderRadius['top'])) . ' ' .
                            (is_numeric($paginationBorderRadius['right']) ? $paginationBorderRadius['right'] . 'px' : esc_attr($paginationBorderRadius['right'])) . ' ' .
                            (is_numeric($paginationBorderRadius['bottom']) ? $paginationBorderRadius['bottom'] . 'px' : esc_attr($paginationBorderRadius['bottom'])) . ' ' .
                            (is_numeric($paginationBorderRadius['left']) ? $paginationBorderRadius['left'] . 'px' : esc_attr($paginationBorderRadius['left']));

            $gap = is_numeric($paginationGap) ? $paginationGap . 'px' : esc_attr($paginationGap);
            $fontSize = is_numeric($paginationFontSize) ? $paginationFontSize . 'px' : esc_attr($paginationFontSize);

            // Pagination wrapper
            $output .= '<div class="fpg-pagination" style="display: flex; justify-content: ' . esc_attr($paginationAlignment) . '; margin: ' . $margin . ';">';

            // UL
            $output .= '<ul class="page-numbers" style=" gap: ' . $gap . ';">';

            // Generate links
            $pagination_links = paginate_links(array(
                'total'     => $query->max_num_pages,
                'current'   => $paged,
                'format'    => '?paged=%#%',
                'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
                'next_text' => esc_html__('Next »', 'fancy-post-grid'),
                'type'      => 'array',
            ));

            if (!empty($pagination_links)) {
                foreach ($pagination_links as $link) {
                    $styled_link = preg_replace_callback(
                        '/<(a|span)([^>]*)>/',
                        function ($matches) use (
                            $borderWidth, $paginationBorderStyle, $paginationBorderColor, $borderRadius,
                            $paginationTextColor, $paginationBackgroundColor,
                            $paginationHoverTextColor, $paginationHoverBackgroundColor, $paginationHoverBorderColor,
                            $paginationActiveTextColor, $paginationActiveBackgroundColor, $paginationActiveBorderColor,$fontSize
                        ) {
                            $tag = $matches[1];
                            $attrs = $matches[2];

                            $is_current = strpos($attrs, 'current') !== false;

                            // Base style
                            $style = '';
                            $style .= 'font-size:' . esc_attr($fontSize) . '; ';
                            $style .= 'border-width:' . esc_attr($borderWidth) . '; ';
                            $style .= 'border-style:' . esc_attr($paginationBorderStyle) . '; ';
                            $style .= 'border-color:' . esc_attr($is_current ? $paginationActiveBorderColor : $paginationBorderColor) . '; ';
                            $style .= 'border-radius:' . esc_attr($borderRadius) . '; ';
                            $style .= 'color:' . esc_attr($is_current ? $paginationActiveTextColor : $paginationTextColor) . '; ';
                            $style .= 'background-color:' . esc_attr($is_current ? $paginationActiveBackgroundColor : $paginationBackgroundColor) . '; ';
                            

                            // Hover style via JS
                            $hover = 'this.style.color=\'' . esc_attr($paginationHoverTextColor) . '\';' .
                                     'this.style.backgroundColor=\'' . esc_attr($paginationHoverBackgroundColor) . '\';' .
                                     'this.style.borderColor=\'' . esc_attr($paginationHoverBorderColor) . '\';';

                            $out = '<' . $tag . $attrs . ' style="' . $style . '"';
                            if (!$is_current) {
                                $out .= ' onmouseover="' . $hover . '"';
                                // Reset on mouseout
                                $out .= ' onmouseout="this.style.color=\'' . esc_attr($paginationTextColor) . '\';' .
                                        'this.style.backgroundColor=\'' . esc_attr($paginationBackgroundColor) . '\';' .
                                        'this.style.borderColor=\'' . esc_attr($paginationBorderColor) . '\';"';
                            }
                            $out .= '>';
                            return $out;
                        },
                        $link
                    );

                    $output .= '<li>' . $styled_link . '</li>';
                }
            }

            $output .= '</ul>';
            $output .= '</div>';
        }

        

    wp_reset_postdata();

    return $output;
}