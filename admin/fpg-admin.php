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

// add_action('elementor/editor/after_enqueue_scripts', function () {
//     wp_enqueue_script(
//         'fpg-editor-js',
//         plugin_dir_url(__FILE__) . 'assets/js/fpg-editor.js',
//         ['jquery'],
//         '1.0',
//         true
//     );
// });