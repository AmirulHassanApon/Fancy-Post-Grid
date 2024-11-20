<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Register custom post type
 */

function fancy_post_grid_custom_post_type_pro() {
    // Set UI labels for Custom Post Type
    $labels = array(
        'name'               => esc_html__( 'Fancy Post Grid', 'fancy-post-grid' ),
        'singular_name'      => esc_html__( 'The Post Grid', 'fancy-post-grid' ),
        'add_new'            => esc_html__( 'Add New Grid', 'fancy-post-grid' ),
        'all_items'          => esc_html__( 'All Grids', 'fancy-post-grid' ),
        'add_new_item'       => esc_html__( 'Add New Post Grid', 'fancy-post-grid' ),
        'edit_item'          => esc_html__( 'Edit Post Grid', 'fancy-post-grid' ),
        'new_item'           => esc_html__( 'New Post Grid', 'fancy-post-grid' ),
        'view_item'          => esc_html__( 'View Post Grid', 'fancy-post-grid' ),
        'search_items'       => esc_html__( 'Search Post Grids', 'fancy-post-grid' ),
        'not_found'          => esc_html__( 'No Post Grids found', 'fancy-post-grid' ),
        'not_found_in_trash' => esc_html__( 'No Post Grids found in Trash', 'fancy-post-grid' ),
    );

    // Set other options for Custom Post Type
    $args = array(
        'label'               => esc_html__('All Post Grids', 'fancy-post-grid'),
        'description'         => esc_html__('Shortcode news and reviews', 'fancy-post-grid'),
        'labels'              => $labels,
        'supports'            => array( 'title'),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_icon'          =>  plugins_url( '../admin/assets/images/icon-admin.png', __FILE__ ),
        'menu_position'       => 30,
        'can_export'          => true,
        'has_archive'         => false,
        'exclude_from_search' => false,
        'publicly_queryable'  => false,
        'capability_type'     => 'page',
    );

    // Registering the Shortcodes Custom Post Type
    register_post_type( 'fancy-post-grid-fpg', $args );
}
add_action( 'init', 'fancy_post_grid_custom_post_type_pro' );



function fancy_post_grid_settings_admin_enter_title_pro( $input ) {
    global $post_type;
    if ( 'fancy-post-grid-fpg' == $post_type )
        return esc_html__( 'Enter Shortcode Name', 'fancy-post-grid' );
    return $input;
}
add_filter( 'enter_title_here', 'fancy_post_grid_settings_admin_enter_title_pro' );

/**
 *
 */
function fancy_post_grid_settings_admin_updated_messages_pro( $messages ) {
    global $post, $post_id;
    $messages['fancy-post-grid-fpg'] = array(
        1 => esc_html__('Shortcode updated.', 'fancy-post-grid'),
        2 => $messages['post'][2],
        3 => $messages['post'][3],
        4 => esc_html__('Shortcode updated.', 'fancy-post-grid'),
        5 => isset($_GET['revision']) 
            ? // translators: %s: Date and time of the revision
              sprintf( esc_html__('Shortcode restored to revision from %s', 'fancy-post-grid'), wp_post_revision_title( (int) $_GET['revision'], false ) ) 
            : false,
        6 => esc_html__('Shortcode published.', 'fancy-post-grid'),
        7 => esc_html__('Shortcode saved.', 'fancy-post-grid'),
        8 => esc_html__('Shortcode submitted.', 'fancy-post-grid'),
        9 => // translators: %1$s: Date and time the shortcode is scheduled for
             sprintf( esc_html__('Shortcode scheduled for: <strong>%1$s</strong>.', 'fancy-post-grid'), date_i18n(esc_html__( 'M j, Y @ G:i', 'fancy-post-grid' ), strtotime( $post->post_date ) )),
        10 => esc_html__('Shortcode draft updated.', 'fancy-post-grid'),
    );
    return $messages;
}

add_filter( 'post_updated_messages', 'fancy_post_grid_settings_admin_updated_messages_pro' );

/**
 * Extra column make for shotcode custom post
 */
function fancy_post_grid_settings_add_shortcode_column_pro( $columns ) {
    return array_merge( $columns,
        array( 'shortcode' => esc_html__( 'Shortcode', 'fancy-post-grid' ) )
    );
}
add_filter( 'manage_fancy-post-grid-fpg_posts_columns' , 'fancy_post_grid_settings_add_shortcode_column_pro' );


/**
 * Dynamic Shortcode generator
 */
function fancy_post_grid_settings_add_posts_shortcode_display_pro( $column, $post_id ) {
    if ($column == 'shortcode'){
        ?>
    <input style="background:#ccc; width:250px" type="text" onClick="this.select();" value="[fancy_gird_post_shortcode <?php echo 'id=&quot;'.esc_attr( $post_id ).'&quot;';?>]" />
    <br />
    <textarea cols="50" rows="3" style="background:#ddd" onClick="this.select();" ><?php echo '<?php echo do_shortcode("[fancy_gird_post_shortcode id='; echo "'".esc_attr( $post_id )."']"; echo '"); ?>'; ?></textarea>
    <?php
    }
}
add_action( 'manage_fancy-post-grid-fpg_posts_custom_column' , 'fancy_post_grid_settings_add_posts_shortcode_display_pro', 10, 2 );
