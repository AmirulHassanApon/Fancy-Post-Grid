<?php
/**
 * Include public styles
 */
function fancy_post_grid_public_styles_pro() {

    $ufpg_version = defined( 'FANCY_POST_GRID_VERSION_PRO' ) ? FANCY_POST_GRID_VERSION_PRO : '1.0.0'; // Define version number
    $settings_options = get_option( 'fpg_settings_option' );
    
        
    wp_enqueue_style( 'fpg-bootstrap', plugins_url('/assets/css/fpg_bootstrap.css', __FILE__), array(), $ufpg_version, 'all' );
    wp_enqueue_style( 'font-awesome', plugins_url('/assets/css/all.min.css', __FILE__), array(), $ufpg_version, 'all' );
          
    // wp_enqueue_style( 'fancy-post-grid-main', plugins_url('/assets/css/fancy-post-grid.css', __FILE__), array(), $ufpg_version, 'all' );
    wp_enqueue_style('remixicon', plugins_url('/assets/css/remixicon.css',__FILE__), array(), $ufpg_version, 'all');
    wp_enqueue_style('swiper', plugins_url('/assets/css/swiper-bundle.min.css',__FILE__), array(), $ufpg_version, 'all');
    wp_enqueue_style('rs-layout', plugins_url('/assets/css/rs-layout.css',__FILE__), array(), $ufpg_version, 'all');
    wp_enqueue_style('custom-style', plugins_url('/assets/css/style.css',__FILE__), array(), $ufpg_version, 'all');

}
add_action( 'wp_enqueue_scripts', 'fancy_post_grid_public_styles_pro' );

/**
 * Include public scripts
 */


function fancy_post_grid_public_scripts_pro(){
    $ufpg_version = defined( 'FANCY_POST_GRID_VERSION_PRO' ) ? FANCY_POST_GRID_VERSION_PRO : '1.0.0'; // Define version number

    // Enqueue the necessary scripts
    wp_enqueue_script('jquery'); // This will ensure jQuery is loaded from WordPress's built-in version
    wp_enqueue_script('swiper-bundle-fpg', plugins_url('/assets/js/swiper-bundle.min.js', __FILE__), array('jquery'), $ufpg_version, true);
    wp_enqueue_script('fpg-main-js', plugins_url('/assets/js/main.js', __FILE__), array('swiper-bundle-fpg', 'jquery'), $ufpg_version, true);
    wp_enqueue_script( 'fpg-isotope', plugins_url('/assets/js/isotope.pkgd.min.js', __FILE__) , array('jquery','imagesloaded'), $ufpg_version, true );
}
add_action( 'wp_enqueue_scripts', 'fancy_post_grid_public_scripts_pro' );
// Function to enqueue custom CSS and JS in the frontend
function fancy_output_custom_css_js_frontend() {
    // Enqueue custom CSS
    $custom_css = get_option('fpg_custom_css');
    if (!empty($custom_css)) {
        wp_add_inline_style('wp-block-library', wp_strip_all_tags($custom_css)); // Enqueue custom CSS
    }

    // Enqueue custom JS
    $custom_js = get_option('fpg_custom_js');
    if (!empty($custom_js)) {
        wp_add_inline_script('jquery', wp_strip_all_tags($custom_js)); // Enqueue custom JS after jQuery (if needed)
    }
}

add_action('wp_enqueue_scripts', 'fancy_output_custom_css_js_frontend');
