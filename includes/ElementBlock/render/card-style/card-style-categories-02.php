<?php
$settings = $this->get_settings_for_display();

// Get the current page number
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

// Prepare arguments for WP_Query
$args = array(
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => $settings['posts_per_page'],
    'orderby'        => 'date',
    'order'          => $settings['sort_order'],
    'category__in'   => !empty($settings['category_filter']) ? $settings['category_filter'] : '',
    'tag__in'        => !empty($settings['tag_filter']) ? $settings['tag_filter'] : '',
    'author'         => !empty($settings['author_filter']) ? $settings['author_filter'] : '',
    'post__in'       => !empty($settings['include_posts']) ? explode(',', $settings['include_posts']) : '',
    'post__not_in'   => !empty($settings['exclude_posts']) ? explode(',', $settings['exclude_posts']) : '', // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in
    'paged'          => $paged, // Add the paged parameter to handle pagination
);
// ✅ If "Featured Posts Only" is ON → add meta_query
if ( isset( $settings['featured_filter'] ) && $settings['featured_filter'] === 'yes' ) {
    $args['meta_query'][] = array(
        'key'     => '_fpg_featured_post',
        'value'   => '1',
        'compare' => '=',
    );
}
// ✅ If "Popular Posts" is ON → order by views
if ( isset( $settings['popular_filter'] ) && $settings['popular_filter'] === 'yes' ) {
    $args['meta_query'] = [
        'relation' => 'OR',
        [
            'key'     => 'post_views_count',
            'compare' => 'EXISTS',
        ],
        [
            'key'     => 'post_views_count',
            'compare' => 'NOT EXISTS',
        ],
    ];
    $args['orderby']  = 'meta_value_num';
    $args['order']    = ! empty( $settings['popular_order'] ) ? $settings['popular_order'] : 'DESC';
}
$separator_map = [
    'none'        => '',
    'dot'         => ' · ',
    'hyphen'      => ' - ',
    'slash'       => ' / ',
    'double_slash'=> ' // ',
    'pipe'        => ' | ',
];
$separator_value = isset($separator_map[$settings['meta_separator']]) ? $separator_map[$settings['meta_separator']] : '';
$hover_animation = $settings['hover_animation'];
$link_type = $settings['link_type'];

// Query the posts
$query = new \WP_Query($args);

// Check if there are posts
if ($query->have_posts()) {

    // ✅ Collect categories (unique)
    $collected_cats = [];
    while ($query->have_posts()) {
        $query->the_post();
        $post_categories = get_the_category();
        foreach ($post_categories as $cat) {
            $collected_cats[$cat->term_id] = $cat;
        }
    }
    wp_reset_postdata();

    if (!empty($collected_cats)) { ?>
        <div class="fpg-section-area rs-categories-area section-space bg-primary rs-categories-two">
            <div class="container">
                <div class="row">
                    <div class="col-12 g-15">
                        <div class="rs-categories-wrapper">
                            
                            <?php foreach ($collected_cats as $cat) : 
                                // 🔹 Get category background image from term meta
                                $cat_bg_img = get_term_meta($cat->term_id, 'fpg_bg_image', true);

                                // 🔹 Category link
                                $cat_link = get_category_link($cat->term_id);
                                ?>
                                
                                <div class="rs-categories-item">
                                    <!-- Thumbnail -->
                                    <div class="rs-categories-thumb">
                                        <a href="<?php echo esc_url($cat_link); ?>">
                                            <img src="<?php echo esc_url($cat_bg_img); ?>" alt="<?php echo esc_attr($cat->name); ?>">
                                        </a>
                                    </div>

                                    <!-- Info -->
                                    <div class="rs-categories-info">
                                        <div class="rs-categories-title-wrap">
                                            
                                            
                                            <!-- Post Title -->
                                            <?php if (!empty($settings['show_post_title']) && 'yes' === $settings['show_post_title']) {
                                                    // Title Tag
                                                    $title_tag = !empty($settings['title_tag']) ? esc_attr($settings['title_tag']) : 'h3';

                                                    
                                                    // Title Classes
                                                    $title_classes = ['fancy-post-title'];
                                                    if ('enable' === $settings['title_hover_underline']) {
                                                        $title_classes[] = 'underline';
                                                    }                            

                                                    // Rendering the Title
                                                    ?>
                                                    <<?php echo esc_attr($title_tag); ?>
                                                        class="title  rs-categories-title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
                                                        >
                                                        <?php if ('link_details' === $settings['link_type']) { ?>
                                                            <a href="<?php echo esc_url($cat_link); ?>"
                                                               target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>"
                                                               >
                                                               <?php echo esc_html($cat->name);  ?>
                                                            </a>
                                                        <?php } else { ?>
                                                            <?php echo esc_html($cat->name); ?>
                                                        <?php } ?>
                                                    </<?php echo esc_attr($title_tag); ?>>
                                                    <?php
                                                }
                                            ?>
                                            <span class="rs-categories-meta">
                                                <?php echo intval($cat->count); ?> Articles
                                            </span>
                                        </div>

                                        <!-- Button -->
                                        <div class="rs-categories-btn">
                                            <a class="rs-square-btn has-icon" href="<?php echo esc_url($cat_link); ?>">
                                                <span class="icon-box">
                                                    <svg class="icon-first" width="14" height="10" viewBox="0 0 14 10" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M12.7628 4.24925C10.9324 4.24925 9.26427 2.58258 9.26427 0.750751V0H7.76276V0.750751C7.76276 2.08258 8.34685 3.33183 9.26351 4.24925H0V5.75075H9.26351C8.34685 6.66817 7.76276 7.91742 7.76276 9.24925V10H9.26427V9.24925C9.26427 7.41817 10.9324 5.75075 12.7628 5.75075H13.5135V4.24925H12.7628Z"
                                                              fill="white"></path>
                                                    </svg>
                                                    <svg class="icon-second" width="14" height="10" viewBox="0 0 14 10" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M12.7628 4.24925C10.9324 4.24925 9.26427 2.58258 9.26427 0.750751V0H7.76276V0.750751C7.76276 2.08258 8.34685 3.33183 9.26351 4.24925H0V5.75075H9.26351C8.34685 6.66817 7.76276 7.91742 7.76276 9.24925V10H9.26427V9.24925C9.26427 7.41817 10.9324 5.75075 12.7628 5.75075H13.5135V4.24925H12.7628Z"
                                                              fill="white"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php }
} else {
    // No posts found
}
?>
