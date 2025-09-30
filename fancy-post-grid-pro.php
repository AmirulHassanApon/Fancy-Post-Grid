<?php
/**
 * Plugin Name:       Fancy Post Grid Pro - Ultimate Post Grid Builder
 * Description:       Fancy Post Grid plugin provides an elegant solution for displaying posts in a Grid and Slider layout. It is designed to be user and developer friendly, offering easy customization and usage. The plugin is fully responsive and mobile-friendly, ensuring a seamless browsing experience across all devices.
 * Version:           1.0.2
 * License:           GPLv2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fancy-post-grid
 * Domain Path:       /languages
 * Requires PHP: 	  7.4
 * Requires at least: 6.3
 */

/**
 * Defines constants
 */
define( 'FANCY_POST_GRID_VERSION_PRO', '1.0.2' );
define( 'FANCY_POST_GRID_PATH_PRO', plugin_dir_path( __FILE__ ) );
define( 'FANCY_POST_GRID_BASENAME_PRO', plugin_basename(__FILE__));

$dir = plugin_dir_path( __FILE__ );

/**
 * Load Textdomain
 */
function fancy_post_grid_load_textdomain_pro(){
	load_plugin_textdomain('fancy-post-grid', false, dirname(__FILE__)."/languages");
}
add_action('plugins_loaded', 'fancy_post_grid_load_textdomain_pro');

/**
 * Include styles and scripts for public part
 */
include_once FANCY_POST_GRID_PATH_PRO . 'public/fpg-public.php';

/**
 * Include styles and scripts for admin part
 */
include_once FANCY_POST_GRID_PATH_PRO . 'admin/fpg-admin.php';

/**
 * Include file for admin
 */
include_once  FANCY_POST_GRID_PATH_PRO.'includes/template.php';
include_once  FANCY_POST_GRID_PATH_PRO.'includes/shortcode_generate.php';
include_once  FANCY_POST_GRID_PATH_PRO.'includes/metabox/fancy-post-gird-metabox.php';
include_once  FANCY_POST_GRID_PATH_PRO.'includes/ElementBlock/elementor_widgets.php';
include_once  FANCY_POST_GRID_PATH_PRO.'admin/submenu/admin-submenu.php';
// Gutenberg
include_once  FANCY_POST_GRID_PATH_PRO.'includes/Gutenberg/gutenberg-init.php';

/**
 * Redirect to settings page after plugin activate
 *
 */

function fpg_pro_activation_redirect( $plugin ) {
    if( $plugin == plugin_basename( __FILE__ ) ) {
        exit( esc_url_raw(wp_safe_redirect( admin_url( 'edit.php?post_type=fancy-post-grid-fpg&page=fancy_post_grid_get_help' ) )) );
    }
}
add_action( 'activated_plugin', 'fpg_pro_activation_redirect' );

// Add settings links to the plugin page
function fpg_pro_custom_setting_page_links($links) {
    $settings_links = array(
        sprintf("<a href='%s'>%s</a>", admin_url('edit.php?post_type=fancy-post-grid-fpg&page=fancy_post_grid_advanced_settings'), __('Settings', 'fancy-post-grid')),
        
        sprintf("<a href='%s' target='_blank'>%s</a>", 'https://rstheme.com/support/', __('Support', 'fancy-post-grid')),
  
    );

    $links = array_merge($links, $settings_links);
    return $links;
}

add_filter('plugin_action_links_' . FANCY_POST_GRID_BASENAME_PRO, 'fpg_pro_custom_setting_page_links');

/**
 * Register custom image sizes for Fancy Post Grid
 */
function fancy_post_grid_register_image_sizes_pro() {
    add_image_size( 'fancy_post_small01_card_size', 130, 130, true ); 
    add_image_size( 'fancy_post_small02_card_size', 139, 130, true ); 
    add_image_size( 'fancy_post_categories_card_size', 194, 156, true ); 
    add_image_size( 'fancy_post_small03_card_size', 332, 175, true ); 
    add_image_size( 'fancy_post_medium01_card_size', 401, 322, true ); 
    add_image_size( 'fancy_post_medium02_card_size', 426, 316, true ); 
    add_image_size( 'fancy_post_small04_card_size', 450, 426, true ); 
    add_image_size( 'fancy_post_trending01_card_size', 450, 462, true ); 
    add_image_size( 'fancy_post_trending02_card_size', 450, 470, true ); 
    add_image_size( 'fancy_post_trending03_card_size', 450, 480, true ); 
    add_image_size( 'fancy_post_trending04_card_size', 450, 501, true ); 
    add_image_size( 'fancy_post_trending05_card_size', 440, 501, true ); 
    add_image_size( 'fancy_post_trending06_card_size', 450, 526, true ); 
    
    add_image_size( 'fancy_post_overlay01_card_size', 930, 462, true ); 
    add_image_size( 'fancy_post_overlay02_card_size', 930, 501, true ); 
    add_image_size( 'fancy_post_video_card_size', 1920, 650, true ); 

    add_image_size( 'fancy_post_custom_size', 768, 500, true ); 
    add_image_size( 'fancy_post_square', 500, 500, true );      
    add_image_size( 'fancy_post_landscape', 834, 550, true );   
    add_image_size( 'fancy_post_portrait', 421, 550, true ); 
    add_image_size( 'fancy_post_list', 1200, 650, true ); 
}
add_action( 'after_setup_theme', 'fancy_post_grid_register_image_sizes_pro' );
