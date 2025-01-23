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
    'post__not_in'   => !empty($settings['exclude_posts']) ? explode(',', $settings['exclude_posts']) : '',
    'paged'          => $paged, // Add the paged parameter to handle pagination
);

// Query the posts
$query = new \WP_Query($args);

// Check if there are posts
if ($query->have_posts()) {
    ?>
    <div class="rs-blog-layout-3 grey fpg-section-area">
        <div class="container">
            <div class="row fancy-post-grid">
                <div class="col-lg-12">
                    <div class="swiper mySwiper" data-swiper='<?php echo json_encode([
                            'loop' => $settings['enable_looping'] === 'yes',
                            'autoplay' => $settings['auto_play_speed'] > 0 ? ['delay' => intval($settings['auto_play_speed']), 'disableOnInteraction' => false] : false,
                            'pagination' => [
                                'el' => '.swiper-pagination',
                                'type' => $settings['slider_pagination_type'],
                                'clickable' => $settings['pagination_clickable_mode'] === 'yes',
                            ],
                            'keyboard' => [
                                'enabled' => $settings['enable_keyboard_control'] === 'yes',
                            ],
                            'freeMode' => $settings['enable_free_mode'] === 'yes',
                            'slidesPerView' => !empty($settings['slider_columns']) ? intval($settings['slider_columns']) : 3,
                            'spaceBetween' => !empty($settings['slider_item_gap']) ? intval($settings['slider_item_gap']) : 10,
                        ]); ?>'>
                        <div class="swiper-wrapper">
                            <?php
                            while ($query->have_posts()) {
                                $query->the_post();
                            ?>

                            <div class="swiper-slide fancy-post-item col-xl-<?php echo esc_attr($settings['col_desktop_slider']); ?> col-lg-<?php echo esc_attr($settings['col_lg_slider']); ?> col-md-<?php echo esc_attr($settings['col_md_slider']); ?> col-sm-<?php echo esc_attr($settings['col_sm_slider']); ?> col-xs-<?php echo esc_attr($settings['col_xs_slider']); ?>">
                                <div class="rs-blog__single">
                                   <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { 
                                        $thumbnail_size = $settings['thumbnail_size'];
                                        ?>
                                        <div class="thumb shape-show">
                                            <?php if ('thumbnail_on' === $settings['thumbnail_link']) { ?>
                                                <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                                                    <?php the_post_thumbnail($thumbnail_size); ?>
                                                </a>
                                            <?php } else { ?>
                                                <?php the_post_thumbnail($thumbnail_size); ?>
                                            <?php } ?>
                                            <div class="rs-contact-icon">
                                                <a href="<?php the_permalink(); ?>"><svg width="14" height="16" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.70371 13.1768L7.90054e-06 14L0.823208 10.2963C0.28108 9.28226 -0.00172329 8.14985 7.90054e-06 7C7.90054e-06 3.1339 3.13391 0 7 0C10.8661 0 14 3.1339 14 7C14 10.8661 10.8661 14 7 14C5.85015 14.0017 4.71774 13.7189 3.70371 13.1768Z" fill="white"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    <?php } ?>
                    
                                    <div class="content">
                                        <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                                        <?php if ('yes' === $settings['show_meta_data']) { ?>
                                            <div class="rs-blog-category">
                                                <?php
                                                
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
                                                        echo '<li class="' . esc_attr($meta['class']) . '">';
                                                        echo $meta['icon'] . ' ' . $meta['content'];
                                                        echo '</li>';
                                                    }
                                                }
                                                ?>
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
                                        <?php if ('yes' === $settings['show_meta_data']) { ?>
                                            <ul class="blog-meta">
                                                <?php
                                                // Array of meta items with their respective conditions, content, and class names.
                                                $meta_items = array(
                                                    
                                                    'post_date' => array(
                                                        'condition' => 'yes' === $settings['show_post_date'],
                                                        'class'     => 'date',
                                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_date_icon']) ? '<i class="fa fa-calendar"></i>' : '',
                                                        'content'   => esc_html(get_the_date()),
                                                    ),
                                                    
                                                    'post_tags' => array(
                                                        'condition' => 'yes' === $settings['show_post_tags'] && !empty(get_the_tag_list('', ', ')),
                                                        'class'     => 'meta-tags',
                                                        'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_tags_icon']) ? '<i class="fa fa-tags"></i>' : '',
                                                        'content'   => get_the_tag_list('', ', '),
                                                    ),
                                                    'comments_count' => array(
                                                        'condition' => 'yes' === $settings['show_comments_count'],
                                                        'class'     => 'meta-comment-count',
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
                                                <li>
                                                    <div class="rs-icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 6 6" fill="none">
                                                            <path d="M3 0L5.59808 1.5V4.5L3 6L0.401924 4.5V1.5L3 0Z" fill="#513DE8"></path>
                                                            <defs>
                                                                <linearGradient x1="-3.93273e-08" y1="0.803572" x2="6.33755" y2="1.30989" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#513DE8" offset="1"></stop>
                                                                    <stop offset="1" stop-color="#8366E3"></stop>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    </div>    
                                                    <?php esc_html_e('8 min read', 'fancy-post-grid'); ?>
                                                </li>
                                            </ul>


                                        <?php } ?>
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
                                        <div class="rs-blog-author">
                                            <div class="user">                 
                                                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                                                    <div class="author-thumb" style="color: <?php echo esc_attr($fpg_meta_author_color); ?>; ">
                                                        <?php echo get_avatar(get_the_author_meta('ID'), 32); ?>
                                                    </div>
                                                    <span>
                                                        <?php esc_html_e('by', 'fancy-post-grid'); ?>  
                                                        <?php the_author(); ?>
                                                    </span>
                                                </a>
                                            </div>
                                            <!-- Read More Button -->
                                            <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { ?>
                                                <div class="btn-wrapper rs-link">
                                                    <a href="<?php echo esc_url(get_permalink()); ?>" 
                                                       class="read-more <?php echo esc_attr($settings['button_type']); ?>"
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

                            </div>
                            <?php } ?>
                        </div>

                        <!-- Add Swiper Navigation -->
                        <?php if ('yes' === $settings['show_arrow_control']) { ?>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                        <?php } ?>
                        <!-- Add Swiper Pagination -->
                        <?php if ('yes' === $settings['show_pagination_control']) { ?>
                        <div class="swiper-pagination swiper-pagination-3"></div>
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
