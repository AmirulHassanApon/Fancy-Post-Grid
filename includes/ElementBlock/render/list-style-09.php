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
<section class="rs-overlay-card-area section-space fpg-section-area">
    <div class="container">
        <div class="row">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <?php if ($query->current_post === 0) : ?>
                    
                    <div class="col-xl-8 col-lg-8">
                        <?php 
                            $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                            $box_alignment = $settings['box_alignment'] ?? '';

                            if (empty($box_alignment)) {
                                switch ($layout) {
                                    
                                    case 'liststyle01':
                                        $box_alignment = 'start';
                                        break;
                                }
                            }
                        ?>

                        <div class="rs-post-overlay rs-post-overlay-one align-<?php echo esc_attr($box_alignment); ?> <?php echo esc_attr($hover_animation); 
                            ?> <?php echo esc_attr($link_type); ?>">
                            <!-- Featured Image -->
                            <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                                <div class="rs-post-overlay-bg-thumb">
                                    
                                    <?php 
                                    // Map the custom sizes to their actual dimensions
                                    $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                                    $thumbnail_size = $settings['thumbnail_left_size'] ?? '';

                                    if (empty($thumbnail_size)) {
                                        switch ($layout) {
                                            
                                            case 'liststyle01':
                                                $thumbnail_size = 'fancy_post_list';
                                                break;
                                        }
                                    }
                                    if ('yes' === $settings['thumbnail_link']) { ?>
                                        <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                            <?php the_post_thumbnail($thumbnail_size); ?>
                                        </a>
                                    <?php } else { ?>
                                        <?php the_post_thumbnail($thumbnail_size); ?>
                                    <?php } ?>
                                    
                                </div>
                            <?php } ?>
                            
                            <div class="rs-post-overlay-content">
                                <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                                <?php
                                    $post_tags = get_the_tags();

                                    // Check both conditions: show_post_tags setting is enabled AND post has tags
                                    if ( 'yes' === $settings['show_post_tags'] && !empty( get_the_tag_list( '', ', ' ) ) ) : ?>
                                        <div class="rs-post-tag">
                                            <?php foreach ( $post_tags as $tag ) : ?>
                                                <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" 
                                                   class="post-tag is-yellow">
                                                    <?php echo esc_html( $tag->name ); ?>
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
                                            class="title rs-post-overlay-title is-white <?php echo esc_attr(implode(' ', $title_classes)); ?>"
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
                                    <div class="rs-post-meta meta-white">
                                        <ul class="meta-data-list">
                                            <?php
                                            // Get post views with a fallback default value.
                                            $post_id    = get_the_ID();
                                            $post_views = get_post_meta($post_id, 'post_views_count', true);
                                            $post_views = !empty($post_views) ? $post_views : 5385; // Default = 5385 views.

                                            // Array of meta items.
                                            $meta_items = array(
                                                'post_author' => array(
                                                    'condition' => 'yes' === $settings['show_post_author'],
                                                    'class'     => 'meta-author',
                                                    'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['author_icon_visibility']) 
                                                                    ? ('icon' === $settings['author_image_icon'] 
                                                                        ? '<i class="fa fa-user"></i>' 
                                                                        : '<img src="' . esc_url(get_avatar_url(get_the_author_meta('ID'))) . '" alt="' . esc_attr__('Author', 'fancy-post-grid') . '" class="author-avatar" />')
                                                                    : '',
                                                    'content'   => esc_html($settings['author_prefix']) . ' ' . esc_html(get_the_author()),
                                                ),
                                                'post_views' => array(
                                                    'condition' => true, // <-- Always true, always show views
                                                    'class'     => 'meta-views',
                                                    'icon'      => '<i class="fa fa-eye"></i>',
                                                    'content'   => esc_html($post_views) . ' ' . esc_html__('Views', 'fancy-post-grid'),
                                                ),
                                                'post_date' => array(
                                                    'condition' => 'yes' === $settings['show_post_date'],
                                                    'class'     => 'meta-date',
                                                    'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon']) 
                                                                    ? '<i class="fa fa-calendar"></i>' 
                                                                    : '',
                                                    'content'   => esc_html(get_the_date('M j, Y')),
                                                ),
                                                
                                            );

                                            $meta_items_output = []; // Collect meta items.

                                            foreach ($meta_items as $meta) {
                                                if ($meta['condition']) {
                                                    $meta_items_output[] = '<li class="' . esc_attr($meta['class']) . '">' 
                                                        . $meta['icon'] . ' ' . $meta['content'] 
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

                    <div class="col-lg-4">
                        
                        <?php else : ?>
                            <!-- Second and Third posts on the right (col-7, inside a row) -->
                            <?php 
                                $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                                $box_alignment = $settings['box_alignment'] ?? '';

                                if (empty($box_alignment)) {
                                    switch ($layout) {
                                        
                                        case 'liststyle01':
                                            $box_alignment = 'start';
                                            break;
                                    }
                                }
                            ?>
                            <div class="rs-post-list rs-list-one align-<?php echo esc_attr($box_alignment); ?> <?php echo esc_attr($hover_animation); 
                            ?> <?php echo esc_attr($link_type); ?>">
                            <!-- Featured Image -->
                            <div class="item">
                                <div class="rs-post-small rs-post-small-one">
                                    <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                                        <div class="rs-post-small-thumb">
                                            
                                            <?php 
                                            // Map the custom sizes to their actual dimensions
                                            $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                                            $thumbnail_size = $settings['thumbnail_right_size'] ?? '';

                                            if (empty($thumbnail_size)) {
                                                switch ($layout) {
                                                    
                                                    case 'liststyle01':
                                                        $thumbnail_size = 'fancy_post_list';
                                                        break;
                                                }
                                            }
                                            if ('yes' === $settings['thumbnail_link']) { ?>
                                                <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                                    <?php the_post_thumbnail($thumbnail_size); ?>
                                                </a>
                                            <?php } else { ?>
                                                <?php the_post_thumbnail($thumbnail_size); ?>
                                            <?php } ?>
                                            
                                        </div>
                                    <?php } ?>
                                    
                                    <div class="rs-post-small-content">
                                        <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                                        <?php
                                            $post_tags = get_the_tags();

                                            // Check both conditions: show_post_tags setting is enabled AND post has tags
                                            if ( 'yes' === $settings['show_post_tags'] && !empty( get_the_tag_list( '', ', ' ) ) ) : ?>
                                                <div class="rs-post-tag">
                                                    <?php foreach ( $post_tags as $tag ) : ?>
                                                        <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" 
                                                           class="post-tag is-green">
                                                            <?php echo esc_html( $tag->name ); ?>
                                                        </a>
                                                    <?php endforeach; ?>
                                                </div>
                                            <?php endif; ?>


                                        <!-- Post Title -->
                                        <?php if (!empty($settings['show_post_title']) && 'yes' === $settings['show_post_title']) {
                                                // Title Tag
                                                $title_tag = !empty($settings['title_tag']) ? esc_attr($settings['title_tag']) : 'h6';

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
                                                    class="title rs-post-small-title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
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
                                            <div class="rs-post-meta">
                                                <ul class="meta-data-list">
                                                    <?php
                                                    // Get post views with a fallback default value.
                                                    $post_id    = get_the_ID();
                                                    $post_views = get_post_meta($post_id, 'post_views_count', true);
                                                    $post_views = !empty($post_views) ? $post_views : 5385; // Default = 5385 views.

                                                    // Array of meta items.
                                                    $meta_items = array(
                                                        'post_author' => array(
                                                            'condition' => 'yes' === $settings['show_post_author'],
                                                            'class'     => 'meta-author',
                                                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['author_icon_visibility']) 
                                                                            ? ('icon' === $settings['author_image_icon'] 
                                                                                ? '<i class="fa fa-user"></i>' 
                                                                                : '<img src="' . esc_url(get_avatar_url(get_the_author_meta('ID'))) . '" alt="' . esc_attr__('Author', 'fancy-post-grid') . '" class="author-avatar" />')
                                                                            : '',
                                                            'content'   => esc_html($settings['author_prefix']) . ' ' . esc_html(get_the_author()),
                                                        ),
                                                        'post_views' => array(
                                                            'condition' => true, // <-- Always true, always show views
                                                            'class'     => 'meta-views',
                                                            'icon'      => '<i class="fa fa-eye"></i>',
                                                            'content'   => esc_html($post_views) . ' ' . esc_html__('Views', 'fancy-post-grid'),
                                                        ),

                                                    );

                                                    $meta_items_output = []; // Collect meta items.

                                                    foreach ($meta_items as $meta) {
                                                        if ($meta['condition']) {
                                                            $meta_items_output[] = '<li class="' . esc_attr($meta['class']) . '">' 
                                                                . $meta['icon'] . ' ' . $meta['content'] 
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
                        </div>
                            
                        <?php endif; ?>
                    <?php endwhile; ?>
                        
                    </div> <!-- End of col-lg-7 -->
        </div> 
    </div> 
</section>
<?php else : ?>
    
<?php endif; 
wp_reset_postdata();?>