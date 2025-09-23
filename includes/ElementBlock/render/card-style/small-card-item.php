<?php
// Ensure $settings, $hover_animation, $link_type, $separator_value are available in parent scope
$layout = $settings['fancy_post_card_layout'] ?? 'cardstyle19';
$box_alignment = $settings['box_alignment'] ?? '';

if (empty($box_alignment)) {
    switch ($layout) {
        case 'cardstyle19':
            $box_alignment = 'start';
            break;
    }
}
?>

<div class="rs-post-small-item <?php echo esc_attr($hover_animation); ?> <?php echo esc_attr($link_type); ?>">
    <!-- Featured Image -->
    <?php if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) : ?>
        <div class="rs-thumb rs-post-small-thumb">
            <?php
            $thumbnail_size = $settings['thumbnail_size_card'] ?? '';
            if (empty($thumbnail_size)) {
                switch ($layout) {
                    case 'cardstyle19':
                        $thumbnail_size = 'fancy_post_portrait';
                        break;
                }
            }
            if ('yes' === $settings['thumbnail_link']) : ?>
                <a href="<?php the_permalink(); ?>" class="image-link" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                    <?php the_post_thumbnail($thumbnail_size); ?>
                </a>
            <?php else : ?>
                <?php the_post_thumbnail($thumbnail_size); ?>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <div class="rs-post-small-content align-<?php echo esc_attr($box_alignment); ?>">
        <!-- Categories -->
        <?php if ('yes' === $settings['show_post_categories']) :
            $post_categories = get_the_category();
            if (!empty($post_categories)) : ?>
                <div class="rs-post-tag">
                    <?php foreach ($post_categories as $cat) :
                        $cat_bg = get_term_meta($cat->term_id, 'fpg_bg_color', true);
                        $style = $cat_bg ? 'background:' . esc_attr($cat_bg) . ';' : ''; ?>
                        <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>" class="post-tag" style="<?php echo esc_attr($style); ?>">
                            <?php echo esc_html($cat->name); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <!-- Post Title -->
        <?php if (!empty($settings['show_post_title']) && 'yes' === $settings['show_post_title']) :
            $title_tag = !empty($settings['title_tag']) ? esc_attr($settings['title_tag']) : 'h3';
            $title = get_the_title();
            if (!empty($settings['title_crop_by']) && !empty($settings['title_length'])) {
                $title = ('character' === $settings['title_crop_by'])
                    ? mb_substr($title, 0, (int)$settings['title_length'])
                    : implode(' ', array_slice(explode(' ', $title), 0, (int)$settings['title_length']));
            }
            $title_classes = ['fancy-post-title'];
            if ('enable' === $settings['title_hover_underline']) {
                $title_classes[] = 'underline';
            }
            ?>
            <<?php echo esc_attr($title_tag); ?> class="title rs-post-small-title <?php echo esc_attr(implode(' ', $title_classes)); ?>">
                <?php if ('link_details' === $settings['link_type']) : ?>
                    <a href="<?php the_permalink(); ?>" target="<?php echo ('new_window' === $settings['link_target']) ? '_blank' : '_self'; ?>">
                        <?php echo esc_html($title); ?>
                    </a>
                <?php else : ?>
                    <?php echo esc_html($title); ?>
                <?php endif; ?>
            </<?php echo esc_attr($title_tag); ?>>
        <?php endif; ?>

        <!-- Post Meta -->
        <!-- Post Meta: Date, Author, Category, Tags, Comments -->
        <?php if ('yes' === $settings['show_meta_data']) { ?>
            <div class="rs-post-meta meta-data-list">
                <ul>
                    <?php
                    // Get post views with a fallback default value.
                    $post_id    = get_the_ID();
                    $post_views = get_post_meta($post_id, 'post_views_count', true);
                    $post_views = !empty($post_views) ? $post_views : 5385; // Default = 5385 views.

                    // Array of meta items.
                    $meta_items = array(
                        'post_author' => array(
                            'condition' => 'yes' === $settings['show_post_author'],
                            'class'     => 'rs-meta',
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['author_icon_visibility']) 
                                            ? ('icon' === $settings['author_image_icon'] 
                                                ? '<i class="fa fa-user"></i>' 
                                                : '<img src="' . esc_url(get_avatar_url(get_the_author_meta('ID'))) . '" alt="' . esc_attr__('Author', 'fancy-post-grid') . '" class="author-avatar" />')
                                            : '',
                            'content'   => esc_html($settings['author_prefix']) . ' ' . esc_html(get_the_author()),
                        ),
                        'post_views' => array(
                            'condition' => 'yes' === $settings['show_post_views'],
                            'class'     => 'rs-meta',
                            'icon'      => ('yes' === $settings['show_meta_data_icon'] && 'yes' === $settings['show_post_views_icon']) 
                                            ? '<i class="ri-pulse-fill"></i>' 
                                            : '',
                            'content'   => esc_html($post_views) . ' ' . esc_html__('Views', 'fancy-post-grid'),
                        ),
                    );

                    $meta_items_output = []; // Collect meta items.

                    foreach ($meta_items as $meta) {
                        if ($meta['condition']) {
                            $meta_items_output[] = '<li>'
                                . '<span class="' . esc_attr($meta['class']) . '">'
                                    . $meta['icon'] . ' ' . $meta['content']
                                . '</span>'
                            . '</li>';
                        }
                    }

                    // Add separator if defined.
                    $separator = !empty($separator_value) ? '<span>' . esc_html($separator_value) . '</span>' : '';

                    // Join meta items with separator.
                    echo wp_kses_post(implode(wp_kses_post($separator), $meta_items_output));
                    ?>
                </ul>
            </div>
        <?php } ?>

    </div>
</div>
