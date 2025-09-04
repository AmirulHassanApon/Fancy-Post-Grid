<?php
$settings = $this->get_settings_for_display();
// Enqueue Swiper styles and scripts

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
$hover_animation = $settings['hover_animation'];
$link_type = $settings['link_type'];
// Query the posts
$query = new \WP_Query($args);

// Check if there are posts
if ($query->have_posts()) {
    ?>
    <div class="rs-blog-layout-4 fpg-section-area">
        <div class="container">
            <div class="row fancy-post-grid">
                <div class="col-lg-12">
                <div class="swiper_wrap">
                    <?php
                        $unique_id = 'swiper_' . uniqid(); // Generate unique ID per Swiper
                    ?>

                        <div class="swiper <?php echo esc_attr($unique_id); ?>" data-swiper='<?php echo wp_json_encode([
                            'loop' => $settings['enable_looping'] === 'yes',
                            'autoplay' => $settings['auto_play_speed'] > 0 ? ['delay' => intval($settings['auto_play_speed']), 'disableOnInteraction' => false] : false,
                            'pagination' => [
                                'el' => ".{$unique_id}-pagination",
                                'type' => $settings['slider_pagination_type'],
                                'clickable' => $settings['pagination_clickable_mode'] === 'yes',
                            ],
                            'keyboard' => [
                                'enabled' => $settings['enable_keyboard_control'] === 'yes',
                            ],
                            'freeMode' => $settings['enable_free_mode'] === 'yes',
                            'slidesPerView' => !empty($settings['slider_columns']) ? intval($settings['slider_columns']) : 3,
                            'spaceBetween' => !empty($settings['slider_item_gap']) ? intval($settings['slider_item_gap']) : 10,
                            'navigation' => [
                                'nextEl' => ".{$unique_id}-next",
                                'prevEl' => ".{$unique_id}-prev",
                            ],
                        ]); ?>'>
                        <div class="swiper-wrapper">
                            <?php
                            while ($query->have_posts()) {
                                $query->the_post();
                            ?>

                            <div class="swiper-slide fancy-post-item col-xl-<?php echo esc_attr($settings['col_desktop_slider']); ?> col-lg-<?php echo esc_attr($settings['col_lg_slider']); ?> col-md-<?php echo esc_attr($settings['col_md_slider']); ?> col-sm-<?php echo esc_attr($settings['col_sm_slider']); ?> col-xs-<?php echo esc_attr($settings['col_xs_slider']); ?>">
                                <?php 
                                    $layout = $settings['fancy_post_slider_layout'] ?? 'sliderstyle04';
                                    $box_alignment = $settings['box_alignment'] ?? '';

                                    if (empty($box_alignment)) {
                                        switch ($layout) {
                                            
                                            case 'sliderstyle04':
                                                $box_alignment = 'start';
                                                break;
                                        }
                                    }
                                ?>
                                <div class="rs-blog__item align-<?php echo esc_attr($box_alignment); ?> <?php echo esc_attr($hover_animation); ?> <?php echo esc_attr($link_type); ?>">
                                   <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { 
                                            $layout = $settings['fancy_post_slider_layout'] ?? 'sliderstyle04';
                                            $thumbnail_size = $settings['thumbnail_size'] ?? '';

                                            if (empty($thumbnail_size)) {
                                                switch ($layout) {
                                                    
                                                    case 'sliderstyle04':
                                                        $thumbnail_size = 'fancy_post_landscape';
                                                        break;
                                                }
                                            }
                                        ?>
                                        <div class="image-wrap rs-thumb">
                                            <?php if ('thumbnail_on' === $settings['thumbnail_link']) { ?>
                                                <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                                    <?php the_post_thumbnail($thumbnail_size); ?>
                                                </a>
                                            <?php } else { ?>
                                                <?php the_post_thumbnail($thumbnail_size); ?>
                                            <?php } ?>
                                        </div>
                                    <?php } ?>
                    
                                    <div class="rs-content">
                                        
                                        <?php
                                            // Get post categories
                                            $post_categories = get_the_category();

                                            if ( 'yes' === $settings['show_post_categories'] && !empty( $post_categories ) ) : ?>
                                                <?php foreach ( $post_categories as $cat ) : 
                                                    // Get category background color
                                                    $cat_bg = get_term_meta( $cat->term_id, 'fpg_bg_color', true );
                                                    $style = $cat_bg ? 'background:' . esc_attr( $cat_bg ) . ';' : '';
                                                ?> 
                                                <div class="rs-blog-category meta-data-list" >
                                                    <a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>" 
                                                       class="meta-categories" 
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
                                                    class="title blog-title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
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
                                            <div class="fpg-excerpt ">
                                                <p class="fancy-post-excerpt desc" >
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

                                        <div class="rs-blog-footer">
                                            
                                            <!-- Read More Button -->
                                            <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { 
                                                $layout = $settings['fancy_post_slider_layout'] ?? 'sliderstyle04';
                                                $button_type = $settings['button_type'] ?? '';

                                                if (empty($button_type)) {
                                                    switch ($layout) {
                                                        
                                                        case 'sliderstyle04':
                                                            $button_type = 'fpg-flat';
                                                            break;
                                                    }
                                                }
                                                ?>
                                                
                                                <a href="<?php echo esc_url(get_permalink()); ?>" 
                                                   class="btn-wrapper btn-link read-more <?php echo esc_attr($button_type); ?>"
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
                                                
                                            <?php } ?> 
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <?php } ?>
                            </div>
                        </div>

                        <!-- Add Swiper Navigation -->
                        <?php if ('yes' === $settings['show_arrow_control']) { ?>
                            <div class="swiper-button-next <?php echo esc_attr($unique_id); ?>-next"></div>
                            <div class="swiper-button-prev <?php echo esc_attr($unique_id); ?>-prev"></div>
                        <?php } ?>

                        <?php if ('yes' === $settings['show_pagination_control']) { ?>
                            <div class="swiper-pagination <?php echo esc_attr($unique_id); ?>-pagination swiper-pagination-4"></div>
                        <?php } ?>
                    
                </div>
                </div>
            </div>
        </div>
    </div>
    
    <?php
} else {
    
}
wp_reset_postdata();
?>
