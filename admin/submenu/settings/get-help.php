<?php
function fancy_post_grid_render_get_help_page() {
    ?>
    <div class="fpg-help-wrapper">
        
        <!-- Welcome Box -->

        
        <div class="fpg-help-section fpg-document-box">
            <div class="fpg-box-content">
                <div class="fpg-box-title-wrapper">
                    <i class="dashicons dashicons-layout"></i>
                    <h3 class="fpg-box-title"><?php echo esc_html__( 'Thank you for installing Fancy Post Grid', 'fancy-post-grid' ); ?></h3>
                </div>
                <div class="fpg-video-section">
                    <div class="fpg-video-card">
                        <h3><?php echo esc_html__( 'Plugin Demo', 'fancy-post-grid' ); ?></h3>
                        <iframe class="fpg-iframe" width="800" height="450" src="https://www.youtube.com/embed/ZRpv49BUG_k?si=XHPGsG_mGPHcVWtK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div class="fpg-video-card">
                        <h3><?php echo esc_html__( 'Shortcode Tutorial', 'fancy-post-grid' ); ?></h3>
                        <iframe class="fpg-iframe" width="800" height="450" src="https://www.youtube.com/embed/SclxnsTzWcc?si=Smp74B2AsK32nAbx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div class="fpg-video-card">  
                        <h3><?php echo esc_html__( 'Elementor Tutorial', 'fancy-post-grid' ); ?></h3>
                        <iframe class="fpg-iframe" width="800" height="450" src="https://www.youtube.com/embed/vjX_c0yOcYI?si=m_UXm7ShIG9qhRne" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div class="fpg-video-card">
                        <h3><?php echo esc_html__( 'Gutenberg Tutorial', 'fancy-post-grid' ); ?></h3>
                        <iframe class="fpg-iframe" width="800" height="450" src="https://www.youtube.com/embed/RwMDdesJvJY?si=FDw0TtAcj4HFjnVR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pro Features -->
        <!-- Comparison Table -->
        <div class="fpg-document-box">
            <div class="fpg-box-content">
                <div class="fpg-box-title-wrapper">
                    <i class="dashicons dashicons-bank"></i>
                    <h3 class="fpg-box-title"><?php echo esc_html__( 'Free vs Pro Comparison', 'fancy-post-grid' ); ?></h3>
                </div>
                <table class="fpg-comparison-table">
                    <thead>
                        <tr>
                            <th><?php echo esc_html__( 'Feature', 'fancy-post-grid' ); ?></th>
                            <th><?php echo esc_html__( 'Free', 'fancy-post-grid' ); ?></th>
                            <th><?php echo esc_html__( 'Pro', 'fancy-post-grid' ); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><?php echo esc_html__( 'Basic 9+ Grid Layouts', 'fancy-post-grid' ); ?></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td></tr>
                        <tr><td><?php echo esc_html__( ' Support', 'fancy-post-grid' ); ?></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td></tr>
                        <tr><td><?php echo esc_html__( 'AJAX Pagination', 'fancy-post-grid' ); ?></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td></tr>
                        <tr><td><?php echo esc_html__( 'Pro 25+ Layouts', 'fancy-post-grid' ); ?></td><td><i style="color:red;" class="dashicons dashicons-no-alt"></i></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td></tr>
                        <tr><td><?php echo esc_html__( 'Advanced Filters', 'fancy-post-grid' ); ?></td><td><i style="color:red;" class="dashicons dashicons-no-alt"></i></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td></tr>
                        <tr><td><?php echo esc_html__( 'Isotope Layouts', 'fancy-post-grid' ); ?></td><td><i style="color:red;" class="dashicons dashicons-no-alt"></i></td><td><i style="color:green;" class="dashicons dashicons-yes"></i></td></tr>
                        
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pro Features (3 Columns) -->
        <div class="fpg-document-box">
            <div class="fpg-box-content fpg-feature-list">
                <div class="fpg-box-title-wrapper">
                    <i class="dashicons dashicons-megaphone"></i>
                    <h3 class="fpg-box-title"><?php echo esc_html__( 'Pro Features', 'fancy-post-grid' ); ?></h3>
                </div>
                <div class="fpg-feature-columns">
                    <ul>
                        
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Advanced Post Filter', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Custom Image Size', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Meta Position Control', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Post View Count', 'fancy-post-grid' ); ?></li>
                    </ul>
                    <ul>
                        
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( '34 Different Layouts', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Isotope Layout', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Fields Selection', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'All Text and Color Control', 'fancy-post-grid' ); ?></li>
                    </ul>
                    <ul>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'AJAX Pagination (Load More and Scroll)', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Archive Page Builder for Elementor', 'fancy-post-grid' ); ?></li>
                        <li><i class="dashicons dashicons-saved"></i> <?php echo esc_html__( 'Advanced Custom Field Support', 'fancy-post-grid' ); ?></li>
                        
                    </ul>
                </div>
            </div>
        </div>

        <!-- Call to Action -->
        <div class="fpg-call-to-action" style="background: #f0f0ff">
            <h3><?php echo esc_html__( 'Use Fancy Post Grid Pro plugin and dozens more pro features to extend your toolbox and build sites faster and better.', 'fancy-post-grid' ); ?></h3>
            <a href="https://plugins.rstheme.com/fancy-post-grid/" target="_blank" class="fpg-btn">
                <?php echo esc_html__( 'Upgrade to Pro', 'fancy-post-grid' ); ?>
            </a>
        </div>
        
        <div class="fpg-bottom-box">
            <!-- Documentation -->
            <div class="fpg-document-box">
                <div class="fpg-box-icon"><i class="dashicons dashicons-media-document"></i></div>
                <div class="fpg-box-content">
                    <h3 class="fpg-box-title"><?php echo esc_html__( 'Documentation', 'fancy-post-grid' ); ?></h3>
                    <p><?php echo esc_html__( 'Need help getting started? Our step-by-step documentation includes screenshots and videos to walk you through everything.', 'fancy-post-grid' ); ?></p>
                    <a href="https://plugins.rstheme.com/fancy-post-grid/" target="_blank" class="fpg-btn"><?php echo esc_html__( 'View Documentation', 'fancy-post-grid' ); ?></a>
                </div>
            </div>

            <!-- Help / Support -->
            <div class="fpg-document-box">
                <div class="fpg-box-icon"><i class="dashicons dashicons-sos"></i></div>
                <div class="fpg-box-content">
                    <h3 class="fpg-box-title"><?php echo esc_html__( 'Need Help?', 'fancy-post-grid' ); ?></h3>
                    <p>
                        <?php echo esc_html__( 'If you\'re stuck, please', 'fancy-post-grid' ); ?>
                        <a href="https://plugins.rstheme.com/fancy-post-grid/" target="_blank"><?php echo esc_html__( 'submit a support ticket', 'fancy-post-grid' ); ?></a>.
                        <?php echo esc_html__( 'You can also use', 'fancy-post-grid' ); ?>
                        <a href="https://rstheme.com" target="_blank"><?php echo esc_html__( 'Live Chat', 'fancy-post-grid' ); ?></a>
                        <?php echo esc_html__( 'for urgent help.', 'fancy-post-grid' ); ?>
                    </p>
                    <a href="https://rstheme.com/support" target="_blank" class="fpg-btn"><?php echo esc_html__( 'Get Support', 'fancy-post-grid' ); ?></a>
                </div>
            </div>
        </div>

    </div>
    <?php
}
