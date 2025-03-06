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
    $buttonMargin = isset($attributes['buttonMargin']) ? $attributes['buttonMargin'] : ['top' => '0px', 'right' => '0px', 'bottom' => '0px', 'left' => '0px'];
    $buttonPadding = isset($attributes['buttonPadding']) ? $attributes['buttonPadding'] : ['top' => '10px', 'right' => '20px', 'bottom' => '10px', 'left' => '20px'];
    $buttonTextColor = isset($attributes['buttonTextColor']) ? sanitize_hex_color($attributes['buttonTextColor']) : '#ffffff';
    $buttonBackgroundColor = isset($attributes['buttonBackgroundColor']) ? sanitize_hex_color($attributes['buttonBackgroundColor']) : '#0073aa';
    $buttonBorderType = isset($attributes['buttonBorderType']) ? sanitize_text_field($attributes['buttonBorderType']) : 'solid';
    $buttonBorderRadius = isset($attributes['buttonBorderRadius']) ? sanitize_text_field($attributes['buttonBorderRadius']) : '5px';
    $buttonHoverTextColor = isset($attributes['buttonHoverTextColor']) ? sanitize_hex_color($attributes['buttonHoverTextColor']) : '#ffffff';
    $buttonHoverBackgroundColor = isset($attributes['buttonHoverBackgroundColor']) ? sanitize_hex_color($attributes['buttonHoverBackgroundColor']) : '#005177';
    $buttonHoverBorderType = isset($attributes['buttonHoverBorderType']) ? sanitize_text_field($attributes['buttonHoverBorderType']) : 'solid';
    $buttonHoverBorderRadius = isset($attributes['buttonHoverBorderRadius']) ? sanitize_text_field($attributes['buttonHoverBorderRadius']) : '5px';
    $buttonBorderColor = isset($attributes['buttonBorderColor']) ? sanitize_hex_color($attributes['buttonBorderColor']) : '#ffffff';
    $buttonHoverBorderColor = isset($attributes['buttonHoverBorderColor']) ? sanitize_hex_color($attributes['buttonHoverBorderColor']) : '#005177';

    // Button Style
    $buttonStyles = 'display: inline-flex; align-items: center; justify-content: center; text-decoration: none;';
    $buttonStyles .= ' color: ' . esc_attr($buttonTextColor) . ';';
    $buttonStyles .= ' background-color: ' . esc_attr($buttonBackgroundColor) . ';';
    $buttonStyles .= ' border: 1px ' . esc_attr($buttonBorderType) . ' ' . esc_attr($buttonTextColor) . ';';
    $buttonStyles .= ' border-radius: ' . esc_attr($buttonBorderRadius) . ';';
    $buttonStyles .= ' padding: ' . esc_attr($buttonPadding['top']) . ' ' . esc_attr($buttonPadding['right']) . ' ' . esc_attr($buttonPadding['bottom']) . ' ' . esc_attr($buttonPadding['left']) . ';';
    $buttonStyles .= ' margin: ' . esc_attr($buttonMargin['top']) . ' ' . esc_attr($buttonMargin['right']) . ' ' . esc_attr($buttonMargin['bottom']) . ' ' . esc_attr($buttonMargin['left']) . ';';
    $buttonStyles .= ' transition: all 0.3s ease-in-out;';

    // Button Hover Styles
    $buttonHoverStyles = 'this.style.color=\'' . esc_attr($buttonHoverTextColor) . '\';';
    $buttonHoverStyles .= ' this.style.backgroundColor=\'' . esc_attr($buttonHoverBackgroundColor) . '\';';
    $buttonHoverStyles .= ' this.style.border=\'' . esc_attr($buttonHoverBorderType) . ' ' . esc_attr($buttonHoverTextColor) . '\';';
    $buttonHoverStyles .= ' this.style.borderRadius=\'' . esc_attr($buttonHoverBorderRadius) . '\';';

    // Pagination Attributes
    $paginationAlignment = isset($attributes['paginationAlignment']) ? sanitize_text_field($attributes['paginationAlignment']) : 'center';
    $paginationMargin = isset($attributes['paginationMargin']) ? $attributes['paginationMargin'] : ['top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0];
    $paginationPadding = isset($attributes['paginationPadding']) ? $attributes['paginationPadding'] : ['top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0];
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
    );

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
                        $output .= '<li class="meta-date" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostDateIcon && $showMetaIcon) {
                            $output .= '<i class="ri-calendar-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= esc_html($date) . '</li> ' . esc_html($metaSeperator) . ' ';
                    }

                    // Author
                    if ($showPostAuthor) {
                        $output .= '<li class="meta-author" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostAuthorIcon  && $showMetaIcon) {
                            $output .= '<i class="ri-user-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= esc_html($metaAuthorPrefix) . ' ' . esc_html($author) . '</li> ' . esc_html($metaSeperator) . ' ';
                    }
                    
                    // Categories
                    if ($showPostCategory) {
                        $output .= '<li class="meta-categories" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostCategoryIcon && $showMetaIcon) {
                            $output .= '<i class="ri-folder-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= $categories . '</li> ' . esc_html($metaSeperator) . ' ';
                    }

                    // Tags
                    if ($showPostTags && !empty($tags)) {
                        $output .= '<li class="meta-tags" style="color:' . esc_attr($metaTextColor) . ';">';
                        if ($showPostTagsIcon && $showMetaIcon) {
                            $output .= '<i class="ri-price-tag-3-line" style="color:' . esc_attr($metaIconColor) . ';font-size:' . esc_attr($metaFontSize) . 'px;"></i> ';
                        }
                        $output .= esc_html__('Tags:', 'fancy-post-grid') . ' ' . $tags . '</li> ' . esc_html($metaSeperator) . ' ';
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
                                    
                                    margin: ' . esc_attr($postTitleMargin['top']) . ' ' . esc_attr($postTitleMargin['right']) . ' ' . esc_attr($postTitleMargin['bottom']) . ' ' . esc_attr($postTitleMargin['left']) . '; 
                                    padding: ' . esc_attr($postTitlePadding['top']) . ' ' . esc_attr($postTitlePadding['right']) . ' ' . esc_attr($postTitlePadding['bottom']) . ' ' . esc_attr($postTitlePadding['left']) . ';"
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
                                           margin: ' . esc_attr($excerptMargin['top']) . 'px ' . esc_attr($excerptMargin['right']) . 'px ' . esc_attr($excerptMargin['bottom']) . 'px ' . esc_attr($excerptMargin['left']) . 'px; 
                                           padding: ' . esc_attr($excerptPadding['top']) . 'px ' . esc_attr($excerptPadding['right']) . 'px ' . esc_attr($excerptPadding['bottom']) . 'px ' . esc_attr($excerptPadding['left']) . 'px;"
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
                    $output .= '<div class="btn-wrapper" style="text-align: ' . esc_attr($buttonAlignment) . '; order: ' . esc_attr($buttonOrder) . ';">';

                    $output .= '<a class="rs-link read-more ' . esc_attr($buttonStyle) . '" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonStyles) . '" 
                                onmouseover="' . esc_attr($buttonHoverStyles) . '" 
                                onmouseout="this.style.color=\'' . esc_attr($buttonTextColor) . '\';
                                            this.style.backgroundColor=\'' . esc_attr($buttonBackgroundColor) . '\';
                                            this.style.border=\'1px ' . esc_attr($buttonBorderType) . ' ' . esc_attr($buttonTextColor) . '\';
                                            this.style.borderRadius=\'' . esc_attr($buttonBorderRadius) . '\';">';

                    // Icon setup (Remix Arrow Icons)
                    $leftIcon = '<i class="ri-arrow-right-line"></i>';  // Right arrow icon
                    $rightIcon = '<i class="ri-arrow-right-line"></i>'; // Right arrow icon

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
                margin: ' . esc_attr($paginationMargin['top']) . ' ' . esc_attr($paginationMargin['right']) . ' ' . esc_attr($paginationMargin['bottom']) . ' ' . esc_attr($paginationMargin['left']) . ';
                padding: ' . esc_attr($paginationPadding['top']) . ' ' . esc_attr($paginationPadding['right']) . ' ' . esc_attr($paginationPadding['bottom']) . ' ' . esc_attr($paginationPadding['left']) . ';
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
                padding: ' . esc_attr($paginationPadding['top']) . ' ' . esc_attr($paginationPadding['right']) . ' ' . esc_attr($paginationPadding['bottom']) . ' ' . esc_attr($paginationPadding['left']) . ';
                margin-right: ' . esc_attr($paginationGap) . 'px;
                border-style: ' . esc_attr($paginationBorderStyle) . ';
                border-width: ' . esc_attr($paginationBorderWidth) . 'px;
                border-radius: ' . esc_attr($paginationBorderRadius) . 'px;
                border-color: ' . esc_attr($paginationBorderColor) . ';
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