<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
ob_start();
?>
<section class="rs-blog-layout-18">
    <div class="container">
        <div class="row">
            <?php 
                $pagination_config = '';
                // Check if the clickable setting is true or false
                $clickable = ($fancy_pagination_clickable === 'true') ? 'true' : 'false';
                if ($fpg_pagination_slider === 'normal') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "clickable": ' . $clickable . '}';
                } elseif ($fpg_pagination_slider === 'dynamic') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "dynamicBullets": true, "clickable": ' . $clickable . '}';
                } elseif ($fpg_pagination_slider === 'progress') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "type": "progressbar", "clickable": ' . $clickable . '}';
                } elseif ($fpg_pagination_slider === 'fraction') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "type": "fraction", "clickable": ' . $clickable . '}';
                }

            ?>
            <div class="col-lg-12">
                <div class="swiper_wrap">
                    <div class="swiper mySwiper" data-swiper='{
                        "spaceBetween":<?php echo esc_attr($fancy_spacebetween); ?>,
                        "slidesPerView":<?php echo esc_attr($fancy_post_cl_lg_slider); ?>,
                        "freeMode":<?php echo esc_attr($fancy_free_mode); ?>, 
                        "loop": <?php echo esc_attr($fancy_loop); ?>, 
                        <?php echo esc_js($pagination_config); ?>,

                        "autoplay":{"delay":<?php echo esc_attr($fancy_autoplay); ?>},
                        "keyboard": {"enabled":<?php echo esc_attr($fancy_keyboard); ?>},                        
                        "breakpoints":{                                                       
                            "10":{"slidesPerView":<?php echo esc_attr($fancy_post_cl_mobile_slider ); ?>,"spaceBetween":<?php echo esc_attr($fancy_spacebetween); ?>},
                            "576":{"slidesPerView":<?php echo esc_attr($fancy_post_cl_sm_slider ); ?>,"spaceBetween":<?php echo esc_attr($fancy_spacebetween); ?>},
                            "768":{"slidesPerView":<?php echo esc_attr($fancy_post_cl_md_silder); ?>,"spaceBetween":<?php echo esc_attr($fancy_spacebetween); ?>},
                            "992":{"slidesPerView":<?php echo esc_attr($fancy_post_cl_lg_slider); ?>,"spaceBetween":<?php echo esc_attr($fancy_spacebetween); ?>}
                        }
                    }'>
                        <div class="swiper-wrapper">

                            <?php

                                //==============STATUS==============
                                // Ensure it's an array
                                if (!is_array($fpg_filter_statuses)) {
                                    // Convert string to array if necessary
                                    if (is_string($fpg_filter_statuses)) {
                                        $fpg_filter_statuses = explode(',', $fpg_filter_statuses);
                                    } else {
                                        $fpg_filter_statuses = array(); // Default to empty array if not an array or string
                                    }
                                }

                                // ==============AUTHOR==========
                                // Unserialize the data if necessary
                                if (is_string($fpg_filter_authors)) {
                                    $fpg_filter_authors = maybe_unserialize($fpg_filter_authors);
                                }

                                // Ensure it's an array
                                if (!is_array($fpg_filter_authors)) {
                                    $fpg_filter_authors = array(); // Default to empty array if not an array
                                }

                                // Sanitize and convert to integers
                                $selected_authors = array_map('intval', $fpg_filter_authors);

                                //==========Include only==========
                                $selected_post_in = !empty($fpg_include_only) ? explode(',', $fpg_include_only) : array();

                                //=======Exclude===============
                                $selected_post_not_in = !empty($fpg_exclude) ? explode(',', $fpg_exclude) : array();

                                //=================More Text==========
                                $excerpt_more_text = isset($fancy_post_excerpt_more_text) ? $fancy_post_excerpt_more_text : '...'; 
                                $title_more_text = isset($fancy_post_title_more_text) ? $fancy_post_title_more_text : '...'; 

                                // ===========Advanced Filter==============
                                // Capture and sanitize category terms if 'category' taxonomy is selected
                                $category_terms = array_map('intval', $fpg_filter_category_terms); 

                                // Capture and sanitize tag terms if 'tags' taxonomy is selected
                                $tag_terms = array_map('intval', $fpg_filter_tags_terms);           

                                // Get values from the form inputs           
                                $args = array(
                                    'post_type'      => $fancy_post_type,
                                    'post_status'    => $fpg_filter_statuses, // Add status filter
                                    'posts_per_page' => $fpg_post_per_page, // Number of posts to display
                                    'paged'          => get_query_var('paged') ? get_query_var('paged') : 1, // Get current page number
                                    'orderby'        => $fpg_order_by, // Order by
                                    'order'          => $fpg_order,   // Order direction
                                    'author__in'     => $selected_authors, // Add author filter                                          
                                );
                                // Add 'post__in' to the query if not empty
                                if (!empty($selected_post_in)) {
                                    $args['post__in'] = $selected_post_in;
                                }

                                // Add 'post__not_in' to the query if not empty
                                if (!empty($selected_post_not_in)) {
                                    $args['post__not_in'] = $selected_post_not_in;// phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in
                                }

                                // Run a preliminary query to get all matching post IDs
                                if ($fpg_limit > 0) {
                                    $pre_query = new WP_Query(array_merge($args, array('posts_per_page' => $fpg_limit, 'fields' => 'ids')));
                                    $post_ids = $pre_query->posts;

                                    // Modify the main query to limit the posts
                                    $args['post__in'] = $post_ids;
                                }

                                // Add taxonomy queries
                                $tax_query = array('relation' => $fpg_relation);

                                if (!empty($fpg_field_group_taxonomy) && in_array('category', $fpg_field_group_taxonomy) && !empty($category_terms)) {
                                    $tax_query[] = array(
                                        'taxonomy' => 'category',
                                        'field'    => 'term_id',
                                        'terms'    => $category_terms,
                                        'operator' => $fpg_category_operator,
                                    );
                                }

                                if (!empty($fpg_field_group_taxonomy) && in_array('tags', $fpg_field_group_taxonomy) && !empty($tag_terms)) {
                                    $tax_query[] = array(
                                        'taxonomy' => 'post_tag',
                                        'field'    => 'term_id',
                                        'terms'    => $tag_terms,
                                        'operator' => $fpg_tags_operator,
                                    );
                                }


                                if (!empty($tax_query)) {
                                    $args['tax_query'] = $tax_query;
                                }
                                

                                $query = new WP_Query($args);
                            
                            
                                while ($query->have_posts()) : $query->the_post();
                                    // Check if the link should open in a new tab
                                    $target_blank = ($fancy_link_target === 'new') ? 'target="_blank"' : '';
                                    
                                    // Determine the title tag
                                    $title_tag = !empty($fancy_post_title_tag) ? $fancy_post_title_tag : 'h3';
                                    
                                    // Determine if the feature image should be hidden
                                    $hide_feature_image = isset($fancy_post_hide_feature_image) && $fancy_post_hide_feature_image === 'off';
                                    
                                    // Determine the feature image size
                                    $feature_image_size = isset($fancy_post_feature_image_size) ? (string) $fancy_post_feature_image_size : 'large';  
                                               
                                    // Determine the media source
                                    $media_source = isset($fancy_post_media_source) ? $fancy_post_media_source : 'feature_image';
                                    
                                    // Determine the hover animation
                                    $hover_animation = !empty($fancy_post_hover_animation) ? $fancy_post_hover_animation : 'none';
                                    
                                    // Get the feature image or first image from content
                                    if ($media_source === 'first_image') {

                                        $content = get_the_content();
                                        preg_match_all('/<img[^>]+>/i', $content, $matches);
                                        $first_image = !empty($matches[0][0]) ? $matches[0][0] : '';
                                        preg_match('/src="([^"]+)"/i', $first_image, $img_src);
                                        $feature_image_url = !empty($img_src[1]) ? $img_src[1] : get_the_post_thumbnail_url(get_the_ID(), $feature_image_size);
                                    } else {
                                        $feature_image_url = get_the_post_thumbnail_url(get_the_ID(), $feature_image_size);
                                    }

                                    // Apply hover animation class if needed
                                    $hover_class = $hover_animation !== 'none' ? 'hover-' . esc_attr($hover_animation) : '';
                            ?>

                            <div class="swiper-slide">
                                <div class="rs-blog-layout-18-item <?php echo esc_attr($main_alignment_class); ?> <?php echo esc_attr($hover_class); ?>">

                                    <?php if (!$hide_feature_image && $fpg_field_group_image) : ?>
                                        <div class="rs-thumb">
                                            <?php if ($feature_image_url) : ?>

                                                <?php

                                                    $post_id = get_the_ID();
                                                    // Get the thumbnail ID
                                                    $thumbnail_id = get_post_thumbnail_id($post_id);
                                                    
                                                    // Get the image alt text and title text
                                                    $image_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
                                                    $image_title = get_the_title($thumbnail_id);
                                                    // Use alt text if available; otherwise, use title text
                                                    $alt_text = !empty($image_alt) ? esc_attr($image_alt) : esc_attr($image_title);

                                                ?>
                                                <a href="<?php the_permalink(); ?>" <?php echo esc_attr($target_blank); ?>>
                                                    <img src="<?php echo esc_url($feature_image_url); ?>" alt="<?php echo esc_attr($alt_text); ?>">
                                                </a>
                                            <?php endif; ?>                               
                                        </div>
                                    <?php endif; ?>
                                    
                                    <div class="rs-content">
                                        <div class="rs-meta <?php echo esc_attr($meta_alignment_class); ?>">
                                            <ul class="blog-meta">
                                                
                                                <?php if ($fpg_field_group_categories) : ?>
                                                <li><?php if (!empty($fpg_field_group_category_icon) && empty($disabled_meta_icons['category_icon'])) {?>
                                                    <i class="ri-bookmark-line"></i>
                                                    <?php } ?> <?php the_category(', '); ?></li>
                                                <?php endif; ?>
                                                <?php if ($fpg_field_group_author) : ?>
                                                <li>
                                                    <?php if (!empty($fpg_field_group_author_icon) && empty($disabled_meta_icons['author_icon'])) { ?>
                                                    <i class="ri-user-line"></i>
                                                    <?php } ?>
                                                    <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>"
                                                        <?php echo esc_attr($target_blank); ?>>
                                                        <?php the_author(); ?>
                                                    </a> 
                                                </li>
                                                <?php endif; ?>
                                                <?php if ($fpg_field_group_post_date) : ?>
                                                    <li class="meta-date">
                                                        <?php if (!empty($fpg_field_group_date_icon) && empty($disabled_meta_icons['date_icon'])) {?>
                                                        <i class="ri-calendar-2-line"></i>
                                                        <?php } ?>
                                                        <?php echo get_the_date('M d, Y'); ?>
                                                    </li>
                                                <?php endif; ?>
                                                <?php if ($fpg_field_group_comment_count && get_comments_number() > 0) : ?>
                                                    <li class="meta-comment-count">
                                                        <?php if (!empty($fpg_field_group_comment_count_icon) && empty($disabled_meta_icons['comment_count_icon'])) {?>
                                                        <i class="ri-chat-3-line"></i>
                                                        <?php } ?>
                                                        <?php comments_number('0 Comments', '1 Comment', '% Comments'); ?>
                                                    </li>
                                                <?php endif; ?>
                                                <?php if ($fpg_field_group_tag && has_tag()) : ?>
                                                    <li class="meta-tags">
                                                        <?php if (!empty($fpg_field_group_tags_icon) && empty($disabled_meta_icons['tags_icon'])) {?>
                                                        <i class="ri-price-tag-3-line"></i>
                                                        <?php } ?>
                                                        <?php the_tags('', ', ', ''); ?>
                                                    </li>
                                                <?php endif; ?>
                                            </ul>
                                        </div>
                                        
                                        <?php if ($fpg_field_group_title) : ?>
                                            <<?php echo esc_attr($title_tag); ?> class="title <?php echo esc_attr($title_alignment_class); ?>">
                                                <?php if ($fancy_link_details === 'on') : ?>
                                                    <a href="<?php the_permalink(); ?>"
                                                       <?php <?php echo esc_attr($target_blank); ?> ?>
                                                       class="title-link">
                                                        <?php echo esc_html(
                                                            wp_trim_words(get_the_title(), $fancy_post_title_limit, esc_html($title_more_text))
                                                        ); ?>
                                                    </a>
                                                <?php else : ?>
                                                    <?php echo esc_html(
                                                        wp_trim_words(get_the_title(), $fancy_post_title_limit, esc_html($title_more_text))
                                                    );?>
                                                <?php endif; ?>
                                            </<?php echo esc_attr($title_tag); ?>>
                                        <?php endif; ?>
                                       

                                        <?php if ($fpg_field_group_read_more) : ?>
                                        <div class="blgo-btn-box <?php echo esc_attr($button_alignment_class); ?>">
                                            <a class="rs-btn  <?php echo esc_attr($button_class); ?>" href="<?php the_permalink(); ?>" <?php echo esc_attr($target_blank); ?>>
                                                <div class="blog-btn" >
                                                    <?php echo esc_html($fancy_post_read_more_text); ?>
                                                    <i class="ri-arrow-right-line"></i>
                                                </div>
                                            </a>
                                        </div>
                                <?php endif; ?>
                                    </div>
                                </div>
                            </div>

                            <?php
                                endwhile;
                                wp_reset_postdata(); // Reset post data to the main query
                            ?>
                        </div>
                    </div>
                    <?php if ($fancy_pagination === 'true') : ?>
                    <div class="swiper-pagination swiper-pagination-18"></div>
                    <?php endif; ?>
                    <!-- Pagination and Navigation Controls -->
                    <?php if ($fancy_arrow === 'true') : ?>
                        
                        
                        <!-- Navigation buttons, if applicable -->
                        <?php if (in_array($fpg_pagination_slider, ['progress', 'fraction', 'dynamic', 'normal'])) : ?>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>
<style type="text/css">
    /* General Styles */
    .rs-blog-layout-18 {
        <?php if (!empty($fpg_section_background_color)) : ?>
            background-color: <?php echo esc_attr($fpg_section_background_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_section_margin)) : ?>
            margin: <?php echo esc_attr($fpg_section_margin); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_section_padding)) : ?>
            padding: <?php echo esc_attr($fpg_section_padding); ?>;
        <?php endif; ?>
    }

    /* Single Item Styles */
    .rs-blog-layout-18 .rs-blog-layout-18-item {
    }

    .rs-blog-layout-18 .rs-blog-layout-18-item .rs-content {
        <?php if (!empty($fpg_single_section_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_single_section_border_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_border_style)) : ?>
            border-style: <?php echo esc_attr($fancy_post_border_style); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_border_width)) : ?>
            border-width: <?php echo esc_attr($fancy_post_border_width); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_section_border_radius)) : ?>
            border-radius: <?php echo esc_attr($fancy_post_section_border_radius); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_single_section_background_color)) : ?>
            background-color: <?php echo esc_attr($fpg_single_section_background_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_single_section_margin)) : ?>
            margin: <?php echo esc_attr($fpg_single_section_margin); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_single_section_padding)) : ?>
            padding: <?php echo esc_attr($fpg_single_section_padding); ?>;
        <?php endif; ?>
        
    }

    /* Title Styles */
    .rs-blog-layout-18 .rs-blog-layout-18-item .rs-content .title {
        
        <?php if (!empty($fpg_title_order)) : ?>
            order: <?php echo esc_attr($fpg_title_order); ?>;
        <?php endif; ?>
        padding: <?php echo esc_attr($fpg_title_padding); ?>;
        margin: <?php echo esc_attr($fpg_title_margin); ?>;
        <?php if (!empty($fpg_title_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_title_border_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_border_style)) : ?>
            border-style: <?php echo esc_attr($fpg_title_border_style); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_border_width)) : ?>
            border-width: <?php echo esc_attr($fpg_title_border_width); ?>;
        <?php endif; ?>
    }
    /* Title Styles */
    .rs-blog-layout-18 .rs-blog-layout-18-item .rs-content .title a {
        <?php if (!empty($fpg_secondary_color) || !empty($fpg_title_color)) : ?>
            color: <?php echo esc_attr(!empty($fpg_secondary_color) ? $fpg_secondary_color : $fpg_title_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_title_font_size); ?>px;
        <?php endif; ?>
        <?php if (!empty($fpg_title_line_height)) : ?>
            line-height: <?php echo esc_attr($fpg_title_line_height); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_title_font_weight); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-18-item .rs-content .title a:hover {   
        <?php if (!empty($fpg_primary_color) || !empty($fpg_title_hover_color)) : ?>
            color: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_title_hover_color); ?>;
        <?php endif; ?>
    }
    /* Image Thumb Styles */
    .rs-blog-layout-18-item .rs-thumb{
        <?php if (!empty($fancy_post_image_border_radius)) : ?>
            border-radius: <?php echo esc_attr($fancy_post_image_border_radius); ?>;
        <?php endif; ?>
    }
    /* Image Thumb Styles */
    /* Meta Data Styles */

    .rs-blog-layout-18-item .rs-content .rs-meta{
        <?php if (!empty($fpg_meta_order)) : ?>
            order: <?php echo esc_attr($fpg_meta_order); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_padding)) : ?>
            padding: <?php echo esc_attr($fpg_meta_padding); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_margin)) : ?>
            margin: <?php echo esc_attr($fpg_meta_margin); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18-item .rs-content .rs-meta ul{
        <?php if (!empty($fpg_meta_gap)) : ?>
            gap: <?php echo esc_attr($fpg_meta_gap); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-18-item .rs-content .rs-meta {          
        <?php if (!empty($fpg_primary_color) || !empty($fpg_meta_bgcolor)) : ?>
            background: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_meta_bgcolor); ?>;
        <?php endif; ?>  
    }
    .rs-blog-layout-18-item .rs-content .rs-meta ul li i{
        <?php if (!empty($fpg_meta_icon_color)) : ?>
            color: <?php echo esc_attr($fpg_meta_icon_color); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18-item .rs-content .rs-meta ul li a,
    .rs-blog-layout-18-item .rs-content .rs-meta ul li
    {
        <?php if (!empty($fpg_meta_color)) : ?>
            color: <?php echo esc_attr($fpg_meta_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_size)) : ?>
            font-size: <?php echo esc_attr($fpg_meta_size); ?>px;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_meta_font_weight); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_line_height)) : ?>
            line-height: <?php echo esc_attr($fpg_meta_line_height); ?>;
        <?php endif; ?>  
    }

    .rs-blog-layout-18-item .rs-content .rs-meta ul li a:hover,.rs-blog-layout-18-item .rs-content .rs-meta ul li:hover{       
        <?php if (!empty($fpg_meta_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_meta_hover_color); ?>;
        <?php endif; ?>
    }

    /* Button Styles */
    .rs-blog-layout-18-item .rs-content .blgo-btn-box a.rs-btn.<?php echo esc_attr($button_class); ?>{
        <?php if (!empty($fpg_button_background_color)) : ?>
            background-color: <?php echo esc_attr($fpg_button_background_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_text_color)) : ?>
            color: <?php echo esc_attr($fpg_button_text_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_button_font_size); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_button_font_weight); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_read_more_border_radius)) : ?>
            border-radius: <?php echo esc_attr($fancy_post_read_more_border_radius); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_border_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_button_border_style)) : ?>
            border-style: <?php echo esc_attr($fancy_button_border_style); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_button_border_width)) : ?>
            border-width: <?php echo esc_attr($fancy_post_button_border_width); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_padding)) : ?>
            padding: <?php echo esc_attr($fpg_button_padding); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_margin)) : ?>
            margin: <?php echo esc_attr($fpg_button_margin); ?>;
        <?php endif; ?>
        
    }

    .rs-blog-layout-18-item .rs-content .blgo-btn-box{
        <?php if (!empty($fpg_button_order)) : ?>
            order: <?php echo esc_attr($fpg_button_order); ?>;
        <?php endif; ?>

    }
    .rs-blog-layout-18-item .rs-content .blgo-btn-box a.rs-btn.<?php echo esc_attr($button_class); ?>:hover {
        <?php if (!empty($fpg_button_hover_background_color)) : ?>
            background-color: <?php echo esc_attr($fpg_button_hover_background_color); ?>;
        <?php endif; ?>
        
        <?php if (!empty($fpg_primary_color) || !empty($fpg_button_text_hover_color)) : ?>
            color: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_button_text_hover_color); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-18-item .rs-content .blgo-btn-box a.rs-btn.<?php echo esc_attr($button_class); ?>::before{
        <?php if (!empty($fpg_button_border_color)) : ?>
            background: <?php echo esc_attr($fpg_button_border_color); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18 .swiper_wrap .swiper-pagination-progressbar,
    .rs-blog-layout-18 .swiper_wrap .swiper-pagination .swiper-pagination-bullet{
        <?php if (!empty($fpg_slider_dots_color)) : ?>
            background: <?php echo esc_attr($fpg_slider_dots_color); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-18 .swiper_wrap .swiper-pagination-progressbar .swiper-pagination-progressbar-fill,
    .rs-blog-layout-18 .swiper_wrap .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active{
        
        <?php if (!empty($fpg_primary_color) || !empty($fpg_slider_dots_active_color)) : ?>
            background: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_slider_dots_active_color); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-18 .swiper_wrap .swiper-button-next,
    .rs-blog-layout-18 .swiper_wrap .swiper-button-prev{
        <?php if (!empty($fpg_primary_color) || !empty($fpg_arrow_bg_color)) : ?>
            background: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_arrow_bg_color); ?>;
        <?php endif; ?> 
    }

    .rs-blog-layout-18 .swiper_wrap .swiper-button-next:hover,
    .rs-blog-layout-18 .swiper_wrap .swiper-button-prev:hover{
        <?php if (!empty($fpg_arrow_bg_hover_color)) : ?>
            background: <?php echo esc_attr($fpg_arrow_bg_hover_color); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18 .swiper_wrap .swiper-button-next::after,
    .rs-blog-layout-18 .swiper_wrap .swiper-button-prev::after{
        <?php if (!empty($fpg_arrow_color)) : ?>
            color: <?php echo esc_attr($fpg_arrow_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_icon_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_icon_font_size); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18 .swiper_wrap .swiper-button-next:hover::after,
    .rs-blog-layout-18 .swiper_wrap .swiper-button-prev:hover::after{
        <?php if (!empty($fpg_arrow_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_arrow_hover_color); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18 .swiper_wrap .swiper-pagination-fraction{
        <?php if (!empty($fpg_fraction_total_color)) : ?>
            color: <?php echo esc_attr($fpg_fraction_total_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_fraction_total_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_fraction_total_font_size); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-18 .swiper_wrap .swiper-pagination-fraction .swiper-pagination-current{
        <?php if (!empty($fpg_primary_color) || !empty($fpg_fraction_current_color)) : ?>
           color: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_fraction_current_color); ?>;
        <?php endif; ?> 
        <?php if (!empty($fpg_fraction_current_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_fraction_current_font_size); ?>;
        <?php endif; ?>
    }
</style>
<?php
$slider5 = ob_get_clean();
?>