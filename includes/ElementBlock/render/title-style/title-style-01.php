<?php
$settings = $this->get_settings_for_display();
// Get the current page number
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
// Prepare arguments for WP_Query
$args = array(
    'post_type'      => 'post',
    'post_status'    => 'publish',
    
    
    'paged'          => $paged, // Add the paged parameter to handle pagination
);

// Query the posts
$query = new \WP_Query($args);

// Check if there are posts
if ($query->have_posts()) { ?>
    <div class="fpg-section-area rs-medium-card-area section-space">
        <div class="container">
            <div class="row">
    <?php
    while ($query->have_posts()) {
        $query->the_post(); 
    ?>
        <div class="col-xl-8 col-lg-8 g-15">
            <?php 
                $layout = $settings['fancy_post_card_layout'] ?? 'cardstyle06';
                $box_alignment = $settings['box_alignment'] ?? '';

                if (empty($box_alignment)) {
                    switch ($layout) {
                        
                        case 'cardstyle06':
                            $box_alignment = 'start';
                            break;
                    }
                }
            ?>
            <div class="rs-post-medium rs-post-medium-one <?php echo esc_attr($hover_animation); ?> ">
                <div class="rs-post-medium-item">
                    

                    <div class="rs-post-medium-content align-<?php echo esc_attr($box_alignment); ?>">
                        
                        <!-- Post Title -->
                        <?php 
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
                                    class="title rs-post-medium-title <?php echo esc_attr(implode(' ', $title_classes)); ?>"
                                    >
                                    
                                        <a href="<?php the_permalink(); ?>">
                                           <?php echo esc_html($title); ?>
                                        </a>
                                    
                                        
                                </<?php echo esc_attr($title_tag); ?>>
                                 
                        
                    </div>                    
                </div>                    
            </div>                    
        </div>
        <?php
    } ?>
    </div></div></div>
    <?
    
} else {
}

// Reset post data
wp_reset_postdata();