<?php
$settings = $this->get_settings_for_display();
$layout        = $settings['fancy_post_card_layout'] ?? 'titlestyle04';
$box_alignment = $settings['box_alignment'] ?? '';

if ( empty( $box_alignment ) ) {
    switch ( $layout ) {
        case 'titlestyle04':
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

?>

<div class="row section-title-space align-<?php echo esc_attr( $box_alignment ); ?>">
    <div class="col-xl-12 col-lg-12">
        <div class="section-title-wrapper">

            <!-- Section Title -->
            <<?php echo $title_tag; ?>
                class="title section-title rs-split-text-enable split-in-left"
                style="perspective:400px;">
                
                <?php if ( 'page' === ( $settings['fancy_post_title_source'] ?? 'custom' ) ) : ?>
                    <a href="<?php the_permalink(); ?>">
                        <?php echo  $title ; ?>
                    </a>
                <?php else : ?>
                    <?php echo  $title ; ?>
                <?php endif; ?>
            </<?php echo $title_tag; ?>>

        </div>
    </div>
</div>

<?php
// Reset post data
wp_reset_postdata();
?>
