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

// Check if there are posts
if ($query->have_posts()) {
    echo '<section class="fpg-section-area rs-blog-layout-27">';
    echo '<div class="container">';
    echo '<div class="row">';
    ?>
        <div class="col-md-6">
            <?php while ($query->have_posts()) {
                $query->the_post(); 
            ?>
            <?php if ($query->current_post === 0) : ?>
                <?php 
                    $layout = $settings['fancy_post_list_layout'] ?? 'liststyle08';
                    $box_alignment = $settings['box_alignment'] ?? '';

                    if (empty($box_alignment)) {
                        switch ($layout) {
                            
                            case 'liststyle08':
                                $box_alignment = 'start';
                                break;
                        }
                    }
                ?>
            <div class="rs-blog-layout-27-item align-<?php echo esc_attr($box_alignment); ?> <?php echo esc_attr($hover_animation); ?> <?php echo esc_attr($link_type); ?>">
                <!-- Featured Image -->
                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                    <div class="rs-thumb">
                        
                        <?php 
                        // Map the custom sizes to their actual dimensions
                        $layout = $settings['fancy_post_list_layout'] ?? 'liststyle08';
                        $thumbnail_size = $settings['thumbnail_left_size'] ?? '';

                        if (empty($thumbnail_size)) {
                            switch ($layout) {
                                
                                case 'liststyle08':
                                    $thumbnail_size = 'fancy_post_landscape';
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

                <div class="rs-content">
                    <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                    <?php if ('yes' === $settings['show_meta_data']) { ?>
                        <div class="rs-meta">
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
                        </div>

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
                            $layout = $settings['fancy_post_list_layout'] ?? 'liststyle08';
                            $button_type = $settings['button_type'] ?? '';

                            if (empty($button_type)) {
                                switch ($layout) {
                                    
                                    case 'liststyle08':
                                        $button_type = 'fpg-flat';
                                        break;
                                }
                            }
                        ?>
                        <div class="btn-wrapper">
                            <a href="<?php echo esc_url(get_permalink()); ?>" 
                               class="rs-btn read-more <?php echo esc_attr($button_type); ?>"
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
            <?php elseif ($query->current_post === 1) : ?>
            <div class="rs-blog-layout-27-item align-<?php echo esc_attr($box_alignment); ?> <?php echo esc_attr($hover_animation); ?> <?php echo esc_attr($link_type); ?>">
                <div class="rs-content">
                    <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                    <?php if ('yes' === $settings['show_meta_data']) { ?>
                        <div class="rs-meta">
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
                        </div>

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
                        $layout = $settings['fancy_post_list_layout'] ?? 'liststyle08';
                        $button_type = $settings['button_type'] ?? '';

                        if (empty($button_type)) {
                            switch ($layout) {
                                
                                case 'liststyle08':
                                    $button_type = 'fpg-flat';
                                    break;
                            }
                        }
                        ?>
                        <div class="btn-wrapper">
                            <a href="<?php echo esc_url(get_permalink()); ?>" 
                               class="rs-btn rs-link read-more <?php echo esc_attr($button_type); ?>"
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
                <!-- Featured Image -->
                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                    <div class="rs-thumb">
                        
                        <?php 
                        // Map the custom sizes to their actual dimensions
                        $layout = $settings['fancy_post_list_layout'] ?? 'liststyle08';
                        $thumbnail_size = $settings['thumbnail_right_size'] ?? '';

                        if (empty($thumbnail_size)) {
                            switch ($layout) {
                                
                                case 'liststyle08':
                                    $thumbnail_size = 'fancy_post_landscape';
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
            </div>   
            <?php endif; wp_reset_postdata();

            }
            ?>  
        </div>

        <div class="col-md-6">
            <?php
                // Define the query to get the latest posts
                $latest_posts_query = new WP_Query(array(
                    'post_type'      => 'post',
                    'posts_per_page' => 4, // Adjust the number of posts you want to display
                    'order'          => 'DESC',
                    'orderby'        => 'date',
                ));

                // Loop through the posts
                if ($latest_posts_query->have_posts()) :
                    while ($latest_posts_query->have_posts()) : $latest_posts_query->the_post(); ?>
                        <div class="rs-blog-layout-27-list-item align-<?php echo esc_attr($box_alignment); ?>">
                            <div class="rs-date">
                                <span><?php echo get_the_date('M'); ?></span> <!-- Month -->
                                <h3 class="title"><?php echo get_the_date('d'); ?></h3> <!-- Day -->
                            </div>
                            <div class="rs-content">
                                <div class="rs-meta-category">
                                    <i class="ri-price-tag-3-line"></i><?php echo wp_kses_post(get_the_category_list(', ')); ?>
                                </div>
                                <?php if (!empty($settings['show_post_title']) && 'yes' === $settings['show_post_title']) {
                                    // Title Tag
                                    $title_tag = !empty($settings['title_tag']) ? esc_attr($settings['title_tag']) : 'h4';

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
                                
                            </div>
                        </div>
                    <?php endwhile;
                else :
                    echo '<p>No posts found.</p>';
                endif;

                // Reset post data
                wp_reset_postdata();
                ?>
        </div>
        <?php
    echo '</div>';
    echo '</div>';
    echo '</section>';
} else {
}

// Reset post data
