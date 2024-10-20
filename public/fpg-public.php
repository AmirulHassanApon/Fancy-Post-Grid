<?php
/**
 * Include public styles
 */
function fancy_post_grid_public_styles() {

    $ufpg_version = defined( 'FANCY_POST_GRID_VERSION' ) ? FANCY_POST_GRID_VERSION : '1.0.0'; // Define version number
    $settings_options = get_option( 'fpg_settings_option' );
    
        
    wp_enqueue_style( 'fpg-bootstrap', plugins_url('/assets/css/fpg_bootstrap.css', __FILE__), array(), $ufpg_version, 'all' );
    wp_enqueue_style( 'font-awesome', plugins_url('/assets/css/all.min.css', __FILE__), array(), $ufpg_version, 'all' );
          
    wp_enqueue_style( 'fancy-post-grid-main', plugins_url('/assets/css/fancy-post-grid.css', __FILE__), array(), $ufpg_version, 'all' );
    wp_enqueue_style('remixicon', plugins_url('/assets/css/remixicon.css',__FILE__), array(), $ufpg_version, 'all');
    wp_enqueue_style('swiper', plugins_url('/assets/css/swiper-bundle.min.css',__FILE__), array(), $ufpg_version, 'all');
    wp_enqueue_style('rs-layout', plugins_url('/assets/css/rs-layout.css',__FILE__), array(), $ufpg_version, 'all');
    wp_enqueue_style('custom-style', plugins_url('/assets/css/style.css',__FILE__), array(), $ufpg_version, 'all');

}
add_action( 'wp_enqueue_scripts', 'fancy_post_grid_public_styles' );

/**
 * Include public scripts
 */


function fancy_post_grid_public_scripts(){
    $ufpg_version = defined( 'FANCY_POST_GRID_VERSION' ) ? FANCY_POST_GRID_VERSION : '1.0.0'; // Define version number

    // Enqueue the necessary scripts
    wp_enqueue_script('jquery'); // This will ensure jQuery is loaded from WordPress's built-in version
    wp_enqueue_script('swiper-bundle-fpg', plugins_url('/assets/js/swiper-bundle.min.js', __FILE__), array('jquery'), $ufpg_version, true);
    wp_enqueue_script('fpg-main-js', plugins_url('/assets/js/main.js', __FILE__), array('swiper-bundle-fpg', 'jquery'), $ufpg_version, true);
    wp_enqueue_script( 'fpg-isotope', plugins_url('/assets/js/isotope.pkgd.min.js', __FILE__) , array('jquery','imagesloaded'), $ufpg_version, true );
}
add_action( 'wp_enqueue_scripts', 'fancy_post_grid_public_scripts' );
