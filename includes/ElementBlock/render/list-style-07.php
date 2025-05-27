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
    <section class="rs-blog-layout-25 fpg-section-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="rs-blog-25-topbar">
                    <h3 class="title"><?php esc_html_e('Blog & article', 'fancy-post-grid'); ?></h3>
                    <a href="<?php echo esc_url(get_post_type_archive_link('post')); ?>">
                        <?php esc_html_e('See All Posts', 'fancy-post-grid'); ?> <i class="ri-arrow-right-up-line"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="row fancy-post-grid">
            <div class="col-lg-12">
                <?php while ($query->have_posts()) : $query->the_post(); ?> 
                
                <div class="rs-blog-layout-25-item <?php echo esc_attr($hover_animation); ?>">
                    <!-- Featured Image -->
                    <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                        <div class="rs-thumb">
                            <?php 
                            // Map the custom sizes to their actual dimensions
                            $layout = $settings['fancy_post_list_layout'] ?? 'liststyle07';
                            $thumbnail_size = $settings['thumbnail_size'] ?? '';

                            if (empty($thumbnail_size)) {
                                switch ($layout) {
                                    
                                    case 'liststyle07':
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
                        </div>
                    <?php } ?>
                    
                    <div class="rs-content">
                        <!-- Post Meta: Date, Author, Category, Tags, Comments -->
                        <?php if ('yes' === $settings['show_meta_data']) { ?>
                            <div class="rs-meta">
                                <div class="rs-cat">
                                    <?php
                                    // Array of meta items with their respective conditions, content, and class names.
                                    $meta_items = array(
                                        'post_categories' => array(
                                            'condition' => 'yes' === $settings['show_post_categories'],
                                            'class'     => 'meta-categories',
                                            'content'   => get_the_category_list(', '),
                                        ), 
                                    );

                                    // Output each meta item as a list item with the respective class.
                                    foreach ($meta_items as $meta) {
                                        if ($meta['condition']) {
                                            echo '<div class="' . esc_attr($meta['class']) . '">';
                                            echo  wp_kses_post($meta['content']);
                                            echo '</div>';
                                        }
                                    }
                                    ?>
                                </div>
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
                                    class="blog-title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
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
                                $layout = $settings['fancy_post_list_layout'] ?? 'liststyle07';
                                $button_type = $settings['button_type'] ?? '';

                                if (empty($button_type)) {
                                    switch ($layout) {
                                        
                                        case 'liststyle07':
                                            $button_type = 'fpg-flat';
                                            break;
                                    }
                                }
                            ?>
                            <div class="btn-wrapper blog-btn">
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
                </div>  
                <?php endwhile; ?>
            </div> 
        </div> 
    </div> 
    </section>
<?php else : ?>
    
<?php endif; 
wp_reset_postdata();?>