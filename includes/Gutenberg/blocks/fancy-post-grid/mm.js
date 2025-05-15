function fancy_post_isotope_render_callback($attributes) {
    // Content Layout
    
    $isotopeLayoutStyle = isset($attributes['isotopeLayoutStyle']) ? $attributes['isotopeLayoutStyle'] : 'style1';
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
    $showPostCategory = isset($attributes['showPostCategory']) ? filter_var($attributes['showPostCategory'], FILTER_VALIDATE_BOOLEAN) : false;
    $showPostTags = isset($attributes['showPostTags']) ? filter_var($attributes['showPostTags'], FILTER_VALIDATE_BOOLEAN) : false;
    $showPostCommentsCount = isset($attributes['showPostCommentsCount']) ? filter_var($attributes['showPostCommentsCount'], FILTER_VALIDATE_BOOLEAN) : false;
    $showMetaIcon = isset($attributes['showMetaIcon']) ? filter_var($attributes['showMetaIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostDateIcon = isset($attributes['showPostDateIcon']) ? filter_var($attributes['showPostDateIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostAuthorIcon = isset($attributes['showPostAuthorIcon']) ? filter_var($attributes['showPostAuthorIcon'], FILTER_VALIDATE_BOOLEAN) : true;
    $showPostCategoryIcon = isset($attributes['showPostCategoryIcon']) ? filter_var($attributes['showPostCategoryIcon'], FILTER_VALIDATE_BOOLEAN) : false;
    $showPostTagsIcon = isset($attributes['showPostTagsIcon']) ? filter_var($attributes['showPostTagsIcon'], FILTER_VALIDATE_BOOLEAN) : false;
    $showPostCommentsCountIcon = isset($attributes['showPostCommentsCountIcon']) ? filter_var($attributes['showPostCommentsCountIcon'], FILTER_VALIDATE_BOOLEAN) : false;

    // Order values
    $metaOrder = isset($attributes['metaOrder']) ? absint($attributes['metaOrder']) : 1;
    $titleOrder = isset($attributes['titleOrder']) ? absint($attributes['titleOrder']) : 2;
    $excerptOrder = isset($attributes['excerptOrder']) ? absint($attributes['excerptOrder']) : 3;
    $buttonOrder = isset($attributes['buttonOrder']) ? absint($attributes['buttonOrder']) : 4;

    // Post title settings
    $titleTag               = isset($attributes['titleTag']) ? sanitize_text_field($attributes['titleTag']) : 'h3';
    $titleHoverUnderLine    = isset($attributes['titleHoverUnderLine']) ? sanitize_text_field($attributes['titleHoverUnderLine']) : 'enable';
    $titleCropBy            = isset($attributes['titleCropBy']) ? sanitize_text_field($attributes['titleCropBy']) : 'word';
    $titleLength            = isset($attributes['titleLength']) ? absint($attributes['titleLength']) : 20;
    
    //THUMB sETTINGS
    $thumbnailSize = isset($attributes['thumbnailSize']) ? sanitize_text_field($attributes['thumbnailSize']) : 'full';
    // Excerpt Settings
    $excerptType = isset($attributes['excerptType']) ? sanitize_text_field($attributes['excerptType']) : 'word';
    $excerptIndicator = isset($attributes['excerptIndicator']) ? sanitize_text_field($attributes['excerptIndicator']) : '...';
    $excerptLimit = isset($attributes['excerptLimit']) ? absint($attributes['excerptLimit']) : 20;
    // Meta data Settings
    $metaAuthorPrefix = isset($attributes['metaAuthorPrefix']) ? sanitize_text_field($attributes['metaAuthorPrefix']) : __('By', 'fancy-post-grid');
    $metaSeperator = isset($attributes['metaSeperator']) ? sanitize_text_field($attributes['metaSeperator']) : '';
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
    $metaMarginNew = isset($attributes['metaMarginNew']) ? $attributes['metaMarginNew'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $metaPadding = isset($attributes['metaPadding']) ? $attributes['metaPadding'] : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $metaTextColor = isset($attributes['metaTextColor']) ? sanitize_hex_color($attributes['metaTextColor']) : '#333333';
    $separatorColor = isset($attributes['separatorColor']) ? sanitize_hex_color($attributes['separatorColor']) : '#cccccc';
    $metaFontSize = isset($attributes['metaFontSize']) ? absint($attributes['metaFontSize']) : 16;
    $metaIconColor = isset($attributes['metaIconColor']) ? sanitize_hex_color($attributes['metaIconColor']) : '#555555';
    
    // Button Alignment
    $buttonAlignment = isset($attributes['buttonAlignment']) ? sanitize_text_field($attributes['buttonAlignment']) : 'left';
    $buttonMarginNew = isset($attributes['buttonMarginNew']) ? array_map('sanitize_text_field', $attributes['buttonMarginNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $buttonPaddingNew = isset($attributes['buttonPaddingNew']) ? array_map('sanitize_text_field', $attributes['buttonPaddingNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $buttonBorderWidth = isset($attributes['buttonBorderWidth']) ? array_map('sanitize_text_field', $attributes['buttonBorderWidth']) : ['top' => '0', 'right' => '', 'bottom' => '0', 'left' => '0'];
    $buttonFontSize = isset($attributes['buttonFontSize']) ? absint($attributes['buttonFontSize']) : 16;
    $buttonFontWeight = isset($attributes['buttonFontWeight']) ? sanitize_text_field($attributes['buttonFontWeight']) : '700';
    $buttonTextColor = isset($attributes['buttonTextColor']) ? sanitize_hex_color($attributes['buttonTextColor']) : '#ffffff';
    $buttonBackgroundColor = isset($attributes['buttonBackgroundColor']) ? sanitize_hex_color($attributes['buttonBackgroundColor']) : '#0073aa';
    $buttonBorderType = isset($attributes['buttonBorderType']) ? sanitize_text_field($attributes['buttonBorderType']) : 'solid';
    $buttonBorderRadius = isset($attributes['buttonBorderRadius']) ? array_map('sanitize_text_field', $attributes['buttonBorderRadius']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $buttonHoverTextColor = isset($attributes['buttonHoverTextColor']) ? sanitize_hex_color($attributes['buttonHoverTextColor']) : '#ffffff';
    $buttonHoverBackgroundColor = isset($attributes['buttonHoverBackgroundColor']) ? sanitize_hex_color($attributes['buttonHoverBackgroundColor']) : '#005177';
    
    $buttonBorderColor = isset($attributes['buttonBorderColor']) ? sanitize_hex_color($attributes['buttonBorderColor']) : '#ffffff';
    $buttonHoverBorderColor = isset($attributes['buttonHoverBorderColor']) ? sanitize_hex_color($attributes['buttonHoverBorderColor']) : '#005177';

    // Pagination Attributes
    $paginationAlignment = isset($attributes['paginationAlignment']) ? sanitize_text_field($attributes['paginationAlignment']) : 'center';
    $paginationMarginNew = isset($attributes['paginationMarginNew']) ? array_map('sanitize_text_field', $attributes['paginationMarginNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $paginationPaddingNew = isset($attributes['paginationPaddingNew']) ? array_map('sanitize_text_field', $attributes['paginationPaddingNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $paginationBorderWidthNew = isset($attributes['paginationBorderWidthNew']) ? array_map('sanitize_text_field', $attributes['paginationBorderWidthNew']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $paginationBorderStyle = isset($attributes['paginationBorderStyle']) ? sanitize_text_field($attributes['paginationBorderStyle']) : 'solid';
    $paginationBorderRadius = isset($attributes['paginationBorderRadius']) ? array_map('sanitize_text_field', $attributes['paginationBorderRadius']) : ['top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0'];
    $paginationGap = isset($attributes['paginationGap']) ? absint($attributes['paginationGap']) : 20;
    $paginationTextColor = isset($attributes['paginationTextColor']) ? sanitize_hex_color($attributes['paginationTextColor']) : '';
    $paginationBackgroundColor = isset($attributes['paginationBackgroundColor']) ? sanitize_hex_color($attributes['paginationBackgroundColor']) : '';
    $paginationBorderColor = isset($attributes['paginationBorderColor']) ? sanitize_hex_color($attributes['paginationBorderColor']) : '';
    $paginationHoverTextColor = isset($attributes['paginationHoverTextColor']) ? sanitize_hex_color($attributes['paginationHoverTextColor']) : '';
    $paginationHoverBackgroundColor = isset($attributes['paginationHoverBackgroundColor']) ? sanitize_hex_color($attributes['paginationHoverBackgroundColor']) : '';
    $paginationHoverBorderColor = isset($attributes['paginationHoverBorderColor']) ? sanitize_hex_color($attributes['paginationHoverBorderColor']) : '';
    $paginationActiveTextColor = isset($attributes['paginationActiveTextColor']) ? sanitize_hex_color($attributes['paginationActiveTextColor']) : '';
    $paginationActiveBackgroundColor = isset($attributes['paginationActiveBackgroundColor']) ? sanitize_hex_color($attributes['paginationActiveBackgroundColor']) : '';
    $paginationActiveBorderColor = isset($attributes['paginationActiveBorderColor']) ? sanitize_hex_color($attributes['paginationActiveBorderColor']) : '';
    $paginationFontSize = isset($attributes['paginationFontSize']) ? absint($attributes['paginationFontSize']) : '16';
    //filter
    $fancyPostFilterAlignment = isset($attributes['fancyPostFilterAlignment']) ? sanitize_text_field($attributes['fancyPostFilterAlignment']) : 'center';
    $fancyPostFilterText = isset($attributes['fancyPostFilterText']) ? sanitize_text_field($attributes['fancyPostFilterText']) : 'ALL';


    $filterMargin = isset($attributes['filterMargin']) ? array_map('sanitize_text_field', $attributes['filterMargin']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];
    $filterPadding = isset($attributes['filterPadding']) ? array_map('sanitize_text_field', $attributes['filterPadding']) : ['top' => '', 'right' => '', 'bottom' => '', 'left' => ''];

    $filterBorderStyle = isset($attributes['filterBorderStyle']) ? sanitize_text_field($attributes['filterBorderStyle']) : 'solid';
    $filterBorderWidth = isset($attributes['filterBorderWidth']) ? absint($attributes['filterBorderWidth']) : 1;
    $filterBorderRadius = isset($attributes['filterBorderRadius']) ? absint($attributes['filterBorderRadius']) : 4;
    $filterFontSize = isset($attributes['filterFontSize']) ? absint($attributes['filterFontSize']) : 16;
    $filterGap = isset($attributes['filterGap']) ? absint($attributes['filterGap']) : 20;

    $filterTextColor = isset($attributes['filterTextColor']) ? sanitize_hex_color($attributes['filterTextColor']) : '';
    $filterBackgroundColor = isset($attributes['filterBackgroundColor']) ? sanitize_hex_color($attributes['filterBackgroundColor']) : '';
    $filterBorderColor = isset($attributes['filterBorderColor']) ? sanitize_hex_color($attributes['filterBorderColor']) : '';

    $filterHoverTextColor = isset($attributes['filterHoverTextColor']) ? sanitize_hex_color($attributes['filterHoverTextColor']) : '';
    $filterHoverBackgroundColor = isset($attributes['filterHoverBackgroundColor']) ? sanitize_hex_color($attributes['filterHoverBackgroundColor']) : '';
    $filterHoverBorderColor = isset($attributes['filterHoverBorderColor']) ? sanitize_hex_color($attributes['filterHoverBorderColor']) : '';

    $filterActiveTextColor = isset($attributes['filterActiveTextColor']) ? sanitize_hex_color($attributes['filterActiveTextColor']) : '';
    $filterActiveBackgroundColor = isset($attributes['filterActiveBackgroundColor']) ? sanitize_hex_color($attributes['filterActiveBackgroundColor']) : '';
    $filterActiveBorderColor = isset($attributes['filterActiveBorderColor']) ? sanitize_hex_color($attributes['filterActiveBorderColor']) : '';


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
    if ($isotopeLayoutStyle === 'style1') {
        $output = '<div class="rs-blog-layout-4 rs-blog-layout-10' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    }
    else if ($isotopeLayoutStyle === 'style2') {
        $output = '<div class="rs-blog-layout-5 rs-blog-layout-10' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    }
    else if ($isotopeLayoutStyle === 'style3') {
        $output = '<div class="rs-blog-layout-28 rs-blog-layout-10' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    }
    else if ($isotopeLayoutStyle === 'style4') {
        $output = '<div class="rs-blog-layout-30 rs-blog-layout-10' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    }
    else if ($isotopeLayoutStyle === 'style5') {
        $output = '<div class="rs-blog-layout-12' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    }
    else if ($isotopeLayoutStyle === 'style6') {
        $output = '<div class="rs-blog-layout-15' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    } 
    else if ($isotopeLayoutStyle === 'style7') {
        $output = '<div class="rs-blog-layout-26' . esc_attr($isotopeLayoutStyle) . '" style=" background-color: ' . esc_attr($sectionBgColor) . '; 
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
    }        

        if ($isotopeLayoutStyle === 'style1') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-1-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }
        else if ($isotopeLayoutStyle === 'style2') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-2-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }
        else if ($isotopeLayoutStyle === 'style3') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-3-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }
        else if ($isotopeLayoutStyle === 'style4') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-4-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }
        else if ($isotopeLayoutStyle === 'style5') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-5-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }
        else if ($isotopeLayoutStyle === 'style6') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-6-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }
        else if ($isotopeLayoutStyle === 'style7') {

            // Build filter button styles
            $buttonBaseStyle = '';
            $buttonBaseStyle .= 'font-size:' . esc_attr($filterFontSize) . 'px;';
            $buttonBaseStyle .= 'color:' . esc_attr($filterTextColor) . ';';
            $buttonBaseStyle .= 'background-color:' . esc_attr($filterBackgroundColor) . ';';
            $buttonBaseStyle .= 'border-style:' . esc_attr($filterBorderStyle) . ';';
            $buttonBaseStyle .= 'border-width:' . esc_attr($filterBorderWidth) . 'px;';
            $buttonBaseStyle .= 'border-radius:' . esc_attr($filterBorderRadius) . 'px;';
            $buttonBaseStyle .= 'border-color:' . esc_attr($filterBorderColor) . ';';
            $buttonBaseStyle .= 'padding: ' .
                (is_numeric($filterPadding['top']) ? $filterPadding['top'] . 'px' : esc_attr($filterPadding['top'])) . ' ' .
                (is_numeric($filterPadding['right']) ? $filterPadding['right'] . 'px' : esc_attr($filterPadding['right'])) . ' ' .
                (is_numeric($filterPadding['bottom']) ? $filterPadding['bottom'] . 'px' : esc_attr($filterPadding['bottom'])) . ' ' .
                (is_numeric($filterPadding['left']) ? $filterPadding['left'] . 'px' : esc_attr($filterPadding['left'])) . ';';
            $buttonBaseStyle .= 'margin: ' .
                (is_numeric($filterMargin['top']) ? $filterMargin['top'] . 'px' : esc_attr($filterMargin['top'])) . ' ' .
                (is_numeric($filterMargin['right']) ? $filterMargin['right'] . 'px' : esc_attr($filterMargin['right'])) . ' ' .
                (is_numeric($filterMargin['bottom']) ? $filterMargin['bottom'] . 'px' : esc_attr($filterMargin['bottom'])) . ' ' .
                (is_numeric($filterMargin['left']) ? $filterMargin['left'] . 'px' : esc_attr($filterMargin['left'])) . ';';

            // Inline <style> for active state
            $unique_id = 'filter-' . uniqid();
            $output .= '<style>';
            $output .= '#' . $unique_id . ' .filter-button-group button.active {';
            $output .= 'color:' . esc_attr($filterActiveTextColor) . ';';
            $output .= 'background-color:' . esc_attr($filterActiveBackgroundColor) . ';';
            $output .= 'border-color:' . esc_attr($filterActiveBorderColor) . ';';
            $output .= '}';
            $output .= '</style>';

            // Output filter buttons
            $output .= '<div class="row" id="' . esc_attr($unique_id) . '">';
            $output .= '<div class="col-lg-12">';
            $output .= '<div class="rs-blog-layout-7-filter" style="display:flex;gap:' . esc_attr($filterGap) . 'px;justify-content:' . esc_attr($fancyPostFilterAlignment) . ';">';
            $output .= '<div class="filter-button-group">';

            // "All" button with hover effect
            $output .= '<button class="active" data-filter="*" style="' . esc_attr($buttonBaseStyle) . '"
                onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                             this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                             this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                            this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                            this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($fancyPostFilterText) . '</button>';

            // Category buttons with hover effect
            $categories = get_categories([
                'hide_empty' => true,
            ]);

            foreach ($categories as $category) {
                $output .= '<button data-filter=".' . esc_attr($category->slug) . '" style="' . esc_attr($buttonBaseStyle) . '"
                    onmouseover="this.style.color=\'' . esc_attr($filterHoverTextColor) . '\';
                                 this.style.backgroundColor=\'' . esc_attr($filterHoverBackgroundColor) . '\';
                                 this.style.borderColor=\'' . esc_attr($filterHoverBorderColor) . '\';"
                    onmouseout="this.style.color=\'' . esc_attr($filterTextColor) . '\';
                                this.style.backgroundColor=\'' . esc_attr($filterBackgroundColor) . '\';
                                this.style.borderColor=\'' . esc_attr($filterBorderColor) . '\';">' . esc_html($category->name) . '</button>';
            }

            $output .= '</div>'; // .filter-button-group
            $output .= '</div>'; // .rs-blog-layout-3-filter
            $output .= '</div>'; // .col-lg-12
            $output .= '</div>'; // .row
        }

        $output .= '<div class="row rs-grid" >';
                        

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
            $categories = get_the_category();
            $category_classes = '';

            // Add category slugs as class for Isotope filtering
            foreach ($categories as $cat) {
                $category_classes .= ' ' . sanitize_html_class($cat->slug);
            }
            
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
            if ($isotopeLayoutStyle === 'style1') {
                // Full post layout
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">'; 
                $output .= '<div class="fancy-post-item rs-blog__single" style=" margin: ' . 
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

                if ($showPostCategory) {
                    $categories_list = get_the_category();

                    if (!empty($categories_list)) {
                        $category_links = array();

                        foreach ($categories_list as $category) {
                            $category_links[] = '<a href="' . esc_url(get_category_link($category->term_id)) . '">' . esc_html($category->name) . '</a>';
                        }

                        $output .= '<div class="rs-category">' . implode(', ', $category_links) . '</div>';
                    }
                }
   
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
                    $output .= '<div class="fpg-excerpt" style="order: ' . esc_attr($excerptOrder) . '; 
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

                $output .= '<div class="rs-blog-footer" style="margin: ' . 
                        (is_numeric($buttonMarginNew['top']) ? $buttonMarginNew['top'] . 'px' : esc_attr($buttonMarginNew['top'])) . ' ' . 
                        (is_numeric($buttonMarginNew['right']) ? $buttonMarginNew['right'] . 'px' : esc_attr($buttonMarginNew['right'])) . ' ' . 
                        (is_numeric($buttonMarginNew['bottom']) ? $buttonMarginNew['bottom'] . 'px' : esc_attr($buttonMarginNew['bottom'])) . ' ' . 
                        (is_numeric($buttonMarginNew['left']) ? $buttonMarginNew['left'] . 'px' : esc_attr($buttonMarginNew['left'])) . '; text-align: ' . esc_attr($buttonAlignment) . '; order: ' . esc_attr($buttonOrder) . ';">';
                    $output .= '<span>';    

                        if ($showPostCommentsCount) {
                            $meta = '<div class="meta-comment-count" style="color:' . esc_attr($metaTextColor) . ';">';
                            
                            if ($showPostCommentsCountIcon && $showMetaIcon) {
                                $meta .= '<i class="ri-chat-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                            }

                            $meta .= esc_html($comments_count) . ' ' . esc_html__('Comments', 'fancy-post-grid') . '</div>';
                            
                            $output .= $meta; // Append the $meta content to the output
                        }

                    $output .= '</span>';

                // Button Output                
                if ($showReadMoreButton) {
                    

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

                    $output .= '<a class="blog-btn read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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
                    
                }
                // End Button
                $output .= '</div>';

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                $output .= '</div>';
                // End Full post layout
            }
            
            else if ($isotopeLayoutStyle === 'style2') {
                // Full post layout
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">'; 
                $output .= '<div class="rs-blog__single" style=" margin: ' . 
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
                    $output .= '<div class="fpg-excerpt" style="order: ' . esc_attr($excerptOrder) . '; 
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

                    $output .= '<a class="rs-link read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonInlineStyles) . '" onmouseover="' . esc_attr($buttonHoverInlineStyles) . '" onmouseout="' . esc_attr($buttonResetStyles) . '">';

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
            else if ($isotopeLayoutStyle === 'style3') {
                
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">';  
                // Full post layout
                $output .= '<div class="fancy-post-item rs-blog-layout-28-item" 
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
                            (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">';

                        $output .= '<a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' . 
                            (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' . 
                            (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' . 
                            (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' . 
                            (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . '; overflow: hidden;">' . $thumbnail . '</a>';

                        // Now Insert Meta Data inside the Thumbnail
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

                            if ($showPostCategory) {
                                $meta = '<li class="meta-categories" style="color:' . esc_attr($metaTextColor) . ';">';
                                if ($showPostCategoryIcon && $showMetaIcon) {
                                    $meta .= '<i class="ri-folder-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
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
                            (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . '; ">';

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
                    $buttonHoverInlineStyles = "this.style.color='" . esc_attr($buttonHoverTextColor) . "';this.style.borderColor='" . esc_attr($buttonHoverBorderColor) . "';
                                                this.style.backgroundColor='" . esc_attr($buttonHoverBackgroundColor) . "';";

                    $buttonResetStyles = "this.style.color='" . esc_attr($buttonTextColor) . "';
                                          this.style.borderColor='" . esc_attr($buttonBorderColor) . "';

                                          this.style.backgroundColor='" . esc_attr($buttonBackgroundColor) . "';";

                    $output .= '<a class="rs-btn  read-more ' . esc_attr($buttonStyle) . '" 
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
                $output .= '</div>';
                
                // End Full post layout
                
            }
            else if ($isotopeLayoutStyle === 'style4') {
                // Full post layout
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">';  
                $output .= '<div class="fancy-post-item rs-blog-layout-30-item" 
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
                            $output .= '<div class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                            $output .= '<span>';
                            if ($showPostDateIcon && $showMetaIcon) {
                                $output .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                            }
                            $output .= esc_html($date);
                            $output .= '</span>';
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
                    (is_numeric($contentBorderWidth['left']) ? $contentBorderWidth['left'] . 'px' : esc_attr($contentBorderWidth['left'])) . ';  border-style: ' . esc_attr($contentNormalBorderType) . ';background-color: ' . esc_attr($contentBgColor) . ';border-color: ' . esc_attr($contentBorderColor) . '; ">';

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
                // Now Insert Meta Data inside the Thumbnail
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

                    // Categories

                    if ($showPostCategory) {
                        $meta = '<li class="meta-categories" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-folder-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
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

                $output .= '</div>';
                // End MAIN Content
                $output .= '</div>';
                $output .= '</div>';
                // End Full post layout
            }
            elseif ($isotopeLayoutStyle === 'style5') {
                // Full post layout
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">';  
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
                $output .= '</div>';
                // End Full post layout
            } 
            else if ($isotopeLayoutStyle === 'style6') {
                // Full post layout
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">'; 
                $output .= '<div class="fancy-post-item rs-blog-layout-15-item" style=" margin: ' . 
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
                        $meta = '<span class="meta-date" style="color:' . esc_attr($metaTextColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">';
                        if ($showPostDateIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($date) . '</span>';
                        $meta_items[] = $meta;
                    }

                    // Author
                    if ($showPostAuthor) {
                        $meta = '<a class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon && $showMetaIcon) {
                            $meta .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $meta .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</a>';
                        $meta_items[] = $meta;
                    }

                    // Now join meta items with the separator
                    $output .= implode('<span class="meta-separator" style="color:' . esc_attr($metaIconColor) . '; font-size:' . esc_attr($metaFontSize) . 'px;">' . esc_html($metaSeperator) . '</span>', $meta_items);

                    $output .= '</div>'; // Close meta-data-list
                    
                }
                // End Meta Data

                $output .= '</div>';

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
                        (is_numeric($thumbnailPadding['left']) ? $thumbnailPadding['left'] . 'px' : esc_attr($thumbnailPadding['left'])) . '; ">';

                    $output .= '<a href="' . esc_url($permalink) . '" style="display: block; border-radius: ' . 
                        (is_numeric($thumbnailBorderRadius['top']) ? $thumbnailBorderRadius['top'] . 'px' : esc_attr($thumbnailBorderRadius['top'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['right']) ? $thumbnailBorderRadius['right'] . 'px' : esc_attr($thumbnailBorderRadius['right'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['bottom']) ? $thumbnailBorderRadius['bottom'] . 'px' : esc_attr($thumbnailBorderRadius['bottom'])) . ' ' . 
                        (is_numeric($thumbnailBorderRadius['left']) ? $thumbnailBorderRadius['left'] . 'px' : esc_attr($thumbnailBorderRadius['left'])) . '; overflow: hidden;">' . $thumbnail . '</a>';

                    // Now Insert Meta Data inside the Thumbnail
                    // Category
                    if ($showPostCategory) {
                        $categories_list = get_the_category();

                        if (!empty($categories_list)) {
                            $category_names = array();

                            foreach ($categories_list as $category) {
                                $category_names[] = esc_html($category->name); // plain category names
                            }

                            $output .= '<div class="rs-category">' . implode(', ', $category_names) . '</div>';
                        }
                    }
                    $output .= '</div>'; // Close fancy-post-image rs-thumb
                }
                // END Thumbnail

                // End MAIN Content
                $output .= '</div>';
                $output .= '</div>';
                // End Full post layout
            }
            else if ($isotopeLayoutStyle === 'style7') {
                // Full post layout
                $output .= '<div class="col-lg-4 rs-grid-item' . esc_attr($category_classes) . '">'; 
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
                $output .= '</div>';
                // End Full post layout
            }
            
        }
        
        
        $output .= '</div>'; // End row
        $output .= '</div>'; // End .fancy-post-grid
        // Check if pagination is enabled
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