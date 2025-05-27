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
// Query the posts
$query = new \WP_Query($args);
?>

<?php if ($query->have_posts()) : ?>
<section class="rs-blog-layout-8 fpg-section-area">
    <div class="container">
        <div class="row">
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <?php if ($query->current_post === 0) : ?>
                    <!-- First post on the left (col-5) -->
                    <div class="col-lg-5">
                        <div class="rs-blog__left-blog <?php echo esc_attr($hover_animation); ?>">
                            <!-- Featured Image -->
                            <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                                <div class="rs-blog__thumb">
                                    
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
                                    <?php if ('yes' === $settings['show_post_categories']) { ?>
                                        <div class="rs-category">
                                            <?php
                                                // Array of meta items with their respective conditions, content, and class names.
                                                $meta_items = array( 
                                                    
                                                    'post_categories' => array(
                                                        'condition' => 'yes' === $settings['show_post_categories'],
                                                        'class'     => 'meta-categories',
                                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_categories_icon']) ? '<i class="fa fa-folder"></i>' : '',
                                                        'content'   => get_the_category_list(', '),
                                                    ),
                                                );

                                                // Output each meta item as a list item with the respective class.
                                                foreach ($meta_items as $meta) {
                                                    if ($meta['condition']) {
                                                        echo '<span>';
                                                        echo wp_kses_post($meta['icon']) . ' ' . wp_kses_post($meta['content']);
                                                        echo '</span>';
                                                    }
                                                }
                                                ?>                       
                                        </div>
                                    <?php } ?>
                                </div>
                            <?php } ?>
                            
                            <div class="rs-blog__content">
                                <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                                <?php if ('yes' === $settings['show_meta_data']) { ?>
                                    <ul class="meta-data-list">
                                        <?php
                                        // Array of meta items with their respective conditions, content, and class names.
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
                                            'post_date' => array(
                                                'condition' => 'yes' === $settings['show_post_date'],
                                                'class'     => 'meta-date',
                                                'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon']) ? '<i class="fa fa-calendar"></i>' : '',
                                                'content'   => esc_html(get_the_date('M j, Y')),
                                            ),
                                            
                                        );

                                        // Output each meta item as a list item with the respective class.
                                        $meta_items_output = []; // Array to store individual meta item outputs.
                                        foreach ($meta_items as $meta) {
                                            if ($meta['condition']) {
                                                // Build the meta item output with its icon and content.
                                                $meta_items_output[] = '<li class="' . esc_attr($meta['class']) . '">' 
                                                    . $meta['icon'] . ' ' . $meta['content'] 
                                                    . '</li>';
                                            }
                                        }
                                        // Only wrap the separator in a <span> if it's not empty.
                                        $separator = $separator_value !== '' ? '<span>' . esc_html($separator_value) . '</span>' : '';

                                        // Join the meta items with the selected separator.
                                        echo wp_kses_post(implode(wp_kses_post($separator), $meta_items_output));
                                        ?>
                                    </ul>

                                <?php } ?>

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
                                            $title_classes[] = 'hover-underline';
                                        }                            

                                        // Rendering the Title
                                        ?>
                                        <<?php echo esc_attr($title_tag); ?>
                                            class="title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
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

                                <!-- Post Excerpt -->
                                <?php if ( 'yes' === $settings['show_post_excerpt'] ) { ?>
                                    <div class="fpg-excerpt">
                                        <p class="fancy-post-excerpt" >
                                            <?php
                                            $excerpt_type = $settings['excerpt_type'];
                                            $excerpt_length = $settings['excerpt_length'];
                                            $expansion_indicator = $settings['expansion_indicator'];

                                            if ( 'full_content' === $excerpt_type ) {
                                                $content = get_the_content();
                                                echo esc_html( $content );
                                            } elseif ( 'character' === $excerpt_type ) {
                                                $excerpt = get_the_excerpt();
                                                $trimmed_excerpt = mb_substr( $excerpt, 0, $excerpt_length ) . esc_html( $expansion_indicator );
                                                echo esc_html( $trimmed_excerpt );
                                            } else { // Word-based excerpt
                                                $excerpt = wp_trim_words( get_the_excerpt(), $excerpt_length, esc_html( $expansion_indicator ) );
                                                echo esc_html( $excerpt );
                                            }
                                            ?>
                                        </p>
                                    </div>
                                    
                                <?php } ?>

                                <!-- Read More Button -->
                                <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { 
                                    $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                                    $button_type = $settings['button_type'] ?? '';

                                    if (empty($button_type)) {
                                        switch ($layout) {
                                            
                                            case 'liststyle01':
                                                $button_type = 'fpg-flat';
                                                break;
                                        }
                                    }?>
                                    <div class="btn-wrapper">
                                        <a href="<?php echo esc_url(get_permalink()); ?>" 
                                           class="rs-link read-more <?php echo esc_attr($button_type); ?>"
                                           target="<?php echo 'new_window' === $settings['link_target'] ? '_blank' : '_self'; ?>">
                                            <?php
                                            if (!empty($settings['button_icon']) && 'yes' === $settings['button_icon']) {
                                                if ('button_position_left' === $settings['button_position']) {
                                                    ?>
                                                    <i class="ri-arrow-right-line"></i>
                                                    <?php
                                                }
                                            }
                                            ?>
                                            <?php echo esc_html($settings['read_more_label'] ?? 'Read More'); ?>
                                            <?php
                                            if (!empty($settings['button_icon']) && 'yes' === $settings['button_icon']) {
                                                if ('button_position_right' === $settings['button_position']) {
                                                    ?>
                                                    <i class="ri-arrow-right-line"></i>
                                                    <?php
                                                }
                                            }
                                            ?>
                                        </a>
                                    </div>
                                <?php } ?> 
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-7">
                        <div class="row">
                        <?php else : ?>
                            <!-- Second and Third posts on the right (col-7, inside a row) -->
                            
                            <div class="rs-blog__left-blog right-blog <?php echo esc_attr($hover_animation); ?>">
                                <!-- Featured Image -->
                                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                                    <div class="rs-blog__thumb">
                                        
                                        <?php 
                                        // Map the custom sizes to their actual dimensions
                                        $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                                        $thumbnail_size = $settings['thumbnail_right_size'] ?? '';

                                        if (empty($thumbnail_size)) {
                                            switch ($layout) {
                                                
                                                case 'liststyle01':
                                                    $thumbnail_size = 'fancy_post_square';
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
                                        <?php if ('yes' === $settings['show_post_categories']) { ?>
                                            <div class="rs-category">
                                                <?php
                                                    // Array of meta items with their respective conditions, content, and class names.
                                                    $meta_items = array( 
                                                        
                                                        'post_categories' => array(
                                                            'condition' => 'yes' === $settings['show_post_categories'],
                                                            'class'     => 'meta-categories',
                                                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_categories_icon']) ? '<i class="fa fa-folder"></i>' : '',
                                                            'content'   => get_the_category_list(', '),
                                                        ),
                                                    );

                                                    // Output each meta item as a list item with the respective class.
                                                    foreach ($meta_items as $meta) {
                                                        if ($meta['condition']) {
                                                            echo '<span>';
                                                            echo wp_kses_post($meta['icon']) . ' ' . wp_kses_post($meta['content']);
                                                            echo '</span>';
                                                        }
                                                    }
                                                    ?>                       
                                            </div>
                                        <?php } ?>
                                    </div>
                                <?php } ?>
                                <div class="rs-blog__content">
                                    <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                                    <?php if ('yes' === $settings['show_meta_data']) { ?>
                                        <ul class="meta-data-list">
                                            <?php
                                            // Array of meta items with their respective conditions, content, and class names.
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
                                                'post_date' => array(
                                                    'condition' => 'yes' === $settings['show_post_date'],
                                                    'class'     => 'meta-date',
                                                    'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon']) ? '<i class="fa fa-calendar"></i>' : '',
                                                    'content'   => esc_html(get_the_date('M j, Y')),
                                                ),
                                            );

                                            $meta_items_output = []; // Array to store individual meta item outputs.
                                            foreach ($meta_items as $meta) {
                                                if ($meta['condition']) {
                                                    // Build the meta item output with its icon and content.
                                                    $meta_items_output[] = '<li class="' . esc_attr($meta['class']) . '">' 
                                                        . $meta['icon'] . ' ' . $meta['content'] 
                                                        . '</li>';
                                                }
                                            }
                                            // Only wrap the separator in a <span> if it's not empty.
                                            $separator = $separator_value !== '' ? '<span>' . esc_html($separator_value) . '</span>' : '';

                                            // Join the meta items with the selected separator.
                                            echo wp_kses_post(implode(wp_kses_post($separator), $meta_items_output));
                                            ?>
                                        </ul>

                                    <?php } ?>

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
                                                class="title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
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

                                    <!-- Read More Button -->
                                    <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { 
                                        $layout = $settings['fancy_post_list_layout'] ?? 'liststyle01';
                                        $button_type = $settings['button_type'] ?? '';

                                        if (empty($button_type)) {
                                            switch ($layout) {
                                                
                                                case 'liststyle01':
                                                    $button_type = 'fpg-flat';
                                                    break;
                                            }
                                        }?>
                                        <div class="btn-wrapper">
                                            <a href="<?php echo esc_url(get_permalink()); ?>" 
                                               class="rs-link read-more <?php echo esc_attr($button_type); ?>"
                                               target="<?php echo 'new_window' === $settings['link_target'] ? '_blank' : '_self'; ?>">
                                                <?php
                                                if (!empty($settings['button_icon']) && 'yes' === $settings['button_icon']) {
                                                    if ('button_position_left' === $settings['button_position']) {
                                                        ?>
                                                        <i class="ri-arrow-right-line"></i>
                                                        <?php
                                                    }
                                                }
                                                ?>
                                                <?php echo esc_html($settings['read_more_label'] ?? 'Read More'); ?>
                                                <?php
                                                if (!empty($settings['button_icon']) && 'yes' === $settings['button_icon']) {
                                                    if ('button_position_right' === $settings['button_position']) {
                                                        ?>
                                                        <i class="ri-arrow-right-line"></i>
                                                        <?php
                                                    }
                                                }
                                                ?>
                                            </a>
                                        </div>
                                    <?php } ?> 
                                </div>
                            </div>
                            
                        <?php endif; ?>
                    <?php endwhile; ?>
                        </div> <!-- End of inner row -->
                    </div> <!-- End of col-lg-7 -->
        </div> 
    </div> 
</section>
<?php else : ?>
    
<?php endif; 
wp_reset_postdata();?>