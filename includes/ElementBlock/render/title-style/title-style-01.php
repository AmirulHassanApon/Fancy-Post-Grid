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

// Split text function
function fancy_split_text( $text ) {
    $output = '';
    $words  = preg_split( '/\s+/', $text );
    foreach ( $words as $word ) {
        $output .= '<div style="position:relative;display:inline-block;">';
        $letters = preg_split( '//u', $word, -1, PREG_SPLIT_NO_EMPTY );
        foreach ( $letters as $letter ) {
            $output .= '<div style="position: relative; display: inline-block; transform: translate(0px, 0px); opacity: 1;">' . esc_html( $letter ) . '</div>';
        }
        $output .= '</div> ';
    }
    return trim( $output );
}
?>

<div class="row section-title-space align-<?php echo esc_attr( $box_alignment ); ?>">
    <div class="col-xl-6 col-lg-6">
        <div class="section-title-wrapper">

            <!-- Section Title -->
            <<?php echo $title_tag; ?>
                class="title section-title rs-split-text-enable split-in-left"
                style="perspective:400px;">
                
                <?php if ( 'page' === ( $settings['fancy_post_title_source'] ?? 'custom' ) ) : ?>
                    <a href="<?php the_permalink(); ?>">
                        <?php echo fancy_split_text( $title ); ?>
                    </a>
                <?php else : ?>
                    <?php echo fancy_split_text( $title ); ?>
                <?php endif; ?>
            </<?php echo $title_tag; ?>>

        </div>
    </div>

    <div class="col-xl-6 col-lg-6">
        <!-- External Link -->
        <?php if ( ! empty( $settings['fancy_post_enable_external'] ) && 'yes' === $settings['fancy_post_enable_external'] ) : ?>
            <div class="section-btn">
                <a href="<?php echo $external_url; ?>"
                   class="rs-btn has-text has-icon"
                   <?php echo ! empty( $settings['fancy_post_external_link_url']['is_external'] ) ? 'target="_blank"' : ''; ?>
                   <?php echo ! empty( $settings['fancy_post_external_link_url']['nofollow'] ) ? 'rel="nofollow noopener"' : ''; ?>>
                   
                    <?php if ( $external_text ) : ?>
                        <?php echo $external_text; ?>
                    <?php endif; ?>

                    <span class="icon-box">
                        <i class="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                    </span>
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php
// Reset post data
wp_reset_postdata();
?>
