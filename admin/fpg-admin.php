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
    wp_enqueue_style( 'fpg-tabs', plugins_url('/assets/css/tabs.css', __FILE__), array(), $ufpg_version, 'all' );
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

