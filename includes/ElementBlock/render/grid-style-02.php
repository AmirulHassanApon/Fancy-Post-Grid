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
    ?>
    <div class="row">
    
        <div class="swiper fancy-swiper-slider">
            <div class="swiper-wrapper">
                <?php
                while ($query->have_posts()) {
                    $query->the_post();

                    // Styling variables
                    $background_color = isset($settings['card_background']) ? esc_attr($settings['card_background']) : '';
                    $col_class = isset($settings['columns']) ? esc_attr($settings['columns']) : '';
                    
                    $hover_background_color = isset($settings['card_background_hover']) ? esc_attr($settings['card_background_hover']) : '';
                    $text_alignment = isset($settings['text_alignment']) ? esc_attr($settings['text_alignment']) : 'left';
                    $padding = isset($settings['content_padding']) ? esc_attr($settings['content_padding']['top'] . $settings['content_padding']['unit'] . ' ' . $settings['content_padding']['right'] . $settings['content_padding']['unit'] . ' ' . $settings['content_padding']['bottom'] . $settings['content_padding']['unit'] . ' ' . $settings['content_padding']['left'] . $settings['content_padding']['unit']) : '0';
                    $border_radius = isset($settings['card_border_radius']['size']) ? esc_attr($settings['card_border_radius']['size'] . $settings['card_border_radius']['unit']) : '0';

                    echo '<div class="swiper-slide fancy-post-item col-' . esc_attr( $col_class ) . '" style="background-color: ' . esc_attr( $background_color ) . '; text-align: ' . esc_attr( $text_alignment ) . '; padding: ' . esc_attr( $padding ) . '; border-radius: ' . esc_attr( $border_radius ) . ';">';


                    // Post Thumbnail
                    if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) {
                        $thumbnail_size = !empty($settings['thumbnail_size']) ? $settings['thumbnail_size'] : 'full';
                        echo '<div class="fancy-post-thumbnail">';
                        if ('thumbnail_on' === $settings['thumbnail_link']) {
                            echo '<a href="' . get_the_permalink() . '" target="' . ('new_window' === $settings['link_target'] ? '_blank' : '_self') . '">';
                            the_post_thumbnail($thumbnail_size);
                            echo '</a>';
                        } else {
                            the_post_thumbnail($thumbnail_size);
                        }
                        echo '</div>';
                    }

                    // Post Title
                    if ('yes' === $settings['show_post_title']) {
                        $title_tag = !empty($settings['title_tag']) ? $settings['title_tag'] : 'h3';
                        echo '<' . esc_attr($title_tag) . ' class="fancy-post-title">';
                        echo '<a href="' . get_the_permalink() . '">' . get_the_title() . '</a>';
                        echo '</' . esc_attr($title_tag) . '>';
                    }

                    // Post Meta
                    if ('yes' === $settings['show_meta_data']) {
                        echo '<div class="fancy-post-meta">';
                        if ('yes' === $settings['show_post_date']) {
                            echo '<span class="meta-item">' . esc_html(get_the_date()) . '</span>';
                        }
                        if ('yes' === $settings['show_post_author']) {
                            echo '<span class="meta-item">' . esc_html(get_the_author()) . '</span>';
                        }
                        if ('yes' === $settings['show_post_categories']) {
                            echo '<span class="meta-item">' . get_the_category_list(', ') . '</span>';
                        }
                        if ('yes' === $settings['show_post_tags']) {
                            echo '<span class="meta-item">' . get_the_tag_list('', ', ') . '</span>';
                        }
                        echo '</div>';
                    }

                    echo '</div>'; // Close fancy-post-item
                }
                ?>
            </div> <!-- End Swiper Wrapper -->

            <!-- Add Swiper Navigation -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <!-- Add Swiper Pagination -->
            <div class="swiper-pagination"></div>
        </div> <!-- End Swiper -->
    
</div>


    <!-- Swiper Initialization Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            new Swiper('.fancy-swiper-slider', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                slidesPerView: <?php echo !empty($settings['columns']) ? intval($settings['columns']) : 3; ?>,
                spaceBetween: <?php echo !empty($settings['card_gap']['size']) ? intval($settings['card_gap']['size']) : 10; ?>,
            });
        });
    </script>

    <?php
} else {
    echo '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
}

// Reset post data
wp_reset_postdata();
?>
