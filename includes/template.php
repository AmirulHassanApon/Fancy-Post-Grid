<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly


 /*=====================================================================
	// Fancy Post Grid ShortCode
  =======================================================================*/

function fancy_post_grid_shortcode_pro( $atts ) {
	$atts = shortcode_atts(
		array(
			'id' => "", 
		), $atts);
		global $post;
		$post_id = $atts['id'];		
		if($post_id!='xx'){	

		/*===========================================================
		    //retrive settings value form settings page
		============================================================*/

		//Tab-1 Title Settings
		$fancy_post_type                            = get_post_meta( $post_id, 'fancy_post_type', true );
	    $fpg_include_only                           = get_post_meta( $post_id, 'fpg_include_only', true );
	    $fpg_exclude                                = get_post_meta( $post_id, 'fpg_exclude', true );
	    $fpg_limit                                  = get_post_meta( $post_id, 'fpg_limit', true );
	    $fpg_filter_categories                      = get_post_meta( $post_id, 'fpg_filter_categories', true );
	    $fpg_filter_tags                            = get_post_meta( $post_id, 'fpg_filter_tags', true );
	    $fpg_field_group_taxonomy                   = get_post_meta( $post_id, 'fpg_field_group_taxonomy', true );
	    $fpg_filter_category_terms                  = get_post_meta( $post_id, 'fpg_filter_category_terms', true );
	    $fpg_filter_tags_terms                      = get_post_meta( $post_id, 'fpg_filter_tags_terms', true );
	    $fpg_category_operator                      = get_post_meta( $post_id, 'fpg_category_operator', true );
	    $fpg_tags_operator                          = get_post_meta( $post_id, 'fpg_tags_operator', true );
	    $fpg_relation                               = get_post_meta( $post_id, 'fpg_relation', true );
	    $fpg_order_by                               = get_post_meta( $post_id, 'fpg_order_by', true );
	    $fpg_order                                  = get_post_meta( $post_id, 'fpg_order', true );
	    $fpg_filter_authors                         = get_post_meta( $post_id, 'fpg_filter_authors', true );
	    $fpg_filter_statuses                        = get_post_meta( $post_id, 'fpg_filter_statuses', true );
	    $fpg_meta_order                             = get_post_meta( $post_id, 'fpg_meta_order', true );
	    $fpg_title_order                            = get_post_meta( $post_id, 'fpg_title_order', true );
	    $fpg_button_order                         	= get_post_meta( $post_id, 'fpg_button_order', true );
	    $fpg_excerpt_order                        	= get_post_meta( $post_id, 'fpg_excerpt_order', true );
		//tab-2-Layout Settings
		//Start
		$layout_type                   				= get_post_meta($post_id, 'fpg_layout_select', true);
		$fpg_grid_style                				= get_post_meta($post_id, 'fancy_post_grid_style', true);
		$fancy_slider_style              			= get_post_meta($post_id, 'fancy_slider_style', true);
		$fancy_list_style              				= get_post_meta($post_id, 'fancy_list_style', true);
		$fancy_isotope_style              			= get_post_meta($post_id, 'fancy_isotope_style', true);
		//Columns		
		$fancy_post_cl_lg                           = get_post_meta( $post_id, 'fancy_post_cl_lg', true );
	    $fancy_post_cl_md                           = get_post_meta( $post_id, 'fancy_post_cl_md', true );
	    $fancy_post_cl_sm                           = get_post_meta( $post_id, 'fancy_post_cl_sm', true );
	    $fancy_post_cl_mobile                       = get_post_meta( $post_id, 'fancy_post_cl_mobile', true );
	    $fancy_post_cl_lg_slider                    = get_post_meta( $post_id, 'fancy_post_cl_lg_slider', true );
	    $fancy_post_cl_md_silder                    = get_post_meta( $post_id, 'fancy_post_cl_md_silder', true );
	    $fancy_post_cl_sm_slider                    = get_post_meta( $post_id, 'fancy_post_cl_sm_slider', true );
	    $fancy_post_cl_mobile_slider                = get_post_meta( $post_id, 'fancy_post_cl_mobile_slider', true );
	    //Pagination
	    $fancy_post_pagination                      = get_post_meta( $post_id, 'fancy_post_pagination', true );
	    $fpg_post_per_page                			= get_post_meta($post_id, 'fpg_post_per_page', true);
	    $fpg_pagination_slider                		= get_post_meta($post_id, 'fpg_pagination_slider', true);
	    //Link
	    $fancy_link_details                         = get_post_meta( $post_id, 'fancy_link_details', true );
    	$fancy_link_target                          = get_post_meta( $post_id, 'fancy_link_target', true );
    	$fancy_autoplay                         	= get_post_meta( $post_id, 'fancy_autoplay', true );
    	$fancy_free_mode                         	= get_post_meta( $post_id, 'fancy_free_mode', true );
    	$fancy_loop                         		= get_post_meta( $post_id, 'fancy_loop', true );
    	$fancy_keyboard                         	= get_post_meta( $post_id, 'fancy_keyboard', true );
    	$fancy_arrow                         	= get_post_meta( $post_id, 'fancy_arrow', true );
    	$fancy_pagination                         	= get_post_meta( $post_id, 'fancy_pagination', true );
    	$fancy_pagination_clickable                 = get_post_meta( $post_id, 'fancy_pagination_clickable', true );
    	$fancy_spacebetween                 		= get_post_meta( $post_id, 'fancy_spacebetween', true );
    	//tab-3 Advanced Settings
    	$fancy_post_title_tag                       = get_post_meta( $post_id, 'fancy_post_title_tag', true );
    	$fancy_post_title_more_text                	= get_post_meta( $post_id, 'fancy_post_title_more_text', true );
    	$fancy_post_title_limit                     = get_post_meta( $post_id, 'fancy_post_title_limit', true );
    	$fancy_post_title_limit_type                = get_post_meta( $post_id, 'fancy_post_title_limit_type', true );
    	//feature-image
    	$fancy_post_hide_feature_image              = get_post_meta( $post_id, 'fancy_post_hide_feature_image', true );	    
	    $fancy_post_feature_image_size              = get_post_meta( $post_id, 'fancy_post_feature_image_size', true );
	    $fancy_post_feature_image_left              = get_post_meta( $post_id, 'fancy_post_feature_image_left', true );
	    $fancy_post_feature_image_right              = get_post_meta( $post_id, 'fancy_post_feature_image_right', true );
	    $fpg_title_border_style              		= get_post_meta( $post_id, 'fpg_title_border_style', true );
	    $fancy_post_media_source                    = get_post_meta( $post_id, 'fancy_post_media_source', true ); 
	    $fancy_post_hover_animation                 = get_post_meta( $post_id, 'fancy_post_hover_animation', true );
	    //Excerpt
	    $fancy_post_excerpt_limit                   = get_post_meta( $post_id, 'fancy_post_excerpt_limit', true );
	    $fancy_post_excerpt_type                    = get_post_meta( $post_id, 'fancy_post_excerpt_type', true );
	    $fancy_post_excerpt_more_text               = get_post_meta( $post_id, 'fancy_post_excerpt_more_text', true );
	    $fancy_post_excerpt_limit_type              = get_post_meta( $post_id, 'fancy_post_excerpt_limit_type', true );
	    //Read Button
	    $fancy_post_read_more_border_radius         = get_post_meta( $post_id, 'fancy_post_read_more_border_radius', true );
	    $fancy_button_option         				= get_post_meta( $post_id, 'fancy_button_option', true );
	    $fancy_button_border_style         			= get_post_meta( $post_id, 'fancy_button_border_style', true );
    	$fancy_post_read_more_alignment             = get_post_meta( $post_id, 'fancy_post_read_more_alignment', true );
    	$fancy_post_read_more_text                  = get_post_meta( $post_id, 'fancy_post_read_more_text', true );
    	//Field Selector -Tab-4
    	$fpg_field_group_title                      = get_post_meta( $post_id, 'fpg_field_group_title', true );
	    $fpg_field_group_excerpt                    = get_post_meta( $post_id, 'fpg_field_group_excerpt', true );
	    $fpg_field_group_read_more                  = get_post_meta( $post_id, 'fpg_field_group_read_more', true );
	    $fpg_field_group_image                      = get_post_meta( $post_id, 'fpg_field_group_image', true );
	    $fpg_field_group_post_date                  = get_post_meta( $post_id, 'fpg_field_group_post_date', true );
	    $fpg_field_group_author                     = get_post_meta( $post_id, 'fpg_field_group_author', true );
	    $fpg_field_group_categories                 = get_post_meta( $post_id, 'fpg_field_group_categories', true );
	    $fpg_field_group_tag                        = get_post_meta( $post_id, 'fpg_field_group_tag', true );
	    $fpg_field_group_comment_count              = get_post_meta( $post_id, 'fpg_field_group_comment_count', true );
	    $fancy_post_main_box_alignment              = get_post_meta( $post_id, 'fancy_post_main_box_alignment', true );
	    $fancy_post_title_alignment                 = get_post_meta( $post_id, 'fancy_post_title_alignment', true );
	    $fancy_post_meta_alignment              	= get_post_meta( $post_id, 'fancy_post_meta_alignment', true );
	    $fancy_post_excerpt_alignment              	= get_post_meta( $post_id, 'fancy_post_excerpt_alignment', true );
	    //Button
	    $fpg_button_background_color                = get_post_meta( $post_id,'fpg_button_background_color', true); 
	    $fpg_button_hover_background_color          = get_post_meta( $post_id,'fpg_button_hover_background_color', true); 
	    $fpg_button_text_color                      = get_post_meta( $post_id,'fpg_button_text_color', true ); 
	    $fpg_button_text_hover_color                = get_post_meta( $post_id,'fpg_button_text_hover_color', true ); 
	    $fpg_button_border_color                	= get_post_meta( $post_id,'fpg_button_border_color', true ); 
	    //full Section
	    $fpg_section_background_color               = get_post_meta( $post_id, 'fpg_section_background_color', true );
	    $fpg_section_margin                         = get_post_meta( $post_id, 'fpg_section_margin', true );
	    $fpg_section_padding                        = get_post_meta( $post_id, 'fpg_section_padding', true );
	    $fancy_post_section_border_radius           = get_post_meta( $post_id, 'fancy_post_section_border_radius', true );
	    $fancy_post_image_border_radius             = get_post_meta( $post_id, 'fancy_post_image_border_radius', true );

	    $fancy_post_filter_alignment                			= get_post_meta( $post_id,'fancy_post_filter_alignment', true); 

	    $fancy_post_filter_text_color          					= get_post_meta( $post_id,'fancy_post_filter_text_color', true); 
	    $fancy_post_filter_hover_color                      	= get_post_meta( $post_id,'fancy_post_filter_hover_color', true ); 
	    $fancy_post_filter_active_color          					= get_post_meta( $post_id,'fancy_post_filter_active_color', true); 
	    $fancy_post_filter_bg_color                      	= get_post_meta( $post_id,'fancy_post_filter_bg_color', true ); 
	    $fancy_post_filter_hover_bg_color          					= get_post_meta( $post_id,'fancy_post_filter_hover_bg_color', true); 
	    $fancy_post_filter_active_bg_color                      	= get_post_meta( $post_id,'fancy_post_filter_active_bg_color', true );
	    $fancy_post_filter_border_color          					= get_post_meta( $post_id,'fancy_post_filter_border_color', true); 
	    $fancy_post_filter_active_border_color                      	= get_post_meta( $post_id,'fancy_post_filter_active_border_color', true ); 

	    $fancy_post_filter_border_style          					= get_post_meta( $post_id,'fancy_post_filter_border_style', true); 
	    $fancy_post_filter_text          					= get_post_meta( $post_id,'fancy_post_filter_text', true); 
	    $fancy_post_filter_item_gap          					= get_post_meta( $post_id,'fancy_post_filter_item_gap', true); 
	     
	    $fancy_post_filter_padding                			= get_post_meta( $post_id,'fancy_post_filter_padding', true ); 
	    $fancy_post_filter_margin                			= get_post_meta( $post_id,'fancy_post_filter_margin', true ); 	    
	    $fancy_post_filter_font_size               			= get_post_meta( $post_id, 'fancy_post_filter_font_size', true );
	    $fancy_post_filter_border_radius                			= get_post_meta( $post_id,'fancy_post_filter_border_radius', true ); 
	    $fancy_post_filter_border_width                			= get_post_meta( $post_id,'fancy_post_filter_border_width', true ); 	    
	    $fancy_post_filter_box_padding               			= get_post_meta( $post_id, 'fancy_post_filter_box_padding', true );
	    $fancy_post_filter_box_margin               			= get_post_meta( $post_id, 'fancy_post_filter_box_margin', true );
	    //Padding & Margin 
	    $fpg_meta_padding                			= get_post_meta( $post_id,'fpg_meta_padding', true); 
	    $fpg_meta_margin          					= get_post_meta( $post_id,'fpg_meta_margin', true); 
	    $fpg_excerpt_padding                      	= get_post_meta( $post_id,'fpg_excerpt_padding', true ); 
	    $fpg_excerpt_margin                			= get_post_meta( $post_id,'fpg_excerpt_margin', true ); 
	    $fpg_title_padding                			= get_post_meta( $post_id,'fpg_title_padding', true ); 	    
	    $fpg_title_margin               			= get_post_meta( $post_id, 'fpg_title_margin', true );


		$fpg_title_border_width                		= get_post_meta( $post_id,'fpg_title_border_width', true ); 
	    $fpg_title_border_color                		= get_post_meta( $post_id,'fpg_title_border_color', true ); 	    
	    $fpg_title_margin               			= get_post_meta( $post_id, 'fpg_title_margin', true );
	    $fpg_button_padding                         = get_post_meta( $post_id, 'fpg_button_padding', true );
	    $fpg_button_margin                        	= get_post_meta( $post_id, 'fpg_button_margin', true );
	    $fpg_single_section_background_color        = get_post_meta( $post_id, 'fpg_single_section_background_color', true );
	    $fpg_single_section_background_hover_color        = get_post_meta( $post_id, 'fpg_single_section_background_hover_color', true );
	    $fpg_single_section_margin                  = get_post_meta( $post_id, 'fpg_single_section_margin', true );
	    $fpg_single_section_padding                 = get_post_meta( $post_id, 'fpg_single_section_padding', true );
	    $fpg_single_content_section_padding         = get_post_meta( $post_id, 'fpg_single_content_section_padding', true );
	    $fpg_single_section_border_color            = get_post_meta( $post_id, 'fpg_single_section_border_color', true );
	    $fancy_post_border_width                    = get_post_meta( $post_id, 'fancy_post_border_width', true );
	    $fancy_post_button_border_width             = get_post_meta( $post_id, 'fancy_post_button_border_width', true );
	    $fancy_post_border_style                    = get_post_meta( $post_id, 'fancy_post_border_style', true );

	    // Title
	    $fpg_title_color                            = get_post_meta( $post_id,'fpg_title_color', true); 
	    $fpg_title_font_size                        = get_post_meta( $post_id,'fpg_title_font_size', true); 
	    $fpg_title_font_weight                      = get_post_meta( $post_id,'fpg_title_font_weight', true ); 
	    $fpg_title_alignment                        = get_post_meta( $post_id,'fpg_title_alignment', true ); 
		$fpg_title_line_height                      = get_post_meta( $post_id,'fpg_title_line_height', true); 
	    $fpg_meta_line_height                       = get_post_meta( $post_id,'fpg_meta_line_height', true ); 
	    $fpg_excerpt_line_height                    = get_post_meta( $post_id,'fpg_excerpt_line_height', true ); 

	    //Title Hover
	    $fpg_title_hover_color                      = get_post_meta( $post_id,'fpg_title_hover_color', true); 
	    $fpg_title_hover_font_size                  = get_post_meta( $post_id,'fpg_title_hover_font_size', true); 
	    $fpg_title_hover_font_weight                = get_post_meta( $post_id,'fpg_title_hover_font_weight', true ); 
	    $fpg_title_hover_alignment                  = get_post_meta( $post_id,'fpg_title_hover_alignment', true ); 

	    //Excerpt
	    $fpg_excerpt_color                          = get_post_meta( $post_id,'fpg_excerpt_color', true); 
	    $fpg_excerpt_size                           = get_post_meta( $post_id,'fpg_excerpt_size', true); 
	    $fpg_excerpt_font_weight                    = get_post_meta( $post_id,'fpg_excerpt_font_weight', true ); 
	    $fpg_excerpt_alignment                      = get_post_meta( $post_id,'fpg_excerpt_alignment', true ); 
	    //Meta Data
	    $fpg_meta_color                             = get_post_meta( $post_id,'fpg_meta_color', true); 
	    $fpg_meta_hover_color                       = get_post_meta( $post_id,'fpg_meta_hover_color', true); 
	    $fpg_meta_gap                               = get_post_meta( $post_id,'fpg_meta_gap', true); 
	    $fpg_meta_size                              = get_post_meta( $post_id,'fpg_meta_size', true); 
	    $fpg_meta_font_weight                       = get_post_meta( $post_id,'fpg_meta_font_weight', true ); 
	    $fpg_meta_alignment                         = get_post_meta( $post_id,'fpg_meta_alignment', true ); 
	    // Pagination Style Values
		$fpg_pagination_color                     	= get_post_meta( $post_id, 'fpg_pagination_color', true );
		$fpg_pagination_background                	= get_post_meta( $post_id, 'fpg_pagination_background', true );
		$fpg_pagination_border_color              	= get_post_meta( $post_id, 'fpg_pagination_border_color', true );
		$fpg_pagination_border_style              	= get_post_meta( $post_id, 'fpg_pagination_border_style', true );
		$fpg_pagination_border_radius             	= get_post_meta( $post_id, 'fpg_pagination_border_radius', true );
		$fpg_pagination_padding                   	= get_post_meta( $post_id, 'fpg_pagination_padding', true );
		$fpg_pagination_margin                    	= get_post_meta( $post_id, 'fpg_pagination_margin', true );
		$fpg_pagination_gap                       	= get_post_meta( $post_id, 'fpg_pagination_gap', true );
		$fpg_pagination_hover_color               	= get_post_meta( $post_id, 'fpg_pagination_hover_color', true );
		$fpg_pagination_hover_background          	= get_post_meta( $post_id, 'fpg_pagination_hover_background', true );
		$fpg_pagination_hover_border_color        	= get_post_meta( $post_id, 'fpg_pagination_hover_border_color', true );
		$fpg_pagination_active_color              	= get_post_meta( $post_id, 'fpg_pagination_active_color', true );
		$fpg_pagination_active_background         	= get_post_meta( $post_id, 'fpg_pagination_active_background', true );
		$fpg_pagination_active_border_color       	= get_post_meta( $post_id, 'fpg_pagination_active_border_color', true );
		$fpg_pagination_border_width              	= get_post_meta( $post_id, 'fpg_pagination_border_width', true );
		$fpg_pagination_height         				= get_post_meta( $post_id, 'fpg_pagination_height', true );
		$fpg_pagination_width       				= get_post_meta( $post_id, 'fpg_pagination_width', true );
		$fpg_border_color       					= get_post_meta( $post_id, 'fpg_border_color', true );
		$fpg_author_color         					= get_post_meta( $post_id, 'fpg_author_color', true );
		$fpg_author_bg_color       					= get_post_meta( $post_id, 'fpg_author_bg_color', true );
		$fpg_author_padding       					= get_post_meta( $post_id, 'fpg_author_padding', true );
		$fpg_category_color         				= get_post_meta( $post_id, 'fpg_category_color', true );
		$fpg_category_bg_color       				= get_post_meta( $post_id, 'fpg_category_bg_color', true );
		$fpg_category_padding       				= get_post_meta( $post_id, 'fpg_category_padding', true );
		$fpg_date_color         					= get_post_meta( $post_id, 'fpg_date_color', true );
		$fpg_date_bg_color       					= get_post_meta( $post_id, 'fpg_date_bg_color', true );
		$fpg_date_padding       					= get_post_meta( $post_id, 'fpg_date_padding', true );
		$fpg_meta_bgcolor       					= get_post_meta( $post_id, 'fpg_meta_bgcolor', true );
		$fpg_button_font_weight       				= get_post_meta( $post_id, 'fpg_button_font_weight', true );
		$fpg_button_font_size       				= get_post_meta( $post_id, 'fpg_button_font_size', true );
		$fpg_meta_icon_color       					= get_post_meta( $post_id, 'fpg_meta_icon_color', true );

		$fpg_icon_font_size       					= get_post_meta( $post_id, 'fpg_icon_font_size', true );
		$fpg_slider_dots_color       				= get_post_meta( $post_id, 'fpg_slider_dots_color', true );
		$fpg_slider_dots_active_color       		= get_post_meta( $post_id, 'fpg_slider_dots_active_color', true );
		$fpg_arrow_color       						= get_post_meta( $post_id, 'fpg_arrow_color', true );
		$fpg_arrow_hover_color       				= get_post_meta( $post_id, 'fpg_arrow_hover_color', true );
		$fpg_arrow_bg_color       						= get_post_meta( $post_id, 'fpg_arrow_bg_color', true );
		$fpg_arrow_bg_hover_color       				= get_post_meta( $post_id, 'fpg_arrow_bg_hover_color', true );
		$fpg_single_image_shape_color       		= get_post_meta( $post_id, 'fpg_single_image_shape_color', true );

		$fpg_fraction_total_color       				= get_post_meta( $post_id, 'fpg_fraction_total_color', true );
		$fpg_fraction_current_color       						= get_post_meta( $post_id, 'fpg_fraction_current_color', true );
		$fpg_fraction_total_font_size       				= get_post_meta( $post_id, 'fpg_fraction_total_font_size', true );
		$fpg_fraction_current_font_size       		= get_post_meta( $post_id, 'fpg_fraction_current_font_size', true );
		$fancy_post_filter_box_bg_color       		= get_post_meta( $post_id, 'fancy_post_filter_box_bg_color', true );
		$fancy_post_filter_box_border_radius       		= get_post_meta( $post_id, 'fancy_post_filter_box_border_radius', true );

	    $main_alignment_class = '';
        if ($fancy_post_main_box_alignment === 'align-start') {
            $main_alignment_class = 'align-start';
        } elseif ($fancy_post_main_box_alignment === 'align-center') {
            $main_alignment_class = 'align-center';
        } elseif ($fancy_post_main_box_alignment === 'align-end') {
            $main_alignment_class = 'align-end';
        }

        $title_alignment_class = '';
        if ($fancy_post_title_alignment === 'align-start') {
            $title_alignment_class = 'align-start';
        } elseif ($fancy_post_title_alignment === 'align-center') {
            $title_alignment_class = 'align-center';
        } elseif ($fancy_post_title_alignment === 'align-end') {
            $title_alignment_class = 'align-end';
        }
        $meta_alignment_class = '';
        if ($fancy_post_meta_alignment === 'align-start') {
            $meta_alignment_class = 'align-start';
        } elseif ($fancy_post_meta_alignment === 'align-center') {
            $meta_alignment_class = 'align-center';
        } elseif ($fancy_post_meta_alignment === 'align-end') {
            $meta_alignment_class = 'align-end';
        }

        $excerpt_alignment_class = '';
        if ($fancy_post_excerpt_alignment === 'align-start') {
            $excerpt_alignment_class = 'align-start';
        } elseif ($fancy_post_excerpt_alignment === 'align-center') {
            $excerpt_alignment_class = 'align-center';
        } elseif ($fancy_post_excerpt_alignment === 'align-end') {
            $excerpt_alignment_class = 'align-end';
        }

        // Determine the class name based on fancy_button_option
        $button_class = '';
        if ($fancy_button_option === 'filled') {
            $button_class = 'fpg-filled';
        } elseif ($fancy_button_option === 'flat') {
            $button_class = 'fpg-flat';
        } elseif ($fancy_button_option === 'border') {
            $button_class = 'fpg-border';
        }

        $button_alignment_class = '';
        if ($fancy_post_read_more_alignment === 'align-start') {
            $button_alignment_class = 'align-start';
        } elseif ($fancy_post_read_more_alignment === 'align-center') {
            $button_alignment_class = 'align-center';
        } elseif ($fancy_post_read_more_alignment === 'align-end') {
            $button_alignment_class = 'align-end';
        }
        
        
	    	
		$dir = plugin_dir_path( __FILE__ );

	 	/*=====================================================================
		//Grid type check 
	  	=======================================================================*/
	
		if($layout_type == "grid"){

			if( $fpg_grid_style  == 'style1'){				
				require  $dir.'view/grid1.php';	
				return $grid1;		
			}
			if( $fpg_grid_style  == 'style2'){				
				require  $dir.'view/grid2.php';	
				return $grid2;		
			}

			if( $fpg_grid_style  == 'style3'){				
				require  $dir.'view/grid3.php';	
				return $grid3;		
			}
			if( $fpg_grid_style  == 'style4'){				
				require  $dir.'view/grid4.php';	
				return $grid4;		
			}
			if( $fpg_grid_style  == 'style5'){				
				require  $dir.'view/grid5.php';	
				return $grid5;		
			}

			if( $fpg_grid_style  == 'style6'){				
				require  $dir.'view/grid6.php';	
				return $grid6;		
			}
			if( $fpg_grid_style  == 'style7'){				
				require  $dir.'view/grid7.php';	
				return $grid7;		
			}
			if( $fpg_grid_style  == 'style8'){				
				require  $dir.'view/grid8.php';	
				return $grid8;		
			}

			if( $fpg_grid_style  == 'style9'){				
				require  $dir.'view/grid9.php';	
				return $grid9;		
			}
			if( $fpg_grid_style  == 'style10'){				
				require  $dir.'view/grid10.php';	
				return $grid10;		
			}
			if( $fpg_grid_style  == 'style11'){				
				require  $dir.'view/grid11.php';	
				return $grid11;		
			}

			if( $fpg_grid_style  == 'style12'){				
				require  $dir.'view/grid12.php';	
				return $grid12;		
			}
			
			
		}

		/*=====================================================================
		//Slider type check 
	 	=======================================================================*/

		elseif($layout_type == "slider"){			

		   	if( $fancy_slider_style == 'sliderstyle1'){				
				require  $dir.'view/slider1.php';	
				return $slider1;		
			}

			if( $fancy_slider_style == 'sliderstyle2'){				
				require  $dir.'view/slider2.php';
				return $slider2;		
			}

			if( $fancy_slider_style == 'sliderstyle3'){				
				require  $dir.'view/slider3.php';	
				return $slider3;		
			}

			if( $fancy_slider_style == 'sliderstyle4'){				
				require  $dir.'view/slider4.php';	
				return $slider4;		
			}

			if( $fancy_slider_style == 'sliderstyle5'){				
				require  $dir.'view/slider5.php';
				return $slider5;		
			}

			if( $fancy_slider_style == 'sliderstyle6'){				
				require  $dir.'view/slider6.php';	
				return $slider6;		
			}
			if( $fancy_slider_style == 'sliderstyle7'){				
				require  $dir.'view/slider7.php';	
				return $slider7;		
			}
		}
		/*=====================================================================
		//list type check 
	 	=======================================================================*/

		elseif($layout_type == "list"){			

		   	if( $fancy_list_style == 'liststyle1'){				
				require  $dir.'view/list1.php';	
				return $list1;		
			}

			if( $fancy_list_style == 'liststyle2'){				
				require  $dir.'view/list2.php';
				return $list2;		
			}

			if( $fancy_list_style == 'liststyle3'){				
				require  $dir.'view/list3.php';	
				return $list3;		
			}

			if( $fancy_list_style == 'liststyle4'){				
				require  $dir.'view/list4.php';	
				return $list4;		
			}

			if( $fancy_list_style == 'liststyle5'){				
				require  $dir.'view/list5.php';
				return $list5;		
			}

			if( $fancy_list_style == 'liststyle6'){				
				require  $dir.'view/list6.php';	
				return $list6;		
			}
			if( $fancy_list_style == 'liststyle7'){				
				require  $dir.'view/list7.php';
				return $list7;		
			}

			if( $fancy_list_style == 'liststyle8'){				
				require  $dir.'view/list8.php';	
				return $list8;		
			}
		}
		/*=====================================================================
		//isotope type check 
	 	=======================================================================*/

		elseif($layout_type == "isotope"){			

		   	if( $fancy_isotope_style == 'isotopestyle1'){				
				require  $dir.'view/isotope1.php';	
				return $isotope1;		
			}

			if( $fancy_isotope_style == 'isotopestyle2'){				
				require  $dir.'view/isotope2.php';
				return $isotope2;		
			}
			if( $fancy_isotope_style == 'isotopestyle3'){				
				require  $dir.'view/isotope3.php';	
				return $isotope3;		
			}

			if( $fancy_isotope_style == 'isotopestyle4'){				
				require  $dir.'view/isotope4.php';
				return $isotope4;		
			}

			if( $fancy_isotope_style == 'isotopestyle5'){				
				require  $dir.'view/isotope5.php';
				return $isotope5;		
			}
			if( $fancy_isotope_style == 'isotopestyle6'){				
				require  $dir.'view/isotope6.php';	
				return $isotope6;		
			}

			if( $fancy_isotope_style == 'isotopestyle7'){				
				require  $dir.'view/isotope7.php';
				return $isotope7;		
			}
		}
	}
}
add_shortcode( 'fancy_gird_post_shortcode', 'fancy_post_grid_shortcode_pro' );