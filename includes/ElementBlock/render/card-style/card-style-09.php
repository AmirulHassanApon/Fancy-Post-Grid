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
        <div class="fpg-section-area rs-categories-area section-space">
            <div class="container">
                <div class="row g-15">
                    <div class="col-xl-4 col-lg-4">
                        <div class="rs-categories rs-categories-one">
                            <h5 class="section-title is-small">Explore Categories</h5>

                            <ul class="fpg-category-list">
                                <?php foreach ($collected_cats as $cat) : 
                                    // 🔹 Get category background image from term meta
                                    $cat_bg_img = get_term_meta($cat->term_id, 'fpg_bg_image', true);
                                    ?>
                                    <li>
                                        <a class="rs-categories-bg-thumb" 
                                           href="<?php echo esc_url(get_category_link($cat->term_id)); ?>"
                                           <?php if ($cat_bg_img) : ?>
                                               style="background-image: url('<?php echo esc_url($cat_bg_img); ?>');"
                                           <?php endif; ?>>
                                           
                                            <span class="rs-categories-name">
                                                <?php echo esc_html($cat->name); ?> (<?php echo intval($cat->count); ?>)
                                            </span>
                                            
                                            <span class="rs-categories-btn">
                                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M12.7628 4.24925C10.9324 4.24925 9.26427 2.58258 9.26427 0.750751V0H7.76276V0.750751C7.76276 2.08258 8.34685 3.33183 9.26351 4.24925H0V5.75075H9.26351C8.34685 6.66817 7.76276 7.91742 7.76276 9.24925V10H9.26427V9.24925C9.26427 7.41817 10.9324 5.75075 12.7628 5.75075H13.5135V4.24925H12.7628Z"
                                                        fill="white" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
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
