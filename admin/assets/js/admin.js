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
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').show();
                    $('#fpg_field_group_comment_count_main').show(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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

                     
                }else if (selectedStyle === 'style2') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').show();
                    $('#fpg_field_group_comment_count_main').show(); 
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
                    $('#fpg_meta_gap_main').hide();
                    $('#fpg_meta_bgcolor_box').hide();
                    $('#fpg_date_color_main').show();
                    $('#fpg_date_bg_color_main').show();
                    $('#fpg_date_padding_main').show();
                    $('#fancy_button_option_main').hide();
                    $('#fpg_button_settings_main').hide();
                    $('#fpg_section_bg_hover_main').hide();

                     
                }else if (selectedStyle === 'style5') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();
                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').show();
                    $('#fpg_field_group_comment_count_main').show(); 
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
                    $('#fpg_date_color_main').show();
                    $('#fpg_date_bg_color_main').show();
                    $('#fpg_date_padding_main').show();
                    $('#fancy_button_option_main').show();
                    $('#fpg_button_settings_main').show();
                    $('#fpg_section_bg_hover_main').hide();

                     
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
                   
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_date_color_main').hide();
                    $('#fpg_date_bg_color_main').hide();
                    $('#fpg_date_padding_main').hide();
                    $('#fpg_section_bg_hover_main').hide();

                     
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

                    $('#fpg_meta_icon_color_main').show();
                    $('#fpg_excerpt_setting_main').hide(); 
                    $('#fancy_button_option_main').hide();
                    $('#fpg_excerpt_main').hide(); 
                    $('#fpg_field_group_button_main').hide();
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

                     
                }else if (selectedStyle === 'style10') {

                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();

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

                     
                }else if (selectedStyle === 'style11') {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').hide();
                    $('#fpg_button_order_main').show();

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
 
                }else if (selectedStyle === 'style12')  {
                    // Ordering
                    $('#fpg_title_order_main').show(); 
                    $('#fpg_meta_order_main').show();
                    $('#fpg_excerpt_order_main').show();
                    $('#fpg_button_order_main').show();

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
  
                }else if (selectedSliderStyle === 'sliderstyle3') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
  
                }else if (selectedSliderStyle === 'sliderstyle4') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').show(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
  
                }else if (selectedSliderStyle === 'sliderstyle5') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
  
                }else if (selectedSliderStyle === 'sliderstyle6') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').hide();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
                    $('#fpg_meta_icon_color_main').show();
  
                }else if (selectedSliderStyle === 'sliderstyle7') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
                    $('#fpg_meta_icon_color_main').show();
  
                }
            }else if (selectedLayout === 'list') {
                
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
  
                }else if (selectedListStyle === 'liststyle3') {
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
  
                }else if (selectedListStyle === 'liststyle4') {
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
  
                }else if (selectedListStyle === 'liststyle5') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
  
                }else if (selectedListStyle === 'liststyle6') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').hide();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').hide(); 
                    // Ordering
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

                    $('#fpg_meta_hover_color_main').show()
                    
                    $('#fpg_single_content_section_padding_box').show();
                    $('#fpg_title_hover_color_box').show();
                    $('#fpg_meta_settings_main').show();
                    $('#fpg_meta_gap_main').show();
                    $('#fpg_meta_bgcolor_box').hide();
                    
                    $('#fancy_button_option_main').hide();
                    $('#fpg_button_settings_main').hide();
  
                }else if (selectedListStyle === 'liststyle7') {
                    $('#fpg_field_group_author_main').hide();
                    $('#fpg_field_group_post_date_main').hide();
                    $('#fpg_field_group_excerpt_main').hide();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
  
                }else if (selectedListStyle === 'liststyle8') {
                    $('#fpg_field_group_author_main').show();
                    $('#fpg_field_group_post_date_main').show();
                    $('#fpg_field_group_excerpt_main').show();
                    $('#fpg_field_group_categories_main').show();
                    $('#fpg_field_group_tag_main').hide();
                    $('#fpg_field_group_comment_count_main').hide(); 
                    $('#fpg_field_group_button_main').show(); 
                    // Ordering
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
  
                }
            }else if (selectedLayout === 'isotope') {
                
                if (selectedIsotopeStyle === 'isotopestyle1') {
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

                } else if (selectedIsotopeStyle === 'isotopestyle2') {
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
            
            // Set values for style1 (Full Area / Section Style)
            $('#fpg_section_background_color').val('#ffffff'); // White background
            $('#fpg_section_margin').val('');
            $('#fpg_section_padding').val('0px');

            // Set values for style1 (Single Area / Section Style)
            $('#fpg_single_section_background_color').val('#ff0000'); // Red background
            $('#fpg_single_section_background_hover_color').val('#cc0000'); // Darker red on hover
            $('#fpg_single_section_margin').val('15px 20px 25px 30px');
            $('#fpg_single_section_padding').val('5px 10px 15px 20px');
            $('#fpg_single_content_section_padding').val('10px 15px 20px 25px');
            $('#fpg_single_section_border_color').val('#333333'); // Dark Gray
            $('#fancy_post_border_width').val('2px');
            $('#fancy_post_border_style').val('solid').change();
            $('#fancy_post_section_border_radius').val('5px');

            $('#fpg_title_color').val('#ff0000'); // Red color
            $('#fpg_title_hover_color').val('#cc0000'); // Darker red
            $('#fpg_title_margin').val('10px 15px 10px 15px');
            $('#fpg_title_padding').val('5px 10px 5px 10px');
            $('#fpg_title_font_size').val('20');
            $('#fpg_title_font_weight').val('600').change();
            $('#fpg_title_border_color').val('#333333'); // Dark Gray
            $('#fpg_title_border_width').val('2px');
            $('#fpg_title_border_style').val('solid').change();
            $('#fpg_title_line_height').val('24px');

            // Meta Data Settings for style1
            $('#fpg_meta_color').val('#333333'); // Dark Gray
            $('#fpg_meta_hover_color').val('#666666'); // Light Gray on hover
            $('#fpg_meta_icon_color').val('#ff0000'); // Red icon
            $('#fpg_meta_bgcolor').val('#ffffff'); // White background
            $('#fpg_meta_size').val('16'); // Font size 16px
            $('#fpg_meta_font_weight').val('400').change(); // Normal weight
            $('#fpg_meta_margin').val('5px 10px 5px 10px');
            $('#fpg_meta_padding').val('5px 5px 5px 5px');
            $('#fpg_meta_gap').val('10px');
            $('#fpg_meta_line_height').val('1.5');

            // Author and Category specific settings
            $('#fpg_author_color').val('#000000'); // Black author text
            $('#fpg_author_bg_color').val('#e0e0e0'); // Light gray background
            $('#fpg_author_padding').val('5px 10px');

            $('#fpg_category_color').val('#0000ff'); // Blue category color
            $('#fpg_category_bg_color').val('#f0f0f0'); // Light gray background
            $('#fpg_category_padding').val('5px 5px');

            $('#fpg_date_color').val('#ff0000'); // Red date color
            $('#fpg_date_bg_color').val('#ffffff'); // White background
            $('#fpg_date_padding').val('5px 5px');

            // Excerpt Style Values for Style1
            $('#fpg_excerpt_color').val('#000000'); // Black text color
            $('#fpg_excerpt_size').val('14px');
            $('#fpg_excerpt_font_weight').val('400').change();
            $('#fpg_excerpt_margin').val('10px 15px 10px 15px');
            $('#fpg_excerpt_padding').val('5px 5px 5px 5px');
            $('#fpg_excerpt_line_height').val('1.5');

            // Button Style Values for Style1
            $('#fpg_button_background_color').val('#4CAF50'); // Green background
            $('#fpg_button_hover_background_color').val('#45a049'); // Darker green on hover
            $('#fpg_button_text_color').val('#ffffff'); // White text color
            $('#fpg_button_text_hover_color').val('#e7e7e7'); // Light gray on hover
            $('#fpg_button_border_color').val('#4CAF50');
            $('#fpg_button_margin').val('5px 10px 5px 10px');
            $('#fpg_button_padding').val('8px 16px');
            $('#fpg_button_font_size').val('14px');
            $('#fpg_button_font_weight').val('600');

            // Set Pagination Normal Style for style1
            $('#fpg_pagination_color').val('#000000'); // Black text
            $('#fpg_pagination_background').val('#eeeeee'); // Light gray background
            $('#fpg_pagination_border_color').val('#dddddd'); // Light gray border
            $('#fpg_pagination_border_width').val('1px');
            $('#fpg_pagination_border_style').val('solid');
            $('#fpg_pagination_border_radius').val('5px');
            $('#fpg_pagination_height').val('30px');
            $('#fpg_pagination_width').val('30px');
            $('#fpg_pagination_padding').val('5px 10px');
            $('#fpg_pagination_margin').val('10px 15px');
            $('#fpg_pagination_gap').val('10px');

            // Set Pagination Hover Style for style1
            $('#fpg_pagination_hover_color').val('#ffffff'); // White text on hover
            $('#fpg_pagination_hover_background').val('#ff0000'); // Red background on hover
            $('#fpg_pagination_hover_border_color').val('#ff6666'); // Lighter red border on hover

            // Set Pagination Active Style for style1
            $('#fpg_pagination_active_color').val('#ffffff'); // White text when active
            $('#fpg_pagination_active_background').val('#000000'); // Black background when active
            $('#fpg_pagination_active_border_color').val('#000000'); // Black border

        } else if (selectedStyles === 'style2') {
            // Set values for style2
            $('#fpg_title_color').val('#0000ff'); // Blue color
            $('#fpg_title_hover_color').val('#0000cc'); // Darker blue
            $('#fpg_title_margin').val('20px 25px 20px 25px');
            $('#fpg_title_padding').val('10px 15px 10px 15px');
            $('#fpg_title_font_size').val('24');
            $('#fpg_title_font_weight').val('400').change();
            $('#fpg_title_border_color').val('#000000'); // Black
            $('#fpg_title_border_width').val('1px');
            $('#fpg_title_border_style').val('dashed').change();
            $('#fpg_title_line_height').val('30px');
        }

        // Trigger change events to apply any related updates
        $('#fpg_section_background_color').change();
        $('#fpg_section_margin').change();
        $('#fpg_section_padding').change();

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

        console.log('Style applied:', selectedStyles);
    });
});

})(jQuery);


