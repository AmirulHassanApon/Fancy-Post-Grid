<?php
$settings = $this->get_settings_for_display();
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

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
    'paged'          => $paged,
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

$query = new \WP_Query($args);

$fancy_post_filter_text = $settings['filter_all_text'] ?? 'All';

if ($query->have_posts()) { 
    ?>
    <section class="rs-blog-layout-4 rs-blog-layout-10 fpg-section-area">
        <div class="row">
            <div class="col-lg-12">
                <div class="rs-blog-layout-1-filter rs-blog-layout-filter">
                    <div class="filter-button-group">
                        <button class="active" data-filter="*"><?php echo esc_attr($fancy_post_filter_text); ?></button>
                        <?php
                        // Get unique categories from posts
                        $categories = get_categories();
                        foreach ($categories as $category) {
                            echo '<button data-filter=".' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</button>';
                        }
                        ?>
                    </div>       
                </div>
            </div>
        </div>
        <div class="row rs-grid" id="isotope-container">
    <?php
    
        while ($query->have_posts()) {
        $query->the_post();
        $categories = get_the_category();
        $category_classes = '';
        foreach ($categories as $cat) {
            $category_classes .= ' ' . esc_attr($cat->slug);
        }

    ?>
        <div class="col-xl-<?php echo esc_attr($settings['col_desktop']); ?> col-lg-<?php echo esc_attr($settings['col_lg']); ?> col-md-<?php echo esc_attr($settings['col_md']); ?> col-sm-<?php echo esc_attr($settings['col_sm']); ?> col-xs-<?php echo esc_attr($settings['col_xs']); ?>  rs-grid-item <?php echo esc_attr($category_classes); ?>" >
            <?php 
                $layout = $settings['fancy_post_isotope_layout'] ?? 'isotopestyle01';
                $box_alignment = $settings['box_alignment'] ?? '';

                if (empty($box_alignment)) {
                    switch ($layout) {
                        
                        case 'isotopestyle01':
                            $box_alignment = 'start';
                            break;
                    }
                }
            ?>
            <div class="rs-blog__item align-<?php echo esc_attr($box_alignment); ?> <?php echo esc_attr($hover_animation); ?> <?php echo esc_attr($link_type); ?>">
                <!-- Featured Image -->
                <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) { ?>
                <div class="rs-thumb">

                <?php 
                    $layout = $settings['fancy_post_isotope_layout'] ?? 'isotopestyle01';
                        $thumbnail_size = $settings['thumbnail_size'] ?? '';

                        if (empty($thumbnail_size)) {
                            switch ($layout) {
                                
                                case 'isotopestyle01':
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
                        
                        <?php
                        // Array of meta items with their respective conditions, content, and class names.
                        $meta_items = array(
                            'post_categories' => array(
                                'condition' => 'yes' === $settings['show_post_categories'],
                                'class'     => 'rs-category',
                                'content'   => get_the_category_list(', '),
                            ),
                        );

                        // Output each meta item as a list item with the respective class.
                        foreach ($meta_items as $meta) {
                            if ($meta['condition']) {
                                echo '<div class="' . esc_attr($meta['class']) . '">';
                                echo wp_kses_post($meta['content']);
                                echo '</div>';
                            }
                        }
                        ?>
                        
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
                    <div class="rs-blog-footer">
                        <?php if ('yes' === $settings['show_meta_data']) { ?>
                            <div class="user">
                                <?php if ('yes' === $settings['show_post_author']) : 
                                    $author_id = get_the_author_meta('ID');
                                    $author_url = get_author_posts_url($author_id);
                                    $author_name = esc_html(get_the_author());
                                    $author_prefix = esc_html($settings['author_prefix']); // Example: 'By'
                                    $avatar_url = get_avatar_url($author_id);
                                ?>
                                    <a href="<?php echo esc_url($author_url); ?>">
                                        <div class="author-thumb">
                                            <img decoding="async" src="<?php echo esc_url($avatar_url); ?>" alt="<?php esc_attr_e('Author', 'fancy-post-grid'); ?>" class="author-avatar" />
                                            
                                        </div>
                                        <span><?php echo $author_prefix . ' ' . $author_name; ?></span>
                                    </a>
                                <?php endif; ?>
                            </div>
                        <?php } ?>

                        <!-- Read More Button -->
                        <?php if (!empty($settings['show_post_readmore']) && 'yes' === $settings['show_post_readmore']) { 
                            $layout = $settings['fancy_post_isotope_layout'] ?? 'isotopestyle01';
                            $button_type = $settings['button_type'] ?? '';
                            
                            if (empty($button_type)) {
                                switch ($layout) {
                                    case 'isotopestyle01':
                                        $button_type = 'fpg-filled';
                                        break;
                                }
                            }
                        ?>
                        <div class="blog-btn">
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
            </div> 
        </div>
        <?php
    }
    echo '</div>';
    ?>
    </section>
    <?php
    wp_reset_postdata();

} else {
    echo '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
}
?>
