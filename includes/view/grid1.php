<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
ob_start();

?>

<!-- Blog Grid 1 -->

<section class="rs-blog-layout-5">
    <div class="container">
        <div class="row">

        <?php
            // =======Pagination==========
            
            // Check if pagination is on or off
            if ($fancy_post_pagination === 'off') {
                $fpg_post_per_page = -1;
            }  

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

            // Loop through the custom query
            while ($query->have_posts()) : $query->the_post();

                $main_cl_lg = empty($fancy_post_cl_lg) ? 'col-lg-4' : 'col-lg-' . $fancy_post_cl_lg;
                $main_cl_md = empty($fancy_post_cl_md) ? 'col-md-4' : 'col-md-' . $fancy_post_cl_md;
                $main_cl_sm = empty($fancy_post_cl_sm) ? 'col-sm-6' : 'col-sm-' . $fancy_post_cl_sm;
                $main_cl_mobile = empty($fancy_post_cl_mobile) ? 'col-sm-12' : 'col-sm-' . $fancy_post_cl_mobile;

                // Check if the link should open in a new tab
                $target_blank = ($fancy_link_target === 'new') ? 'target="_blank"' : '';
                
                // Determine the title tag
                $title_tag = !empty($fancy_post_title_tag) ? $fancy_post_title_tag : 'h3';
                
                // Determine if the feature image should be hidden
                $hide_feature_image = isset($fancy_post_hide_feature_image) && $fancy_post_hide_feature_image === 'off';
                

                // Determine the feature image size
                $feature_image_size = isset($fancy_post_feature_image_size) ? (string) $fancy_post_feature_image_size : '';  

                           
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
            <div class="<?php echo esc_attr($main_cl_lg . ' ' .  $main_cl_md . ' ' . $main_cl_sm . ' ' . $main_cl_mobile); ?>">
                <div class="rs-blog__single mt-30 <?php echo esc_attr($main_alignment_class); ?> <?php echo esc_attr($hover_class); ?>">
                        <!-- Image -->
                        
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
                                        <img src="<?php echo esc_url($feature_image_url); ?>" alt="<?php echo $alt_text; ?>">
                                    </a>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                        
                    <div class="rs-content">
                        <ul class="meta-data-list <?php echo esc_attr($meta_alignment_class); ?>">
                            <?php if ($fpg_field_group_post_date) : ?>
                                <li class="meta-date">
                                    <?php if (empty($disabled_meta_icons['date_icon'])) {?>
                                    <i class="ri-calendar-2-line"></i>
                                    <?php } ?>
                                    <?php echo get_the_date('M d, Y'); ?>
                                </li>
                            <?php endif; ?>
                            <?php if ($fpg_field_group_author) : ?>
                                <li class="meta-author">
                                    <?php if (empty($disabled_meta_icons['author_icon'])) {?>
                                    <i class="ri-user-line"></i>
                                    <?php } ?>
                                    <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>"
                                        <?php echo esc_attr($target_blank); ?>>
                                        <?php the_author(); ?>
                                    </a> 
                                </li>
                            <?php endif; ?>
                            <?php if ($fpg_field_group_categories) : ?>
                                <li class="meta-categories">
                                    <?php if (empty($disabled_meta_icons['category_icon'])) {?>
                                    <i class="ri-folder-line"></i>
                                    <?php } ?>
                                    <?php the_category(', '); ?>
                                </li>
                            <?php endif; ?>
                            <?php if ($fpg_field_group_comment_count && get_comments_number() > 0) : ?>
                                <li class="meta-comment-count">
                                    <?php if (empty($disabled_meta_icons['comment_count_icon'])) {?>
                                    <i class="ri-chat-3-line"></i>
                                    <?php } ?>
                                    <?php comments_number('0 Comments', '1 Comment', '% Comments'); ?>
                                </li>
                            <?php endif; ?>
                            <?php if ($fpg_field_group_tag && has_tag()) : ?>
                                <li class="meta-tags">
                                    <?php if (empty($disabled_meta_icons['tags_icon'])) {?>
                                    <i class="ri-price-tag-3-line"></i>
                                    <?php } ?>
                                    <?php the_tags('', ', ', ''); ?>
                                </li>
                            <?php endif; ?>
                            
                        </ul>
                        <!-- Title -->
                        <?php if ($fpg_field_group_title) : ?>
                            <<?php echo esc_attr($title_tag); ?> class="title <?php echo esc_attr($title_alignment_class); ?>" >
                                <?php if ($fancy_link_details === 'on') : ?>
                                    <a href="<?php the_permalink(); ?>"
                                       <?php echo $target_blank; ?>
                                       class="title-link">
                                        <?php
                                        if ($fancy_post_title_limit_type === 'words') {
                                            echo wp_trim_words(get_the_title(), $fancy_post_title_limit, $title_more_text);
                                        } elseif ($fancy_post_title_limit_type === 'characters') {
                                            echo esc_html(mb_strimwidth(get_the_title(), 0, $fancy_post_title_limit, $title_more_text));
                                        }
                                        ?>
                                    </a>
                                <?php else : ?>
                                    <?php
                                    if ($fancy_post_title_limit_type === 'words') {
                                        echo wp_trim_words(get_the_title(), $fancy_post_title_limit, $title_more_text);
                                    } elseif ($fancy_post_title_limit_type === 'characters') {
                                        echo esc_html(mb_strimwidth(get_the_title(), 0, $fancy_post_title_limit, $title_more_text));
                                    }
                                    ?>
                                <?php endif; ?>
                            </<?php echo esc_attr($title_tag); ?>>
                        <?php endif; ?>

                        <!-- Excerpt -->
                        <?php if ($fpg_field_group_excerpt) : ?>
                            <div class="fpg-excerpt <?php echo esc_attr($excerpt_alignment_class); ?>">
                                <p>
                                <?php
                                $excerpt = get_the_content();

                                if ($fancy_post_excerpt_limit_type === 'words') {
                                    echo wp_trim_words($excerpt, $fancy_post_excerpt_limit, $excerpt_more_text);
                                } else {
                                    // Strip tags to avoid breaking HTML, then apply character limit
                                    $excerpt = wp_strip_all_tags($excerpt);
                                    echo esc_html(mb_strimwidth($excerpt, 0, $fancy_post_excerpt_limit, $excerpt_more_text));
                                }
                                ?>
                                </p>
                            </div>
                        <?php endif; ?>
                        
                        <!-- Display the custom button here -->
                        <?php if ($fpg_field_group_read_more) : ?>
                            
                            <div class="btn-wrapper <?php echo esc_attr($button_alignment_class); ?>">
                                <a class="rs-link read-more <?php echo esc_attr($button_class); ?>" href="<?php the_permalink(); ?>" <?php echo $target_blank; ?>>
                                    <?php echo esc_html($fancy_post_read_more_text); ?>
                                    <i class="ri-arrow-right-line"></i>
                                </a>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php
            endwhile;
            wp_reset_postdata(); // Reset the custom query to avoid conflicts
        ?>

        </div>
        <!-- Pagination -->
        <?php if ($fancy_post_pagination === 'on') : ?>
            <div class="fpg-pagination">
                <?php
                echo paginate_links(array(
                    'total'   => $query->max_num_pages,
                    'current' => max(1, get_query_var('paged')),
                    'format'  => '?paged=%#%',
                    'show_all' => false,
                    'type'     => 'list',
                    'prev_text' => __('« Prev', 'fancy-post-grid'),
                    'next_text' => __('Next »', 'fancy-post-grid'),
                ));
                ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<style type="text/css">
    /* General Styles */
    .rs-blog-layout-5 {
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
    .rs-blog-layout-5 .rs-blog__single {
        <?php if (!empty($fpg_single_section_background_color)) : ?>
            background-color: <?php echo esc_attr($fpg_single_section_background_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_single_section_margin)) : ?>
            margin: <?php echo esc_attr($fpg_single_section_margin); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_single_section_padding)) : ?>
            padding: <?php echo esc_attr($fpg_single_section_padding); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_section_border_radius)) : ?>
            border-radius: <?php echo esc_attr($fancy_post_section_border_radius); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-5 .rs-blog__single .rs-thumb{
        <?php if (!empty($fancy_post_image_border_radius)) : ?>
            border-radius: <?php echo esc_attr($fancy_post_image_border_radius); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-5 .rs-blog__single .rs-content {
        <?php if (!empty($fpg_single_section_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_single_section_border_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_border_style)) : ?>
            border-style: <?php echo esc_attr($fancy_post_border_style); ?>;
        <?php endif; ?>
        <?php if (!empty($fancy_post_border_width)) : ?>
            border-width: <?php echo esc_attr($fancy_post_border_width); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_single_content_section_padding)) : ?>
            padding: <?php echo esc_attr($fpg_single_content_section_padding); ?>;
        <?php endif; ?>
    }

    /* Title Styles */
    .rs-blog-layout-5 .rs-blog__single .rs-content .title {
        
        <?php if (!empty($fpg_title_order)) : ?>
            order: <?php echo esc_attr($fpg_title_order); ?>;
        <?php endif; ?>
        
        <?php if (!empty($fpg_title_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_title_border_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_border_style)) : ?>
            border-style: <?php echo esc_attr($fpg_title_border_style); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_border_width)) : ?>
            border-width: <?php echo esc_attr($fpg_title_border_width); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_title_line_height)) : ?>
            line-height: <?php echo esc_attr($fpg_title_line_height); ?>;
        <?php endif; ?>
    }

    /* Title Styles */
    .rs-blog-layout-5 .rs-blog__single .rs-content .title a {
    	padding: <?php echo esc_attr($fpg_title_padding); ?>;
        margin: <?php echo esc_attr($fpg_title_margin); ?>;
        <?php if (!empty($fpg_primary_color) || !empty($fpg_title_color)) : ?>
            color: <?php echo esc_attr(!empty($fpg_primary_color) ? $fpg_primary_color : $fpg_title_color); ?>;
        <?php endif; ?>

        <?php if (!empty($fpg_title_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_title_font_size); ?>px;
        <?php endif; ?>
        <?php if (!empty($fpg_title_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_title_font_weight); ?>;
        <?php endif; ?>
        
    }

    .rs-blog-layout-5 .rs-blog__single .rs-content .title a:hover {
        <?php if (!empty($fpg_title_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_title_hover_color); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-5 .title-link {
        <?php if (!empty($fpg_title_color)) : ?>
            color: <?php echo esc_attr($fpg_title_color); ?>;
        <?php endif; ?>
    }

    .rs-blog-layout-5 .title-link:hover {
        <?php if (!empty($fpg_title_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_title_hover_color); ?>;
        <?php endif; ?>
    }

    /* Excerpt Styles */
    .rs-blog-layout-5 .fpg-excerpt {
        <?php if (!empty($fpg_excerpt_color)) : ?>
            color: <?php echo esc_attr($fpg_excerpt_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_excerpt_size)) : ?>
            font-size: <?php echo esc_attr($fpg_excerpt_size); ?>px;
        <?php endif; ?>
        <?php if (!empty($fpg_excerpt_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_excerpt_font_weight); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_excerpt_line_height)) : ?>
            line-height: <?php echo esc_attr($fpg_excerpt_line_height); ?>;
        <?php endif; ?>
        
        
    }
    .rs-blog-layout-5 .rs-blog__single .rs-content .fpg-excerpt{
        <?php if (!empty($fpg_excerpt_order)) : ?>
            order: <?php echo esc_attr($fpg_excerpt_order); ?>;
        <?php endif; ?>

    }
    .rs-blog-layout-5 .rs-blog__single .rs-content .fpg-excerpt p{
        
        <?php if (!empty($fpg_excerpt_padding)) : ?>
            padding: <?php echo esc_attr($fpg_excerpt_padding); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_excerpt_margin)) : ?>
            margin: <?php echo esc_attr($fpg_excerpt_margin); ?>;
        <?php endif; ?>

    }

    .rs-blog-layout-5 .rs-blog__single .rs-content .btn-wrapper{
        <?php if (!empty($fpg_button_padding)) : ?>
            padding: <?php echo esc_attr($fpg_button_padding); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_margin)) : ?>
            margin: <?php echo esc_attr($fpg_button_margin); ?>;
        <?php endif; ?>
    }


    /* Meta Data Styles */

    .rs-blog-layout-5 .rs-blog__single .rs-content ul{
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

    .rs-blog-layout-5 .rs-blog__single .rs-content ul{
        <?php if (!empty($fpg_meta_gap)) : ?>
            gap: <?php echo esc_attr($fpg_meta_gap); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_line_height)) : ?>
            line-height: <?php echo esc_attr($fpg_meta_line_height); ?>;
        <?php endif; ?>
        
    }

    .rs-blog-layout-5 .rs-blog__single .rs-content ul li,
    .rs-blog-layout-5 .rs-blog__single .rs-content ul li a,
    .rs-blog-layout-5 .meta-data-list .meta-date i,
    .rs-blog-layout-5 .meta-data-list .meta-author i,
    .rs-blog-layout-5 .meta-data-list .meta-categories i,
    .rs-blog-layout-5 .meta-data-list .meta-comment-count i,
    .rs-blog-layout-5 .meta-data-list .meta-tags i
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
        
        
    }

    .rs-blog-layout-5 .rs-blog__single .rs-content ul li i{
        <?php if (!empty($fpg_meta_icon_color)) : ?>
            color: <?php echo esc_attr($fpg_meta_icon_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_size)) : ?>
            font-size: <?php echo esc_attr($fpg_meta_size); ?>px;
        <?php endif; ?>
        <?php if (!empty($fpg_meta_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_meta_font_weight); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-5 .rs-blog__single .rs-content ul li a:hover{
        
        <?php if (!empty($fpg_meta_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_meta_hover_color); ?>;
        <?php endif; ?>
    }

    /* Button Styles */
    .rs-blog-layout-5 .rs-blog__single .rs-content .rs-link.<?php echo esc_attr($button_class); ?>{
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
        <?php endif; ?>
        <?php if (!empty($fpg_button_font_size)) : ?>
            font-size: <?php echo esc_attr($fpg_button_font_size); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_font_weight)) : ?>
            font-weight: <?php echo esc_attr($fpg_button_font_weight); ?>;
        <?php endif; ?>

    }

    .rs-blog-layout-5 .rs-blog__single .rs-content .btn-wrapper{
        <?php if (!empty($fpg_button_order)) : ?>
            order: <?php echo esc_attr($fpg_button_order); ?>;
        <?php endif; ?>

    }
    .rs-blog-layout-5 .rs-blog__single .rs-content .rs-link.<?php echo esc_attr($button_class); ?>:hover {
        <?php if (!empty($fpg_button_hover_background_color)) : ?>
            background-color: <?php echo esc_attr($fpg_button_hover_background_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_button_text_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_button_text_hover_color); ?>;
        <?php endif; ?>
    }
    .rs-blog-layout-5 .rs-blog__single .rs-content .rs-link.<?php echo esc_attr($button_class); ?>::before{
        <?php if (!empty($fpg_button_border_color)) : ?>
            background: <?php echo esc_attr($fpg_button_border_color); ?>;
        <?php endif; ?>
    }

    /*Pagination*/
    .fpg-pagination ul.page-numbers{
        <?php if (!empty($fpg_pagination_gap)) : ?>
            gap: <?php echo esc_attr($fpg_pagination_gap); ?>;
        <?php endif; ?> 
    }
    .fpg-pagination ul.page-numbers li .page-numbers {

        <?php if (!empty($fpg_pagination_background)) : ?>
            background-color: <?php echo esc_attr($fpg_pagination_background); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_color)) : ?>
            color: <?php echo esc_attr($fpg_pagination_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_pagination_border_color); ?>;
        <?php endif; ?>
        

        <?php if (!empty($fpg_pagination_border_width)) : ?>
            border-width: <?php echo esc_attr($fpg_pagination_border_width); ?>;
        <?php endif; ?>

        <?php if (!empty($fpg_pagination_border_style)) : ?>
            border-style: <?php echo esc_attr($fpg_pagination_border_style); ?>;
        <?php endif; ?>

        <?php if (!empty($fpg_pagination_border_radius)) : ?>
            border-radius: <?php echo esc_attr($fpg_pagination_border_radius); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_height)) : ?>
            height: <?php echo esc_attr($fpg_pagination_height); ?>;
        <?php endif; ?>

        <?php if (!empty($fpg_pagination_width)) : ?>
            width: <?php echo esc_attr($fpg_pagination_width); ?>;
        <?php endif; ?>

        <?php if (!empty($fpg_pagination_padding)) : ?>
            padding: <?php echo esc_attr($fpg_pagination_padding); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_margin)) : ?>
            margin: <?php echo esc_attr($fpg_pagination_margin); ?>;
        <?php endif; ?> 
    }
    .fpg-pagination ul.page-numbers li .page-numbers:hover{
        <?php if (!empty($fpg_pagination_hover_background)) : ?>
            background-color: <?php echo esc_attr($fpg_pagination_hover_background); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_hover_color)) : ?>
            color: <?php echo esc_attr($fpg_pagination_hover_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_hover_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_pagination_hover_border_color); ?>;
        <?php endif; ?>
    }
    .fpg-pagination ul.page-numbers li .page-numbers.current{
        <?php if (!empty($fpg_pagination_active_background)) : ?>
            background-color: <?php echo esc_attr($fpg_pagination_active_background); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_active_color)) : ?>
            color: <?php echo esc_attr($fpg_pagination_active_color); ?>;
        <?php endif; ?>
        <?php if (!empty($fpg_pagination_active_border_color)) : ?>
            border-color: <?php echo esc_attr($fpg_pagination_active_border_color); ?>;
        <?php endif; ?>
    }
</style>


<!-- End Blog Grid Layout 1 -->
<?php
$grid1 = ob_get_clean();
?>