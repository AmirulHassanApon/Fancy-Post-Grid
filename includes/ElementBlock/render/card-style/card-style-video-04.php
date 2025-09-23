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
?>

<?php if ($query->have_posts()) : ?>
<section class="rs-video-area bg-primary rs-ptop fpg-section-area primary-bg">
    <div class="container">
        <div class="row g-15">
            <?php while ($query->have_posts()) : $query->the_post(); ?> 
                <div class="col-xl-<?php echo esc_attr($settings['col_desktop_card']); ?> col-lg-<?php echo esc_attr($settings['col_lg_card']); ?> col-md-<?php echo esc_attr($settings['col_md_card']); ?>">
                    <div class="rs-post-video rs-post-video-three">
                    
                        <?php 
                        // Get custom video link for current post
                        $video_link = get_post_meta( get_the_ID(), '_fpg_video_link', true );
                        ?>
                        
                        <!-- Featured Image -->
                        
                        <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                            <div class="rs-post-video-thumb single">

                                <?php 
                                // Map the custom sizes to their actual dimensions
                                $layout = $settings['fancy_post_card_layout'] ?? 'cardstyle22';
                                $thumbnail_size = $settings['thumbnail_size_card'] ?? '';

                                if (empty($thumbnail_size)) {
                                    switch ($layout) {
                                        case 'cardstyle22':
                                            $thumbnail_size = 'fancy_post_portrait';
                                            break;
                                    }
                                }
                                if ('yes' === $settings['thumbnail_link']) { ?>
                                    
                                        <?php the_post_thumbnail($thumbnail_size); ?>
                                    
                                <?php } else { ?>
                                    <?php the_post_thumbnail($thumbnail_size); ?>
                                <?php } ?>

                                
                                    <a href="<?php echo esc_url( $video_link ); ?>" 
                                       class="rs-play-btn popup-video is-red">
                                        <i class="fa-solid fa-play"></i>
                                    </a>
                                
                            </div>
                        <?php } ?>                                                           
                    
                    </div>
                </div> <!-- End of col-lg-4 -->
                <?php endwhile; ?>
        </div> 
    </div> 
</section>
<?php else : ?>
    
<?php endif; 
wp_reset_postdata();?>