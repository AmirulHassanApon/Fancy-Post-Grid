<?php
$settings = $this->get_settings_for_display();
$layout        = $settings['fancy_post_card_layout'] ?? 'titlestyle01';
$box_alignment = $settings['box_alignment'] ?? '';

if ( empty( $box_alignment ) ) {
    switch ( $layout ) {
        case 'titlestyle01':
            $box_alignment = 'start';
            break;
    }
}

// Title Tag
$title_tag = ! empty( $settings['section_title_tag'] ) ? esc_attr( $settings['section_title_tag'] ) : 'h3';

// Title Content Source
if ( 'page' === ( $settings['fancy_post_title_source'] ?? 'custom' ) ) {
    $title = get_the_title();
    if ( ! empty( $settings['fancy_post_title_prefix'] ) ) {
        $title = esc_html( $settings['fancy_post_title_prefix'] ) . ' ' . $title;
    }
    if ( ! empty( $settings['fancy_post_title_suffix'] ) ) {
        $title .= ' ' . esc_html( $settings['fancy_post_title_suffix'] );
    }
} else {
    $title = ! empty( $settings['fancy_post_custom_title'] ) ? $settings['fancy_post_custom_title'] : get_the_title();
}

// Title Crop
if ( ! empty( $settings['section_title_crop_by'] ) && ! empty( $settings['section_title_length'] ) ) {
    $length = (int) $settings['section_title_length'];
    if ( 'character' === $settings['section_title_crop_by'] ) {
        $title = mb_substr( $title, 0, $length );
    } else {
        $title = implode( ' ', array_slice( explode( ' ', $title ), 0, $length ) );
    }
}

// External Link
$external_url  = ! empty( $settings['fancy_post_external_link_url']['url'] ) ? esc_url( $settings['fancy_post_external_link_url']['url'] ) : '';
$external_text = ! empty( $settings['fancy_post_external_link_text'] ) ? esc_html( $settings['fancy_post_external_link_text'] ) : '';

?>
<div class="container">
    <div class="row section-title-space align-<?php echo esc_attr( $box_alignment ); ?>">
        <div class="col-xl-6 col-lg-6">
            <div class="section-title-wrapper">

                <!-- Section Title -->
                <<?php echo esc_attr($title_tag); ?>
                    class="title section-title rs-split-text-enable split-in-left"
                    style="perspective:400px;">
                    
                    <?php if ( 'page' === ( $settings['fancy_post_title_source'] ?? 'custom' ) ) : ?>
                            <a href="<?php the_permalink(); ?>">
                                <?php echo esc_html($title); ?>
                            </a>
                        <?php else : ?>
                            <?php echo esc_html($title); ?>
                        <?php endif; ?>
                </<?php echo esc_attr($title_tag); ?>>

            </div>
        </div>

        <div class="col-xl-6 col-lg-6">
            <!-- External Link -->
            <?php if ( ! empty( $settings['fancy_post_enable_external'] ) && 'yes' === $settings['fancy_post_enable_external'] ) : ?>
                <div class="section-btn">
                    <a href="<?php echo esc_url ($external_url); ?>"
                       class="rs-btn has-text has-icon"
                       <?php echo ! empty( $settings['fancy_post_external_link_url']['is_external'] ) ? 'target="_blank"' : ''; ?>
                       <?php echo ! empty( $settings['fancy_post_external_link_url']['nofollow'] ) ? 'rel="nofollow noopener"' : ''; ?>>
                       
                        <?php if ( $external_text ) : ?>
                            <?php echo wp_kses_post( $external_text ); ?>
                        <?php endif; ?>

                        <span class="icon-box">
                            <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                        </span>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php
// Reset post data
wp_reset_postdata();
?>
