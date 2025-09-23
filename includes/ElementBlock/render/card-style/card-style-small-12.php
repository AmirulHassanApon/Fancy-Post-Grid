<?php
$settings = $this->get_settings_for_display();
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

// Separator and other settings
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

// --------------------------
// Query arguments per tab
// --------------------------

// Recent Posts
$args_recent = [
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
    'paged'          => $paged,
];
$query_recent = new \WP_Query($args_recent);

// Popular Posts
$args_popular = $args_recent; // base args
$args_popular['meta_query'] = [
    'relation' => 'OR',
    [
        'key'     => 'post_views_count',
        'compare' => 'EXISTS',
    ],
    [
        'key'     => 'post_views_count',
        'compare' => 'NOT EXISTS',
    ],
];
$args_popular['orderby'] = 'meta_value_num';
$args_popular['order'] = ! empty($settings['popular_order']) ? $settings['popular_order'] : 'DESC';
$query_popular = new \WP_Query($args_popular);

// Featured Posts
$args_featured = $args_recent; // base args
$args_featured['meta_query'][] = [
    'key'     => '_fpg_featured_post',
    'value'   => '1',
    'compare' => '=',
];
$query_featured = new \WP_Query($args_featured);
?>

<div class="fpg-section-area rs-small-card-area secondary-bg section-space">
    <div class="container">
        <div class="row g-15">
            <div class="col-xl-<?php echo esc_attr($settings['col_desktop_card']); ?> col-lg-<?php echo esc_attr($settings['col_lg_card']); ?> col-md-<?php echo esc_attr($settings['col_md_card']); ?> g-15">
                <div class="rs-post-small rs-post-small-fourteen">
                    <h5 class="section-title is-small fancy-post-title">
                        <?php echo esc_html__('Popular News', 'fancy-post-grid'); ?>
                    </h5>
                    <!-- Tabs -->
                    <div class="rs-post-small-tab">
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                           <li class="nav-item" role="presentation">
                              <button class="nav-link active" id="pills-item-one-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-item-one" type="button" role="tab"
                                 aria-controls="pills-item-one" aria-selected="true"><?php echo esc_html__('Recent', 'fancy-post-grid'); ?>
                              </button>
                           </li>
                           <li class="nav-item" role="presentation">
                              <button class="nav-link" id="pills-item-two-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-item-two" type="button" role="tab"
                                 aria-controls="pills-item-two" aria-selected="false"> <?php echo esc_html__('Popular', 'fancy-post-grid'); ?>
                              </button>
                           </li>
                           <li class="nav-item" role="presentation">
                              <button class="nav-link" id="pills-item-three-tab" data-bs-toggle="pill"
                                 data-bs-target="#pills-item-three" type="button" role="tab"
                                 aria-controls="pills-item-three" aria-selected="false"><?php echo esc_html__('Featured', 'fancy-post-grid'); ?>
                              </button>
                           </li>
                        </ul>
                     </div>

                    <div class="rs-post-samll-tab-content">
                        <div class="tab-content rs-post-small-tab-anim" id="pills-tabContent">
                            <!-- Recent Posts Tab -->
                            <div class="tab-pane fade" id="pills-item-one" role="tabpanel" aria-labelledby="pills-item-one-tab" tabindex="0">
                                <?php if ($query_recent->have_posts()) : ?>
                                    <?php while ($query_recent->have_posts()) : $query_recent->the_post(); ?>
                                        <?php include 'small-card-item.php'; ?>
                                    <?php endwhile; ?>
                                    <?php wp_reset_postdata(); ?>
                                <?php endif; ?>
                            </div>

                            <!-- Popular Posts Tab -->
                            <div class="tab-pane fade show active" id="pills-item-two" role="tabpanel" aria-labelledby="pills-item-two-tab" tabindex="0">
                                <?php if ($query_popular->have_posts()) : ?>
                                    <?php while ($query_popular->have_posts()) : $query_popular->the_post(); ?>
                                        <?php include 'small-card-item.php'; ?>
                                    <?php endwhile; ?>
                                    <?php wp_reset_postdata(); ?>
                                <?php endif; ?>
                            </div>

                            <!-- Featured Posts Tab -->
                            <div class="tab-pane fade" id="pills-item-three" role="tabpanel" aria-labelledby="pills-item-three-tab" tabindex="0">
                                <?php if ($query_featured->have_posts()) : ?>
                                    <?php while ($query_featured->have_posts()) : $query_featured->the_post(); ?>
                                        <?php include 'small-card-item.php'; ?>
                                    <?php endwhile; ?>
                                    <?php wp_reset_postdata(); ?>
                                <?php endif; ?>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
