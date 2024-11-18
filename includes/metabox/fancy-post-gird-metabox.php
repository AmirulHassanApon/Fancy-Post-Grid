<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly


add_action( 'add_meta_boxes', 'fancy_post_grid_custom_settings_shortcode_metabox' );
function fancy_post_grid_custom_settings_shortcode_metabox() {
    add_meta_box(
        'fpg_metabox_shortcode',
        esc_html__( 'Shortcode Generator', 'fancy-post-grid' ),
        'fancy_post_grid_metabox_shortcode_callback',
        'fancy-post-grid-fpg', // Replace 'fancy-post-grid-fpg' with your custom post type slug
        'normal',
        'high'
    );
}


/**
 * Callback function for metabox content.
 */
function fancy_post_grid_metabox_shortcode_callback( $post ) {
    // Add nonce for security verification
    wp_nonce_field( 'fpg_metabox_nonce', 'fpg_metabox_nonce' );

    // Retrieve existing metabox fields
    // tab-1
    $fancy_post_type                            = get_post_meta( $post->ID, 'fancy_post_type', true );
    $fpg_include_only                           = get_post_meta( $post->ID, 'fpg_include_only', true );
    $fpg_exclude                                = get_post_meta( $post->ID, 'fpg_exclude', true );
    $fpg_limit                                  = get_post_meta( $post->ID, 'fpg_limit', true );

    if ( empty( $fpg_limit ) ) {
        $fpg_limit = '5'; 
    }
    $fpg_filter_categories                      = get_post_meta( $post->ID, 'fpg_filter_categories', true );
    $fpg_filter_tags                            = get_post_meta( $post->ID, 'fpg_filter_tags', true );
    $fpg_field_group_taxonomy                   = get_post_meta( $post->ID, 'fpg_field_group_taxonomy', true );
    $fpg_filter_category_terms                  = get_post_meta( $post->ID, 'fpg_filter_category_terms', true );
    $fpg_filter_tags_terms                      = get_post_meta( $post->ID, 'fpg_filter_tags_terms', true );
    $fpg_category_operator                      = get_post_meta( $post->ID, 'fpg_category_operator', true );
    $fpg_tags_operator                          = get_post_meta( $post->ID, 'fpg_tags_operator', true );
    $fpg_relation                               = get_post_meta( $post->ID, 'fpg_relation', true );
    $fpg_order_by                               = get_post_meta( $post->ID, 'fpg_order_by', true );
    $fpg_order                                  = get_post_meta( $post->ID, 'fpg_order', true );
    $fpg_filter_authors                         = get_post_meta( $post->ID, 'fpg_filter_authors', true );
    $fpg_filter_statuses                        = get_post_meta( $post->ID, 'fpg_filter_statuses', true );
    
    $fpg_meta_order                           = get_post_meta( $post->ID, 'fpg_meta_order', true );
    $fpg_title_order                          = get_post_meta( $post->ID, 'fpg_title_order', true );
    $fpg_button_order                         = get_post_meta( $post->ID, 'fpg_button_order', true );
    $fpg_excerpt_order                        = get_post_meta( $post->ID, 'fpg_excerpt_order', true );
    
    // tab-3
    $fpg_layout_select                          = get_post_meta( $post->ID, 'fpg_layout_select', true );
    if ( empty( $fpg_layout_select ) ) {
        $fpg_layout_select = 'grid'; // Set default to 'grid'
    }
    $fancy_post_grid_style                      = get_post_meta( $post->ID, 'fancy_post_grid_style', true );
    if ( empty( $fancy_post_grid_style ) ) {
        $fancy_post_grid_style = 'style1'; // Set default to 'style1'
    }
    $fancy_slider_style                         = get_post_meta( $post->ID, 'fancy_slider_style', true );
    if ( empty( $fancy_slider_style ) ) {
        $fancy_slider_style = 'sliderstyle1'; // Set default to 'sliderstyle1'
    }

    $fancy_list_style                         = get_post_meta( $post->ID, 'fancy_list_style', true );
    if ( empty( $fancy_list_style ) ) {
        $fancy_list_style = 'liststyle1'; // Set default to 'style1'
    }
    $fancy_isotope_style                         = get_post_meta( $post->ID, 'fancy_isotope_style', true );
    if ( empty( $fancy_isotope_style ) ) {
        $fancy_isotope_style= 'isotopestyle1'; // Set default to 'style1'
    }
    
    $fancy_post_pagination                      = get_post_meta( $post->ID, 'fancy_post_pagination', true );
    $fpg_post_per_page                          = get_post_meta( $post->ID, 'fpg_post_per_page', true );

    // Column
    $fancy_post_cl_lg                           = get_post_meta( $post->ID, 'fancy_post_cl_lg', true );
    if ( empty( $fancy_post_cl_lg ) ) {
        $fancy_post_cl_lg = '4'; 
    }

    $fancy_post_cl_md                           = get_post_meta( $post->ID, 'fancy_post_cl_md', true );
    if ( empty( $fancy_post_cl_md ) ) {
        $fancy_post_cl_md = '4'; 
    }

    $fancy_post_cl_sm                           = get_post_meta( $post->ID, 'fancy_post_cl_sm', true );
    if ( empty( $fancy_post_cl_sm ) ) {
        $fancy_post_cl_sm = '6'; 
    }

    $fancy_post_cl_mobile                       = get_post_meta( $post->ID, 'fancy_post_cl_mobile', true );
    if ( empty( $fancy_post_cl_mobile ) ) {
        $fancy_post_cl_mobile = '12'; 
    }

    $fancy_post_cl_lg_slider                           = get_post_meta( $post->ID, 'fancy_post_cl_lg_slider', true );
    if ( empty( $fancy_post_cl_lg_slider ) ) {
        $fancy_post_cl_lg_slider = '3'; 
    }

    $fancy_post_cl_md_silder                           = get_post_meta( $post->ID, 'fancy_post_cl_md_silder', true );
    if ( empty( $fancy_post_cl_md_silder ) ) {
        $fancy_post_cl_md_silder = '3'; 
    }

    $fancy_post_cl_sm_slider                           = get_post_meta( $post->ID, 'fancy_post_cl_sm_slider', true );
    if ( empty( $fancy_post_cl_sm_slider ) ) {
        $fancy_post_cl_sm_slider = '2'; 
    }

    $fancy_post_cl_mobile_slider                       = get_post_meta( $post->ID, 'fancy_post_cl_mobile_slider', true );
    if ( empty( $fancy_post_cl_mobile_slider ) ) {
        $fancy_post_cl_mobile_slider = '1'; 
    }

    $fancy_link_details                         = get_post_meta( $post->ID, 'fancy_link_details', true );
    if ( empty( $fancy_link_details ) ) {
        $fancy_link_details = 'on'; 
    }
    $fancy_link_target                          = get_post_meta( $post->ID, 'fancy_link_target', true );
    if ( empty( $fancy_link_target ) ) {
        $fancy_link_target = 'same'; 
    }

    $fancy_keyboard                          = get_post_meta( $post->ID, 'fancy_keyboard', true );
    if ( empty( $fancy_keyboard ) ) {
        $fancy_keyboard = 'false'; 
    }

    $fancy_arrow = get_post_meta( $post->ID, 'fancy_arrow', true );
    if ( empty( $fancy_arrow ) ) {
        $fancy_arrow = 'false';
    }

    $fancy_pagination = get_post_meta( $post->ID, 'fancy_pagination', true );
    if ( empty( $fancy_pagination ) ) {
        $fancy_pagination = 'true';
    }

    $fancy_loop                          = get_post_meta( $post->ID, 'fancy_loop', true );
    if ( empty( $fancy_loop ) ) {
        $fancy_loop = 'true'; 
    }

    $fancy_free_mode                          = get_post_meta( $post->ID, 'fancy_free_mode', true );
    if ( empty( $fancy_free_mode ) ) {
        $fancy_free_mode = 'false'; 
    }
    $fancy_pagination_clickable                          = get_post_meta( $post->ID, 'fancy_pagination_clickable', true );
    if ( empty( $fancy_pagination_clickable ) ) {
        $fancy_pagination_clickable = 'false'; 
    }
    $fancy_autoplay                          = get_post_meta( $post->ID, 'fancy_autoplay', true );
    if ( empty( $fancy_autoplay ) ) {
        $fancy_autoplay = '3000'; 
    }
    $fancy_spacebetween                          = get_post_meta( $post->ID, 'fancy_spacebetween', true );
    if ( empty( $fancy_spacebetween ) ) {
        $fancy_spacebetween = '30'; 
    }

    $fpg_pagination_slider                          = get_post_meta( $post->ID, 'fpg_pagination_slider', true );
    if ( empty( $fpg_pagination_slider ) ) {
        $fpg_pagination_slider = 'normal'; 
    }


    // tab-3-Advanced-Settings
    
    $fancy_post_title_tag                       = get_post_meta( $post->ID, 'fancy_post_title_tag', true );    
    if ( empty( $fancy_post_title_tag ) ) {
        $fancy_post_title_tag = 'h3'; 
    }

    $fancy_post_title_limit                       = get_post_meta( $post->ID, 'fancy_post_title_limit', true );  
    if ( empty( $fancy_post_title_limit ) ) {
        $fancy_post_title_limit = '7'; 
    }

    $fancy_post_title_limit_type               = get_post_meta( $post->ID, 'fancy_post_title_limit_type', true );
    if ( empty( $fancy_post_title_limit_type ) ) {
        $fancy_post_title_limit_type = 'words'; 
    }

    $fancy_post_title_more_text                       = get_post_meta( $post->ID, 'fancy_post_title_more_text', true ); 
    
    //Feature-image
    $fancy_post_hide_feature_image              = get_post_meta( $post->ID, 'fancy_post_hide_feature_image', true );
    if ( empty( $fancy_post_hide_feature_image ) ) {
        $fancy_post_hide_feature_image = 'on'; // image
    }
    $fancy_post_feature_image_size              = get_post_meta( $post->ID, 'fancy_post_feature_image_size', true );

    if ( empty( $fancy_post_feature_image_size ) ) {
        $fancy_post_feature_image_size ="full";
    }

    $fancy_post_feature_image_left = get_post_meta( $post->ID, 'fancy_post_feature_image_left', true );

    if ( empty( $fancy_post_feature_image_left ) ) {
        $fancy_post_feature_image_left ="full";
    }
    $fancy_post_feature_image_right = get_post_meta( $post->ID, 'fancy_post_feature_image_right', true );

    if ( empty( $fancy_post_feature_image_right ) ) {
        $fancy_post_feature_image_right ="full";
    }
    $fancy_post_media_source                    = get_post_meta( $post->ID, 'fancy_post_media_source', true );
    if ( empty( $fancy_post_media_source ) ) {
        $fancy_post_media_source ="feature_image";
    }

    $fancy_post_hover_animation                 = get_post_meta( $post->ID, 'fancy_post_hover_animation', true );

    $fancy_post_excerpt_more_text               = get_post_meta( $post->ID, 'fancy_post_excerpt_more_text', true );
    
    $fancy_post_excerpt_limit_type               = get_post_meta( $post->ID, 'fancy_post_excerpt_limit_type', true );
    if ( empty( $fancy_post_excerpt_limit_type ) ) {
        $fancy_post_excerpt_limit_type = 'words'; 
    }
    $fancy_post_excerpt_limit                   = get_post_meta( $post->ID, 'fancy_post_excerpt_limit', true );
    if ( empty( $fancy_post_excerpt_limit ) ) {
        $fancy_post_excerpt_limit = '10'; 
    }

    // Button
    $fancy_button_option                        = get_post_meta( $post->ID, 'fancy_button_option', true );
    if ( empty( $fancy_button_option ) ) {
        $fancy_button_option = 'filled'; 
    }
    $fancy_button_border_style                  = get_post_meta( $post->ID, 'fancy_button_border_style', true );
    if ( empty( $fancy_button_border_style ) ) {
        $fancy_button_border_style = 'unset'; 
    }

    $fancy_post_read_more_border_radius         = get_post_meta( $post->ID, 'fancy_post_read_more_border_radius', true );
    
    $fancy_post_button_border_width                    = get_post_meta( $post->ID, 'fancy_post_button_border_width', true );
    $fpg_border_color                    = get_post_meta( $post->ID, 'fpg_border_color', true );
    
    $fancy_post_read_more_alignment             = get_post_meta( $post->ID, 'fancy_post_read_more_alignment', true );
    if ( empty( $fancy_post_read_more_alignment ) ) {
        $fancy_post_read_more_alignment = 'default'; 
    }

    $fancy_post_main_box_alignment = get_post_meta($post->ID, 'fancy_post_main_box_alignment', true);
    if (empty($fancy_post_main_box_alignment)) {
        $fancy_post_main_box_alignment = 'align-start';
    }

    $fancy_post_title_alignment = get_post_meta($post->ID, 'fancy_post_title_alignment', true);
    if (empty($fancy_post_title_alignment)) {
        $fancy_post_title_alignment = 'default';
    }

    $fancy_post_meta_alignment = get_post_meta($post->ID, 'fancy_post_meta_alignment', true);
    if (empty($fancy_post_meta_alignment)) {
        $fancy_post_meta_alignment = 'default';
    }

    $fancy_post_excerpt_alignment = get_post_meta($post->ID, 'fancy_post_excerpt_alignment', true);
    if (empty($fancy_post_excerpt_alignment)) {
        $fancy_post_excerpt_alignment = 'default';
    }

    $fancy_post_read_more_text                  = get_post_meta( $post->ID, 'fancy_post_read_more_text', true );
    if ( empty( $fancy_post_read_more_text ) ) {
        $fancy_post_read_more_text = 'Read More'; 
    }
    
    //Field Selector
    
    $fpg_field_group_title                      = get_post_meta( $post->ID, 'fpg_field_group_title', true, ); 
    $fpg_field_group_excerpt                    = get_post_meta( $post->ID, 'fpg_field_group_excerpt', true );
    $fpg_field_group_read_more                  = get_post_meta( $post->ID, 'fpg_field_group_read_more', true );
    $fpg_field_group_image                      = get_post_meta( $post->ID, 'fpg_field_group_image', true );
    $fpg_field_group_post_date                  = get_post_meta( $post->ID, 'fpg_field_group_post_date', true );
    $fpg_field_group_author                     = get_post_meta( $post->ID, 'fpg_field_group_author', true );
    $fpg_field_group_categories                 = get_post_meta( $post->ID, 'fpg_field_group_categories', true );
    $fpg_field_group_tag                        = get_post_meta( $post->ID, 'fpg_field_group_tag', true );
    $fpg_field_group_comment_count              = get_post_meta( $post->ID, 'fpg_field_group_comment_count', true );
    

    $fpg_field_group_title = ( $fpg_field_group_title === '' ) ? '1' : $fpg_field_group_title;
    $fpg_field_group_excerpt = ( $fpg_field_group_excerpt === '' ) ? '1' : $fpg_field_group_excerpt;
    $fpg_field_group_read_more = ( $fpg_field_group_read_more === '' ) ? '1' : $fpg_field_group_read_more;
    $fpg_field_group_image = ( $fpg_field_group_image === '' ) ? '1' : $fpg_field_group_image;
    $fpg_field_group_post_date = ( $fpg_field_group_post_date === '' ) ? '1' : $fpg_field_group_post_date;
    $fpg_field_group_author = ( $fpg_field_group_author === '' ) ? '1' : $fpg_field_group_author;
    $fpg_field_group_categories = ( $fpg_field_group_categories === '' ) ? '1' : $fpg_field_group_categories;
    $fpg_field_group_tag = ( $fpg_field_group_tag === '' ) ? '1' : $fpg_field_group_tag;
    $fpg_field_group_comment_count = ( $fpg_field_group_comment_count === '' ) ? '1' : $fpg_field_group_comment_count;
    // tab-5 Title Settings
    
    //Button
    $fpg_button_background_color                = get_post_meta( $post->ID,'fpg_button_background_color', true);
    $fpg_single_section_background_hover_color                = get_post_meta( $post->ID,'fpg_single_section_background_hover_color', true); 
    $fpg_button_hover_background_color          = get_post_meta( $post->ID,'fpg_button_hover_background_color', true); 
    $fpg_button_text_color                      = get_post_meta( $post->ID,'fpg_button_text_color', true ); 
    $fpg_button_text_hover_color                = get_post_meta( $post->ID,'fpg_button_text_hover_color', true ); 
    $fpg_button_border_color                    = get_post_meta( $post->ID,'fpg_button_border_color', true ); 

    $fancy_post_filter_alignment = get_post_meta($post->ID, 'fancy_post_filter_alignment', true);
    $fancy_post_filter_text_color = get_post_meta($post->ID, 'fancy_post_filter_text_color', true);
    $fancy_post_filter_bg_color = get_post_meta($post->ID, 'fancy_post_filter_bg_color', true);
    $fancy_post_filter_active_color = get_post_meta($post->ID, 'fancy_post_filter_active_color', true);
    $fancy_post_filter_active_hover_color = get_post_meta($post->ID, 'fancy_post_filter_active_hover_color', true);
    $fancy_post_filter_hover_color = get_post_meta($post->ID, 'fancy_post_filter_hover_color', true);
    $fancy_post_filter_hover_bg_color = get_post_meta($post->ID, 'fancy_post_filter_hover_bg_color', true);
    $fancy_post_filter_text = get_post_meta($post->ID, 'fancy_post_filter_text', true);
    if ( empty( $fancy_post_filter_text ) ) {
        $fancy_post_filter_text = 'Show All'; 
    }
    $fancy_post_filter_padding = get_post_meta($post->ID, 'fancy_post_filter_padding', true);
    $fancy_post_filter_margin = get_post_meta($post->ID, 'fancy_post_filter_margin', true);
    $fancy_post_filter_font_size = get_post_meta($post->ID, 'fancy_post_filter_font_size', true);

    //full Section
    $fpg_section_background_color               = get_post_meta( $post->ID, 'fpg_section_background_color', true );
    $fpg_section_margin                         = get_post_meta( $post->ID, 'fpg_section_margin', true );
    $fpg_section_padding                        = get_post_meta( $post->ID, 'fpg_section_padding', true );

    //Padding & Margin
    $fpg_button_margin                = get_post_meta( $post->ID,'fpg_button_margin', true); 
    $fpg_button_padding          = get_post_meta( $post->ID,'fpg_button_padding', true); 
    $fpg_title_margin                      = get_post_meta( $post->ID,'fpg_title_margin', true ); 
    $fpg_title_padding                = get_post_meta( $post->ID,'fpg_title_padding', true ); 
    $fpg_excerpt_margin                    = get_post_meta( $post->ID,'fpg_excerpt_margin', true ); 
    $fpg_excerpt_padding               = get_post_meta( $post->ID, 'fpg_excerpt_padding', true );
    $fpg_meta_margin                         = get_post_meta( $post->ID, 'fpg_meta_margin', true );
    $fpg_meta_padding                        = get_post_meta( $post->ID, 'fpg_meta_padding', true );

    $fpg_title_border_color = get_post_meta( $post->ID, 'fpg_title_border_color', true );
    $fpg_title_border_width = get_post_meta( $post->ID, 'fpg_title_border_width', true );
    $fpg_title_border_style = get_post_meta( $post->ID, 'fpg_title_border_style', true );
    $fancy_post_section_border_radius = get_post_meta( $post->ID, 'fancy_post_section_border_radius', true );
    $fancy_post_image_border_radius = get_post_meta( $post->ID, 'fancy_post_image_border_radius', true );

    //Single Section
    $fpg_single_section_background_color               = get_post_meta( $post->ID, 'fpg_single_section_background_color', true );
    $fpg_single_section_margin                         = get_post_meta( $post->ID, 'fpg_single_section_margin', true );
    $fpg_single_section_padding                        = get_post_meta( $post->ID, 'fpg_single_section_padding', true );
    $fpg_single_content_section_padding                        = get_post_meta( $post->ID, 'fpg_single_content_section_padding', true );
    $fpg_single_section_border_color                        = get_post_meta( $post->ID, 'fpg_single_section_border_color', true );
    $fancy_post_border_style                        = get_post_meta( $post->ID, 'fancy_post_border_style', true );
    $fancy_post_border_width                        = get_post_meta( $post->ID, 'fancy_post_border_width', true );
    // Title
    $fpg_title_color                            = get_post_meta( $post->ID,'fpg_title_color', true); 
    $fpg_title_font_size                        = get_post_meta( $post->ID,'fpg_title_font_size', true); 
    
    $fpg_title_font_weight                      = get_post_meta( $post->ID,'fpg_title_font_weight', true ); 
    if ( empty( $fpg_title_font_weight ) ) {
        $fpg_title_font_weight = '700'; 
    }
     
    $fpg_category_color = get_post_meta( $post->ID, 'fpg_category_color', true );
    $fpg_single_image_shape_color = get_post_meta( $post->ID, 'fpg_single_image_shape_color', true );
    $fpg_category_bg_color = get_post_meta( $post->ID, 'fpg_category_bg_color', true );
    $fpg_category_padding = get_post_meta( $post->ID, 'fpg_category_padding', true );
    $fpg_title_line_height = get_post_meta( $post->ID, 'fpg_title_line_height', true );
    $fpg_meta_line_height = get_post_meta( $post->ID, 'fpg_meta_line_height', true );
    $fpg_excerpt_line_height = get_post_meta( $post->ID, 'fpg_excerpt_line_height', true );

    //Title Hover
    $fpg_title_hover_color                      = get_post_meta( $post->ID,'fpg_title_hover_color', true); 
    
    

    //Excerpt
    $fpg_excerpt_color                          = get_post_meta( $post->ID,'fpg_excerpt_color', true); // Default to black if not set
    $fpg_excerpt_size                           = get_post_meta( $post->ID,'fpg_excerpt_size', true); 
    
    $fpg_excerpt_font_weight                    = get_post_meta( $post->ID,'fpg_excerpt_font_weight', true ); 
    if ( empty( $fpg_excerpt_font_weight ) ) {
        $fpg_excerpt_font_weight = '400'; 
    }
    $fpg_button_font_size                    = get_post_meta( $post->ID,'fpg_button_font_size', true ); 
    $fpg_button_font_weight                    = get_post_meta( $post->ID,'fpg_button_font_weight', true ); 
    if ( empty( $fpg_button_font_weight ) ) {
        $fpg_button_font_weight = '400'; 
    }
    

    // Pagination Style
    $fpg_pagination_color               = get_post_meta( $post->ID, 'fpg_pagination_color', true );
    $fpg_pagination_background          = get_post_meta( $post->ID, 'fpg_pagination_background', true );
    $fpg_pagination_border_color        = get_post_meta( $post->ID, 'fpg_pagination_border_color', true );
    $fpg_pagination_border_style        = get_post_meta( $post->ID, 'fpg_pagination_border_style', true );
    $fpg_pagination_border_radius       = get_post_meta( $post->ID, 'fpg_pagination_border_radius', true );
    $fpg_pagination_padding             = get_post_meta( $post->ID, 'fpg_pagination_padding', true );
    $fpg_pagination_margin              = get_post_meta( $post->ID, 'fpg_pagination_margin', true );
    $fpg_pagination_gap                 = get_post_meta( $post->ID, 'fpg_pagination_gap', true );
    $fpg_pagination_hover_color         = get_post_meta( $post->ID, 'fpg_pagination_hover_color', true );
    $fpg_pagination_hover_background    = get_post_meta( $post->ID, 'fpg_pagination_hover_background', true );
    $fpg_pagination_hover_border_color  = get_post_meta( $post->ID, 'fpg_pagination_hover_border_color', true );
    $fpg_pagination_active_color        = get_post_meta( $post->ID, 'fpg_pagination_active_color', true );
    $fpg_pagination_active_background   = get_post_meta( $post->ID, 'fpg_pagination_active_background', true );
    $fpg_pagination_active_border_color = get_post_meta( $post->ID, 'fpg_pagination_active_border_color', true );
    $fpg_pagination_height        = get_post_meta( $post->ID, 'fpg_pagination_height', true );
    $fpg_pagination_width   = get_post_meta( $post->ID, 'fpg_pagination_width', true );
    $fpg_pagination_border_width = get_post_meta( $post->ID, 'fpg_pagination_border_width', true );

    $fpg_author_color        = get_post_meta( $post->ID, 'fpg_author_color', true );
    $fpg_author_bg_color   = get_post_meta( $post->ID, 'fpg_author_bg_color', true );
    $fpg_author_padding = get_post_meta( $post->ID, 'fpg_author_padding', true );

    //Meta Data
    $fpg_meta_color                          = get_post_meta( $post->ID,'fpg_meta_color', true); 
    $fpg_meta_hover_color                    = get_post_meta( $post->ID,'fpg_meta_hover_color', true); 
    $fpg_meta_icon_color                    = get_post_meta( $post->ID,'fpg_meta_icon_color', true); 
    $fpg_meta_gap                            = get_post_meta( $post->ID,'fpg_meta_gap', true); 
    $fpg_meta_size                           = get_post_meta( $post->ID,'fpg_meta_size', true); 
    $fpg_meta_bgcolor                        = get_post_meta( $post->ID,'fpg_meta_bgcolor', true); 
     $fpg_date_color                    = get_post_meta( $post->ID,'fpg_date_color', true); 
    $fpg_date_bg_color                  = get_post_meta( $post->ID,'fpg_date_bg_color', true); 
    $fpg_date_padding                   = get_post_meta( $post->ID,'fpg_date_padding', true); 
    
    $fpg_meta_font_weight                    = get_post_meta( $post->ID,'fpg_meta_font_weight', true ); 
    if ( empty( $fpg_meta_font_weight ) ) {
        $fpg_meta_font_weight = '400'; 
    }
    $fpg_slider_dots_active_color = get_post_meta( $post->ID, 'fpg_slider_dots_active_color', true );
    $fpg_slider_dots_color = get_post_meta( $post->ID, 'fpg_slider_dots_color', true );
    $fpg_arrow_color = get_post_meta( $post->ID, 'fpg_arrow_color', true );
    $fpg_arrow_hover_color = get_post_meta( $post->ID, 'fpg_arrow_hover_color', true );
    $fpg_arrow_bg_color = get_post_meta( $post->ID, 'fpg_arrow_bg_color', true );
    $fpg_arrow_bg_hover_color = get_post_meta( $post->ID, 'fpg_arrow_bg_hover_color', true );
    $fpg_icon_font_size = get_post_meta( $post->ID, 'fpg_icon_font_size', true );
    $fpg_fraction_total_color = get_post_meta( $post->ID, 'fpg_fraction_total_color', true );
    $fpg_fraction_current_color = get_post_meta( $post->ID, 'fpg_fraction_current_color', true );
    $fpg_fraction_total_font_size = get_post_meta( $post->ID, 'fpg_fraction_total_font_size', true );
    $fpg_fraction_current_font_size = get_post_meta( $post->ID, 'fpg_fraction_current_font_size', true );

    // Output for the metabox content
    ?>
    <div id="fpg_metabox_tabs">
        <div class="button-wrapper">
            <span class="filter-marker"></span>
            <a href="#tab-1" class="fpg-nav-tab">
                <div class="fpg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                    <defs></defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 45 54.733 c -0.868 0 -1.736 -0.208 -2.527 -0.624 L 1.818 32.727 C 0.696 32.137 0 30.983 0 29.717 s 0.697 -2.42 1.818 -3.009 L 42.473 5.325 c 1.582 -0.833 3.47 -0.832 5.054 0 l 40.655 21.383 C 89.304 27.297 90 28.45 90 29.717 s -0.696 2.42 -1.817 3.01 L 47.527 54.109 C 46.736 54.525 45.868 54.733 45 54.733 z M 45 6.701 c -0.548 0 -1.096 0.131 -1.596 0.395 L 2.749 28.478 C 2.28 28.724 2 29.188 2 29.717 c 0 0.53 0.28 0.993 0.749 1.24 L 43.404 52.34 c 1 0.525 2.194 0.525 3.192 0 l 40.655 -21.383 C 87.72 30.71 88 30.247 88 29.717 c 0 -0.529 -0.28 -0.993 -0.748 -1.239 L 46.596 7.095 C 46.097 6.832 45.548 6.701 45 6.701 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 45 70.016 c -0.868 0 -1.736 -0.208 -2.527 -0.624 L 1.818 48.009 C 0.697 47.42 0 46.267 0 45 c 0 -1.267 0.696 -2.42 1.818 -3.01 L 5.8 39.896 c 0.489 -0.257 1.094 -0.069 1.351 0.42 s 0.069 1.093 -0.42 1.351 l -3.982 2.095 C 2.28 44.007 2 44.471 2 45 s 0.28 0.993 0.749 1.239 l 40.655 21.383 c 1 0.525 2.194 0.525 3.192 0 l 40.655 -21.383 C 87.72 45.993 88 45.529 88 45 s -0.28 -0.993 -0.749 -1.239 l -3.982 -2.095 c -0.488 -0.257 -0.677 -0.862 -0.419 -1.351 c 0.257 -0.489 0.862 -0.677 1.351 -0.42 l 3.982 2.095 C 89.304 42.58 90 43.733 90 45 c 0 1.266 -0.696 2.419 -1.818 3.008 L 47.527 69.392 C 46.736 69.808 45.868 70.016 45 70.016 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 45 85.299 c -0.868 0 -1.736 -0.208 -2.527 -0.624 L 1.818 63.292 C 0.697 62.703 0 61.55 0 60.284 c 0 -1.268 0.696 -2.421 1.817 -3.011 L 5.8 55.179 c 0.489 -0.258 1.094 -0.069 1.351 0.419 c 0.257 0.489 0.069 1.094 -0.42 1.351 l -3.982 2.095 C 2.28 59.29 2 59.754 2 60.283 s 0.28 0.992 0.749 1.239 l 40.655 21.383 c 1 0.525 2.194 0.525 3.192 0 l 40.655 -21.383 C 87.72 61.275 88 60.812 88 60.283 s -0.28 -0.993 -0.749 -1.24 l -3.982 -2.095 c -0.488 -0.257 -0.677 -0.861 -0.419 -1.351 c 0.257 -0.489 0.862 -0.676 1.351 -0.419 l 3.982 2.095 C 89.304 57.863 90 59.017 90 60.284 c 0 1.266 -0.697 2.419 -1.818 3.008 L 47.527 84.675 C 46.736 85.091 45.868 85.299 45 85.299 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                    </g>
                </svg>
                </div>
                <?php esc_html_e( 'Layout Settings', 'fancy-post-grid' ); ?>
            </a>
            <a href="#tab-2" class="fpg-nav-tab">
                <div class="fpg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                    <defs></defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 63.409 90 H 8.08 C 3.625 90 0 86.375 0 81.92 V 8.08 C 0 3.625 3.625 0 8.08 0 h 73.84 C 86.375 0 90 3.625 90 8.08 v 57.44 c 0 0.553 -0.447 1 -1 1 s -1 -0.447 -1 -1 V 8.08 C 88 4.728 85.272 2 81.92 2 H 8.08 C 4.728 2 2 4.728 2 8.08 v 73.84 C 2 85.272 4.728 88 8.08 88 h 55.329 c 0.553 0 1 0.447 1 1 S 63.962 90 63.409 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 79.181 89.997 c -1.626 0 -3.252 -0.619 -4.489 -1.856 L 52.982 66.433 c -1.323 -1.324 -2.312 -2.971 -2.858 -4.76 l -3.479 -11.384 c -0.316 -1.034 -0.038 -2.151 0.728 -2.916 c 0.765 -0.766 1.887 -1.046 2.916 -0.728 l 11.384 3.479 c 1.789 0.547 3.436 1.535 4.76 2.858 l 21.708 21.709 c 2.476 2.476 2.476 6.503 0 8.979 l -4.471 4.471 C 82.433 89.378 80.807 89.997 79.181 89.997 z M 49.425 48.515 c -0.324 0 -0.545 0.18 -0.638 0.272 c -0.117 0.117 -0.375 0.441 -0.229 0.918 l 3.479 11.384 c 0.452 1.478 1.268 2.836 2.36 3.93 l 21.709 21.708 c 1.695 1.695 4.455 1.695 6.15 0 l 4.471 -4.471 c 1.695 -1.695 1.695 -4.455 0 -6.15 L 65.019 54.396 c -1.094 -1.093 -2.452 -1.908 -3.93 -2.36 l 0 0 l -11.384 -3.479 C 49.604 48.527 49.511 48.515 49.425 48.515 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 70.886 83.922 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 12.036 -12.036 c 0.391 -0.391 1.023 -0.391 1.414 0 s 0.391 1.023 0 1.414 L 71.593 83.629 C 71.397 83.824 71.142 83.922 70.886 83.922 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 72.719 22 H 17.281 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 55.438 c 0.553 0 1 0.448 1 1 S 73.271 22 72.719 22 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 72.719 38 H 17.281 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 55.438 c 0.553 0 1 0.448 1 1 S 73.271 38 72.719 38 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 32.719 54 H 17.281 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 15.438 c 0.552 0 1 0.447 1 1 S 33.271 54 32.719 54 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 42.719 70 H 17.281 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 25.438 c 0.552 0 1 0.447 1 1 S 43.271 70 42.719 70 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                    </g>
                </svg>

                </div>
                <?php esc_html_e( 'Field Selector', 'fancy-post-grid' ); ?>
            </a>
            <a href="#tab-3" class="fpg-nav-tab active">
                <div class="fpg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                    <defs></defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 80.644 67.765 L 69.069 56.19 c -1.439 -1.438 -3.7 -1.533 -5.266 -0.314 l -4.014 -4.014 c 3.395 -3.74 5.274 -8.526 5.274 -13.612 c 0 -5.422 -2.112 -10.52 -5.946 -14.354 s -8.931 -5.945 -14.353 -5.945 s -10.52 2.111 -14.354 5.945 s -5.945 8.931 -5.945 14.354 c 0 5.422 2.111 10.519 5.945 14.353 s 8.932 5.946 14.354 5.946 c 5.086 0 9.872 -1.879 13.612 -5.274 l 4.013 4.013 c -0.543 0.696 -0.852 1.541 -0.852 2.441 c 0 1.07 0.414 2.074 1.167 2.826 l 11.574 11.575 c 0.779 0.779 1.803 1.169 2.826 1.169 c 1.022 0 2.046 -0.39 2.825 -1.169 l 0.715 -0.715 C 82.202 71.858 82.202 69.323 80.644 67.765 z M 31.823 51.189 c -3.456 -3.456 -5.359 -8.051 -5.359 -12.939 s 1.903 -9.483 5.359 -12.939 c 3.457 -3.456 8.052 -5.359 12.94 -5.359 s 9.483 1.903 12.939 5.359 s 5.36 8.052 5.36 12.939 s -1.904 9.483 -5.36 12.939 s -8.051 5.36 -12.939 5.36 S 35.28 54.646 31.823 51.189 z M 79.229 72.003 l -0.715 0.715 c -0.75 0.751 -2.073 0.749 -2.823 0 L 64.117 61.143 c -0.375 -0.375 -0.581 -0.876 -0.581 -1.412 c 0 -0.535 0.206 -1.036 0.581 -1.411 l 0.715 -0.715 c 0.375 -0.375 0.876 -0.581 1.411 -0.581 c 0.536 0 1.037 0.206 1.412 0.581 l 11.574 11.574 C 80.008 69.957 80.008 71.225 79.229 72.003 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 31.425 45.3 c -0.303 0 -0.602 -0.137 -0.798 -0.396 c -0.333 -0.44 -0.247 -1.068 0.194 -1.401 l 18.395 -13.92 c 0.226 -0.171 0.516 -0.239 0.79 -0.185 c 0.277 0.053 0.52 0.22 0.667 0.461 l 5.851 9.589 l 2.155 -1.549 c 0.449 -0.324 1.074 -0.22 1.396 0.229 c 0.322 0.448 0.22 1.073 -0.229 1.396 l -3.031 2.178 c -0.227 0.162 -0.512 0.225 -0.782 0.168 c -0.273 -0.055 -0.511 -0.222 -0.655 -0.459 l -5.837 -9.566 L 32.027 45.097 C 31.847 45.234 31.635 45.3 31.425 45.3 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 85.396 10.052 H 4.604 C 2.065 10.052 0 12.117 0 14.655 v 46.655 c 0 2.538 2.065 4.604 4.604 4.604 h 31.272 v 12.034 H 23.189 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 h 43.621 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 H 54.124 V 65.914 h 4.285 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 H 4.604 C 3.168 63.914 2 62.746 2 61.311 v -8.911 l 10.492 -7.789 l 5.804 9.5 c 0.147 0.241 0.39 0.408 0.667 0.461 c 0.062 0.012 0.124 0.018 0.186 0.018 c 0.216 0 0.428 -0.07 0.604 -0.202 l 4.04 -3.058 c 0.44 -0.334 0.527 -0.961 0.194 -1.401 s -0.96 -0.526 -1.401 -0.194 l -3.159 2.392 l -5.799 -9.491 c -0.146 -0.24 -0.387 -0.407 -0.663 -0.46 c -0.276 -0.056 -0.562 0.011 -0.787 0.179 L 2 49.909 V 14.655 c 0 -1.436 1.168 -2.604 2.604 -2.604 h 80.793 c 1.436 0 2.604 1.168 2.604 2.604 v 2.177 L 67.549 31.525 c -0.448 0.322 -0.551 0.947 -0.229 1.396 c 0.195 0.272 0.502 0.417 0.813 0.417 c 0.202 0 0.406 -0.061 0.582 -0.188 L 88 19.295 v 42.016 c 0 1.436 -1.168 2.604 -2.604 2.604 h -1.747 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 h 1.747 c 2.538 0 4.604 -2.065 4.604 -4.604 V 14.655 C 90 12.117 87.935 10.052 85.396 10.052 z M 52.124 77.948 H 37.876 V 65.914 h 14.248 V 77.948 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                    </g>
                </svg>
                </div>
                <?php esc_html_e( 'Query Build', 'fancy-post-grid' ); ?>
            </a>
            <a href="#tab-4" class="fpg-nav-tab">
                <div class="fpg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">

                    <defs>
                    </defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 16.253 90 c -1.72 0 -3.46 -0.275 -5.16 -0.839 c -0.329 -0.109 -0.578 -0.381 -0.658 -0.719 c -0.08 -0.338 0.021 -0.692 0.266 -0.937 l 7.189 -7.189 c 1.096 -1.096 1.7 -2.553 1.7 -4.104 s -0.603 -3.007 -1.699 -4.104 c -2.264 -2.263 -5.946 -2.263 -8.207 0 l -7.189 7.189 c -0.245 0.244 -0.602 0.347 -0.937 0.266 c -0.337 -0.079 -0.609 -0.329 -0.719 -0.658 c -1.945 -5.866 -0.449 -12.215 3.906 -16.57 c 4.463 -4.462 11.051 -5.916 16.948 -3.792 l 36.851 -36.851 c -2.124 -5.9 -0.671 -12.486 3.792 -16.948 c 4.354 -4.355 10.707 -5.852 16.57 -3.906 c 0.329 0.109 0.579 0.381 0.658 0.719 c 0.08 0.337 -0.021 0.692 -0.266 0.937 L 72.11 9.683 c -2.262 2.263 -2.262 5.944 0 8.207 c 1.096 1.096 2.553 1.699 4.104 1.699 c 1.55 0 3.007 -0.603 4.104 -1.7 l 7.189 -7.189 c 0.245 -0.246 0.603 -0.344 0.937 -0.266 c 0.338 0.08 0.609 0.329 0.719 0.658 c 1.946 5.866 0.449 12.215 -3.906 16.57 c -4.463 4.464 -11.048 5.915 -16.948 3.793 L 31.456 68.307 c 2.124 5.899 0.67 12.485 -3.793 16.948 C 24.571 88.348 20.471 90 16.253 90 z M 13.336 87.698 c 4.668 0.974 9.493 -0.436 12.913 -3.857 c 4.051 -4.051 5.274 -10.098 3.115 -15.406 c -0.151 -0.373 -0.065 -0.8 0.219 -1.084 l 37.769 -37.769 c 0.285 -0.285 0.712 -0.371 1.084 -0.219 c 5.307 2.161 11.355 0.936 15.406 -3.115 c 3.42 -3.421 4.829 -8.246 3.857 -12.913 l -5.967 5.967 c -1.473 1.474 -3.433 2.286 -5.517 2.286 c -2.084 0 -4.044 -0.811 -5.517 -2.285 c -3.042 -3.043 -3.042 -7.993 0 -11.035 l 5.967 -5.968 C 71.993 1.33 67.17 2.738 63.749 6.158 c -4.051 4.051 -5.273 10.098 -3.114 15.406 c 0.151 0.372 0.064 0.8 -0.22 1.084 L 22.648 60.416 c -0.285 0.284 -0.712 0.367 -1.084 0.22 c -5.308 -2.162 -11.355 -0.937 -15.406 3.114 c -3.421 3.421 -4.829 8.246 -3.857 12.914 l 5.968 -5.967 c 3.042 -3.042 7.992 -3.042 11.035 0 c 1.474 1.473 2.286 3.433 2.285 5.517 c 0 2.084 -0.812 4.044 -2.286 5.517 L 13.336 87.698 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                        <path d="M 29.621 61.379 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 30.758 -30.758 c 0.391 -0.391 1.023 -0.391 1.414 0 c 0.391 0.391 0.391 1.023 0 1.414 L 30.327 61.086 C 30.132 61.281 29.876 61.379 29.621 61.379 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                        <path d="M 79.625 89.833 c -2.654 0 -5.308 -1.01 -7.328 -3.031 L 57.424 71.93 c -0.177 -0.177 -0.28 -0.413 -0.292 -0.662 c -0.155 -3.46 -1.876 -7.076 -4.72 -9.921 c -2.794 -2.793 -6.352 -4.511 -9.76 -4.712 c -0.552 -0.032 -0.972 -0.506 -0.939 -1.056 c 0.032 -0.552 0.505 -0.967 1.056 -0.939 c 3.891 0.228 7.921 2.159 11.057 5.294 c 3.087 3.088 4.996 7.021 5.28 10.851 L 73.71 85.389 c 3.262 3.262 8.57 3.26 11.83 0 c 3.261 -3.262 3.261 -8.568 0 -11.83 L 70.936 58.955 c -3.831 -0.284 -7.764 -2.193 -10.851 -5.28 c -3.135 -3.136 -5.065 -7.166 -5.294 -11.057 c -0.032 -0.551 0.388 -1.024 0.939 -1.056 c 0.539 -0.041 1.024 0.388 1.056 0.939 c 0.201 3.408 1.918 6.966 4.712 9.76 c 2.844 2.844 6.459 4.564 9.921 4.72 c 0.249 0.012 0.485 0.115 0.662 0.292 l 14.873 14.873 c 4.04 4.041 4.04 10.617 0 14.658 C 84.934 88.824 82.279 89.833 79.625 89.833 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                        <path d="M 81.007 81.856 c -0.256 0 -0.512 -0.098 -0.707 -0.293 L 52.382 53.645 c -0.391 -0.391 -0.391 -1.023 0 -1.414 s 1.023 -0.391 1.414 0 l 27.918 27.917 c 0.391 0.391 0.391 1.023 0 1.414 C 81.519 81.758 81.263 81.856 81.007 81.856 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                        <path d="M 39.138 43.512 c -0.256 0 -0.512 -0.098 -0.707 -0.293 l -26.69 -26.69 l -5.818 -1.89 c -0.239 -0.078 -0.44 -0.243 -0.563 -0.462 L 0.138 4.874 c -0.219 -0.391 -0.152 -0.879 0.165 -1.196 l 3.224 -3.223 C 3.843 0.139 4.333 0.071 4.723 0.29 l 9.303 5.221 c 0.219 0.123 0.384 0.324 0.462 0.563 l 1.89 5.818 l 26.69 26.69 c 0.391 0.391 0.391 1.023 0 1.414 c -0.391 0.391 -1.023 0.391 -1.414 0 l -26.859 -26.86 c -0.112 -0.111 -0.195 -0.248 -0.244 -0.398 l -1.843 -5.675 l -8.302 -4.66 L 2.252 4.556 l 4.66 8.302 l 5.675 1.843 c 0.15 0.049 0.287 0.132 0.398 0.244 l 26.86 26.86 c 0.391 0.391 0.391 1.023 0 1.414 C 39.65 43.415 39.394 43.512 39.138 43.512 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    </g>
                </svg>

                </div>
                <?php esc_html_e( 'Advanced Settings', 'fancy-post-grid' ); ?>
            </a>
            <a href="#tab-5" class="fpg-nav-tab">
                <div class="fpg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                    <defs></defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 50.004 2.245 c 19.73 2.292 35.46 18.022 37.751 37.751 H 50.004 V 2.245 M 48.004 0.055 v 41.941 h 41.941 C 88.463 19.509 70.491 1.537 48.004 0.055 L 48.004 0.055 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 87.755 50.004 c -1.275 10.994 -6.739 21.059 -15.276 28.143 L 54.213 50.004 H 87.755 M 89.945 48.004 H 50.53 l 21.465 33.071 C 82.209 73.419 89.054 61.525 89.945 48.004 L 89.945 48.004 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 39.996 2.245 v 39.9 L 5.637 62.446 C 3.186 56.943 1.945 51.084 1.945 45 C 1.945 23.118 18.491 4.737 39.996 2.245 M 41.996 0.055 C 18.515 1.603 -0.055 21.127 -0.055 45 c 0 7.298 1.746 14.184 4.826 20.282 l 37.226 -21.996 V 0.055 L 41.996 0.055 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                        <path d="M 43.415 51.749 l 20.669 31.846 C 58.176 86.518 51.622 88.055 45 88.055 c -13.481 0 -26.135 -6.315 -34.268 -16.995 L 43.415 51.749 M 44.049 49.051 L 7.827 70.454 C 15.946 82.289 29.564 90.055 45 90.055 c 7.973 0 15.457 -2.079 21.954 -5.713 L 44.049 49.051 L 44.049 49.051 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #A3ACB9; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"></path>
                    </g>
                </svg>
                </div>
                <?php esc_html_e( 'Style', 'fancy-post-grid' ); ?>
            </a>
        </div>

        <div id="tab-1" class="fpg-tab-content">
            
            <!-- Layout Type -->
            <div class="fpg-layout-select-post fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Layout Type:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-radio-list-outer">
                        <div class="fpg-radio-list">
                            <input type="radio" id="fpg_layout_grid" name="fpg_layout_select" value="grid" <?php checked( $fpg_layout_select, 'grid', true ); ?> />
                            <label for="fpg_layout_grid">
                                <span></span>
                                <img class="fpg_logo" src="<?php echo esc_url( plugins_url( 'img/grid_style_main.png', __FILE__ ) ); ?>" alt="Grid Style">
                                <p><?php esc_html_e( 'Grid', 'fancy-post-grid' ); ?></p>
                            </label>

                        </div>
                        <div class="fpg-radio-list">
                            <input type="radio" id="fpg_layout_slider" name="fpg_layout_select" value="slider" <?php checked( $fpg_layout_select, 'slider',true ); ?> />
                            <label for="fpg_layout_slider">
                                <span></span>
                                <img class="fpg_logo" src="<?php echo esc_url(plugins_url( 'img/slider_style_main.png', __FILE__ )); ?>" alt="Slider Style">
                                <p><?php esc_html_e( 'Slider', 'fancy-post-grid' ); ?></p>
                            </label>
                        </div>
                        <div class="fpg-radio-list">
                            <input type="radio" id="fpg_layout_list" name="fpg_layout_select" value="list" <?php checked( $fpg_layout_select, 'list',true ); ?> />
                            <label for="fpg_layout_list">
                                <span></span>
                                <img class="fpg_logo" src="<?php echo esc_url(plugins_url( 'img/slider_style_main.png', __FILE__ )); ?>" alt="List Style">
                                <p><?php esc_html_e( 'List', 'fancy-post-grid' ); ?></p>
                            </label>
                        </div>
                        <div class="fpg-radio-list">
                            <input type="radio" id="fpg_layout_isotope" name="fpg_layout_select" value="isotope" <?php checked( $fpg_layout_select, 'isotope',true ); ?> />
                            <label for="fpg_layout_isotope">
                                <span></span>
                                <img class="fpg_logo" src="<?php echo esc_url(plugins_url( 'img/slider_style_main.png', __FILE__ )); ?>" alt="Isotope Style">
                                <p><?php esc_html_e( 'Isotope', 'fancy-post-grid' ); ?></p>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>

            <!-- Grid Layout Settings -->
            <div class="fancy-post-grid-style fpg-common" id="fancy_post_grid_style">
                <fieldset>
                    <legend><?php esc_html_e( 'Grid Layout:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-radio-list-outer">
                    <?php
                    $styles = [
                        'style1' => 'Grid Layout 1',
                        'style2' => 'Grid Layout 2',
                        'style3' => 'Grid Layout 3',
                        'style4' => 'Grid Layout 4',
                        'style5' => 'Grid Layout 5',
                        'style6' => 'Grid Layout 6',
                        'style7' => 'Grid Layout 7',
                        'style8' => 'Grid Layout 8',
                        'style9' => 'Grid Layout 9',
                        'style10' => 'Grid Layout 10',
                        'style11' => 'Grid Layout 11',
                        'style12' => 'Grid Layout 12',
                    ];

                    foreach ($styles as $style_value => $style_label) :
                        $default_image_url = plugins_url( 'img/' . $style_value . '.png', __FILE__ );
                        $hover_image_url = plugins_url( 'img/' . $style_value . '_hover.png', __FILE__ );
                    ?>  
                    
                        <div class="fpg-radio-list">
                            <input type="radio" id="fancy_post_grid_style_<?php echo esc_attr($style_value); ?>" name="fancy_post_grid_style" value="<?php echo esc_attr($style_value); ?>" <?php checked($fancy_post_grid_style, $style_value); ?> />
                            <label for="fancy_post_grid_style_<?php echo esc_attr($style_value); ?>">
                                <span></span>
                                <img class="fpg-style-image" src="<?php echo esc_url($default_image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <img class="fpg-style-image-2nd" src="<?php echo esc_url($hover_image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                               <p><?php echo esc_html($style_label); ?></p>
                            </label>
                        </div>
                    
                    <?php endforeach; ?>
                    </div>
                </fieldset>
            </div>

            <!-- Slider Layout Settings -->
            <div class="fancy-post-grid-style fpg-common" id="fancy_post_slider_style">
                <fieldset>
                    <legend><?php esc_html_e( 'Slider Layout:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-radio-list-outer">
                    <?php
                    $styles = [
                        'sliderstyle1' => 'Slider Layout 1',
                        'sliderstyle2' => 'Slider Layout 2',
                        'sliderstyle3' => 'Slider Layout 3',
                        'sliderstyle4' => 'Slider Layout 4',
                        'sliderstyle5' => 'Slider Layout 5',
                        'sliderstyle6' => 'Slider Layout 6',
                        'sliderstyle7' => 'Slider Layout 7',
                    ];

                    foreach ($styles as $style_value => $style_label) :
                        $image_url = plugins_url( 'img/' . $style_value . '.png', __FILE__ );
                        $hover_image_url = plugins_url( 'img/' . $style_value . '_hover.png', __FILE__ );
                    ?>
                        <div class="fpg-radio-list">
                            <input type="radio" id="fancy_slider_style_<?php echo esc_attr($style_value); ?>" name="fancy_slider_style" value="<?php echo esc_attr($style_value); ?>" <?php checked($fancy_slider_style, $style_value); ?> />
                            <label for="fancy_slider_style_<?php echo esc_attr($style_value); ?>">
                                <span></span>

                                <img class="fpg-style-image" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <img class="fpg-style-image-2nd" src="<?php echo esc_url($hover_image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <p><?php echo esc_html($style_label); ?></p>
                            </label>
                        </div>
                    <?php endforeach; ?>
                    </div>
                </fieldset>
            </div>

            <!-- List Layout Settings -->
            <div class="fancy-post-grid-style fpg-common" id="fancy_post_list_style">
                <fieldset>
                    <legend><?php esc_html_e( 'List Layout:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-radio-list-outer">
                    <?php
                    $list_styles = [
                        'liststyle1' => 'List Layout 1',
                        'liststyle2' => 'List Layout 2',
                        'liststyle3' => 'List Layout 3',
                        'liststyle4' => 'List Layout 4',
                        'liststyle5' => 'List Layout 5',
                        'liststyle6' => 'List Layout 6',
                        'liststyle7' => 'List Layout 7',
                        'liststyle8' => 'List Layout 8',
                    ];

                    foreach ($list_styles as $style_value => $style_label) :
                        $image_url = plugins_url( 'img/' . $style_value . '.png', __FILE__ );
                        $hover_image_url = plugins_url( 'img/' . $style_value . '_hover.png', __FILE__ );
                    ?>
                        <div class="fpg-radio-list">
                            <input type="radio" id="fancy_list_style_<?php echo esc_attr($style_value); ?>" name="fancy_list_style" value="<?php echo esc_attr($style_value); ?>" <?php checked($fancy_list_style, $style_value); ?> />
                            <label for="fancy_list_style_<?php echo esc_attr($style_value); ?>">
                                <span></span>

                                <img class="fpg-style-image" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <img class="fpg-style-image-2nd" src="<?php echo esc_url($hover_image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <p><?php echo esc_html($style_label); ?></p>
                            </label>
                        </div>
                    <?php endforeach; ?>
                    </div>
                </fieldset>
            </div>

            <!-- Isotope Layout Settings -->
            <div class="fancy-post-grid-style fpg-common" id="fancy_post_isotope_style">
                <fieldset>
                    <legend><?php esc_html_e( 'Isotope Layout:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-radio-list-outer">
                    <?php
                    $isotope_styles = [
                        'isotopestyle1' => 'Isotope Layout 1',
                        'isotopestyle2' => 'Isotope Layout 2',
                        'isotopestyle3' => 'Isotope Layout 3',
                        'isotopestyle4' => 'Isotope Layout 4',
                    ];

                    foreach ($isotope_styles as $style_value => $style_label) :
                        $image_url = plugins_url( 'img/' . $style_value . '.png', __FILE__ );
                        $hover_image_url = plugins_url( 'img/' . $style_value . '_hover.png', __FILE__ );
                    ?>
                        <div class="fpg-radio-list">
                            <input type="radio" id="fancy_isotope_style_<?php echo esc_attr($style_value); ?>" name="fancy_isotope_style" value="<?php echo esc_attr($style_value); ?>" <?php checked($fancy_isotope_style, $style_value); ?> />
                            <label for="fancy_isotope_style_<?php echo esc_attr($style_value); ?>">
                                <span></span>

                                <img class="fpg-style-image" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <img class="fpg-style-image-2nd" src="<?php echo esc_url($hover_image_url); ?>" alt="<?php echo esc_attr($style_label); ?>" style="max-width: 100px; max-height: 50px; vertical-align: middle; width: 100%;">
                                <p><?php echo esc_html($style_label); ?></p>
                            </label>
                        </div>
                    <?php endforeach; ?>
                    </div>
                </fieldset>
            </div>

            <!-- Column Grid Settings -->
            <div class="fancy-post-column fpg-common" id="fancy_post_column_grid">
                <fieldset>
                    <legend><?php esc_html_e( 'Column Settings:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                        <div class="fpg-post-select" id="fancy_post_cl_lg_main">
                            <label for="fancy_post_cl_lg"><?php esc_html_e( 'Large Screen Column:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_lg" name="fancy_post_cl_lg" style="width: 100%;">
                                <option value="12" <?php selected( $fancy_post_cl_lg, '12' ); ?>><?php esc_html_e( '1 Column', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_lg, '6' ); ?>><?php esc_html_e( '2 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_lg, '4' ); ?>><?php esc_html_e( '3 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="3" <?php selected( $fancy_post_cl_lg, '3' ); ?>><?php esc_html_e( '4 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="2" <?php selected( $fancy_post_cl_lg, '2' ); ?>><?php esc_html_e( '6 Columns', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_md"><?php esc_html_e( 'Medium Screen Column:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_md" name="fancy_post_cl_md" style="width: 100%;">
                                <option value="12" <?php selected( $fancy_post_cl_md, '12' ); ?>><?php esc_html_e( '1 Column', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_md, '6' ); ?>><?php esc_html_e( '2 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_md, '4' ); ?>><?php esc_html_e( '3 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="3" <?php selected( $fancy_post_cl_md, '3' ); ?>><?php esc_html_e( '4 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="2" <?php selected( $fancy_post_cl_md, '2' ); ?>><?php esc_html_e( '6 Columns', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_sm"><?php esc_html_e( 'Small Screen Column:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_sm" name="fancy_post_cl_sm" style="width: 100%;">

                                <option value="12" <?php selected( $fancy_post_cl_sm, '12' ); ?>><?php esc_html_e( '1 Column', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_sm, '6' ); ?>><?php esc_html_e( '2 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_sm, '4' ); ?>><?php esc_html_e( '3 Columns', 'fancy-post-grid' ); ?></option>
                                
                            </select>
                        </div>
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_mobile"><?php esc_html_e( 'Mobile Screen Column:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_mobile" name="fancy_post_cl_mobile" style="width: 100%;">
                                <option value="12" <?php selected( $fancy_post_cl_mobile, '12' ); ?>><?php esc_html_e( '1 Column', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_mobile, '6' ); ?>><?php esc_html_e( '2 Columns', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_mobile, '4' ); ?>><?php esc_html_e( '3 Columns', 'fancy-post-grid' ); ?></option>                                
                            </select>
                        </div>
                    </div>                    
                </fieldset>
            </div>

            <!-- Column Slider Settings -->
            <div class="fancy-post-column fpg-common" id="fancy_post_column_slider">
                <fieldset>
                    <legend><?php esc_html_e( 'Slider Item Settings:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_lg_slider"><?php esc_html_e( 'Large Screen Items:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_lg_slider" name="fancy_post_cl_lg_slider" style="width: 100%;">
                                <option value="1" <?php selected( $fancy_post_cl_lg_slider, '1' ); ?>><?php esc_html_e( '1 Item', 'fancy-post-grid' ); ?></option>
                                <option value="2" <?php selected( $fancy_post_cl_lg_slider, '2' ); ?>><?php esc_html_e( '2 Items', 'fancy-post-grid' ); ?></option>
                                <option value="3" <?php selected( $fancy_post_cl_lg_slider, '3' ); ?>><?php esc_html_e( '3 Items', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_lg_slider, '4' ); ?>><?php esc_html_e( '4 Items', 'fancy-post-grid' ); ?></option>
                                <option value="5" <?php selected( $fancy_post_cl_lg_slider, '5' ); ?>><?php esc_html_e( '5 Items', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_lg_slider, '6' ); ?>><?php esc_html_e( '6 Items', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_md_silder"><?php esc_html_e( 'Medium Screen Items:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_md_silder" name="fancy_post_cl_md_silder" style="width: 100%;">
                                <option value="1" <?php selected( $fancy_post_cl_md_silder, '1' ); ?>><?php esc_html_e( '1 Item', 'fancy-post-grid' ); ?></option>
                                <option value="2" <?php selected( $fancy_post_cl_md_silder, '2' ); ?>><?php esc_html_e( '2 Items', 'fancy-post-grid' ); ?></option>
                                <option value="3" <?php selected( $fancy_post_cl_md_silder, '3' ); ?>><?php esc_html_e( '3 Items', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_md_silder, '4' ); ?>><?php esc_html_e( '4 Items', 'fancy-post-grid' ); ?></option>
                                <option value="5" <?php selected( $fancy_post_cl_md_silder, '5' ); ?>><?php esc_html_e( '5 Items', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_md_silder, '6' ); ?>><?php esc_html_e( '6 Items', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_sm_slider"><?php esc_html_e( 'Small Screen Items:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_sm_slider" name="fancy_post_cl_sm_slider" style="width: 100%;">

                                <option value="1" <?php selected( $fancy_post_cl_sm_slider, '1' ); ?>><?php esc_html_e( '1 Item', 'fancy-post-grid' ); ?></option>
                                <option value="2" <?php selected( $fancy_post_cl_sm_slider, '2' ); ?>><?php esc_html_e( '2 Items', 'fancy-post-grid' ); ?></option>
                                <option value="3" <?php selected( $fancy_post_cl_sm_slider, '3' ); ?>><?php esc_html_e( '3 Items', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_sm_slider, '4' ); ?>><?php esc_html_e( '4 Items', 'fancy-post-grid' ); ?></option>
                                <option value="5" <?php selected( $fancy_post_cl_sm_slider, '5' ); ?>><?php esc_html_e( '5 Items', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_sm_slider, '6' ); ?>><?php esc_html_e( '6 Items', 'fancy-post-grid' ); ?></option>
                                
                            </select>
                        </div>
                        <div class="fpg-post-select">
                            <label for="fancy_post_cl_mobile_slider"><?php esc_html_e( 'Mobile Screen Items:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_cl_mobile_slider" name="fancy_post_cl_mobile_slider" style="width: 100%;">
                                <option value="1" <?php selected( $fancy_post_cl_mobile_slider, '1' ); ?>><?php esc_html_e( '1 Item', 'fancy-post-grid' ); ?></option>
                                <option value="2" <?php selected( $fancy_post_cl_mobile_slider, '2' ); ?>><?php esc_html_e( '2 Items', 'fancy-post-grid' ); ?></option>
                                <option value="3" <?php selected( $fancy_post_cl_mobile_slider, '3' ); ?>><?php esc_html_e( '3 Items', 'fancy-post-grid' ); ?></option>
                                <option value="4" <?php selected( $fancy_post_cl_mobile_slider, '4' ); ?>><?php esc_html_e( '4 Item', 'fancy-post-grid' ); ?></option>
                                <option value="5" <?php selected( $fancy_post_cl_mobile_slider, '5' ); ?>><?php esc_html_e( '5 Items', 'fancy-post-grid' ); ?></option>
                                <option value="6" <?php selected( $fancy_post_cl_mobile_slider, '6' ); ?>><?php esc_html_e( '6 Items', 'fancy-post-grid' ); ?></option>                                
                            </select>
                        </div>
                    </div>                    
                </fieldset>
            </div>

            <!-- Item Order Settings -->
            <div class="fancy-post-item-order fpg-common" id="fancy_post_item_order">
                <fieldset>
                    <legend><?php esc_html_e( 'Content Items Ordering:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                        
                        <!-- Meta Order -->
                        <div class="fpg-margin-box" id="fpg_meta_order_main">
                            <label for="fpg_meta_order"><?php esc_html_e( 'Meta:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_meta_order" name="fpg_meta_order" value="<?php echo esc_attr( $fpg_meta_order ); ?>" placeholder="1" />
                        </div>
                        <!-- Title Order -->
                        <div class="fpg-margin-box" id="fpg_title_order_main">
                            <label for="fpg_title_order"><?php esc_html_e( 'Title:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_title_order" name="fpg_title_order" value="<?php echo esc_attr( $fpg_title_order ); ?>" placeholder="2" />
                        </div>
                        <!-- Excerpt Order -->
                        <div class="fpg-margin-box" id="fpg_excerpt_order_main">
                            <label for="fpg_excerpt_order"><?php esc_html_e( 'Excerpt:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_excerpt_order" name="fpg_excerpt_order" value="<?php echo esc_attr( $fpg_excerpt_order ); ?>" placeholder="3" />
                        </div>                   
                        <!-- Button Order -->
                        <div class="fpg-margin-box" id="fpg_button_order_main">
                            <label for="fpg_button_order"><?php esc_html_e( 'Button:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_button_order" name="fpg_button_order" value="<?php echo esc_attr( $fpg_button_order ); ?>" placeholder="4" />
                        </div>
                    </div>
                </fieldset>
            </div>
   
            <!-- Keyboard Option -->
            <div class="fpg-slider-option fpg-common" id="fpg_slider_option">
                <fieldset>
                    <legend><?php esc_html_e( 'Enable Slider Option:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                         <!-- Arrow Control -->
                        <div class="fpg-container">
                            <label for="fancy_arrow"><?php esc_html_e( 'Enable Arrow Control:', 'fancy-post-grid' ); ?></label>
                            <div class="switch switch--horizontal">
                                <input id="fancy_arrow_false" type="radio" name="fancy_arrow" value="false" <?php checked( $fancy_arrow, 'false' ); ?> />
                                <label for="fancy_arrow_false"><?php esc_html_e( 'False', 'fancy-post-grid' ); ?></label>

                                <input id="fancy_arrow_true" type="radio" name="fancy_arrow" value="true" <?php checked( $fancy_arrow, 'true' ); ?> />
                                <label for="fancy_arrow_true"><?php esc_html_e( 'True', 'fancy-post-grid' ); ?></label>
                                <span class="toggle-outside">
                                    <span class="toggle-inside"></span>
                                </span>
                            </div>
                        </div>

                        <!-- Pagination Control -->
                        <div class="fpg-container">
                            <label for="fancy_pagination"><?php esc_html_e( 'Enable Pagination Control:', 'fancy-post-grid' ); ?></label>
                            <div class="switch switch--horizontal">
                                <input id="fancy_pagination_false" type="radio" name="fancy_pagination" value="false" <?php checked( $fancy_pagination, 'false' ); ?> />
                                <label for="fancy_pagination_false"><?php esc_html_e( 'False', 'fancy-post-grid' ); ?></label>

                                <input id="fancy_pagination_true" type="radio" name="fancy_pagination" value="true" <?php checked( $fancy_pagination, 'true' ); ?> />
                                <label for="fancy_pagination_true"><?php esc_html_e( 'True', 'fancy-post-grid' ); ?></label>
                                <span class="toggle-outside">
                                    <span class="toggle-inside"></span>
                                </span>
                            </div>
                        </div>

                        <!-- Keyboard Control -->
                        <div class="fpg-container">
                            <label for="fancy_keyboard"><?php esc_html_e( 'Enable Keyboard Control:', 'fancy-post-grid' ); ?></label>
                            <div class="switch switch--horizontal">
                                <input id="fancy_keyboard_false" type="radio" name="fancy_keyboard" value="false" <?php checked( $fancy_keyboard, 'false' ); ?> />
                                <label for="fancy_keyboard_false"><?php esc_html_e( 'False', 'fancy-post-grid' ); ?></label>
                                
                                <input id="fancy_keyboard_true" type="radio" name="fancy_keyboard" value="true" <?php checked( $fancy_keyboard, 'true' ); ?> />
                                <label for="fancy_keyboard_true"><?php esc_html_e( 'True', 'fancy-post-grid' ); ?></label>
                                <span class="toggle-outside">
                                    <span class="toggle-inside"></span>
                                </span>                            
                            </div>
                        </div>

                        <!-- Loop Option -->
                        <div class="fpg-container">
                            <label for="fancy_loop"><?php esc_html_e( 'Enable Looping:', 'fancy-post-grid' ); ?></label>
                            <div class="switch switch--horizontal">
                                <input id="fancy_loop_false" type="radio" name="fancy_loop" value="false" <?php checked( $fancy_loop, 'false' ); ?> />
                                <label for="fancy_loop_false"><?php esc_html_e( 'False', 'fancy-post-grid' ); ?></label>
                                
                                <input id="fancy_loop_true" type="radio" name="fancy_loop" value="true" <?php checked( $fancy_loop, 'true' ); ?> />
                                <label for="fancy_loop_true"><?php esc_html_e( 'True', 'fancy-post-grid' ); ?></label>
                                <span class="toggle-outside">
                                    <span class="toggle-inside"></span>
                                </span>                            
                            </div>
                        </div>

                        <!-- Free Mode Option -->
                        <div class="fpg-container">
                            <label for="fancy_free_mode"><?php esc_html_e( 'Enable Free Mode:', 'fancy-post-grid' ); ?></label>
                            <div class="switch switch--horizontal">
                                <input id="fancy_free_mode_false" type="radio" name="fancy_free_mode" value="false" <?php checked( $fancy_free_mode, 'false' ); ?> />
                                <label for="fancy_free_mode_false"><?php esc_html_e( 'False', 'fancy-post-grid' ); ?></label>
                                
                                <input id="fancy_free_mode_true" type="radio" name="fancy_free_mode" value="true" <?php checked( $fancy_free_mode, 'true' ); ?> />
                                <label for="fancy_free_mode_true"><?php esc_html_e( 'True', 'fancy-post-grid' ); ?></label>
                                <span class="toggle-outside">
                                    <span class="toggle-inside"></span>
                                </span>                            
                            </div>
                        </div>

                        <!-- Pagination Clickable Mode Option -->
                        <div class="fpg-container" id="fancy_pagination_clickable_main">
                            <label for="fancy_pagination_clickable"><?php esc_html_e( 'Pagination Clickable Mode:', 'fancy-post-grid' ); ?></label>
                            <div class="switch switch--horizontal">
                                <input id="fancy_pagination_clickable_false" type="radio" name="fancy_pagination_clickable" value="false" <?php checked( $fancy_pagination_clickable, 'false' ); ?> />
                                <label for="fancy_pagination_clickable_false"><?php esc_html_e( 'False', 'fancy-post-grid' ); ?></label>
                                
                                <input id="fancy_pagination_clickable_true" type="radio" name="fancy_pagination_clickable" value="true" <?php checked( $fancy_pagination_clickable, 'true' ); ?> />
                                <label for="fancy_pagination_clickable_true"><?php esc_html_e( 'True', 'fancy-post-grid' ); ?></label>
                                <span class="toggle-outside">
                                    <span class="toggle-inside"></span>
                                </span>                            
                            </div>
                        </div>
                    </div>

                    <div class="fpg-post-select-main fpg-post-box">                                                                    
                        <!-- Auto Play Speed (ms) -->
                        
                        <div class="fpg-container">
                            <label for="fancy_autoplay"><?php esc_html_e( 'Auto Play Speed (ms):', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_autoplay" name="fancy_autoplay" style="width: 100%;">
                                <?php for ( $i = 1000; $i <= 10000; $i += 1000 ) : ?>
                                    <option value="<?php echo esc_attr( $i ); ?>" <?php selected( $fancy_autoplay, $i ); ?>>
                                        <?php echo esc_html( $i . ' ms' ); ?>
                                    </option>
                                <?php endfor; ?>
                            </select>
                        </div>

                        <div class="fpg-container">
                            <label for="fancy_spacebetween"><?php esc_html_e( 'Slider Item Gap :', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fancy_spacebetween" name="fancy_spacebetween" value="<?php echo esc_attr( $fancy_spacebetween ); ?>" placeholder="10" />
                        </div>
                    </div>
                </fieldset>
            </div>

            <!-- Pagination Slider Option -->
            <div class="fpg-slider-option fpg-common" id="fpg_slider_pagination_option">
                <fieldset>
                    <legend><?php esc_html_e( 'Pagination Option:', 'fancy-post-grid' ); ?></legend>
                    <!-- Title Tag Select -->
                        <div class="fpg-post-select">
                            <label for="fpg_pagination_slider"><?php esc_html_e( 'Pagination Type:', 'fancy-post-grid' ); ?></label>
                            <select id="fpg_pagination_slider" name="fpg_pagination_slider" style="width: 100%;">
                                <option value="normal" <?php selected( $fpg_pagination_slider, 'normal' ); ?>><?php esc_html_e( 'Pagination', 'fancy-post-grid' ); ?></option>
                                <option value="dynamic" <?php selected( $fpg_pagination_slider, 'dynamic' ); ?>><?php esc_html_e( 'Pagination dynamic', 'fancy-post-grid' ); ?></option>
                                <option value="progress" <?php selected( $fpg_pagination_slider, 'progress' ); ?>><?php esc_html_e( 'Pagination progress', 'fancy-post-grid' ); ?></option>
                                <option value="fraction" <?php selected( $fpg_pagination_slider, 'fraction' ); ?>><?php esc_html_e( 'Pagination fraction', 'fancy-post-grid' ); ?></option>
                                
                            </select>
                        </div>
                </fieldset>
            </div>

            <!-- Pagination -->
            <div class="fpg-pagination fpg-common" id="fpg_pagination">
                <fieldset>
                    <legend><?php esc_html_e( 'Pagination:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-container">
                        <div class="switch switch--horizontal">
                            <input id="fancy_post_pagination_off" type="radio" name="fancy_post_pagination" value="off" <?php checked( $fancy_post_pagination, 'off' ); ?> />
                            <label for="fancy_post_pagination_off"><?php esc_html_e( 'Off', 'fancy-post-grid' ); ?></label>
                            
                            <input id="fancy_post_pagination_on" type="radio" name="fancy_post_pagination" value="on" <?php checked( $fancy_post_pagination, 'on' ); ?> />
                            <label for="fancy_post_pagination_on"><?php esc_html_e( 'On', 'fancy-post-grid' ); ?></label>
                            <span class="toggle-outside">
                                <span class="toggle-inside"></span>
                            </span>                            
                        </div>
                    </div>
                </fieldset>
                <fieldset id="fpg_post_per_page_fieldset">
                    <legend><?php esc_html_e( 'Post Per Page:', 'fancy-post-grid' ); ?></legend>
                    <input type="text" id="fpg_post_per_page" name="fpg_post_per_page" value="<?php echo esc_attr( $fpg_post_per_page ); ?>" placeholder="3" />
                </fieldset>
            </div>
            
            <!-- link-page -->
            <div class="fpg-link-page fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Link To Detail Page:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-container">
                        <div class="switch switch--horizontal">
                            <input id="fancy_link_details_off" type="radio" name="fancy_link_details" value="off" <?php checked( $fancy_link_details, 'off' ); ?> />
                            <label for="fancy_link_details_off"><?php esc_html_e( 'Off', 'fancy-post-grid' ); ?></label>
                            
                            <input id="fancy_link_details_on" type="radio" name="fancy_link_details" value="on" <?php checked( $fancy_link_details, 'on' ); ?> />
                            <label for="fancy_link_details_on"><?php esc_html_e( 'On', 'fancy-post-grid' ); ?></label>
                            <span class="toggle-outside">
                                <span class="toggle-inside"></span>
                            </span>                            
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend><?php esc_html_e( 'Link Target:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-radio-list-wrapper fpg-radio-list">
                        <input type="radio" id="fancy_link_target_same" name="fancy_link_target" value="same" <?php checked( $fancy_link_target, 'same', true ); ?> />
                        <label for="fancy_link_target_same">
                            <span></span>
                            <p><?php esc_html_e( 'Same Window', 'fancy-post-grid' ); ?></p>
                        </label>
                    </div>
                    <div class="fpg-radio-list-wrapper fpg-radio-list">
                        <input type="radio" id="fancy_link_target_new" name="fancy_link_target" value="new" <?php checked( $fancy_link_target, 'new',true ); ?> />
                        <label for="fancy_link_target_new">
                            <span></span>
                            <p><?php esc_html_e( 'New Window', 'fancy-post-grid' ); ?></p>
                        </label>
                    </div>
                </fieldset>   
            </div>
        </div>
        
        <div id="tab-2" class="fpg-tab-content">
            <div class="fpg-field-selection fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Field Selection', 'fancy-post-grid' ); ?></legend>

                    <!-- Field Group Checkboxes -->
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_title_main">
                        <input type="checkbox" id="fpg_field_group_title" name="fpg_field_group_title" value="1" <?php checked( $fpg_field_group_title, '1' ); ?> />
                        <label for="fpg_field_group_title">
                            <span></span>
                            <?php esc_html_e( 'Title', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_excerpt_main">
                        <input type="checkbox" id="fpg_field_group_excerpt" name="fpg_field_group_excerpt" value="1" <?php checked( $fpg_field_group_excerpt, '1' ); ?> />
                        <label for="fpg_field_group_excerpt">
                            <span></span>
                            <?php esc_html_e( 'Excerpt', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_button_main">
                        <input type="checkbox" id="fpg_field_group_read_more" name="fpg_field_group_read_more" value="1" <?php checked( $fpg_field_group_read_more, '1' ); ?> />
                        <label for="fpg_field_group_read_more">
                            <span></span>
                            <?php esc_html_e( 'Button', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_image_main">
                        <input type="checkbox" id="fpg_field_group_image" name="fpg_field_group_image" value="1" <?php checked( $fpg_field_group_image, '1' ); ?> />
                        <label for="fpg_field_group_image">
                            <span></span>
                            <?php esc_html_e( 'Image', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_post_date_main">
                        <input type="checkbox" id="fpg_field_group_post_date" name="fpg_field_group_post_date" value="1" <?php checked( $fpg_field_group_post_date, '1' ); ?> />
                        <label for="fpg_field_group_post_date">
                            <span></span>
                            <?php esc_html_e( 'Post Date', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_author_main">
                        <input type="checkbox" id="fpg_field_group_author" name="fpg_field_group_author" value="1" <?php checked( $fpg_field_group_author, '1' ); ?> />
                        <label for="fpg_field_group_author">
                            <span></span>
                            <?php esc_html_e( 'Author', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_categories_main">
                        <input type="checkbox" id="fpg_field_group_categories" name="fpg_field_group_categories" value="1" <?php checked( $fpg_field_group_categories, '1' ); ?> />
                        <label for="fpg_field_group_categories">
                            <span></span>
                            <?php esc_html_e( 'Categories', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_tag_main">
                        <input type="checkbox" id="fpg_field_group_tag" name="fpg_field_group_tag" value="1" <?php checked( $fpg_field_group_tag, '1' ); ?> />
                        <label for="fpg_field_group_tag">                            
                            <span></span>
                            <?php esc_html_e( 'Tags', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                    <div class="fpg-field-group fpg-common" id="fpg_field_group_comment_count_main">
                        <input type="checkbox" id="fpg_field_group_comment_count" name="fpg_field_group_comment_count" value="1" <?php checked( $fpg_field_group_comment_count, '1' ); ?> />
                        <label for="fpg_field_group_comment_count">
                            <span></span>
                            <?php esc_html_e( 'Comment Count', 'fancy-post-grid' ); ?>
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>

        <div id="tab-3" class="fpg-tab-content active">
            
            <!-- Layout Type -->
            <div class="fpg-post-type fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Post Type:', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select">
                        <label for="fancy_post_type"><?php esc_html_e( 'Type:', 'fancy-post-grid' ); ?></label>
                        <select id="fancy_post_type" name="fancy_post_type" style="width: 23%;">
                            <option value="post" <?php selected( $fancy_post_type, 'post' ); ?>><?php esc_html_e( 'Post', 'fancy-post-grid' ); ?></option>
                            
                        </select>
                    </div> 
                </fieldset>
            </div>

            <!-- Filters -->
            <div class="fpg-common-filters fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Common Filters:', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-common-filters-box">
                        <div class="fpg-margin-box">
                            <label for="fpg_include_only"><?php esc_html_e( 'Include only:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_include_only" name="fpg_include_only" value="<?php echo esc_attr( $fpg_include_only ); ?>" placeholder="1,2,3" />
                            <p><?php esc_html_e( 'List of post IDs to show (comma-separated values, for example: 1,2,3)', 'fancy-post-grid' ); ?></p>
                        </div> 

                        <div class="fpg-margin-box">
                            <label for="fpg_exclude"><?php esc_html_e( 'Exclude:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_exclude" name="fpg_exclude" value="<?php echo esc_attr( $fpg_exclude ); ?>" placeholder="1,2,3" />
                            <p><?php esc_html_e( 'List of post IDs to hide (comma-separated values, for example: 1,2,3)', 'fancy-post-grid' ); ?></p>
                        </div> 

                        <div class="fpg-margin-box">
                            <label for="fpg_limit"><?php esc_html_e( 'Limit:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_limit" name="fpg_limit" value="<?php echo esc_attr( $fpg_limit ); ?>" placeholder="5" />
                            <p><?php esc_html_e( 'The number of posts to show. Set empty to show all found posts.', 'fancy-post-grid' ); ?></p>
                        </div> 
                    </div> 

                     
                </fieldset>
            </div>

            <!-- Advanced Filters -->
            <div class="fpg-advanced-filters fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Advanced Filters:', 'fancy-post-grid' ); ?></legend>
                        <!-- Taxonomy -->
                        <fieldset>
                            <legend><?php esc_html_e( 'Taxonomy:', 'fancy-post-grid' ); ?></legend>
                            <div class="fpg-field-group fpg-common">
                                <input type="checkbox" id="fpg_field_group_category" name="fpg_field_group_taxonomy[]" value="category" <?php checked( in_array( 'category', (array) $fpg_field_group_taxonomy ) ); ?> />
                                <label for="fpg_field_group_category">
                                    <span></span>
                                    <?php esc_html_e( 'Category', 'fancy-post-grid' ); ?>
                                </label>
                            </div>
                            <div class="fpg-field-group fpg-common">
                                <input type="checkbox" id="fpg_field_group_tags" name="fpg_field_group_taxonomy[]" value="tags" <?php checked( in_array( 'tags', (array) $fpg_field_group_taxonomy ) ); ?> />
                                <label for="fpg_field_group_tags">
                                    <span></span>
                                    <?php esc_html_e( 'Tags', 'fancy-post-grid' ); ?>
                                </label>
                            </div>
                            <fieldset id="fpg-terms">
                                <legend><?php esc_html_e( 'Terms:', 'fancy-post-grid' ); ?></legend>

                                <div class="taxonomy_category">
                                    
                                    <!-- Category Terms -->
                                    <div id="fpg_category_terms" class="fpg-terms-select2" style="display: none;">
                                        <label for="fpg_filter_category_terms"><?php esc_html_e( 'Select Categories:', 'fancy-post-grid' ); ?></label>
                                        <select id="fpg_filter_category_terms" name="fpg_filter_category_terms[]" multiple="multiple" style="width: 100%;">
                                            <?php
                                            $categories = get_categories( array(
                                                'hide_empty' => false,
                                            ) );
                                            foreach ( $categories as $category ) {
                                                echo '<option value="' . esc_attr( $category->term_id ) . '" ' . (in_array( $category->term_id, (array) $fpg_filter_category_terms ) ? 'selected="selected"' : '') . '>' . esc_html( $category->name ) . '</option>';
                                            }
                                            ?>
                                        </select>
                                    </div>

                                    <!-- Category Operator -->
                                    <div id="fpg_category_operator" class="fpg-terms-select2" style="display: none;">
                                        <label for="fpg_category_operator"><?php esc_html_e( 'Category Operator:', 'fancy-post-grid' ); ?></label>
                                        <select id="fpg_category_operator" name="fpg_category_operator" style="width: 100%;">
                                            <option value="IN" <?php selected( $fpg_category_operator, 'IN' ); ?>><?php esc_html_e( 'IN — show posts which associate with one or more of selected terms', 'fancy-post-grid' ); ?></option>
                                            <option value="NOT IN" <?php selected( $fpg_category_operator, 'NOT IN' ); ?>><?php esc_html_e( 'NOT IN — show posts which do not associate with any of selected terms', 'fancy-post-grid' ); ?></option>
                                            <option value="AND" <?php selected( $fpg_category_operator, 'AND' ); ?>><?php esc_html_e( 'AND', 'fancy-post-grid' ); ?></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="taxonomy_tag">
                                    <!-- Tags Terms -->
                                    <div id="fpg_tags_terms" class="fpg-terms-select2" style="display: none;">
                                        <label for="fpg_filter_tags_terms"><?php esc_html_e( 'Select Tags:', 'fancy-post-grid' ); ?></label>
                                        <select id="fpg_filter_tags_terms" name="fpg_filter_tags_terms[]" multiple="multiple" style="width: 100%;">
                                            <?php
                                            $tags = get_tags( array(
                                                'hide_empty' => false,
                                            ) );
                                            foreach ( $tags as $tag ) {
                                                echo '<option value="' . esc_attr( $tag->term_id ) . '" ' . (in_array( $tag->term_id, (array) $fpg_filter_tags_terms ) ? 'selected="selected"' : '') . '>' . esc_html( $tag->name ) . '</option>';
                                            }
                                            ?>
                                        </select>
                                    </div>

                                    <!-- Tags Operator -->
                                    <div id="fpg_tags_operator" class="fpg-terms-select2" style="display: none;">
                                        <label for="fpg_tags_operator"><?php esc_html_e( 'Tags Operator:', 'fancy-post-grid' ); ?></label>
                                        <select id="fpg_tags_operator" name="fpg_tags_operator" style="width: 100%;">
                                            <option value="IN" <?php selected( $fpg_tags_operator, 'IN' ); ?>><?php esc_html_e( 'IN — show posts which associate with one or more of selected terms', 'fancy-post-grid' ); ?></option>
                                            <option value="NOT IN" <?php selected( $fpg_tags_operator, 'NOT IN' ); ?>><?php esc_html_e( 'NOT IN — show posts which do not associate with any of selected terms', 'fancy-post-grid' ); ?></option>
                                            <option value="AND" <?php selected( $fpg_tags_operator, 'AND' ); ?>><?php esc_html_e( 'AND — show posts which associate with all of selected terms', 'fancy-post-grid' ); ?></option>
                                        </select>
                                    </div>
                                </div>

                            </fieldset>    
                            <!-- Relation -->
                            <div id="fpg_relation" class="fpg-terms-select2" style="display: none;">
                                <label for="fpg_relation"><?php esc_html_e( 'Relation:', 'fancy-post-grid' ); ?></label>
                                <select id="fpg_relation" name="fpg_relation" style="width: 100%;">
                                    <option value="OR" <?php selected( $fpg_relation, 'OR' ); ?>><?php esc_html_e( 'OR — show posts which match one or more settings', 'fancy-post-grid' ); ?></option>
                                    
                                    <option value="AND" <?php selected( $fpg_relation, 'AND' ); ?>><?php esc_html_e( 'AND — show posts which match all settings', 'fancy-post-grid' ); ?></option>
                                </select>
                            </div>
                        </fieldset> 
                        <!-- Order  -->
                        <fieldset>
                            <legend><?php esc_html_e( 'Order:', 'fancy-post-grid' ); ?></legend>
                            <div class="fpg-common-order-box">

                                <!-- Order By -->
                                <div class="fpg-order-by fpg-common">
                                    <label for="fpg_order_by"><?php esc_html_e( 'Order By:', 'fancy-post-grid' ); ?></label>
                                    <select id="fpg_order_by" name="fpg_order_by" style="width: 100%;">
                                        <option value="title" <?php selected( $fpg_order_by, 'title' ); ?>><?php esc_html_e( 'Title', 'fancy-post-grid' ); ?></option>
                                        <option value="date" <?php selected( $fpg_order_by, 'date' ); ?>><?php esc_html_e( 'Create Date', 'fancy-post-grid' ); ?></option>
                                        <option value="modified" <?php selected( $fpg_order_by, 'modified' ); ?>><?php esc_html_e( 'Modified Date', 'fancy-post-grid' ); ?></option>
                                        <option value="menu_order" <?php selected( $fpg_order_by, 'menu_order' ); ?>><?php esc_html_e( 'Menu Order', 'fancy-post-grid' ); ?></option>
                                    </select>
                                </div>

                                <!-- Order -->
                                <div class="fpg-order fpg-common">
                                    <label for="fpg_order"><?php esc_html_e( 'Order:', 'fancy-post-grid' ); ?></label>
                                    <select id="fpg_order" name="fpg_order" style="width: 100%;">
                                        <option value="ASC" <?php selected( $fpg_order, 'ASC' ); ?>><?php esc_html_e( 'Ascending', 'fancy-post-grid' ); ?></option>
                                        <option value="DESC" <?php selected( $fpg_order, 'DESC' ); ?>><?php esc_html_e( 'Descending', 'fancy-post-grid' ); ?></option>
                                    </select>
                                </div>

                            </div>
                        </fieldset>   
                        <!-- Author  -->
                        <fieldset>
                            <legend><?php esc_html_e( 'Author:', 'fancy-post-grid' ); ?></legend>
                            <!-- Author Terms -->
                            <div id="fpg_author_terms" class="fpg-terms-select2">
                                <label for="fpg_filter_authors"><?php esc_html_e( 'Select Authors:', 'fancy-post-grid' ); ?></label>
                                <select id="fpg_filter_authors" name="fpg_filter_authors[]" multiple="multiple" style="width: 100%;">
                                    <?php
                                    $authors = get_users( array(
                                        'who' => 'authors',
                                    ) );
                                    foreach ( $authors as $author ) {
                                        echo '<option value="' . esc_attr( $author->ID ) . '" ' . (in_array( $author->ID, (array) $fpg_filter_authors ) ? 'selected="selected"' : '') . '>' . esc_html( $author->display_name ) . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </fieldset> 
                        <!-- Status Terms -->
                        
                        <fieldset>
                            <legend><?php esc_html_e( 'Status:', 'fancy-post-grid' ); ?></legend>
                            <div id="fpg_status_terms" class="fpg-terms-select2">
                                <label for="fpg_filter_statuses"><?php esc_html_e( 'Select Statuses:', 'fancy-post-grid' ); ?></label>
                                <select id="fpg_filter_statuses" name="fpg_filter_statuses[]" multiple="multiple" style="width: 100%;">
                                    <?php
                                    // Ensure $fpg_filter_statuses is properly initialized
                                    $fpg_filter_statuses = isset($fpg_filter_statuses) ? (array) $fpg_filter_statuses : array();

                                    // Define available statuses
                                    $statuses = array(
                                        'publish' => 'Published',
                                        'pending' => 'Pending',
                                        'draft' => 'Draft',
                                        'private' => 'Private',
                                        'trash' => 'Trash',
                                        'auto-draft' => 'Auto Draft',
                                    );

                                    // Loop through statuses and output options
                                    foreach ( $statuses as $status => $label ) {
                                        echo '<option value="' . esc_attr( $status ) . '" ' . selected( in_array( $status, $fpg_filter_statuses ), true, false ) . '>' . esc_html( $label ) . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </fieldset> 
                        
                        
                </fieldset>                  
            </div>
        </div>

        <div id="tab-4" class="fpg-tab-content">      

            <div class="fpg-content-settings fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Content Box Settings', 'fancy-post-grid' ); ?></legend>
                    <!-- Main Box Alignment -->
                    <div class="fpg-main-box-alignment fpg-common">
                        <label for="fancy_post_main_box_alignment"><?php esc_html_e('Main Box Alignment:', 'fancy-post-grid'); ?></label>
                        <div class="fpg-container">
                            <div class="fpg-radio-list-wrapper fpg-radio-list">
                                <input type="radio" id="fancy_post_main_box_alignment_left" name="fancy_post_main_box_alignment" value="align-start" <?php checked($fancy_post_main_box_alignment, 'align-start', true); ?> />
                                <label for="fancy_post_main_box_alignment_left">
                                    <span></span>
                                    <p><?php esc_html_e('Left', 'fancy-post-grid'); ?></p>
                                </label>
                            </div>
                            <div class="fpg-radio-list-wrapper fpg-radio-list">
                                <input type="radio" id="fancy_post_main_box_alignment_center" name="fancy_post_main_box_alignment" value="align-center" <?php checked($fancy_post_main_box_alignment, 'align-center', true); ?> />
                                <label for="fancy_post_main_box_alignment_center">
                                    <span></span>
                                    <p><?php esc_html_e('Center', 'fancy-post-grid'); ?></p>
                                </label>
                            </div>
                            <div class="fpg-radio-list-wrapper fpg-radio-list">
                                <input type="radio" id="fancy_post_main_box_alignment_right" name="fancy_post_main_box_alignment" value="align-end" <?php checked($fancy_post_main_box_alignment, 'align-end', true); ?> />
                                <label for="fancy_post_main_box_alignment_right">
                                    <span></span>
                                    <p><?php esc_html_e('Right', 'fancy-post-grid'); ?></p>
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>  

            <div class="fpg-filter-settings fpg-common" id="fpg_filter_settings">
                <fieldset>
                    <legend><?php esc_html_e('Filter Box Settings', 'fancy-post-grid'); ?></legend>
                    <div class="fpg-post-select-main">
                        <!-- Filter Alignment -->
                        <div class="fpg-filter-align">
                            <label for="fancy_post_filter_alignment"><?php esc_html_e('Filter Alignment:', 'fancy-post-grid'); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_filter_alignment_left" name="fancy_post_filter_alignment" value="flex-start" <?php checked($fancy_post_filter_alignment, 'flex-start', true); ?> />
                                    <label for="fancy_post_filter_alignment_left">
                                        <span></span>
                                        <p><?php esc_html_e('Left', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_filter_alignment_center" name="fancy_post_filter_alignment" value="center" <?php checked($fancy_post_filter_alignment, 'center', true); ?> />
                                    <label for="fancy_post_filter_alignment_center">
                                        <span></span>
                                        <p><?php esc_html_e('Center', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_filter_alignment_right" name="fancy_post_filter_alignment" value="flex-end" <?php checked($fancy_post_filter_alignment, 'flex-end', true); ?> />
                                    <label for="fancy_post_filter_alignment_right">
                                        <span></span>
                                        <p><?php esc_html_e('Right', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- Filter Text -->
                        <div class="fpg-text-box">
                            <label for="fancy_post_filter_text"><?php esc_html_e('Filter Text:', 'fancy-post-grid'); ?></label>
                            <input type="text" id="fancy_post_filter_text" name="fancy_post_filter_text" value="<?php echo esc_attr($fancy_post_filter_text); ?>" />
                        </div>
                        <!-- Filter Text Color -->
                        <div class="fpg-color-box">
                            <label for="fancy_post_filter_text_color"><?php esc_html_e('Filter Text Color:', 'fancy-post-grid'); ?></label>
                            <input type="text" class="color-field" id="fancy_post_filter_text_color" name="fancy_post_filter_text_color" value="<?php echo esc_attr($fancy_post_filter_text_color); ?>" />
                        </div>

                        <!-- Filter Background Color -->
                        <div class="fpg-color-box">
                            <label for="fancy_post_filter_bg_color"><?php esc_html_e('Filter Background Color:', 'fancy-post-grid'); ?></label>
                            <input type="text" class="color-field" id="fancy_post_filter_bg_color" name="fancy_post_filter_bg_color" value="<?php echo esc_attr($fancy_post_filter_bg_color); ?>" />
                        </div>

                        <!-- Filter Active Color -->
                        <div class="fpg-color-box">
                            <label for="fancy_post_filter_active_color"><?php esc_html_e('Active Text Color:', 'fancy-post-grid'); ?></label>
                            <input type="text" class="color-field" id="fancy_post_filter_active_color" name="fancy_post_filter_active_color" value="<?php echo esc_attr($fancy_post_filter_active_color); ?>" />
                        </div>

                        <!-- Filter Active Hover Color -->
                        <div class="fpg-color-box">
                            <label for="fancy_post_filter_active_hover_color"><?php esc_html_e('Active Hover Text Color:', 'fancy-post-grid'); ?></label>
                            <input type="text" class="color-field" id="fancy_post_filter_active_hover_color" name="fancy_post_filter_active_hover_color" value="<?php echo esc_attr($fancy_post_filter_active_hover_color); ?>" />
                        </div>

                        <!-- Filter Hover Text Color -->
                        <div class="fpg-color-box">
                            <label for="fancy_post_filter_hover_color"><?php esc_html_e('Hover Text Color:', 'fancy-post-grid'); ?></label>
                            <input type="text" class="color-field" id="fancy_post_filter_hover_color" name="fancy_post_filter_hover_color" value="<?php echo esc_attr($fancy_post_filter_hover_color); ?>" />
                        </div>

                        <!-- Filter Hover Background Color -->
                        <div class="fpg-color-box">
                            <label for="fancy_post_filter_hover_bg_color"><?php esc_html_e('Hover Background Color:', 'fancy-post-grid'); ?></label>
                            <input type="text" class="color-field" id="fancy_post_filter_hover_bg_color" name="fancy_post_filter_hover_bg_color" value="<?php echo esc_attr($fancy_post_filter_hover_bg_color); ?>" />
                        </div>

                        

                        <!-- Filter Padding -->
                        <div class="fpg-filter-padding fpg-common">
                            <label for="fancy_post_filter_padding"><?php esc_html_e('Filter Padding (px):', 'fancy-post-grid'); ?></label>
                            <input type="number" id="fancy_post_filter_padding" name="fancy_post_filter_padding" value="<?php echo esc_attr($fancy_post_filter_padding); ?>" />
                        </div>

                        <!-- Filter Margin -->
                        <div class="fpg-filter-margin fpg-common">
                            <label for="fancy_post_filter_margin"><?php esc_html_e('Filter Margin (px):', 'fancy-post-grid'); ?></label>
                            <input type="number" id="fancy_post_filter_margin" name="fancy_post_filter_margin" value="<?php echo esc_attr($fancy_post_filter_margin); ?>" />
                        </div>

                        <!-- Filter Font Size -->
                        <div class="fpg-filter-font-size fpg-common">
                            <label for="fancy_post_filter_font_size"><?php esc_html_e('Filter Font Size (px):', 'fancy-post-grid'); ?></label>
                            <input type="number" id="fancy_post_filter_font_size" name="fancy_post_filter_font_size" value="<?php echo esc_attr($fancy_post_filter_font_size); ?>" />
                        </div>
                    </div>
                </fieldset>
            </div>

            <div class="fpg-image-settings fpg-common" id="fpg_image_settings_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Image Settings', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                        <!-- Hide Feature Image -->
                        <div class="fpg-hide-feature-image fpg-common">                       
                            <label><?php esc_html_e( 'Feature Image', 'fancy-post-grid' ); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_hide_feature_image_off" name="fancy_post_hide_feature_image" value="off" <?php checked( $fancy_post_hide_feature_image, 'off', true ); ?> />
                                    <label for="fancy_post_hide_feature_image_off">
                                        <span></span>
                                        <p><?php esc_html_e( 'Off', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_hide_feature_image_on" name="fancy_post_hide_feature_image" value="on" <?php checked( $fancy_post_hide_feature_image, 'on',true ); ?> />
                                    <label for="fancy_post_hide_feature_image_on">
                                        <span></span>
                                        <p><?php esc_html_e( 'On', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                            </div>                       
                        </div>
                        
                        <!-- Feature Image Size -->  
                        <div id="fpg_feature_image_size">                     
                            <div class="fpg-feature-image-size fpg-common" id="fpg-feature-image-size">
                                <label for="fancy_post_feature_image_size"><?php esc_html_e( 'Feature Image Size:', 'fancy-post-grid' ); ?></label>
                                <select id="fancy_post_feature_image_size" name="fancy_post_feature_image_size" style="width: 100%;">
                                    <?php 
                                    $sizes = [
                                        'thumbnail' => 'Thumbnail',
                                        'medium' => 'Medium',
                                        'medium_large' => 'Medium Large',
                                        'large' => 'Large',
                                        'full' => 'Full', 
                                        'fancy_post_custom_size' => 'Custom Size (768x500)',  
                                        'fancy_post_square' => 'Square (500x500)', 
                                        'fancy_post_landscape' => 'Landscape (834x550)', 
                                        'fancy_post_portrait' => 'Portrait (421x550)', 
                                    ];
                                    foreach ($sizes as $size_key => $size_label) {
                                        echo '<option value="' . esc_attr($size_key) . '" ' . selected($fancy_post_feature_image_size, $size_key, false) . '>' . esc_html($size_label) . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <!-- Left Side Featured Image -->
                        <div class="fpg-feature-image-position fpg-common" id="fpg-feature-image-left">
                            <label for="fancy_post_feature_image_left"><?php esc_html_e( 'Left Side Featured Image:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_feature_image_left" name="fancy_post_feature_image_left" style="width: 100%;">
                                <?php 
                                $sizes = [
                                    'thumbnail' => 'Thumbnail',
                                    'medium' => 'Medium',
                                    'medium_large' => 'Medium Large',
                                    'large' => 'Large',
                                    'full' => 'Full', 
                                    'fancy_post_custom_size' => 'Custom Size (768x500)',  
                                    'fancy_post_square' => 'Square (500x500)', 
                                    'fancy_post_landscape' => 'Landscape (834x550)', 
                                    'fancy_post_portrait' => 'Portrait (421x550)', 
                                ];
                                foreach ($sizes as $size_key => $size_label) {
                                    echo '<option value="' . esc_attr($size_key) . '" ' . selected($fancy_post_feature_image_left, $size_key, false) . '>' . esc_html($size_label) . '</option>';
                                }
                                ?>
                            </select>
                        </div>

                        <!-- Right Side Featured Image -->
                        <div class="fpg-feature-image-position fpg-common" id="fpg-feature-image-right">
                            <label for="fancy_post_feature_image_right"><?php esc_html_e( 'Right Side Featured Image:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_feature_image_right" name="fancy_post_feature_image_right" style="width: 100%;">
                                <?php 
                                $sizes = [
                                    'thumbnail' => 'Thumbnail',
                                    'medium' => 'Medium',
                                    'medium_large' => 'Medium Large',
                                    'large' => 'Large',
                                    'full' => 'Full', 
                                    'fancy_post_custom_size' => 'Custom Size (768x500)',  
                                    'fancy_post_square' => 'Square (500x500)', 
                                    'fancy_post_landscape' => 'Landscape (834x550)', 
                                    'fancy_post_portrait' => 'Portrait (421x550)', 
                                ];
                                foreach ($sizes as $size_key => $size_label) {
                                    echo '<option value="' . esc_attr($size_key) . '" ' . selected($fancy_post_feature_image_right, $size_key, false) . '>' . esc_html($size_label) . '</option>';
                                }
                                ?>
                            </select>
                        </div>
                        <!-- Media Source -->
                        <div class="fpg-media-source fpg-common" id="fpg-media-source">
                            
                            <label><?php esc_html_e( 'Media Source', 'fancy-post-grid' ); ?></label>
                            
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_media_source_feature_image" name="fancy_post_media_source" value="feature_image" <?php checked( $fancy_post_media_source, 'feature_image', true ); ?> />
                                    <label for="fancy_post_media_source_feature_image">
                                        <span></span>
                                        <p><?php esc_html_e( 'Feature Image', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_media_source_first_image" name="fancy_post_media_source" value="first_image" <?php checked( $fancy_post_media_source, 'first_image',true ); ?> />
                                    <label for="fancy_post_media_source_first_image">
                                        <span></span>
                                        <p><?php esc_html_e( 'First Image From Content', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                            </div>                      
                        </div>

                        <!-- Hover Animation -->
                        <div class="fpg-hover-animation fpg-common" id="fpg-hover-animation">
                            <label for="fancy_post_hover_animation"><?php esc_html_e( 'Hover Animation:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_hover_animation" name="fancy_post_hover_animation" style="width: 100%;">
                                <option value="none" <?php selected( $fancy_post_hover_animation, 'none' ); ?>><?php esc_html_e( 'None', 'fancy-post-grid' ); ?></option>
                                <option value="zoom_in" <?php selected( $fancy_post_hover_animation, 'zoom_in' ); ?>><?php esc_html_e( 'Zoom In', 'fancy-post-grid' ); ?></option>
                                <option value="zoom_out" <?php selected( $fancy_post_hover_animation, 'zoom_out' ); ?>><?php esc_html_e( 'Zoom Out', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>
                        <!-- Border Radius -->
                        <div class="fpg-image-border-radius fpg-common" id="fpg_image_border_radius_main">

                            <label for="fancy_post_image_border_radius"><?php esc_html_e( 'Border Radius:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_image_border_radius" name="fancy_post_image_border_radius" value="<?php echo esc_attr( $fancy_post_image_border_radius ); ?>" placeholder="e.g., 2px 3px 4px 5px" />
                        </div>
                    </div>    
                </fieldset>
            </div>

            <div class="fpg-meta-settings fpg-common" id="fpg_meta_settings_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Meta Settings', 'fancy-post-grid' ); ?></legend>
                        <!-- Meta Alignment -->
                        <div class="fpg-meta-alignment fpg-common">
                            <label for="fancy_post_meta_alignment"><?php esc_html_e('Meta Alignment:', 'fancy-post-grid'); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_meta_alignment_default" name="fancy_post_meta_alignment" value="default" <?php checked($fancy_post_meta_alignment, 'default', true); ?> />
                                    <label for="fancy_post_meta_alignment_default">
                                        <span></span>
                                        <p><?php esc_html_e('Default', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_meta_alignment_left" name="fancy_post_meta_alignment" value="align-start" <?php checked($fancy_post_meta_alignment, 'align-start', true); ?> />
                                    <label for="fancy_post_meta_alignment_left">
                                        <span></span>
                                        <p><?php esc_html_e('Left', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_meta_alignment_center" name="fancy_post_meta_alignment" value="align-center" <?php checked($fancy_post_meta_alignment, 'align-center', true); ?> />
                                    <label for="fancy_post_meta_alignment_center">
                                        <span></span>
                                        <p><?php esc_html_e('Center', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_meta_alignment_right" name="fancy_post_meta_alignment" value="align-end" <?php checked($fancy_post_meta_alignment, 'align-end', true); ?> />
                                    <label for="fancy_post_meta_alignment_right">
                                        <span></span>
                                        <p><?php esc_html_e('Right', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                </fieldset>
            </div>

            <div class="fpg-title-settings fpg-common" id="fpg_title_settings_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Title Settings', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                        <!-- Title Tag Select -->
                        <div class="fpg-post-select">
                            <label for="fancy_post_title_tag"><?php esc_html_e( 'Title Tag:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_title_tag" name="fancy_post_title_tag" style="width: 100%;">
                                <option value="h1" <?php selected( $fancy_post_title_tag, 'h1' ); ?>><?php esc_html_e( 'H1', 'fancy-post-grid' ); ?></option>
                                <option value="h2" <?php selected( $fancy_post_title_tag, 'h2' ); ?>><?php esc_html_e( 'H2', 'fancy-post-grid' ); ?></option>
                                <option value="h3" <?php selected( $fancy_post_title_tag, 'h3' ); ?>><?php esc_html_e( 'H3', 'fancy-post-grid' ); ?></option>
                                <option value="h4" <?php selected( $fancy_post_title_tag, 'h4' ); ?>><?php esc_html_e( 'H4', 'fancy-post-grid' ); ?></option>
                                <option value="h5" <?php selected( $fancy_post_title_tag, 'h5' ); ?>><?php esc_html_e( 'H5', 'fancy-post-grid' ); ?></option>
                                <option value="h6" <?php selected( $fancy_post_title_tag, 'h6' ); ?>><?php esc_html_e( 'H6', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>
                        <!-- Title Limit Type -->
                        <div class="fpg-title-limit-type fpg-common">                       
                            <label><?php esc_html_e( 'Title Limit Type', 'fancy-post-grid' ); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_title_limit_type_word" name="fancy_post_title_limit_type" value="words" <?php checked( $fancy_post_title_limit_type, 'words', true ); ?> />
                                    <label for="fancy_post_title_limit_type_word">
                                        <span></span>
                                        <p><?php esc_html_e( 'Word', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_title_limit_type_character" name="fancy_post_title_limit_type" value="characters" <?php checked( $fancy_post_title_limit_type, 'characters', true ); ?> />
                                    <label for="fancy_post_title_limit_type_character">
                                        <span></span>
                                        <p><?php esc_html_e( 'Character', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                            </div>                       
                        </div>
                        <div class="fpg-title-limit fpg-common">
                            <label for="fancy_post_title_limit"><?php esc_html_e( 'Title Limit:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fancy_post_title_limit" name="fancy_post_title_limit" value="<?php echo esc_attr( $fancy_post_title_limit ); ?>" />
                        </div>

                        <div class="fpg-title-more-text fpg-common">
                            <label for="fancy_post_title_more_text"><?php esc_html_e( 'Title More Text:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_title_more_text" name="fancy_post_title_more_text" value="<?php echo esc_attr( $fancy_post_title_more_text ); ?>" placeholder="..." />
                        </div>

                                               
                    </div> 
                    <div class="fpg-post-select-main" id="fpg_title_alignment_main">
                        <!-- Title Alignment -->
                        <div class="fpg-title-alignment fpg-common">
                            <label for="fancy_post_title_alignment"><?php esc_html_e('Title Alignment:', 'fancy-post-grid'); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_title_alignment_default" name="fancy_post_title_alignment" value="default" <?php checked($fancy_post_title_alignment, 'default', true); ?> />
                                    <label for="fancy_post_title_alignment_default">
                                        <span></span>
                                        <p><?php esc_html_e('Default', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_title_alignment_left" name="fancy_post_title_alignment" value="align-start" <?php checked($fancy_post_title_alignment, 'align-start', true); ?> />
                                    <label for="fancy_post_title_alignment_left">
                                        <span></span>
                                        <p><?php esc_html_e('Left', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_title_alignment_center" name="fancy_post_title_alignment" value="align-center" <?php checked($fancy_post_title_alignment, 'align-center', true); ?> />
                                    <label for="fancy_post_title_alignment_center">
                                        <span></span>
                                        <p><?php esc_html_e('Center', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_title_alignment_right" name="fancy_post_title_alignment" value="align-end" <?php checked($fancy_post_title_alignment, 'align-end', true); ?> />
                                    <label for="fancy_post_title_alignment_right">
                                        <span></span>
                                        <p><?php esc_html_e('Right', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                            </div>
                        </div> 
                    </div>   
                </fieldset>
            </div>

            <div class="fpg-excerpt-settings fpg-common" id="fpg_excerpt_setting_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Excerpt Settings', 'fancy-post-grid' ); ?></legend>
                    <div class="fpg-post-select-main">
                        <!-- Excerpt Limit Type -->
                        <div class="fpg-excerpt-limit-type fpg-common">                       
                            <label><?php esc_html_e( 'Excerpt Limit Type', 'fancy-post-grid' ); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_excerpt_limit_type_word" name="fancy_post_excerpt_limit_type" value="words" <?php checked( $fancy_post_excerpt_limit_type, 'words', true ); ?> />
                                    <label for="fancy_post_excerpt_limit_type_word">
                                        <span></span>
                                        <p><?php esc_html_e( 'Word', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_excerpt_limit_type_character" name="fancy_post_excerpt_limit_type" value="characters" <?php checked( $fancy_post_excerpt_limit_type, 'characters', true ); ?> />
                                    <label for="fancy_post_excerpt_limit_type_character">
                                        <span></span>
                                        <p><?php esc_html_e( 'Character', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                            </div>                       
                        </div>
                        <!-- Excerpt Word Limit -->
                        <div class="fpg-excerpt-limit fpg-common">
                            <label for="fancy_post_excerpt_limit"><?php esc_html_e( 'Excerpt Limit:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fancy_post_excerpt_limit" name="fancy_post_excerpt_limit" value="<?php echo esc_attr( $fancy_post_excerpt_limit ); ?>" />
                        </div>        
                        <!-- Excerpt More Text -->
                        <div class="fpg-excerpt-more-text fpg-common">
                            <label for="fancy_post_excerpt_more_text"><?php esc_html_e( 'Excerpt More Text:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_excerpt_more_text" name="fancy_post_excerpt_more_text" value="<?php echo esc_attr( $fancy_post_excerpt_more_text ); ?>" placeholder="..." />
                        </div>
                        <!-- Excerpt Alignment -->
                        <div class="fpg-excerpt-alignment fpg-common">
                            <label for="fancy_post_excerpt_alignment"><?php esc_html_e('Excerpt Alignment:', 'fancy-post-grid'); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_excerpt_alignment_default" name="fancy_post_excerpt_alignment" value="default" <?php checked($fancy_post_excerpt_alignment, 'default', true); ?> />
                                    <label for="fancy_post_excerpt_alignment_default">
                                        <span></span>
                                        <p><?php esc_html_e('Default', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_excerpt_alignment_left" name="fancy_post_excerpt_alignment" value="align-start" <?php checked($fancy_post_excerpt_alignment, 'align-start', true); ?> />
                                    <label for="fancy_post_excerpt_alignment_left">
                                        <span></span>
                                        <p><?php esc_html_e('Left', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_excerpt_alignment_center" name="fancy_post_excerpt_alignment" value="align-center" <?php checked($fancy_post_excerpt_alignment, 'align-center', true); ?> />
                                    <label for="fancy_post_excerpt_alignment_center">
                                        <span></span>
                                        <p><?php esc_html_e('Center', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_excerpt_alignment_right" name="fancy_post_excerpt_alignment" value="align-end" <?php checked($fancy_post_excerpt_alignment, 'align-end', true); ?> />
                                    <label for="fancy_post_excerpt_alignment_right">
                                        <span></span>
                                        <p><?php esc_html_e('Right', 'fancy-post-grid'); ?></p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>    
                </fieldset>
            </div>

            <div class="fpg-read-more-button-settings fpg-common" id="fancy_button_option_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Button Settings', 'fancy-post-grid' ); ?></legend>

                    <div class="fpg-button-option fpg-common" id="fpg-button-option">
                        <label for="fancy_button_option"><?php esc_html_e( 'Button Layout:', 'fancy-post-grid' ); ?></label>
                        <select id="fancy_button_option" name="fancy_button_option">
                            <option value="filled" <?php selected( $fancy_button_option, 'filled' ); ?>><?php esc_html_e( 'Filled', 'fancy-post-grid' ); ?></option>
                            <option value="border" <?php selected( $fancy_button_option, 'border' ); ?>><?php esc_html_e( 'Border', 'fancy-post-grid' ); ?></option>
                            <option value="flat" <?php selected( $fancy_button_option, 'flat' ); ?>><?php esc_html_e( 'Flat', 'fancy-post-grid' ); ?></option>
                        </select>
                    </div>

                    <div class="fpg-post-select-main" id="fpg_post_select_button">
                        <!-- Border Radius -->
                        <div class="fpg-read-more-border-radius fpg-common">
                            <label for="fancy_post_read_more_border_radius"><?php esc_html_e( 'Border Radius:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_read_more_border_radius" name="fancy_post_read_more_border_radius" value="<?php echo esc_attr( $fancy_post_read_more_border_radius ); ?>" placeholder="e.g., 2px 3px 4px 5px" />
                        </div>

                        
                        <!-- Background Color -->
                        <div class="fpg-color-box">
                            <label for="fpg_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_border_color" name="fpg_border_color" value="<?php echo esc_attr( $fpg_border_color ); ?>" />
                        </div> 
                        <!-- Border width -->
                        <div class="fpg-read-more-button-width fpg-common">
                            <label for="fancy_post_button_border_width"><?php esc_html_e( 'Border Width:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_button_border_width" name="fancy_post_button_border_width" value="<?php echo esc_attr( $fancy_post_button_border_width ); ?>"placeholder="e.g., 2px 3px 4px 5px"  />
                        </div>

                        <div class="fpg-button-border-style fpg-common" id="fpg-button-border-style">
                            <label for="fancy_button_border_style"><?php esc_html_e( 'Border Style:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_button_border_style" name="fancy_button_border_style">
                                <option value="unset" <?php selected( $fancy_button_border_style, 'unset' ); ?>><?php esc_html_e( 'Unset', 'fancy-post-grid' ); ?></option>
                                <option value="dotted" <?php selected( $fancy_button_border_style, 'dotted' ); ?>><?php esc_html_e( 'Dotted', 'fancy-post-grid' ); ?></option>
                                <option value="dashed" <?php selected( $fancy_button_border_style, 'dashed' ); ?>><?php esc_html_e( 'Dashed', 'fancy-post-grid' ); ?></option>
                                <option value="solid" <?php selected( $fancy_button_border_style, 'solid' ); ?>><?php esc_html_e( 'Solid', 'fancy-post-grid' ); ?></option>
                                <option value="double" <?php selected( $fancy_button_border_style, 'double' ); ?>><?php esc_html_e( 'Double', 'fancy-post-grid' ); ?></option>
                                <option value="groove" <?php selected( $fancy_button_border_style, 'groove' ); ?>><?php esc_html_e( 'Groove', 'fancy-post-grid' ); ?></option>      
                            </select>
                        </div>
                    </div>  
                    <div class="fpg-post-select-main">
                        <!-- Alignment -->
                        <div class="fpg-read-more-alignment fpg-common" id="fpg-read-more-alignment">
                            
                            <label for="fancy_post_read_more_alignment"><?php esc_html_e( 'Alignment:', 'fancy-post-grid' ); ?></label>
                            <div class="fpg-container">
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_read_more_alignment_default" name="fancy_post_read_more_alignment" value="default" <?php checked( $fancy_post_read_more_alignment, 'default', true ); ?> />
                                    <label for="fancy_post_read_more_alignment_default">
                                        <span></span>
                                        <p><?php esc_html_e( 'Default', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_read_more_alignment_left" name="fancy_post_read_more_alignment" value="align-start" <?php checked( $fancy_post_read_more_alignment, 'align-start', true ); ?> />
                                    <label for="fancy_post_read_more_alignment_left">
                                        <span></span>
                                        <p><?php esc_html_e( 'Left', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_read_more_alignment_center" name="fancy_post_read_more_alignment" value="align-center" <?php checked( $fancy_post_read_more_alignment, 'align-center', true ); ?> />
                                    <label for="fancy_post_read_more_alignment_center">
                                        <span></span>
                                        <p><?php esc_html_e( 'Center', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                                <div class="fpg-radio-list-wrapper fpg-radio-list">
                                    <input type="radio" id="fancy_post_read_more_alignment_right" name="fancy_post_read_more_alignment" value="align-end" <?php checked( $fancy_post_read_more_alignment, 'align-end', true ); ?> />
                                    <label for="fancy_post_read_more_alignment_right">
                                        <span></span>
                                        <p><?php esc_html_e( 'Right', 'fancy-post-grid' ); ?></p>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Button Text -->
                        <div class="fpg-read-more-text fpg-common">
                            <label for="fancy_post_read_more_text"><?php esc_html_e( 'Read More Text:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_read_more_text" name="fancy_post_read_more_text" value="<?php echo esc_attr( $fancy_post_read_more_text ); ?>" />
                        </div>
                    </div>  
                </fieldset>
            </div>

        </div>

        <div id="tab-5" class="fpg-tab-content">
            
            <div class="fancy-post-grid-full-area fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Full Area / Section Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        <!-- Background Color -->
                        <div class="fpg-color-box">
                            <label for="fpg_section_background_color"><?php esc_html_e( 'Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_section_background_color" name="fpg_section_background_color" value="<?php echo esc_attr( $fpg_section_background_color ); ?>" />
                        </div>

                        <!-- Margin -->
                        <div class="fpg-margin-box">
                            <label for="fpg_section_margin"><?php esc_html_e( 'Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_section_margin" name="fpg_section_margin" value="<?php echo esc_attr( $fpg_section_margin ); ?>" placeholder="e.g., 120px 30px 40px 50px" />
                        </div>

                        <!-- Padding -->
                        <div class="fpg-padding-box">
                            <label for="fpg_section_padding"><?php esc_html_e( 'Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_section_padding" name="fpg_section_padding" value="<?php echo esc_attr( $fpg_section_padding ); ?>" placeholder="e.g., 20px 30px 40px 50px" />
                        </div>
                    </div>    
                </fieldset>
            </div>

            <div class="fancy-post-grid-single-area fpg-common">
                <fieldset>
                    <legend><?php esc_html_e( 'Single Area / Section Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        <!-- Background Color -->
                        <div class="fpg-color-box">
                            <label for="fpg_single_section_background_color"><?php esc_html_e( 'Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_single_section_background_color" name="fpg_single_section_background_color" value="<?php echo esc_attr( $fpg_single_section_background_color ); ?>" />
                        </div>

                        <!-- Background hover Color -->
                        <div class="fpg-color-box" id="fpg_section_bg_hover_main">
                            <label for="fpg_single_section_background_hover_color"><?php esc_html_e( 'Background Hover Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_single_section_background_hover_color" name="fpg_single_section_background_hover_color" value="<?php echo esc_attr( $fpg_single_section_background_hover_color ); ?>" />
                        </div>

                        <!-- Image Shape Color -->
                        <div class="fpg-color-box" id="fpg_section_image_shape_main">
                            <label for="fpg_single_image_shape_color"><?php esc_html_e( 'Image Shape Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_single_image_shape_color" name="fpg_single_image_shape_color" value="<?php echo esc_attr( $fpg_single_image_shape_color ); ?>" />
                        </div>
                        
                        <!-- Margin -->
                        <div class="fpg-margin-box">
                            <label for="fpg_single_section_margin"><?php esc_html_e( 'Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_single_section_margin" name="fpg_single_section_margin" value="<?php echo esc_attr( $fpg_single_section_margin ); ?>" placeholder="e.g., 20px 30px 40px 50px" />
                        </div>

                        <!-- Padding -->
                        <div class="fpg-padding-box">
                            <label for="fpg_single_section_padding"><?php esc_html_e( 'Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_single_section_padding" name="fpg_single_section_padding" value="<?php echo esc_attr( $fpg_single_section_padding ); ?>" placeholder="e.g., 10px 15px 20px 25px" />
                        </div>
                        <!-- Content Padding -->
                        <div class="fpg-padding-box" id="fpg_single_content_section_padding_box">
                            <label for="fpg_single_content_section_padding"><?php esc_html_e( 'Content Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_single_content_section_padding" name="fpg_single_content_section_padding" value="<?php echo esc_attr( $fpg_single_content_section_padding ); ?>" placeholder="e.g., 10px 15px 20px 25px" />
                        </div>
                        <!-- Border Color -->
                        <div class="fpg-color-box">
                            <label for="fpg_single_section_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_single_section_border_color" name="fpg_single_section_border_color" value="<?php echo esc_attr( $fpg_single_section_border_color ); ?>" />
                        </div>
                        <!-- Border Width -->
                        <div class="fpg-border-width fpg-common">
                            <label for="fancy_post_border_width"><?php esc_html_e( 'Border Width:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_border_width" name="fancy_post_border_width" value="<?php echo esc_attr( $fancy_post_border_width ); ?>" placeholder="e.g., 2px 3px 4px 5px" />
                        </div>
                        <!-- Border Style -->
                        <div class="fpg-border-style fpg-common">
                            <label for="fancy_post_border_style"><?php esc_html_e( 'Border Style:', 'fancy-post-grid' ); ?></label>
                            <select id="fancy_post_border_style" name="fancy_post_border_style">
                                
                                <option value="unset" <?php selected( $fancy_post_border_style, 'unset' ); ?>><?php esc_html_e( 'Unset', 'fancy-post-grid' ); ?></option>
                                <option value="solid" <?php selected( $fancy_post_border_style, 'solid' ); ?>><?php esc_html_e( 'Solid', 'fancy-post-grid' ); ?></option>
                                <option value="dashed" <?php selected( $fancy_post_border_style, 'dashed' ); ?>><?php esc_html_e( 'Dashed', 'fancy-post-grid' ); ?></option>
                                <option value="dotted" <?php selected( $fancy_post_border_style, 'dotted' ); ?>><?php esc_html_e( 'Dotted', 'fancy-post-grid' ); ?></option>
                                <option value="double" <?php selected( $fancy_post_border_style, 'double' ); ?>><?php esc_html_e( 'Double', 'fancy-post-grid' ); ?></option>
                                <option value="groove" <?php selected( $fancy_post_border_style, 'groove' ); ?>><?php esc_html_e( 'Groove', 'fancy-post-grid' ); ?></option>
                                
                            </select>
                        </div>
                        <!-- Border Radius -->
                        <div class="fpg-section-border-radius fpg-common" id="fpg_section_border_radius_main">
                            <label for="fancy_post_section_border_radius"><?php esc_html_e( 'Border Radius:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fancy_post_section_border_radius" name="fancy_post_section_border_radius" value="<?php echo esc_attr( $fancy_post_section_border_radius ); ?>" placeholder="e.g., 2px 3px 4px 5px" />
                        </div>
                    </div>    
                </fieldset>
            </div>

            <div class="fancy-post-grid-title fpg-common" id="fpg_title_main_part">
                <fieldset>
                    <legend><?php esc_html_e( 'Title Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        <div class="fpg-color-box">
                            <label for="fpg_title_color"><?php esc_html_e( 'Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_title_color" name="fpg_title_color" value="<?php echo esc_attr( $fpg_title_color ); ?>" />
                        </div>
                        <div class="fpg-color-box" id="fpg_title_hover_color_box">
                            <label for="fpg_title_hover_color"><?php esc_html_e( 'Hover Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_title_hover_color" name="fpg_title_hover_color" value="<?php echo esc_attr( $fpg_title_hover_color ); ?>" />
                        </div>
                        <!-- Title Margin -->
                        <div class="fpg-margin-box">
                            <label for="fpg_title_margin"><?php esc_html_e( 'Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_title_margin" name="fpg_title_margin" value="<?php echo esc_attr( $fpg_title_margin ); ?>" placeholder="e.g., 20px 25px 30px 35px" />
                        </div>

                        <!-- Title Padding -->
                        <div class="fpg-padding-box">
                            <label for="fpg_title_padding"><?php esc_html_e( 'Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_title_padding" name="fpg_title_padding" value="<?php echo esc_attr( $fpg_title_padding ); ?>" placeholder="e.g., 10px 15px 20px 25px" />
                        </div>  

                        <div class="fpg-font-size-box">
                            <label for="fpg_title_font_size"><?php esc_html_e( 'Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_title_font_size" name="fpg_title_font_size" value="<?php echo esc_attr( $fpg_title_font_size ); ?>" placeholder="e.g., 50px " />
                        </div>

                        <div class="fpg-font-weight-box">
                            <label for="fpg_title_font_weight"><?php esc_html_e( 'Font Weight:', 'fancy-post-grid' ); ?></label>
                            <select id="fpg_title_font_weight" name="fpg_title_font_weight">
                                <?php 
                                $weights = array( '100', '200', '300', '400', '500', '600', '700', '800', '900' );
                                foreach ( $weights as $weight ) {
                                    echo '<option value="' . esc_attr( $weight ) . '"' . selected( $fpg_title_font_weight, $weight, false ) . '>' . esc_html( $weight ) . '</option>';
                                }
                                ?>
                            </select>
                        </div> 
                        <!-- Title Border Color -->
                        <div class="fpg-color-box">
                            <label for="fpg_title_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_title_border_color" name="fpg_title_border_color" value="<?php echo esc_attr( $fpg_title_border_color ); ?>" />
                        </div>
                        <!-- Title Border Width -->
                        <div class="fpg-border-width fpg-common">
                            <label for="fpg_title_border_width"><?php esc_html_e( 'Border Width:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_title_border_width" name="fpg_title_border_width" value="<?php echo esc_attr( $fpg_title_border_width ); ?>" placeholder="e.g., 2px 3px 4px 5px" />
                        </div>
                        <!-- Title Border Style -->
                        <div class="fpg-border-style fpg-common">
                            <label for="fpg_title_border_style"><?php esc_html_e( 'Border Style:', 'fancy-post-grid' ); ?></label>
                            <select id="fpg_title_border_style" name="fpg_title_border_style">
                                <option value="unset" <?php selected( $fpg_title_border_style, 'unset' ); ?>><?php esc_html_e( 'Unset', 'fancy-post-grid' ); ?></option>
                                <option value="solid" <?php selected( $fpg_title_border_style, 'solid' ); ?>><?php esc_html_e( 'Solid', 'fancy-post-grid' ); ?></option>
                                <option value="dashed" <?php selected( $fpg_title_border_style, 'dashed' ); ?>><?php esc_html_e( 'Dashed', 'fancy-post-grid' ); ?></option>
                                <option value="dotted" <?php selected( $fpg_title_border_style, 'dotted' ); ?>><?php esc_html_e( 'Dotted', 'fancy-post-grid' ); ?></option>
                                <option value="double" <?php selected( $fpg_title_border_style, 'double' ); ?>><?php esc_html_e( 'Double', 'fancy-post-grid' ); ?></option>
                                <option value="groove" <?php selected( $fpg_title_border_style, 'groove' ); ?>><?php esc_html_e( 'Groove', 'fancy-post-grid' ); ?></option>
                            </select>
                        </div>   
                        
                        <div class="fpg-line-height-box">
                            <label for="fpg_title_line_height"><?php esc_html_e( 'Line Height:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_title_line_height" name="fpg_title_line_height" value="<?php echo esc_attr( $fpg_title_line_height ); ?>" placeholder="e.g., 3px"  />
                        </div>
                    </div> 
                </fieldset>
            </div>

            <div class="fancy-post-grid-meta-data fpg-common" id="fpg_meta_data_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Meta Data Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        <div class="fpg-color-box">
                            <label for="fpg_meta_color"><?php esc_html_e( 'Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_meta_color" name="fpg_meta_color" value="<?php echo esc_attr( $fpg_meta_color ); ?>" />
                        </div>
                        

                        <div class="fpg-color-box" id="fpg_meta_hover_color_main">
                            <label for="fpg_meta_hover_color"><?php esc_html_e( 'Hover Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_meta_hover_color" name="fpg_meta_hover_color" value="<?php echo esc_attr( $fpg_meta_hover_color ); ?>" />
                        </div>

                        <div class="fpg-color-box" id="fpg_meta_icon_color_main">
                            <label for="fpg_meta_icon_color"><?php esc_html_e( 'Icon Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_meta_icon_color" name="fpg_meta_icon_color" value="<?php echo esc_attr( $fpg_meta_icon_color ); ?>" />
                        </div>

                        <div class="fpg-color-box" id="fpg_meta_bgcolor_box">
                            <label for="fpg_meta_bgcolor"><?php esc_html_e( 'Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_meta_bgcolor" name="fpg_meta_bgcolor" value="<?php echo esc_attr( $fpg_meta_bgcolor ); ?>" />
                        </div>

                        <div class="fpg-font-size-box">
                            <label for="fpg_meta_size"><?php esc_html_e( 'Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_meta_size" name="fpg_meta_size"  value="<?php echo esc_attr( $fpg_meta_size ); ?>" placeholder="e.g., 20px " />
                        </div>

                        <div class="fpg-font-weight-box">
                            <label for="fpg_meta_font_weight"><?php esc_html_e( 'Font Weight:', 'fancy-post-grid' ); ?></label>
                            <select id="fpg_meta_font_weight" name="fpg_meta_font_weight">
                                <?php 
                                $weights = array( '100', '200', '300', '400', '500', '600', '700', '800', '900' );
                                foreach ( $weights as $weight ) {
                                    echo '<option value="' . esc_attr( $weight ) . '"' . selected( $fpg_meta_font_weight, $weight, false ) . '>' . esc_html( $weight ) . '</option>';
                                }
                                ?>
                            </select>
                        </div>  

                        <!-- Meta Margin -->
                        <div class="fpg-margin-box">
                            <label for="fpg_meta_margin"><?php esc_html_e( 'Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_meta_margin" name="fpg_meta_margin" value="<?php echo esc_attr( $fpg_meta_margin ); ?>" placeholder="e.g., 10px 15px 20px 25px" />
                        </div>

                        <!-- Meta Padding -->
                        <div class="fpg-padding-box">
                            <label for="fpg_meta_padding"><?php esc_html_e( 'Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_meta_padding" name="fpg_meta_padding" value="<?php echo esc_attr( $fpg_meta_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                        </div>

                        <!-- Meta Gap -->
                        <div class="fpg-gap-box" id="fpg_meta_gap_main">
                            <label for="fpg_meta_gap"><?php esc_html_e( 'Gap (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_meta_gap" name="fpg_meta_gap" value="<?php echo esc_attr( $fpg_meta_gap ); ?>" placeholder="e.g., 5px 10px" />
                        </div>  

                        <div class="fpg-line-height-box">
                            <label for="fpg_meta_line_height"><?php esc_html_e( 'Line Height:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_meta_line_height" name="fpg_meta_line_height" value="<?php echo esc_attr( $fpg_meta_line_height ); ?>" placeholder="e.g., 3px" />
                        </div>

                        <!-- Author Color -->
                        <div class="fpg-color-box" id="fpg_author_color_main">
                            <label for="fpg_author_color"><?php esc_html_e( 'Author Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_author_color" name="fpg_author_color" value="<?php echo esc_attr( $fpg_author_color ); ?>" />
                        </div>

                        <!-- Author Background Color -->
                        <div class="fpg-color-box" id="fpg_author_bg_color_main">
                            <label for="fpg_author_bg_color"><?php esc_html_e( 'Author Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_author_bg_color" name="fpg_author_bg_color" value="<?php echo esc_attr( $fpg_author_bg_color ); ?>" />
                        </div>

                        <!-- Author Padding -->
                        <div class="fpg-padding-box" id="fpg_author_padding_main">
                            <label for="fpg_author_padding"><?php esc_html_e( 'Author Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_author_padding" name="fpg_author_padding" value="<?php echo esc_attr( $fpg_author_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                        </div> 

                        <!-- Category Fields -->
                        <div class="fpg-color-box" id="fpg_category_color_main">
                            <label for="fpg_category_color"><?php esc_html_e( 'Category Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_category_color" name="fpg_category_color" value="<?php echo esc_attr( $fpg_category_color ); ?>" />
                        </div>

                        <div class="fpg-color-box" id="fpg_category_bg_color_main">
                            <label for="fpg_category_bg_color"><?php esc_html_e( 'Category Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_category_bg_color" name="fpg_category_bg_color" value="<?php echo esc_attr( $fpg_category_bg_color ); ?>" />
                        </div>

                        <div class="fpg-padding-box" id="fpg_category_padding_main">
                            <label for="fpg_category_padding"><?php esc_html_e( 'Category Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_category_padding" name="fpg_category_padding" value="<?php echo esc_attr( $fpg_category_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                        </div>   

                        <!-- Category Fields -->
                        <div class="fpg-color-box" id="fpg_date_color_main">
                            <label for="fpg_date_color"><?php esc_html_e( 'Date Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_date_color" name="fpg_date_color" value="<?php echo esc_attr( $fpg_date_color ); ?>" />
                        </div>

                        <div class="fpg-color-box" id="fpg_date_bg_color_main">
                            <label for="fpg_date_bg_color"><?php esc_html_e( 'Date Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_date_bg_color" name="fpg_date_bg_color" value="<?php echo esc_attr( $fpg_date_bg_color ); ?>" />
                        </div>

                        <div class="fpg-padding-box" id="fpg_date_padding_main">
                            <label for="fpg_date_padding"><?php esc_html_e( 'Date Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_date_padding" name="fpg_date_padding" value="<?php echo esc_attr( $fpg_date_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                        </div>                    
                    </div>
                </fieldset>
            </div>

            <div class="fancy-post-grid-excerpt fpg-common" id="fpg_excerpt_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Excerpt Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        <div class="fpg-color-box">
                            <label for="fpg_excerpt_color"><?php esc_html_e( 'Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_excerpt_color" name="fpg_excerpt_color" value="<?php echo esc_attr( $fpg_excerpt_color ); ?>" />
                        </div>

                        <div class="fpg-font-size-box">
                            <label for="fpg_excerpt_size"><?php esc_html_e( 'Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="number" id="fpg_excerpt_size" name="fpg_excerpt_size"  value="<?php echo esc_attr( $fpg_excerpt_size ); ?>"placeholder="e.g., 16px " />
                        </div>

                        <div class="fpg-font-weight-box">
                            <label for="fpg_excerpt_font_weight"><?php esc_html_e( 'Font Weight:', 'fancy-post-grid' ); ?></label>
                            <select id="fpg_excerpt_font_weight" name="fpg_excerpt_font_weight">
                                <?php 
                                $weights = array( '100', '200', '300', '400', '500', '600', '700', '800', '900' );
                                foreach ( $weights as $weight ) {
                                    echo '<option value="' . esc_attr( $weight ) . '"' . selected( $fpg_excerpt_font_weight, $weight, false ) . '>' . esc_html( $weight ) . '</option>';
                                }
                                ?>
                            </select>
                        </div>   

                        <!-- Excerpt Margin -->
                        <div class="fpg-margin-box">
                            <label for="fpg_excerpt_margin"><?php esc_html_e( 'Excerpt Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_excerpt_margin" name="fpg_excerpt_margin" value="<?php echo esc_attr( $fpg_excerpt_margin ); ?>" placeholder="e.g., 15px 20px 25px 30px" />
                        </div>

                        <!-- Excerpt Padding -->
                        <div class="fpg-padding-box">
                            <label for="fpg_excerpt_padding"><?php esc_html_e( 'Excerpt Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_excerpt_padding" name="fpg_excerpt_padding" value="<?php echo esc_attr( $fpg_excerpt_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                        </div> 
                        <div class="fpg-line-height-box">
                            <label for="fpg_excerpt_line_height"><?php esc_html_e( 'Excerpt Line Height:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_excerpt_line_height" name="fpg_excerpt_line_height" value="<?php echo esc_attr( $fpg_excerpt_line_height ); ?>" placeholder="e.g., 2px"  />
                        </div>                    
                    </div>
                </fieldset>
            </div>  

            <div class="fancy-post-grid-button fpg-common" id="fpg_button_settings_main">
                <fieldset>
                    <legend><?php esc_html_e( 'Button Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        <div class="fpg-color-box" id="fpg_button_bg_color">
                            <label for="fpg_button_background_color"><?php esc_html_e( 'Background:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_button_background_color" name="fpg_button_background_color" value="<?php echo esc_attr( $fpg_button_background_color ); ?>" />
                        </div>

                        <div class="fpg-color-box" id="fpg_button_bg_hover_color">
                            <label for="fpg_button_hover_background_color"><?php esc_html_e( 'Hover Background:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_button_hover_background_color" name="fpg_button_hover_background_color" value="<?php echo esc_attr( $fpg_button_hover_background_color ); ?>" />
                        </div>

                        <div class="fpg-color-box">
                            <label for="fpg_button_text_color"><?php esc_html_e( 'Text Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_button_text_color" name="fpg_button_text_color" value="<?php echo esc_attr( $fpg_button_text_color ); ?>" />
                        </div>

                        <div class="fpg-color-box">
                            <label for="fpg_button_text_hover_color"><?php esc_html_e( 'Text Hover Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_button_text_hover_color" name="fpg_button_text_hover_color" value="<?php echo esc_attr( $fpg_button_text_hover_color ); ?>" />
                        </div>

                        <div class="fpg-color-box" id="fpg_button_br_color">
                            <label for="fpg_button_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_button_border_color" name="fpg_button_border_color" value="<?php echo esc_attr( $fpg_button_border_color ); ?>" />
                        </div>

                        <!-- Button Margin -->
                        <div class="fpg-margin-box">
                            <label for="fpg_button_margin"><?php esc_html_e( ' Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_button_margin" name="fpg_button_margin" value="<?php echo esc_attr( $fpg_button_margin ); ?>" placeholder="e.g., 10px 15px 20px 25px" />
                        </div>

                        <!-- Button Padding -->
                        <div class="fpg-padding-box">
                            <label for="fpg_button_padding"><?php esc_html_e( ' Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_button_padding" name="fpg_button_padding" value="<?php echo esc_attr( $fpg_button_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                        </div>

                        <!-- Button Font Size -->
                        <div class="fpg-font-size-box">
                            <label for="fpg_button_font_size"><?php esc_html_e( ' Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_button_font_size" name="fpg_button_font_size" value="<?php echo esc_attr( $fpg_button_font_size ); ?>" placeholder="e.g., 16px" />
                        </div>

                        <!-- Button Font Weight -->
                        <div class="fpg-font-weight-box">
                            <label for="fpg_button_font_weight"><?php esc_html_e( ' Font Weight:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_button_font_weight" name="fpg_button_font_weight" value="<?php echo esc_attr( $fpg_button_font_weight ); ?>" placeholder="e.g., 400" />
                        </div>
                    </div>
                                         
                </fieldset>
            </div>    
            <div class="fancy-post-slider-arrow fpg-common" id="fpg_slider_arrow_dots">
                <fieldset>
                    <legend><?php esc_html_e( 'Slider Dot & Arrow Style', 'fancy-post-grid' ); ?></legend>
                    
                    <div class="fpg-post-select-main">
                        
                        <!-- Slider Dots Color -->
                        <div id="fpg_slider_dots_color_main">
                            <div class="fpg-color-box" id="fpg_slider_dots_color">
                                <label for="fpg_slider_dots_color"><?php esc_html_e( 'Slider Dots Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_slider_dots_color" name="fpg_slider_dots_color" value="<?php echo esc_attr( $fpg_slider_dots_color ); ?>" />
                            </div>
                        </div>


                        <!-- Slider Dots Active Color -->
                        <div id="fpg_slider_dots_active_color_main">
                            <div class="fpg-color-box" id="fpg_slider_dots_active_color">
                                <label for="fpg_slider_dots_active_color"><?php esc_html_e( 'Slider Dots Active Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_slider_dots_active_color" name="fpg_slider_dots_active_color" value="<?php echo esc_attr( $fpg_slider_dots_active_color ); ?>" />
                            </div>
                        </div>

                        <!-- Arrow Color -->
                        <div class="fpg-color-box" id="fpg_arrow_color">
                            <label for="fpg_arrow_color"><?php esc_html_e( 'Arrow Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_arrow_color" name="fpg_arrow_color" value="<?php echo esc_attr( $fpg_arrow_color ); ?>" />
                        </div>

                        <!-- Arrow Hover Color -->
                        <div class="fpg-color-box" id="fpg_arrow_hover_color">
                            <label for="fpg_arrow_hover_color"><?php esc_html_e( 'Arrow Hover Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_arrow_hover_color" name="fpg_arrow_hover_color" value="<?php echo esc_attr( $fpg_arrow_hover_color ); ?>" />
                        </div>

                        <!-- Arrow Background Color -->
                        <div class="fpg-color-box" id="fpg_arrow_bg_color">
                            <label for="fpg_arrow_bg_color"><?php esc_html_e( 'Arrow Background Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_arrow_bg_color" name="fpg_arrow_bg_color" value="<?php echo esc_attr( $fpg_arrow_bg_color ); ?>" />
                        </div>

                        <!-- Arrow Background Hover Color -->
                        <div class="fpg-color-box" id="fpg_arrow_bg_hover_color">
                            <label for="fpg_arrow_bg_hover_color"><?php esc_html_e( 'Arrow Background Hover Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_arrow_bg_hover_color" name="fpg_arrow_bg_hover_color" value="<?php echo esc_attr( $fpg_arrow_bg_hover_color ); ?>" />
                        </div>

                        <!-- Icon Font Size -->
                        <div class="fpg-font-size-box" id="fpg_icon_font_size">
                            <label for="fpg_icon_font_size"><?php esc_html_e( 'Arrow Icon Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_icon_font_size" name="fpg_icon_font_size" value="<?php echo esc_attr( $fpg_icon_font_size ); ?>" placeholder="e.g., 16px" />
                        </div>

                        <!-- Fraction Total Color -->
                        <div class="fpg-color-box" id="fpg_fraction_total_color">
                            <label for="fpg_fraction_total_color"><?php esc_html_e( 'Fraction Total Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_fraction_total_color" name="fpg_fraction_total_color" value="<?php echo esc_attr( $fpg_fraction_total_color ); ?>" />
                        </div>

                        <!-- Fraction Current Color -->
                        <div class="fpg-color-box" id="fpg_fraction_current_color">
                            <label for="fpg_fraction_current_color"><?php esc_html_e( 'Fraction Current Color:', 'fancy-post-grid' ); ?></label>
                            <input type="text" class="color-field" id="fpg_fraction_current_color" name="fpg_fraction_current_color" value="<?php echo esc_attr( $fpg_fraction_current_color ); ?>" />
                        </div>

                        <!-- Fraction Total Font Size -->
                        <div class="fpg-font-size-box" id="fpg_fraction_total_font_size">
                            <label for="fpg_fraction_total_font_size"><?php esc_html_e( 'Fraction Total Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_fraction_total_font_size" name="fpg_fraction_total_font_size" value="<?php echo esc_attr( $fpg_fraction_total_font_size ); ?>" placeholder="e.g., 14px" />
                        </div>

                        <!-- Fraction Current Font Size -->
                        <div class="fpg-font-size-box" id="fpg_fraction_current_font_size">
                            <label for="fpg_fraction_current_font_size"><?php esc_html_e( 'Fraction Current Font Size:', 'fancy-post-grid' ); ?></label>
                            <input type="text" id="fpg_fraction_current_font_size" name="fpg_fraction_current_font_size" value="<?php echo esc_attr( $fpg_fraction_current_font_size ); ?>" placeholder="e.g., 14px" />
                        </div>
                    </div>                                     
                </fieldset>
            </div>

            <div class="fancy-post-grid-pagination fpg-common" id="fpg_pagination_main">
                <fieldset id="fpg_pagination_main_option">
                    <legend><?php esc_html_e( 'Pagination Style', 'fancy-post-grid' ); ?></legend>

                    <fieldset>
                        <legend><?php esc_html_e( 'Normal Style', 'fancy-post-grid' ); ?></legend>
                        <div class="fpg-post-select-main">
                            <!-- Pagination Text Color -->
                            <div class="fpg-color-box">
                                <label for="fpg_pagination_color"><?php esc_html_e( 'Text Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_color" name="fpg_pagination_color" value="<?php echo esc_attr( $fpg_pagination_color ); ?>" />
                            </div>

                            <!-- Pagination Background Color -->
                            <div class="fpg-color-box">
                                <label for="fpg_pagination_background"><?php esc_html_e( 'Background Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_background" name="fpg_pagination_background" value="<?php echo esc_attr( $fpg_pagination_background ); ?>" />
                            </div>

                            <!-- Pagination Border Color -->
                            <div class="fpg-color-box">
                                <label for="fpg_pagination_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_border_color" name="fpg_pagination_border_color" value="<?php echo esc_attr( $fpg_pagination_border_color ); ?>" />
                            </div>

                            <!-- Pagination Border Radius -->
                            <div class="fpg-border-width-box">
                                <label for="fpg_pagination_border_width"><?php esc_html_e( 'Border Width (e.g., 5px):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_border_width" name="fpg_pagination_border_width" value="<?php echo esc_attr( $fpg_pagination_border_width ); ?>" />
                            </div>

                            <!-- Pagination Border Style -->
                            <div class="fpg-border-style-box">
                                <label for="fpg_pagination_border_style"><?php esc_html_e( 'Border Style:', 'fancy-post-grid' ); ?></label>
                                <select id="fpg_pagination_border_style" name="fpg_pagination_border_style">
                                    <option value="unset" <?php selected( $fpg_pagination_border_style, 'unset' ); ?>><?php esc_html_e( 'Unset', 'fancy-post-grid' ); ?></option>
                                    <option value="solid" <?php selected( $fpg_pagination_border_style, 'solid' ); ?>><?php esc_html_e( 'Solid', 'fancy-post-grid' ); ?></option>
                                    <option value="dashed" <?php selected( $fpg_pagination_border_style, 'dashed' ); ?>><?php esc_html_e( 'Dashed', 'fancy-post-grid' ); ?></option>
                                    <option value="dotted" <?php selected( $fpg_pagination_border_style, 'dotted' ); ?>><?php esc_html_e( 'Dotted', 'fancy-post-grid' ); ?></option>
                                    <option value="double" <?php selected( $fpg_pagination_border_style, 'double' ); ?>><?php esc_html_e( 'Double', 'fancy-post-grid' ); ?></option>
                                </select>
                            </div>

                            <!-- Pagination Border Radius -->
                            <div class="fpg-border-radius-box">
                                <label for="fpg_pagination_border_radius"><?php esc_html_e( 'Border Radius (e.g., 5px):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_border_radius" name="fpg_pagination_border_radius" value="<?php echo esc_attr( $fpg_pagination_border_radius ); ?>" />
                            </div>
                            <!-- Pagination Height -->
                            <div class="fpg-pagination-height-box">
                                <label for="fpg_pagination_height"><?php esc_html_e( 'Height (e.g., 30px):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_height" name="fpg_pagination_height" value="<?php echo esc_attr( $fpg_pagination_height ); ?>" />
                            </div>
                            <!-- Pagination Width -->
                            <div class="fpg-pagination-width-box">
                                <label for="fpg_pagination_width"><?php esc_html_e( 'Width (e.g., 30px):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_width" name="fpg_pagination_width" value="<?php echo esc_attr( $fpg_pagination_width ); ?>" />
                            </div>

                            <!-- Pagination Padding -->
                            <div class="fpg-padding-box">
                                <label for="fpg_pagination_padding"><?php esc_html_e( 'Padding (space-separated):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_padding" name="fpg_pagination_padding" value="<?php echo esc_attr( $fpg_pagination_padding ); ?>" placeholder="e.g., 5px 10px 15px 20px" />
                            </div>

                            <!-- Pagination Margin -->
                            <div class="fpg-margin-box">
                                <label for="fpg_pagination_margin"><?php esc_html_e( 'Margin (space-separated):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_margin" name="fpg_pagination_margin" value="<?php echo esc_attr( $fpg_pagination_margin ); ?>" placeholder="e.g., 10px 15px 20px 25px" />
                            </div>

                            <!-- Pagination Gap -->
                            <div class="fpg-gap-box">
                                <label for="fpg_pagination_gap"><?php esc_html_e( 'Pagination Gap (e.g., 10px):', 'fancy-post-grid' ); ?></label>
                                <input type="text" id="fpg_pagination_gap" name="fpg_pagination_gap" value="<?php echo esc_attr( $fpg_pagination_gap ); ?>" placeholder="e.g., 10px" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend><?php esc_html_e( 'Hover Style', 'fancy-post-grid' ); ?></legend>
                        <div class="fpg-post-select-main">
                            <div class="fpg-color-box">
                                <label for="fpg_pagination_hover_color"><?php esc_html_e( 'Text Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_hover_color" name="fpg_pagination_hover_color" value="<?php echo esc_attr( $fpg_pagination_hover_color ); ?>" />
                            </div>

                            <div class="fpg-color-box">
                                <label for="fpg_pagination_hover_background"><?php esc_html_e( 'Background Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_hover_background" name="fpg_pagination_hover_background" value="<?php echo esc_attr( $fpg_pagination_hover_background ); ?>" />
                            </div>

                            <div class="fpg-color-box">
                                <label for="fpg_pagination_hover_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_hover_border_color" name="fpg_pagination_hover_border_color" value="<?php echo esc_attr( $fpg_pagination_hover_border_color ); ?>" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend><?php esc_html_e( 'Active Style', 'fancy-post-grid' ); ?></legend>
                        <div class="fpg-post-select-main">
                            <div class="fpg-color-box">
                                <label for="fpg_pagination_active_color"><?php esc_html_e( 'Text Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_active_color" name="fpg_pagination_active_color" value="<?php echo esc_attr( $fpg_pagination_active_color ); ?>" />
                            </div>

                            <div class="fpg-color-box">
                                <label for="fpg_pagination_active_background"><?php esc_html_e( 'Background Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_active_background" name="fpg_pagination_active_background" value="<?php echo esc_attr( $fpg_pagination_active_background ); ?>" />
                            </div>

                            <div class="fpg-color-box">
                                <label for="fpg_pagination_active_border_color"><?php esc_html_e( 'Border Color:', 'fancy-post-grid' ); ?></label>
                                <input type="text" class="color-field" id="fpg_pagination_active_border_color" name="fpg_pagination_active_border_color" value="<?php echo esc_attr( $fpg_pagination_active_border_color ); ?>" />
                            </div>
                        </div>
                    </fieldset>
                                         
                </fieldset>
            </div>
        </div>
    </div>
    <?php
}

/**
 * Save metabox data when the post is saved.
 */
function fancy_post_grid_save_metabox_data( $post_id ) {
    // Check if our nonce is set.
    if ( ! isset( $_POST['fpg_metabox_nonce'] ) ) {
        return;
    }


    // Retrieve the nonce, unslash it, and then sanitize it.
    $fpg_metabox_nonce = isset( $_POST['fpg_metabox_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['fpg_metabox_nonce'] ) ) : '';


    // Verify that the nonce is valid.
    if ( ! wp_verify_nonce( sanitize_text_field( $fpg_metabox_nonce ), 'fpg_metabox_nonce' ) ) {
        return;
    }


    // If this is an autosave, our form has not been submitted, so we don't want to do anything.
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // Check the user's permissions.
    if ( isset( $_POST['post_type'] ) && 'fancy-post-grid-fpg' === $_POST['post_type'] ) {
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }
    }

    // Update or delete post meta data as necessary.
    
    // Check and update 'fancy_post_type' meta.
    if ( isset( $_POST['fancy_post_type'] ) ) {
        $fancy_post_type = sanitize_text_field( wp_unslash( $_POST['fancy_post_type'] ) );
        update_post_meta( $post_id, 'fancy_post_type', $fancy_post_type );
    }

    // Check and update 'fpg_include_only' meta.
    if ( isset( $_POST['fpg_include_only'] ) ) {
        $fpg_include_only = sanitize_text_field( wp_unslash( $_POST['fpg_include_only'] ) );
        update_post_meta( $post_id, 'fpg_include_only', $fpg_include_only );
    }

    // Check and update 'fpg_exclude' meta.
    if ( isset( $_POST['fpg_exclude'] ) ) {
        $fpg_exclude = sanitize_text_field( wp_unslash( $_POST['fpg_exclude'] ) );
        update_post_meta( $post_id, 'fpg_exclude', $fpg_exclude );
    }

    // Check and update 'fpg_limit' meta.
    if ( isset( $_POST['fpg_limit'] ) ) {
        $fpg_limit = sanitize_text_field( wp_unslash( $_POST['fpg_limit'] ) );
        update_post_meta( $post_id, 'fpg_limit', $fpg_limit );
    }

    // Advanced Filters
    // Categories
    if ( isset( $_POST['fpg_filter_categories'] ) ) {
        $fpg_filter_categories = sanitize_text_field( wp_unslash( $_POST['fpg_filter_categories'] ) );
        update_post_meta( $post_id, 'fpg_filter_categories', $fpg_filter_categories );
    }

    // Tags
    if ( isset( $_POST['fpg_filter_tags'] ) ) {
        $fpg_filter_tags = sanitize_text_field( wp_unslash( $_POST['fpg_filter_tags'] ) );
        update_post_meta( $post_id, 'fpg_filter_tags', $fpg_filter_tags );
    }

    
    // Sanitize user input after unslash.
    $new_category_terms = isset( $_POST['fpg_filter_category_terms'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['fpg_filter_category_terms'] ) ) : array();
    $new_tags_terms = isset( $_POST['fpg_filter_tags_terms'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['fpg_filter_tags_terms'] ) ) : array();
    $new_category_operator = isset( $_POST['fpg_category_operator'] ) ? sanitize_text_field( wp_unslash( $_POST['fpg_category_operator'] ) ) : '';
    $new_tags_operator = isset( $_POST['fpg_tags_operator'] ) ? sanitize_text_field( wp_unslash( $_POST['fpg_tags_operator'] ) ) : '';
    $new_filter_authors = isset( $_POST['fpg_filter_authors'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['fpg_filter_authors'] ) ) : array();
    $new_filter_statuses = isset( $_POST['fpg_filter_statuses'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['fpg_filter_statuses'] ) ) : array();

    // Update the meta fields.
    update_post_meta( $post_id, 'fpg_filter_category_terms', $new_category_terms );
    update_post_meta( $post_id, 'fpg_filter_tags_terms', $new_tags_terms );
    update_post_meta( $post_id, 'fpg_category_operator', $new_category_operator );
    update_post_meta( $post_id, 'fpg_tags_operator', $new_tags_operator );
    update_post_meta( $post_id, 'fpg_filter_authors', $new_filter_authors );
    update_post_meta( $post_id, 'fpg_filter_statuses', $new_filter_statuses );

    if ( isset( $_POST['fpg_relation'] ) ) {
        update_post_meta( $post_id, 'fpg_relation', sanitize_text_field( wp_unslash( $_POST['fpg_relation'] ) ) );
    }

    if ( isset( $_POST['fpg_order_by'] ) ) {
        update_post_meta( $post_id, 'fpg_order_by', sanitize_text_field( wp_unslash( $_POST['fpg_order_by'] ) ) );
    }
    if ( isset( $_POST['fpg_order'] ) ) {
        update_post_meta( $post_id, 'fpg_order', sanitize_text_field( wp_unslash( $_POST['fpg_order'] ) ) );
    }

    if ( isset( $_POST['fpg_post_per_page'] ) ) {
        update_post_meta( $post_id, 'fpg_post_per_page', sanitize_text_field( wp_unslash( $_POST['fpg_post_per_page'] ) ) );
    }

    if ( isset( $_POST['fpg_meta_order'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_order', sanitize_text_field( wp_unslash( $_POST['fpg_meta_order'] ) ) );
    }

    

    if ( isset( $_POST['fpg_title_order'] ) ) {
        update_post_meta( $post_id, 'fpg_title_order', sanitize_text_field( wp_unslash($_POST['fpg_title_order'] ) ));
    }
    if ( isset( $_POST['fpg_button_order'] ) ) {
        update_post_meta( $post_id, 'fpg_button_order', sanitize_text_field( wp_unslash($_POST['fpg_button_order'] )) );
    }

    if ( isset( $_POST['fpg_excerpt_order'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_order', sanitize_text_field(wp_unslash( $_POST['fpg_excerpt_order'] )) );
    }
    if ( isset( $_POST['fpg_category_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_category_padding', sanitize_text_field(wp_unslash( $_POST['fpg_category_padding'] )) );
    }

    //Layout
    if ( isset( $_POST['fpg_layout_select'] ) ) {
        update_post_meta( $post_id, 'fpg_layout_select', sanitize_text_field(wp_unslash( $_POST['fpg_layout_select'] ) ));
    }
    if ( isset( $_POST['fancy_post_grid_style'] ) ) {
        update_post_meta( $post_id, 'fancy_post_grid_style', sanitize_text_field(wp_unslash( $_POST['fancy_post_grid_style'] )) );
    }
    if ( isset( $_POST['fancy_slider_style'] ) ) {
        update_post_meta( $post_id, 'fancy_slider_style', sanitize_text_field(wp_unslash( $_POST['fancy_slider_style'] )) );
    }
    if ( isset( $_POST['fancy_list_style'] ) ) {
        update_post_meta( $post_id, 'fancy_list_style', sanitize_text_field(wp_unslash( $_POST['fancy_list_style'] )) );
    }
    if ( isset( $_POST['fancy_isotope_style'] ) ) {
        update_post_meta( $post_id, 'fancy_isotope_style', sanitize_text_field(wp_unslash( $_POST['fancy_isotope_style'] )) );
    }
    // Column
    if ( isset( $_POST['fancy_post_cl_lg'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_lg', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_lg'] ) ));
    }
    if ( isset( $_POST['fancy_post_cl_md'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_md', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_md'] )) );
    }
    if ( isset( $_POST['fancy_post_cl_sm'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_sm', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_sm'] )) );
    }
    if ( isset( $_POST['fancy_post_cl_mobile'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_mobile', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_mobile'] ) ));
    }
    if ( isset( $_POST['fancy_post_cl_lg_slider'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_lg_slider', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_lg_slider'] )) );
    }
    if ( isset( $_POST['fancy_post_cl_md_silder'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_md_silder', sanitize_text_field(wp_unslash( $_POST['fancy_post_cl_md_silder'] ) ) );
    }
    if ( isset( $_POST['fancy_post_cl_sm_slider'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_sm_slider', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_sm_slider'] )) );
    }
    if ( isset( $_POST['fancy_post_cl_mobile_slider'] ) ) {
        update_post_meta( $post_id, 'fancy_post_cl_mobile_slider', sanitize_text_field( wp_unslash($_POST['fancy_post_cl_mobile_slider'] ) ));
    }
    if ( isset( $_POST['fancy_post_pagination'] ) ) {
        update_post_meta( $post_id, 'fancy_post_pagination', sanitize_text_field( wp_unslash($_POST['fancy_post_pagination'] ) ));
    }
    if ( isset( $_POST['fancy_link_details'] ) ) {
        update_post_meta( $post_id, 'fancy_link_details', sanitize_text_field(wp_unslash( $_POST['fancy_link_details'] ) ));
    }
    if ( isset( $_POST['fancy_link_target'] ) ) {
        update_post_meta( $post_id, 'fancy_link_target', sanitize_text_field( wp_unslash($_POST['fancy_link_target'] ) ));
    }
    if ( isset( $_POST['fancy_keyboard'] ) ) {
        update_post_meta( $post_id, 'fancy_keyboard', sanitize_text_field( wp_unslash($_POST['fancy_keyboard'] )) );
    }
    if ( isset( $_POST['fancy_arrow'] ) ) {
        update_post_meta( $post_id, 'fancy_arrow', sanitize_text_field( wp_unslash( $_POST['fancy_arrow'] ) ) );
    }
    if ( isset( $_POST['fancy_pagination'] ) ) {
        update_post_meta( $post_id, 'fancy_pagination', sanitize_text_field( wp_unslash( $_POST['fancy_pagination'] ) ) );
    }
    if ( isset( $_POST['fancy_free_mode'] ) ) {
        update_post_meta( $post_id, 'fancy_free_mode', sanitize_text_field(wp_unslash($_POST['fancy_free_mode'] )) );
    }
    if ( isset( $_POST['fancy_loop'] ) ) {
        update_post_meta( $post_id, 'fancy_loop', sanitize_text_field(wp_unslash( $_POST['fancy_loop'] )) );
    }
    if ( isset( $_POST['fancy_autoplay'] ) ) {
        update_post_meta( $post_id, 'fancy_autoplay', sanitize_text_field( wp_unslash($_POST['fancy_autoplay'] )) );
    }
    if ( isset( $_POST['fancy_pagination_clickable'] ) ) {
        update_post_meta( $post_id, 'fancy_pagination_clickable', sanitize_text_field( wp_unslash($_POST['fancy_pagination_clickable'] ) ));
    }
    if ( isset( $_POST['fancy_spacebetween'] ) ) {
        update_post_meta( $post_id, 'fancy_spacebetween', sanitize_text_field( wp_unslash($_POST['fancy_spacebetween'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_slider'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_slider', sanitize_text_field( wp_unslash($_POST['fpg_pagination_slider'] )) );
    }
    //tab3
    
    if ( isset( $_POST['fancy_post_title_tag'] ) ) {
        update_post_meta( $post_id, 'fancy_post_title_tag', sanitize_text_field( wp_unslash($_POST['fancy_post_title_tag'] ) ));
    }
    if ( isset( $_POST['fancy_post_title_limit'] ) ) {
        update_post_meta( $post_id, 'fancy_post_title_limit', sanitize_text_field( wp_unslash($_POST['fancy_post_title_limit'] ) ));
    }
    if ( isset( $_POST['fancy_post_title_more_text'] ) ) {
        update_post_meta( $post_id, 'fancy_post_title_more_text', sanitize_text_field( wp_unslash($_POST['fancy_post_title_more_text'] )) );
    }
    if ( isset( $_POST['fancy_post_title_limit_type'] ) ) {
        update_post_meta( $post_id, 'fancy_post_title_limit_type', sanitize_text_field( wp_unslash($_POST['fancy_post_title_limit_type'] ) ));
    }
    if ( isset( $_POST['fancy_post_excerpt_limit_type'] ) ) {
        update_post_meta( $post_id, 'fancy_post_excerpt_limit_type', sanitize_text_field( wp_unslash($_POST['fancy_post_excerpt_limit_type'] )) );
    }
    
    if ( isset( $_POST['fancy_post_hide_feature_image'] ) ) {
        update_post_meta( $post_id, 'fancy_post_hide_feature_image', sanitize_text_field( wp_unslash($_POST['fancy_post_hide_feature_image'] ) ));
    }
    if ( isset( $_POST['fancy_post_feature_image_size'] ) ) {
        update_post_meta( $post_id, 'fancy_post_feature_image_size', sanitize_text_field( wp_unslash($_POST['fancy_post_feature_image_size'] ) ));
    }
    if ( isset( $_POST['fancy_post_feature_image_left'] ) ) {
        update_post_meta( $post_id, 'fancy_post_feature_image_left', sanitize_text_field( wp_unslash($_POST['fancy_post_feature_image_left'] ) ));
    }
    if ( isset( $_POST['fancy_post_feature_image_right'] ) ) {
        update_post_meta( $post_id, 'fancy_post_feature_image_right', sanitize_text_field( wp_unslash($_POST['fancy_post_feature_image_right'] ) ));
    }
    if ( isset( $_POST['fancy_post_media_source'] ) ) {
        update_post_meta( $post_id, 'fancy_post_media_source', sanitize_text_field( wp_unslash($_POST['fancy_post_media_source'] ) ));
    }
    if ( isset( $_POST['fancy_post_hover_animation'] ) ) {
        update_post_meta( $post_id, 'fancy_post_hover_animation', sanitize_text_field(wp_unslash( $_POST['fancy_post_hover_animation'] ) ));
    }
    
    if ( isset( $_POST['fancy_post_excerpt_more_text'] ) ) {
        update_post_meta( $post_id, 'fancy_post_excerpt_more_text', sanitize_text_field( wp_unslash($_POST['fancy_post_excerpt_more_text'] ) ));
    }
    if ( isset( $_POST['fancy_post_excerpt_limit'] ) ) {
        update_post_meta( $post_id, 'fancy_post_excerpt_limit', sanitize_text_field(wp_unslash( $_POST['fancy_post_excerpt_limit'] ) ));
    }
    if ( isset( $_POST['fancy_button_option'] ) ) {
        update_post_meta( $post_id, 'fancy_button_option', sanitize_text_field( wp_unslash($_POST['fancy_button_option'] ) ));
    }
    if ( isset( $_POST['fancy_button_border_style'] ) ) {
        update_post_meta( $post_id, 'fancy_button_border_style', sanitize_text_field( wp_unslash($_POST['fancy_button_border_style'] ) ));
    }

    if ( isset( $_POST['fpg_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_border_color', sanitize_hex_color( wp_unslash($_POST['fpg_border_color'] ) ));
    }
    if ( isset( $_POST['fancy_post_border_width'] ) ) {
        update_post_meta( $post_id, 'fancy_post_border_width', sanitize_text_field( wp_unslash($_POST['fancy_post_border_width'] ) ));
    }
    if ( isset( $_POST['fancy_post_read_more_border_radius'] ) ) {
        update_post_meta( $post_id, 'fancy_post_read_more_border_radius', sanitize_text_field( wp_unslash($_POST['fancy_post_read_more_border_radius'] ) ));
    }
    if ( isset( $_POST['fancy_post_read_more_alignment'] ) ) {
        update_post_meta( $post_id, 'fancy_post_read_more_alignment', sanitize_text_field( wp_unslash($_POST['fancy_post_read_more_alignment'] ) ));
    }
    // Save the new alignment meta data
    if (isset($_POST['fancy_post_main_box_alignment'])) {
        update_post_meta($post_id, 'fancy_post_main_box_alignment', sanitize_text_field(wp_unslash($_POST['fancy_post_main_box_alignment'])));
    }
    if (isset($_POST['fancy_post_title_alignment'])) {
        update_post_meta($post_id, 'fancy_post_title_alignment', sanitize_text_field(wp_unslash($_POST['fancy_post_title_alignment'])));
    }
    if (isset($_POST['fancy_post_meta_alignment'])) {
        update_post_meta($post_id, 'fancy_post_meta_alignment', sanitize_text_field(wp_unslash($_POST['fancy_post_meta_alignment'])));
    }
    if (isset($_POST['fancy_post_excerpt_alignment'])) {
        update_post_meta($post_id, 'fancy_post_excerpt_alignment', sanitize_text_field(wp_unslash($_POST['fancy_post_excerpt_alignment'])));
    }
    if ( isset( $_POST['fancy_post_read_more_text'] ) ) {
        update_post_meta( $post_id, 'fancy_post_read_more_text', sanitize_text_field(wp_unslash( $_POST['fancy_post_read_more_text'] ) ));
    }

    if ( isset( $_POST['fpg_author_color'] ) ) {
        update_post_meta( $post_id, 'fpg_author_color', sanitize_hex_color(wp_unslash( $_POST['fpg_author_color'] ) ));
    }
    
    if ( isset( $_POST['fpg_author_bg_color'] ) ) {
        update_post_meta( $post_id, 'fpg_author_bg_color', sanitize_hex_color(wp_unslash( $_POST['fpg_author_bg_color'] ) ));
    }

    if ( isset( $_POST['fpg_author_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_author_padding', sanitize_text_field(wp_unslash( $_POST['fpg_author_padding'] ) ));
    }
    
    if ( isset( $_POST['fpg_field_group'] ) ) {
    // Unsplash the input before sanitizing
    $fpg_field_group = array_map( 'sanitize_text_field', wp_unslash( $_POST['fpg_field_group'] ) );
    update_post_meta( $post_id, 'fpg_field_group', $fpg_field_group );
    } else {
        delete_post_meta( $post_id, 'fpg_field_group' );
    }

    $fields = [
        'fpg_field_group_title',
        'fpg_field_group_excerpt',
        'fpg_field_group_read_more',
        'fpg_field_group_image',
        'fpg_field_group_post_date',
        'fpg_field_group_author',
        'fpg_field_group_categories',
        'fpg_field_group_tag',
        'fpg_field_group_comment_count',
    ];

    // Loop through each field
    foreach ( $fields as $field ) {
        if ( isset( $_POST[$field] ) ) {
            // Save the field if checked
            update_post_meta( $post_id, $field, '1' );
        } else {
            // Delete the meta if the checkbox is unchecked
            update_post_meta( $post_id, $field, '0' );
        }
    }

    if ( isset( $_POST['fpg_field_group_taxonomy'] ) ) {
        // Unsplash the input before sanitizing
        $fpg_field_group_taxonomy = array_map( 'sanitize_text_field', wp_unslash( $_POST['fpg_field_group_taxonomy'] ) );
        update_post_meta( $post_id, 'fpg_field_group_taxonomy', $fpg_field_group_taxonomy );
    } else {
        delete_post_meta( $post_id, 'fpg_field_group_taxonomy' );
    }

    
    //Button 
    if ( isset( $_POST['fpg_button_background_color'] ) ) {
        update_post_meta( $post_id, 'fpg_button_background_color', sanitize_hex_color( wp_unslash($_POST['fpg_button_background_color'] ) ));
    }
    if ( isset( $_POST['fpg_button_hover_background_color'] ) ) {
        update_post_meta( $post_id, 'fpg_button_hover_background_color', sanitize_hex_color( wp_unslash($_POST['fpg_button_hover_background_color'] ) ));
    }
    if ( isset( $_POST['fpg_button_text_color'] ) ) {
        update_post_meta( $post_id, 'fpg_button_text_color', sanitize_hex_color( wp_unslash($_POST['fpg_button_text_color'] ) ));
    }
    if ( isset( $_POST['fpg_button_text_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_button_text_hover_color', sanitize_hex_color( wp_unslash($_POST['fpg_button_text_hover_color'] ) ));
    }
    if ( isset( $_POST['fpg_button_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_button_border_color', sanitize_hex_color( wp_unslash($_POST['fpg_button_border_color'] ) ));
    }
    //Full Sections
    if ( isset( $_POST['fpg_section_background_color'] ) ) {
        update_post_meta( $post_id, 'fpg_section_background_color', sanitize_hex_color( wp_unslash($_POST['fpg_section_background_color'] ) ));
    }

    if ( isset( $_POST['fpg_section_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_section_margin', sanitize_text_field( wp_unslash($_POST['fpg_section_margin'] ) ));
    }

    if ( isset( $_POST['fpg_section_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_section_padding', sanitize_text_field( wp_unslash($_POST['fpg_section_padding'] ) ));
    }
    // Save Title Border Color
    if ( isset( $_POST['fpg_title_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_title_border_color', sanitize_hex_color( wp_unslash($_POST['fpg_title_border_color'] ) ));
    }
    if ( isset( $_POST['fpg_single_image_shape_color'] ) ) {
        update_post_meta( $post_id, 'fpg_single_image_shape_color', sanitize_hex_color( wp_unslash($_POST['fpg_single_image_shape_color'] ) ));
    }

    // Save Title Border Width
    if ( isset( $_POST['fpg_title_border_width'] ) ) {
        update_post_meta( $post_id, 'fpg_title_border_width', sanitize_text_field( wp_unslash($_POST['fpg_title_border_width'] ) ));
    }

    // Save Title Border Style
    if ( isset( $_POST['fpg_title_border_style'] ) ) {
        update_post_meta( $post_id, 'fpg_title_border_style', sanitize_text_field( wp_unslash($_POST['fpg_title_border_style'] ) ));
    }

    //Padding & Margin
    if ( isset( $_POST['fpg_meta_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_padding', sanitize_text_field(wp_unslash( $_POST['fpg_meta_padding'] ) ));
    }
    if ( isset( $_POST['fpg_meta_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_margin', sanitize_text_field(wp_unslash( $_POST['fpg_meta_margin'] ) ));
    }
    if ( isset( $_POST['fpg_excerpt_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_padding', sanitize_text_field(wp_unslash( $_POST['fpg_excerpt_padding'] ) ));
    }
    if ( isset( $_POST['fpg_excerpt_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_margin', sanitize_text_field(wp_unslash( $_POST['fpg_excerpt_margin'] ) ));
    }
    if ( isset( $_POST['fpg_title_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_title_padding', sanitize_text_field(wp_unslash( $_POST['fpg_title_padding'] ) ));
    }
    if ( isset( $_POST['fpg_title_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_title_margin', sanitize_text_field(wp_unslash( $_POST['fpg_title_margin'] ) ));
    }

    if ( isset( $_POST['fpg_title_line_height'] ) ) {
        update_post_meta( $post_id, 'fpg_title_line_height', sanitize_text_field(wp_unslash( $_POST['fpg_title_line_height'] ) ));
    }
    if ( isset( $_POST['fpg_meta_line_height'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_line_height', sanitize_text_field(wp_unslash( $_POST['fpg_meta_line_height'] ) ));
    }
    if ( isset( $_POST['fpg_excerpt_line_height'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_line_height', sanitize_text_field(wp_unslash( $_POST['fpg_excerpt_line_height'] ) ));
    }

    if ( isset( $_POST['fpg_button_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_button_padding', sanitize_text_field(wp_unslash( $_POST['fpg_button_padding'] ) ));
    }

    if ( isset( $_POST['fpg_button_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_button_margin', sanitize_text_field(wp_unslash( $_POST['fpg_button_margin'] ) ));
    }

    if ( isset( $_POST['fpg_button_font_size'] ) ) {
        update_post_meta( $post_id, 'fpg_button_font_size', sanitize_text_field(wp_unslash( $_POST['fpg_button_font_size'] ) ));
    }

    if ( isset( $_POST['fpg_button_font_weight'] ) ) {
        update_post_meta( $post_id, 'fpg_button_font_weight', sanitize_text_field(wp_unslash( $_POST['fpg_button_font_weight'] ) ));
    }

    if ( isset( $_POST['fancy_post_image_border_radius'] ) ) {
        update_post_meta( $post_id, 'fancy_post_image_border_radius', sanitize_text_field(wp_unslash( $_POST['fancy_post_image_border_radius'] ) ));
    }

    if ( isset( $_POST['fancy_post_section_border_radius'] ) ) {
        update_post_meta( $post_id, 'fancy_post_section_border_radius', sanitize_text_field(wp_unslash( $_POST['fancy_post_section_border_radius'] ) ));
    }

    //Single Sections
    if ( isset( $_POST['fpg_single_section_background_color'] ) ) {
        update_post_meta( $post_id, 'fpg_single_section_background_color', sanitize_hex_color(wp_unslash( $_POST['fpg_single_section_background_color'] ) ));
    }

    if ( isset( $_POST['fpg_single_section_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_single_section_margin', sanitize_text_field(wp_unslash( $_POST['fpg_single_section_margin'] ) ));
    }

    if ( isset( $_POST['fpg_single_section_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_single_section_padding', sanitize_text_field(wp_unslash( $_POST['fpg_single_section_padding'] ) ));
    }
    if ( isset( $_POST['fpg_single_content_section_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_single_content_section_padding', sanitize_text_field(wp_unslash( $_POST['fpg_single_content_section_padding'] ) ));
    }
    if ( isset( $_POST['fpg_single_section_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_single_section_border_color', sanitize_text_field(wp_unslash( $_POST['fpg_single_section_border_color'] ) ));
    }
    // Save Border Width
    if ( isset( $_POST['fancy_post_button_border_width'] ) ) {
        update_post_meta( $post_id, 'fancy_post_button_border_width', sanitize_text_field( wp_unslash($_POST['fancy_post_button_border_width'] ) ));
    }

    // Save Border Style
    if ( isset( $_POST['fancy_post_border_style'] ) ) {
        update_post_meta( $post_id, 'fancy_post_border_style', sanitize_text_field( wp_unslash($_POST['fancy_post_border_style'] ) ));
    }


    //Title 
    if ( isset( $_POST['fpg_title_color'] ) ) {
        update_post_meta( $post_id, 'fpg_title_color', sanitize_hex_color( wp_unslash($_POST['fpg_title_color'] ) ));
    }
    if ( isset( $_POST['fpg_meta_bgcolor'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_bgcolor', sanitize_hex_color( wp_unslash($_POST['fpg_meta_bgcolor'] ) ));
    }
    if ( isset( $_POST['fpg_title_font_size'] ) ) {
        update_post_meta( $post_id, 'fpg_title_font_size', sanitize_text_field( wp_unslash($_POST['fpg_title_font_size'] ) ));
    }
    if ( isset( $_POST['fpg_title_font_weight'] ) ) {
        update_post_meta( $post_id, 'fpg_title_font_weight', sanitize_text_field( wp_unslash($_POST['fpg_title_font_weight'] ) ));
    }
    
    //Title Hover
    if ( isset( $_POST['fpg_title_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_title_hover_color', sanitize_hex_color( wp_unslash($_POST['fpg_title_hover_color'] ) ));
    }
    
    //Excerpt
    if ( isset( $_POST['fpg_excerpt_color'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_color', sanitize_hex_color( wp_unslash($_POST['fpg_excerpt_color'] ) ));
    }
    if ( isset( $_POST['fpg_excerpt_size'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_size', sanitize_text_field( wp_unslash($_POST['fpg_excerpt_size'] ) ));
    }
    if ( isset( $_POST['fpg_excerpt_font_weight'] ) ) {
        update_post_meta( $post_id, 'fpg_excerpt_font_weight', sanitize_text_field( wp_unslash($_POST['fpg_excerpt_font_weight'] ) ));
    }

    // Pagination Style
    if ( isset( $_POST['fpg_pagination_color'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_color', sanitize_text_field( wp_unslash($_POST['fpg_pagination_color'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_background'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_background', sanitize_text_field( wp_unslash($_POST['fpg_pagination_background'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_border_color', sanitize_text_field( wp_unslash($_POST['fpg_pagination_border_color'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_border_style'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_border_style', sanitize_text_field( wp_unslash($_POST['fpg_pagination_border_style'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_border_radius'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_border_radius', sanitize_text_field( wp_unslash($_POST['fpg_pagination_border_radius'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_padding', sanitize_text_field( wp_unslash($_POST['fpg_pagination_padding'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_margin'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_margin', sanitize_text_field( wp_unslash($_POST['fpg_pagination_margin'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_gap'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_gap', sanitize_text_field( wp_unslash($_POST['fpg_pagination_gap'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_hover_color', sanitize_text_field( wp_unslash($_POST['fpg_pagination_hover_color'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_hover_background'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_hover_background', sanitize_text_field( wp_unslash($_POST['fpg_pagination_hover_background'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_hover_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_hover_border_color', sanitize_text_field( wp_unslash($_POST['fpg_pagination_hover_border_color'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_active_color'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_active_color', sanitize_text_field( wp_unslash($_POST['fpg_pagination_active_color'] ) ));
    }

    if ( isset( $_POST['fpg_pagination_height'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_height', sanitize_text_field( wp_unslash($_POST['fpg_pagination_height'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_width'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_width', sanitize_text_field( wp_unslash($_POST['fpg_pagination_width'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_border_width'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_border_width', sanitize_text_field( wp_unslash($_POST['fpg_pagination_border_width'] ) ));
    }
    // Save Filter Alignment
    if (isset($_POST['fancy_post_filter_alignment'])) {
        update_post_meta($post_id, 'fancy_post_filter_alignment', sanitize_text_field($_POST['fancy_post_filter_alignment']));
    }

    // Save Active Text Color
    if (isset($_POST['fancy_post_filter_text_color'])) {
        update_post_meta($post_id, 'fancy_post_filter_text_color', sanitize_hex_color($_POST['fancy_post_filter_text_color']));
    }

    // Save Active Hover Text Color
    if (isset($_POST['fancy_post_filter_bg_color'])) {
        update_post_meta($post_id, 'fancy_post_filter_bg_color', sanitize_hex_color($_POST['fancy_post_filter_bg_color']));
    }

    // Save Active Text Color
    if (isset($_POST['fancy_post_filter_active_color'])) {
        update_post_meta($post_id, 'fancy_post_filter_active_color', sanitize_hex_color($_POST['fancy_post_filter_active_color']));
    }

    // Save Active Hover Text Color
    if (isset($_POST['fancy_post_filter_active_hover_color'])) {
        update_post_meta($post_id, 'fancy_post_filter_active_hover_color', sanitize_hex_color($_POST['fancy_post_filter_active_hover_color']));
    }

    // Save Hover Text Color
    if (isset($_POST['fancy_post_filter_hover_color'])) {
        update_post_meta($post_id, 'fancy_post_filter_hover_color', sanitize_hex_color($_POST['fancy_post_filter_hover_color']));
    }

    // Save Hover Background Color
    if (isset($_POST['fancy_post_filter_hover_bg_color'])) {
        update_post_meta($post_id, 'fancy_post_filter_hover_bg_color', sanitize_hex_color($_POST['fancy_post_filter_hover_bg_color']));
    }

    // Save Filter Text
    if (isset($_POST['fancy_post_filter_text'])) {
        update_post_meta($post_id, 'fancy_post_filter_text', sanitize_text_field($_POST['fancy_post_filter_text']));
    }


    // Save Filter Padding
    if (isset($_POST['fancy_post_filter_padding'])) {
        update_post_meta($post_id, 'fancy_post_filter_padding', intval($_POST['fancy_post_filter_padding']));
    }

    // Save Filter Margin
    if (isset($_POST['fancy_post_filter_margin'])) {
        update_post_meta($post_id, 'fancy_post_filter_margin', intval($_POST['fancy_post_filter_margin']));
    }

    // Save Filter Font Size
    if (isset($_POST['fancy_post_filter_font_size'])) {
        update_post_meta($post_id, 'fancy_post_filter_font_size', intval($_POST['fancy_post_filter_font_size']));
    }
    if ( isset( $_POST['fpg_pagination_active_background'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_active_background', sanitize_text_field( wp_unslash($_POST['fpg_pagination_active_background'] ) ));
    }
    if ( isset( $_POST['fpg_pagination_active_border_color'] ) ) {
        update_post_meta( $post_id, 'fpg_pagination_active_border_color', sanitize_text_field( wp_unslash($_POST['fpg_pagination_active_border_color'] ) ));
    }
    
    //Meta Data
    if ( isset( $_POST['fpg_meta_color'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_color', sanitize_hex_color( wp_unslash($_POST['fpg_meta_color'] ) ));
    }
    if ( isset( $_POST['fpg_meta_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_hover_color', sanitize_hex_color( wp_unslash($_POST['fpg_meta_hover_color'] ) ));
    }
    if ( isset( $_POST['fpg_meta_icon_color'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_icon_color', sanitize_hex_color( wp_unslash($_POST['fpg_meta_icon_color'] ) ));
    }

    if ( isset( $_POST['fpg_meta_gap'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_gap', sanitize_text_field( wp_unslash($_POST['fpg_meta_gap'] ) ));
    }

    if ( isset( $_POST['fpg_meta_size'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_size', sanitize_text_field( wp_unslash($_POST['fpg_meta_size'] ) ));
    }
    if ( isset( $_POST['fpg_date_color'] ) ) {
        update_post_meta( $post_id, 'fpg_date_color', sanitize_hex_color( wp_unslash($_POST['fpg_date_color'] ) ));
    }

    if ( isset( $_POST['fpg_date_bg_color'] ) ) {
        update_post_meta( $post_id, 'fpg_date_bg_color', sanitize_hex_color( wp_unslash($_POST['fpg_date_bg_color'] ) ));
    }

    if ( isset( $_POST['fpg_date_padding'] ) ) {
        update_post_meta( $post_id, 'fpg_date_padding', sanitize_text_field( wp_unslash($_POST['fpg_date_padding'] ) ));
    }
    if ( isset( $_POST['fpg_meta_font_weight'] ) ) {
        update_post_meta( $post_id, 'fpg_meta_font_weight', sanitize_text_field( wp_unslash($_POST['fpg_meta_font_weight'] ) ));
    }
    if ( isset( $_POST['fpg_category_color'] ) ) {
        update_post_meta( $post_id, 'fpg_category_color', sanitize_hex_color(wp_unslash( $_POST['fpg_category_color'] ) ));
    }

    if ( isset( $_POST['fpg_category_bg_color'] ) ) {
        update_post_meta( $post_id, 'fpg_category_bg_color', sanitize_hex_color( wp_unslash($_POST['fpg_category_bg_color'] ) ));

    }if ( isset( $_POST['fpg_category_bg_color'] ) ) {
        update_post_meta( $post_id, 'fpg_category_bg_color', sanitize_hex_color( wp_unslash($_POST['fpg_category_bg_color'] ) ));
    }

    if ( isset( $_POST['fpg_icon_font_size'] ) ) {
        update_post_meta( $post_id, 'fpg_icon_font_size', sanitize_text_field( wp_unslash($_POST['fpg_icon_font_size'] ) ));
    }
    if ( isset( $_POST['fpg_slider_dots_active_color'] ) ) {
        update_post_meta( $post_id, 'fpg_slider_dots_active_color', sanitize_hex_color(wp_unslash( $_POST['fpg_slider_dots_active_color'] ) ));
    }
    if ( isset( $_POST['fpg_fraction_total_font_size'] ) ) {
        update_post_meta( $post_id, 'fpg_fraction_total_font_size', sanitize_text_field( wp_unslash($_POST['fpg_fraction_total_font_size'] ) ));
    }
    if ( isset( $_POST['fpg_fraction_current_color'] ) ) {
        update_post_meta( $post_id, 'fpg_fraction_current_color', sanitize_hex_color(wp_unslash( $_POST['fpg_fraction_current_color'] ) ));
    }
    if ( isset( $_POST['fpg_fraction_current_font_size'] ) ) {
        update_post_meta( $post_id, 'fpg_fraction_current_font_size', sanitize_text_field( wp_unslash($_POST['fpg_fraction_current_font_size'] ) ));
    }
    if ( isset( $_POST['fpg_fraction_total_color'] ) ) {
        update_post_meta( $post_id, 'fpg_fraction_total_color', sanitize_hex_color(wp_unslash( $_POST['fpg_fraction_total_color'] ) ));
    }

    if ( isset( $_POST['fpg_slider_dots_color'] ) ) {
        update_post_meta( $post_id, 'fpg_slider_dots_color', sanitize_hex_color( wp_unslash($_POST['fpg_slider_dots_color'] ) ));

    }
    if ( isset( $_POST['fpg_arrow_color'] ) ) {
        update_post_meta( $post_id, 'fpg_arrow_color', sanitize_hex_color( wp_unslash($_POST['fpg_arrow_color'] ) ));
    }
    if ( isset( $_POST['fpg_arrow_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_arrow_hover_color', sanitize_hex_color( wp_unslash($_POST['fpg_arrow_hover_color'] ) ));
    }
    if ( isset( $_POST['fpg_arrow_bg_color'] ) ) {
        update_post_meta( $post_id, 'fpg_arrow_bg_color', sanitize_hex_color( wp_unslash($_POST['fpg_arrow_bg_color'] ) ));
    }
    if ( isset( $_POST['fpg_arrow_bg_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_arrow_bg_hover_color', sanitize_hex_color( wp_unslash($_POST['fpg_arrow_bg_hover_color'] ) ));
    }

    if ( isset( $_POST['fpg_single_section_background_hover_color'] ) ) {
        update_post_meta( $post_id, 'fpg_single_section_background_hover_color', sanitize_text_field( wp_unslash($_POST['fpg_single_section_background_hover_color'] ) ));
    }
}
add_action( 'save_post', 'fancy_post_grid_save_metabox_data' );

/**
 * Enqueue scripts and styles for the metabox.
 */
function fancy_post_grid_metabox_enqueue_scripts( $hook ) {
    // Enqueue scripts and styles only on your custom post type edit screen
    global $post_type;
    if ( 'fancy-post-grid-fpg' === $post_type ) {
        // Enqueue your scripts and styles here
        wp_enqueue_script( 'fpg-admin-script',  plugins_url('custom/js/admin-script.js', __FILE__), array( 'jquery' ), '1.0', true );
        wp_enqueue_style( 'fpg-admin-style', plugins_url('custom/css/admin-style.css', __FILE__),array(),'1.0' );
    }
}
add_action( 'admin_enqueue_scripts', 'fancy_post_grid_metabox_enqueue_scripts' );
?>