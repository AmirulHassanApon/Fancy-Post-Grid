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
    'paged'          => $paged, // Add the paged parameter to handle pagination
);

// Query the posts
$query = new \WP_Query($args);

// Check if there are posts
if ($query->have_posts()) {
    echo '<section class="fpg-section-area rs-blog-layout-27 grey">';
    echo '<div class="container">';
    echo '<div class="row">';
    
    ?>
        <div class="col-md-6">
            <?php while ($query->have_posts()) {
                $query->the_post(); 
            ?>
            <?php if ($query->current_post === 0) : ?>
            <div class="rs-blog-layout-27-item">
                <!-- Featured Image -->
                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                    <div class="rs-thumb">
                        
                        <?php 
                        // Map the custom sizes to their actual dimensions
                        $thumbnail_size = $settings['thumbnail_size'];

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
                                        'content'   => esc_html(get_the_date()),
                                    ),
                                    'post_categories' => array(
                                        'condition' => 'yes' === $settings['show_post_categories'],
                                        'class'     => 'meta-categories',
                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_categories_icon']) ? '<i class="fa fa-folder"></i>' : '',
                                        'content'   => get_the_category_list(', '),
                                    ),
                                    'post_tags' => array(
                                        'condition' => 'yes' === $settings['show_post_tags'] && !empty(get_the_tag_list('', ', ')),
                                        'class'     => 'meta-tags',
                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_tags_icon']) ? '<i class="fa fa-tags"></i>' : '',
                                        'content'   => get_the_tag_list('', ', '),
                                    ),
                                    'comments_count' => array(
                                        'condition' => 'yes' === $settings['show_comments_count'],
                                        'class'     => 'meta-comments',
                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_comments_count_icon']) ? '<i class="fa fa-comments"></i>' : '',
                                        'content'   => sprintf(
                                            '<a href="%s">%s</a>',
                                            esc_url(get_comments_link()),
                                            esc_html(get_comments_number_text(__('0 Comments', 'fancy-post-grid'), __('1 Comment', 'fancy-post-grid'), __('% Comments', 'fancy-post-grid')))
                                        ),
                                    ),
                                );

                                // Output each meta item as a list item with the respective class.
                                foreach ($meta_items as $meta) {
                                    if ($meta['condition']) {
                                        echo '<li class="' . esc_attr($meta['class']) . '">';
                                        echo $meta['icon'] . ' ' . $meta['content'];
                                        echo '</li>';
                                    }
                                }
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

                    <!-- Read More Button -->
                    <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { ?>
                        <div class="btn-wrapper">
                            <a href="<?php echo esc_url(get_permalink()); ?>" 
                               class="rs-btn rs-link read-more <?php echo esc_attr($settings['button_type']); ?>"
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
            <div class="rs-blog-layout-27-item">
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
                                        'content'   => esc_html(get_the_date()),
                                    ),
                                    'post_categories' => array(
                                        'condition' => 'yes' === $settings['show_post_categories'],
                                        'class'     => 'meta-categories',
                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_categories_icon']) ? '<i class="fa fa-folder"></i>' : '',
                                        'content'   => get_the_category_list(', '),
                                    ),
                                    'post_tags' => array(
                                        'condition' => 'yes' === $settings['show_post_tags'] && !empty(get_the_tag_list('', ', ')),
                                        'class'     => 'meta-tags',
                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_tags_icon']) ? '<i class="fa fa-tags"></i>' : '',
                                        'content'   => get_the_tag_list('', ', '),
                                    ),
                                    'comments_count' => array(
                                        'condition' => 'yes' === $settings['show_comments_count'],
                                        'class'     => 'meta-comments',
                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_comments_count_icon']) ? '<i class="fa fa-comments"></i>' : '',
                                        'content'   => sprintf(
                                            '<a href="%s">%s</a>',
                                            esc_url(get_comments_link()),
                                            esc_html(get_comments_number_text(__('0 Comments', 'fancy-post-grid'), __('1 Comment', 'fancy-post-grid'), __('% Comments', 'fancy-post-grid')))
                                        ),
                                    ),
                                );

                                // Output each meta item as a list item with the respective class.
                                foreach ($meta_items as $meta) {
                                    if ($meta['condition']) {
                                        echo '<li class="' . esc_attr($meta['class']) . '">';
                                        echo $meta['icon'] . ' ' . $meta['content'];
                                        echo '</li>';
                                    }
                                }
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

                    <!-- Read More Button -->
                    <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { ?>
                        <div class="btn-wrapper">
                            <a href="<?php echo esc_url(get_permalink()); ?>" 
                               class="rs-btn rs-link read-more <?php echo esc_attr($settings['button_type']); ?>"
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
                        $thumbnail_size = $settings['thumbnail_size'];

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
                        <div class="rs-blog-layout-27-list-item">
                            <div class="rs-date">
                                <span><?php echo get_the_date('M'); ?></span> <!-- Month -->
                                <h3 class="title"><?php echo get_the_date('d'); ?></h3> <!-- Day -->
                            </div>
                            <div class="rs-content">
                                <div class="rs-meta-category">
                                    <i class="ri-price-tag-3-line"></i> <a href="#"><?php echo get_the_category_list(', '); ?></a>
                                </div>
                                <h4 class="title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4> <!-- Post Title -->
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
