<?php
// Define constants for license handling
define('FPG_STORE_URL', 'http://rstheme.com');
define('FPG_ITEM_ID', 30026);
define('FPG_ITEM_NAME', 'Fancy Post Grid Pro');
define('FPG_LICENSE_PAGE', 'fancy-post-grid-license');

// Include custom updater
if (!class_exists('Fpg_Plugin_Updater')) {
    require_once('fpg-plugin-updater.php');
}

// Initialize updater
function fancy_post_grid_plugin_updater() {
    $license_key = trim(get_option('fancy_post_grid_license_key'));

    $updater = new WPUCS_Plugin_Updater(
        FPG_STORE_URL,
        __FILE__,
        [
            'version' => '1.0.0', // Plugin version
            'license' => $license_key,
            'item_id' => FPG_ITEM_ID,
            'author'  => 'RSTheme',
            'beta'    => false,
        ]
    );
}
add_action('init', 'fancy_post_grid_plugin_updater');

// Add license activation menu
function fancy_post_grid_add_license_menu() {
    add_menu_page(
        __('Fancy Post Grid License', 'fancy-post-grid'),
        __('License', 'fancy-post-grid'),
        'manage_options',
        FPG_LICENSE_PAGE,
        'fancy_post_grid_render_license_activation_page',
        'dashicons-admin-network'
    );
}
add_action('admin_menu', 'fancy_post_grid_add_license_menu');

// Render the license activation page
function fancy_post_grid_render_license_activation_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Fancy Post Grid License Activation', 'fancy-post-grid'); ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('fancy_post_grid_license_group');
            do_settings_sections(FPG_LICENSE_PAGE);
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

// Register license settings
function fancy_post_grid_register_license_settings() {
    register_setting('fancy_post_grid_license_group', 'fancy_post_grid_license_key', 'sanitize_text_field');

    add_settings_section(
        'fpg_license_section',
        __('License Key', 'fancy-post-grid'),
        function () {
            echo '<p>' . esc_html__('Enter your license key to activate Fancy Post Grid Pro.', 'fancy-post-grid') . '</p>';
        },
        FPG_LICENSE_PAGE
    );

    add_settings_field(
        'fpg_license_key_field',
        __('License Key', 'fancy-post-grid'),
        function () {
            $license = get_option('fancy_post_grid_license_key', '');
            printf(
                '<input type="text" name="fancy_post_grid_license_key" value="%s" class="regular-text" />',
                esc_attr($license)
            );

            $status = get_option('fancy_post_grid_license_status');
            $button_label = ('valid' === $status) ? __('Deactivate License', 'fancy-post-grid') : __('Activate License', 'fancy-post-grid');
            $button_name = ('valid' === $status) ? 'fancy_post_grid_deactivate' : 'fancy_post_grid_activate';
            ?>
            <input type="submit" class="button-secondary" name="<?php echo esc_attr($button_name); ?>" value="<?php echo esc_html($button_label); ?>" />
            <?php
            wp_nonce_field('fancy_post_grid_nonce', 'fancy_post_grid_nonce');
        },
        FPG_LICENSE_PAGE,
        'fpg_license_section'
    );
}
add_action('admin_init', 'fancy_post_grid_register_license_settings');

// Handle license activation and deactivation
function fancy_post_grid_handle_license() {
    if (!isset($_POST['fancy_post_grid_nonce']) || !wp_verify_nonce($_POST['fancy_post_grid_nonce'], 'fancy_post_grid_nonce')) {
        return;
    }

    $license = trim(get_option('fancy_post_grid_license_key'));
    if (isset($_POST['fancy_post_grid_activate'])) {
        $response = fancy_post_grid_license_request('activate_license', $license);
        update_option('fancy_post_grid_license_status', $response['status']);
    } elseif (isset($_POST['fancy_post_grid_deactivate'])) {
        $response = fancy_post_grid_license_request('deactivate_license', $license);
        delete_option('fancy_post_grid_license_status');
    }
}
add_action('admin_post_fancy_post_grid_handle_license', 'fancy_post_grid_handle_license');

// Make API requests
function fancy_post_grid_license_request($action, $license) {
    $response = wp_remote_post(FPG_STORE_URL, [
        'timeout' => 15,
        'sslverify' => false,
        'body' => [
            'edd_action' => $action,
            'license'    => $license,
            'item_id'    => FPG_ITEM_ID,
            'item_name'  => rawurlencode(FPG_ITEM_NAME),
            'url'        => home_url(),
        ],
    ]);

    if (is_wp_error($response)) {
        return ['status' => 'error', 'message' => $response->get_error_message()];
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);
    return [
        'status'  => $data['license'] ?? 'invalid',
        'message' => $data['message'] ?? '',
    ];
}
