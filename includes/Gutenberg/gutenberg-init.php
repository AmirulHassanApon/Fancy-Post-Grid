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

    $output = '<div class="rs-blog-layout-5 fancy-post-grid">';

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
        $output .= '<div class="btn-wrapper">';
        $output .= '<a class="rs-link read-more" href="' . get_permalink() . '"> Read More</a>';

        $output .= '</div>';
        $output .= '</div>';
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
