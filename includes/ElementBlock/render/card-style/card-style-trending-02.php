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
    'post__not_in'   => !empty($settings['exclude_posts']) ? explode(',', $settings['exclude_posts']) : '',
    'paged'          => $paged,
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

$query = new \WP_Query($args);
?>

<?php if ($query->have_posts()) : ?>
<section class="rs-trending-news-area rs-trending-news-one primary-bg fpg-section-area">
    <div class="container">
        <div class="row">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <!-- First Post -->
                <div class="col-xl-<?php echo esc_attr($settings['col_desktop_card']); ?> col-lg-<?php echo esc_attr($settings['col_lg_card']); ?> col-md-<?php echo esc_attr($settings['col_md_card']); ?> g-15">
                    <div class="rs-post-overlay rs-post-overlay-two <?php echo esc_attr($hover_animation); ?> <?php echo esc_attr($link_type); ?>">
                        <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) : ?>
                            <div class="rs-post-overlay-bg-thumb rs-thumb">
                                <?php 
                                $thumbnail_size = $settings['thumbnail_size_card'] ?? 'fancy_post_list';
                                if ('yes' === $settings['thumbnail_link']) { ?>
                                    <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                        <?php the_post_thumbnail($thumbnail_size); ?>
                                    </a>
                                <?php } else { ?>
                                    <?php the_post_thumbnail($thumbnail_size); ?>
                                <?php } ?>
                            </div>
                        <?php endif; ?>

                        <div class="rs-post-overlay-content align-start">
                            <?php
                            // Get post categories
                            $post_categories = get_the_category();

                            if ( 'yes' === $settings['show_post_categories_card'] && !empty( $post_categories ) ) : ?>
                                <div class="rs-post-tag">
                                    <?php foreach ( $post_categories as $cat ) : 
                                        // Get category background color
                                        $cat_bg = get_term_meta( $cat->term_id, 'fpg_bg_color', true );
                                        $style = $cat_bg ? 'background:' . esc_attr( $cat_bg ) . ';' : '';
                                    ?>
                                        <a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>" 
                                           class="post-tag"
                                           style="<?php echo esc_attr( $style ); ?>">
                                            <?php echo esc_html( $cat->name ); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            <!-- Post Title -->
                            <?php if (!empty($settings['show_post_title']) && 'yes' === $settings['show_post_title']) {
                                    // Title Tag
                                    $title_tag = !empty($settings['title_tag']) ? esc_attr($settings['title_tag']) : 'h3';

                                    // Title Content
                                    $title = get_the_title();
                                    if (!empty($settings['title_crop_by']) && !empty($settings['title_length'])) {
                                        $title = ('character' === $settings['title_crop_by'])
                                            ? mb_substr($title, 0, (int)$settings['title_length'])
                                            : implode(' ', array_slice(explode(' ', $title), 0, (int)$settings['title_length']));
                                    }
                                    // Title Classes
                                    $title_classes = ['fancy-post-title'];
                                    if ('enable' === $settings['title_hover_underline']) {
                                        $title_classes[] = 'underline';
                                    }                            

                                    // Rendering the Title
                                    ?>
                                    <<?php echo esc_attr($title_tag); ?>
                                        class="title rs-post-overlay-title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
                                        >
                                        <?php if ('link_details' === $settings['link_type']) { ?>
                                            <a href="<?php the_permalink(); ?>"
                                               target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>"
                                               >
                                               <?php echo esc_html($title); ?>
                                            </a>
                                        <?php } else { ?>
                                            <?php echo esc_html($title); ?>
                                        <?php } ?>
                                    </<?php echo esc_attr($title_tag); ?>>
                                    <?php
                                }
                            ?> 
                            <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                            <?php if ('yes' === $settings['show_meta_data']) { ?>
                                <div class="rs-post-meta meta-white meta-data-list">
                                    <ul>
                                        <?php
                                        // Get post views with a fallback default value.
                                        $post_id    = get_the_ID();
                                        $post_views = get_post_meta($post_id, 'post_views_count', true);
                                        $post_views = !empty($post_views) ? $post_views : 5385; // Default = 5385 views.

                                        // Array of meta items.
                                        $meta_items = array(
                                            'post_author' => array(
                                                'condition' => 'yes' === $settings['show_post_author'],
                                                'class'     => 'rs-meta',
                                                'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['author_icon_visibility']) 
                                                                ? ('icon' === $settings['author_image_icon'] 
                                                                    ? '<i class="fa fa-user"></i>' 
                                                                    : '<img src="' . esc_url(get_avatar_url(get_the_author_meta('ID'))) . '" alt="' . esc_attr__('Author', 'fancy-post-grid') . '" class="author-avatar" />')
                                                                : '',
                                                'content'   => esc_html($settings['author_prefix']) . ' ' . esc_html(get_the_author()),
                                            ),
                                            'post_views' => array(
                                                'condition' => 'yes' === $settings['show_post_views'],
                                                'class'     => 'rs-meta',
                                                'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_views_icon']) 
                                                                ? '<i class="ri-pulse-fill"></i>' 
                                                                : '',
                                                'content'   => esc_html($post_views) . ' ' . esc_html__('Views', 'fancy-post-grid'),
                                            ),                                           
                                            'post_date' => array(
                                                'condition' => 'yes' === $settings['show_post_date_card'],
                                                'class'     => 'rs-meta',
                                                'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon_card']) 
                                                                ? '<i class="fa fa-calendar"></i>' 
                                                                : '',
                                                'content'   => esc_html(get_the_date('M j, Y')),
                                            ),
                                            
                                        );

                                        $meta_items_output = []; // Collect meta items.

                                        foreach ($meta_items as $meta) {
                                            if ($meta['condition']) {
                                                $meta_items_output[] = '<li>'
                                                    . '<span class="' . esc_attr($meta['class']) . '">'
                                                        . $meta['icon'] . ' ' . $meta['content']
                                                    . '</span>'
                                                . '</li>';
                                            }
                                        }

                                        // Add separator if defined.
                                        $separator = !empty($separator_value) ? '<span>' . esc_html($separator_value) . '</span>' : '';

                                        // Join meta items with separator.
                                        echo wp_kses_post(implode(wp_kses_post($separator), $meta_items_output));
                                        ?>
                                    </ul>
                                </div>
                            <?php } ?>
                            
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</section>
<?php endif; wp_reset_postdata(); ?>
