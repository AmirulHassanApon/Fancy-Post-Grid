(function($){  
    "use strict";
    
    jQuery(document).ready(function(){
        function filterMarkerMaker() {
            var marker = document.querySelector('#fpg_metabox_tabs .button-wrapper .filter-marker');
            var items = document.querySelectorAll('#fpg_metabox_tabs .button-wrapper a');

            function indicator(element) {
                marker.style.left = element.offsetLeft + 'px';
                marker.style.top = element.offsetTop + 'px';
                marker.style.width = element.offsetWidth + 'px';
                marker.style.height = element.offsetHeight + 'px';
            }

            items.forEach(link => {
                if (link.classList.contains('active')) {
                    indicator(link);
                }
            });

            items.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    items.forEach(item => item.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    indicator(e.currentTarget);
                });
            });
        };

        filterMarkerMaker();
    });


    /**
     *
     */
    $('.regular-text-color').wpColorPicker();
    $( "#fpg-setting-tabs" ).tabs();

    /**
     *
     */
    jQuery(document).ready(function($) {

        function toggleLayoutActiveFields() {
            var selectedLayout = $('input[name="fpg_layout_select"]:checked').val();
            var selectedStyle = $('input[name="fancy_post_grid_style"]:checked').val();
            var selectedSliderStyle = $('input[name="fancy_slider_style"]:checked').val();
            var selectedListStyle = $('input[name="fancy_list_style"]:checked').val();
            var selectedIsotopeStyle = $('input[name="fancy_list_style"]:checked').val();

            if (selectedLayout === 'grid') {
                if (selectedStyle === 'style1') {
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_excerpt_setting_main').show();
                    $('#fpg_meta_icon_color_main').show();                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
          
                }else if (selectedStyle === 'style2') {
                    // Ordering
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_excerpt_setting_main').show();                  
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
  
                }else if (selectedStyle === 'style3') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').hide();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_excerpt_setting_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_bgcolor_box').show();
                    $('#fpg_meta_settings_main').hide();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();

                }else if (selectedStyle === 'style4') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').hide();
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').show();
                    $('#fpg_field_group_comment_count_main').show(); 
                    $('#fpg_field_group_button_main').hide(); 
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_excerpt_setting_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_date_color_main').show();
                    $('#fpg_date_bg_color_main').show();
                    $('#fpg_date_padding_main').show();
                    $('#fancy_button_option_main').hide();
                    $('#fpg_button_settings_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    
                }else if (selectedStyle === 'style5') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_excerpt_setting_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_date_color_main').show();
                    $('#fpg_date_bg_color_main').show();
                    $('#fpg_date_padding_main').show();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                     
                }else if (selectedStyle === 'style6') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_excerpt_order_main').hide(); 
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_field_group_excerpt_main').hide(); 
                    $('#fpg_field_group_categories_main').hide(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fpg_excerpt_main').hide(); 
                    $('#fpg_meta_hover_color_main').hide();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_date_color_main').show();
                    $('#fpg_date_bg_color_main').show();
                    $('#fpg_date_padding_main').show();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();

                }else if (selectedStyle === 'style7') {

                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide(); 
                    $('#fpg_button_order_main').hide();
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_field_group_excerpt_main').hide(); 
                    $('#fpg_field_group_categories_main').hide(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fpg_excerpt_main').hide(); 
                    $('#fpg_meta_hover_color_main').hide();
                    $('#fpg_field_group_button_main').hide();
                    $('#fpg_button_settings_main').hide();
                    $('#fancy_button_option_main').hide();
                    $('#fpg_meta_settings_main').hide();
                    $('#fpg_title_alignment_main').hide();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_author_color_main').show();
                    $('#fpg_author_bg_color_main').show();
                    $('#fpg_author_padding_main').show();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg-read-more-alignment').show();                   
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                  
                }else if (selectedStyle === 'style8') {

                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide(); 
                    $('#fpg_button_order_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_field_group_categories_main').show(); 
                    $('#fpg_field_group_excerpt_main').hide(); 
                    $('#fpg_field_group_button_main').hide(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_field_group_comment_count_main').hide();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fancy_button_option_main').hide();
                    $('#fpg_excerpt_main').hide();                 
                    $('#fpg_button_settings_main').hide();
                    $('#fpg_meta_settings_main').hide();
                    $('#fpg_title_alignment_main').hide();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_category_color_main').show();
                    $('#fpg_category_bg_color_main').show();
                    $('#fpg_category_padding_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_meta_hover_color_main').hide();                  
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    
                }else if (selectedStyle === 'style9') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').hide();
                    // Field Selector
                    $('#fpg_field_group_categories_main').hide(); 
                    $('#fpg_field_group_excerpt_main').hide(); 
                    $('#fpg_field_group_button_main').hide(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_meta_bgcolor_box').hide(); 
                    $('#fpg_field_group_comment_count_main').hide();
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fancy_button_option_main').hide();
                    $('#fpg_button_settings_main').hide();
                    $('#fpg_meta_settings_main').hide();
                    $('#fpg_title_alignment_main').hide();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_excerpt_main').hide();
                    $('#fpg_meta_hover_color_main').hide();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                     
                }else if (selectedStyle === 'style10') {

                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    // Field Selector
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_categories_main').hide(); 
                    $('#fpg_field_group_excerpt_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_field_group_comment_count_main').hide();
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fpg_excerpt_main').hide();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_title_alignment_main').show();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                   
                }else if (selectedStyle === 'style11') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();

                    // Field Selector
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_categories_main').show(); 
                    $('#fpg_field_group_excerpt_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_field_group_comment_count_main').hide();
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fpg_excerpt_main').hide();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_title_alignment_main').show();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_hover_color_main').show();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_section_image_shape_main').hide();
 
                }else if (selectedStyle === 'style12')  {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    // Field Selector
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_categories_main').show(); 
                    $('#fpg_field_group_excerpt_main').show(); 
                    $('#fpg_field_group_button_main').show(); 
                    $('#fpg_field_group_tag_main').hide(); 
                    $('#fpg_field_group_comment_count_main').hide();
                    $('#fpg_excerpt_setting_main').show(); 
                    $('#fpg_excerpt_main').show();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_title_alignment_main').show();
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_author_color_main').show();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').show();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_single_content_section_padding_box').hide();
                    $('#fpg_title_hover_color_box').hide();
                    $('#fpg_meta_hover_color_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').show();
                    $('#fpg_section_image_shape_main').hide();
 
                } 
            } else if (selectedLayout === 'slider') {
                
                if (selectedSliderStyle === 'sliderstyle1') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').show();
                    $('#fpg_field_group_comment_count_main').show(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_section_image_shape_main').hide();

                } else if (selectedSliderStyle === 'sliderstyle2') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').hide()                   
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_section_image_shape_main').hide();
  
                }else if (selectedSliderStyle === 'sliderstyle3') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').hide();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show()                   
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_section_image_shape_main').show();
  
                }else if (selectedSliderStyle === 'sliderstyle4') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').show(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').hide();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show()                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_section_image_shape_main').hide();
  
                }else if (selectedSliderStyle === 'sliderstyle5') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show()                   
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_section_image_shape_main').hide();
  
                }else if (selectedSliderStyle === 'sliderstyle6') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').hide();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').hide()                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();                  
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_section_image_shape_main').hide();
  
                }else if (selectedSliderStyle === 'sliderstyle7') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').hide();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_meta_hover_color_main').show()                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();                   
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
                    $('#fpg_meta_icon_color_main').hide();
                    $('#fpg_section_image_shape_main').hide();
  
                }
            } else if (selectedLayout === 'list') {
                
                if (selectedListStyle === 'liststyle1') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();

                } else if (selectedListStyle === 'liststyle2') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
  
                }else if (selectedListStyle === 'liststyle3') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show();  
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
  
                }else if (selectedListStyle === 'liststyle4') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();  
                }else if (selectedListStyle === 'liststyle5') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
  
                }else if (selectedListStyle === 'liststyle6') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').hide(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').hide();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').hide();
                    $('#fpg_button_settings_main').hide();
                    $('#fpg_section_bg_hover_main').hide();
  
                }else if (selectedListStyle === 'liststyle7') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').hide();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').hide();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
  
                }else if (selectedListStyle === 'liststyle8') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').hide();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
  
                }
            } else if (selectedLayout === 'isotope') {
                
                if (selectedIsotopeStyle === 'isotopestyle1') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').show();
                    $('#fpg_field_group_comment_count_main').show(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();

                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();

                } else if (selectedIsotopeStyle === 'isotopestyle2') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
                    $('#fpg-read-more-alignment').show();
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_section_image_shape_main').hide();
                    $('#fpg_author_color_main').hide();
                    $('#fpg_author_bg_color_main').hide();
                    $('#fpg_author_padding_main').hide();
                    $('#fpg_category_color_main').hide();
                    $('#fpg_category_bg_color_main').hide();
                    $('#fpg_category_padding_main').hide();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();

                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();
  
                }
            }
        }

        function toggleLayoutFields() {
            var selectedLayout = $('input[name="fpg_layout_select"]:checked').val();
            if (selectedLayout === 'grid') {
                $('#fancy_post_grid_style').show();
                $('#fancy_post_column_grid').show();
                $('#fancy_post_slider_style').hide();
                $('#fancy_post_list_style').hide();
                $('#fancy_post_isotope_style').hide();
                $('#fancy_post_column_slider').hide();
                $('#fpg_slider_option').hide();
                $('#fpg_slider_pagination_option').hide();
                $('#fpg_pagination').show();
                

            } else if (selectedLayout === 'slider') {
                $('#fancy_post_grid_style').hide();
                $('#fpg_pagination').hide();
                $('#fancy_post_column_grid').hide();
                $('#fancy_post_slider_style').show();
                $('#fancy_post_list_style').hide();
                $('#fancy_post_isotope_style').hide();
                $('#fancy_post_column_slider').show();
                $('#fpg_slider_option').show();
                $('#fpg_slider_pagination_option').show();
                

            }else if (selectedLayout === 'list') {
                $('#fancy_post_grid_style').hide();
                $('#fpg_pagination').hide();
                $('#fancy_post_column_grid').hide();
                $('#fancy_post_slider_style').hide();
                $('#fancy_post_list_style').show();
                $('#fancy_post_isotope_style').hide();
                $('#fancy_post_column_slider').hide();
                $('#fpg_slider_option').hide();
                $('#fpg_slider_pagination_option').hide();
                

            }else if (selectedLayout === 'isotope') {
                $('#fancy_post_grid_style').hide();
                $('#fpg_pagination').hide();
                $('#fancy_post_column_grid').show();
                $('#fancy_post_slider_style').hide();
                $('#fancy_post_column_slider').hide();
                $('#fancy_post_list_style').hide();
                $('#fancy_post_isotope_style').show();
                $('#fpg_slider_option').hide();
                $('#fpg_slider_pagination_option').hide();
                

            }
        }

        function toggleButtonFields() {
            var selectedLayout = $('#fancy_button_option').val();
            if (selectedLayout === 'filled') {
                $('#fpg_post_select_button').show();
                $('#fpg_button_br_color').hide();
                $('#fpg_button_bg_color').show();
                $('#fpg_button_bg_hover_color').show();
            } else if (selectedLayout === 'flat') {
                $('#fpg_post_select_button').hide();
                $('#fpg_button_br_color').hide();
                $('#fpg_button_bg_color').hide();
                $('#fpg_button_bg_hover_color').hide();

            } else {
                $('#fpg_post_select_button').hide();
                $('#fpg_button_br_color').show();
                $('#fpg_button_bg_color').hide();
                $('#fpg_button_bg_hover_color').hide();
            }
        }
    
        function togglePaginationFields() {
            var paginationStatus = $('input[name="fancy_post_pagination"]:checked').val();
            if (paginationStatus === 'on') {
                $('#fpg_post_per_page_fieldset').show();
            } else {
                $('#fpg_post_per_page_fieldset').hide();
            }
        }
    
        // Initialize the visibility on page load
        toggleLayoutActiveFields();
        toggleLayoutFields();
        toggleButtonFields();
        togglePaginationFields();
    
        // Bind the function to the change event for both layout and style radio buttons
        $('input[name="fpg_layout_select"], input[name="fancy_post_grid_style"], input[name="fancy_slider_style"]').on('change', function() {
            toggleLayoutActiveFields();
        });

        $('input[name="fpg_layout_select"]').change(function() {
            toggleLayoutFields();
        });

        // Change event for the Button selection (updated to handle <select> dropdown)
        $('#fancy_button_option').change(function() {
            toggleButtonFields();
        });
    
        // Change event for the pagination
        $('input[name="fancy_post_pagination"]').change(function() {
            togglePaginationFields();
        });


        function togglePaginationSection() {
            if ($('input[name="fancy_post_pagination"]:checked').val() === 'off') {
                $('#fpg_pagination_main').hide();
            } else {
                $('#fpg_pagination_main').show();
            }
        }

        // Initial call to set visibility on page load
        togglePaginationSection();

        // Event listener for changes in the pagination radio buttons
        $('input[name="fancy_post_pagination"]').on('change', function() {
            togglePaginationSection();
        });


        // Initialize Select2 for the dropdowns
        $('#fancy_post_cl_lg, #fancy_post_cl_md, #fancy_post_cl_sm, #fancy_post_cl_mobile').select2({
            placeholder: 'Select Column',
            allowClear: true
        });
        // Initialize Select2 for the title tag select
        $('#fancy_post_title_tag').select2({
            placeholder: 'Select Title Tag',
            allowClear: true
        });

        // Function to toggle visibility of image settings fields
        function toggleImageFields() {
            var hideFeatureImage = $('input[name="fancy_post_hide_feature_image"]:checked').val();
            if (hideFeatureImage === 'off') {
                $('.fpg-feature-image-size').hide();
                $('.fpg-media-source').hide();
                $('.fpg-hover-animation').hide();
                $('.fpg-image-border-radius').hide();
            } else {
                $('.fpg-feature-image-size').show();
                $('.fpg-media-source').show();
                $('.fpg-hover-animation').show();
                // $('.fpg-image-border-radius').show();
            }
        }

        // Initialize the visibility on page load
        toggleImageFields();

        // Change event for the hide feature image radio buttons
        $('input[name="fancy_post_hide_feature_image"]').change(function() {
            toggleImageFields();
        });

        // Initialize Select2 for the dropdowns
        $('#fancy_post_feature_image_size, #fancy_post_hover_animation').select2({
            placeholder: 'Select an option',
            allowClear: true
        });
    });
    jQuery(document).ready(function($) {
    function toggleTermsFields() {
        if ($('#fpg_field_group_category').is(':checked')) {
            $('#fpg_category_terms').show();
            $('#fpg_category_operator').show();
        } else {
            $('#fpg_category_terms').hide();
            $('#fpg_category_operator').hide();
        }

        if ($('#fpg_field_group_tags').is(':checked')) {
            $('#fpg_tags_terms').show();
            $('#fpg_tags_operator').show();
            
        } else {
            $('#fpg_tags_terms').hide();
            $('#fpg_tags_operator').hide();
        }

        if ($('#fpg_field_group_category').is(':checked') && $('#fpg_field_group_tags').is(':checked')) {
            $('#fpg_relation').show();
        } else {
            $('#fpg_relation').hide();
        }
        if ($('#fpg_field_group_category').is(':checked') || $('#fpg_field_group_tags').is(':checked')) {
            $('#fpg-terms').show();
        } else {
            $('#fpg-terms').hide();
        }
        
    }

    // Initialize visibility on page load
    toggleTermsFields();

    // Change event for checkboxes
    $('#fpg_field_group_category, #fpg_field_group_tags').change(function() {
        toggleTermsFields();
    });

    // Initialize Select2 for the dropdowns
    $('#fpg_filter_category_terms, #fpg_filter_tags_terms').select2({
        placeholder: 'Select terms',
        allowClear: true
    });
    $(' #fpg_filter_authors').select2({
        placeholder: 'Select Authors',
        allowClear: true
    });
    $(' #fpg_filter_statuses').select2({
        placeholder: 'Select Status',
        allowClear: true
    });

});
    
$(document).ready(function() {
    $('input[name="fancy_post_grid_style"]').change(function() {
        var selectedStyles = $(this).val();

        if (selectedStyles === 'style1') {
            
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val('#ffffff'); 
            $('#fpg_single_section_margin').val('40px 0 0');
            $('#fpg_single_section_padding').val('0px');
            $('#fpg_single_content_section_padding').val('20px 0px 0px 0px');
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_cl_lg').val('4').change();
            $('#fancy_post_section_border_radius').val('5px');
            $('#fpg_title_color').val('#161616'); 
            $('#fpg_title_hover_color').val('#007aff'); 
            $('#fpg_title_margin').val('10px 0px 0px');
            $('#fpg_title_padding').val('0px');
            $('#fpg_title_font_size').val('24');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('34px');
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_meta_icon_color').val('#007aff'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val(''); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('10px 0px 10px 0px');
            $('#fpg_excerpt_color').val('');
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_padding').val('0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_text_hover_color').val('#007aff'); 
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('700');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val(''); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('');
            $('#fpg_pagination_border_color').val('#eaeaea'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#007aff'); 
            $('#fpg_pagination_hover_border_color').val('#007aff'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#007aff'); 
            $('#fpg_pagination_active_border_color').val('#007aff'); 
            $('#fpg_pagination_color').val(''); 
            $('#fpg_pagination_background').val(''); 
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
            $('#fancy_button_option').val('flat').change();
            $('#fancy_post_hover_animation').val('zoom_in').change();
            $('#fancy_post_image_border_radius').val('5px');
            $('#fancy_post_feature_image_size').val('fancy_post_custom_size').change();

        } else if (selectedStyles === 'style2') {
            $('#fpg_section_background_color').val('#ffffff'); 
            $('#fpg_section_margin').val('0px');
            $('#fpg_section_padding').val('30px 0px 0px 0px');
            $('#fpg_single_section_background_color').val('#f7f7f7'); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('30px 0px 0px 0px');
            $('#fpg_single_section_padding').val('0px 0px 0px 0px');
            $('#fpg_single_content_section_padding').val('30px');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_section_border_radius').val('5px');
            $('#fpg_title_color').val('#000000');  
            $('#fpg_title_hover_color').val('#1e73be'); 
            $('#fpg_title_margin').val('0px 0px 0px 0px');
            $('#fpg_title_padding').val('0px 0px 15px 0px');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('32px');
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val('#1e73be'); 
            $('#fpg_meta_icon_color').val('#1e73be');
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('15');
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val('');
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('0px');
            $('#fpg_excerpt_padding').val('0px');
            $('#fpg_excerpt_color').val('');
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_button_text_hover_color').val('');
            $('#fpg_button_font_size').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val(''); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('');
            $('#fpg_pagination_color').val('#000000'); 
            $('#fpg_pagination_background').val('#efefef'); 
            $('#fpg_pagination_border_color').val('#eaeaea');
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#1e73be');
            $('#fpg_pagination_hover_border_color').val('#1e73be');
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#007aff'); 
            $('#fpg_pagination_active_border_color').val('#1e73be');
            $('#fancy_button_option').val('filled').change();
            $('#fancy_post_hover_animation').val('zoom_in').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('fancy_post_landscape').change();
            $('#fancy_button_border_style').val('unset').change();
            $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();

        } else if (selectedStyles === 'style3') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val('');
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val(' 0px');
            $('#fpg_single_section_margin').val('40px 0px 0px 0px');
            $('#fpg_single_section_padding').val('0px 0px 0px 0px');
            $('#fpg_single_content_section_padding').val('20px 30px 30px 30px');
            $('#fpg_single_section_background_color').val(''); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_section_border_radius').val('5px');
            $('#fancy_post_border_style').val('unset').change();
            $('#fpg_title_hover_color').val('#634bf8'); 
            $('#fpg_title_margin').val('0px 0px 0px 0px');
            $('#fpg_title_padding').val('5px 0px 10px 0px');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('32px');
            $('#fpg_title_color').val('');  
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_meta_bgcolor').val('#634bf8');
            $('#fpg_meta_size').val('15'); 
            $('#fpg_meta_font_weight').val('400').change();
            $('#fpg_meta_padding').val('9px 30px 9px 0');
            $('#fpg_meta_hover_color').val('#1e73be'); 
            $('#fpg_meta_icon_color').val('#1e73be'); 
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('0px 0px 0px 0px');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val('#634bf8'); 
            $('#fpg_button_text_color').val('#ffffff'); 
            $('#fpg_button_padding').val('10px 30px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_button_text_hover_color').val(''); 
            $('#fpg_button_font_size').val('');
            $('#fpg_button_hover_background_color').val('');
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_pagination_border_color').val('#e8e8e8'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_color').val(''); 
            $('#fpg_pagination_background').val(''); 
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#634bf8'); 
            $('#fpg_pagination_hover_border_color').val('#634bf8'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#634bf8'); 
            $('#fpg_pagination_active_border_color').val('#634bf8'); 
            $('#fancy_button_option').val('filled').change();
            $('#fancy_post_hover_animation').val('zoom_out').change();
            $('#fancy_post_image_border_radius').val('5px');
            $('#fancy_post_feature_image_size').val('fancy_post_landscape').change();
            $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();

        } else if (selectedStyles === 'style4') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val('#f2f2f2'); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0px 0px 0px');
            $('#fpg_single_section_padding').val('20px 20px 15px 20px');
            $('#fpg_single_content_section_padding').val('20px 0px 20px 0px');
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_section_border_radius').val('');
            $('#fpg_title_color').val('#000000');  
            $('#fpg_title_hover_color').val('#007aff'); 
            $('#fpg_title_margin').val('0px 0px 5px 0px');
            $('#fpg_title_padding').val('0px 0px 0px 0px');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('');
            $('#fpg_meta_color').val('#331838'); 
            $('#fpg_meta_hover_color').val('#007aff');
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('15'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('0px 0px 0px 0px');
            $('#fpg_meta_padding').val('0px 0px 0px 0px');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val('');
            $('#fpg_date_bg_color').val('#007aff'); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val('#666666'); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('10px 25px 0px 25px');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val('');
            $('#fpg_button_text_hover_color').val('#007aff'); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val(''); 
            $('#fpg_pagination_background').val(''); 
            $('#fpg_pagination_border_color').val('#e5e5e5'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#007aff'); 
            $('#fpg_pagination_hover_border_color').val('#007aff'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#007aff'); 
            $('#fpg_pagination_active_border_color').val('#007aff'); 
            $('#fancy_button_option').val('').change();
            $('#fancy_post_hover_animation').val('zoom_in').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('full').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-center"]').prop('checked', true).change();

        } else if (selectedStyles === 'style5') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val('#ffffff'); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val('#007aff'); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0px 0px 0px');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val('#007aff'); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('solid').change();
            $('#fancy_post_section_border_radius').val('');
            $('#fpg_title_color').val('');  
            $('#fpg_title_hover_color').val(''); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('26');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('40px');
            $('#fpg_meta_color').val('#331838'); 
            $('#fpg_meta_hover_color').val('#007aff'); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('15'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val('#007aff'); 
            $('#fpg_date_bg_color').val('#ffffff'); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val('#ffffff'); 
            $('#fpg_button_text_hover_color').val('#ffffff'); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('0px 0 0');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val(''); 
            $('#fpg_pagination_background').val(''); 
            $('#fpg_pagination_border_color').val('#e5e5e5'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('10px');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#007aff'); 
            $('#fpg_pagination_hover_border_color').val('#007aff'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#007aff'); 
            $('#fpg_pagination_active_border_color').val('#007aff'); 
            $('#fancy_button_option').val('flat').change();
            $('#fancy_post_hover_animation').val('zoom_in').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('fancy_post_square').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();

        } else if (selectedStyles === 'style6') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val(''); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0px 0px 0px');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_section_border_radius').val('');
            $('#fpg_title_color').val('');  
            $('#fpg_title_hover_color').val(''); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('');
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('15'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val('#ffffff'); 
            $('#fpg_button_text_hover_color').val('#ffffff'); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('0px 0 0');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val('#cb003b'); 
            $('#fpg_pagination_background').val('#ffffff'); 
            $('#fpg_pagination_border_color').val('#efefef'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#cb003b'); 
            $('#fpg_pagination_hover_border_color').val('#cb003b'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#cb003b'); 
            $('#fpg_pagination_active_border_color').val('#cb003b'); 
            $('#fancy_button_option').val('border').change();
            $('#fancy_post_hover_animation').val('zoom_out').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('fancy_post_landscape').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
        } else if (selectedStyles === 'style7') {
            $('#fancy_post_cl_lg').val('3').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val(''); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0 0');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val('#efefef'); 
            $('#fancy_post_border_width').val('1px');
            $('#fancy_post_border_style').val('solid').change();
            $('#fancy_post_section_border_radius').val('10px');
            $('#fpg_title_color').val('');  
            $('#fpg_title_hover_color').val(''); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('20');
            $('#fpg_title_font_weight').val('500').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('28px');
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('16'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val(''); 
            $('#fpg_button_text_hover_color').val(''); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('');
            $('#fpg_button_font_weight').val('');
            $('#fancy_button_border_style').val('');
            $('#fpg_pagination_color').val('#7a7a7a'); 
            $('#fpg_pagination_background').val('#ffffff'); 
            $('#fpg_pagination_border_color').val('#efefef'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#337ccf'); 
            $('#fpg_pagination_hover_border_color').val('#337ccf'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#337ccf'); 
            $('#fpg_pagination_active_border_color').val('#337ccf'); 
            $('#fancy_button_option').val('border').change();
            $('#fancy_post_hover_animation').val('zoom_out').change();
            $('#fancy_post_image_border_radius').val('10px');
            $('#fancy_post_feature_image_size').val('fancy_post_square').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
        } else if (selectedStyles === 'style8') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val(''); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('30px 0 0');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_section_border_radius').val('');
            $('#fpg_title_color').val('');  
            $('#fpg_title_hover_color').val(''); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('24');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('32px');
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('16'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val(''); 
            $('#fpg_button_text_hover_color').val(''); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('');
            $('#fpg_button_font_weight').val('');
            $('#fancy_button_border_style').val('');
            $('#fpg_pagination_color').val(''); 
            $('#fpg_pagination_background').val(''); 
            $('#fpg_pagination_border_color').val('#ffffff'); 
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val(''); 
            $('#fpg_pagination_hover_background').val(''); 
            $('#fpg_pagination_hover_border_color').val(''); 
            $('#fpg_pagination_active_color').val(''); 
            $('#fpg_pagination_active_background').val(''); 
            $('#fpg_pagination_active_border_color').val(''); 
            $('#fancy_button_option').val('border').change();
            $('#fancy_post_hover_animation').val('zoom_in').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('full').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
        } else if (selectedStyles === 'style9') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px 0px 0px 0px');
            $('#fpg_single_section_background_color').val(''); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0 0');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_section_border_radius').val('5px');
            $('#fpg_title_color').val('#000000');  
            $('#fpg_title_hover_color').val('#007aff'); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('30px');
            $('#fpg_meta_color').val('#939393'); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('15'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val('#000000'); 
            $('#fpg_button_text_hover_color').val('#ffffff'); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('0px 0 0');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val('#000000'); 
            $('#fpg_pagination_background').val('#efefef'); 
            $('#fpg_pagination_border_color').val(''); 
            $('#fpg_pagination_border_width').val('');
            $('#fpg_pagination_border_style').val('unset');
            $('#fpg_pagination_border_radius').val('');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#007aff'); 
            $('#fpg_pagination_hover_border_color').val(''); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#008bef'); 
            $('#fpg_pagination_active_border_color').val(''); 
            $('#fancy_button_option').val('border').change();
            $('#fancy_post_hover_animation').val('zoom_out').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('fancy_post_landscape').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
        } else if (selectedStyles === 'style10') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val('#ffffff'); 
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px 0px 0px 0px');
            $('#fpg_single_section_background_color').val(''); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0 0');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('25px 35px 30px 35px');
            $('#fpg_single_section_border_color').val('#e0e0e0'); 
            $('#fancy_post_border_width').val('1px');
            $('#fancy_post_border_style').val('solid').change();
            $('#fancy_post_section_border_radius').val('');
            $('#fpg_title_color').val('#000000');  
            $('#fpg_title_hover_color').val('#007aff'); 
            $('#fpg_title_margin').val('10px 0px 5px 0px');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('30px');
            $('#fpg_meta_color').val('#9b9b9b'); 
            $('#fpg_meta_hover_color').val('#007aff'); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('15'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('0px 0px 15px 0px');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val('#007aff'); 
            $('#fpg_button_hover_background_color').val('#0062ed'); 
            $('#fpg_button_text_color').val('#ffffff'); 
            $('#fpg_button_text_hover_color').val('#ffffff'); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('10px 15px 10px 15px');
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val('#000000'); 
            $('#fpg_pagination_background').val('#efefef'); 
            $('#fpg_pagination_border_color').val(''); 
            $('#fpg_pagination_border_width').val('');
            $('#fpg_pagination_border_style').val('unset');
            $('#fpg_pagination_border_radius').val('');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#007aff'); 
            $('#fpg_pagination_hover_border_color').val(''); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#007aff'); 
            $('#fpg_pagination_active_border_color').val(''); 
            $('#fancy_button_option').val('filled').change();
            $('#fancy_post_hover_animation').val('none').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('full').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();

        } else if (selectedStyles === 'style11') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('0px');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val('#ffffff'); 
            $('#fpg_single_section_background_hover_color').val(''); 
            $('#fpg_single_section_margin').val('40px 0 0');
            $('#fpg_single_section_padding').val('');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_section_border_radius').val('');
            $('#fpg_title_color').val('');  
            $('#fpg_title_hover_color').val(''); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('20');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('28px');
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('16'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val(''); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val(''); 
            $('#fpg_button_text_hover_color').val(''); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('');
            $('#fpg_button_padding').val('');
            $('#fpg_button_font_size').val('');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val('#e25a42'); 
            $('#fpg_pagination_background').val(''); 
            $('#fpg_pagination_border_color').val(''); 
            $('#fpg_pagination_border_width').val('');
            $('#fpg_pagination_border_style').val('unset');
            $('#fpg_pagination_border_radius').val('');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#e25a42'); 
            $('#fpg_pagination_hover_border_color').val('#e25a42'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#e25a42'); 
            $('#fpg_pagination_active_border_color').val('#e25a42'); 
            $('#fancy_button_option').val('border').change();
            $('#fancy_post_hover_animation').val('zoom_out').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('fancy_post_landscape').change();
             $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
        } else if (selectedStyles === 'style12') {
            $('#fancy_post_cl_lg').val('4').change();
            $('#fpg_section_background_color').val(''); 
            $('#fpg_section_margin').val('12px');
            $('#fpg_section_padding').val('0px');
            $('#fpg_single_section_background_color').val('#efefef'); 
            $('#fpg_single_section_background_hover_color').val('#007aff'); 
            $('#fpg_single_section_margin').val('0px 0px 0px 0px');
            $('#fpg_single_section_padding').val('40px 35px 50px 35px');
            $('#fpg_single_content_section_padding').val('');
            $('#fpg_single_section_border_color').val(''); 
            $('#fancy_post_border_width').val('');
            $('#fancy_post_border_style').val('unset').change();
            $('#fancy_post_section_border_radius').val('10px 10px');
            $('#fpg_title_color').val('');  
            $('#fpg_title_hover_color').val(''); 
            $('#fpg_title_margin').val('');
            $('#fpg_title_padding').val('');
            $('#fpg_title_font_size').val('22');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val(''); 
            $('#fpg_title_border_width').val('');
            $('#fpg_title_border_style').val('unset').change();
            $('#fpg_title_line_height').val('30px');
            $('#fpg_meta_color').val(''); 
            $('#fpg_meta_hover_color').val(''); 
            $('#fpg_meta_icon_color').val(''); 
            $('#fpg_meta_bgcolor').val(''); 
            $('#fpg_meta_size').val('16'); 
            $('#fpg_meta_font_weight').val('400').change(); 
            $('#fpg_meta_margin').val('');
            $('#fpg_meta_padding').val('');
            $('#fpg_meta_gap').val('');
            $('#fpg_meta_line_height').val('');
            $('#fpg_author_color').val(''); 
            $('#fpg_author_bg_color').val(''); 
            $('#fpg_author_padding').val('');
            $('#fpg_category_color').val(''); 
            $('#fpg_category_bg_color').val(''); 
            $('#fpg_category_padding').val('');
            $('#fpg_date_color').val(''); 
            $('#fpg_date_bg_color').val(''); 
            $('#fpg_date_padding').val('');
            $('#fpg_excerpt_color').val(''); 
            $('#fpg_excerpt_size').val('');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('');
            $('#fpg_excerpt_padding').val('0px 0px 0px 0px');
            $('#fpg_excerpt_line_height').val('');
            $('#fpg_button_background_color').val('#007aff'); 
            $('#fpg_button_hover_background_color').val(''); 
            $('#fpg_button_text_color').val(''); 
            $('#fpg_button_text_hover_color').val('#000000'); 
            $('#fpg_button_border_color').val('');
            $('#fpg_button_margin').val('0px 0 0');
            $('#fpg_button_padding').val('10px 17px 11px 15px');
            $('#fpg_button_font_size').val('16px');
            $('#fpg_button_font_weight').val('400');
            $('#fancy_button_border_style').val('unset');
            $('#fpg_pagination_color').val('#000000'); 
            $('#fpg_pagination_background').val('#efefef'); 
            $('#fpg_pagination_border_color').val('#efefef'); 
            $('#fpg_pagination_border_width').val('');
            $('#fpg_pagination_border_style').val('unset');
            $('#fpg_pagination_border_radius').val('');
            $('#fpg_pagination_height').val('');
            $('#fpg_pagination_width').val('');
            $('#fpg_pagination_padding').val('');
            $('#fpg_pagination_margin').val('');
            $('#fpg_pagination_gap').val('');
            $('#fpg_pagination_hover_color').val('#ffffff'); 
            $('#fpg_pagination_hover_background').val('#007aff'); 
            $('#fpg_pagination_hover_border_color').val('#007aff'); 
            $('#fpg_pagination_active_color').val('#ffffff'); 
            $('#fpg_pagination_active_background').val('#007aff'); 
            $('#fpg_pagination_active_border_color').val('#007aff'); 
            $('#fancy_button_option').val('filled').change();
            $('#fancy_post_hover_animation').val('zoom_out').change();
            $('#fancy_post_image_border_radius').val('');
            $('#fancy_post_feature_image_size').val('fancy_post_square').change();
            $('input[name="fancy_post_main_box_alignment"][value="align-start"]').prop('checked', true).change();
        }

        // Trigger change events to apply any related updates
        $('#fpg_section_background_color').change();
        $('#fpg_section_margin').change();
        $('#fpg_section_padding').change();
        $('#fancy_post_cl_lg').change();

        $('#fpg_single_section_background_color').change();
        $('#fpg_single_section_background_hover_color').change();
        $('#fpg_single_section_margin').change();
        $('#fpg_single_section_padding').change();
        $('#fpg_single_content_section_padding').change();
        $('#fpg_single_section_border_color').change();
        $('#fancy_post_border_width').change();
        $('#fancy_post_border_style').change();
        $('#fancy_post_section_border_radius').change();

        $('#fpg_title_color').change();
        $('#fpg_title_hover_color').change();
        $('#fpg_title_margin').change();
        $('#fpg_title_padding').change();
        $('#fpg_title_font_size').change();
        $('#fpg_title_font_weight').change();
        $('#fpg_title_border_color').change();
        $('#fpg_title_border_width').change();
        $('#fpg_title_border_style').change();
        $('#fpg_title_line_height').change();

        $('#fpg_meta_color').change();
        $('#fpg_meta_hover_color').change();
        $('#fpg_meta_icon_color').change();
        $('#fpg_meta_bgcolor').change();
        $('#fpg_meta_size').change();
        $('#fpg_meta_font_weight').change();
        $('#fpg_meta_margin').change();
        $('#fpg_meta_padding').change();
        $('#fpg_meta_gap').change();
        $('#fpg_meta_line_height').change();
        $('#fpg_author_color').change();
        $('#fpg_author_bg_color').change();
        $('#fpg_author_padding').change();
        $('#fpg_category_color').change();
        $('#fpg_category_bg_color').change();
        $('#fpg_category_padding').change();
        $('#fpg_date_color').change();
        $('#fpg_date_bg_color').change();
        $('#fpg_date_padding').change();
        $('#fpg_excerpt_color').change();
        $('#fpg_excerpt_size').change();
        $('#fpg_excerpt_font_weight').change();
        $('#fpg_excerpt_margin').change();
        $('#fpg_excerpt_padding').change();
        $('#fpg_excerpt_line_height').change();

        $('#fpg_button_background_color').change();
        $('#fpg_button_hover_background_color').change();
        $('#fpg_button_text_color').change();
        $('#fpg_button_text_hover_color').change();
        $('#fpg_button_border_color').change();
        $('#fancy_button_border_style').change();
        $('#fpg_button_margin').change();
        $('#fpg_button_padding').change();
        $('#fpg_button_font_size').change();
        $('#fpg_button_font_weight').change();
        $('#fpg_pagination_color').change();
        $('#fpg_pagination_background').change();
        $('#fpg_pagination_border_color').change();
        $('#fpg_pagination_border_width').change();
        $('#fpg_pagination_border_style').change();
        $('#fpg_pagination_border_radius').change();
        $('#fpg_pagination_height').change();
        $('#fpg_pagination_width').change();
        $('#fpg_pagination_padding').change();
        $('#fpg_pagination_margin').change();
        $('#fpg_pagination_gap').change();
        $('#fpg_pagination_hover_color').change();
        $('#fpg_pagination_hover_background').change();
        $('#fpg_pagination_hover_border_color').change();
        $('#fpg_pagination_active_color').change();
        $('#fpg_pagination_active_background').change();
        $('#fpg_pagination_active_border_color').change();
        $('#fancy_button_option').change();
        $('#fancy_post_hover_animation').change();
        $('#fancy_post_feature_image_size').change();
        $('#fancy_post_image_border_radius').change();
        $('#fancy_button_border_style').change();
        
        $('input[name="fancy_post_main_box_alignment"]').change();

        
    });
});

})(jQuery);