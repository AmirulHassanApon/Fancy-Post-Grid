<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
ob_start();
?>
<!-- ==== Blog Slider Layout 4 ==== -->
<section class="rs-blog-layout-4 grey" style="
    <?php if (!empty($fpg_section_background_color)) : ?>
        background-color: <?php echo esc_attr($fpg_section_background_color); ?>;
    <?php endif; ?>
    <?php if (!empty($fpg_section_margin)) : ?>
        margin: <?php echo esc_attr($fpg_section_margin); ?>;
    <?php endif; ?>
    <?php if (!empty($fpg_section_padding)) : ?>
        padding: <?php echo esc_attr($fpg_section_padding); ?>;
    <?php endif; ?>">

    <div class="container">
        <div class="row">
            <?php 
                $pagination_config = '';
                
                if ($fpg_pagination_slider === 'normal') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "clickable": true}';
                } elseif ($fpg_pagination_slider === 'dynamic') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "dynamicBullets": true, "clickable": true}';
                } elseif ($fpg_pagination_slider === 'progress') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "type": "progressbar"}';
                } elseif ($fpg_pagination_slider === 'fraction') {
                    $pagination_config = '"pagination": {"el": ".swiper-pagination", "type": "fraction"}';
                }

            ?>
            <div class="col-lg-12">
                <div class="swiper_wrap">
                    <div class="swiper rs-mySwiper" data-swiper='{
                        "spaceBetween":<?php echo esc_attr($fancy_spacebetween); ?>,
                        "slidesPerView":<?php echo esc_attr($fancy_post_cl_lg_slider); ?>,
                        "freeMode":<?php echo esc_attr($fancy_free_mode); ?>, 
                        "loop": <?php echo esc_attr($fancy_loop); ?>, 
                        <?php echo esc_attr($pagination_config); ?>,

                        "autoplay":{"delay":"<?php echo esc_attr($fancy_autoplay); ?>"},
                        "keyboard": {"enabled":"<?php echo esc_attr($fancy_keyboard); ?>"},                        
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
                                    'posts_per_page' => -1, // Number of posts to display
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
                                    $args['post__not_in'] = $selected_post_not_in;
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
                                <div class="rs-blog__item" style="
                                    <?php if (!empty($fpg_single_section_background_color)) : ?>
                                        background-color: <?php echo esc_attr($fpg_single_section_background_color); ?>;
                                    <?php endif; ?>
                                    <?php if (!empty($fpg_single_section_margin)) : ?>
                                        margin: <?php echo esc_attr($fpg_single_section_margin); ?>;
                                    <?php endif; ?>
                                    <?php if (!empty($fpg_single_section_padding)) : ?>
                                        padding: <?php echo esc_attr($fpg_single_section_padding); ?>;
                                    <?php endif; ?>">

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
                                                <img src="<?php echo esc_url( $feature_image_url ); ?>" alt="<?php echo esc_attr( $alt_text ); ?>">

                                            </a>
                                        <?php endif; ?>
                                        
                                        </div>
                                    <?php endif; ?>

                                    <div class="rs-content">
                                        <?php if ($fpg_field_group_categories) : ?>
                                        <div class="rs-category">
                                            <?php 
                                                $categories = get_the_category();
                                                if (!empty($categories)) {
                                                    foreach ($categories as $category) {
                                                        $hover_color = !empty($fpg_meta_hover_color) ? esc_attr($fpg_meta_hover_color) : '';
                                                        $default_color = !empty($fpg_meta_color) ? esc_attr($fpg_meta_color) : '';
                                                        $inline_style = '';
                                                        
                                                        // Add dynamic styles for color, font-size, and font-weight
                                                        if (!empty($fpg_meta_color)) {
                                                            $inline_style .= 'color: ' . esc_attr($fpg_meta_color) . ';';
                                                        }
                                                        if (!empty($fpg_meta_size)) {
                                                            $inline_style .= 'font-size: ' . esc_attr($fpg_meta_size) . 'px;';
                                                        }
                                                        if (!empty($fpg_meta_font_weight)) {
                                                            $inline_style .= 'font-weight: ' . esc_attr($fpg_meta_font_weight) . ';';
                                                        }
                                                        
                                                        
                                                        echo '<a href="' . esc_url(get_category_link($category->term_id)) . '" 
                                                            onmouseover="this.style.color=\'' . $hover_color . '\'" 
                                                            onmouseout="this.style.color=\'' . $default_color . '\'" 
                                                            style="' . $inline_style . '">' 
                                                            . esc_html($category->name) . 
                                                            '</a>';
                                                    }
                                                }
                                            ?>
                                        </div>  
                                        <?php endif; ?>

                                        <!-- Title -->
                                        <?php if ($fpg_field_group_title) : ?>
                                            <<?php echo esc_attr($title_tag); ?> class="title" style="
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
                                                <?php endif; ?>">

                                                <?php if ($fancy_link_details === 'on') : ?>
                                                    <a href="<?php the_permalink(); ?>"
                                                       <?php echo esc_attr($target_blank); ?>
                                                       class="title-link" style="
                                                       <?php if (!empty($fpg_title_color)) : ?>
                                                          color: <?php echo esc_attr($fpg_title_color); ?>;
                                                       <?php endif; ?>
                                                       <?php if (!empty($fpg_title_font_size)) : ?>
                                                          font-size: <?php echo esc_attr($fpg_title_font_size); ?>px;
                                                       <?php endif; ?>
                                                       <?php if (!empty($fpg_title_font_weight)) : ?>
                                                          font-weight: <?php echo esc_attr($fpg_title_font_weight); ?>;
                                                       <?php endif; ?>"
                                                       onmouseover="this.style.color='<?php echo esc_attr($fpg_title_hover_color); ?>';"
                                                       onmouseout="this.style.color='<?php echo esc_attr($fpg_title_color); ?>';">
                                                        <?php
                                                            if ($fancy_post_title_limit_type === 'words') {
                                                                echo esc_html(wp_trim_words(get_the_title(), $fancy_post_title_limit, $title_more_text));
                                                            } elseif ($fancy_post_title_limit_type === 'characters') {
                                                                echo esc_html(mb_strimwidth(get_the_title(), 0, $fancy_post_title_limit, $title_more_text));
                                                            }
                                                        ?>
                                                    </a>
                                                <?php else : ?>
                                                    <?php
                                                        if ($fancy_post_title_limit_type === 'words') {
                                                            echo esc_html(wp_trim_words(get_the_title(), $fancy_post_title_limit, $title_more_text));
                                                        } elseif ($fancy_post_title_limit_type === 'characters') {
                                                            echo esc_html(mb_strimwidth(get_the_title(), 0, $fancy_post_title_limit, $title_more_text));
                                                        }
                                                    ?>
                                                <?php endif; ?>
                                            </<?php echo esc_attr($title_tag); ?>>
                                        <?php endif; ?>
                                        
                                        <!-- Excerpt -->
                                        <?php if ($fpg_field_group_excerpt) : ?>
                                            <div class="desc <?php echo esc_attr($excerpt_alignment_class); ?> " style ="
                                                <?php if (!empty($fpg_excerpt_order)) : ?>
                                                    order: <?php echo esc_attr($fpg_excerpt_order); ?>;
                                                <?php endif; ?>
                                                <?php if (!empty($fpg_excerpt_padding)) : ?>
                                                    padding: <?php echo esc_attr($fpg_excerpt_padding); ?>;
                                                <?php endif; ?>
                                                <?php if (!empty($fpg_excerpt_margin)) : ?>
                                                    margin: <?php echo esc_attr($fpg_excerpt_margin); ?>;
                                                <?php endif; ?> ">

                                                <p style="<?php if (!empty($fpg_excerpt_color)) : ?>
                                                    color: <?php echo esc_attr($fpg_excerpt_color); ?>;
                                                <?php endif; ?>
                                                <?php if (!empty($fpg_excerpt_size)) : ?>
                                                    font-size: <?php echo esc_attr($fpg_excerpt_size); ?>px;
                                                <?php endif; ?>
                                                <?php if (!empty($fpg_excerpt_font_weight)) : ?>
                                                    font-weight: <?php echo esc_attr($fpg_excerpt_font_weight); ?>;
                                                <?php endif; ?>">
                                                <?php
                                                    $excerpt = get_the_content();

                                                    if ($fancy_post_excerpt_limit_type === 'words') {
                                                        echo esc_html(wp_trim_words($excerpt, $fancy_post_excerpt_limit, $excerpt_more_text));
                                                    } else {
                                                        // Strip tags to avoid breaking HTML, then apply character limit
                                                        $excerpt = wp_strip_all_tags($excerpt);
                                                        echo esc_html(mb_strimwidth($excerpt, 0, $fancy_post_excerpt_limit, $excerpt_more_text));
                                                    }
                                                ?>
                                                </p>
                                            </div>
                                        <?php endif; ?>

                                        <div class="rs-blog-footer">
                                            <?php if ($fpg_field_group_comment_count && get_comments_number() > 0) : ?>
                                            <span>
                                                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.97 8.83317L0 11.1665V0.833171C0 0.65636 0.0702379 0.48679 0.195262 0.361766C0.320286 0.236742 0.489856 0.166504 0.666667 0.166504H10.6667C10.8435 0.166504 11.013 0.236742 11.1381 0.361766C11.2631 0.48679 11.3333 0.65636 11.3333 0.833171V8.83317H2.97ZM2.50867 7.49984H10V1.49984H1.33333V8.42317L2.50867 7.49984ZM4.66667 10.1665H11.4913L12.6667 11.0898V4.1665H13.3333C13.5101 4.1665 13.6797 4.23674 13.8047 4.36177C13.9298 4.48679 14 4.65636 14 4.83317V13.8332L11.03 11.4998H5.33333C5.15652 11.4998 4.98695 11.4296 4.86193 11.3046C4.7369 11.1796 4.66667 11.01 4.66667 10.8332V10.1665Z" fill="#F79C53"></path>
                                                </svg>
                                                <?php echo esc_html(get_comments_number()); ?> Comments
                                            </span>
                                            <?php endif; ?>
                                            <!-- Display the custom excerpt here -->
                                            
                                            <!-- Button -->
                                            <?php if ($fpg_field_group_read_more) : ?>
                                                
                                                <div class="btn-wrapper <?php echo esc_attr($button_alignment_class); ?>" style="
                                                    <?php if (!empty($fpg_button_padding)) : ?>
                                                        padding: <?php echo esc_attr($fpg_button_padding); ?>;
                                                    <?php endif; ?>
                                                    <?php if (!empty($fpg_button_margin)) : ?>
                                                        margin: <?php echo esc_attr($fpg_button_margin); ?>;
                                                    <?php endif; ?>
                                                    <?php if (!empty($fpg_button_order)) : ?>
                                                        order: <?php echo esc_attr($fpg_button_order); ?>;
                                                    <?php endif; ?>">

                                                    <a class="rs-link read-more <?php echo esc_attr($button_class); ?>" 
                                                       href="<?php the_permalink(); ?>" 
                                                       <?php echo esc_attr($target_blank); ?> 
                                                       style="
                                                            <?php if (!empty($fpg_button_background_color)) : ?>
                                                                background-color: <?php echo esc_attr($fpg_button_background_color); ?>;
                                                            <?php endif; ?>
                                                            <?php if (!empty($fpg_button_text_color)) : ?>
                                                                color: <?php echo esc_attr($fpg_button_text_color); ?>;
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
                                                            <?php if (!empty($fancy_post_border_width)) : ?>
                                                                border-width: <?php echo esc_attr($fancy_post_border_width); ?>;
                                                            <?php endif; ?>"
                                                       onmouseover="this.style.color='<?php echo esc_attr($fpg_button_text_hover_color); ?>'; this.style.backgroundColor='<?php echo esc_attr($fpg_button_hover_background_color); ?>';"
                                                       onmouseout="this.style.color='<?php echo esc_attr($fpg_button_text_color); ?>'; this.style.backgroundColor='<?php echo esc_attr($fpg_button_background_color); ?>';">
                                                       
                                                        <?php echo esc_html($fancy_post_read_more_text); ?>
                                                        <i class="ri-arrow-right-line"></i>
                                                    </a>
                                                </div>
                                            <?php endif; ?>
                                            <!-- END Button -->  
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <?php
                            endwhile;
                            wp_reset_postdata(); // Reset post data
                            ?>

                        </div>
                    </div>
                    <div class="swiper-pagination swiper-pagination-4"></div>
                    <!-- Navigation buttons, if applicable -->
                    <?php if (in_array($fpg_pagination_slider, ['progress', 'fraction'])) : ?>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>


<?php
$slider4 = ob_get_clean();
?>
