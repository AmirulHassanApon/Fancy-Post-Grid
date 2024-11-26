<?php
/**
 * Plugin Name:       Fancy Post Grid Pro
 * Plugin URI:        https://wordpress.org/plugins/fancy-post-grid/
 * Description:       Fancy Post Grid plugin provides an elegant solution for displaying posts in a Grid and Slider layout. It is designed to be user and developer friendly, offering easy customization and usage. The plugin is fully responsive and mobile-friendly, ensuring a seamless browsing experience across all devices.
 * Version:           1.0.0
 * License:           GPLv2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fancy-post-grid
 * Domain Path:       /languages
 * Requires PHP: 	  7.0.0
 * Requires at least: 5.5
 */

/**
 * Defines constants
 */
define( 'FANCY_POST_GRID_VERSION_PRO', '1.0.0' );
define( 'FANCY_POST_GRID_PATH_PRO', plugin_dir_path( __FILE__ ) );

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

/**
 * Register custom image sizes for Fancy Post Grid
 */
function fancy_post_grid_register_image_sizes_pro() {
    add_image_size( 'fancy_post_custom_size', 768, 500, true ); // Custom size with 768x500 dimensions and hard crop
    add_image_size( 'fancy_post_square', 500, 500, true );      // Square size with 500x500 dimensions
    add_image_size( 'fancy_post_landscape', 834, 550, true );   // Landscape size with 834x550 dimensions
    add_image_size( 'fancy_post_portrait', 421, 550, true );    // Portrait size with 421x550 dimensions
    add_image_size( 'fancy_post_list', 1200, 650, true );    // Portrait size with 1200x650 dimensions
}
add_action( 'after_setup_theme', 'fancy_post_grid_register_image_sizes_pro' );