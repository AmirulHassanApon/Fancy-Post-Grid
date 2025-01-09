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
    echo '<div class="rs-blog-layout-5">';
    echo '<div class="container">';
    echo '<div class="row">';
    while ($query->have_posts()) {
        $query->the_post();
        $background_color = isset($settings['card_background']) ? esc_attr($settings['card_background']) : '';
        $background_image = isset($settings['card_image']['url']) ? 'url(' . esc_url($settings['card_image']['url']) . ')' : '';
        $hover_background_color = isset($settings['card_background_hover']) ? esc_attr($settings['card_background_hover']) : '';
        $text_alignment = isset($settings['text_alignment']) ? esc_attr($settings['text_alignment']) : 'left';
        $padding = isset($settings['content_padding'])
            ? esc_attr($settings['content_padding']['top'] . $settings['content_padding']['unit'] . ' ' .
                $settings['content_padding']['right'] . $settings['content_padding']['unit'] . ' ' .
                $settings['content_padding']['bottom'] . $settings['content_padding']['unit'] . ' ' .
                $settings['content_padding']['left'] . $settings['content_padding']['unit'])
            : '0';
        $border_radius = isset($settings['card_border_radius']['size'], $settings['card_border_radius']['unit'])
            ? esc_attr($settings['card_border_radius']['size'] . $settings['card_border_radius']['unit'])
            : '0';

        ?>
        <div class="col-xl-<?php echo esc_attr($settings['col_desktop']); ?> 
            col-lg-<?php echo esc_attr($settings['col_lg']); ?> 
            col-md-<?php echo esc_attr($settings['col_md']); ?> 
            col-sm-<?php echo esc_attr($settings['col_sm']); ?> 
            col-xs-<?php echo esc_attr($settings['col_xs']); ?> 
            " >
            
            <div class="rs-blog__single fancy-post-item mt-30" style="<?php echo esc_attr(
                'background-color: ' . $background_color . '; ' .
                'background-image: ' . $background_image . '; ' .
                'background-size: cover; ' .
                'background-position: center; ' .
                'text-align: ' . $text_alignment . '; ' .
                'padding: ' . $padding . '; ' .
                'border-radius: ' . $border_radius . ';'
            ); ?>">
                <!-- Featured Image -->
                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                    <div class="rs-thumb">
                        
                        <?php 
                        // Map the custom sizes to their actual dimensions
                        $thumbnail_size = $settings['thumbnail_size'];

                        if ($thumbnail_size === 'fancy_post_custom_size') {
                            $thumbnail_size = array(768, 500); // Custom size
                        } elseif ($thumbnail_size === 'fancy_post_square') {
                            $thumbnail_size = array(500, 500); // Square size
                        } elseif ($thumbnail_size === 'fancy_post_landscape') {
                            $thumbnail_size = array(834, 550); // Landscape size
                        } elseif ($thumbnail_size === 'fancy_post_portrait') {
                            $thumbnail_size = array(421, 550); // Portrait size
                        } elseif ($thumbnail_size === 'fancy_post_list') {
                            $thumbnail_size = array(1200, 650); // List size
                        } // Other sizes like 'thumbnail', 'medium', 'large', 'full' are supported natively

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
                        $readmore_styles = [
                            'margin' => isset($settings['readmore_button_margin']) ? implode(' ', $settings['readmore_button_margin']) : '0',
                            'padding' => isset($settings['readmore_button_padding']) ? implode(' ', $settings['readmore_button_padding']) : '0',
                            'color' => $settings['readmore_normal_text_color'] ?? '#000',
                            'background-color' => $settings['readmore_normal_background_color'] ?? 'transparent',
                            'border' => (!empty($settings['readmore_normal_border_width']) && !empty($settings['readmore_normal_border_border']) && !empty($settings['readmore_normal_border_color']))
                                    ? implode(' ', array_map('esc_attr', [
                                        $settings['readmore_normal_border_width'],
                                        $settings['readmore_normal_border_border'],
                                        $settings['readmore_normal_border_color']
                                    ]))
                                    : 'none',

                            'border-radius' => isset($settings['readmore_normal_border_radius']) ? implode(' ', $settings['readmore_normal_border_radius']) : '0',];
                        ?>
                        <div class="btn-wrapper">
                            <a href="<?php echo esc_url(get_permalink()); ?>" 
                               class="rs-link read-more <?php echo esc_attr($settings['button_type']); ?>"
                               target="<?php echo 'new_window' === $settings['link_target'] ? '_blank' : '_self'; ?>"
                               style="<?php foreach ($readmore_styles as $key => $value) echo esc_attr($key . ': ' . $value . '; '); ?>"
                               onmouseover="this.style.color='<?php echo esc_attr($settings['readmore_hover_text_color'] ?? $settings['readmore_normal_text_color']); ?>';
                                            this.style.backgroundColor='<?php echo esc_attr($settings['readmore_hover_background_color'] ?? $settings['readmore_normal_background_color']); ?>';"
                               onmouseout="this.style.color='<?php echo esc_attr($settings['readmore_normal_text_color'] ?? '#000'); ?>';
                                            this.style.backgroundColor='<?php echo esc_attr($settings['readmore_normal_background_color'] ?? 'transparent'); ?>';">
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
        'type'      => 'array', // Get an array of pagination links
        'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
        'next_text' => esc_html__('Next »', 'fancy-post-grid'),
        'show_all'  => false,
    ));

    if (!empty($pagination_links)) {
        echo '<ul class="fpg-pagination-elementor">';
        foreach ($pagination_links as $link) {
            // Replace <span> tags with <a> tags for the current page
            if (strpos($link, 'span') !== false) {
                $link = preg_replace(
                    '/<span.*?>(.*?)<\/span>/i',
                    '<a href="#" class="current">$1</a>',
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