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
    echo '<div class="fancy-grid-style-09 fancy-post-grid" style="
            display: grid; 
            grid-template-columns: repeat(' . esc_attr($settings['columns']) . ', 1fr); 
            gap: ' . (isset($settings['card_gap']['size'], $settings['card_gap']['unit']) 
                ? esc_attr($settings['card_gap']['size'] . $settings['card_gap']['unit']) 
                : '0px') . '; 
        ">';
    
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
        <div class="fancy-post-item" 
            style="<?php echo esc_attr(
                'background-color: ' . $background_color . '; ' .
                'background-image: ' . $background_image . '; ' .
                'background-size: cover; ' .
                'background-position: center; ' .
                'text-align: ' . $text_alignment . '; ' .
                'padding: ' . $padding . '; ' .
                'border-radius: ' . $border_radius . ';'
            ); ?>">
            <?php if (!empty($hover_background_color)) : ?>
                <style>
                    .fancy-post-item:hover {
                        background-color: <?php echo esc_attr($hover_background_color); ?>;
                    }
                </style>
            <?php endif; ?>

            <!-- Featured Image -->
            <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                <div class="fancy-post-thumbnail" 
                    style="
                        margin: <?php echo esc_attr($settings['thumbnail_margin']['top'] . $settings['thumbnail_margin']['unit'] . ' ' . 
                            $settings['thumbnail_margin']['right'] . $settings['thumbnail_margin']['unit'] . ' ' . 
                            $settings['thumbnail_margin']['bottom'] . $settings['thumbnail_margin']['unit'] . ' ' . 
                            $settings['thumbnail_margin']['left'] . $settings['thumbnail_margin']['unit']); ?>;
                        border-radius: <?php echo esc_attr($settings['thumbnail_border_radius']['top'] . $settings['thumbnail_border_radius']['unit'] . ' ' . 
                            $settings['thumbnail_border_radius']['right'] . $settings['thumbnail_border_radius']['unit'] . ' ' . 
                            $settings['thumbnail_border_radius']['bottom'] . $settings['thumbnail_border_radius']['unit'] . ' ' . 
                            $settings['thumbnail_border_radius']['left'] . $settings['thumbnail_border_radius']['unit']); ?>;
                        width: <?php echo ('default' !== $settings['thumbnail_width']) ? esc_attr($settings['thumbnail_width']) : 'auto'; ?>;
                    ">
                    <div class="overlay" 
                        style="
                            background-color: <?php echo !empty($settings['thumbnail_overlay_background']) 
                                ? esc_attr($settings['thumbnail_overlay_background']) 
                                : ''; ?>;
                            opacity: <?php echo isset($settings['thumbnail_overlay_opacity']['size']) 
                                ? esc_attr($settings['thumbnail_overlay_opacity']['size']) 
                                : ''; ?>;
                            transition-duration: <?php echo isset($settings['thumbnail_hover_transition']['size']) 
                                ? esc_attr($settings['thumbnail_hover_transition']['size']) 
                                : '0.3'; ?>s;
                        ">
                    </div>

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

                    if ('thumbnail_on' === $settings['thumbnail_link']) { ?>
                        <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                            <?php the_post_thumbnail($thumbnail_size); ?>
                        </a>
                    <?php } else { ?>
                        <?php the_post_thumbnail($thumbnail_size); ?>
                    <?php } ?>
                </div>
            <?php } ?>
            <div class="fancy-post-item-single">
            <!-- Post Meta: Date, Author, Category, Tags, Comments -->
            <?php if ('yes' === $settings['show_meta_data']) { ?>
                <div class="fancy-post-meta">
                    <?php
                    // Array of meta items with their respective conditions and content.
                    $meta_items = array(
                        'post_author' => array(
                            'condition' => 'yes' === $settings['show_post_author'],
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['author_icon_visibility']) 
                                            ? ('icon' === $settings['author_image_icon'] 
                                                ? '<i class="fas fa-user"></i>' 
                                                : '<img src="' . esc_url(get_avatar_url(get_the_author_meta('ID'))) . '" alt="' . esc_attr__('Author', 'fancy-post-grid') . '" class="author-avatar" />')
                                            : '',
                            'content'   => esc_html($settings['author_prefix']) . ' ' . esc_html(get_the_author()),
                        ),
                        'post_date' => array(
                            'condition' => 'yes' === $settings['show_post_date'],
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon']) ? '<i class="fas fa-calendar-alt"></i>' : '',
                            'content'   => esc_html(get_the_date()),
                        ),
                        
                        'post_categories' => array(
                            'condition' => 'yes' === $settings['show_post_categories'],
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_categories_icon']) ? '<i class="fas fa-folder"></i>' : '',
                            'content'   => get_the_category_list(', '),
                        ),
                        'post_tags' => array(
                            'condition' => 'yes' === $settings['show_post_tags'] && !empty(get_the_tag_list('', ', ')),
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_tags_icon']) ? '<i class="fas fa-tags"></i>' : '',
                            'content'   => get_the_tag_list('', ', '),
                        ),
                        'comments_count' => array(
                            'condition' => 'yes' === $settings['show_comments_count'],
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_comments_count_icon']) ? '<i class="fas fa-comments"></i>' : '',
                            'content'   => sprintf(
                                '<a href="%s">%s</a>',
                                esc_url(get_comments_link()),
                                esc_html(get_comments_number_text(__('0 Comments', 'fancy-post-grid'), __('1 Comment', 'fancy-post-grid'), __('% Comments', 'fancy-post-grid')))
                            ),
                        ),
                    );

                    // Define the separator based on user settings (default: hyphen).
                    $separator = ' ' . ($settings['meta_separator'] ?? '-') . ' ';

                    // Output meta items based on conditions.
                    $output = array();
                    foreach ($meta_items as $meta) {
                        if ($meta['condition']) {
                            $output[] = $meta['icon'] . ' ' . $meta['content'];
                        }
                    }

                    // Echo the final output with separators.
                    echo implode($separator, $output);

                    ?>
                </div>
            <?php } ?>

            <!-- Post Title -->
            <?php
            if (!empty($settings['show_post_title']) && 'yes' === $settings['show_post_title']) {
                // Title Tag
                $title_tag = !empty($settings['title_tag']) ? esc_attr($settings['title_tag']) : 'h3';

                // Title Content
                $title = get_the_title();
                if (!empty($settings['title_crop_by']) && !empty($settings['title_length'])) {
                    $title = ('character' === $settings['title_crop_by'])
                        ? mb_substr($title, 0, (int)$settings['title_length'])
                        : implode(' ', array_slice(explode(' ', $title), 0, (int)$settings['title_length']));
                }

                // Inline Styles
                $title_styles = [];
                if (!empty($settings['title_padding'])) {
                    $padding = $settings['title_padding'];
                    $title_styles[] = "padding: {$padding['top']}{$padding['unit']} {$padding['right']}{$padding['unit']} {$padding['bottom']}{$padding['unit']} {$padding['left']}{$padding['unit']};";
                }
                if (!empty($settings['title_margin'])) {
                    $margin = $settings['title_margin'];
                    $title_styles[] = "margin: {$margin['top']}{$margin['unit']} {$margin['right']}{$margin['unit']} {$margin['bottom']}{$margin['unit']} {$margin['left']}{$margin['unit']};";
                }
                if (!empty($settings['title_min_height'])) {
                    $title_styles[] = "min-height: {$settings['title_min_height']}px;";
                }
                if (!empty($settings['title_alignment'])) {
                    $title_styles[] = "text-align: {$settings['title_alignment']};";
                }
                if (!empty($settings['title_normal_color'])) {
                    $title_styles[] = "color: {$settings['title_normal_color']};";
                }
                if (!empty($settings['title_normal_background'])) {
                    $title_styles[] = "background-color: {$settings['title_normal_background']};";
                }
                $title_style_attr = !empty($title_styles) ? 'style="' . implode(' ', $title_styles) . '"' : '';

                // Title Classes
                $title_classes = ['fancy-post-title'];
                if ('enable' === $settings['title_hover_underline']) {
                    $title_classes[] = 'hover-underline';
                }

                // Rendering the Title
                ?>
                <<?php echo esc_attr($title_tag); ?> 
                    class="fancy_title_elementor <?php echo esc_attr(implode(' ', $title_classes)); ?>"  
                    style="
                        <?php echo !empty($settings['title_normal_background']) ? 'background-color: ' . esc_attr($settings['title_normal_background']) . ';' : ''; ?>"
                    onmouseover="
                        this.style.backgroundColor='<?php echo esc_attr($settings['title_hover_background']); ?>';"
                    onmouseout="
                        this.style.backgroundColor='<?php echo esc_attr($settings['title_normal_background']); ?>';">
                    <?php if ('link_details' === $settings['link_type']) { ?>
                        <a href="<?php the_permalink(); ?>" 
                           target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>"
                           style="
                               <?php echo isset($settings['title_normal_color']) && !empty($settings['title_normal_color']) 
                                   ? 'color: ' . esc_attr($settings['title_normal_color']) . ';' 
                                   : ''; ?>"
                           onmouseover="this.style.color='<?php echo isset($settings['title_hover_color']) 
                               ? esc_attr($settings['title_hover_color']) 
                               : ''; ?>';"
                           onmouseout="this.style.color='<?php echo isset($settings['title_normal_color']) 
                               ? esc_attr($settings['title_normal_color']) 
                               : ''; ?>';">
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
                <p class="fancy-post-excerpt" 
                    style="
                        <?php echo !empty( $settings['excerpt_normal_color'] ) ? 'color: ' . esc_attr( $settings['excerpt_normal_color'] ) . ';' : ''; ?>
                        <?php echo isset( $settings['excerpt_spacing']['size'] ) ? 'margin: ' . esc_attr( $settings['excerpt_spacing']['top'] ) . esc_attr( $settings['excerpt_spacing']['unit'] ) . ' ' . esc_attr( $settings['excerpt_spacing']['right'] ) . esc_attr( $settings['excerpt_spacing']['unit'] ) . ' ' . esc_attr( $settings['excerpt_spacing']['bottom'] ) . esc_attr( $settings['excerpt_spacing']['unit'] ) . ' ' . esc_attr( $settings['excerpt_spacing']['left'] ) . esc_attr( $settings['excerpt_spacing']['unit'] ) . ';' : ''; ?>
                    ">
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
                <style>
                    /* Hover styling for the excerpt */
                    .fancy-post:hover .fancy-post-excerpt {
                        <?php echo !empty( $settings['excerpt_hover_color'] ) ? 'color: ' . esc_attr( $settings['excerpt_hover_color'] ) . ';' : ''; ?>
                    }
                </style>
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
                <div class="fancy-post-readmore">
                    <a href="<?php echo esc_url(get_permalink()); ?>" 
                       class="readmore-button <?php echo 'text_button' === $settings['button_type'] ? 'readmore-text-button' : 'readmore-default-button'; ?>"
                       target="<?php echo 'new_window' === $settings['link_target'] ? '_blank' : '_self'; ?>"
                       style="<?php foreach ($readmore_styles as $key => $value) echo esc_attr($key . ': ' . $value . '; '); ?>"
                       onmouseover="this.style.color='<?php echo esc_attr($settings['readmore_hover_text_color'] ?? $settings['readmore_normal_text_color']); ?>';
                                    this.style.backgroundColor='<?php echo esc_attr($settings['readmore_hover_background_color'] ?? $settings['readmore_normal_background_color']); ?>';"
                       onmouseout="this.style.color='<?php echo esc_attr($settings['readmore_normal_text_color'] ?? '#000'); ?>';
                                    this.style.backgroundColor='<?php echo esc_attr($settings['readmore_normal_background_color'] ?? 'transparent'); ?>';">
                        <?php
                        if (!empty($settings['button_icon']) && 'yes' === $settings['button_icon']) {
                            if ('button_position_left' === $settings['button_position']) {
                                \Elementor\Icons_Manager::render_icon($settings['choose_icon'], ['aria-hidden' => 'true']);
                            }
                        }
                        ?>
                        <?php echo esc_html($settings['read_more_label'] ?? 'Read More'); ?>
                        <?php
                        if (!empty($settings['button_icon']) && 'yes' === $settings['button_icon']) {
                            if ('button_position_right' === $settings['button_position']) {
                                \Elementor\Icons_Manager::render_icon($settings['choose_icon'], ['aria-hidden' => 'true']);
                            }
                        }
                        ?>
                    </a>
                </div>
            <?php } ?> 
            </div>                    
        </div>
        <?php
    }
    // Pagination
    if ('yes' === $settings['show_pagination']) {
        echo '<div class="fancy-post-pagination">';
        $big = 999999999; // Need an unlikely integer for pagination
        echo wp_kses_post(paginate_links(array(
            'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format'    => '?paged=%#%',
            'current'   => max(1, $paged),
            'total'     => $query->max_num_pages,
            'prev_text' => esc_html__('« Prev', 'fancy-post-grid'),
            'next_text' => esc_html__('Next »', 'fancy-post-grid'),
        )));
        echo '</div>';
    }
    echo '</div>';
} else {
    echo '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
}

// Reset post data
wp_reset_postdata();
        