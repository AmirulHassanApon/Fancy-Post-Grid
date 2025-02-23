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

    $layoutStyle = isset($attributes['layoutStyle']) ? $attributes['layoutStyle'] : 'style1';
    
    $selectedAuthor = isset($attributes['selectedAuthor']) ? sanitize_text_field($attributes['selectedAuthor']) : '';
    $selectedCategory = isset($attributes['selectedCategory']) ? sanitize_text_field($attributes['selectedCategory']) : '';
    $selectedTag = isset($attributes['selectedTag']) ? sanitize_text_field($attributes['selectedTag']) : '';
    $sortOrder = isset($attributes['sortOrder']) ? sanitize_text_field($attributes['sortOrder']) : 'DESC';
    $postLinkTarget = isset($attributes['postLinkTarget']) ? sanitize_text_field($attributes['postLinkTarget']) : '_self';
    $thumbnailLink = isset($attributes['thumbnailLink']) ? sanitize_text_field($attributes['thumbnailLink']) : 'post';
    $postLinkType = isset($attributes['postLinkType']) ? sanitize_text_field($attributes['postLinkType']) : 'default';

    // Boolean values
    $showPostTitle = !empty($attributes['showPostTitle']);
    $showThumbnail = !empty($attributes['showThumbnail']);
    $showPostExcerpt = !empty($attributes['showPostExcerpt']);
    $showReadMoreButton = !empty($attributes['showReadMoreButton']);
    $showMetaData = !empty($attributes['showMetaData']);
    $showPostDate = !empty($attributes['showPostDate']);
    $showPostAuthor = !empty($attributes['showPostAuthor']);
    $showPostCategory = !empty($attributes['showPostCategory']);
    $showPostTags = !empty($attributes['showPostTags']);
    $showPostCommentsCount = !empty($attributes['showPostCommentsCount']);
    $showMetaIcon = !empty($attributes['showMetaIcon']);
    $showPostDateIcon = !empty($attributes['showPostDateIcon']);
    $showPostAuthorIcon = !empty($attributes['showPostAuthorIcon']);
    $showPostCategoryIcon = !empty($attributes['showPostCategoryIcon']);
    $showPostTagsIcon = !empty($attributes['showPostTagsIcon']);
    $showPostCommentsCountIcon = !empty($attributes['showPostCommentsCountIcon']);

    // Styling
    $itemBackgroundColor = isset($attributes['itemBackgroundColor']) ? sanitize_hex_color($attributes['itemBackgroundColor']) : '';
    $itemBorderWidth = isset($attributes['itemBorderWidth']) ? absint($attributes['itemBorderWidth']) : 1;
    $itemBorderType = isset($attributes['itemBorderType']) ? sanitize_text_field($attributes['itemBorderType']) : 'solid';

    // Order values
    $metaOrder = isset($attributes['metaOrder']) ? absint($attributes['metaOrder']) : 2;
    $titleOrder = isset($attributes['titleOrder']) ? absint($attributes['titleOrder']) : 1;
    $excerptOrder = isset($attributes['excerptOrder']) ? absint($attributes['excerptOrder']) : 3;
    $buttonOrder = isset($attributes['buttonOrder']) ? absint($attributes['buttonOrder']) : 4;

    // Post title settings
    $titleTag = isset($attributes['titleTag']) ? sanitize_text_field($attributes['titleTag']) : 'h3';
    $titleHoverUnderLine = !empty($attributes['titleHoverUnderLine']);
    $titleCropBy = isset($attributes['titleCropBy']) ? sanitize_text_field($attributes['titleCropBy']) : 'words';
    $titleLength = isset($attributes['titleLength']) ? absint($attributes['titleLength']) : 10;

    // Thumbnail
    $thumbnailSize = isset($attributes['thumbnailSize']) ? sanitize_text_field($attributes['thumbnailSize']) : 'medium';
    $thumbnailImageWidth = isset($attributes['thumbnailImageWidth']) ? absint($attributes['thumbnailImageWidth']) : '';
    $thumbnailWrapperWidth = isset($attributes['thumbnailWrapperWidth']) ? absint($attributes['thumbnailWrapperWidth']) : '';
    $thumbnailWrapperHeight = isset($attributes['thumbnailWrapperHeight']) ? absint($attributes['thumbnailWrapperHeight']) : '';
    $thumbnailMargin = isset($attributes['thumbnailMargin']) ? sanitize_text_field($attributes['thumbnailMargin']) : '';
    $thumbnailPadding = isset($attributes['thumbnailPadding']) ? sanitize_text_field($attributes['thumbnailPadding']) : '';
    $thumbnailBorderRadius = isset($attributes['thumbnailBorderRadius']) ? sanitize_text_field($attributes['thumbnailBorderRadius']) : '';
    $thumbnailBorderType = isset($attributes['thumbnailBorderType']) ? sanitize_text_field($attributes['thumbnailBorderType']) : '';
    $thumbnailBoxShadowColor = isset($attributes['thumbnailBoxShadowColor']) ? sanitize_hex_color($attributes['thumbnailBoxShadowColor']) : '';

    // Excerpt
    $excerptType = isset($attributes['excerptType']) ? sanitize_text_field($attributes['excerptType']) : 'words';
    $excerptIndicator = isset($attributes['excerptIndicator']) ? sanitize_text_field($attributes['excerptIndicator']) : '...';
    $excerptLimit = isset($attributes['excerptLimit']) ? absint($attributes['excerptLimit']) : 20;

    // Meta
    $metaAuthorPrefix = isset($attributes['metaAuthorPrefix']) ? sanitize_text_field($attributes['metaAuthorPrefix']) : __('By', 'fancy-post-grid');
    $metaSeperator = isset($attributes['metaSeperator']) ? sanitize_text_field($attributes['metaSeperator']) : '|';
    $authorIcon = isset($attributes['authorIcon']) ? sanitize_text_field($attributes['authorIcon']) : '';
    $metaAuthorIcon = isset($attributes['metaAuthorIcon']) ? sanitize_text_field($attributes['metaAuthorIcon']) : '';

    // Read More Button
    $showButtonIcon = !empty($attributes['showButtonIcon']);
    $iconPosition = isset($attributes['iconPosition']) ? sanitize_text_field($attributes['iconPosition']) : 'left';
    $buttonStyle = isset($attributes['buttonStyle']) ? sanitize_text_field($attributes['buttonStyle']) : 'default';
    $readMoreLabel = isset($attributes['readMoreLabel']) ? sanitize_text_field($attributes['readMoreLabel']) : __('Read More', 'fancy-post-grid');

    // Button Alignment
    $buttonAlignment = isset($attributes['buttonAlignment']) ? sanitize_text_field($attributes['buttonAlignment']) : 'center';

    // Button Margin
    $buttonMargin = isset($attributes['buttonMargin']) ? $attributes['buttonMargin'] : ['top' => '0px', 'right' => '0px', 'bottom' => '0px', 'left' => '0px'];

    // Button Padding
    $buttonPadding = isset($attributes['buttonPadding']) ? $attributes['buttonPadding'] : ['top' => '10px', 'right' => '20px', 'bottom' => '10px', 'left' => '20px'];

    // Normal State
    $buttonTextColor = isset($attributes['buttonTextColor']) ? sanitize_hex_color($attributes['buttonTextColor']) : '#ffffff';
    $buttonBackgroundColor = isset($attributes['buttonBackgroundColor']) ? sanitize_hex_color($attributes['buttonBackgroundColor']) : '#0073aa';
    $buttonBorderType = isset($attributes['buttonBorderType']) ? sanitize_text_field($attributes['buttonBorderType']) : 'solid';
    $buttonBorderRadius = isset($attributes['buttonBorderRadius']) ? sanitize_text_field($attributes['buttonBorderRadius']) : '5px';

    // Hover State
    $buttonHoverTextColor = isset($attributes['buttonHoverTextColor']) ? sanitize_hex_color($attributes['buttonHoverTextColor']) : '#ffffff';
    $buttonHoverBackgroundColor = isset($attributes['buttonHoverBackgroundColor']) ? sanitize_hex_color($attributes['buttonHoverBackgroundColor']) : '#005177';
    $buttonHoverBorderType = isset($attributes['buttonHoverBorderType']) ? sanitize_text_field($attributes['buttonHoverBorderType']) : 'solid';
    $buttonHoverBorderRadius = isset($attributes['buttonHoverBorderRadius']) ? sanitize_text_field($attributes['buttonHoverBorderRadius']) : '5px';

    // Icon (Optional)
    $buttonIcon = $showButtonIcon ? '<span class="button-icon"><i class="ri-arrow-right-line"></i></span>' : ''; // Using Font Awesome icon

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

    // Button Alignment
    $alignmentStyle = 'text-align: ' . esc_attr($buttonAlignment) . ';';

    // Section Styling
    $sectionBgColor = isset($attributes['sectionBgColor']) ? sanitize_hex_color($attributes['sectionBgColor']) : '';
    $sectionMargin = isset($attributes['sectionMargin']) ? sanitize_text_field($attributes['sectionMargin']) : '';
    $sectionPadding = isset($attributes['sectionPadding']) ? sanitize_text_field($attributes['sectionPadding']) : '';

    // Item Styling
    $itemPadding = isset($attributes['itemPadding']) ? sanitize_text_field($attributes['itemPadding']) : '';
    $itemMargin = isset($attributes['itemMargin']) ? sanitize_text_field($attributes['itemMargin']) : '';
    $itemBorderRadius = isset($attributes['itemBorderRadius']) ? sanitize_text_field($attributes['itemBorderRadius']) : '';
    $itemHoverBackgroundColor = isset($attributes['itemHoverBackgroundColor']) ? sanitize_hex_color($attributes['itemHoverBackgroundColor']) : '';
    $itemBoxAlignment = isset($attributes['itemBoxAlignment']) ? sanitize_text_field($attributes['itemBoxAlignment']) : '';
    $normalBorderType = isset($attributes['normalBorderType']) ? sanitize_text_field($attributes['normalBorderType']) : '';
    $itemBoxShadow = isset($attributes['itemBoxShadow']) ? sanitize_text_field($attributes['itemBoxShadow']) : '';
    $itemBorderColor = isset($attributes['itemBorderColor']) ? sanitize_hex_color($attributes['itemBorderColor']) : '';

    // Pagination
    $enablePagination = !empty($attributes['enablePagination']);
    $paginationAlignment = isset($attributes['paginationAlignment']) ? sanitize_text_field($attributes['paginationAlignment']) : 'center';

    // General Layout
    $textAlign = isset($attributes['textAlign']) ? sanitize_text_field($attributes['textAlign']) : 'left';
    $gridColumns = isset($attributes['gridColumns']) ? absint($attributes['gridColumns']) : 3;
    $postType = isset($attributes['postType']) ? sanitize_text_field($attributes['postType']) : 'post';
    $order = isset($attributes['order']) ? sanitize_text_field($attributes['order']) : 'DESC';
    $postLimit = isset($attributes['postLimit']) ? absint($attributes['postLimit']) : 10;

    // Include/Exclude Posts
    $includePosts = isset($attributes['includePosts']) ? array_map('absint', explode(',', $attributes['includePosts'])) : [];
    $excludePosts = isset($attributes['excludePosts']) ? array_map('absint', explode(',', $attributes['excludePosts'])) : [];



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

    // $output = '<div class="rs-blog-layout-5 fancy-post-grid ' . esc_attr($layoutStyle) . '">';
    $output = '<div class="rs-blog-layout-5 fancy-post-grid ' . esc_attr($layoutStyle) . '" style="grid-template-columns: repeat(' . esc_attr($gridColumns) . ', 1fr);">';

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
        $thumbnail = get_the_post_thumbnail($post_id, $thumbnailSize, ['class' => 'fancy-post-thumbnail']);
        

        // Style-based output
        if ($layoutStyle === 'style1') {
            // Full post layout
            $output .= '<div class="fancy-post-item rs-blog__single">';

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
            $output .= '<h3 class="title"><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
            // End Title

            // Excerpt
            $output .= '<div class="fpg-excerpt">';
            $output .= '<p>' . esc_html($excerpt) . '</p>';
            $output .= '</div>';
            // End Excerpt

            
            // Button Output
            $output .= '<div class="btn-wrapper" style="' . esc_attr($alignmentStyle) . '">';
            $output .= '<a class="rs-link read-more" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonStyles) . '" 
                        onmouseover="' . esc_attr($buttonHoverStyles) . '" 
                        onmouseout="this.style.color=\'' . esc_attr($buttonTextColor) . '\';
                                    this.style.backgroundColor=\'' . esc_attr($buttonBackgroundColor) . '\';
                                    this.style.border=\'1px ' . esc_attr($buttonBorderType) . ' ' . esc_attr($buttonTextColor) . '\';
                                    this.style.borderRadius=\'' . esc_attr($buttonBorderRadius) . '\';">';
                        
            // Icon Positioning
            if ($iconPosition === 'left' && $showButtonIcon) {
                $output .= $buttonIcon . ' ';
                echo $buttonIcon;
            }
            $output .= esc_html($readMoreLabel);
            if ($iconPosition === 'right' && $showButtonIcon) {
                $output .= ' ' . $buttonIcon;
                echo $buttonIcon;

            }

            $output .= '</a>';
            $output .= '</div>';
            // End Button

            $output .= '</div>';
            // End MAIN Content
            $output .= '</div>';
            // End Full post layout
        }
        
        
         elseif ($layoutStyle === 'style2') {
            // Only Title, Image, and Excerpt
            $output .= '<div class="fancy-post-image"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
            $output .= '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
            $output .= '<p>' . esc_html($excerpt) . '</p>';
        } elseif ($layoutStyle === 'style3') {
            // Only Title & Image
            $output .= '<div class="fancy-post-image"><a href="' . esc_url($permalink) . '">' . $thumbnail . '</a></div>';
            $output .= '<h3><a href="' . esc_url($permalink) . '">' . esc_html($title) . '</a></h3>';
        } elseif ($layoutStyle === 'style4') {
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
            // Button Output
            $output .= '<div class="btn-wrapper" style="' . esc_attr($alignmentStyle) . '">';
            $output .= '<a class="rs-link read-more" href="' . esc_url(get_permalink()) . '" style="' . esc_attr($buttonStyles) . '" 
                        onmouseover="' . esc_attr($buttonHoverStyles) . '" 
                        onmouseout="this.style.color=\'' . esc_attr($buttonTextColor) . '\';
                                    this.style.backgroundColor=\'' . esc_attr($buttonBackgroundColor) . '\';
                                    this.style.border=\'1px ' . esc_attr($buttonBorderType) . ' ' . esc_attr($buttonTextColor) . '\';
                                    this.style.borderRadius=\'' . esc_attr($buttonBorderRadius) . '\';">';
                        
            // Icon Positioning
            if ($iconPosition === 'left' && $showButtonIcon) {
                $output .= $buttonIcon . ' ';
            }
            $output .= esc_html($readMoreLabel);
            if ($iconPosition === 'right' && $showButtonIcon) {
                $output .= ' ' . $buttonIcon;
            }

            $output .= '</a>';
            $output .= '</div>';
            $output .= '</div>';
            $output .= '</div>';
        }
        
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