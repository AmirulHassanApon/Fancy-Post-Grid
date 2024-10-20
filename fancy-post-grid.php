<?php
/**
 * Plugin Name:       Fancy Post Grid
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
define( 'FANCY_POST_GRID_VERSION', '1.0.0' );
define( 'FANCY_POST_GRID_PATH', plugin_dir_path( __FILE__ ) );

$dir = plugin_dir_path( __FILE__ );

/**
 * Load Textdomain
 */
function fancy_post_grid_load_textdomain(){
	load_plugin_textdomain('fancy-post-grid', false, dirname(__FILE__)."/languages");
}
add_action('plugins_loaded', 'fancy_post_grid_load_textdomain');

/**
 * Include styles and scripts for public part
 */
include_once FANCY_POST_GRID_PATH . 'public/fpg-public.php';

/**
 * Include styles and scripts for admin part
 */
include_once FANCY_POST_GRID_PATH . 'admin/fpg-admin.php';

/**
 * Include file for admin
 */
include_once  FANCY_POST_GRID_PATH.'includes/template.php';
include_once  FANCY_POST_GRID_PATH.'includes/shortcode_generate.php';
include_once  FANCY_POST_GRID_PATH.'includes/metabox/fancy-post-gird-metabox.php';

/**
 * Register custom image sizes for Fancy Post Grid
 */
function fancy_post_grid_register_image_sizes() {
    add_image_size( 'fancy_post_custom_size', 768, 500, true ); // Custom size with 666x450 dimensions and hard crop
    add_image_size( 'fancy_post_square', 500, 500, true );      // Square size with 500x500 dimensions
    add_image_size( 'fancy_post_landscape', 834, 550, true );   // Landscape size with 800x400 dimensions
    add_image_size( 'fancy_post_portrait', 421, 550, true );    // Portrait size with 400x800 dimensions
}
add_action( 'after_setup_theme', 'fancy_post_grid_register_image_sizes' );
