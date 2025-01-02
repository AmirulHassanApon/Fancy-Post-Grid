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
    'paged'          => $paged,
);

// Query the posts
$query = new \WP_Query($args);

$fancy_post_filter_alignment = $settings['filter_alignment'] ?? 'center';
$fancy_post_filter_text = $settings['filter_all_text'] ?? 'All';

if ($query->have_posts()) {
    // Isotope filter container
    echo '<div class="rs-blog-layout-1-filter" style="justify-content: ' . esc_attr($fancy_post_filter_alignment) . ';">
            <div class="filter-button-group">
                <button class="active" data-filter="*">' . esc_html($fancy_post_filter_text) . '</button>';
    // Get unique categories from posts
    $categories = get_categories();
    foreach ($categories as $category) {
        echo '<button data-filter=".' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</button>';
    }
    echo '</div>
        </div>';

    // Grid container
    echo '<div class="rs-blog-layout-5 fancy-grid-style-01 fancy-post-grid" style="'
        . 'display: grid; grid-template-columns: repeat(' . esc_attr($settings['col_desktop']) . ', 1fr); '
        . 'gap: ' . esc_attr($settings['space_between']['size'] . $settings['space_between']['unit']) . ';'
        . '" id="isotope-grid">';

    while ($query->have_posts()) {
        $query->the_post();
        $post_classes = join(' ', get_post_class(get_the_category(get_the_ID())[0]->slug));
        $background_color = esc_attr($settings['card_background']);
        $hover_background_color = esc_attr($settings['card_background_hover']);
        $text_alignment = esc_attr($settings['text_alignment']);
        $padding = $settings['content_padding']['top'] . $settings['content_padding']['unit'] . ' ' .
            $settings['content_padding']['right'] . $settings['content_padding']['unit'] . ' ' .
            $settings['content_padding']['bottom'] . $settings['content_padding']['unit'] . ' ' .
            $settings['content_padding']['left'] . $settings['content_padding']['unit'];
        $border_radius = esc_attr($settings['card_border_radius']['size'] . $settings['card_border_radius']['unit']);

        echo '<div class="fancy-post-item ' . esc_attr($post_classes) . '" style="'
            . 'background-color: ' . $background_color . '; text-align: ' . $text_alignment . '; '
            . 'padding: ' . esc_attr($padding) . '; border-radius: ' . $border_radius . ';'
            . '">';

        // Hover background color
        if (!empty($hover_background_color)) {
            echo '<style>.fancy-post-item:hover {background-color: ' . $hover_background_color . ';}</style>';
        }

        // Post thumbnail
        if ('yes' === $settings['show_post_thumbnail'] && has_post_thumbnail()) {
            $thumbnail_size = $settings['thumbnail_size'];
            $thumbnail_size_map = array(
                'fancy_post_custom_size' => array(768, 500),
                'fancy_post_square'     => array(500, 500),
                'fancy_post_landscape'  => array(834, 550),
                'fancy_post_portrait'   => array(421, 550),
                'fancy_post_list'       => array(1200, 650),
            );
            $thumbnail_size = $thumbnail_size_map[$thumbnail_size] ?? $thumbnail_size;

            echo '<div class="fancy-post-thumbnail">';
            echo '<a href="' . esc_url(get_the_permalink()) . '">';
            the_post_thumbnail($thumbnail_size);
            echo '</a>';
            echo '</div>';
        }

        // Post meta
        if ('yes' === $settings['show_meta_data']) {
            echo '<div class="fancy-post-meta">';
            $meta_output = array();
            if ('yes' === $settings['show_post_author']) {
                $meta_output[] = '<span class="meta-author">' . esc_html(get_the_author()) . '</span>';
            }
            if ('yes' === $settings['show_post_date']) {
                $meta_output[] = '<span class="meta-date">' . esc_html(get_the_date()) . '</span>';
            }
            echo implode(' | ', $meta_output);
            echo '</div>';
        }

        // Post title
        if ('yes' === $settings['show_post_title']) {
            $title_tag = $settings['title_tag'] ?? 'h3';
            $title = get_the_title();
            echo '<' . esc_attr($title_tag) . ' class="fancy-post-title">'
                . esc_html($title) . '</' . esc_attr($title_tag) . '>';
        }

        echo '</div>'; // End fancy-post-item
    }

    echo '</div>'; // End grid container
} else {
    echo '<p>' . esc_html__('No posts found.', 'fancy-post-grid') . '</p>';
}

wp_reset_postdata();
?>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('#isotope-grid');
    const iso = new Isotope(grid, {
        itemSelector: '.fancy-post-item',
        layoutMode: 'fitRows',
    });

    // Filter buttons
    const filters = document.querySelectorAll('.filter-button-group button');
    filters.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
</script>
