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

// Check if there are posts
if ($query->have_posts()) {
    echo '<div class="fpg-section-area rs-blog-layout-5">';
    
    echo '<div class="container">';
    echo '<div class="row">';
    while ($query->have_posts()) {
        $query->the_post();
        
    ?>
        <div class="col-xl-<?php echo esc_attr($settings['col_desktop']); ?> col-lg-<?php echo esc_attr($settings['col_lg']); ?> col-md-<?php echo esc_attr($settings['col_md']); ?> col-sm-<?php echo esc_attr($settings['col_sm']); ?> col-xs-<?php echo esc_attr($settings['col_xs']); ?> " >
            
            <div class="rs-blog__single fancy-post-item mt-30 <?php echo esc_attr($hover_animation); ?>">
                <!-- Featured Image -->
                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                <div class="rs-thumb">

                <?php 
                    $layout = $settings['fancy_post_grid_layout'] ?? 'gridstyle01';
                        $thumbnail_size = $settings['thumbnail_size'] ?? '';

                        if (empty($thumbnail_size)) {
                            switch ($layout) {
                                
                                case 'gridstyle01':
                                    $thumbnail_size = 'fancy_post_custom_size';
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
                            $layout = $settings['fancy_post_grid_layout'] ?? 'gridstyle01';
                            $button_type = $settings['button_type'] ?? '';

                            if (empty($button_type)) {
                                switch ($layout) {
                                    
                                    case 'gridstyle01':
                                        $button_type = 'fpg-flat';
                                        break;
                                }
                            }
                     ?>
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
        <?php

    }
    echo '</div>';
    // Pagination
    if ('yes' === $settings['show_pagination']) {
        echo '<div class="fpg-pagination">';

        $big = 999999999; // Large number unlikely to be in a URL
        $pagination_links = paginate_links(array(
            'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format'    => '?paged=%#%',
            'current'   => max(1, get_query_var('paged')),
            'total'     => $query->max_num_pages,
            'type'      => 'array',
            'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
            'next_text' => esc_html__('Next »', 'fancy-post-grid'),
            'show_all'  => false,
        ));

        if (!empty($pagination_links)) {
            echo '<ul class="page-numbers">';
            foreach ($pagination_links as $link) {
                // Replace only the current page <span> with an <a> tag
                if (strpos($link, '<span class="page-numbers current">') !== false) {
                    $link = preg_replace(
                        '/<span class="page-numbers current">(.*?)<\/span>/i',
                        '<a href="#" class="page-numbers current">$1</a>',
                        $link
                    );
                }

                echo '<li>' . wp_kses_post($link) . '</li>';
            }
            echo '</ul>';
        }

        echo '</div>';
    }
    
    echo '</div>';
    echo '</div>';
    echo '</div>';
} else {
}

// Reset post data
wp_reset_postdata();