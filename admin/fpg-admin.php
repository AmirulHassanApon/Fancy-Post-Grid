<?php
/**
 * Include admin styles
 */
function fancy_post_grid_admin_styles_pro( $screen ) {

    $ufpg_version = defined( 'FANCY_POST_GRID_VERSION_PRO' ) ? FANCY_POST_GRID_VERSION_PRO : '1.0.0'; // Define version number
    
    wp_enqueue_style( 'fancy_post_grid_jquery_ui', plugins_url('/assets/css/jquery-ui.css', __FILE__), array(), $ufpg_version, 'all' );
	wp_enqueue_style( 'fancy_post_grid_main_admin', plugins_url('/assets/css/admin.css', __FILE__), array(), $ufpg_version, 'all' );
	wp_enqueue_style( 'fpg_admin-font-awesome', plugins_url('/assets/css/all.min.css', __FILE__), array(), $ufpg_version, 'all' );
	wp_enqueue_style( 'fpg-bootstrap-admin', plugins_url('/assets/css/fpg_bootstrap.css', __FILE__), array(), $ufpg_version, 'all' );
    // Enqueue Select2 CSS
    wp_enqueue_style( 'select2-css', plugins_url('/assets/css/select2.min.css', __FILE__), array(), $ufpg_version, 'all' );

}
add_action( 'admin_enqueue_scripts', 'fancy_post_grid_admin_styles_pro' );

/**
 * Include admin scripts
 */
function fancy_post_grid_admin_script_pro( $screen ){
	$ufpg_version = defined( 'FANCY_POST_GRID_VERSION_PRO' ) ? FANCY_POST_GRID_VERSION_PRO : '1.0.0'; // Define version number

    wp_enqueue_style( 'wp-color-picker' ); // Enqueue WordPress core color picker stylesheet
    wp_enqueue_script( 'fpg-color-picker', plugins_url( '/assets/js/color-picker.js', __FILE__ ), array( 'wp-color-picker' ),  $ufpg_version, true );
    wp_enqueue_script( 'select2-js', plugins_url('/assets/js/select2.min.js', __FILE__), array('jquery'), $ufpg_version, null, true );	
    wp_enqueue_script( 'fpg-main', plugins_url('/assets/js/admin.js', __FILE__), array( 'jquery', 'jquery-ui-tabs', 'wp-color-picker','select2-js' ), $ufpg_version, true );
}
add_action( 'admin_enqueue_scripts', 'fancy_post_grid_admin_script_pro' );

// Function to output custom CSS and JS in the backend
function fancy_output_custom_css_js_backend() {
    // Get custom CSS from the options
    $custom_css = get_option('fpg_custom_css');
    if (!empty($custom_css)) {
        // Output the custom CSS in the head section
        echo '<style type="text/css">' . esc_html($custom_css) . '</style>';
    }

    // Get custom JS from the options
    $custom_js = get_option('fpg_custom_js');
    if (!empty($custom_js)) {
        // Output the custom JS in the head section
        echo '<script type="text/javascript">' . esc_js($custom_js) . '</script>';
    }
}

// Hook the function into the admin_head action to output both CSS and JS
add_action('admin_head', 'fancy_output_custom_css_js_backend');
/**
 * Enqueue Elementor editor styles
 */
add_action( 'elementor/editor/after_enqueue_styles', 'rs_elementor_editor_css' );
function rs_elementor_editor_css() {
    $dir = plugin_dir_url( __FILE__ );
    wp_enqueue_style( 'rs-elementor-editor-css', $dir . 'assets/css/rs-elementor-editor.css', array(), '1.0.0', 'all' );
}

add_action('admin_enqueue_scripts', 'fpg_enqueue_category_scripts');

function fpg_enqueue_category_scripts($hook) {
    // Only load on category taxonomy page
    if ($hook === 'edit-tags.php' && isset($_GET['taxonomy']) && $_GET['taxonomy'] === 'category') {
        // Enqueue WordPress color picker
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('wp-color-picker');

        // Enqueue your plugin's CSS/JS
        wp_enqueue_style('fpg-category-style', plugin_dir_url(__FILE__) . 'assets/css/category-style.css');
        wp_enqueue_script(
            'fpg-category-script',
            plugin_dir_url(__FILE__) . 'assets/js/category-script.js',
            ['jquery', 'wp-color-picker'], // dependencies
            null,
            true
        );
    }
}

if (is_admin()) {

    /**
     * Add Background Color and Image field to Add Category form
     */
    add_action('category_add_form_fields', 'fpg_category_fields');
    add_action('category_edit_form_fields', 'fpg_category_fields_edit', 10, 2);

    function fpg_category_fields($taxonomy) {
        ?>
        <div class="form-field term-bg-color-wrap">
            <label><?php _e('Background Color', 'fancy-post-grid'); ?></label>
            <input type="text" name="fpg_bg_color" value="#ffffff" class="fpg-color-field" />
        </div>
        
        <div class="form-field term-bg-image-wrap">
            <label><?php _e('Background Image', 'fancy-post-grid'); ?></label>
            <input type="text" name="fpg_bg_image" value="" class="fpg-image-field" />
            <button class="button fpg-upload-image-button"><?php _e('Upload Image', 'fancy-post-grid'); ?></button>
            <div class="fpg-image-preview" style="margin-top:10px;position:relative;display:inline-block;"></div>
        </div>
        <?php
    }

    function fpg_category_fields_edit($term, $taxonomy) {
        $color = get_term_meta($term->term_id, 'fpg_bg_color', true) ?: '#ffffff';
        $image = get_term_meta($term->term_id, 'fpg_bg_image', true);
        ?>
        <tr class="form-field term-bg-color-wrap">
            <th scope="row"><label><?php _e('Background Color', 'fancy-post-grid'); ?></label></th>
            <td>
                <input type="text" name="fpg_bg_color" value="<?php echo esc_attr($color); ?>" class="fpg-color-field" />
            </td>
        </tr>
        <tr class="form-field term-bg-image-wrap">
            <th scope="row"><label><?php _e('Background Image', 'fancy-post-grid'); ?></label></th>
            <td>
                <input type="text" name="fpg_bg_image" value="<?php echo esc_attr($image); ?>" class="fpg-image-field" />
                <button class="button fpg-upload-image-button"><?php _e('Upload Image', 'fancy-post-grid'); ?></button>
                <div class="fpg-image-preview" style="margin-top:10px;position:relative;display:inline-block;">
                    <?php if ($image) : ?>
                        <img src="<?php echo esc_url($image); ?>" style="max-width:150px;height:auto;" />
                        <span class="fpg-remove-image" style="position:absolute;top:0;right:0;background:#ff0000;color:#fff;font-weight:bold;cursor:pointer;padding:2px 6px;border-radius:50%;">×</span>
                    <?php endif; ?>
                </div>
            </td>
        </tr>
        <?php
    }

    /**
     * Save Background Color and Image
     */
    add_action('created_category', 'fpg_save_category_fields', 10, 2);
    add_action('edited_category', 'fpg_save_category_fields', 10, 2);

    function fpg_save_category_fields($term_id) {
        if (isset($_POST['fpg_bg_color'])) {
            update_term_meta($term_id, 'fpg_bg_color', sanitize_hex_color($_POST['fpg_bg_color']));
        }
        if (isset($_POST['fpg_bg_image'])) {
            update_term_meta($term_id, 'fpg_bg_image', esc_url_raw($_POST['fpg_bg_image']));
        }
    }

    /**
     * Enqueue WP Color Picker and Media Uploader
     */
    add_action('admin_enqueue_scripts', function($hook) {
        if (($hook === 'edit-tags.php' || $hook === 'term.php') && isset($_GET['taxonomy']) && $_GET['taxonomy'] === 'category') {
            wp_enqueue_style('wp-color-picker');
            wp_enqueue_script('wp-color-picker');
            wp_enqueue_media();
            wp_add_inline_script('wp-color-picker', "
                jQuery(document).ready(function($){
                    $('.fpg-color-field').wpColorPicker();

                    // Upload button
                    $('.fpg-upload-image-button').on('click', function(e){
                        e.preventDefault();
                        var button = $(this);
                        var input = button.prev('.fpg-image-field');
                        var preview = button.next('.fpg-image-preview');
                        var media = wp.media({ title: 'Select or Upload Image', multiple: false });
                        media.on('select', function(){
                            var attachment = media.state().get('selection').first().toJSON();
                            input.val(attachment.url);
                            preview.html('<img src=\"'+attachment.url+'\" style=\"max-width:150px;height:auto;\" /> <span class=\"fpg-remove-image\" style=\"position:absolute;top:0;right:0;background:#ff0000;color:#fff;font-weight:bold;cursor:pointer;padding:2px 6px;border-radius:50%;\">×</span>');
                        });
                        media.open();
                    });

                    // Remove image
                    $(document).on('click', '.fpg-remove-image', function(){
                        var preview = $(this).parent('.fpg-image-preview');
                        var input = preview.prevAll('.fpg-image-field');
                        preview.empty();
                        input.val('');
                    });
                });
            ");
        }
    });

    /**
     * Add Background Color and Image columns to Category list table
     */
    add_filter('manage_edit-category_columns', 'fpg_add_category_columns');
    function fpg_add_category_columns($columns) {
        $columns['fpg_bg_color'] = __('Background Color', 'fancy-post-grid');
        $columns['fpg_bg_image'] = __('Background Image', 'fancy-post-grid');
        return $columns;
    }

    /**
     * Show values in custom columns
     */
    add_filter('manage_category_custom_column', 'fpg_show_category_columns', 10, 3);
    function fpg_show_category_columns($out, $column_name, $term_id) {
        if ($column_name === 'fpg_bg_color') {
            $color = get_term_meta($term_id, 'fpg_bg_color', true);
            $out = $color ? '<span style="display:inline-block;width:30px;height:20px;border:1px solid #ccc;background:' . esc_attr($color) . ';"></span> ' . esc_html($color) : '—';
        }
        if ($column_name === 'fpg_bg_image') {
            $image = get_term_meta($term_id, 'fpg_bg_image', true);
            $out = $image ? '<img src="' . esc_url($image) . '" style="max-width:50px;height:auto;" />' : '—';
        }
        return $out;
    }

    /**
     * Optional: Style the new columns
     */
    add_action('admin_head-edit-tags.php', function() {
        if (isset($_GET['taxonomy']) && $_GET['taxonomy'] === 'category') {
            echo '<style>
                .column-fpg_bg_color{width:140px;text-align:center;}
                .column-fpg_bg_image{width:100px;text-align:center;}
            </style>';
        }
    });

}


/**
 * Add Featured Post checkbox meta box
 */
function fpg_add_featured_post_metabox() {
    add_meta_box(
        'fpg_featured_post',
        __('Featured Post', 'fancy-post-grid'),
        'fpg_featured_post_metabox_callback',
        'post',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'fpg_add_featured_post_metabox');

function fpg_featured_post_metabox_callback($post) {
    // Get saved value
    $value = get_post_meta($post->ID, '_fpg_featured_post', true);
    wp_nonce_field('fpg_featured_post_nonce_action', 'fpg_featured_post_nonce');
    ?>
    <label>
        <input type="checkbox" name="fpg_featured_post" value="1" <?php checked($value, '1'); ?> />
        <?php _e('Mark as Featured Post', 'fancy-post-grid'); ?>
    </label>
    <?php
}

/**
 * Save Featured Post value
 */
function fpg_save_featured_post_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['fpg_featured_post_nonce']) || 
        !wp_verify_nonce($_POST['fpg_featured_post_nonce'], 'fpg_featured_post_nonce_action')) {
        return;
    }

    // Autosave check
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    // Check permissions
    if (isset($_POST['post_type']) && $_POST['post_type'] === 'post') {
        if (!current_user_can('edit_post', $post_id)) return;
    }

    // Save value
    $is_featured = isset($_POST['fpg_featured_post']) ? '1' : '';
    update_post_meta($post_id, '_fpg_featured_post', $is_featured);
}
add_action('save_post', 'fpg_save_featured_post_meta');

/**
 * Add Featured column to Posts list
 */
function fpg_add_featured_post_column($columns) {
    $columns['fpg_featured'] = __('Featured', 'fancy-post-grid');
    return $columns;
}
add_filter('manage_posts_columns', 'fpg_add_featured_post_column');

/**
 * Show Featured column content
 */
function fpg_show_featured_post_column($column, $post_id) {
    if ($column === 'fpg_featured') {
        $value = get_post_meta($post_id, '_fpg_featured_post', true);
        if ($value == '1') {
            echo '<span style="color:green;font-weight:bold;">✔</span>';
        } else {
            echo '—';
        }
    }
}
add_action('manage_posts_custom_column', 'fpg_show_featured_post_column', 10, 2);

/**
 * Optional: Make Featured column sortable
 */
function fpg_featured_post_sortable_columns($columns) {
    $columns['fpg_featured'] = 'fpg_featured';
    return $columns;
}
add_filter('manage_edit-post_sortable_columns', 'fpg_featured_post_sortable_columns');

function fpg_featured_post_orderby($query) {
    if (!is_admin()) return;

    $orderby = $query->get('orderby');
    if ($orderby === 'fpg_featured') {
        $query->set('meta_key', '_fpg_featured_post');
        $query->set('orderby', 'meta_value');
    }
}
add_action('pre_get_posts', 'fpg_featured_post_orderby');
/**
 * Add Video Link meta box
 */
function fpg_add_video_link_metabox() {
    add_meta_box(
        'fpg_video_link',
        __('Video Link', 'fancy-post-grid'),
        'fpg_video_link_metabox_callback',
        'post',
        'normal', // bottom section
        'default'
    );
}
add_action('add_meta_boxes', 'fpg_add_video_link_metabox');

/**
 * Meta box callback
 */
function fpg_video_link_metabox_callback($post) {
    // Get saved value
    $value = get_post_meta($post->ID, '_fpg_video_link', true);

    // Security nonce
    wp_nonce_field('fpg_video_link_nonce_action', 'fpg_video_link_nonce');
    ?>
    <p>
        <label for="fpg_video_link">
            <?php _e('Enter Video URL (YouTube, Vimeo, MP4, etc.):', 'fancy-post-grid'); ?>
        </label>
    </p>
    <input 
        type="text" 
        name="fpg_video_link" 
        id="fpg_video_link" 
        value="<?php echo esc_attr($value); ?>" 
        style="width:100%; max-width:600px;"
        placeholder="https://example.com/video"
    />
    <?php
}

/**
 * Save Video Link value
 */
function fpg_save_video_link_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['fpg_video_link_nonce']) || 
        !wp_verify_nonce($_POST['fpg_video_link_nonce'], 'fpg_video_link_nonce_action')) {
        return;
    }

    // Autosave check
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    // Permissions check
    if (isset($_POST['post_type']) && $_POST['post_type'] === 'post') {
        if (!current_user_can('edit_post', $post_id)) return;
    }

    // Save value
    if (isset($_POST['fpg_video_link']) && !empty($_POST['fpg_video_link'])) {
        update_post_meta($post_id, '_fpg_video_link', sanitize_text_field($_POST['fpg_video_link']));
    } else {
        delete_post_meta($post_id, '_fpg_video_link');
    }
}
add_action('save_post', 'fpg_save_video_link_meta');

